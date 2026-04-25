import SimulatorHeader from "@/components/dashboard/simulator/header";
import PayloadEditor from "@/components/dashboard/simulator/payload-editor";
import SimulatorResultSidebar from "@/components/dashboard/simulator/result-sidebar";
import EventConstraints from "@/components/dashboard/simulator/event-constraints";

export default function SimulatorPage() {
  return (
    <div className="space-y-6">
      <SimulatorHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Interaction Column */}
        <div className="lg:col-span-8 space-y-6">
          <PayloadEditor />
          <EventConstraints />
        </div>

        {/* Real-time Result Column */}
        <div className="lg:col-span-4 space-y-6">
          <SimulatorResultSidebar />
        </div>
      </div>
    </div>
  );
}