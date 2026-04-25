"use client";
import { useState } from 'react';
import CallbackRow from './callback-row';

const filters = [
  { label: "All", count: 10, id: 'all' },
  { label: "Pending", count: 2, id: 'pending' },
  { label: "Delivered", count: 6, id: 'delivered' },
  { label: "Failed", count: 1, id: 'failed' },
  { label: "Dead", count: 1, id: 'dead' },
];

const mockCallbacks = [
  { 
    id: "f55ffda8", 
    type: "POST", 
    status: "failed", 
    code: 500, 
    attempts: "3/5", 
    nextRetry: "in 9m", 
    created: "2m ago",
    payload: {
        type: "payment.failed",
        id: "evt_1QF6r1k0T9Yx",
        data: {
            payment_intent: "pi_4ce11d9",
            amount: 5000,
            currency: "usd",
            customer: "cus_N28adx2",
            reason: "card_declined"
        },
        source: "stripe",
        receivedAt: "2026-04-19T10:41:23.209Z"
    }
  },
  { id: "a91c2e0f", type: "POST", status: "delivered", code: 204, attempts: "1/5", nextRetry: "—", created: "8m ago" },
  { id: "8d220ef4", type: "POST", status: "dead", code: 502, attempts: "5/5", nextRetry: "—", created: "44m ago" },
  { id: "71f0ab44", type: "POST", status: "pending", code: 0, attempts: "0/5", nextRetry: "in 18s", created: "1h ago" },
  { id: "e102ac9d", type: "POST", status: "delivered", code: 200, attempts: "1/5", nextRetry: "—", created: "2h ago" },
];

export default function CallbackAttempts() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="bg-[#111113] border border-white/5 rounded-3xl overflow-hidden">
      <div className="p-8 border-b border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">Callback attempts</h3>
          <button className="text-[10px] font-bold text-[#00f2ad] uppercase hover:underline">
            Replay last failed delivery
          </button>
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

      <div className="bg-[#0d0d0f]/50">
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
          {mockCallbacks.map((cb) => (
            <CallbackRow key={cb.id} callback={cb} />
          ))}
        </div>
      </div>
    </div>
  );
}