import { CheckCircle2, Database, Send, RefreshCcw, XCircle, Clock } from "lucide-react";
import { Callback } from "@/hooks/use-deliveries";
import { format } from "date-fns";

export default function CallbackLifecycle({ callback }: { callback: Callback | null }) {
  if (!callback) {
    return (
      <div className="bg-[#111113] border border-white/5 rounded-2xl p-6">
        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Recent Activity</span>
        <h3 className="text-sm font-bold text-white mb-6">No callbacks yet</h3>
        <p className="text-[10px] text-gray-500 italic">Callbacks will appear here as they ingress.</p>
      </div>
    );
  }

  const steps = [
    { 
        title: "Inbound webhook accepted", 
        time: format(new Date(callback.createdAt), "HH:mm:ss 'UTC'"), 
        icon: CheckCircle2, 
        color: "text-[#00f2ad]" 
    },
    { 
        title: "Callback persisted + queued", 
        time: "PostgreSQL + Redis queue", 
        icon: Database, 
        color: "text-blue-400" 
    },
    { 
        title: callback.status === 'delivered' ? "Delivery Successful" : `Destination returned ${callback.responseCode || 'error'}`, 
        time: callback.status === 'delivered' ? "2xx Success received" : "Retryable response detected", 
        icon: callback.status === 'delivered' ? CheckCircle2 : Send, 
        color: callback.status === 'delivered' ? "text-[#00f2ad]" : "text-red-500" 
    },
  ];

  if (callback.status === 'failed' && callback.nextRetry) {
    steps.push({
        title: "Retry scheduled with jitter",
        time: `next at ${format(new Date(callback.nextRetry), "HH:mm:ss 'UTC'")}`,
        icon: RefreshCcw,
        color: "text-amber-500"
    });
  } else if (callback.status === 'dead') {
    steps.push({
        title: "Delivery entered dead state",
        time: "Maximum retries exceeded",
        icon: XCircle,
        color: "text-red-500"
    });
  } else if (callback.status === 'pending') {
    steps.push({
        title: "Delivery in progress",
        time: "Awaiting next attempt",
        icon: Clock,
        color: "text-blue-500"
    });
  }

  return (
    <div className="bg-[#111113] border border-white/5 rounded-2xl p-6">
      <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Latest Path: {callback.eventType}</span>
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