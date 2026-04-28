"use client";
import { Key, ExternalLink, Shield } from "lucide-react";
import { useEndpoints } from "@/hooks/use-endpoints";

export default function SimulatorHeader() {
  const { endpoints } = useEndpoints();
  const simulatorCount = endpoints.filter(ep => ep.externalSource?.toLowerCase() === 'simulator').length;

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Shield size={12} className="text-[#00f2ad]" />
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block">
            Pipeline Testing
          </span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Simulator</h1>
        <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
          Fire a synthetic event into Conduit, inspect the callback ID instantly, and jump straight into delivery logs as 
          the worker processes it.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end gap-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex items-center gap-2 text-gray-500">
            <Key size={14} />
            <span className="text-[11px] font-mono tracking-tight uppercase">Active Simulator Sources</span>
          </div>
          <span className="text-xs font-bold text-white">{simulatorCount} endpoints available</span>
        </div>
      </div>
    </div>
  );
}