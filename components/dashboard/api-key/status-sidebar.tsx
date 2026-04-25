"use client";
import { ShieldCheck, RefreshCcw, Activity, AlertTriangle } from "lucide-react";

export default function KeyStatusSidebar() {
  return (
    <div className="space-y-6">
      <div className="bg-[#111113] border border-white/5 rounded-2xl p-6">
        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Key Status</span>
        <h3 className="text-sm font-bold text-white mb-6">Active key lifecycle</h3>
        
        <div className="space-y-6">
            {[
                { title: "Current key is active", sub: "Generated Apr 19, 2026 • visible once", icon: Activity, color: "text-[#00f2ad]" },
                { title: "Stored as SHA-256 hash", sub: "Conduit cannot display the previous value again.", icon: ShieldCheck, color: "text-blue-400" },
                { title: "Regeneration invalidates older integrations", sub: "Any automation will stop working immediately.", icon: RefreshCcw, color: "text-amber-500" }
            ].map((s, i) => (
                <div key={i} className="flex gap-4">
                    <div className={`${s.color} mt-1`}><s.icon size={16} /></div>
                    <div>
                        <h4 className="text-[11px] font-bold text-gray-300">{s.title}</h4>
                        <p className="text-[10px] text-gray-600 mt-0.5">{s.sub}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-8 pt-8 border-t border-white/5">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-gray-500 uppercase">Rotation hygiene</span>
                <span className="text-[9px] font-mono text-gray-600 italic">Recommended: 90 days</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#00f2ad] w-[75%] shadow-[0_0_8px_#00f2ad]" />
            </div>
        </div>
      </div>

      {/* Regeneration Warning Card */}
      <div className="bg-[#111113] border border-white/5 rounded-2xl p-6">
         <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Regeneration Warning</span>
         <h3 className="text-sm font-bold text-white mb-4">Before you rotate</h3>
         <div className="p-4 bg-red-950/20 border-l-2 border-red-500 rounded-r-lg mb-6">
            <div className="flex gap-3">
                <AlertTriangle size={16} className="text-red-500 shrink-0" />
                <p className="text-[10px] text-red-200/50 leading-relaxed font-bold">This will invalidate your current key.</p>
            </div>
         </div>
         <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest">
            Open regenerate confirmation
         </button>
      </div>
    </div>
  );
}