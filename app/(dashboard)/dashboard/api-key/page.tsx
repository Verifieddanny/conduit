"use client";
import ApiKeyHeader from "@/components/dashboard/api-key/header";
import KeyRevealCard from "@/components/dashboard/api-key/key-reveal";
import KeyUsageExamples from "@/components/dashboard/api-key/usage-examples";
import KeyStatusSidebar from "@/components/dashboard/api-key/status-sidebar";
import EmptyKeyState from "@/components/dashboard/api-key/empty-state";
import { useState } from "react";
import { useAuthStore } from "@/store/use-auth-store";
import { RefreshCw, ShieldCheck, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function ApiKeyPage() {
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const { hasApiKey } = useAuthStore();
  const { apiKeyMutation } = useAuth();

  const handleRegenerate = () => {
    if (confirm("Regenerating will invalidate your current API key. Are you sure?")) {
      apiKeyMutation.mutate(undefined, {
        onSuccess: (data: any) => {
          setGeneratedKey(data.apiKey || data.api_key);
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <ApiKeyHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {generatedKey ? (
            <>
              <KeyRevealCard apiKey={generatedKey} onDone={() => setGeneratedKey(null)} />
              <KeyUsageExamples />
            </>
          ) : hasApiKey ? (
            <div className="bg-[#111113] border border-white/5 rounded-3xl p-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#00f2ad]/5 border border-[#00f2ad]/10 flex items-center justify-center text-[#00f2ad] mb-8">
                    <ShieldCheck size={32} />
                </div>
                
                <div className="max-w-sm space-y-4 mb-12">
                    <span className="text-[10px] font-bold text-[#00f2ad] uppercase tracking-widest">Active Credentials</span>
                    <h3 className="text-2xl font-bold text-white">API key is active</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                    You have an active API key. For security, we don't display your full key here. If you've lost it, you can regenerate a new one.
                    </p>
                </div>

                <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl w-full max-w-md">
                    <button 
                        onClick={handleRegenerate}
                        disabled={apiKeyMutation.isPending}
                        className="w-full py-4 bg-white/5 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all group border border-white/10"
                    >
                        {apiKeyMutation.isPending ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <>
                                <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                                Regenerate API Key
                            </>
                        )}
                    </button>
                    <p className="text-[9px] text-gray-600 mt-4 italic">
                        Warning: This will immediately revoke your existing key.
                    </p>
                </div>
                
                <div className="w-full pt-12">
                    <KeyUsageExamples />
                </div>
            </div>
          ) : (
            <EmptyKeyState onGenerated={(key) => setGeneratedKey(key)} />
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <KeyStatusSidebar />
        </div>
      </div>
    </div>
  );
}