"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LogoutPage() {
	const supabase = createClient();
	const router = useRouter();

	useEffect(() => {
		const signOut = async () => {
			try {
				await supabase.auth.signOut();
				// Clear all local storage and session storage
				localStorage.clear();
				sessionStorage.clear();
			} catch (error) {
				console.error("Logout error:", error);
				// Force clear even if signOut fails
				localStorage.clear();
				sessionStorage.clear();
			}
			router.push("/login");
		};
		signOut();
	}, [supabase, router]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center">
				<p className="text-gray-600">ログアウト中...</p>
			</div>
		</div>
	);
}
