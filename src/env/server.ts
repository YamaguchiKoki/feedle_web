// src/env/server.ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
	server: {
		// Database
		DATABASE_URL: z.url(),

		// Node
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
	},

	experimental__runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
	},

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,

	emptyStringAsUndefined: true,
});
