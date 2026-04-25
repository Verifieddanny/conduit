"use client";
import { MoreHorizontal, Trash2, Edit3, ExternalLink } from "lucide-react";
import Link from "next/link";

interface EndpointProps {
    id: string;
  url: string;
  source: string;
  status: 'active' | 'degraded' | 'inactive';
  events: string[];
  delivered: string;
  failed: string;
  dead: string;
}

export default function EndpointCard({ id, url, source, status, events, delivered, failed, dead }: EndpointProps) {
  return (
    <div className="bg-[#111113] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-3">
          <h4 className="text-sm font-mono text-gray-300 break-all pr-8 leading-relaxed">
            {url}
          </h4>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-[9px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-gray-400 font-bold uppercase tracking-tight">
              • {source}
            </span>
            <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase ${
              status === 'active' ? 'bg-[#00f2ad]/10 border-[#00f2ad]/20 text-[#00f2ad]' :
              status === 'degraded' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
              'bg-gray-500/10 border-gray-500/20 text-gray-500'
            }`}>
              • {status}
            </span>
            <span className="text-[9px] text-gray-600 mt-1 ml-1 font-medium">Created 2 days ago</span>
          </div>
        </div>

        {/* Status Toggle Simulation */}
        <div className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors ${status === 'inactive' ? 'bg-gray-800' : 'bg-[#00f2ad]/40'}`}>
          <div className={`w-3 h-3 rounded-full transition-transform ${status === 'inactive' ? 'translate-x-0 bg-gray-600' : 'translate-x-5 bg-[#00f2ad]'}`} />
        </div>
      </div>

      {/* Subscribed Events */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {events.map((ev) => (
          <span key={ev} className="px-2 py-1 bg-[#0a0a0a] border border-white/5 rounded text-[10px] text-gray-500 font-mono">
            {ev}
          </span>
        ))}
        {events.length > 3 && <span className="text-[10px] text-gray-700 font-bold ml-1">+{events.length - 3} more</span>}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex gap-4 text-[11px] font-mono">
          <div className="text-[#00f2ad] font-bold">{delivered} <span className="text-gray-700 font-normal">delivered</span></div>
          <div className="text-amber-500 font-bold">{failed} <span className="text-gray-700 font-normal">failed</span></div>
          <div className="text-red-500 font-bold">{dead} <span className="text-gray-700 font-normal">dead</span></div>
        </div>

        <div className="flex gap-2">
          <Link href={`/dashboard/endpoints/${id}`} className="px-3 py-1.5 bg-[#00f2ad] text-black text-[10px] font-bold rounded-lg hover:bg-[#00d195] transition-all">
            View Deliveries
          </Link>
          <button title="Edit Endpoint" type="button" className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <Edit3 size={14} />
          </button>
          <button title="Delete Endpoint" type="button" className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}