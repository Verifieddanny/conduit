export default function EndpointsStats() {
  const stats = [
    { label: "Active Endpoints", value: "14", sub: "4 inactive or maintenance mode" },
    { label: "Sources Connected", value: "6", sub: "GitHub, Stripe, Slack, Paystack, Shopify, Simulator" },
    { label: "Auto-generated Secrets", value: "7", sub: "Shown once and stored encrypted" },
    { label: "Needs Attention", value: "3", sub: "High retries or inactive destination", color: "text-amber-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-[#111113] border border-white/5 p-5 rounded-2xl">
          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-4">{s.label}</span>
          <div className={`text-2xl font-bold mb-1 ${s.color || "text-white"}`}>{s.value}</div>
          <p className="text-[10px] text-gray-500 leading-tight">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}