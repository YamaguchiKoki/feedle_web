"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
	id: string;
	text: string;
	level: number;
}

export function TableOfContents() {
	const [tocItems, setTocItems] = useState<TocItem[]>([]);
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		const updateToc = () => {
			const activeTab = document.querySelector(
				'[role="tabpanel"]:not(.hidden)',
			);
			if (!activeTab) return;

			const headings = Array.from(
				activeTab.querySelectorAll("h1, h2, h3, h4, h5, h6"),
			) as HTMLElement[];

			const items: TocItem[] = headings.map((heading) => ({
				id: heading.id,
				text: heading.textContent || "",
				level: Number.parseInt(heading.tagName.charAt(1)),
			}));

			setTocItems(items);
		};

		// Update TOC when content changes
		updateToc();

		// Listen for tab changes
		const tabButtons = document.querySelectorAll('[role="tab"]');
		tabButtons.forEach((button) => {
			button.addEventListener("click", () => {
				setTimeout(updateToc, 100); // Delay to allow tab content to render
			});
		});

		// Scroll spy
		const handleScroll = () => {
			const headings = Array.from(
				document.querySelectorAll(
					'[role="tabpanel"]:not(.hidden) h1, [role="tabpanel"]:not(.hidden) h2, [role="tabpanel"]:not(.hidden) h3, [role="tabpanel"]:not(.hidden) h4, [role="tabpanel"]:not(.hidden) h5, [role="tabpanel"]:not(.hidden) h6',
				),
			) as HTMLElement[];

			const scrollPosition = window.scrollY + 100;

			let currentHeading = "";
			for (const heading of headings) {
				const headingTop = heading.getBoundingClientRect().top + window.scrollY;
				if (headingTop <= scrollPosition) {
					currentHeading = heading.id;
				}
			}

			setActiveId(currentHeading);
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleClick = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
			setActiveId(id);
		}
	};

	return (
		<div className="max-h-96 overflow-y-auto custom-scrollbar">
			<ul className="space-y-1">
				{tocItems.map((item) => (
					<li key={item.id}>
						<button
							onClick={() => handleClick(item.id)}
							className={cn(
								"w-full text-left text-xs py-1 px-2 rounded transition-colors hover:bg-muted hover:text-foreground",
								"border-l-2 border-transparent",
								activeId === item.id &&
									"bg-muted text-foreground border-l-primary font-medium",
								item.level === 1 && "font-medium",
								item.level === 2 && "pl-4",
								item.level === 3 && "pl-6 text-muted-foreground",
								item.level >= 4 && "pl-8 text-muted-foreground",
							)}
							style={{ paddingLeft: `${(item.level - 1) * 8 + 8}px` }}
							type="button"
						>
							{item.text.length > 40
								? `${item.text.substring(0, 38)}...`
								: item.text}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
