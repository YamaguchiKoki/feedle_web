"use client";

import type React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LAYOUT_CLASSES } from "@/modules/home/constants/layout";
import { Navigation } from "@/modules/home/ui/layouts/navigation";
import { AppSidebar } from "@/modules/home/ui/layouts/sidebar";

interface HomeLayoutProps {
	children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
	return (
		<div className="flex h-screen overflow-hidden">
			<Navigation />
			<SidebarProvider>
				<AppSidebar />
				<div className="flex flex-col flex-1 overflow-hidden">
					<div
						className={`flex items-center p-2 bg-background ${LAYOUT_CLASSES.contentMarginTop} flex-shrink-0`}
					>
						<SidebarTrigger className="ml-2" />
					</div>
					{/* Main Content */}
					<main className="flex-1 bg-background overflow-auto">{children}</main>
				</div>
			</SidebarProvider>
		</div>
	);
}
