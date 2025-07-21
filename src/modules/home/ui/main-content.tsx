"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentTab } from "@/modules/home/ui/content-tab";

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
	const [activeTab, setActiveTab] = useState(appNames[0]);

	return (
		<Card>
			<CardContent className="p-6">
				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsList className="grid w-full grid-cols-5 mb-6">
						{appNames.map((app) => (
							<TabsTrigger
								key={app}
								value={app}
								className="text-xs font-semibold uppercase tracking-wider"
							>
								{tabNames[app as keyof typeof tabNames]}
							</TabsTrigger>
						))}
					</TabsList>

					{appNames.map((app) => (
						<TabsContent key={app} value={app} className="mt-0">
							<ContentTab appName={app} date={date} />
						</TabsContent>
					))}
				</Tabs>
			</CardContent>
		</Card>
	);
}
