"use client";
import { Zap, ChevronDown } from "lucide-react";

export default function PayloadEditor() {
  const mockJson = `{
  "type": "payment.failed",
  "data": {
    "id": "pay_123",
    "amount": 5000,
    "currency": "usd",
    "reason": "card_declined",
    "customer": {
      "id": "cus_92af10",
      "email": "team@rivetpay.dev"
    },
    "meta": {
      "source": "simulator",
      "triggeredBy": "dannyclassi"
    }
  }
}`;

  return (
    <div className="bg-[#111113] border border-white/5 rounded-3xl p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Fire Event</span>
          <h2 className="text-2xl font-bold text-white">Compose a test payload</h2>
          <p className="text-xs text-gray-500 mt-2">Choose an active endpoint, define the event type, and send a JSON payload.</p>
        </div>
        <span className="px-2 py-1 bg-[#00f2ad]/10 border border-[#00f2ad]/20 rounded-full text-[9px] font-bold text-[#00f2ad] uppercase flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-[#00f2ad]" />
          Simulator source
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Endpoint</label>
            <button className="text-[10px] text-[#00f2ad] font-bold">Create new endpoint</button>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/20 transition-all">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] text-[#00f2ad] font-black uppercase tracking-tighter bg-[#00f2ad]/5 px-1.5 py-0.5 rounded border border-[#00f2ad]/10">active</span>
                <span className="text-[9px] text-gray-600 font-bold uppercase italic">Simulator</span>
            </div>
            <div className="text-[11px] font-mono text-gray-400 truncate">https://api.rivetpay.dev/hooks/simulator</div>
          </div>
        </div>
        <div>
          <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-2">Event Type</label>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 flex justify-between items-center cursor-pointer">
            <span className="text-xs font-mono text-gray-300">payment.failed <span className="text-gray-600 ml-2">string</span></span>
            <ChevronDown size={14} className="text-gray-600" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-2">Payload</label>
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 font-mono text-xs text-[#00f2ad]/80 leading-relaxed min-h-75">
            <pre className="whitespace-pre-wrap">{mockJson}</pre>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button className="flex items-center gap-2 bg-[#00f2ad] text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#00d195] transition-all">
          <Zap size={16} />
          Fire Event
        </button>
        <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all">
          Load another sample
        </button>
        <span className="text-[9px] font-mono text-gray-700 ml-auto uppercase tracking-widest">POST /api/simulator/:endpointId</span>
      </div>
    </div>
  );
}