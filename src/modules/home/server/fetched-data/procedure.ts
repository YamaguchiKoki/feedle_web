import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/lib/trpc/init";
import { getMockFetchedData } from "./mock-data";

export const fetchedDataRouter = createTRPCRouter({
	getByDateAndDataSource: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				dataSourceName: z.string().nullish(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { id: userId } = ctx.user;
			const { date, dataSourceName } = input;

			console.log("Fetching data for:", { userId, date, dataSourceName });

			// モックデータを取得
			const mockFetchedData = getMockFetchedData(date);

			// データソース名でフィルタリング
			if (!dataSourceName) {
				// 全部のdataSourceから取得
				console.log("Returning all data, count:", mockFetchedData.length);
				return mockFetchedData;
			}

			const filteredData = mockFetchedData.filter((item) => {
				// 実際のデータソース名に合わせてマッピング
				if (dataSourceName === "reddit")
					return item.externalId.startsWith("reddit_");
				if (dataSourceName === "twitter")
					return item.externalId.startsWith("twitter_");
				if (dataSourceName === "youtube")
					return item.externalId.startsWith("youtube_");
				if (dataSourceName === "instagram")
					return item.externalId.startsWith("instagram_");
				if (dataSourceName === "hackernews")
					return item.externalId.startsWith("hackernews_");
				// 古い名前のサポート（互換性のため）
				if (dataSourceName === "github_trending")
					return item.externalId.startsWith("github_");
				if (dataSourceName === "hacker_news")
					return item.externalId.startsWith("hackernews_");
				if (dataSourceName === "paper_summarizer")
					return item.externalId.startsWith("paper_");
				if (dataSourceName === "reddit_explorer")
					return item.externalId.startsWith("reddit_");
				if (dataSourceName === "tech_feed")
					return item.externalId.startsWith("tech_");
				return false; // デフォルトで何も返さない
			});

			console.log(
				`Filtered data for "${dataSourceName}":`,
				filteredData.length,
			);
			return filteredData;
		}),

	getById: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { id: userId } = ctx.user;
			const { id } = input;

			console.log("Fetching single data:", { userId, id });

			// 全てのモックデータを取得
			const allMockData = getMockFetchedData(
				new Date().toISOString().split("T")[0],
			);

			// IDに基づいて該当する記事を検索
			const foundItem = allMockData.find((item) => item.id === id);

			if (!foundItem) {
				throw new Error(`Article with id ${id} not found`);
			}

			return foundItem;
		}),
});
