import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	throw new Error("DATABASE_URL is not defined in environment variables");
}

export default defineConfig({
	schema: "./src/db/schema.ts",
	out: "./supabase/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: DATABASE_URL,
	},
});
