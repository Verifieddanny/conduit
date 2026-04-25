"use client";
import { Key, Plus } from "lucide-react";

export default function EmptyKeyState() {
  return (
    <div className="bg-[#111113] border border-white/5 rounded-3xl p-12 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 mb-8">
        <Key size={32} />
      </div>
      
      <div className="max-w-sm space-y-4 mb-8">
        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Alternate State</span>
        <h3 className="text-2xl font-bold text-white">No API key generated</h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          This compact block represents the initial empty state before a user creates their first key. 
          You'll need an API key to authenticate programmatic requests to Conduit.
        </p>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl w-full max-w-md">
        <h4 className="text-sm font-bold text-gray-300 mb-2">You haven't generated an API key yet.</h4>
        <p className="text-[11px] text-gray-600 mb-8">
            Generate your API key to authenticate programmatic requests to Conduit.
        </p>
        <button className="w-full py-4 bg-[#00f2ad] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#00d195] transition-all group">
          <Plus size={18} />
          Generate API Key
        </button>
      </div>
    </div>
  );
}