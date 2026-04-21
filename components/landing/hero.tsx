import React from 'react';
import { Server, Share2, Database, RefreshCw, XCircle } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative w-full py-20 px-6 text-white flex flex-col items-center overflow-hidden">
      {/* --- Header Content --- */}
      <div className="max-w-4xl text-center z-10 font-plex">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Your webhooks, delivered. <br />
          <span className="text-gray-400">Every time.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Source-agnostic webhook relay with retry logic, payload signing, and full
          delivery logs. Your server goes down — Conduit holds your events and keeps trying.
        </p>

        {/* Buttons */}
        <div className="flex flex-row gap-4 justify-center mb-24">
          <button type='button' className="px-8 py-3 bg-[#00f2ad] text-black font-bold rounded-md hover:bg-[#00d195] transition-colors">
            Get Started
          </button>
          <button type='button' className="px-8 py-3 bg-transparent border border-gray-800 text-white font-medium rounded-md hover:bg-white/5 transition-colors">
            View Docs
          </button>
        </div>
      </div>

      {/* --- Visual Diagram Component --- */}
      <div className="relative w-full max-w-4xl p-12 rounded-2xl bg-[#151518] border border-white/5 shadow-2xl">
        <div className="flex items-center justify-between relative">

          {/* External Service Node */}
          <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-[#0d0d0f] border border-white/5 w-40">
            <div className="p-3 bg-white/5 rounded-md border border-white/10">
              <Server className="w-6 h-6 text-gray-400" />
            </div>
            <span className="text-xs font-semibold text-gray-300">External Service</span>
          </div>

          {/* Connection Dot 1 */}
          <div className="flex-1 flex justify-center">
            <div className="w-2 h-2 rounded-full bg-[#00f2ad] shadow-[0_0_15px_#00f2ad]" />
          </div>

          {/* Conduit Node (Active) */}
          <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-[#0d0d0f] border-2 border-[#00f2ad]/50 w-40 relative">
            <div className="p-3 bg-[#00f2ad]/10 rounded-md flex items-center justify-center border border-[#00f2ad]/30">
              <Image src="/svgs/conduit-logo.svg"
                alt="Conduit Logo"
                width={24}
                height={24}
                className='inline-block'
              />
            </div>
            <span className="text-xs font-semibold text-white tracking-wider">Conduit</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            </div>
          </div>

          {/* Retry Connection Path */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1a1608] border border-yellow-700/30 rounded-full">
              <RefreshCw className="w-3 h-3 text-yellow-500" />
              <span className="text-[10px] font-mono text-yellow-500">Retry (5s)</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_12px_orange]" />
          </div>

          {/* Your Server Node (Failing) */}
          <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-[#0d0d0f] border border-white/5 w-44">
            <div className="p-3 bg-white/5 rounded-md border border-white/10">
              <Database className="w-6 h-6 text-gray-400" />
            </div>
            <span className="text-xs font-semibold text-gray-300">Your Server</span>

            {/* Error Message */}
            <div className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-red-950/30 border border-red-900/50 rounded text-red-500">
              <XCircle className="w-3 h-3" />
              <span className="text-[10px] font-mono">502 Bad Gateway</span>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-125 bg-[#00f2ad]/5 blur-[120px] pointer-events-none" />
    </section>
  );
};

export default Hero;