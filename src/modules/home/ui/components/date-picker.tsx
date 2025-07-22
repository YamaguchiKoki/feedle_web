"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface Calendar22Props {
	date?: string;
	onDateChange?: (date: string) => void;
	label?: string;
}

export function Calendar22({
	date,
	onDateChange,
	label = "Date",
}: Calendar22Props) {
	const [open, setOpen] = React.useState(false);
	const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
		date ? new Date(date) : undefined,
	);

	const handleDateSelect = (date: Date | undefined) => {
		setSelectedDate(date);
		if (date && onDateChange) {
			const formattedDate = date.toISOString().split("T")[0];
			onDateChange(formattedDate);
		}
		setOpen(false);
	};

	return (
		<div className="flex flex-col gap-3">
			<Label
				htmlFor="date"
				className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
			>
				{label}
			</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-full justify-between font-normal text-sm"
					>
						{selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
						<ChevronDownIcon className="h-4 w-4" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="single"
						selected={selectedDate}
						captionLayout="dropdown"
						onSelect={handleDateSelect}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
