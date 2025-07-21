// schema.ts

import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core";

// Enums
export const dataSourceEnum = pgEnum("data_source_type", [
	"reddit",
	"twitter",
	"youtube",
	"instagram",
	"hackernews",
]);

export const conditionTypeEnum = pgEnum("condition_type", [
	"account",
	"keyword",
	"subreddit",
	"channel",
	"hashtag",
]);

// Tables

// ユーザー（Supabase Auth連携）
export const users = pgTable("users", {
	id: uuid("id").primaryKey(), // auth.users.id を参照
	name: text("name").notNull(),
	avatarUrl: text("avatar_url"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// データソース定義
export const dataSources = pgTable("data_sources", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: dataSourceEnum("name").notNull().unique(),
	displayName: text("display_name").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 条件タイプ定義
export const conditionTypes = pgTable("condition_types", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: conditionTypeEnum("name").notNull().unique(),
	displayName: text("display_name").notNull(),
	description: text("description"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

// データソースごとの使用可能な条件
export const dataSourceConditions = pgTable(
	"data_source_conditions",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		dataSourceId: uuid("data_source_id")
			.references(() => dataSources.id)
			.notNull(),
		conditionTypeId: uuid("condition_type_id")
			.references(() => conditionTypes.id)
			.notNull(),
		isRequired: boolean("is_required").default(false).notNull(),
		maxItems: integer("max_items"), // 配列型の場合の最大数
	},
	(table) => {
		return {
			dataSourceConditionUnique: unique("data_source_condition_unique").on(
				table.dataSourceId,
				table.conditionTypeId,
			),
		};
	},
);

// ユーザーの取得設定
export const userFetchConfigs = pgTable(
	"user_fetch_configs",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		userId: uuid("user_id")
			.references(() => users.id)
			.notNull(),
		dataSourceId: uuid("data_source_id")
			.references(() => dataSources.id)
			.notNull(),
		name: text("name").notNull(),
		isActive: boolean("is_active").default(true).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => {
		return {
			userIdIdx: index("user_fetch_configs_user_id_idx").on(table.userId),
		};
	},
);

// ユーザーの検索条件
export const userConditions = pgTable(
	"user_conditions",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		configId: uuid("config_id")
			.references(() => userFetchConfigs.id)
			.notNull(),
		conditionTypeId: uuid("condition_type_id")
			.references(() => conditionTypes.id)
			.notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => {
		return {
			configConditionUnique: unique("config_condition_unique").on(
				table.configId,
				table.conditionTypeId,
			),
		};
	},
);

// 条件の値（配列対応）
export const userConditionItems = pgTable(
	"user_condition_items",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		conditionId: uuid("condition_id")
			.references(() => userConditions.id)
			.notNull(),
		value: text("value").notNull(),
		order: integer("order").default(0).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => {
		return {
			conditionIdIdx: index("user_condition_items_condition_id_idx").on(
				table.conditionId,
			),
		};
	},
);

// 取得したデータ
export const fetchedData = pgTable(
	"fetched_data",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		configId: uuid("config_id")
			.references(() => userFetchConfigs.id)
			.notNull(),
		externalId: text("external_id").notNull(), // 外部サービスのID
		title: text("title").notNull(),
		content: text("content"),
		url: text("url").notNull(),
		authorName: text("author_name"),
		authorId: text("author_id"),
		authorAvatarUrl: text("author_avatar_url"),
		publishedAt: timestamp("published_at"),
		engagement: jsonb("engagement"), // likes, comments, etc.
		media: jsonb("media").$type<string[]>().default([]),
		tags: jsonb("tags").$type<string[]>().default([]),
		rawData: jsonb("raw_data"), // 元データ保存用
		fetchedAt: timestamp("fetched_at").defaultNow().notNull(),
	},
	(table) => {
		return {
			configExternalUnique: unique("config_external_unique").on(
				table.configId,
				table.externalId,
			),
			configIdIdx: index("fetched_data_config_id_idx").on(table.configId),
			publishedAtIdx: index("fetched_data_published_at_idx").on(
				table.publishedAt,
			),
		};
	},
);

// Relations（変更なし）
export const usersRelations = relations(users, ({ many }) => ({
	fetchConfigs: many(userFetchConfigs),
}));

export const dataSourcesRelations = relations(dataSources, ({ many }) => ({
	conditions: many(dataSourceConditions),
	fetchConfigs: many(userFetchConfigs),
}));

export const conditionTypesRelations = relations(
	conditionTypes,
	({ many }) => ({
		dataSourceConditions: many(dataSourceConditions),
		userConditions: many(userConditions),
	}),
);

export const dataSourceConditionsRelations = relations(
	dataSourceConditions,
	({ one }) => ({
		dataSource: one(dataSources, {
			fields: [dataSourceConditions.dataSourceId],
			references: [dataSources.id],
		}),
		conditionType: one(conditionTypes, {
			fields: [dataSourceConditions.conditionTypeId],
			references: [conditionTypes.id],
		}),
	}),
);

export const userFetchConfigsRelations = relations(
	userFetchConfigs,
	({ one, many }) => ({
		user: one(users, {
			fields: [userFetchConfigs.userId],
			references: [users.id],
		}),
		dataSource: one(dataSources, {
			fields: [userFetchConfigs.dataSourceId],
			references: [dataSources.id],
		}),
		conditions: many(userConditions),
		fetchedData: many(fetchedData),
	}),
);

export const userConditionsRelations = relations(
	userConditions,
	({ one, many }) => ({
		config: one(userFetchConfigs, {
			fields: [userConditions.configId],
			references: [userFetchConfigs.id],
		}),
		conditionType: one(conditionTypes, {
			fields: [userConditions.conditionTypeId],
			references: [conditionTypes.id],
		}),
		items: many(userConditionItems),
	}),
);

export const userConditionItemsRelations = relations(
	userConditionItems,
	({ one }) => ({
		condition: one(userConditions, {
			fields: [userConditionItems.conditionId],
			references: [userConditions.id],
		}),
	}),
);

export const fetchedDataRelations = relations(fetchedData, ({ one }) => ({
	config: one(userFetchConfigs, {
		fields: [fetchedData.configId],
		references: [userFetchConfigs.id],
	}),
}));

// 型エクスポート
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type DataSource = typeof dataSources.$inferSelect;
export type ConditionType = typeof conditionTypes.$inferSelect;
export type UserFetchConfig = typeof userFetchConfigs.$inferSelect;
export type NewUserFetchConfig = typeof userFetchConfigs.$inferInsert;
export type FetchedData = typeof fetchedData.$inferSelect;
export type NewFetchedData = typeof fetchedData.$inferInsert;
