export default function EndpointOverview() {
  return (
    <div className="bg-[#111113] border border-white/5 rounded-2xl p-8">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-4">
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Stripe Endpoint</span>
          <h2 className="text-xl font-mono text-white tracking-tight">https://api.rivetpay.dev/hooks/billing</h2>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 bg-[#00f2ad]/10 text-[#00f2ad] border border-[#00f2ad]/20 rounded-full text-[9px] font-bold uppercase">• active</span>
            <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[9px] font-bold uppercase">1,338 callbacks</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-400">Edit</button>
          <button className="px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-bold text-red-500">Delete</button>
        </div>
      </div>

      <div className="bg-[#0a0a0a] p-3 rounded-xl border border-white/5 flex items-center justify-between mb-8 group">
         <code className="text-[10px] text-gray-500 font-mono truncate mr-4">POST https://conduit-api.useshipyard.xyz/api/inbound/14109de8...</code>
         <button className="shrink-0 px-3 py-1 bg-[#111113] border border-white/10 rounded text-[10px] font-bold text-gray-400 hover:text-white transition-colors">Copy inbound URL</button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {[
          { label: "Delivered", val: "1,284", sub: "96% success over 7 days", color: "text-[#00f2ad]" },
          { label: "Failed", val: "38", sub: "Will retry on schedule", color: "text-amber-500" },
          { label: "Dead", val: "4", sub: "Manual replay available", color: "text-red-500" },
          { label: "Avg Latency", val: "412ms", sub: "Last callback 2m ago", color: "text-white" },
        ].map(stat => (
          <div key={stat.label} className="bg-[#0d0d0f] border border-white/5 p-4 rounded-xl">
            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{stat.label}</span>
            <div className={`text-xl font-bold mt-1 ${stat.color}`}>{stat.val}</div>
            <p className="text-[9px] text-gray-600 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}