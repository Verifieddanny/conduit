"use client";
import { useState } from "react";
import { CopyButton } from "@/components/docs/copy-button";
import { Callback, useDeliveries } from "@/hooks/use-deliveries";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";

export default function CallbackRow({ callback }: { callback: Callback }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { replay } = useDeliveries(callback.endpointId);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    replay.mutate(callback.id);
  };

  const statusColors = {
    pending: 'bg-blue-500 text-blue-500',
    delivered: 'bg-[#00f2ad] text-[#00f2ad]',
    failed: 'bg-amber-500 text-amber-500',
    dead: 'bg-red-500 text-red-500',
  };

  const parsedPayload = (() => {
    try {
        return typeof callback.payload === 'string' ? JSON.parse(callback.payload) : callback.payload;
    } catch {
        return callback.payload;
    }
  })();

  const parsedResponse = (() => {
    try {
        return typeof callback.responseBody === 'string' ? JSON.parse(callback.responseBody) : callback.responseBody;
    } catch {
        return callback.responseBody;
    }
  })();

  return (
    <div className="border-b border-white/5 last:border-0">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="grid grid-cols-6 gap-4 px-6 py-4 cursor-pointer hover:bg-white/2 transition-colors items-center text-[11px] font-mono"
      >
        <span className="text-gray-400">{callback.id.split('-')[0]}</span>
        <span className="text-blue-400 uppercase font-bold text-[9px] truncate">{callback.eventType}</span>
        <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${statusColors[callback.status].split(' ')[0]}`} />
            <span className={statusColors[callback.status].split(' ')[1]}>{callback.status}</span>
        </div>
        <span className={callback.responseCode?.startsWith('2') ? 'text-[#00f2ad]' : 'text-red-500'}>
            {callback.responseCode || '—'}
        </span>
        <span className="text-gray-500">{callback.attempts}/5</span>
        <span className="text-gray-600 text-right">
            {formatDistanceToNow(new Date(callback.createdAt))} ago
        </span>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0a0a0a]/50">
          {/* Payload Block */}
          <div className="col-span-1 lg:col-span-6 space-y-2">
            <div className="flex justify-between items-center px-1">
                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Payload</span>
                <CopyButton content={JSON.stringify(parsedPayload, null, 2)} />
            </div>
            <pre className="bg-[#0d0d0f] border border-white/5 p-4 rounded-xl text-[10px] text-gray-400 h-64 overflow-y-auto leading-relaxed font-mono no-scrollbar">
                {JSON.stringify(parsedPayload, null, 2)}
            </pre>
          </div>

          {/* Metadata & Response Block */}
          <div className="col-span-1 lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-[10px] bg-[#111113] p-4 rounded-xl border border-white/5">
                <div>
                    <span className="text-gray-600 block mb-1">Response code</span>
                    <span className={callback.responseCode?.startsWith('2') ? 'text-[#00f2ad]' : 'text-red-500'}>
                        {callback.responseCode || 'No response'}
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-gray-600 block mb-1">Attempts</span>
                    <span className="text-white">{callback.attempts} of 5</span>
                </div>
            </div>

            <div className="space-y-2">
                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest px-1">Response Body</span>
                <pre className="bg-[#0d0d0f] border border-white/5 p-4 rounded-xl text-[10px] text-gray-500 font-mono h-32 overflow-y-auto no-scrollbar">
                    {typeof parsedResponse === 'object' ? JSON.stringify(parsedResponse, null, 2) : (parsedResponse || 'Empty response')}
                </pre>
            </div>

            {(callback.status === 'failed' || callback.status === 'dead') && (
                <button 
                    onClick={handleReplay}
                    disabled={replay.isPending}
                    className="w-full py-2 bg-[#00f2ad] text-black text-[10px] font-bold rounded-lg uppercase tracking-widest hover:bg-[#00d195] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {replay.isPending ? <Loader2 size={12} className="animate-spin" /> : 'Replay'}
                </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}