import { initTRPC, TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { cache } from "react";
import superjson from "superjson";
import { db } from "@/db";
import { users } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";

export const createTRPCContext = cache(async () => {
	/**
	 * @see: https://trpc.io/docs/server/context
	 */
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return {
		supabaseUser: user,
		supabaseUserId: user?.id || null,
	};
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
	/**
	 * @see https://trpc.io/docs/server/data-transformers
	 */
	transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async (opts) => {
	const { ctx } = opts;

	if (!ctx.supabaseUserId || !ctx.supabaseUser) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Not authorized - no valid session",
		});
	}

	// public.usersテーブルからユーザー情報を取得
	const [dbUser] = await db
		.select()
		.from(users)
		.where(eq(users.id, ctx.supabaseUserId));

	if (!dbUser) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "User not found in database",
		});
	}

	// const { success } = await ratelimit.limit(dbUser.id);

	// if (!success) {
	//   throw new TRPCError({
	//     code: 'TOO_MANY_REQUESTS',
	//     message: 'Too many requests',
	//   });
	// }

	return opts.next({
		ctx: {
			...ctx,
			user: dbUser,
			supabaseUser: ctx.supabaseUser,
		},
	});
});
