"use client";
import { Search, Plus } from "lucide-react";

export default function SearchHeader() {
  return (
    <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00f2ad] transition-colors" />
          <input 
            type="text" 
            placeholder="Search endpoints, callbacks, IDs..."
            className="w-full bg-white/5 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-xs outline-none focus:border-[#00f2ad]/30 focus:bg-white/[0.07] transition-all placeholder:text-gray-700"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] text-gray-700 font-mono">
            ⌘K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-[#00f2ad] text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-[#00d195] transition-all">
          <Plus size={16} />
          Create Endpoint
        </button>
      </div>
    </header>
  );
}