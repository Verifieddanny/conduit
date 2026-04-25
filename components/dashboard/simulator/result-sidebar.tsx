"use client";
import { CheckCircle2, Database, Send, RefreshCcw, Copy } from "lucide-react";

export default function SimulatorResultSidebar() {
  return (
    <div className="space-y-6">
      {/* Latest Result Card */}
      <div className="bg-[#111113] border border-white/5 rounded-3xl p-6">
        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Result</span>
        <h3 className="text-sm font-bold text-white mb-6">Latest fired event</h3>
        
        <div className="bg-[#0a0a0a] border border-[#00f2ad]/20 p-6 rounded-2xl mb-6">
            <span className="px-2 py-0.5 bg-[#00f2ad]/10 border border-[#00f2ad]/20 rounded-full text-[8px] font-bold text-[#00f2ad] uppercase flex items-center gap-1.5 w-fit mb-3">
                <div className="w-1 h-1 rounded-full bg-[#00f2ad]" /> Accepted
            </span>
            <h4 className="text-xl font-bold text-white mb-2">Callback queued</h4>
            <p className="text-[10px] text-gray-500 leading-relaxed">Status begins as pending and will update in the delivery logs after the worker posts to your endpoint.</p>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 p-3 rounded-xl flex items-center justify-between mb-8 group">
            <div className="min-w-0">
                <span className="text-[8px] font-bold text-gray-600 uppercase block mb-1">Callback ID</span>
                <span className="text-[10px] font-mono text-gray-400 truncate block">cb_7f31aa29-5b42-42ca-a4a9-...</span>
            </div>
            <button title="copy" className="shrink-0 p-2 bg-white/5 border border-white/10 rounded-lg text-gray-500 hover:text-white transition-colors">
                <Copy size={14} />
            </button>
        </div>

        {/* Small Lifecycle Steps */}
        <div className="space-y-4">
            {[
                { title: "Simulator request accepted", sub: "200 Accepted • just now", icon: CheckCircle2, color: "text-[#00f2ad]" },
                { title: "Callback persisted in PostgreSQL", sub: "Status set to pending before enqueue.", icon: Database, color: "text-blue-400" },
                { title: "Queued for worker delivery", sub: "BullMQ job created and visible to the worker.", icon: Send, color: "text-gray-400" }
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

        {/* Progress Bar */}
        <div className="mt-8 pt-8 border-t border-white/5">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-gray-500 uppercase">Worker Progress</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-[#00f2ad] w-[60%] shadow-[0_0_8px_#00f2ad]" />
            </div>
            <p className="text-[9px] text-gray-600 mb-4">Waiting for the worker to pick up the job and attempt delivery.</p>
            <div className="flex items-center gap-4">
                <span className="text-[9px] font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full border border-blue-400/20 flex items-center gap-1.5 italic">
                    <div className="w-1 h-1 rounded-full bg-blue-400" /> pending
                </span>
                <button title="View in Delivery Logs" className="text-[9px] font-bold text-[#00f2ad] uppercase hover:underline">View in Delivery Logs</button>
            </div>
        </div>
      </div>
    </div>
  );
}