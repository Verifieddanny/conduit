"use client";
import { ShieldCheck } from "lucide-react";

export default function RetryScheduleSidebar() {
  const schedule = [
    { attempt: 1, delay: "10s–20s" },
    { attempt: 2, delay: "30s–60s" },
    { attempt: 3, delay: "2m–4m" },
    { attempt: 4, delay: "10m–20m" },
    { attempt: 5, delay: "1h–2h" },
  ];

  return (
    <div className="bg-[#111113] border border-white/5 rounded-2xl p-6">
      <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Delivery Health</span>
      <h3 className="text-sm font-bold text-white mb-2">Retry schedule</h3>
      <p className="text-[10px] text-gray-500 leading-relaxed mb-6">
        Conduit uses exponential backoff plus jitter. Failed deliveries are replayable until they enter dead status.
      </p>

      {/* Health Badge */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#00f2ad]/5 border border-[#00f2ad]/10 rounded-lg mb-8">
        <ShieldCheck size={14} className="text-[#00f2ad]" />
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-[#00f2ad]">Healthy endpoint</p>
          <p className="text-[9px] text-gray-500 truncate">Signature verification enabled. Last success 8m ago.</p>
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
      <div className="mt-8 p-4 bg-amber-950/20 border-l-2 border-amber-600 rounded-r-lg">
        <p className="text-[10px] text-amber-200/60 leading-relaxed italic">
          This endpoint has 4 dead deliveries. Replay only after the destination has recovered, otherwise callbacks will re-enter the retry queue.
        </p>
      </div>
    </div>
  );
}