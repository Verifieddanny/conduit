import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Register an endpoint',
      description: 'Provide your URL and subscribe to the event types you care about.',
      content: (
        <div className="bg-[#060608] border border-white/10 rounded-lg p-5 w-full h-64">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Endpoint URL</label>
              <div className="mt-1 p-2.5 bg-[#151518] border border-white/5 rounded text-xs text-gray-300 font-mono">
                https://api.myapp.com/webhooks
              </div>
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Events</label>
              <div className="mt-1 flex gap-2">
                <span className="px-2 py-1 bg-[#1a1a1c] border border-[#00f2ad]/30 text-[#00f2ad] text-[10px] rounded font-mono">stripe.*</span>
                <span className="px-2 py-1 bg-[#1a1a1c] border border-[#00f2ad]/30 text-[#00f2ad] text-[10px] rounded font-mono">github.push</span>
              </div>
            </div>
            <button className="w-full py-2 bg-white text-black text-xs font-bold rounded mt-2 hover:bg-gray-200 transition-colors">
              Create Endpoint
            </button>
          </div>
        </div>
      ),
    },
    {
      number: '02',
      title: 'Point webhooks to Conduit',
      description: 'External services send events to your unique Conduit inbound URL.',
      content: (
        <div className="bg-[#060608] border border-white/10 rounded-lg p-5 w-full font-mono text-[13px] leading-relaxed h-64">
          <div className="text-[#00f2ad]">curl <span className="text-gray-400">-X POST \</span></div>
          <div className="text-gray-400 ml-4">https://conduit-api.useshipyard.xyz/a</div>
          <div className="text-gray-400 ml-4">-H <span className="text-[#00f2ad]">"Content-Type: application/json"</span> \</div>
          <div className="text-gray-400 ml-4">-H <span className="text-[#00f2ad]">"X-GitHub-Event: push"</span> \</div>
          <div className="text-gray-400 ml-4">-d <span className="text-[#00f2ad]">"&#123;"ref":"refs/heads/main"&#125;"</span></div>
        </div>
      ),
    },
    {
      number: '03',
      title: 'Conduit delivers reliably',
      description: 'Signed payloads, retry logic, delivery logs, and dead letter recovery.',
      content: (
        <div className="bg-[#060608] border border-white/10 rounded-lg p-5 w-full font-mono text-[9px] leading-5 h-64">
          <div className="flex gap-1 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <div className="w-2 h-2 rounded-full bg-green-500/80" />
          </div>
          <div className="text-gray-500 border-t text-sm border-white/5 pt-2">
            <div>10:42:01 <span className="text-gray-400">[INFO]</span> Received github.push ev</div>
            <div>10:42:01 <span className="text-gray-400">[INFO]</span> Delivering to end_9x2b...</div>
            <div>10:42:02 <span className="text-yellow-500">[WARN] Failed (502 Bad Gateway)</span></div>
            <div>10:42:02 <span className="text-yellow-500">[WARN] Re-queuing in 5s (Atte</span></div>
            <div>10:42:07 <span className="text-gray-400">[INFO]</span> Retrying delivery...</div>
            <div>10:42:08 <span className="text-[#00f2ad]">[SUCCESS] Delivered (200 OK)</span></div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="bg-[#0F1113] w-full py-24 px-6 font-plex">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16 ">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col rounded-xl border border-white/5 bg-[#0A0B0D] overflow-hidden">
              <div className="p-8 pb-4">
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded bg-[#00f2ad]/10 text-[#00f2ad] text-xs font-bold border border-[#00f2ad]/20">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight">{step.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {step.description}
                </p>
              </div>
              
              <div className="px-8 pb-8 mt-auto">
                <div className="min-h-45 flex items-center">
                  {step.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;