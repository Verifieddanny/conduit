"use client";

import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Activity, ArrowRight, X } from "lucide-react";
import { useSearchStore } from "@/store/use-search-store";
import { useEndpoints } from "@/hooks/use-endpoints";
import { useRecentDeliveries } from "@/hooks/use-deliveries";
import { useRouter } from "next/navigation";

export default function CommandPalette() {
  const { isOpen, setIsOpen } = useSearchStore();
  const [search, setSearch] = useState("");
  const { endpoints } = useEndpoints();
  const { data: deliveries } = useRecentDeliveries();
  const router = useRouter();

  // Keyboard listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) setSearch("");
  }, [isOpen]);

  const results = useMemo(() => {
    if (!search.trim()) return { endpoints: [], deliveries: [] };

    const query = search.toLowerCase();

    const filteredEndpoints = endpoints.filter(ep =>
      ep.endpointPath.toLowerCase().includes(query) ||
      ep.externalSource.toLowerCase().includes(query)
    ).slice(0, 5);

    const filteredDeliveries = (deliveries || []).filter(d =>
      d.eventType.toLowerCase().includes(query) ||
      d.id.toLowerCase().includes(query) ||
      d.endpoint?.endpointPath.toLowerCase().includes(query)
    ).slice(0, 5);

    return { endpoints: filteredEndpoints, deliveries: filteredDeliveries };
  }, [search, endpoints, deliveries]);

  const navigateTo = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-start justify-center pt-24 px-4 z-101 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-[#0d0d0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* Search Input */}
              <div className="relative p-4 border-b border-white/5">
                <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search anything (endpoints, deliveries, events...)"
                  className="w-full bg-transparent pl-12 pr-12 py-3 text-sm text-white outline-none placeholder:text-gray-600"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  title="close"
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-1 hover:bg-white/5 rounded-md transition-colors"
                >
                  <X size={16} className="text-gray-500" />
                </button>
              </div>

              {/* Results Area */}
              <div className="max-h-[60vh] overflow-y-auto p-2 no-scrollbar">
                {!search.trim() ? (
                  <div className="py-12 text-center">
                    <div className="inline-flex p-3 bg-white/5 rounded-2xl mb-4">
                      <Search size={24} className="text-gray-500" />
                    </div>
                    <p className="text-sm text-gray-400">Search for endpoints or delivery records</p>
                    <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-widest font-bold">Quick navigation with Ctrl+K</p>
                  </div>
                ) : (
                  <div className="space-y-4 p-2">
                    {/* Endpoints Section */}
                    {results.endpoints.length > 0 && (
                      <div>
                        <h4 className="px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Endpoints</h4>
                        <div className="space-y-1">
                          {results.endpoints.map(ep => (
                            <button
                              key={ep.id}
                              onClick={() => navigateTo(`/dashboard/endpoints`)} // Could link to specific endpoint detail if it exists
                              className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                  <Globe size={16} className="text-blue-400" />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-white">{ep.endpointPath}</p>
                                  <p className="text-[10px] text-gray-500 uppercase tracking-tight">{ep.externalSource}</p>
                                </div>
                              </div>
                              <ArrowRight size={14} className="text-gray-700 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Deliveries Section */}
                    {results.deliveries.length > 0 && (
                      <div>
                        <h4 className="px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recent Deliveries</h4>
                        <div className="space-y-1">
                          {results.deliveries.map(d => (
                            <button
                              key={d.id}
                              onClick={() => navigateTo(`/dashboard/deliveries`)}
                              className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#00f2ad]/10 rounded-lg">
                                  <Activity size={16} className="text-[#00f2ad]" />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-white">{d.eventType}</p>
                                  <p className="text-[10px] text-gray-500 font-mono">ID: {d.id.slice(0, 8)}...</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${d.status === 'delivered' ? 'bg-[#00f2ad]/5 border-[#00f2ad]/20 text-[#00f2ad]' : 'bg-red-500/5 border-red-500/20 text-red-500'
                                  }`}>
                                  {d.status}
                                </span>
                                <ArrowRight size={14} className="text-gray-700 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {results.endpoints.length === 0 && results.deliveries.length === 0 && (
                      <div className="py-12 text-center text-sm text-gray-500">
                        No results found for "{search}"
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-white/2 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] text-gray-500 font-mono">↵</kbd>
                    <span className="text-[10px] text-gray-600">to select</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] text-gray-500 font-mono">esc</kbd>
                    <span className="text-[10px] text-gray-600">to close</span>
                  </div>
                </div>
                <div className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">
                  Conduit Search
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
