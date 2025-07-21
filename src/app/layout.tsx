import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCProvider } from "@/lib/trpc/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "feedle",
	description: "A modern content aggregation platform",
	icons: {
		icon: [
			{
				url: "https://api.dicebear.com/7.x/shapes/svg?seed=nook",
				type: "image/svg+xml",
			},
			{
				url: "https://api.dicebear.com/7.x/shapes/png?seed=nook&size=32",
				sizes: "32x32",
				type: "image/png",
			},
			{
				url: "https://api.dicebear.com/7.x/shapes/png?seed=nook&size=16",
				sizes: "16x16",
				type: "image/png",
			},
		],
		apple: {
			url: "https://api.dicebear.com/7.x/shapes/png?seed=nook&size=180",
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<TRPCProvider>
						{children}
						<Toaster />
					</TRPCProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
