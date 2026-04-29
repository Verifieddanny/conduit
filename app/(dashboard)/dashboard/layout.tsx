"use client";

import SearchHeader from "@/components/dashboard/search-header";
import Sidebar from "@/components/dashboard/sidebar";
import CommandPalette from "@/components/dashboard/command-palette";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const token = useAuthStore((state) => state.token);
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token, router]);

    if (!token) return null;

    return (
        <div className="flex max-h-screen">
            <CommandPalette />

            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <SearchHeader />
                <main className="flex-1 p-6 lg:p-8 h-full overflow-y-auto no-scrollbar">
                    <div className="max-w-400 mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
