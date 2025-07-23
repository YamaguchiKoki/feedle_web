"use client";

import {
	CalendarIcon,
	ExternalLinkIcon,
	HeartIcon,
	MessageCircleIcon,
	ShareIcon,
} from "lucide-react";
import { useQueryState } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/lib/trpc/client";

type EngagementData = {
	likes?: number;
	comments?: number;
	shares?: number;
};

const MESSAGES = {
	NO_ARTICLE_SELECTED: "Select an article from the sidebar to view its content",
	ARTICLE_NOT_FOUND: "Article not found",
	UNKNOWN_AUTHOR: "Unknown Author",
	VIEW_ORIGINAL: "View Original",
	LOADING: "Loading article...",
	ERROR: "Failed to load article",
} as const;

export const ContentsSection = () => {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => window.location.reload()}
		>
			<Suspense fallback={<ContentsSectionSkeleton />}>
				<ContentsSectionSuspense />
			</Suspense>
		</ErrorBoundary>
	);
};

const ContentsSectionSuspense = () => {
	const [selectedArticleId] = useQueryState("article");

	if (!selectedArticleId) {
		return <EmptyState message={MESSAGES.NO_ARTICLE_SELECTED} />;
	}

	return <ArticleDetail articleId={selectedArticleId} />;
};

const ArticleDetail = ({ articleId }: { articleId: string }) => {
	const [article] = trpc.fetchedData.getById.useSuspenseQuery(
		{
			id: articleId,
		},
		{
			// リトライ設定
			retry: 1, // 本番環境での無駄なリトライを減らす
			retryDelay: 2000, // リトライまでの時間を延長
			staleTime: 30000,
		},
	);

	if (!article) {
		return <EmptyState message={MESSAGES.ARTICLE_NOT_FOUND} />;
	}

	const engagement = article.engagement as EngagementData | null;
	const authorInitial = article.authorName?.charAt(0)?.toUpperCase() || "U";

	return (
		<Card className="flex flex-col h-[calc(100vh-12rem)]">
			<CardHeader className="flex-shrink-0 space-y-4 border-b">
				{/* Article Title Section */}
				<header>
					<h1 className="text-2xl font-bold leading-tight">{article.title}</h1>
					<div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
						<time
							className="flex items-center space-x-1"
							dateTime={article.publishedAt?.toISOString()}
						>
							<CalendarIcon className="h-4 w-4" />
							<span>{article.publishedAt?.toLocaleDateString()}</span>
						</time>
						<a
							href={article.url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center space-x-1 hover:text-foreground transition-colors"
							aria-label={`${MESSAGES.VIEW_ORIGINAL} (opens in new tab)`}
						>
							<ExternalLinkIcon className="h-4 w-4" />
							<span>{MESSAGES.VIEW_ORIGINAL}</span>
						</a>
					</div>
				</header>

				{/* Author Information */}
				<div className="flex items-center space-x-3">
					<Avatar className="h-8 w-8">
						<AvatarImage
							src={article.authorAvatarUrl || undefined}
							alt={article.authorName || MESSAGES.UNKNOWN_AUTHOR}
						/>
						<AvatarFallback>{authorInitial}</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-medium text-sm">
							{article.authorName || MESSAGES.UNKNOWN_AUTHOR}
						</div>
						{engagement && <EngagementStats engagement={engagement} />}
					</div>
				</div>

				{/* Tags Section */}
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

			{/* Article Content */}
			<CardContent className="flex-1 p-0 overflow-hidden">
				{article.content && (
					<ScrollArea className="h-full px-6 py-4">
						<article>
							<div className="prose max-w-none">
								<div className="whitespace-pre-wrap text-foreground leading-relaxed">
									{article.content}
								</div>
							</div>
						</article>
					</ScrollArea>
				)}
			</CardContent>
		</Card>
	);
};

const EngagementStats = ({ engagement }: { engagement: EngagementData }) => {
	const stats = [
		{ icon: HeartIcon, value: engagement.likes, label: "likes" },
		{ icon: MessageCircleIcon, value: engagement.comments, label: "comments" },
		{ icon: ShareIcon, value: engagement.shares, label: "shares" },
	];

	const hasStats = stats.some((stat) => stat.value);
	if (!hasStats) return null;

	return (
		<div className="flex items-center space-x-3 text-xs text-muted-foreground">
			{stats.map(({ icon: Icon, value, label }) =>
				value ? (
					<div key={label} className="flex items-center space-x-1">
						<Icon className="h-3 w-3" />
						<span>{value.toLocaleString()}</span>
					</div>
				) : null,
			)}
		</div>
	);
};

const EmptyState = ({ message }: { message: string }) => (
	<Card>
		<CardContent className="p-8 text-center">
			<div className="text-muted-foreground">{message}</div>
		</CardContent>
	</Card>
);

const ContentsSectionSkeleton = () => (
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

const ErrorFallback = ({
	error,
	resetErrorBoundary,
}: {
	error: Error;
	resetErrorBoundary: () => void;
}) => {
	const utils = trpc.useUtils();
	const [selectedArticleId] = useQueryState("article");

	const handleRetry = async () => {
		// 選択中の記事のキャッシュをクリア
		if (selectedArticleId) {
			await utils.fetchedData.getById.invalidate({
				id: selectedArticleId,
			});
		}
		resetErrorBoundary();
	};

	return (
		<Card>
			<CardContent className="p-8 text-center space-y-4">
				<div className="space-y-2">
					<div className="text-destructive font-medium">{MESSAGES.ERROR}</div>
					<div className="text-sm text-muted-foreground">
						{error?.message || "記事の読み込み中にエラーが発生しました"}
					</div>
				</div>
				<Button onClick={handleRetry} variant="default" size="sm">
					キャッシュをクリアして再試行
				</Button>
			</CardContent>
		</Card>
	);
};
