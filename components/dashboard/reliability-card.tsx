"use client";

export default function ReliabilityCard() {
  return (
    <div className="bg-[#111113] border border-white/5 rounded-2xl p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Reliability</span>
          <div className="text-4xl font-extrabold text-[#00f2ad] tracking-tight">96.3%</div>
          <p className="text-[10px] text-gray-500 mt-1">delivery success rate</p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#00f2ad]/10 border border-[#00f2ad]/20">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00f2ad] animate-pulse" />
          <span className="text-[9px] font-bold text-[#00f2ad] uppercase">healthy</span>
        </div>
      </div>

      {/* Success Bar */}
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
        <div className="h-full bg-[#00f2ad] w-[96.3%] shadow-[0_0_8px_#00f2ad]" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
        <div>
          <div className="text-sm font-bold text-white">18s</div>
          <p className="text-[9px] text-gray-600 uppercase font-bold mt-1">avg first retry</p>
        </div>
        <div>
          <div className="text-sm font-bold text-white">241ms</div>
          <p className="text-[9px] text-gray-600 uppercase font-bold mt-1">queue lag</p>
        </div>
        <div>
          <div className="text-sm font-bold text-white">12</div>
          <p className="text-[9px] text-gray-600 uppercase font-bold mt-1">replays today</p>
        </div>
      </div>
    </div>
  );
}