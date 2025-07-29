"use client";

import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { DataSourceFormData } from "../../schemas/data-source";
import { DataSourceForm } from "./data-source-form";

// データソースの型定義
type DataSource = {
	id: string;
	name: string;
	platform: "Reddit" | "Twitter" | "YouTube";
	status: "active" | "inactive";
	lastFetch: string;
	config: {
		subreddits?: string[];
		accounts?: string[];
		channels?: string[];
		hashtags?: string[];
		keywords?: string[];
	};
};

// モックデータ
const mockDataSources: DataSource[] = [
	{
		id: "1",
		name: "Reddit - プログラミング",
		platform: "Reddit",
		status: "active",
		lastFetch: "2024-01-20T10:30:00",
		config: {
			subreddits: ["programming", "webdev", "javascript"],
			keywords: ["React", "TypeScript", "Next.js"],
		},
	},
	{
		id: "2",
		name: "Twitter - Tech News",
		platform: "Twitter",
		status: "active",
		lastFetch: "2024-01-20T09:15:00",
		config: {
			accounts: ["@vercel", "@reactjs", "@typescript"],
			hashtags: ["#webdev", "#javascript"],
		},
	},
	{
		id: "3",
		name: "YouTube - 開発チュートリアル",
		platform: "YouTube",
		status: "inactive",
		lastFetch: "2024-01-19T18:00:00",
		config: {
			channels: ["Fireship", "TraversyMedia"],
			keywords: ["tutorial", "crash course"],
		},
	},
];

const platformColors: Record<string, string> = {
	Reddit: "bg-orange-500",
	Twitter: "bg-blue-500",
	YouTube: "bg-red-500",
};

export function DataSourceList() {
	const [dataSources, setDataSources] = useState<DataSource[]>(mockDataSources);
	const [editingSource, setEditingSource] = useState<DataSource | null>(null);
	const [deletingSource, setDeletingSource] = useState<DataSource | null>(null);

	const handleEdit = (source: DataSource) => {
		setEditingSource(source);
	};

	const handleUpdate = (data: DataSourceFormData) => {
		if (!editingSource) return;

		setDataSources((prev) =>
			prev.map((source) =>
				source.id === editingSource.id
					? {
							...source,
							name: data.name,
							platform: data.platform as DataSource["platform"],
							config: data.config,
						}
					: source,
			),
		);
		setEditingSource(null);
		console.log("Updated data source:", data);
	};

	const handleDeleteConfirm = () => {
		if (!deletingSource) return;
		setDataSources((prev) => prev.filter((s) => s.id !== deletingSource.id));
		console.log("Deleted data source:", deletingSource.id);
		setDeletingSource(null);
	};

	return (
		<div className="grid gap-4">
			{dataSources.map((source) => (
				<Card key={source.id}>
					<CardHeader className="flex flex-row items-center justify-between">
						<div className="space-y-1">
							<CardTitle className="text-xl">{source.name}</CardTitle>
							<CardDescription>
								最終取得: {new Date(source.lastFetch).toLocaleString("ja-JP")}
							</CardDescription>
						</div>
						<div className="flex items-center gap-2">
							<Badge
								variant={source.status === "active" ? "default" : "secondary"}
							>
								{source.status === "active" ? "有効" : "無効"}
							</Badge>
							<Badge
								variant="outline"
								className={`${platformColors[source.platform]} text-white`}
							>
								{source.platform}
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<div className="mb-4">
							<h4 className="text-sm font-medium mb-2">取得設定</h4>
							<div className="flex flex-wrap gap-2">
								{source.platform === "Reddit" &&
									source.config.subreddits?.map((sub) => (
										<Badge key={sub} variant="secondary">
											r/{sub}
										</Badge>
									))}
								{source.platform === "Twitter" &&
									source.config.accounts?.map((account) => (
										<Badge key={account} variant="secondary">
											{account}
										</Badge>
									))}
								{source.platform === "YouTube" &&
									source.config.channels?.map((channel) => (
										<Badge key={channel} variant="secondary">
											{channel}
										</Badge>
									))}
							</div>
						</div>
						<div className="flex gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleEdit(source)}
							>
								<Edit className="mr-2 h-4 w-4" />
								編集
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setDeletingSource(source)}
							>
								<Trash2 className="mr-2 h-4 w-4" />
								削除
							</Button>
						</div>
					</CardContent>
				</Card>
			))}

			{/* 編集ダイアログ */}
			<Dialog
				open={!!editingSource}
				onOpenChange={(open) => !open && setEditingSource(null)}
			>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>データソースを編集</DialogTitle>
						<DialogDescription>
							データソースの設定を変更できます
						</DialogDescription>
					</DialogHeader>
					{editingSource && (
						<DataSourceForm
							initialData={{
								name: editingSource.name,
								platform: editingSource.platform as
									| "reddit"
									| "twitter"
									| "youtube",
								config: editingSource.config,
							}}
							onCancel={() => setEditingSource(null)}
							onSuccess={handleUpdate}
						/>
					)}
				</DialogContent>
			</Dialog>

			{/* 削除確認ダイアログ */}
			<AlertDialog
				open={!!deletingSource}
				onOpenChange={(open) => !open && setDeletingSource(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>データソースを削除しますか？</AlertDialogTitle>
						<AlertDialogDescription>
							「{deletingSource?.name}
							」を削除します。この操作は取り消すことができません。データソースに関連するすべての設定が削除されます。
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>キャンセル</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteConfirm}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							削除
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
