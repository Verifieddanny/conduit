"use client";
import { useState } from "react";
import { Copy, CheckCircle2, AlertTriangle } from "lucide-react";

export default function CreateEndpointSidebar() {
  const [step, setStep] = useState<'form' | 'success'>('form');

  return (
    <div className="bg-[#111113] border border-white/5 rounded-2xl p-6 h-fit sticky top-24">
      <div className="mb-8">
        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-2">Create Flow</span>
        <h3 className="text-xl font-bold text-white">Create Endpoint</h3>
      </div>

      {step === 'form' ? (
        <div className="space-y-5">
          <div>
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Endpoint URL</label>
            <input type="text" placeholder="https://your-api.com/webhooks" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm focus:border-[#00f2ad] outline-none transition-all placeholder:text-gray-700" />
          </div>
          
          <div>
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">External Source</label>
            <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm flex justify-between items-center text-gray-400 cursor-pointer">
              Stripe <span className="text-[10px] text-gray-600">Select source</span>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Subscribed Events</label>
            <textarea rows={3} placeholder="payment.failed, order.created..." className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm focus:border-[#00f2ad] outline-none transition-all placeholder:text-gray-700 font-mono resize-none" />
          </div>

          <div>
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Secret</label>
            <input type="text" placeholder="Leave blank to auto-generate" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm focus:border-[#00f2ad] outline-none transition-all placeholder:text-gray-700" />
          </div>

          <button 
            onClick={() => setStep('success')}
            className="w-full py-3 bg-[#00f2ad] text-black font-bold rounded-xl hover:bg-[#00d195] transition-all"
          >
            Create Endpoint
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[#00f2ad] text-xs font-bold mb-4">
             <CheckCircle2 size={14} /> Endpoint created
          </div>

          <div>
            <label className="text-[10px] text-gray-500 font-bold mb-2 block">Inbound URL</label>
            <div className="flex items-center gap-2 bg-[#0a0a0a] border border-white/10 p-2 rounded-lg">
                <span className="text-[10px] font-mono text-gray-400 truncate">POST https://conduit-api.useshipyard.xyz/inbound/123...</span>
                <button className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold text-gray-400 hover:text-white">Copy</button>
            </div>
          </div>

          <div className="bg-amber-950/20 border-l-2 border-amber-600 p-4 rounded-r-lg">
             <div className="flex items-center gap-2 text-amber-500 text-[10px] font-bold mb-1">
                <AlertTriangle size={12} /> Copy this secret now.
             </div>
             <p className="text-[10px] text-amber-200/50">You won't see it again.</p>
             <div className="mt-3 flex items-center gap-2 bg-[#0a0a0a] p-2 rounded-lg">
                <span className="text-[10px] font-mono text-gray-400 truncate">cdtsec_0a9c3f1e9...</span>
                <button className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold text-gray-400 hover:text-white">Copy</button>
             </div>
          </div>

          <button 
            onClick={() => setStep('form')}
            className="w-full py-3 bg-white/5 text-gray-400 font-bold rounded-xl border border-white/10 hover:bg-white/10 hover:text-white transition-all"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}