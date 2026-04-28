"use client";
import { useRecentDeliveries } from "@/hooks/use-deliveries";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function RecentDeliveries() {
  const { data: deliveries, isLoading } = useRecentDeliveries();

  return (
    <div className="bg-[#111113] border border-white/5 rounded-2xl overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-white/5">
        <div>
          <h3 className="font-bold text-white">Recent Deliveries</h3>
          <p className="text-xs text-gray-500 mt-1">Last 10 callbacks across all endpoints.</p>
        </div>
        <Link 
          href="/dashboard/deliveries" 
          className="text-[10px] font-bold text-[#00f2ad] uppercase hover:underline"
        >
          View all
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-gray-500" size={24} />
        </div>
      ) : !deliveries || deliveries.length === 0 ? (
        <div className="py-20 text-center text-gray-500 text-sm">
          No recent deliveries found.
        </div>
      ) : (
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] text-gray-500 uppercase font-bold tracking-widest">
            <tr>
              <th className="px-6 py-3">Event Type</th>
              <th className="px-6 py-3">Endpoint</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-right">Response</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {deliveries.map((d) => (
              <tr key={d.id} className="hover:bg-white/2 transition-colors group cursor-pointer text-[12px]">
                <td className="px-6 py-4 font-mono text-gray-400 group-hover:text-white">{d.eventType}</td>
                <td className="px-6 py-4 text-gray-600 font-mono truncate max-w-50">{d.endpoint?.endpointPath || 'Unknown'}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    d.status === 'delivered' ? 'bg-[#00f2ad]/10 border-[#00f2ad]/20 text-[#00f2ad]' :
                    d.status === 'pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                    d.status === 'failed' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                    'bg-red-500/10 border-red-500/20 text-red-500'
                  }`}>
                    {d.status}
                  </span>
                </td>
                <td className={`px-6 py-4 text-right font-mono font-bold ${
                  d.responseCode?.startsWith('2') ? 'text-[#00f2ad]' : 'text-red-500'
                }`}>{d.responseCode || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}