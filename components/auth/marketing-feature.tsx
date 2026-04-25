"use client";
import { Share2 } from "lucide-react";

const MarketingFeature = () => {
  return (
    <div className="h-full bg-[#111113] border border-white/5 rounded-3xl p-12 flex flex-col justify-center relative overflow-hidden">
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#00f2ad]/10 border border-[#00f2ad]/20 text-[#00f2ad] text-[10px] font-bold mb-6 self-start">
        <Share2 size={12} />
        Reliable delivery starts here
      </div>

      <h2 className="text-5xl font-extrabold leading-tight mb-6">
        Route events through a <br />
        pipeline built for retries, <br />
        signatures, and full <br />
        visibility.
      </h2>
      
      <p className="text-gray-500 text-base max-w-lg mb-12">
        A clean product card on the left, infrastructure context on the right. This keeps auth approachable while still feeling like serious webhook tooling.
      </p>

      {/* Path Preview Visual */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 mb-12">
         <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Event path preview</span>
            <span className="flex items-center gap-2 text-[10px] font-bold text-[#00f2ad]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00f2ad] animate-pulse" />
                Delivery active
            </span>
         </div>
         
         <div className="flex items-center gap-4">
            <div className="flex-1 bg-[#111113] border border-white/5 p-4 rounded-xl">
                <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">Source</span>
                <div className="text-sm font-bold text-gray-300 mt-1">Stripe</div>
                <div className="text-[10px] text-gray-600 font-mono">payment.failed</div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00f2ad] shadow-[0_0_8px_#00f2ad]" />
                <div className="w-8 h-px bg-[#00f2ad]/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#00f2ad] shadow-[0_0_8px_#00f2ad]" />
            </div>
            <div className="flex-1 bg-[#111113] border border-[#00f2ad]/20 p-4 rounded-xl">
                <span className="text-[9px] text-[#00f2ad] uppercase font-bold tracking-widest">Relay</span>
                <div className="text-sm font-bold text-white mt-1">Conduit</div>
                <div className="text-[10px] text-gray-600 font-mono">Verify + queue</div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00f2ad] shadow-[0_0_8px_#00f2ad]" />
                <div className="w-8 h-px bg-[#00f2ad]/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#00f2ad] shadow-[0_0_8px_#00f2ad]" />
            </div>
            <div className="flex-1 bg-[#111113] border border-white/5 p-4 rounded-xl">
                <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">Endpoint</span>
                <div className="text-sm font-bold text-gray-300 mt-1">your-app.com</div>
                <div className="text-[10px] text-gray-600 font-mono">Retry until delivered</div>
            </div>
         </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
            { label: "Signed Deliveries", val: "cdtsig_sha256", sub: "Every outbound request ships with a verifiable HMAC signature." },
            { label: "Retry Policy", val: "5 attempts", sub: "Backoff + jitter protects your recovering endpoint from retry storms.", valColor: "text-amber-500" },
            { label: "Observability", val: "Full logs", sub: "Inspect callback payloads, response bodies, and replay failed deliveries." }
        ].map(f => (
            <div key={f.label} className="p-5 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">{f.label}</span>
                <div className={`text-base font-bold my-1 ${f.valColor || "text-[#00f2ad]"}`}>{f.val}</div>
                <p className="text-[10px] text-gray-500 leading-normal">{f.sub}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingFeature;