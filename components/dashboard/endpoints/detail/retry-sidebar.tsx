"use client";
import { ShieldCheck, ShieldAlert, AlertCircle } from "lucide-react";
import { Endpoint } from "@/hooks/use-endpoints";
import { formatDistanceToNow } from "date-fns";

export default function RetryScheduleSidebar({ endpoint }: { endpoint: Endpoint }) {
  const schedule = [
    { attempt: 1, delay: "10s–20s" },
    { attempt: 2, delay: "30s–60s" },
    { attempt: 3, delay: "2m–4m" },
    { attempt: 4, delay: "10m–20m" },
    { attempt: 5, delay: "1h–2h" },
  ];

  const hasDeadDeliveries = (endpoint.deadCount || 0) > 0;
  const isHealthy = endpoint.status === 'active' && !hasDeadDeliveries;

  return (
    <div className="bg-[#111113] border border-white/5 rounded-2xl p-6">
      <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Delivery Health</span>
      <h3 className="text-sm font-bold text-white mb-2">Retry schedule</h3>
      <p className="text-[10px] text-gray-500 leading-relaxed mb-6">
        Conduit uses exponential backoff plus jitter. Failed deliveries are replayable until they enter dead status.
      </p>

      {/* Health Badge */}
      <div className={`flex items-center gap-2 px-3 py-2 border rounded-lg mb-8 ${
        isHealthy 
          ? "bg-[#00f2ad]/5 border-[#00f2ad]/10" 
          : "bg-amber-500/5 border-amber-500/10"
      }`}>
        {isHealthy ? (
          <ShieldCheck size={14} className="text-[#00f2ad]" />
        ) : (
          <ShieldAlert size={14} className="text-amber-500" />
        )}
        <div className="min-w-0">
          <p className={`text-[10px] font-bold ${isHealthy ? "text-[#00f2ad]" : "text-amber-500"}`}>
            {isHealthy ? "Healthy endpoint" : "Attention required"}
          </p>
          <p className="text-[9px] text-gray-500 truncate">
            {endpoint.status === 'active' 
              ? `Status: Active • Updated ${formatDistanceToNow(new Date(endpoint.updatedAt))} ago`
              : "Status: Inactive • No traffic accepted"}
          </p>
        </div>
      </div>

      {/* Timing List */}
      <div className="space-y-4">
        {schedule.map((s) => (
          <div key={s.attempt} className="flex justify-between items-center text-[11px] font-mono">
            <span className="text-gray-500">Attempt {s.attempt}</span>
            <span className="text-gray-400">{s.delay}</span>
          </div>
        ))}
      </div>

      {/* Warning Alert */}
      {hasDeadDeliveries && (
        <div className="mt-8 p-4 bg-amber-950/20 border-l-2 border-amber-600 rounded-r-lg">
          <div className="flex items-center gap-2 text-amber-500 mb-1">
            <AlertCircle size={12} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Dead Letters Found</span>
          </div>
          <p className="text-[10px] text-amber-200/60 leading-relaxed italic">
            This endpoint has {endpoint.deadCount} dead deliveries. Replay only after the destination has recovered.
          </p>
        </div>
      )}
    </div>
  );
}