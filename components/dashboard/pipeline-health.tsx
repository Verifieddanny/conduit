"use client";
import { useEndpoints } from "@/hooks/use-endpoints";
import { useGlobalStats } from "@/hooks/use-deliveries";
import { AlertCircle, Loader2 } from "lucide-react";

export default function PipelineHealth() {
  const { endpoints, isLoading: endpointsLoading } = useEndpoints();
  const { data: stats, isLoading: statsLoading } = useGlobalStats();

  if (endpointsLoading || statsLoading) {
    return (
      <div className="bg-[#111113] border border-white/5 rounded-2xl p-6 flex items-center justify-center min-h-[150px]">
        <Loader2 className="animate-spin text-gray-500" size={24} />
      </div>
    );
  }

  const activeEndpoints = endpoints.filter(e => e.status === 'active').length;
  const sources = Array.from(new Set(endpoints.map(e => e.externalSource))).join(" + ");
  const degradedCount = stats?.dead || 0;

  return (
    <div className="bg-[#111113] border border-white/5 rounded-2xl p-6">
      <h3 className="text-sm font-bold text-white mb-1">Pipeline Health</h3>
      <p className="text-[10px] text-gray-500 mb-6 font-medium">A quick infrastructure view for the dashboard shell.</p>

      <div className="flex items-center justify-between gap-2">
        {/* Source */}
        <div className="flex-1 bg-[#0a0a0a] border border-white/5 p-3 rounded-xl flex flex-col items-center text-center">
          <span className="text-[8px] text-gray-600 uppercase font-bold mb-2">Source ingress</span>
          <div className="text-[10px] font-bold text-gray-300 mb-2 truncate w-full px-1">
            {sources || "No sources"}
          </div>
          <span className="text-[8px] px-1.5 py-0.5 bg-[#00f2ad]/10 text-[#00f2ad] rounded-full border border-[#00f2ad]/20 font-bold uppercase">
            {activeEndpoints > 0 ? 'active' : 'idle'}
          </span>
        </div>

        <div className="text-gray-800">→</div>

        {/* Relay */}
        <div className="flex-1 bg-[#0a0a0a] border border-white/5 p-3 rounded-xl flex flex-col items-center text-center">
          <span className="text-[8px] text-gray-600 uppercase font-bold mb-2">Conduit relay</span>
          <div className="text-[11px] font-bold text-gray-300 mb-2">queue://callbacks</div>
          <span className="text-[8px] px-1.5 py-0.5 bg-[#00f2ad]/10 text-[#00f2ad] rounded-full border border-[#00f2ad]/20 font-bold uppercase">healthy</span>
        </div>

        <div className="text-gray-800">→</div>

        {/* Endpoint */}
        <div className={`flex-1 p-3 rounded-xl flex flex-col items-center text-center border ${
          degradedCount > 0 
            ? "bg-amber-500/5 border-amber-500/20" 
            : "bg-[#0a0a0a] border-white/5"
        }`}>
          <span className={`text-[8px] uppercase font-bold mb-1 ${degradedCount > 0 ? "text-amber-500/60" : "text-gray-600"}`}>
            Endpoint health
          </span>
          <div className={`text-[11px] font-black mb-1 ${degradedCount > 0 ? "text-amber-500" : "text-gray-300"}`}>
            {degradedCount}
          </div>
          <p className={`text-[9px] leading-tight mb-2 ${degradedCount > 0 ? "text-amber-200/50" : "text-gray-600"}`}>
            {degradedCount === 1 ? 'dead callback' : 'dead callbacks'}
          </p>
          <button className={`flex items-center gap-1 text-[8px] px-1.5 py-0.5 rounded-full font-bold ${
            degradedCount > 0 ? "bg-amber-500 text-black" : "bg-white/5 text-gray-500"
          }`}>
            <AlertCircle size={8} /> watch
          </button>
        </div>
      </div>
    </div>
  );
}