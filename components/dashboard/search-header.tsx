"use client";
import { Search, Plus, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchStore } from "@/store/use-search-store";
import { useEffect } from "react";
import Image from "next/image";

interface SearchHeaderProps {
  onOpenSidebar?: () => void;
}

export default function SearchHeader({ onOpenSidebar }: SearchHeaderProps) {
  const pathname = usePathname();
  const { query, setQuery, setIsOpen } = useSearchStore();

  const isDashboardOverview = pathname === "/dashboard";

  useEffect(() => {
    if (!isDashboardOverview) {
      setQuery("");
    }
  }, [isDashboardOverview, setQuery]);

  return (
    <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 lg:hidden">
        <button
          title="menu"
          onClick={onOpenSidebar}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
          <Image src="/svgs/conduit-logo.svg"
            alt="Conduit Logo"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <div className="flex-1 max-w-xl hidden md:block">
        {isDashboardOverview && (
          <div className="relative group">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00f2ad] transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search endpoints, callbacks, IDs..."
              className="w-full bg-white/5 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-xs outline-none focus:border-[#00f2ad]/30 focus:bg-white/[0.07] transition-all placeholder:text-gray-700"
            />
            <button
              onClick={() => setIsOpen(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] text-gray-700 font-mono hover:bg-white/10 transition-colors"
            >
              ⌘K
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link href="/dashboard/endpoints"
          type='button' className="cursor-pointer flex items-center gap-2 bg-[#00f2ad] text-black px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg font-bold text-[10px] lg:text-xs hover:bg-[#00d195] transition-all whitespace-nowrap">
          <Plus size={16} className="hidden sm:block" />
          Create Endpoint
        </Link>
      </div>
    </header>
  );
}