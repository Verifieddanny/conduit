"use client";
import { ArrowLeft, Edit3 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EndpointEditModal from "./edit-modal";
import { Endpoint } from "@/hooks/use-endpoints";

export default function EndpointDetailHeader({ endpoint }: { endpoint: Endpoint }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <Link 
              href="/dashboard/endpoints"
              className="text-[10px] font-bold text-[#00f2ad] uppercase tracking-widest flex items-center gap-1.5 mb-2 hover:underline"
          >
            <ArrowLeft size={10} /> Back to Endpoints
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Endpoint Details</h1>
          <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
            Detailed delivery logs, payload inspection, and retry management for this destination.
          </p>
        </div>

        <button 
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <Edit3 size={14} />
          Edit Endpoint
        </button>
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