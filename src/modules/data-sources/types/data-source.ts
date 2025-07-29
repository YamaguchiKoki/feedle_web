export interface DataSourceConfig {
	subreddits?: string[];
	accounts?: string[];
	channels?: string[];
	hashtags?: string[];
	keywords?: string[];
}

export interface DataSource {
	id?: string;
	name: string;
	platform: string;
	status?: "active" | "inactive";
	config: DataSourceConfig;
}
