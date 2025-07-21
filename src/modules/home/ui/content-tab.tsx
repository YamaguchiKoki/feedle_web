"use client";

import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "@/modules/home/ui/chat-interface";
import { MarkdownRenderer } from "@/modules/home/ui/markdown-renderer";

// Mock data for different apps
const mockData = {
	reddit: {
		"2025-01-20": `# Technology Trends Discussion

Recent discussions on r/technology highlight the growing interest in AI safety and regulation. Users are debating the implications of recent AI model releases and their potential impact on various industries.

**Key Points:**
- AI regulation frameworks being discussed globally
- Open source vs closed source AI models debate
- Privacy concerns with new AI applications

**Top Comment:** "We need to balance innovation with responsible development..."

---

# Programming Best Practices

A thread on r/programming discusses modern JavaScript patterns and the evolution of frontend frameworks.

**Highlighted Topics:**
- Server Components vs Client Components
- TypeScript adoption in 2025
- Performance optimization techniques

**Popular Resources Shared:**
- New React documentation updates
- Benchmarking tools comparison
- State management patterns

---

# Gaming Community Updates

The gaming subreddits are buzzing with excitement about upcoming releases and industry news.

**Trending Discussions:**
- Next-gen console updates
- Indie game success stories
- Cloud gaming experiences

**Community Favorites:**
- Best games of Q1 2025
- Hardware recommendations
- Gaming setup showcases`,
		"2025-01-21": `# Web Development Innovations

Exciting discussions about the future of web development, with focus on edge computing and new standards.

**Hot Topics:**
- WebAssembly use cases expanding
- Edge-first architectures
- Progressive enhancement in 2025

**Community Insights:**
- Performance metrics that matter
- Accessibility improvements
- Cross-platform development strategies`,
	},
	hackernews: {
		"2025-01-20": `# Startup Ecosystem Analysis

Y Combinator's latest batch shows interesting trends in B2B SaaS and developer tools.

**Key Observations:**
- AI-powered developer tools dominating
- Infrastructure startups on the rise
- Remote work tools evolution

**Notable Discussions:**
- Bootstrapping vs VC funding debate
- Technical debt management
- Scaling engineering teams

---

# Open Source Projects Spotlight

Several open source projects gained significant traction this week.

**Featured Projects:**
- New terminal emulator written in Rust
- Distributed database solution
- AI model optimization toolkit

**Community Contributions:**
- Documentation improvements
- Performance benchmarks
- Security audits`,
		"2025-01-21": `# Tech Industry News

Major announcements from tech giants and their implications for developers.

**Breaking News:**
- New programming language announcement
- Cloud provider pricing changes
- Developer survey results 2025

**Analysis:**
- Market trends and predictions
- Technology adoption patterns
- Future of software development`,
	},
	youtube: {
		"2025-01-20": `# Tech YouTube Highlights

Popular tech channels released comprehensive tutorials and reviews this week.

**Trending Videos:**
- "Building a Full-Stack App in 2025" - 500K views
- "AI Tools Every Developer Should Know" - 300K views
- "Home Lab Setup Guide" - 250K views

**Creator Insights:**
- New tutorial formats gaining traction
- Live coding sessions popularity
- Community project collaborations

---

# Educational Content Surge

Educational tech content sees unprecedented growth with new formats and approaches.

**Popular Topics:**
- System design interviews
- Cloud architecture patterns
- Security best practices

**Channel Recommendations:**
- Emerging tech educators
- Specialized niche content
- Interactive learning platforms`,
		"2025-01-21": `# Developer Tutorials

New tutorial series launching across multiple channels.

**Featured Content:**
- Microservices architecture deep dive
- React 19 features walkthrough
- Database optimization techniques

**Viewer Engagement:**
- Q&A sessions highlights
- Community challenges
- Collaboration projects`,
	},
};

interface ContentTabProps {
	appName: string;
	date: string;
}

export function ContentTab({ appName, date }: ContentTabProps) {
	const [content, setContent] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [hasContent, setHasContent] = useState(false);
	const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(
		null,
	);

	const loadContent = useCallback(() => {
		// Simulate API call with timeout
		setTimeout(() => {
			const data =
				mockData[appName as keyof typeof mockData]?.[
					date as keyof (typeof mockData)[keyof typeof mockData]
				];
			if (data) {
				setContent(data);
				setHasContent(true);
			} else {
				setHasContent(false);
			}
		}, 500); // Simulate network delay
	}, [appName, date]);

	useEffect(() => {
		// Load mock content
		loadContent();

		return () => {
			if (pollingInterval) {
				clearInterval(pollingInterval);
			}
		};
	}, [loadContent, pollingInterval]);

	const startPolling = () => {
		if (pollingInterval) return;

		let pollCount = 0;
		const interval = setInterval(() => {
			pollCount++;

			// Simulate successful update after 3 polls
			if (pollCount >= 3) {
				const fallbackData = `# Updated Content for ${appName}

This is freshly generated content for ${date}.

**New Information:**
- Latest updates from ${appName}
- Fresh insights and discussions
- Community highlights

**Trending Topics:**
- Technology trends
- Developer discussions
- Industry news

---

# Additional Topics

More content has been fetched and processed.

**Key Points:**
- Important announcements
- Community feedback
- Future predictions`;

				setContent(fallbackData);
				setHasContent(true);
				toast.success(`Content for ${appName} updated successfully.`);
				stopPolling();
			}
		}, 3000); // Poll every 3 seconds for demo

		setPollingInterval(interval);
	};

	const stopPolling = () => {
		if (pollingInterval) {
			clearInterval(pollingInterval);
			setPollingInterval(null);
		}
	};

	const handleRetry = () => {
		setIsLoading(true);
		toast.info(`Job trigger sent for ${appName}. Checking for updates...`);

		// Simulate API call
		setTimeout(() => {
			startPolling();
			setIsLoading(false);
		}, 1000);
	};

	if (!hasContent) {
		return (
			<Alert className="mb-6">
				<AlertDescription className="flex items-center justify-between">
					Content for {date} not found.
					<Button
						size="sm"
						onClick={handleRetry}
						disabled={isLoading}
						className="ml-4"
					>
						{isLoading ? (
							<>
								<div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2" />
								Triggering...
							</>
						) : (
							<>
								<RotateCcw className="h-3 w-3 mr-2" />
								Retry Now
							</>
						)}
					</Button>
				</AlertDescription>
			</Alert>
		);
	}

	const topics = content.split("\n---\n");

	return (
		<div className="space-y-8">
			{topics.map((topicContent, index) => {
				// トピック内容の最初の50文字をハッシュ化してキーとして使用
				const topicKey = `${appName}-topic-${topicContent
					.slice(0, 50)
					.replace(/\s+/g, "-")
					.replace(/[^\w-]/g, "")}-${index}`;
				return (
					<div key={topicKey} className="space-y-4">
						<div className="prose prose-sm max-w-none">
							<MarkdownRenderer
								content={topicContent}
								appName={appName}
								topicIndex={index}
							/>
						</div>
						<ChatInterface
							topicId={`${appName}-${index}`}
							topicContent={topicContent}
						/>
						{index < topics.length - 1 && <hr className="my-8" />}
					</div>
				);
			})}
		</div>
	);
}
