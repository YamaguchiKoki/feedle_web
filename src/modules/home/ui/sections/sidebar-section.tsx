"use client";

import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useQueryState } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/client";
import { ArticleTitles } from "@/modules/home/ui/components/article-titles";
import { Calendar22 } from "@/modules/home/ui/components/date-picker";

export const SideBarSection = () => {
	const [queryDate, setQueryDate] = useQueryState("date");
	const [querySource] = useQueryState("source");

	const date = queryDate || new Date().toISOString().split("T")[0];

	const handleDateChange = (newDate: string) => {
		setQueryDate(newDate);
	};

	return (
		<div className="lg:col-span-1 h-full overflow-auto">
			<Card>
				<CardHeader className="pb-4">
					<Calendar22 date={date} onDateChange={handleDateChange} />
				</CardHeader>
				<CardContent className="pt-0 space-y-4">
					<div className="border-t border-border pt-4">
						<CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
							Articles
						</CardTitle>
						<ErrorBoundary
							fallback={
								<ArticleTitlesErrorFallback
									date={date}
									querySource={querySource}
								/>
							}
							onReset={() => {
								// キャッシュをクリアして再試行
								window.location.reload();
							}}
						>
							<Suspense fallback={<ArticleTitlesSkeleton />}>
								<ArticlesTitleSection date={date} querySource={querySource} />
							</Suspense>
						</ErrorBoundary>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

const ArticlesTitleSection = ({
	date,
	querySource,
}: {
	date: string;
	querySource: string | null;
}) => {
	const [data] = trpc.fetchedData.getByDateAndDataSource.useSuspenseQuery(
		{
			date: date,
			dataSourceName: querySource,
		},
		{
			// エラー回復を優先した設定
			staleTime: 30 * 1000, // 30秒に短縮
			gcTime: 2 * 60 * 1000, // 2分に短縮
			refetchOnMount: true, // マウント時は常に再検証
			refetchOnWindowFocus: false,
			retry: 1,
			retryDelay: 1000,
			// エラー時のキャッシュ時間を短縮
			retryOnMount: true,
		},
	);

	console.log("ArticlesTitleSection received data:", {
		querySource,
		date,
		dataCount: data?.length || 0,
		data: data?.slice(0, 3), // 最初の3件のみログ出力
	});

	return <ArticleTitles articles={data} />;
};

const ArticleTitlesSkeleton = () => {
	return (
		<div className="space-y-2">
			<div className="h-4 bg-muted animate-pulse rounded" />
			<div className="h-4 bg-muted animate-pulse rounded w-3/4" />
			<div className="h-4 bg-muted animate-pulse rounded w-1/2" />
		</div>
	);
};

const ArticleTitlesErrorFallback = ({
	date,
	querySource,
}: {
	date: string;
	querySource: string | null;
}) => {
	const utils = trpc.useUtils();
	const queryClient = useQueryClient();

	const handleRetry = async () => {
		try {
			// 該当するクエリキャッシュを完全に削除
			const queryKey = getQueryKey(trpc.fetchedData.getByDateAndDataSource, {
				date,
				dataSourceName: querySource,
			});
			queryClient.removeQueries({ queryKey });

			// さらにinvalidateで確実にクリア
			await utils.fetchedData.getByDateAndDataSource.invalidate({
				date,
				dataSourceName: querySource,
			});

			// 少し待ってからリロード
			setTimeout(() => {
				window.location.reload();
			}, 100);
		} catch (error) {
			console.error("Cache clear failed:", error);
			// フォールバック: 全体キャッシュクリア
			queryClient.clear();
			setTimeout(() => {
				window.location.reload();
			}, 100);
		}
	};

	return (
		<div className="space-y-3 p-4 text-center">
			<div className="text-sm text-destructive">
				記事の読み込みに失敗しました
			</div>
			<Button onClick={handleRetry} size="sm" variant="default">
				再試行
			</Button>
		</div>
	);
};
