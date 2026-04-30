"use client";
import { CheckCircle2, Database, Send, Copy, AlertCircle } from "lucide-react";
import { SimulationResult } from "@/hooks/use-simulator";
import Link from "next/link";

export default function SimulatorResultSidebar({ result }: { result: SimulationResult | null }) {
  if (!result) {
    return (
        <div className="bg-[#111113] border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center min-h-100">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-600 mb-6">
                <Send size={24} />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">No active simulation</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed max-w-50">
                Compose a payload and fire an event to see the real-time processing lifecycle.
            </p>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Latest Result Card */}
      <div className="bg-[#111113] border border-white/5 rounded-3xl p-6">
        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Result</span>
        <h3 className="text-sm font-bold text-white mb-6">Latest fired event</h3>
        
        <div className="bg-[#0a0a0a] border border-[#00f2ad]/20 p-6 rounded-2xl mb-6">
            <span className="px-2 py-0.5 bg-[#00f2ad]/10 border border-[#00f2ad]/20 rounded-full text-[8px] font-bold text-[#00f2ad] uppercase flex items-center gap-1.5 w-fit mb-3">
                <div className="w-1 h-1 rounded-full bg-[#00f2ad]" /> {result.status}
            </span>
            <h4 className="text-xl font-bold text-white mb-2">
                {result.status === 'delivered' ? 'Event Delivered' : 
                 result.status === 'failed' ? 'Delivery Failed' : 
                 'Callback Queued'}
            </h4>
            <p className="text-[10px] text-gray-500 leading-relaxed">
                {result.status === 'delivered' ? 'The simulation was successful and the payload was delivered.' :
                 result.status === 'failed' ? 'The simulation failed to deliver. Check logs for details.' :
                 'The simulator request was accepted. Your event is now in the pipeline.'}
            </p>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 p-3 rounded-xl flex items-center justify-between mb-8 group">
            <div className="min-w-0">
                <span className="text-[8px] font-bold text-gray-600 uppercase block mb-1">Callback ID</span>
                <span className="text-[10px] font-mono text-gray-400 truncate block">{result.callbackId}</span>
            </div>
            <button 
                onClick={() => navigator.clipboard.writeText(result.callbackId)}
                title="copy" 
                className="shrink-0 p-2 bg-white/5 border border-white/10 rounded-lg text-gray-500 hover:text-white transition-colors"
            >
                <Copy size={14} />
            </button>
        </div>

        {/* Small Lifecycle Steps */}
        <div className="space-y-4">
            {[
                { title: "Simulator request accepted", sub: `Status: ${result.status}`, icon: CheckCircle2, color: "text-[#00f2ad]" },
                { title: "Response Received", sub: `Status Code: ${result.response.code}`, icon: Database, color: "text-blue-400" },
                { title: "View in Logs", sub: "Check delivery status in logs.", icon: Send, color: "text-gray-400" }
            ].map((step, i) => (
                <div key={i} className="flex gap-4 p-3 bg-[#0a0a0a] border border-white/5 rounded-xl">
                    <div className={`${step.color} mt-1`}><step.icon size={14} /></div>
                    <div>
                        <h5 className="text-[10px] font-bold text-gray-300">{step.title}</h5>
                        <p className="text-[9px] text-gray-600">{step.sub}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Action Link */}
        <div className="mt-8 pt-8 border-t border-white/5">
             <Link 
                href="/dashboard/deliveries" 
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase rounded-xl transition-all flex items-center justify-center gap-2"
            >
                View in Delivery Logs
            </Link>
        </div>
      </div>
    </div>
  );
}
