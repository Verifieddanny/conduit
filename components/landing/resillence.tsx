import React from 'react';
import { 
  ArrowRight,
  Server,
  Database,
  Cpu 
} from 'lucide-react';
import Image from 'next/image';

const ResilienceSection = () => {
  const sources = [
    { name: 'GitHub', icon: <Image src="/svgs/github.svg" alt="GitHub" width={24} height={26} className='w-auto h-auto' /> },
    { name: 'Stripe', icon: <Image src="/svgs/stripe.svg" alt="Stripe" width={26} height={18} className='w-auto h-auto'  /> },
    { name: 'Paystack', icon: <Image src="/svgs/paystack.svg" alt="Paystack" width={25.33} height={24} className='w-auto h-auto' /> },
    { name: 'Slack', icon: <Image src="/svgs/slack.svg" alt="Slack" width={26} height={26} className='w-auto h-auto' /> },
    { name: 'Shopify', icon: <Image src="/svgs/shopify.svg" alt="Shopify" width={24} height={26} className='w-auto h-auto' /> },
    { name: 'Custom API', icon: <Image src="/svgs/custom.svg" alt="Custom API" width={26} height={25} className='w-auto h-auto' /> },
  ];

  return (
    <section className="w-full text-white flex flex-col items-center border-t border-white/5">
      
      <div className="w-full max-w-6xl px-6  py-24 ">
        <h4 className="text-center text-[10px] font-mono tracking-[0.3em] text-gray-500 uppercase mb-10">
          Supported Sources
        </h4>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-80 hover:opacity-100 transition-opacity font-plex">
          {sources.map((source) => (
            <div key={source.name} className="flex items-center gap-2 group cursor-default">
              <span className="text-gray-400 group-hover:text-white transition-colors">{source.icon}</span>
              <span className="text-lg font-semibold tracking-tight">{source.name}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-12 max-w-2xl mx-auto font-plex">
          Auto-detects source by request headers. Zero configuration. Custom sources supported — any service that sends POST requests.
        </p>
      </div>

      <div className="font-plex w-full px-6  py-24  flex flex-col items-center bg-[#0F1113]">
        <h2 className="text-4xl font-bold mb-4">Built for Resilience</h2>
        <p className="text-gray-400 text-center mb-16 max-w-lg">
          Two independent processes. Either can crash without affecting the other.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
          
          {/* API Server */}
          <div className="flex flex-col items-center text-center p-8 rounded-xl bg-[#0d0d0f] border border-white/5 w-full max-w-70 h-48 justify-center">
            <div className="p-3 bg-[#00f2ad]/5 border border-[#00f2ad]/20 rounded-lg mb-4 text-[#00f2ad]">
              <Server size={24} />
            </div>
            <h3 className="text-base font-bold mb-1">API Server</h3>
            <p className="text-xs text-gray-500">Receives payloads & acts as Producer</p>
          </div>

          <ArrowRight className="text-gray-700 rotate-90 md:rotate-0" size={20} />

          {/* Redis Queue */}
          <div className="flex flex-col items-center text-center p-8 rounded-xl bg-[#0d0d0f] border border-white/5 w-full max-w-70 h-48 justify-center">
            <div className="p-3 bg-orange-500/5 border border-orange-500/20 rounded-lg mb-4 text-orange-500">
              <Database size={24} />
            </div>
            <h3 className="text-base font-bold mb-1">Redis Queue</h3>
            <p className="text-xs text-gray-500">Durable job storage via BullMQ</p>
          </div>

          <ArrowRight className="text-gray-700 rotate-90 md:rotate-0" size={20} />

          {/* Worker */}
          <div className="flex flex-col items-center text-center p-8 rounded-xl bg-[#0d0d0f] border border-white/5 w-full max-w-70 h-48 justify-center">
            <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg mb-4 text-emerald-500">
              <Cpu size={24} />
            </div>
            <h3 className="text-base font-bold mb-1">Worker</h3>
            <p className="text-xs text-gray-500">Consumer, delivers events & retries</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ResilienceSection;