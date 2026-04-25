"use client";
import { useState } from "react";
import { CopyButton } from "@/components/docs/copy-button";

export default function CallbackRow({ callback }: { callback: any }) {
  const [isExpanded, setIsExpanded] = useState(callback.id === 'f55ffda8'); // Mocking the first one expanded

  return (
    <div className="border-b border-white/5 last:border-0">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="grid grid-cols-6 gap-4 px-6 py-4 cursor-pointer hover:bg-white/2 transition-colors items-center text-[11px] font-mono"
      >
        <span className="text-gray-400">{callback.id}</span>
        <span className="text-blue-400 uppercase font-bold text-[9px]">{callback.type}</span>
        <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${callback.status === 'failed' ? 'bg-amber-500' : 'bg-[#00f2ad]'}`} />
            <span className={callback.status === 'failed' ? 'text-amber-500' : 'text-[#00f2ad]'}>{callback.status}</span>
        </div>
        <span className={callback.code >= 400 ? 'text-red-500' : 'text-[#00f2ad]'}>{callback.code}</span>
        <span className="text-gray-500">{callback.attempts}</span>
        <span className="text-gray-600 text-right">{callback.created}</span>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 pt-2 grid grid-cols-12 gap-6 bg-[#0a0a0a]/50">
          {/* Payload Block */}
          <div className="col-span-6 space-y-2">
            <div className="flex justify-between items-center px-1">
                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Payload</span>
                <CopyButton content={JSON.stringify(callback.payload, null, 2)} />
            </div>
            <pre className="bg-[#0d0d0f] border border-white/5 p-4 rounded-xl text-[10px] text-gray-400 h-64 overflow-y-auto leading-relaxed font-mono">
                {JSON.stringify(callback.payload, null, 2)}
            </pre>
          </div>

          {/* Metadata & Response Block */}
          <div className="col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-[10px] bg-[#111113] p-4 rounded-xl border border-white/5">
                <div>
                    <span className="text-gray-600 block mb-1">Response code</span>
                    <span className="text-amber-500 font-bold">500 Internal Server Error</span>
                </div>
                <div className="text-right">
                    <span className="text-gray-600 block mb-1">Attempts</span>
                    <span className="text-white">3 of 5</span>
                </div>
            </div>

            <div className="space-y-2">
                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest px-1">Response Body</span>
                <pre className="bg-[#0d0d0f] border border-white/5 p-4 rounded-xl text-[10px] text-gray-500 font-mono">
                    {`{\n  "message": "Database unavailable",\n  "retryable": true\n}`}
                </pre>
            </div>

            <button className="w-full py-2 bg-[#00f2ad] text-black text-[10px] font-bold rounded-lg uppercase tracking-widest hover:bg-[#00d195] transition-all">
                Replay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}