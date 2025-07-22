"use client";

import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { FetchedData } from "@/db/schema";
import { cn } from "@/lib/utils";

interface ArticleTitlesProps {
	articles: FetchedData[];
}

export function ArticleTitles({ articles }: ArticleTitlesProps) {
	const [selectedArticleId, setSelectedArticleId] = useQueryState("article");

	if (!articles || articles.length === 0) {
		return (
			<div className="text-center text-muted-foreground text-sm py-4">
				No articles found for this date and source
			</div>
		);
	}

	return (
		<ScrollArea className="h-64">
			<div className="space-y-1">
				{articles.map((article) => (
					<Button
						key={article.id}
						variant="ghost"
						size="sm"
						className={cn(
							"w-full justify-start h-auto p-2 text-left",
							"hover:bg-muted/50",
							selectedArticleId === article.id && "bg-muted font-medium",
						)}
						onClick={() => setSelectedArticleId(article.id)}
					>
						<div className="flex flex-col items-start">
							<div className="text-xs text-muted-foreground truncate w-full">
								{article.publishedAt?.toLocaleString()}
							</div>
							<div className="text-sm line-clamp-2 text-left">
								{article.title}
							</div>
							<div className="text-xs text-muted-foreground mt-1">
								by {article.authorName || "Unknown"}
							</div>
						</div>
					</Button>
				))}
			</div>
		</ScrollArea>
	);
}
