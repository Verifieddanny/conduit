import { Info } from 'lucide-react';

const QuickStartSection = () => {
  const steps = [
    { id: 1, title: "Create your account", desc: "Register, then sign in to the dashboard with JWT auth." },
    { id: 2, title: "Generate an API key", desc: "Use your API key for programmatic endpoint management." },
    { id: 3, title: "Create an endpoint", desc: "Provide a destination URL, source label, and event subscriptions." },
    { id: 4, title: "Send a test event", desc: "Use the simulator or point a real provider at your inbound URL." },
  ];

  return (
    <section id="quickstart" className="mb-24 scroll-mt-28">
      <h3 className="text-2xl font-bold text-white mb-8">Quick Start</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step) => (
          <div key={step.id} className="p-6 rounded-xl bg-[#111113] border border-white/5 hover:border-white/10 transition-colors">
            <h4 className="text-white font-bold text-sm mb-2">
              <span className="text-gray-500 mr-2">{step.id}.</span>
              {step.title}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3 px-4 py-3 bg-[#00f2ad]/5 border border-[#00f2ad]/10 rounded-lg">
        <Info size={16} className="text-[#00f2ad] shrink-0" />
        <p className="text-[11px] text-gray-400">
          <span className="text-[#00f2ad] font-bold uppercase tracking-tighter mr-1 italic">Core concepts:</span>
          <code className="bg-white/5 px-1 rounded text-gray-300 mx-0.5">endpoint</code> is your destination URL, 
          <code className="bg-white/5 px-1 rounded text-gray-300 mx-0.5">callback</code> is a delivery attempt, and 
          <code className="bg-white/5 px-1 rounded text-gray-300 mx-0.5">secret</code> is the shared key.
        </p>
      </div>
    </section>
  );
};

export default QuickStartSection;