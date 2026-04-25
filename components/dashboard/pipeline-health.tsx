"use client";
import { AlertCircle } from "lucide-react";

export default function PipelineHealth() {
  return (
    <div className="bg-[#111113] border border-white/5 rounded-2xl p-6">
      <h3 className="text-sm font-bold text-white mb-1">Pipeline Health</h3>
      <p className="text-[10px] text-gray-500 mb-6 font-medium">A quick infrastructure view for the dashboard shell.</p>

      <div className="flex items-center justify-between gap-2">
        {/* Source */}
        <div className="flex-1 bg-[#0a0a0a] border border-white/5 p-3 rounded-xl flex flex-col items-center text-center">
          <span className="text-[8px] text-gray-600 uppercase font-bold mb-2">Source ingress</span>
          <div className="text-[11px] font-bold text-gray-300 mb-2">Stripe + <br/> GitHub</div>
          <span className="text-[8px] px-1.5 py-0.5 bg-[#00f2ad]/10 text-[#00f2ad] rounded-full border border-[#00f2ad]/20 font-bold">active</span>
        </div>

        <div className="text-gray-800">→</div>

        {/* Relay */}
        <div className="flex-1 bg-[#0a0a0a] border border-white/5 p-3 rounded-xl flex flex-col items-center text-center">
          <span className="text-[8px] text-gray-600 uppercase font-bold mb-2">Conduit relay</span>
          <div className="text-[11px] font-bold text-gray-300 mb-2">queue://callbacks</div>
          <span className="text-[8px] px-1.5 py-0.5 bg-[#00f2ad]/10 text-[#00f2ad] rounded-full border border-[#00f2ad]/20 font-bold">healthy</span>
        </div>

        <div className="text-gray-800">→</div>

        {/* Endpoint */}
        <div className="flex-1 bg-amber-500/5 border border-amber-500/20 p-3 rounded-xl flex flex-col items-center text-center">
          <span className="text-[8px] text-amber-500/60 uppercase font-bold mb-1">Endpoint health</span>
          <div className="text-[11px] font-black text-amber-500 mb-1">3</div>
          <p className="text-[9px] text-amber-200/50 leading-tight mb-2">degraded routes</p>
          <button className="flex items-center gap-1 text-[8px] px-1.5 py-0.5 bg-amber-500 text-black rounded-full font-bold">
            <AlertCircle size={8} /> watch
          </button>
        </div>
      </div>
    </div>
  );
}