"use client";
import { ShieldCheck, RefreshCw } from "lucide-react";

export default function ApiKeyHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">
          Programmatic Access
        </span>
        <h1 className="text-3xl font-bold text-white mb-2">API Key</h1>
        <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
          Generate, rotate, and document the single API key used for endpoint management, 
          simulator requests, and delivery log access.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-500">
          <ShieldCheck size={14} className="text-[#00f2ad]" />
          <span className="text-[11px] font-mono tracking-tight">Stored as a one-way hash</span>
        </div>
        <button className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-white/20 transition-all group">
          <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
          Regenerate
        </button>
      </div>
    </div>
  );
}