"use client";

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
							fallback={<ArticleTitlesErrorFallback />}
							onReset={() => {
								// 無限ループ防止のため、リトライを無効化
								console.log("ErrorBoundary reset - manual reload required");
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
			// 無限ループ防止のため、リトライを無効化
			staleTime: 30 * 1000,
			gcTime: 2 * 60 * 1000,
			refetchOnMount: false, // マウント時再検証を無効化
			refetchOnWindowFocus: false,
			retry: false, // リトライを完全に無効化
			retryDelay: 1000,
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

const ArticleTitlesErrorFallback = () => {
	const handleRetry = () => {
		// 無限ループ防止のため、複雑なキャッシュ操作を避けて直接リロード
		console.warn("Manual page reload to prevent infinite retry loop");
		window.location.reload();
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
