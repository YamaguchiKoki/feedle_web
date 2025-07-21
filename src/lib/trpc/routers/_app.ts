import { z } from "zod";
import {
	baseProcedure,
	createTRPCRouter,
	protectedProcedure,
} from "@/lib/trpc/init";

export const appRouter = createTRPCRouter({
	// Public procedure example
	hello: baseProcedure
		.input(z.object({ name: z.string().optional() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.name ?? "World"}!`,
			};
		}),

	// Protected procedure example (requires authentication)
	getProfile: protectedProcedure.query(({ ctx }) => {
		return {
			id: ctx.user.id,
			name: ctx.user.name,
			email: ctx.supabaseUser?.email,
		};
	}),
});

// export type definition of API
export type AppRouter = typeof appRouter;
