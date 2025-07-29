"use client";

import { Database, Home } from "lucide-react";
import { usePathname } from "next/navigation";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LAYOUT_CLASSES } from "@/modules/home/constants/layout";

// Menu items.
const items = [
	{
		title: "Home",
		url: "/home",
		icon: Home,
	},
	{
		title: "データソース",
		url: "/data-sources",
		icon: Database,
	},
];

export function AppSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar
			className={`${LAYOUT_CLASSES.sidebarTop} ${LAYOUT_CLASSES.sidebarHeight}`}
		>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild isActive={pathname === item.url}>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
