import { Timer, Trash2 } from 'lucide-react';
import DocSection from '../section';

const DeliverySection = () => {
  const steps = [
    { id: 1, title: "Inbound request accepted", desc: <>Event arrives at <code className="bg-white/5 px-1 rounded text-gray-300">/api/inbound/:endpointId</code>.</> },
    { id: 2, title: "Signature verified", desc: "Raw payload is checked against the endpoint's stored secret." },
    { id: 3, title: "Pending callback stored", desc: "Conduit writes a callback record in PostgreSQL." },
    { id: 4, title: "Job queued in Redis", desc: "BullMQ picks the delivery up asynchronously." },
    { id: 5, title: "Worker delivers", desc: "Signed POST request is sent to your endpoint URL." },
    { id: 6, title: "Retries or completion", desc: "2xx becomes delivered, otherwise retries continue until dead." },
  ];

  const retryData = [
    { attempt: 1, delay: "10 seconds", jitter: "10s–20s", cumulative: "~15s" },
    { attempt: 2, delay: "30 seconds", jitter: "30s–60s", cumulative: "~1 min" },
    { attempt: 3, delay: "2 minutes", jitter: "2min–4min", cumulative: "~4 min" },
    { attempt: 4, delay: "10 minutes", jitter: "10min–20min", cumulative: "~19 min" },
    { attempt: 5, delay: "1 hour", jitter: "1hr–2hr", cumulative: "~1.5 hr" },
  ];

  return (
    <DocSection title="How delivery works" id="delivery">
      <div className="text-[#00f2ad] text-[10px] font-bold uppercase tracking-widest mb-2">Delivery & Reliability</div>
      <p className="text-gray-400 mb-12 leading-relaxed">
        Inbound events are verified, persisted, queued, consumed, delivered, retried, and eventually marked dead 
        if recovery never succeeds within the retry policy.
      </p>

      {/* 6-Step Process Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {steps.map((step) => (
          <div key={step.id} className="p-6 rounded-xl bg-[#111113] border border-white/5 min-h-35">
            <h4 className="text-white font-bold text-sm mb-3">
              <span className="text-gray-500 mr-2">{step.id}.</span>
              {step.title}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Retry Schedule Table */}
      <h3 className="text-xl font-bold text-white mb-8">Retry schedule</h3>
      <div className="border border-white/5 rounded-lg overflow-hidden mb-8 bg-[#0d0d0f]">
        <table className="w-full text-[11px] text-left">
          <thead className="bg-white/5 text-gray-500 font-bold uppercase tracking-widest text-[9px]">
            <tr>
              <th className="px-6 py-4">Attempt</th>
              <th className="px-6 py-4">Base Delay</th>
              <th className="px-6 py-4">With Jitter</th>
              <th className="px-6 py-4 text-right">Cumulative Wait</th>
            </tr>
          </thead>
          <tbody className="text-gray-400 divide-y divide-white/5">
            {retryData.map((r) => (
              <tr key={r.attempt} className="hover:bg-white/1 transition-colors">
                <td className="px-6 py-5 text-white font-medium">{r.attempt}</td>
                <td className="px-6 py-5">{r.delay}</td>
                <td className="px-6 py-5 text-gray-500">{r.jitter}</td>
                <td className="px-6 py-5 text-right font-mono text-gray-500">{r.cumulative}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Jitter Logic Callout */}
      <div className="mb-4 flex items-center gap-3 px-4 py-3 bg-[#00f2ad]/5 border border-[#00f2ad]/10 rounded-lg">
        <Timer size={18} className="text-[#00f2ad] shrink-0" />
        <p className="text-[11px] text-gray-400">
          Conduit uses full jitter (AWS recommended): <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-300 mx-1">delay = baseDelay + random(0, baseDelay)</code>. 
          This avoids thundering herd retries against recovering endpoints.
        </p>
      </div>

      {/* Dead Letter Callout */}
      <div className="flex items-start gap-4 p-4 bg-[#1a1608] border-l-4 border-amber-600 rounded-r-lg">
        <Trash2 size={20} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[13px] text-amber-200/70 leading-relaxed">
          After 5 failed attempts, a delivery moves to <code className="bg-white/10 px-1.5 rounded text-amber-100">dead</code> status. 
          Dead deliveries remain queryable and can be manually replayed through the API or dashboard.
        </p>
      </div>
    </DocSection>
  );
};

export default DeliverySection;