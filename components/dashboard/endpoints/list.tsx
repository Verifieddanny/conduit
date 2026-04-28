"use client";
import EndpointCard from "./endpoint-card";
import { useEndpoints } from "@/hooks/use-endpoints";
import { Loader2, Search } from "lucide-react";
import { useState, useMemo } from "react";

export default function RegisteredEndpointsList() {
    const { endpoints, isLoading } = useEndpoints();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All sources");

    const filters = ["All sources", "Active only", "Inactive", "Simulator"];

    const filteredEndpoints = useMemo(() => {
        return endpoints.filter(ep => {
            const matchesSearch = 
                ep.endpointPath.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ep.externalSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ep.subscribedEvent.some(ev => ev.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesFilter = 
                activeFilter === "All sources" ||
                (activeFilter === "Active only" && ep.status === "active") ||
                (activeFilter === "Inactive" && ep.status === "inactive") ||
                (activeFilter === "Simulator" && ep.externalSource === "simulator");

            return matchesSearch && matchesFilter;
        });
    }, [endpoints, searchQuery, activeFilter]);

    return (
        <div className="bg-[#111113] border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-white/5">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Registered endpoints</h3>
                    <div className="relative group min-w-[240px]">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00f2ad]" />
                        <input 
                            type="text" 
                            placeholder="Filter by URL, source..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-white/5 rounded-lg py-1.5 pl-9 pr-4 text-[11px] outline-none focus:border-[#00f2ad]/30"
                        />
                    </div>
                </div>

                <p className="text-xs text-gray-500 mb-8 max-w-xl">
                    Each endpoint maps an inbound Conduit URL to a real destination. Toggle status optimistically, inspect deliveries, or edit subscribed events.
                </p>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-2">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${activeFilter === f
                                    ? "bg-white/10 border-white/20 text-white"
                                    : "bg-white/5 border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* List Container */}
            <div className="p-8 space-y-4 bg-[#0d0d0f]/50 min-h-100">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
                        <Loader2 className="animate-spin" size={24} />
                        <p className="text-xs font-bold uppercase tracking-widest">Loading endpoints...</p>
                    </div>
                ) : filteredEndpoints.length > 0 ? (
                    filteredEndpoints.map((ep) => (
                        <EndpointCard key={ep.id} {...ep} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-600">
                        <p className="text-sm font-medium">No endpoints match your filters.</p>
                        <p className="text-[10px] mt-1 uppercase tracking-widest font-bold">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}