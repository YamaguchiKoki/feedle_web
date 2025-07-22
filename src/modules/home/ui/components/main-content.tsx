"use client";

import { useState } from "react";
import { FilterCarousel } from "@/components/filter-carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ContentTab } from "@/modules/home/ui/components/content-tab";

interface MainContentProps {
	date: string;
	appNames: string[];
}

const tabNames = {
	github_trending: "Trending",
	hacker_news: "News",
	paper_summarizer: "Papers",
	reddit_explorer: "Reddit",
	tech_feed: "Tech",
} as const;

export function MainContent({ date, appNames }: MainContentProps) {
	const [selectedApp, setSelectedApp] = useState<string | null>(appNames[0]);

	// FilterCarousel用のデータ形式に変換
	const filterData = appNames.map((app) => ({
		value: app,
		label: tabNames[app as keyof typeof tabNames],
	}));

	return (
		<Card>
			<CardContent className="p-6">
				<div className="mb-6">
					<FilterCarousel
						value={selectedApp}
						onSelect={setSelectedApp}
						data={filterData}
					/>
				</div>

				{selectedApp && <ContentTab appName={selectedApp} date={date} />}
			</CardContent>
		</Card>
	);
}
