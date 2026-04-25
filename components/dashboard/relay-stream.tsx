"use client";
import { Terminal } from "lucide-react";

export default function RelayStream() {
  const logs = [
    { time: "11:42:01", tag: "received", msg: "stripe.payment_failed callback=cb_92f...", color: "text-[#00f2ad]" },
    { time: "11:42:01", tag: "queue", msg: "pushed to redis queue://callbacks", color: "text-blue-400" },
    { time: "11:42:02", tag: "sign", msg: "x-conduit-signature-cdtsig_sha256=2...", color: "text-gray-500" },
    { time: "11:42:02", tag: "deliver", msg: "502 from api.rivetpay.dev/hooks/...", color: "text-red-500" },
    { time: "11:42:02", tag: "retry", msg: "scheduled in 30s with jitter=12s", color: "text-amber-500" },
  ];

  return (
    <div className="bg-[#0d0d0f] border border-white/5 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 bg-[#111113] border-b border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
             <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
             <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
             <div className="w-2.5 h-2.5 rounded-full bg-[#00f2ad]/50" />
          </div>
          <span className="text-[10px] font-bold text-gray-500 uppercase ml-2">Relay Stream</span>
        </div>
        <span className="text-[9px] font-mono text-gray-600 bg-white/5 px-1.5 py-0.5 rounded">worker-02</span>
      </div>
      <div className="p-4 font-mono text-[11px] h-64 overflow-y-auto space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-gray-700 shrink-0">{log.time}</span>
            <span className={`shrink-0 uppercase font-bold text-[9px] mt-0.5 ${log.color}`}>[{log.tag}]</span>
            <span className="text-gray-400 truncate">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}