"use client";
import { Key, Plus, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function EmptyKeyState({ onGenerated }: { onGenerated: (key: string) => void }) {
  const { apiKeyMutation } = useAuth();

  const handleGenerate = () => {
    apiKeyMutation.mutate(undefined, {
      onSuccess: (data) => {
        onGenerated(data.api_key);
      }
    });
  };

  return (
    <div className="bg-[#111113] border border-white/5 rounded-3xl p-12 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 mb-8">
        <Key size={32} />
      </div>
      
      <div className="max-w-sm space-y-4 mb-8">
        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Initial State</span>
        <h3 className="text-2xl font-bold text-white">No API key generated</h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          You'll need an API key to authenticate programmatic requests to Conduit, including simulation and endpoint management.
        </p>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl w-full max-w-md">
        <h4 className="text-sm font-bold text-gray-300 mb-2">You haven't generated an API key yet.</h4>
        <p className="text-[11px] text-gray-600 mb-8">
            Generate your API key to authenticate programmatic requests to Conduit.
        </p>
        <button 
          onClick={handleGenerate}
          disabled={apiKeyMutation.isPending}
          className="w-full py-4 bg-[#00f2ad] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#00d195] transition-all group disabled:opacity-50"
        >
          {apiKeyMutation.isPending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              <Plus size={18} />
              Generate API Key
            </>
          )}
        </button>
        {apiKeyMutation.isError && (
          <p className="text-red-500 text-[10px] mt-4 font-bold uppercase tracking-widest text-center">
            Failed to generate API key
          </p>
        )}
      </div>
    </div>
  );
}