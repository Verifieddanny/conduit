"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Radio, Zap, Key, Book, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";

const navLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutGrid, live: true },
  { name: "Endpoints", href: "/dashboard/endpoints", icon: Radio, count: 18 },
  { name: "Simulator", href: "/dashboard/simulator", icon: Zap },
  { name: "API Key", href: "/dashboard/api-key", icon: Key },
  { name: "Docs", href: "/docs", icon: Book },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="w-64 h-screen border-r border-white/5 bg-[#0a0a0a] flex-col shrink-0 hidden lg:flex">
      {/* Brand */}
      <div className="p-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#00f2ad] rounded-md" />
          <span className="font-bold text-lg tracking-tight">Conduit</span>
        </div>
        <div className="mt-8">
            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Workspace</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all group ${
                isActive 
                ? "bg-[#00f2ad]/10 text-[#00f2ad] font-medium" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} className={isActive ? "text-[#00f2ad]" : "text-gray-500 group-hover:text-gray-300"} />
              {link.name}
              
              {link.live && (
                <span className="ml-auto flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-[#00f2ad]/10 text-[9px] font-bold text-[#00f2ad] border border-[#00f2ad]/20">
                  <div className="w-1 h-1 rounded-full bg-[#00f2ad] animate-pulse" />
                  Live
                </span>
              )}

              {link.count && (
                <span className="ml-auto text-[10px] text-gray-600 font-mono">
                  {link.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Section */}
      <div className="p-4 border-t border-white/5">
        <div className="bg-[#111113] border border-white/5 p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#00f2ad]/20 flex items-center justify-center text-[#00f2ad] font-bold text-xs border border-[#00f2ad]/20">
                    D
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">dannyclassi</p>
                    <p className="text-[10px] text-gray-600 truncate">danny@useshipyard.xyz</p>
                </div>
            </div>
            <button 
                onClick={() => logout()}
                className="w-full py-2 bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-gray-400 text-[10px] font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-2"
            >
                <LogOut size={12} />
                Logout
            </button>
        </div>
      </div>
    </aside>
  );
}