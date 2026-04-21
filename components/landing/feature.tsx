import React from 'react';
import { 
  ShieldCheck, 
  Timer, 
  MailWarning, 
  Activity, 
  Key, 
  Lock, 
  CheckCircle2, 
  PlayCircle 
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      title: "HMAC-SHA256 Signing",
      description: "Verify payloads originated from Conduit with signature headers.",
      icon: <ShieldCheck size={20} className="text-[#00f2ad]" />,
    },
    {
      title: "Exponential Backoff",
      description: "AWS-recommended retry strategy with jitter to prevent thundering herds.",
      icon: <Timer size={20} className="text-[#00f2ad]" />,
    },
    {
      title: "Dead Letter Queue",
      description: "Failed events are stored safely. Manually replay them when your systems recover.",
      icon: <MailWarning size={20} className="text-[#00f2ad]" />,
    },
    {
      title: "Real-time Logs",
      description: "Inspect full request payloads, response bodies, and delivery attempts.",
      icon: <Activity size={20} className="text-[#00f2ad]" />,
    },
    {
      title: "API Key Auth",
      description: "Manage your endpoints programmatically with secure API keys.",
      icon: <Key size={20} className="text-[#00f2ad]" />,
    },
    {
      title: "AES-256 Encrypted",
      description: "Your webhook secrets are encrypted at rest using AES-256-GCM.",
      icon: <Lock size={20} className="text-[#00f2ad]" />,
    },
    {
      title: "Platform Signatures",
      description: "Built-in signature verification for 5 major platforms before accepting events.",
      icon: <CheckCircle2 size={20} className="text-[#00f2ad]" />,
    },
    {
      title: "Event Simulator",
      description: "Test your pipeline without needing the external service to send real events.",
      icon: <PlayCircle size={20} className="text-[#00f2ad]" />,
    },
  ];

  const techStack = [
    "Bun", "Express 5", "TypeScript", "PostgreSQL", "Redis", "BullMQ", "Drizzle ORM"
  ];

  return (
    <section className=" text-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* --- Features Grid --- */}
        <h2 className="text-3xl font-bold mb-12 font-plex">Everything you need</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-32 font-plex">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-xl bg-[#111113] border border-white/5 hover:border-white/10 hover:bg-[#161618] transition-all group"
            >
              <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                {feature.icon}
              </div>
              <h3 className="text-base font-bold mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* --- Powered By Footer --- */}
        <div className="flex flex-col items-center border-t border-white/5 pt-20">
          <span className="text-[10px] font-mono tracking-[0.4em] text-gray-600 uppercase mb-8">
            Powered By
          </span>
          <div className="font-plex flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
            {techStack.map((tech, i) => (
              <React.Fragment key={tech}>
                <span className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-default">
                  {tech}
                </span>
                {i < techStack.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-gray-800" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;