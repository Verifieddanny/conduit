"use client";
import { Zap, ChevronDown, Loader2, MousePointerClick } from "lucide-react";
import { useEndpoints } from "@/hooks/use-endpoints";
import { useSimulator, SimulationResult } from "@/hooks/use-simulator";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PayloadEditor({ onResult }: { onResult: (res: SimulationResult) => void }) {
  const { endpoints } = useEndpoints();
  const { simulate } = useSimulator();

  const simulatorEndpoints = endpoints.filter(ep => ep.externalSource?.toLowerCase() === 'simulator');

  const [selectedEndpointId, setSelectedEndpointId] = useState('');
  const [eventType, setEventType] = useState('test');
  const [payload, setPayload] = useState(`{
  "type": "test"
}`);

  const selectedEndpoint = simulatorEndpoints.find(ep => ep.id === selectedEndpointId);

  useEffect(() => {
    if (simulatorEndpoints.length > 0 && !selectedEndpointId) {
      const firstEp = simulatorEndpoints[0];
      setSelectedEndpointId(firstEp.id);
      if (firstEp.subscribedEvent.length > 0) {
        setEventType(firstEp.subscribedEvent[0]);
      }
    }
  }, [simulatorEndpoints, selectedEndpointId]);

  useEffect(() => {
    if (selectedEndpoint && selectedEndpoint.subscribedEvent.length > 0) {
      if (!selectedEndpoint.subscribedEvent.includes(eventType)) {
        setEventType(selectedEndpoint.subscribedEvent[0]);
      }
    }
  }, [selectedEndpoint, eventType]);

  // Handle sync from controls to payload editor
  useEffect(() => {
    try {
      const currentPayload = JSON.parse(payload);
      if (currentPayload.type !== eventType) {
        currentPayload.type = eventType;
        setPayload(JSON.stringify(currentPayload, null, 2));
      }
    } catch (e) {
      // ignore invalid json while typing
    }
  }, [eventType]);

  const handleSimulate = () => {
    if (!selectedEndpointId) return;

    try {
      const parsedPayload = JSON.parse(payload);
      simulate.mutate({
        endpointId: selectedEndpointId,
        payload: parsedPayload,
      }, {
        onSuccess: (data) => {
          onResult(data);
        }
      });
    } catch (e) {
      alert("Invalid JSON payload");
    }
  };

  return (
    <div className="bg-[#111113] border border-white/5 rounded-3xl p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Fire Event</span>
          <h2 className="text-2xl font-bold text-white">Compose a test payload</h2>
          <p className="text-xs text-gray-500 mt-2">Choose an active endpoint, define the event type, and send a JSON payload.</p>
        </div>
        <span className="px-2 py-1 bg-[#00f2ad]/10 border border-[#00f2ad]/20 rounded-full text-[9px] font-bold text-[#00f2ad] uppercase flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-[#00f2ad]" />
          Simulator source
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="endpoint-select" className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Endpoint</label>
            <Link href="/dashboard/endpoints" className="text-[10px] text-[#00f2ad] font-bold hover:underline">Manage</Link>
          </div>
          <div className="relative">
            <select
              id="endpoint-select"
              title="Endpoint"
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 appearance-none text-[11px] font-mono text-gray-400 focus:border-[#00f2ad]/30 outline-none cursor-pointer"
              value={selectedEndpointId}
              onChange={(e) => setSelectedEndpointId(e.target.value)}
            >
              {simulatorEndpoints.length === 0 && <option value="">No simulator endpoints found</option>}
              {simulatorEndpoints.map(ep => (
                <option key={ep.id} value={ep.id}>{ep.endpointPath}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
          </div>
        </div>
        <div>
          <label htmlFor="event-type-select" className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-2">Event Type</label>
          <div className="relative">
            <select
              id="event-type-select"
              title="Event type"
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 appearance-none text-[11px] font-mono text-gray-300 focus:border-[#00f2ad]/30 outline-none cursor-pointer"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              {selectedEndpoint?.subscribedEvent.map(ev => (
                <option key={ev} value={ev}>{ev}</option>
              ))}
              {!selectedEndpoint && <option value="">Select an endpoint first</option>}
              {selectedEndpoint && selectedEndpoint.subscribedEvent.length === 0 && <option value="">No events subscribed</option>}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="payload-textarea" className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-2">Payload</label>
        <textarea
          id="payload-textarea"
          title="Payload JSON"
          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-6 font-mono text-xs text-[#00f2ad]/80 leading-relaxed min-h-40 outline-none focus:border-[#00f2ad]/30 resize-none no-scrollbar"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          placeholder="Enter valid JSON payload"
          spellCheck={false}
        />
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={handleSimulate}
          disabled={simulate.isPending || !selectedEndpoint}
          className="cursor-pointer flex items-center gap-2 bg-[#00f2ad] text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#00d195] transition-all disabled:opacity-50"
        >
          {simulate.isPending ? <Loader2 size={16} className="animate-spin" /> : <MousePointerClick size={16} />}
          Fire Event
        </button>
        <span className="text-[9px] font-mono text-gray-700 ml-auto uppercase tracking-widest">POST /api/simulator/:endpointId</span>
      </div>
    </div>
  );
}