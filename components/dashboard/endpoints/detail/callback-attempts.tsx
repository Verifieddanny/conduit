"use client";
import { useState } from 'react';
import CallbackRow from './callback-row';
import { useDeliveries } from '@/hooks/use-deliveries';
import { Loader2 } from 'lucide-react';

export default function CallbackAttempts({ endpointId }: { endpointId: string }) {
  const { deliveries, isLoading } = useDeliveries(endpointId);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredDeliveries = deliveries.filter(d => {
    if (activeFilter === 'all') return true;
    return d.status === activeFilter;
  });

  const getCount = (status: string) => {
    if (status === 'all') return deliveries.length;
    return deliveries.filter(d => d.status === status).length;
  };

  const filters = [
    { label: "All", count: getCount('all'), id: 'all' },
    { label: "Pending", count: getCount('pending'), id: 'pending' },
    { label: "Delivered", count: getCount('delivered'), id: 'delivered' },
    { label: "Failed", count: getCount('failed'), id: 'failed' },
    { label: "Dead", count: getCount('dead'), id: 'dead' },
  ];

  return (
    <div className="bg-[#111113] border border-white/5 rounded-3xl overflow-hidden">
      <div className="p-8 border-b border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">Callback attempts</h3>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                activeFilter === f.id
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white/5 border-white/5 text-gray-500 hover:text-gray-300"
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#0d0d0f]/50 min-h-75">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 px-6 py-3 border-b border-white/5 text-[9px] font-bold text-gray-600 uppercase tracking-widest">
          <span>Callback ID</span>
          <span>Event Type</span>
          <span>Status</span>
          <span>Response</span>
          <span>Attempts</span>
          <span className="text-right">Created</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/5">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-gray-600" size={24} />
            </div>
          ) : filteredDeliveries.length > 0 ? (
            filteredDeliveries.map((cb) => (
              <CallbackRow key={cb.id} callback={cb} />
            ))
          ) : (
            <div className="flex items-center justify-center py-20 text-gray-600 text-xs font-bold uppercase tracking-widest">
                No callbacks found for this filter
            </div>
          )}
        </div>
      </div>
    </div>
  );
}