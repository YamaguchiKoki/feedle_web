import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
						<div className="text-center">
							<h1 className="text-3xl font-bold text-gray-900 mb-4">
								ダッシュボード
							</h1>
							<p className="text-lg text-gray-600 mb-6">
								ようこそ、{user?.email}さん
							</p>

							<div className="bg-white p-6 rounded-lg shadow mb-6">
								<h2 className="text-xl font-semibold text-gray-800 mb-4">
									ユーザー情報
								</h2>
								<dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
									<div>
										<dt className="text-sm font-medium text-gray-500">Email</dt>
										<dd className="mt-1 text-sm text-gray-900">
											{user?.email}
										</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">
											ユーザーID
										</dt>
										<dd className="mt-1 text-sm text-gray-900 font-mono">
											{user?.id}
										</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">
											作成日時
										</dt>
										<dd className="mt-1 text-sm text-gray-900">
											{user?.created_at
												? new Date(user.created_at).toISOString().split("T")[0]
												: "N/A"}
										</dd>
									</div>
								</dl>
							</div>

							<div className="space-y-4">
								<Link
									href="/logout"
									className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
								>
									ログアウト
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
