"use client";
import { Key, ExternalLink } from "lucide-react";

export default function SimulatorHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">
          Pipeline Testing
        </span>
        <h1 className="text-3xl font-bold text-white mb-2">Simulator</h1>
        <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
          Fire a synthetic event into Conduit, inspect the callback ID instantly, and jump straight into delivery logs as 
          the worker processes it.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-500">
          <Key size={14} />
          <span className="text-[11px] font-mono tracking-tight">Using API key authentication</span>
        </div>
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-white/10 transition-all">
          Manage Endpoints
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}