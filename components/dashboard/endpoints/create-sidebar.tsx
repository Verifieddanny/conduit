"use client";
import { useState } from "react";
import { CheckCircle2, AlertTriangle, Loader2, ChevronDown } from "lucide-react";
import { useEndpoints } from "@/hooks/use-endpoints";

const SOURCES = ['stripe', 'github', 'paystack', 'slack', 'shopify', 'simulator'];

export default function CreateEndpointSidebar() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [createdData, setCreatedData] = useState<{ id: string, secret: string, endpoint_path: string } | null>(null);
  const { createEndpoint } = useEndpoints();

  const [formData, setFormData] = useState({
    url: '',
    externalSource: 'stripe',
    subscribedEvent: '',
    secret: ''
  });

  const handleSubmit = async () => {
    if (!formData.url) return;

    createEndpoint.mutate({
      url: formData.url,
      external_source: formData.externalSource,
      subscribed_event: formData.subscribedEvent, // Sending as string as backend expects .split(",")
      secret: formData.secret || undefined
    }, {
      onSuccess: (data) => {
        setCreatedData(data.endpoint);
        setStep('success');
        setFormData({
            url: '',
            externalSource: 'stripe',
            subscribedEvent: '',
            secret: ''
        });
      }
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-[#111113] border border-white/5 rounded-2xl p-6 h-fit sticky top-24">
      <div className="mb-8">
        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-2">Create Flow</span>
        <h3 className="text-xl font-bold text-white">Create Endpoint</h3>
      </div>

      {step === 'form' ? (
        <div className="space-y-5">
          <div>
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Endpoint URL</label>
            <input 
                type="text" 
                placeholder="https://your-api.com/webhooks" 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm focus:border-[#00f2ad] outline-none transition-all placeholder:text-gray-700"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                disabled={createEndpoint.isPending}
            />
          </div>
          
          <div>
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">External Source</label>
            <div className="relative">
                <select 
                title="External Source"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm appearance-none text-gray-300 focus:border-[#00f2ad] outline-none cursor-pointer"
                    value={formData.externalSource}
                    onChange={(e) => setFormData({ ...formData, externalSource: e.target.value })}
                    disabled={createEndpoint.isPending}
                >
                    {SOURCES.map(source => (
                        <option key={source} value={source}>{source.charAt(0).toUpperCase() + source.slice(1)}</option>
                    ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Subscribed Events</label>
            <textarea 
                rows={3} 
                placeholder="payment.failed, order.created..." 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm focus:border-[#00f2ad] outline-none transition-all placeholder:text-gray-700 font-mono resize-none"
                value={formData.subscribedEvent}
                onChange={(e) => setFormData({ ...formData, subscribedEvent: e.target.value })}
                disabled={createEndpoint.isPending}
            />
            <p className="text-[9px] text-gray-600 mt-1 italic">Comma separated list of events</p>
          </div>

          {formData.externalSource !== 'simulator' && (
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Secret (Optional)</label>
              <input 
                  type="text" 
                  placeholder="Leave blank to auto-generate" 
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm focus:border-[#00f2ad] outline-none transition-all placeholder:text-gray-700"
                  value={formData.secret}
                  onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
                  disabled={createEndpoint.isPending}
              />
            </div>
          )}

          {createEndpoint.isError && (
              <div className="p-3 bg-red-950/20 border-l-2 border-red-500 rounded-r-lg">
                  <p className="text-[10px] text-red-200/70">
                    Failed to create endpoint. Please check your inputs.
                  </p>
              </div>
          )}

          <button 
            onClick={handleSubmit}
            disabled={createEndpoint.isPending || !formData.url}
            className="cursor-pointer w-full py-3 bg-[#00f2ad] text-black font-bold rounded-xl hover:bg-[#00d195] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {createEndpoint.isPending ? (
                <>
                    <Loader2 size={16} className="animate-spin" />
                    Creating...
                </>
            ) : "Create Endpoint"}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[#00f2ad] text-xs font-bold mb-4">
             <CheckCircle2 size={14} /> Endpoint created
          </div>

          <div>
            <label className="text-[10px] text-gray-500 font-bold mb-2 block">Inbound URL</label>
            <div className="flex items-center gap-2 bg-[#0a0a0a] border border-white/10 p-2 rounded-lg">
                <span className="text-[10px] font-mono text-gray-400 truncate flex-1">
                    {`POST ${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/inbound/${createdData?.id}`}
                </span>
                <button
                  title="Copy Inbound URL"
                  onClick={() => copyToClipboard(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/inbound/${createdData?.id}`)}
                  className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold text-gray-400 hover:text-white shrink-0"
                >
                    Copy
                </button>
            </div>
          </div>

          <div className="bg-amber-950/20 border-l-2 border-amber-600 p-4 rounded-r-lg">
             <div className="flex items-center gap-2 text-amber-500 text-[10px] font-bold mb-1">
                <AlertTriangle size={12} /> Copy this secret now.
             </div>
             <p className="text-[10px] text-amber-200/50">You won't see it again.</p>
             <div className="mt-3 flex items-center gap-2 bg-[#0a0a0a] p-2 rounded-lg">
                <span className="text-[10px] font-mono text-gray-400 truncate flex-1">
                    {createdData?.secret}
                </span>
                <button
                  title="Copy Secret"
                  onClick={() => createdData?.secret && copyToClipboard(createdData.secret)}
                  className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold text-gray-400 hover:text-white shrink-0"
                >
                    Copy
                </button>
             </div>
          </div>

          <button
            title="Done"
            onClick={() => setStep('form')}
            className="w-full py-3 bg-white/5 text-gray-400 font-bold rounded-xl border border-white/10 hover:bg-white/10 hover:text-white transition-all"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}