import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const clientEnv = createEnv({
	client: {
		// Supabase
		NEXT_PUBLIC_SUPABASE_URL: z.url(),
		NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),

		// アプリ設定
		NEXT_PUBLIC_APP_URL: z.url().optional().default("http://localhost:3000"),
	},

	runtimeEnv: {
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	},

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,

	emptyStringAsUndefined: true,
});
