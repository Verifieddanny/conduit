import ApiKeyHeader from "@/components/dashboard/api-key/header";
import KeyRevealCard from "@/components/dashboard/api-key/key-reveal";
import KeyUsageExamples from "@/components/dashboard/api-key/usage-examples";
import KeyStatusSidebar from "@/components/dashboard/api-key/status-sidebar";
import EmptyKeyState from "@/components/dashboard/api-key/empty-state";

export default function ApiKeyPage() {
  // In a real app, you'd check if a key exists to toggle between EmptyKeyState and the dashboard
  const hasKey = true; 

  return (
    <div className="space-y-6">
      <ApiKeyHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {hasKey ? (
            <>
              <KeyRevealCard />
              <KeyUsageExamples />
            </>
          ) : (
            <EmptyKeyState />
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <KeyStatusSidebar />
        </div>
      </div>
    </div>
  );
}