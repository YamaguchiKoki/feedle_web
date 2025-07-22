import { HydrateClient, trpc } from "@/lib/trpc/server";
import { DashboardView } from "@/modules/home/ui/views/dashboard-view";

interface PageProps {
	searchParams: Promise<{ date?: string; source?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
	const params = await searchParams;
	const date = params.date || new Date().toISOString().split("T")[0];
	const selectedSource = params.source;

	void trpc.dataSources.getMany.prefetch();
	void trpc.fetchedData.getByDateAndDataSource.prefetch({
		date,
		dataSourceName: selectedSource,
	});

	return (
		<HydrateClient>
			<DashboardView />
		</HydrateClient>
	);
}
