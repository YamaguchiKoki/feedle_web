import type { DataSource } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/lib/trpc/init";

export const dataSourceRouter = createTRPCRouter({
	getMany: protectedProcedure.query(async ({ ctx }) => {
		const { id } = ctx.user;
		console.log("successfully get from ctx", id);

		const mockDataSources: DataSource[] = [
			{
				id: "550e8400-e29b-41d4-a716-446655440001",
				name: "reddit",
				displayName: "Reddit",
				isActive: true,
				createdAt: new Date("2024-01-01T00:00:00Z"),
			},
			{
				id: "550e8400-e29b-41d4-a716-446655440002",
				name: "twitter",
				displayName: "X (Twitter)",
				isActive: true,
				createdAt: new Date("2024-01-02T00:00:00Z"),
			},
			{
				id: "550e8400-e29b-41d4-a716-446655440003",
				name: "youtube",
				displayName: "YouTube",
				isActive: true,
				createdAt: new Date("2024-01-03T00:00:00Z"),
			},
			{
				id: "550e8400-e29b-41d4-a716-446655440004",
				name: "instagram",
				displayName: "Instagram",
				isActive: false,
				createdAt: new Date("2024-01-04T00:00:00Z"),
			},
			{
				id: "550e8400-e29b-41d4-a716-446655440005",
				name: "hackernews",
				displayName: "Hacker News",
				isActive: true,
				createdAt: new Date("2024-01-05T00:00:00Z"),
			},
		];

		return mockDataSources;
	}),
});
