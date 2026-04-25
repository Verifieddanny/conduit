import StatsGrid from "@/components/dashboard/stats-grid";
import RecentDeliveries from "@/components/dashboard/recent-deliveries";
import RelayStream from "@/components/dashboard/relay-stream";
import ReliabilityCard from "@/components/dashboard/reliability-card";
import PipelineHealth from "@/components/dashboard/pipeline-health";
import QuickLinks from "@/components/dashboard/quick-links";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-6">
          <StatsGrid />
          <RecentDeliveries />
        </div>

        {/* Sidebar Widgets Column */}
        <div className="lg:col-span-4 space-y-6">
          <ReliabilityCard />
          <PipelineHealth />
          <QuickLinks />
          <RelayStream />
        </div>
      </div>
    </div>
  );
}