import { z } from "zod";

export const dataSourceSchema = z.object({
	name: z.string().min(1, "名前は必須です"),
	platform: z.enum(["reddit", "twitter", "youtube"], {
		error: "プラットフォームを選択してください",
	}),
	config: z.object({
		subreddits: z.array(z.string()).optional(),
		accounts: z.array(z.string()).optional(),
		channels: z.array(z.string()).optional(),
		hashtags: z.array(z.string()).optional(),
		keywords: z.array(z.string()).optional(),
	}),
});

export type DataSourceFormData = z.infer<typeof dataSourceSchema>;
