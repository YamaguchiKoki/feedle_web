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
			// キャッシュヒット時の再検証を防ぐ
			staleTime: 5 * 60 * 1000, // 5分
			gcTime: 10 * 60 * 1000, // 10分（旧cacheTime）
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			retry: false, // リトライを無効化
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

	const handleRetry = async () => {
		// キャッシュをクリア
		await utils.fetchedData.getByDateAndDataSource.invalidate({
			date,
			dataSourceName: querySource,
		});
		// ページをリロード
		window.location.reload();
	};

	return (
		<div className="space-y-3 p-4 text-center">
			<div className="text-sm text-destructive">
				記事の読み込みに失敗しました
			</div>
			<Button
				onClick={handleRetry}
				className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
			>
				再試行
			</Button>
		</div>
	);
};
