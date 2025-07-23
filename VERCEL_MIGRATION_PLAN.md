# Vercel移行計画

## 移行理由

**技術的根拠:**
- useSuspenseQuery + OpenNext + Cloudflare Workersの本質的な非互換性
- React Suspense問題（Issue #336: "not planned"）
- TanStack Query無限ループ問題（Issue #6116: 未解決）
- Cloudflare Workers Runtime制限によるハングアップ

**解決される問題:**
- ✅ useSuspenseQueryの安定動作
- ✅ React Suspenseの完全サポート
- ✅ 無限ループ問題の根本解決
- ✅ Next.js本家環境での安定性

## 移行前の現在の設定

### Cloudflare Workers設定
```json
// wrangler.jsonc
{
  "name": "feedle-web",
  "main": ".open-next/worker.js",
  "compatibility_date": "2025-03-01",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"]
}
```

### 現在のデプロイフロー
```yaml
# .github/workflows/cd.yml
deploy-production:
  - name: Deploy to Cloudflare (Production)
    run: npm run deploy  # opennextjs-cloudflare build && deploy
    env:
      CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
      CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### パッケージ依存関係
```json
// package.json
{
  "dependencies": {
    "@opennextjs/cloudflare": "^1.5.1"
  },
  "scripts": {
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview"
  }
}
```

## 移行手順

### Phase 1: Vercelプロジェクト準備

1. **Vercelアカウント・プロジェクト作成**
   ```bash
   # Vercel CLIインストール
   npm i -g vercel
   
   # プロジェクト初期化
   vercel login
   vercel link
   ```

2. **環境変数の移行**
   ```bash
   # Cloudflare → Vercel
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY  
   vercel env add NEXT_PUBLIC_APP_URL
   vercel env add DATABASE_URL
   ```

### Phase 2: コード修正

3. **OpenNext依存関係の削除**
   ```bash
   npm uninstall @opennextjs/cloudflare wrangler
   ```

4. **package.json修正**
   ```json
   {
     "scripts": {
       "build": "next build",
       "deploy": "vercel --prod",
       "preview": "vercel"
     }
   }
   ```

5. **Cloudflare専用ファイルの削除/移動**
   ```bash
   # バックアップ用ディレクトリ作成
   mkdir cloudflare-backup
   mv wrangler.jsonc cloudflare-backup/
   mv cloudflare-env.d.ts cloudflare-backup/  # 存在する場合
   ```

### Phase 3: Vercel設定ファイル作成

6. **vercel.json作成**
   ```json
   {
     "framework": "nextjs",
     "buildCommand": "npm run build",
     "devCommand": "npm run dev",
     "installCommand": "npm ci",
     "regions": ["nrt1"],
     "functions": {
       "app/api/**/*.ts": {
         "runtime": "nodejs20.x"
       }
     }
   }
   ```

### Phase 4: CI/CD修正

7. **GitHub Actions修正**
   ```yaml
   # .github/workflows/cd.yml
   deploy-production:
     steps:
       - name: Deploy to Vercel
         run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
         env:
           VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
           VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
   ```

### Phase 5: useSuspenseQuery復元

8. **エラーハンドリング簡素化**
   ```typescript
   // 現在の緊急対処を元に戻す
   {
     retry: 1,  // false → 1
     refetchOnMount: true,  // false → true
     staleTime: 30 * 1000,
   }
   ```

9. **Suspense境界の復元**
   ```typescript
   <Suspense fallback={<Skeleton />}>
     <ComponentWithSuspenseQuery />
   </Suspense>
   ```

## テスト計画

### 移行後テストシナリオ

1. **基本機能テスト**
   - [ ] 初回ロード正常動作
   - [ ] データソース切り替え
   - [ ] 記事選択・詳細表示
   - [ ] 日付変更

2. **Suspense動作テスト**
   - [ ] ローディング状態正常表示
   - [ ] エラー境界正常動作
   - [ ] リトライ機能正常動作

3. **パフォーマンステスト**
   - [ ] 無限ループ解消確認
   - [ ] レスポンス時間改善確認
   - [ ] キャッシュ動作確認

## ロールバック計画

万が一の場合のロールバック手順:

1. **package.json復元**
   ```bash
   npm install @opennextjs/cloudflare@^1.5.1 wrangler
   ```

2. **設定ファイル復元**
   ```bash
   mv cloudflare-backup/wrangler.jsonc .
   mv cloudflare-backup/cloudflare-env.d.ts .
   ```

3. **GitHub Actions復元**
   - cd.ymlを元の状態に戻す

## 期待される効果

### 技術的改善
- ✅ useSuspenseQuery安定動作
- ✅ 無限ループ問題解消
- ✅ Workers timeout解消
- ✅ React Suspense完全サポート

### 開発体験向上
- ✅ エラー再現性向上
- ✅ デバッグしやすさ向上
- ✅ Next.js本家環境での開発

### 運用面改善
- ✅ デプロイ安定性向上
- ✅ パフォーマンス改善
- ✅ 監視・ログ改善

## スケジュール

- **Phase 1-2**: 準備・コード修正（30分）
- **Phase 3-4**: 設定・CI/CD（30分）  
- **Phase 5**: 機能復元（15分）
- **テスト**: 動作確認（30分）

**合計所要時間**: 約1.5-2時間

---

**開始日**: 2025年7月23日  
**担当**: Claude Code Assistant  
**承認者**: User