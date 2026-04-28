"use client";
import { useRecentDeliveries } from "@/hooks/use-deliveries";
import { Loader2, Search, Filter, ArrowUpRight, Activity } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DeliveriesPage() {
  const { data: deliveries, isLoading } = useRecentDeliveries();
  const [filter, setFilter] = useState('all');

  const filteredDeliveries = deliveries?.filter(d => {
    if (filter === 'all') return true;
    return d.status === filter;
  }) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">
            Global Logs
          </span>
          <h1 className="text-3xl font-bold text-white mb-2">Delivery Logs</h1>
          <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
            Monitor all outbound webhook attempts across your entire pipeline in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
                <Activity size={14} className="text-[#00f2ad]" />
                <span className="text-xs font-bold text-white">{deliveries?.length || 0} Total Attempts</span>
            </div>
        </div>
      </div>

      <div className="bg-[#111113] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            <input 
              type="text" 
              placeholder="Search by Event ID or Type..." 
              className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white outline-none focus:border-[#00f2ad]/30 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {['all', 'delivered', 'pending', 'failed', 'dead'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  filter === s 
                    ? 'bg-[#00f2ad] text-black' 
                    : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="animate-spin text-[#00f2ad]" size={32} />
          </div>
        ) : filteredDeliveries.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-gray-500 text-sm">No matching delivery logs found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Event Type</th>
                  <th className="px-6 py-4">Endpoint</th>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Response</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDeliveries.map((d) => (
                  <tr key={d.id} className="hover:bg-white/2 transition-colors group text-[12px]">
                    <td className="px-6 py-4 font-mono text-gray-400 group-hover:text-white transition-colors">{d.eventType}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-gray-300 font-medium truncate max-w-[150px]">{d.endpoint?.endpointPath || 'Unknown'}</span>
                        <span className="text-[10px] text-gray-600 font-mono truncate max-w-[150px]">{d.endpointId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(d.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        d.status === 'delivered' ? 'bg-[#00f2ad]/10 border-[#00f2ad]/20 text-[#00f2ad]' :
                        d.status === 'pending' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                        d.status === 'failed' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                        'bg-red-500/10 border-red-500/20 text-red-500'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-mono font-bold ${
                      d.responseCode?.startsWith('2') ? 'text-[#00f2ad]' : 'text-red-500'
                    }`}>{d.responseCode || 'N/A'}</td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/dashboard/endpoints/${d.endpointId}`}
                        className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-500 hover:text-white hover:border-[#00f2ad]/50 transition-all inline-block"
                      >
                        <ArrowUpRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}