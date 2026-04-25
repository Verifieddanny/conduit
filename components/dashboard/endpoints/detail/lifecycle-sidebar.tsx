import { CheckCircle2, Database, Send, RefreshCcw } from "lucide-react";

export default function CallbackLifecycle() {
  const steps = [
    { title: "Inbound webhook accepted", time: "10:41:23 UTC", icon: CheckCircle2, color: "text-[#00f2ad]" },
    { title: "Callback persisted + queued", time: "PostgreSQL + Redis queue", icon: Database, color: "text-blue-400" },
    { title: "Destination returned 500", time: "Retryable response detected", icon: Send, color: "text-red-500" },
    { title: "Retry scheduled with jitter", time: "next at 10:50 UTC", icon: RefreshCcw, color: "text-amber-500" },
  ];

  return (
    <div className="bg-[#111113] border border-white/5 rounded-2xl p-6">
      <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Latest Failed Path</span>
      <h3 className="text-sm font-bold text-white mb-6">Callback lifecycle</h3>

      <div className="space-y-8 relative before:absolute before:left-2.75 before:top-2 before:bottom-2 before:w-px before:bg-white/5">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="relative flex gap-4 pl-8">
              <div className={`absolute left-0 p-1 rounded-md bg-[#0d0d0f] border border-white/10 ${step.color}`}>
                <Icon size={14} />
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-gray-300 leading-tight">{step.title}</h4>
                <p className="text-[9px] text-gray-600 font-mono mt-1 uppercase tracking-tighter">{step.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest">
        Fire a test event
      </button>
    </div>
  );
}