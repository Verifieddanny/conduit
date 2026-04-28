"use client";
import EndpointDetailHeader from "@/components/dashboard/endpoints/detail-header";
import EndpointOverview from "@/components/dashboard/endpoints/detail/overview";
import CallbackLifecycle from "@/components/dashboard/endpoints/detail/lifecycle-sidebar";
import CallbackAttempts from "@/components/dashboard/endpoints/detail/callback-attempts";
import RetryScheduleSidebar from "@/components/dashboard/endpoints/detail/retry-sidebar";
import { useParams } from "next/navigation";
import { useEndpoints } from "@/hooks/use-endpoints";
import { useDeliveries } from "@/hooks/use-deliveries";
import { Loader2 } from "lucide-react";

export default function EndpointDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { useEndpoint } = useEndpoints();
  const { data: endpoint, isLoading } = useEndpoint(id);
  const { deliveries } = useDeliveries(id);
  const recentCallback = deliveries && deliveries.length > 0 ? deliveries[0] : null;

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-[#00f2ad]" size={32} />
      </div>
    );
  }

  if (!endpoint) return <div>Endpoint not found</div>;

  return (
    <div className="space-y-6">
      <EndpointDetailHeader endpoint={endpoint} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content: Overview & Detailed Logs */}
        <div className="lg:col-span-8 space-y-6">
          <EndpointOverview endpoint={endpoint} />
          <CallbackAttempts endpointId={id} />
        </div>

        {/* Sidebar: Health, Retry logic, and Lifecycle */}
        <div className="lg:col-span-4 space-y-6">
          <RetryScheduleSidebar endpoint={endpoint} />
          <CallbackLifecycle callback={recentCallback} />
        </div>
      </div>
    </div>
  );
}