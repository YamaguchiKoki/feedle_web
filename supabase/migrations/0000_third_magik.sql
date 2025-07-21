CREATE TYPE "public"."condition_type" AS ENUM('account', 'keyword', 'subreddit', 'channel', 'hashtag');--> statement-breakpoint
CREATE TYPE "public"."data_source_type" AS ENUM('reddit', 'twitter', 'youtube', 'instagram', 'hackernews');--> statement-breakpoint
CREATE TABLE "condition_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" "condition_type" NOT NULL,
	"display_name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "condition_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "data_source_conditions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"data_source_id" uuid NOT NULL,
	"condition_type_id" uuid NOT NULL,
	"is_required" boolean DEFAULT false NOT NULL,
	"max_items" integer,
	CONSTRAINT "data_source_condition_unique" UNIQUE("data_source_id","condition_type_id")
);
--> statement-breakpoint
CREATE TABLE "data_sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" "data_source_type" NOT NULL,
	"display_name" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "data_sources_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "fetched_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"config_id" uuid NOT NULL,
	"external_id" text NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"url" text NOT NULL,
	"author_name" text,
	"author_id" text,
	"author_avatar_url" text,
	"published_at" timestamp,
	"engagement" jsonb,
	"media" jsonb DEFAULT '[]'::jsonb,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"raw_data" jsonb,
	"fetched_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "config_external_unique" UNIQUE("config_id","external_id")
);
--> statement-breakpoint
CREATE TABLE "user_condition_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"condition_id" uuid NOT NULL,
	"value" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_conditions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"config_id" uuid NOT NULL,
	"condition_type_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "config_condition_unique" UNIQUE("config_id","condition_type_id")
);
--> statement-breakpoint
CREATE TABLE "user_fetch_configs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"data_source_id" uuid NOT NULL,
	"name" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "data_source_conditions" ADD CONSTRAINT "data_source_conditions_data_source_id_data_sources_id_fk" FOREIGN KEY ("data_source_id") REFERENCES "public"."data_sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_source_conditions" ADD CONSTRAINT "data_source_conditions_condition_type_id_condition_types_id_fk" FOREIGN KEY ("condition_type_id") REFERENCES "public"."condition_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fetched_data" ADD CONSTRAINT "fetched_data_config_id_user_fetch_configs_id_fk" FOREIGN KEY ("config_id") REFERENCES "public"."user_fetch_configs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_condition_items" ADD CONSTRAINT "user_condition_items_condition_id_user_conditions_id_fk" FOREIGN KEY ("condition_id") REFERENCES "public"."user_conditions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_conditions" ADD CONSTRAINT "user_conditions_config_id_user_fetch_configs_id_fk" FOREIGN KEY ("config_id") REFERENCES "public"."user_fetch_configs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_conditions" ADD CONSTRAINT "user_conditions_condition_type_id_condition_types_id_fk" FOREIGN KEY ("condition_type_id") REFERENCES "public"."condition_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_fetch_configs" ADD CONSTRAINT "user_fetch_configs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_fetch_configs" ADD CONSTRAINT "user_fetch_configs_data_source_id_data_sources_id_fk" FOREIGN KEY ("data_source_id") REFERENCES "public"."data_sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "fetched_data_config_id_idx" ON "fetched_data" USING btree ("config_id");--> statement-breakpoint
CREATE INDEX "fetched_data_published_at_idx" ON "fetched_data" USING btree ("published_at");--> statement-breakpoint
CREATE INDEX "user_condition_items_condition_id_idx" ON "user_condition_items" USING btree ("condition_id");--> statement-breakpoint
CREATE INDEX "user_fetch_configs_user_id_idx" ON "user_fetch_configs" USING btree ("user_id");