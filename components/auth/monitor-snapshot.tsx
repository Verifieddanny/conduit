"use client";
import { Activity } from "lucide-react";

const MonitorSnapshot = () => {
  const activities = [
    { time: "2m ago", event: "payment.failed", url: "https://api.acme.dev/webhooks/stripe", status: "200 delivered", statusColor: "text-[#00f2ad]" },
    { time: "5m ago", event: "invoice.paid", url: "https://api.acme.dev/hooks/billing", status: "500 retrying", statusColor: "text-amber-500" },
    { time: "9m ago", event: "push", url: "https://ops.acme.dev/webhooks/github", status: "dead", statusColor: "text-red-500" },
  ];

  return (
    <div className="h-full bg-[#111113] border border-white/5 rounded-3xl p-12 flex flex-col justify-center">
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#00f2ad]/10 border border-[#00f2ad]/20 text-[#00f2ad] text-[10px] font-bold mb-6 self-start">
        <Activity size={12} />
        Delivery monitor snapshot
      </div>

      <h2 className="text-5xl font-extrabold leading-tight mb-6">
        Welcome back to the relay <br /> control plane.
      </h2>
      <p className="text-gray-500 text-base max-w-lg mb-10 leading-relaxed">
        Sign in to inspect callbacks, replay failed deliveries, manage API keys, and keep every endpoint observable from one dashboard.
      </p>

      {/* Activity Monitor Card */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 mb-10">
         <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recent delivery activity</span>
            <span className="flex items-center gap-2 text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full border border-blue-400/20">
                <div className="w-1 h-1 rounded-full bg-blue-400" />
                Worker online
            </span>
         </div>
         
         <div className="space-y-3">
            {activities.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#111113] border border-white/5 rounded-xl">
                    <div className="flex gap-6">
                        <span className="text-[10px] text-gray-600 font-mono min-w-10">{item.time}</span>
                        <div>
                            <div className="text-sm font-bold text-gray-300">{item.event}</div>
                            <div className="text-[9px] text-gray-600 font-mono tracking-tighter">{item.url}</div>
                        </div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase italic tracking-tighter ${item.statusColor}`}>
                        {item.status}
                    </span>
                </div>
            ))}
         </div>
      </div>

      {/* Bottom Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
            { label: "Success Rate", val: "98.4%", sub: "Calculated from recent delivery attempts across all endpoints." },
            { label: "Failed", val: "12", sub: "Retries scheduled with full jitter to prevent retry spikes.", valColor: "text-amber-500" },
            { label: "Dead Letter", val: "3", sub: "Replay any failed or dead callback directly from the logs.", valColor: "text-red-500" }
        ].map(s => (
            <div key={s.label} className="p-5 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">{s.label}</span>
                <div className={`text-xl font-bold my-1 ${s.valColor || "text-[#00f2ad]"}`}>{s.val}</div>
                <p className="text-[9px] text-gray-500 leading-normal">{s.sub}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default MonitorSnapshot;