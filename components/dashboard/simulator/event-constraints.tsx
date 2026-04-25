"use client";
import { ShieldCheck, Route, FileCheck, AlertTriangle, ArrowRight } from "lucide-react";

export default function EventConstraints() {
  const constraints = [
    {
      label: "Auth",
      title: "Bearer cdt_••••••••••••",
      desc: "Simulator uses your API key, not the dashboard JWT.",
      icon: ShieldCheck
    },
    {
      label: "Route",
      title: "/api/simulator/:endpointId",
      desc: "Accepted events create callback records immediately.",
      icon: Route
    },
    {
      label: "Validation",
      title: "422 on bad payloads",
      desc: "Event must exist in the endpoint's subscribed_event list.",
      icon: FileCheck
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#111113] border border-white/5 rounded-3xl p-8">
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-2">Event constraints</h3>
          <p className="text-xs text-gray-500">
            Simulator requests still respect endpoint ownership, active status, and subscribed event types.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {constraints.map((item) => (
            <div key={item.label} className="space-y-4">
              <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block">
                {item.label}
              </span>
              <div>
                <h4 className="text-[13px] font-mono font-bold text-gray-300 mb-2 leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Warning Bar */}
        <div className="mt-10 p-4 bg-amber-950/20 border-l-2 border-amber-600/50 rounded-r-lg">
          <div className="flex gap-3 items-start">
            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-200/50 leading-relaxed italic">
              This screen shows a successful submission state. If the endpoint is inactive or not subscribed to the chosen 
              event, Conduit rejects the simulator request before queuing it.
            </p>
          </div>
        </div>
      </div>

      {/* Processing Notes Footer */}
      <div className="bg-[#111113] border border-white/5 rounded-3xl p-8">
        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Processing Notes</span>
        <h3 className="text-sm font-bold text-white mb-8">What happens next</h3>
        
        <div className="space-y-6">
          {[
            { 
              title: "Payload is forwarded exactly as shown", 
              desc: "The worker signs outbound delivery using the endpoint secret before POSTing to the destination URL." 
            },
            { 
              title: "Failures enter retry schedule automatically", 
              desc: "Non-2xx responses become failed and receive exponential backoff plus jitter." 
            },
            { 
              title: "Delivered requests include Conduit headers", 
              desc: "X-Conduit-Signature, X-Conduit-Event, and X-Conduit-Callback-Id are attached to every outbound attempt." 
            }
          ].map((note, i) => (
            <div key={i} className="flex gap-4 items-start border-b border-white/5 pb-6 last:border-0 last:pb-0">
               <div className="w-1.5 h-1.5 rounded-full bg-[#00f2ad] mt-1.5 shrink-0" />
               <div>
                  <h4 className="text-[12px] font-bold text-gray-300">{note.title}</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{note.desc}</p>
               </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[11px] font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest">
            Review API key usage
        </button>
      </div>
    </div>
  );
}