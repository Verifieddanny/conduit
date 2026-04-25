"use client";

import SearchHeader from "@/components/dashboard/search-header";
import "../../globals.css";

import Sidebar from "@/components/dashboard/sidebar";
import QueryProvider from "@/providers/query-provider";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryProvider>
            <html lang="en">
                <body className="bg-[#0A0A0A]">

                    <div className="flex max-h-screen text-white">
                        {/* Persistent Sidebar */}
                        <Sidebar />

                        {/* Main Viewport */}
                        <div className="flex-1 flex flex-col min-w-0">
                            <SearchHeader />
                            <main className="flex-1 p-6 lg:p-8 h-full overflow-y-auto no-scrollbar">
                                <div className="max-w-400 mx-auto">
                                    {children}
                                </div>
                            </main>
                        </div>
                    </div>
                </body>
            </html>
        </QueryProvider>
    );
}