"use client";
import { useGlobalStats } from "@/hooks/use-deliveries";
import { Loader2 } from "lucide-react";

export default function StatsGrid() {
  const { data: statsData, isLoading } = useGlobalStats();

  if (isLoading) {
    return (
        <div className="flex items-center justify-center py-10 bg-[#111113] border border-white/5 rounded-xl">
            <Loader2 className="animate-spin text-gray-500" size={20} />
        </div>
    );
  }

  const stats = [
    { label: "Total Endpoints", value: statsData?.totalEndpoints.toString() || "0", sub: "Registered hooks", trend: "neutral" },
    { label: "Total Deliveries", value: statsData?.totalDeliveries.toLocaleString() || "0", sub: "Total traffic", trend: "up" },
    { label: "Delivered", value: statsData?.delivered.toLocaleString() || "0", sub: "Steady 2xx traffic", trend: "success", color: "text-[#00f2ad]" },
    { label: "Failed", value: statsData?.failed.toLocaleString() || "0", sub: "Retryable 4xx/5xx", trend: "warning", color: "text-amber-500" },
    { label: "Dead", value: statsData?.dead.toLocaleString() || "0", sub: "Needs attention", trend: "danger", color: "text-red-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-[#111113] border border-white/5 p-4 rounded-xl">
          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest block mb-4">
            {stat.label}
          </span>
          <div className={`text-2xl font-bold ${stat.color || "text-white"}`}>
            {stat.value}
          </div>
          <p className="text-[10px] text-gray-600 mt-2 font-medium leading-tight">
            {stat.sub}
          </p>
        </div>
      ))}
    </div>
  );
}