"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { DataSourceForm } from "../components/data-source-form";
import { DataSourceList } from "../components/data-source-list";

export function DataSourcesView() {
	const [isFormOpen, setIsFormOpen] = useState(false);

	return (
		<div className="container mx-auto p-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">データソース管理</h1>
				<p className="text-muted-foreground">
					情報を取得するデータソースと取得条件を設定します
				</p>
			</div>

			<div className="mb-6">
				<Button onClick={() => setIsFormOpen(true)}>
					<Plus className="mr-2 h-4 w-4" />
					新しいデータソースを追加
				</Button>
			</div>

			<DataSourceList />

			<Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>新しいデータソースを追加</DialogTitle>
						<DialogDescription>
							取得したい情報源を設定してください
						</DialogDescription>
					</DialogHeader>
					<DataSourceForm
						onCancel={() => setIsFormOpen(false)}
						onSuccess={(data) => {
							console.log("New data source:", data);
							setIsFormOpen(false);
						}}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
