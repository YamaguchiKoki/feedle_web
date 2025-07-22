"use client";

import { useQueryState } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FilterCarousel } from "@/components/filter-carousel";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/client";

export const DataSourceSection = () => {
	return (
		// TODO:error fallback ui
		<ErrorBoundary
			fallback={<div>Something went wrong!</div>}
			onReset={() => window.location.reload()}
		>
			<Suspense fallback={<DataSourceSectionSkelton />}>
				<DataSourceSectionSuspense />
			</Suspense>
		</ErrorBoundary>
	);
};

const DataSourceSectionSkelton = () => {
	return (
		<CardContent className="p-6">
			<div className="mb-6">
				<FilterCarousel isLoading data={[]} onSelect={() => {}} />
			</div>
		</CardContent>
	);
};

const DataSourceSectionSuspense = () => {
	const [selected, setSelected] = useQueryState("source");
	const [sources] = trpc.dataSources.getMany.useSuspenseQuery();

	const data = sources.map(({ name }) => ({
		value: name,
		label: name,
	}));

	console.log("DataSource data:", data);

	if (sources.length === 0) {
		return (
			<Card>
				<CardContent className="p-6">
					<div className="text-center text-muted-foreground">
						No data sources available
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardContent className="p-6">
				<div className="mb-6">
					<FilterCarousel value={selected} data={data} onSelect={setSelected} />
				</div>
			</CardContent>
		</Card>
	);
};
