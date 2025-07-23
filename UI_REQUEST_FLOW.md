# UI操作とリクエストフロー仕様書

## 概要

このドキュメントは、feedle-webアプリケーションにおけるUI操作、発火するリクエスト、およびキャッシュ管理の詳細な仕様を整理したものです。

## アーキテクチャ概要

- **フロントエンド**: Next.js 15 + React 19
- **API層**: tRPC v11 + React Query (TanStack Query)
- **認証**: Supabase Auth
- **レンダリング**: useSuspenseQuery + ErrorBoundary + Suspense
- **デプロイ**: OpenNext + Cloudflare Workers

## 主要コンポーネント

### 1. DataSourceSection（データソース選択）

#### API仕様
- **エンドポイント**: `dataSources.getMany`
- **認証**: 不要（`baseProcedure`）
- **レスポンス**: `DataSource[]`

#### UI操作とリクエストフロー

```
初回ロード
└── dataSources.getMany → useSuspenseQuery
    ├── 成功: FilterCarousel表示
    └── 失敗: ErrorBoundary → エラーUI

カルーセル操作
└── onSelect(source) → setQueryState("source", source)
    └── URL更新: ?source={selected}
```

#### キャッシュ設定
```typescript
// デフォルト設定（変更なし）
{
  staleTime: 30 * 1000, // 30秒
  retry: (失敗回数) => boolean
}
```

### 2. SideBarSection（記事タイトル一覧）

#### API仕様
- **エンドポイント**: `fetchedData.getByDateAndDataSource`
- **認証**: 不要（`baseProcedure`）
- **パラメータ**: `{ date: string, dataSourceName?: string }`
- **レスポンス**: `FetchedData[]`

#### UI操作とリクエストフロー

```
初回ロード
└── fetchedData.getByDateAndDataSource.useSuspenseQuery
    ├── パラメータ: { date: "2025-01-23", dataSourceName: null }
    ├── 成功: ArticleTitles表示
    └── 失敗: ErrorBoundary → ArticleTitlesErrorFallback

日付変更
└── onDateChange(newDate) → setQueryDate(newDate)
    └── URL更新: ?date={newDate}
        └── 自動リクエスト発火（新しいdate）

データソース変更
└── useQueryState("source") 変更検知
    └── 自動リクエスト発火（新しいdataSourceName）

記事選択
└── onClick(articleId) → setQueryState("article", articleId)
    └── URL更新: ?article={articleId}
```

#### キャッシュ設定
```typescript
{
  staleTime: 30 * 1000,        // 30秒
  gcTime: 2 * 60 * 1000,       // 2分
  refetchOnMount: true,        // マウント時再検証
  refetchOnWindowFocus: false,
  retry: 1,
  retryDelay: 1000,
  retryOnMount: true
}
```

#### エラー時キャッシュクリア処理

```typescript
const handleRetry = async () => {
  try {
    // 1. 該当クエリのキャッシュを完全削除
    const queryKey = getQueryKey(
      trpc.fetchedData.getByDateAndDataSource,
      { date, dataSourceName: querySource }
    );
    queryClient.removeQueries({ queryKey });
    
    // 2. invalidateで確実にクリア
    await utils.fetchedData.getByDateAndDataSource.invalidate({
      date,
      dataSourceName: querySource,
    });
    
    // 3. ページリロード
    setTimeout(() => window.location.reload(), 100);
  } catch (error) {
    // フォールバック: 全体キャッシュクリア
    queryClient.clear();
    setTimeout(() => window.location.reload(), 100);
  }
};
```

### 3. ContentsSection（記事詳細表示）

#### API仕様
- **エンドポイント**: `fetchedData.getById`
- **認証**: 不要（`baseProcedure`）
- **パラメータ**: `{ id: string }`
- **レスポンス**: `FetchedData | null`

#### UI操作とリクエストフロー

```
記事選択時
└── useQueryState("article") 変更検知
    └── fetchedData.getById.useSuspenseQuery
        ├── パラメータ: { id: selectedArticleId }
        ├── 成功: ArticleDetail表示
        └── 失敗: ErrorBoundary → ErrorFallback

記事未選択時
└── EmptyState表示（"記事を選択してください"）
```

#### キャッシュ設定
```typescript
{
  retry: 1,                    // 1回リトライ
  retryDelay: 2000,           // 2秒待機
  staleTime: 30000,           // 30秒
}
```

#### エラー時キャッシュクリア処理

```typescript
const handleRetry = async () => {
  try {
    if (selectedArticleId) {
      // 1. 該当クエリのキャッシュを完全削除
      const queryKey = getQueryKey(
        trpc.fetchedData.getById,
        { id: selectedArticleId }
      );
      queryClient.removeQueries({ queryKey });
      
      // 2. invalidateで確実にクリア
      await utils.fetchedData.getById.invalidate({
        id: selectedArticleId,
      });
    }
    resetErrorBoundary();
  } catch (clearError) {
    // フォールバック: 全体キャッシュクリア
    queryClient.clear();
    resetErrorBoundary();
  }
};
```

## URL状態管理

### URLパラメータ
- `date`: 選択された日付（YYYY-MM-DD形式）
- `source`: 選択されたデータソース名
- `article`: 選択された記事ID

### 状態同期
```typescript
// nuqsによるURL同期
const [queryDate, setQueryDate] = useQueryState("date");
const [querySource, setQuerySource] = useQueryState("source");  
const [selectedArticleId] = useQueryState("article");
```

## エラーハンドリング戦略

### 1. Suspenseによるローディング状態
```typescript
<Suspense fallback={<Skeleton />}>
  <ComponentWithSuspenseQuery />
</Suspense>
```

### 2. ErrorBoundaryによるエラー捕捉
```typescript
<ErrorBoundary
  fallback={<ErrorFallback />}
  onReset={() => window.location.reload()}
>
  <SuspenseComponent />
</ErrorBoundary>
```

### 3. キャッシュクリア戦略

#### 段階的クリア手順
1. **特定クエリ削除**: `queryClient.removeQueries({ queryKey })`
2. **invalidate実行**: `utils.*.invalidate(params)`
3. **ページリロード**: `window.location.reload()`
4. **フォールバック**: `queryClient.clear()` + リロード

## パフォーマンス最適化

### 1. キャッシュ時間調整
- **通常データ**: `staleTime: 30秒`（エラー回復を優先）
- **ガベージコレクション**: `gcTime: 2分`（メモリ効率）

### 2. 不要な再取得抑制
- `refetchOnWindowFocus: false`
- `refetchOnMount: true`（エラー後の回復を優先）

### 3. モックデータサイズ削減
- 大容量記事（15万文字のReact Native記事等）を削除
- 6記事のコンパクトなセットに削減

## 既知の問題と解決策

### 1. useSuspenseQueryのエラー後回復不能問題
**問題**: エラー発生後、リロードしても症状が回復しない
**原因**: React Queryがエラー状態をキャッシュに保持
**解決**: `removeQueries` + `invalidate` + リロードの組み合わせ

### 2. OpenNextとSuspenseの互換性問題
**問題**: Cloudflare Workers環境でSuspenseが不安定
**現状**: useSuspenseQueryを継続使用（最終手段: useQueryへの移行）

### 3. 認証依存によるロード問題
**問題**: protectedProcedureで初回ロードが停止
**解決**: データソース取得をbaseProcedureに変更

## デプロイフロー修正

### 修正前（問題のあった手順）
```yaml
- name: Build for production
  run: npm run build                    # next build

- name: Deploy to Cloudflare
  run: npm run deploy                   # opennextjs-cloudflare build && deploy
```

### 修正後（正しい手順）
```yaml
- name: Deploy to Cloudflare
  run: npm run deploy                   # opennextjs-cloudflareが内部でnext buildを実行
```

**理由**: OpenNext Cloudflareは内部で`package.json`の`build`スクriptを自動実行するため、事前実行は重複

## 今後の検討事項

1. **useQueryへの段階的移行**: Suspenseの問題が深刻化した場合
2. **エラー境界の細分化**: より粒度の細かいエラーハンドリング
3. **キャッシュ戦略の最適化**: ユーザー行動パターンに基づく調整
4. **オフライン対応**: Service Worker + キャッシュ永続化
5. **パフォーマンス監視**: React DevTools Profilerによる計測

---

**最終更新**: 2025年1月23日  
**バージョン**: v1.0  
**作成者**: Claude Code Assistant