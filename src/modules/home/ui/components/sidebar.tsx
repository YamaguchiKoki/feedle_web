"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar22 } from "@/modules/home/ui/components/date-picker";
import { TableOfContents } from "@/modules/home/ui/components/table-of-contents";

interface SidebarProps {
	date: string;
}

export function Sidebar({ date }: SidebarProps) {
	const router = useRouter();

	const handleDateChange = (newDate: string) => {
		router.push(`/?date=${newDate}`);
	};

	return (
		<Card>
			<CardHeader className="pb-4">
				<Calendar22 date={date} onDateChange={handleDateChange} />
			</CardHeader>

			<CardContent className="pt-0">
				<div className="border-t border-border pt-4">
					<CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
						Contents
					</CardTitle>
					<TableOfContents />
				</div>
			</CardContent>
		</Card>
	);
}
