"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableOfContents } from "@/modules/home/ui/table-of-contents";

interface SidebarProps {
	date: string;
}

export function Sidebar({ date }: SidebarProps) {
	const [inputDate, setInputDate] = useState(date);
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		router.push(`/?date=${inputDate}`);
	};

	return (
		<Card>
			<CardHeader className="pb-4">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label
							htmlFor="date"
							className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
						>
							Date
						</Label>
						<Input
							id="date"
							type="text"
							value={inputDate}
							onChange={(e) => setInputDate(e.target.value)}
							placeholder="YYYY-MM-DD"
							className="text-sm"
						/>
					</div>
					<Button type="submit" className="w-full text-sm">
						Load
					</Button>
				</form>
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
