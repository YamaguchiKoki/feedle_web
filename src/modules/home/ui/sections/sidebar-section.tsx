"use client";

import { useQueryState } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
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
						{/* TODO error fallback ui */}
						<ErrorBoundary fallback={<div>Something went wrong!</div>}>
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
	const [data] = trpc.fetchedData.getByDateAndDataSource.useSuspenseQuery({
		date: date,
		dataSourceName: querySource,
	});

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
