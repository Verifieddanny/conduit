"use client";
import { AlertTriangle, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function KeyRevealCard({ apiKey, onDone }: { apiKey: string, onDone: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#111113] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
      <div className="mb-8">
        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-2">Shown Once</span>
        <h2 className="text-2xl font-bold text-white mb-2">Your new API key is ready</h2>
        <div className="flex items-center gap-2">
            <p className="text-xs text-gray-500">Copy it now and store it in your password manager or secrets vault.</p>
            <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[9px] font-bold text-amber-500 uppercase">High sensitivity</span>
        </div>
      </div>

      {/* Warning Box */}
      <div className="bg-amber-950/20 border-l-2 border-amber-600 p-5 rounded-r-xl mb-8 flex gap-4">
        <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
            <h4 className="text-[13px] font-bold text-amber-500 mb-1">Copy your API key now. You won't see it again.</h4>
            <p className="text-[11px] text-amber-200/50 leading-relaxed">If you lose this key, generate a new one. Regeneration invalidates the current key immediately for all integrations.</p>
        </div>
      </div>

      {/* The Key Display */}
      <div className="bg-[#0a0a0a] border border-[#00f2ad]/30 p-6 rounded-2xl mb-8 group relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">API key</span>
                <div className="text-xl font-mono text-gray-300 break-all leading-relaxed">
                    {apiKey}
                </div>
            </div>
            <div className="flex gap-2 shrink-0">
                <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-gray-400 hover:text-white transition-all"
                >
                    {copied ? <CheckCircle2 size={14} className="text-[#00f2ad]" /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                </button>
                <button 
                    onClick={onDone}
                    className="px-4 py-2 bg-[#00f2ad] text-black rounded-lg text-[11px] font-bold hover:bg-[#00d195] transition-all shadow-[0_0_15px_rgba(0,242,173,0.2)]"
                >
                    I've copied my key
                </button>
            </div>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-8">
        {[
            { label: "Auth type", title: "Bearer API key", sub: "Use this for /endpoints, /simulator, and /deliveries." },
            { label: "Generated", title: "Apr 19, 2026 • 14:32 UTC", sub: "Dashboard JWTs are separate. This powers programmatic access." },
            { label: "Rotation", title: "Manual", sub: "Call PUT /api/auth/api-key or regenerate from this screen." }
        ].map(m => (
            <div key={m.label}>
                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-2">{m.label}</span>
                <h4 className="text-[12px] font-bold text-gray-300 mb-1">{m.title}</h4>
                <p className="text-[10px] text-gray-600 leading-relaxed">{m.sub}</p>
            </div>
        ))}
      </div>
    </div>
  );
};