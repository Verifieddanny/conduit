"use client";
import { useGlobalStats } from "@/hooks/use-deliveries";
import { Loader2 } from "lucide-react";

export default function ReliabilityCard() {
  const { data: stats, isLoading } = useGlobalStats();

  if (isLoading) {
    return (
      <div className="bg-[#111113] border border-white/5 rounded-2xl p-6 flex items-center justify-center min-h-[200px]">
        <Loader2 className="animate-spin text-gray-500" size={24} />
      </div>
    );
  }

  const successRate = stats && stats.totalDeliveries > 0 
    ? (stats.delivered / stats.totalDeliveries) * 100 
    : 100;
  
  const isHealthy = successRate > 90;

  return (
    <div className="bg-[#111113] border border-white/5 rounded-2xl p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Reliability</span>
          <div className="text-4xl font-extrabold text-[#00f2ad] tracking-tight">
            {successRate.toFixed(1)}%
          </div>
          <p className="text-[10px] text-gray-500 mt-1">delivery success rate</p>
        </div>
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border ${
          isHealthy 
            ? "bg-[#00f2ad]/10 border-[#00f2ad]/20 text-[#00f2ad]" 
            : "bg-amber-500/10 border-amber-500/20 text-amber-500"
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isHealthy ? "bg-[#00f2ad]" : "bg-amber-500"}`} />
          <span className="text-[9px] font-bold uppercase">{isHealthy ? "healthy" : "degraded"}</span>
        </div>
      </div>

      {/* Success Bar */}
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
        <div 
          className="h-full bg-[#00f2ad] shadow-[0_0_8px_#00f2ad] transition-all duration-1000" 
          style={{ width: `${successRate}%` }}
        />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
        <div>
          <div className="text-sm font-bold text-white">{stats?.totalDeliveries || 0}</div>
          <p className="text-[9px] text-gray-600 uppercase font-bold mt-1">Total Events</p>
        </div>
        <div>
          <div className="text-sm font-bold text-white">{stats?.failed || 0}</div>
          <p className="text-[9px] text-gray-600 uppercase font-bold mt-1">Retrying</p>
        </div>
        <div>
          <div className="text-sm font-bold text-white">{stats?.dead || 0}</div>
          <p className="text-[9px] text-gray-600 uppercase font-bold mt-1">Dead Letters</p>
        </div>
      </div>
    </div>
  );
}