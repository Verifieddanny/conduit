import DocSection from '../section';

const ArchitectureSection = () => {
  const parts = [
    { title: "API server", desc: "Verifies source signatures and writes pending callback records." },
    { title: "Redis queue", desc: "Acts as the durable queue between ingestion and delivery workers." },
    { title: "Worker", desc: "Fetches callback + endpoint state and attempts signed delivery." },
    { title: "Write-ahead persistence", desc: "Callbacks are stored before delivery so failures never erase visibility." },
  ];

  return (
    <DocSection title="Producer-consumer pattern" id="architecture">
      <div className="text-[#00f2ad] text-[10px] font-bold uppercase tracking-widest mb-2">Architecture</div>
      <p className="text-gray-400 mb-12 leading-relaxed">
        Conduit keeps ingestion and delivery independent. The API process receives and persists data. 
        The worker process consumes queued jobs later and handles retries without blocking the ingest path.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parts.map((p) => (
          <div key={p.title} className="p-8 rounded-xl bg-[#111113] border border-white/5 flex flex-col justify-center min-h-40">
            <h4 className="text-white font-bold text-base mb-4 tracking-tight">{p.title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </DocSection>
  );
};

export default ArchitectureSection;