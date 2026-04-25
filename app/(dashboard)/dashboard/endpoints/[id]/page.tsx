import EndpointDetailHeader from "@/components/dashboard/endpoints/header";
import EndpointOverview from "@/components/dashboard/endpoints/detail/overview";
import CallbackLifecycle from "@/components/dashboard/endpoints/detail/lifecycle-sidebar";
import CallbackAttempts from "@/components/dashboard/endpoints/detail/callback-attempts";
import RetryScheduleSidebar from "@/components/dashboard/endpoints/detail/retry-sidebar";

export default function EndpointDetailPage() {
  return (
    <div className="space-y-6">
      <EndpointDetailHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content: Overview & Detailed Logs */}
        <div className="lg:col-span-8 space-y-6">
          <EndpointOverview />
          <CallbackAttempts />
        </div>

        {/* Sidebar: Health, Retry logic, and Lifecycle */}
        <div className="lg:col-span-4 space-y-6">
          <RetryScheduleSidebar />
          <CallbackLifecycle />
        </div>
      </div>
    </div>
  );
}