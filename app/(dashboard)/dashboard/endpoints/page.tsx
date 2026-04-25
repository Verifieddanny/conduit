import EndpointsHeader from "@/components/dashboard/endpoints/header";
import EndpointsStats from "@/components/dashboard/endpoints/stats";
import RegisteredEndpointsList from "@/components/dashboard/endpoints/list";
import CreateEndpointSidebar from "@/components/dashboard/endpoints/create-sidebar";

export default function EndpointsPage() {
  return (
    <div className="space-y-6">
      <EndpointsHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main List Column */}
        <div className="lg:col-span-8 space-y-6">
          <EndpointsStats />
          <RegisteredEndpointsList />
        </div>

        {/* Create Flow Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <CreateEndpointSidebar />
        </div>
      </div>
    </div>
  );
}