"use client";

import SearchHeader from "@/components/dashboard/search-header";
import Sidebar from "@/components/dashboard/sidebar";
import CommandPalette from "@/components/dashboard/command-palette";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const token = useAuthStore((state) => state.token);
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token, router]);

    if (!token) return null;

    return (
        <div className="flex h-screen overflow-hidden">
            <CommandPalette />

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0 h-full">
                <SearchHeader onOpenSidebar={() => setIsSidebarOpen(true)} />
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto no-scrollbar bg-[#050505]">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
