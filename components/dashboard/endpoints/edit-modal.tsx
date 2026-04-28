"use client";
import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Endpoint, useEndpoints } from "@/hooks/use-endpoints";

interface EditModalProps {
  endpoint: Endpoint;
  onClose: () => void;
}

export default function EndpointEditModal({ endpoint, onClose }: EditModalProps) {
  const { updateEndpoint } = useEndpoints();
  const [formData, setFormData] = useState({
    url: endpoint.endpointPath,
    status: endpoint.status,
    subscribedEvent: endpoint.subscribedEvent.join(", "),
    secret: "", // Keep secret empty unless user wants to change it
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    updateEndpoint.mutate({
      id: endpoint.id,
      url: formData.url,
      status: formData.status,
      subscribed_event: formData.subscribedEvent,
      secret: formData.secret || undefined, // Only send if not empty
    }, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
          <div>
            <h3 className="text-xl font-bold text-white">Edit Endpoint</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Configure Destination</p>
          </div>
          <button
            title="close modal"
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Endpoint URL</label>
            <input
              title="url"
              type="text"
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm focus:border-[#00f2ad] outline-none transition-all text-gray-200"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Status</label>
              <div className="flex gap-2">
                {['active', 'inactive'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({ ...formData, status: s as 'active' | 'inactive' })}
                    className={`flex-1 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest border transition-all ${formData.status === s
                        ? "bg-[#00f2ad]/10 border-[#00f2ad]/30 text-[#00f2ad]"
                        : "bg-[#0a0a0a] border-white/5 text-gray-600 hover:border-white/10"
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Secret Key</label>
              <input
                title="secret"
                type="text"
                placeholder="••••••••••••••••"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2.5 text-xs focus:border-[#00f2ad] outline-none transition-all text-gray-200 placeholder:text-gray-800"
                value={formData.secret}
                onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Subscribed Events</label>
            <textarea
              title="subscribe event"
              rows={3}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm focus:border-[#00f2ad] outline-none transition-all text-gray-300 font-mono resize-none"
              value={formData.subscribedEvent}
              onChange={(e) => setFormData({ ...formData, subscribedEvent: e.target.value })}
              required
            />
            <p className="text-[9px] text-gray-600 mt-2 italic font-medium">Separate multiple events with commas</p>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-bold rounded-xl transition-all text-xs uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateEndpoint.isPending}
              className=" cursor-pointer flex-1 py-3 bg-[#00f2ad] hover:bg-[#00d195] text-black font-bold rounded-xl transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              {updateEndpoint.isPending ? <Loader2 size={16} className="animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
