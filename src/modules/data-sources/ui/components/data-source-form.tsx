"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { DataSourceFormData } from "../../schemas/data-source";
import { dataSourceSchema } from "../../schemas/data-source";

type DataSourceFormProps = {
	initialData?: DataSourceFormData;
	onSuccess: (data: DataSourceFormData) => void;
	onCancel: () => void;
};

export function DataSourceForm({
	initialData,
	onSuccess,
	onCancel,
}: DataSourceFormProps) {
	const [inputValues, setInputValues] = useState<Record<string, string>>({});
	const [_platform, setPlatform] = useState<string>(
		initialData?.platform || "",
	);

	const form = useForm<DataSourceFormData>({
		resolver: zodResolver(dataSourceSchema),
		defaultValues: initialData || {
			name: "",
			platform: "reddit",
			config: {
				subreddits: [],
				accounts: [],
				channels: [],
				hashtags: [],
				keywords: [],
			},
		},
	});

	const onSubmit = (data: DataSourceFormData) => {
		console.log("Form submitted:", data);
		onSuccess(data);
	};

	const handleAddItem = (field: keyof DataSourceFormData["config"]) => {
		const inputValue = inputValues[field] || "";
		if (!inputValue.trim()) return;

		const currentValues = form.getValues(`config.${field}`) || [];
		form.setValue(`config.${field}`, [...currentValues, inputValue.trim()]);
		setInputValues((prev) => ({ ...prev, [field]: "" }));
	};

	const handleRemoveItem = (
		field: keyof DataSourceFormData["config"],
		index: number,
	) => {
		const currentValues = form.getValues(`config.${field}`) || [];
		form.setValue(
			`config.${field}`,
			currentValues.filter((_, i) => i !== index),
		);
	};

	const renderPlatformFields = () => {
		const selectedPlatform = form.watch("platform");

		switch (selectedPlatform) {
			case "reddit":
				return (
					<>
						<FormField
							control={form.control}
							name="config.subreddits"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subreddits</FormLabel>
									<FormControl>
										<div className="space-y-2">
											<div className="flex gap-2">
												<Input
													value={inputValues.subreddits || ""}
													onChange={(e) =>
														setInputValues((prev) => ({
															...prev,
															subreddits: e.target.value,
														}))
													}
													placeholder="r/programming"
													onKeyPress={(e) => {
														if (e.key === "Enter") {
															e.preventDefault();
															handleAddItem("subreddits");
														}
													}}
												/>
												<Button
													type="button"
													onClick={() => handleAddItem("subreddits")}
												>
													追加
												</Button>
											</div>
											<div className="flex flex-wrap gap-2">
												{field.value?.map((subreddit, index) => (
													<Badge
														key={`subreddit-${subreddit}`}
														variant="secondary"
														className="pl-3 pr-1"
													>
														r/{subreddit}
														<button
															type="button"
															onClick={() =>
																handleRemoveItem("subreddits", index)
															}
															className="ml-2 hover:text-destructive"
														>
															<X className="h-3 w-3" />
														</button>
													</Badge>
												))}
											</div>
										</div>
									</FormControl>
									<FormDescription>
										情報を取得したいSubredditを追加してください
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="config.keywords"
							render={({ field }) => (
								<FormItem>
									<FormLabel>キーワード（オプション）</FormLabel>
									<FormControl>
										<div className="space-y-2">
											<div className="flex gap-2">
												<Input
													value={inputValues.keywords || ""}
													onChange={(e) =>
														setInputValues((prev) => ({
															...prev,
															keywords: e.target.value,
														}))
													}
													placeholder="React"
													onKeyPress={(e) => {
														if (e.key === "Enter") {
															e.preventDefault();
															handleAddItem("keywords");
														}
													}}
												/>
												<Button
													type="button"
													onClick={() => handleAddItem("keywords")}
												>
													追加
												</Button>
											</div>
											<div className="flex flex-wrap gap-2">
												{field.value?.map((keyword, index) => (
													<Badge
														key={`reddit-keyword-${keyword}`}
														variant="secondary"
														className="pl-3 pr-1"
													>
														{keyword}
														<button
															type="button"
															onClick={() =>
																handleRemoveItem("keywords", index)
															}
															className="ml-2 hover:text-destructive"
														>
															<X className="h-3 w-3" />
														</button>
													</Badge>
												))}
											</div>
										</div>
									</FormControl>
									<FormDescription>
										フィルタリングに使用するキーワードを追加できます
									</FormDescription>
								</FormItem>
							)}
						/>
					</>
				);
			case "twitter":
				return (
					<>
						<FormField
							control={form.control}
							name="config.accounts"
							render={({ field }) => (
								<FormItem>
									<FormLabel>アカウント</FormLabel>
									<FormControl>
										<div className="space-y-2">
											<div className="flex gap-2">
												<Input
													value={inputValues.accounts || ""}
													onChange={(e) =>
														setInputValues((prev) => ({
															...prev,
															accounts: e.target.value,
														}))
													}
													placeholder="@vercel"
													onKeyPress={(e) => {
														if (e.key === "Enter") {
															e.preventDefault();
															handleAddItem("accounts");
														}
													}}
												/>
												<Button
													type="button"
													onClick={() => handleAddItem("accounts")}
												>
													追加
												</Button>
											</div>
											<div className="flex flex-wrap gap-2">
												{field.value?.map((account, index) => (
													<Badge
														key={`twitter-account-${account}`}
														variant="secondary"
														className="pl-3 pr-1"
													>
														{account}
														<button
															type="button"
															onClick={() =>
																handleRemoveItem("accounts", index)
															}
															className="ml-2 hover:text-destructive"
														>
															<X className="h-3 w-3" />
														</button>
													</Badge>
												))}
											</div>
										</div>
									</FormControl>
									<FormDescription>
										フォローしたいアカウントを追加してください
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="config.hashtags"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ハッシュタグ（オプション）</FormLabel>
									<FormControl>
										<div className="space-y-2">
											<div className="flex gap-2">
												<Input
													value={inputValues.hashtags || ""}
													onChange={(e) =>
														setInputValues((prev) => ({
															...prev,
															hashtags: e.target.value,
														}))
													}
													placeholder="#webdev"
													onKeyPress={(e) => {
														if (e.key === "Enter") {
															e.preventDefault();
															handleAddItem("hashtags");
														}
													}}
												/>
												<Button
													type="button"
													onClick={() => handleAddItem("hashtags")}
												>
													追加
												</Button>
											</div>
											<div className="flex flex-wrap gap-2">
												{field.value?.map((hashtag, index) => (
													<Badge
														key={`twitter-hashtag-${hashtag}`}
														variant="secondary"
														className="pl-3 pr-1"
													>
														{hashtag}
														<button
															type="button"
															onClick={() =>
																handleRemoveItem("hashtags", index)
															}
															className="ml-2 hover:text-destructive"
														>
															<X className="h-3 w-3" />
														</button>
													</Badge>
												))}
											</div>
										</div>
									</FormControl>
									<FormDescription>
										追跡したいハッシュタグを追加できます
									</FormDescription>
								</FormItem>
							)}
						/>
					</>
				);
			case "youtube":
				return (
					<>
						<FormField
							control={form.control}
							name="config.channels"
							render={({ field }) => (
								<FormItem>
									<FormLabel>チャンネル</FormLabel>
									<FormControl>
										<div className="space-y-2">
											<div className="flex gap-2">
												<Input
													value={inputValues.channels || ""}
													onChange={(e) =>
														setInputValues((prev) => ({
															...prev,
															channels: e.target.value,
														}))
													}
													placeholder="Fireship"
													onKeyPress={(e) => {
														if (e.key === "Enter") {
															e.preventDefault();
															handleAddItem("channels");
														}
													}}
												/>
												<Button
													type="button"
													onClick={() => handleAddItem("channels")}
												>
													追加
												</Button>
											</div>
											<div className="flex flex-wrap gap-2">
												{field.value?.map((channel, index) => (
													<Badge
														key={`youtube-channel-${channel}`}
														variant="secondary"
														className="pl-3 pr-1"
													>
														{channel}
														<button
															type="button"
															onClick={() =>
																handleRemoveItem("channels", index)
															}
															className="ml-2 hover:text-destructive"
														>
															<X className="h-3 w-3" />
														</button>
													</Badge>
												))}
											</div>
										</div>
									</FormControl>
									<FormDescription>
										動画を取得したいチャンネルを追加してください
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="config.keywords"
							render={({ field }) => (
								<FormItem>
									<FormLabel>キーワード（オプション）</FormLabel>
									<FormControl>
										<div className="space-y-2">
											<div className="flex gap-2">
												<Input
													value={inputValues.keywordsYoutube || ""}
													onChange={(e) =>
														setInputValues((prev) => ({
															...prev,
															keywordsYoutube: e.target.value,
														}))
													}
													placeholder="tutorial"
													onKeyPress={(e) => {
														if (e.key === "Enter") {
															e.preventDefault();
															handleAddItem("keywords");
														}
													}}
												/>
												<Button
													type="button"
													onClick={() => handleAddItem("keywords")}
												>
													追加
												</Button>
											</div>
											<div className="flex flex-wrap gap-2">
												{field.value?.map((keyword, index) => (
													<Badge
														key={`youtube-keyword-${keyword}`}
														variant="secondary"
														className="pl-3 pr-1"
													>
														{keyword}
														<button
															type="button"
															onClick={() =>
																handleRemoveItem("keywords", index)
															}
															className="ml-2 hover:text-destructive"
														>
															<X className="h-3 w-3" />
														</button>
													</Badge>
												))}
											</div>
										</div>
									</FormControl>
									<FormDescription>
										フィルタリングに使用するキーワードを追加できます
									</FormDescription>
								</FormItem>
							)}
						/>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>データソース名</FormLabel>
							<FormControl>
								<Input placeholder="Reddit - プログラミング" {...field} />
							</FormControl>
							<FormDescription>
								このデータソースを識別するための名前を入力してください
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="platform"
					render={({ field }) => (
						<FormItem>
							<FormLabel>プラットフォーム</FormLabel>
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									setPlatform(value);
								}}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="プラットフォームを選択" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="reddit">Reddit</SelectItem>
									<SelectItem value="twitter">Twitter</SelectItem>
									<SelectItem value="youtube">YouTube</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								情報を取得するプラットフォームを選択してください
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{renderPlatformFields()}

				<div className="flex justify-end gap-4">
					<Button type="button" variant="outline" onClick={onCancel}>
						キャンセル
					</Button>
					<Button type="submit">{initialData ? "更新" : "作成"}</Button>
				</div>
			</form>
		</Form>
	);
}
