import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { MainContent } from "@/modules/home/ui/components/main-content";
import { Sidebar } from "@/modules/home/ui/components/sidebar";

interface PageProps {
	searchParams: Promise<{ date?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
	const params = await searchParams;
	const date = params.date || new Date().toISOString().split("T")[0];

	// Mock app names - in real app, this would come from your backend
	const appNames = [
		"github_trending",
		"hacker_news",
		"paper_summarizer",
		"reddit_explorer",
		"tech_feed",
	];

	return (
		<div className="container mx-auto px-4 pt-16">
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				{/* Second Sidebar */}
				<div className="lg:col-span-1">
					<div className="sticky top-20">
						<Suspense fallback={<Card className="p-4 animate-pulse h-96" />}>
							<Sidebar date={date} />
						</Suspense>
					</div>
				</div>

				{/* Main Content */}
				<div className="lg:col-span-3">
					<Suspense fallback={<Card className="p-6 animate-pulse h-96" />}>
						<MainContent date={date} appNames={appNames} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
