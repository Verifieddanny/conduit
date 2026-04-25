"use client";
import { Radio, ScrollText, Key, Zap } from "lucide-react";

const links = [
  { name: "Endpoints", desc: "Manage destination URLs, sources, subscribed events, and destructive actions.", icon: Radio, color: "text-blue-400" },
  { name: "Delivery Logs", desc: "Inspect payloads, response bodies, retry schedules, and replay dead callbacks.", icon: ScrollText, color: "text-amber-500" },
  { name: "API Key", desc: "Generate or rotate your programmatic access key with the shown-once warning flow.", icon: Key, color: "text-gray-400" },
  { name: "Simulator", desc: "Fire a realistic payment.failed event and watch it move through the delivery pipeline.", icon: Zap, color: "text-[#00f2ad]" },
];

export default function QuickLinks() {
  return (
    <div className="space-y-3">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <button 
            key={link.name} 
            className="w-full text-left bg-[#111113] border border-white/5 hover:border-white/10 p-4 rounded-2xl flex gap-4 transition-all group"
          >
            <div className={`p-2.5 rounded-xl bg-white/5 ${link.color} shrink-0 group-hover:scale-110 transition-transform`}>
              <Icon size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">{link.name}</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">
                {link.desc}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}