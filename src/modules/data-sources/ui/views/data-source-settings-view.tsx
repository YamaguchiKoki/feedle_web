"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataSourceForm } from "../components/data-source-form";
import { DataSourceList } from "../components/data-source-list";

export function DataSourceSettingsView() {
	const [isAddingSource, setIsAddingSource] = useState(false);

	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">取得設定</h1>
					<p className="text-muted-foreground mt-2">
						情報を取得するデータソースを管理します
					</p>
				</div>
				{!isAddingSource && (
					<Button onClick={() => setIsAddingSource(true)}>
						<Plus className="mr-2 h-4 w-4" />
						データソースを追加
					</Button>
				)}
			</div>

			{isAddingSource ? (
				<Card>
					<CardHeader>
						<CardTitle>新しいデータソースを追加</CardTitle>
						<CardDescription>
							取得したい情報源を設定してください
						</CardDescription>
					</CardHeader>
					<CardContent>
						<DataSourceForm
							onSuccess={() => setIsAddingSource(false)}
							onCancel={() => setIsAddingSource(false)}
						/>
					</CardContent>
				</Card>
			) : (
				<Tabs defaultValue="active" className="w-full">
					<TabsList>
						<TabsTrigger value="active">有効</TabsTrigger>
						<TabsTrigger value="inactive">無効</TabsTrigger>
						<TabsTrigger value="all">すべて</TabsTrigger>
					</TabsList>
					<TabsContent value="active" className="mt-6">
						<DataSourceList />
					</TabsContent>
					<TabsContent value="inactive" className="mt-6">
						<DataSourceList />
					</TabsContent>
					<TabsContent value="all" className="mt-6">
						<DataSourceList />
					</TabsContent>
				</Tabs>
			)}
		</div>
	);
}
