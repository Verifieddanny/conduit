"use client";
import { useEndpoints } from "@/hooks/use-endpoints";
import { Loader2 } from "lucide-react";

export default function EndpointsStats() {
  const { endpoints, isLoading } = useEndpoints();

  if (isLoading) {
    return (
        <div className="flex items-center justify-center py-10 bg-[#111113] border border-white/5 rounded-2xl">
            <Loader2 className="animate-spin text-gray-500" size={20} />
        </div>
    );
  }

  const activeCount = endpoints.filter(ep => ep.status === 'active').length;
  const inactiveCount = endpoints.length - activeCount;
  const sources = Array.from(new Set(endpoints.map(ep => ep.externalSource)));
  const attentionCount = endpoints.filter(ep => (ep.deadCount || 0) > 0 || (ep.failedCount || 0) > 10).length;

  const stats = [
    { label: "Active Endpoints", value: activeCount.toString(), sub: `${inactiveCount} currently inactive` },
    { label: "Sources Connected", value: sources.length.toString(), sub: sources.slice(0, 3).join(', ') + (sources.length > 3 ? '...' : '') },
    { label: "Total Endpoints", value: endpoints.length.toString(), sub: "Total registered URLs" },
    { label: "Needs Attention", value: attentionCount.toString(), sub: "Endpoints with dead letters", color: attentionCount > 0 ? "text-amber-500" : "text-gray-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-[#111113] border border-white/5 p-5 rounded-2xl">
          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-4">{s.label}</span>
          <div className={`text-2xl font-bold mb-1 ${s.color || "text-white"}`}>{s.value}</div>
          <p className="text-[10px] text-gray-500 leading-tight">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}