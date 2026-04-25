"use client";
import { Search, Plus } from "lucide-react";

export default function EndpointsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">
          Authenticated Workspace
        </span>
        <h1 className="text-3xl font-bold text-white mb-2">Endpoints</h1>
        <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
          Manage destination URLs, subscribed events, and source-specific secrets. 
          Showing a populated workspace with the create flow open.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative group min-w-75">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00f2ad]" />
          <input 
            type="text" 
            placeholder="Search endpoints, URLs, sources..." 
            className="w-full bg-[#111113] border border-white/5 rounded-lg py-2 pl-9 pr-4 text-xs outline-none focus:border-[#00f2ad]/30"
          />
        </div>
        <button title="create endpoint" type="button" className="flex lg:hidden items-center gap-2 bg-[#00f2ad] text-black px-4 py-2 rounded-lg font-bold text-xs">
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}