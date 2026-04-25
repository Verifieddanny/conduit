const stats = [
  { label: "Total Endpoints", value: "18", sub: "4 added this week", trend: "neutral" },
  { label: "Total Deliveries", value: "128.4k", sub: "+6.2% from last 24h", trend: "up" },
  { label: "Delivered", value: "123.6k", sub: "Steady 2xx traffic", trend: "success", color: "text-[#00f2ad]" },
  { label: "Failed", value: "3,821", sub: "Mostly retryable 4xx", trend: "warning", color: "text-amber-500" },
  { label: "Dead", value: "941", sub: "Needs replay or cleanup", trend: "danger", color: "text-red-500" },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-[#111113] border border-white/5 p-4 rounded-xl">
          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest block mb-4">
            {stat.label}
          </span>
          <div className={`text-2xl font-bold ${stat.color || "text-white"}`}>
            {stat.value}
          </div>
          <p className="text-[10px] text-gray-600 mt-2 font-medium">
            {stat.sub}
          </p>
        </div>
      ))}
    </div>
  );
}