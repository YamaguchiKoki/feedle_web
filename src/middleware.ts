import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { clientEnv } from "@/env/client";

export async function middleware(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		clientEnv.NEXT_PUBLIC_SUPABASE_URL,
		clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value),
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	// Refresh session if expired - required for Server Components
	let user = null;
	try {
		const {
			data: { user: authUser },
		} = await supabase.auth.getUser();
		user = authUser;
	} catch (error) {
		console.error("Auth error in middleware:", error);
		// Clear invalid session cookies
		supabaseResponse.cookies.delete("sb-access-token");
		supabaseResponse.cookies.delete("sb-refresh-token");
	}

	// Protected routes - require authentication
	if (request.nextUrl.pathname.startsWith("/dashboard")) {
		if (!user) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	// Auth routes - redirect to dashboard if already logged in
	if (
		request.nextUrl.pathname.startsWith("/login") ||
		request.nextUrl.pathname.startsWith("/signup")
	) {
		if (user) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}

	return supabaseResponse;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - api routes (prevent double auth check)
		 */
		"/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
