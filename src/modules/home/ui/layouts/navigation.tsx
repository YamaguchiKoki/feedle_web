"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LAYOUT_CLASSES } from "@/modules/home/constants/layout";

export function Navigation() {
	const [time, setTime] = useState<string>("--:--");
	// const [weather, setWeather] = useState<string>("Loading...")

	useEffect(() => {
		// Update clock
		const updateClock = () => {
			const now = new Date();
			const hours = String(now.getHours()).padStart(2, "0");
			const minutes = String(now.getMinutes()).padStart(2, "0");
			setTime(`${hours}:${minutes}`);
		};

		updateClock();
		const clockInterval = setInterval(updateClock, 60000);

		// // Update weather
		// const updateWeather = async () => {
		//   try {
		//     const response = await fetch("/api/weather")
		//     const data = await response.json()
		//     setWeather(`${data.temp}°C ${data.weather_icon}`)
		//   } catch (error) {
		//     console.error("Weather update failed:", error)
		//     setWeather("Weather unavailable")
		//   }
		// }

		// updateWeather()
		// const weatherInterval = setInterval(updateWeather, 600000) // 10 minutes

		return () => {
			clearInterval(clockInterval);
			// clearInterval(weatherInterval)
		};
	}, []);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border">
			<div
				className={`container mx-auto px-4 ${LAYOUT_CLASSES.navbarHeight} flex items-center justify-between`}
			>
				<Link
					href="/"
					className="flex items-center gap-2 text-sm font-semibold text-sidebar-foreground hover:text-sidebar-foreground/80 transition-colors"
				>
					<Image
						src="https://api.dicebear.com/7.x/shapes/svg?seed=nook"
						alt="feedle"
						width={20}
						height={20}
						className="rounded"
					/>
					feedle
				</Link>

				<div className="flex items-center gap-2 text-sm text-sidebar-foreground/70 font-mono">
					<span>{time}</span>
					<span className="text-sidebar-foreground/50">·</span>
					{/* <span>{weather}</span> */}
				</div>
			</div>
		</nav>
	);
}
