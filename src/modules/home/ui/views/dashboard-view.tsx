import { ContentsSection } from "@/modules/home/ui/sections/contents-section";
import { DataSourceSection } from "@/modules/home/ui/sections/datasource-section";
import { SideBarSection } from "@/modules/home/ui/sections/sidebar-section";

export const DashboardView = () => {
	return (
		<div className="container mx-auto px-4 py-4 h-full">
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
				<SideBarSection />
				<div className="lg:col-span-3 h-full overflow-auto">
					<div className="space-y-6">
						<DataSourceSection />
						<ContentsSection />
					</div>
				</div>
			</div>
		</div>
	);
};
