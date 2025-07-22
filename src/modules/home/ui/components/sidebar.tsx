"use client";

import { useQueryState } from "nuqs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FetchedData } from "@/db/schema";
import { ArticleTitles } from "@/modules/home/ui/components/article-titles";
import { Calendar22 } from "@/modules/home/ui/components/date-picker";

interface SidebarProps {
	date: string;
	articles: FetchedData[];
	isLoadingArticles?: boolean;
}

export function Sidebar({ date, articles }: SidebarProps) {
	const [queryDate, setQueryDate] = useQueryState("date");
	const [selectedSource] = useQueryState("source");

	// 現在の日付（クエリパラメータがある場合はそれを使用、なければpropsのdateを使用）
	const currentDate = queryDate || date;

	const handleDateChange = (newDate: string) => {
		setQueryDate(newDate);
	};

	return (
		<Card>
			<CardHeader className="pb-4">
				<Calendar22 date={currentDate} onDateChange={handleDateChange} />
			</CardHeader>

			<CardContent className="pt-0 space-y-4">
				{/* Article Titles Section */}
				{selectedSource && (
					<div className="border-t border-border pt-4">
						<CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
							Articles
						</CardTitle>
						<ArticleTitles articles={articles} />
					</div>
				)}
			</CardContent>
		</Card>
	);
}
