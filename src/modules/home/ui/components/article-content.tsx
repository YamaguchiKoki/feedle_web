"use client";

import {
	CalendarIcon,
	ExternalLinkIcon,
	HeartIcon,
	MessageCircleIcon,
	ShareIcon,
} from "lucide-react";
import { useQueryState } from "nuqs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/lib/trpc/client";

// 記事コンテンツレンダラー
function ArticleRenderer({ content }: { content: string }) {
	return (
		<div className="prose max-w-none">
			<div className="whitespace-pre-wrap text-foreground leading-relaxed">
				{content}
			</div>
		</div>
	);
}

export function ArticleContent() {
	const [selectedArticleId] = useQueryState("article");

	const { data: article, isLoading } = trpc.fetchedData.getById.useQuery(
		{ id: selectedArticleId ?? "" },
		{ enabled: !!selectedArticleId },
	);

	if (!selectedArticleId) {
		return (
			<Card>
				<CardContent className="p-8 text-center">
					<div className="text-muted-foreground">
						Select an article from the sidebar to view its content
					</div>
				</CardContent>
			</Card>
		);
	}

	if (isLoading) {
		return (
			<Card>
				<CardHeader className="space-y-4">
					<div className="space-y-2">
						<div className="h-6 bg-muted animate-pulse rounded" />
						<div className="h-4 bg-muted animate-pulse rounded w-3/4" />
					</div>
					<div className="flex items-center space-x-2">
						<div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
						<div className="h-4 bg-muted animate-pulse rounded w-24" />
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<div className="h-4 bg-muted animate-pulse rounded" />
						<div className="h-4 bg-muted animate-pulse rounded w-5/6" />
						<div className="h-4 bg-muted animate-pulse rounded w-4/5" />
					</div>
				</CardContent>
			</Card>
		);
	}

	if (!article) {
		return (
			<Card>
				<CardContent className="p-8 text-center">
					<div className="text-muted-foreground">Article not found</div>
				</CardContent>
			</Card>
		);
	}

	const engagement = article.engagement as {
		likes?: number;
		comments?: number;
		shares?: number;
	} | null;

	return (
		<Card className="flex flex-col h-[calc(100vh-12rem)]">
			{" "}
			{/* 固定高度でフル活用 */}
			<CardHeader className="flex-shrink-0 space-y-4 border-b">
				{/* Article Title */}
				<div>
					<h1 className="text-2xl font-bold leading-tight">{article.title}</h1>
					<div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
						<div className="flex items-center space-x-1">
							<CalendarIcon className="h-4 w-4" />
							<span>{article.publishedAt?.toLocaleDateString()}</span>
						</div>
						<a
							href={article.url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center space-x-1 hover:text-foreground transition-colors"
						>
							<ExternalLinkIcon className="h-4 w-4" />
							<span>View Original</span>
						</a>
					</div>
				</div>

				{/* Author Info */}
				<div className="flex items-center space-x-3">
					<Avatar className="h-8 w-8">
						<AvatarImage src={article.authorAvatarUrl || undefined} />
						<AvatarFallback>
							{article.authorName?.charAt(0)?.toUpperCase() || "U"}
						</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-medium text-sm">
							{article.authorName || "Unknown Author"}
						</div>
						{engagement && (
							<div className="flex items-center space-x-3 text-xs text-muted-foreground">
								{engagement.likes && (
									<div className="flex items-center space-x-1">
										<HeartIcon className="h-3 w-3" />
										<span>{engagement.likes.toLocaleString()}</span>
									</div>
								)}
								{engagement.comments && (
									<div className="flex items-center space-x-1">
										<MessageCircleIcon className="h-3 w-3" />
										<span>{engagement.comments.toLocaleString()}</span>
									</div>
								)}
								{engagement.shares && (
									<div className="flex items-center space-x-1">
										<ShareIcon className="h-3 w-3" />
										<span>{engagement.shares.toLocaleString()}</span>
									</div>
								)}
							</div>
						)}
					</div>
				</div>

				{/* Tags */}
				{article.tags && article.tags.length > 0 && (
					<ScrollArea className="w-full">
						<div className="flex flex-wrap gap-2 pb-2">
							{(article.tags as string[]).map((tag) => (
								<Badge
									key={tag}
									variant="secondary"
									className="text-xs flex-shrink-0"
								>
									{tag}
								</Badge>
							))}
						</div>
					</ScrollArea>
				)}
			</CardHeader>
			<CardContent className="flex-1 p-0 overflow-hidden">
				{/* Article Content with Scroll */}
				{article.content && (
					<ScrollArea className="h-full px-6 py-4">
						<ArticleRenderer content={article.content} />
					</ScrollArea>
				)}
			</CardContent>
		</Card>
	);
}
