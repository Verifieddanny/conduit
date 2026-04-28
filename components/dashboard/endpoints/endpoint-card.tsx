"use client";
import { Trash2, Edit3, Loader2 } from "lucide-react";
import Link from "next/link";
import { Endpoint, useEndpoints } from "@/hooks/use-endpoints";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import EndpointEditModal from "./edit-modal";

export default function EndpointCard(endpoint: Endpoint) {
  const { deleteEndpoint, updateEndpoint } = useEndpoints();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleToggleStatus = () => {
    updateEndpoint.mutate({
      id: endpoint.id,
      url: endpoint.endpointPath, // Ensure we send the current URL
      status: endpoint.status === 'active' ? 'inactive' : 'active'
    });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this endpoint?')) {
      deleteEndpoint.mutate(endpoint.id);
    }
  };

  return (
    <>
      <div className="bg-[#111113] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-all group">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-3">
            <h4 className="text-sm font-mono text-gray-300 break-all pr-8 leading-relaxed">
              {endpoint.endpointPath}
            </h4>

            <div className="flex flex-wrap gap-2">
              <span className="text-[9px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-gray-400 font-bold uppercase tracking-tight">
                • {endpoint.externalSource}
              </span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase ${endpoint.status === 'active' ? 'bg-[#00f2ad]/10 border-[#00f2ad]/20 text-[#00f2ad]' :
                'bg-gray-500/10 border-gray-500/20 text-gray-500'
                }`}>
                • {endpoint.status}
              </span>
              <span className="text-[9px] text-gray-600 mt-1 ml-1 font-medium">
                Created {formatDistanceToNow(new Date(endpoint.createdAt))} ago
              </span>
            </div>
          </div>

          {/* Status Toggle */}
          <button
            title="toggle status"
            onClick={handleToggleStatus}
            disabled={updateEndpoint.isPending}
            className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors disabled:opacity-50 ${endpoint.status === 'inactive' ? 'bg-gray-800' : 'bg-[#00f2ad]/40'}`}
          >
            <div className={`w-3 h-3 rounded-full transition-transform ${endpoint.status === 'inactive' ? 'translate-x-0 bg-gray-600' : 'translate-x-5 bg-[#00f2ad]'}`} />
          </button>
        </div>

        {/* Subscribed Events */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {endpoint.subscribedEvent.slice(0, 3).map((ev) => (
            <span key={ev} className="px-2 py-1 bg-[#0a0a0a] border border-white/5 rounded text-[10px] text-gray-500 font-mono">
              {ev}
            </span>
          ))}
          {endpoint.subscribedEvent.length > 3 && (
            <span className="text-[10px] text-gray-700 font-bold ml-1">
              +{endpoint.subscribedEvent.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex gap-4 text-[11px] font-mono">
            <div className="text-[#00f2ad] font-bold">{endpoint.deliveredCount || 0} <span className="text-gray-700 font-normal">delivered</span></div>
            <div className="text-amber-500 font-bold">{endpoint.failedCount || 0} <span className="text-gray-700 font-normal">failed</span></div>
            <div className="text-red-500 font-bold">{endpoint.deadCount || 0} <span className="text-gray-700 font-normal">dead</span></div>
          </div>

          <div className="flex gap-2">
            <Link href={`/dashboard/endpoints/${endpoint.id}`} className="px-3 py-1.5 bg-[#00f2ad] text-black text-[10px] font-bold rounded-lg hover:bg-[#00d195] transition-all">
              View Deliveries
            </Link>
            <button 
              title="Edit Endpoint" 
              type="button" 
              onClick={() => setIsEditModalOpen(true)}
              className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <Edit3 size={14} />
            </button>
            <button
              title="Delete Endpoint"
              type="button"
              onClick={handleDelete}
              disabled={deleteEndpoint.isPending}
              className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
            >
              {deleteEndpoint.isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EndpointEditModal 
          endpoint={endpoint} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      )}
    </>
  );
}