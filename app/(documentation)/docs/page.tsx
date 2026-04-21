import DocsSidebar from "@/components/docs/sidebar";
import GettingStartedSection from "@/components/docs/sections/getting-started";
import QuickStartSection from "@/components/docs/sections/quickstart";
import AuthSection from "@/components/docs/sections/auth";
import ApiReferenceSection from "@/components/docs/sections/api-reference";
import ApiKeySection from "@/components/docs/sections/api-key";
import CreateEndpointSection from "@/components/docs/sections/create-endpoint";
import ReceiveWebhookSection from "@/components/docs/sections/receive-webhook";
import WebhookSourcesSection from "@/components/docs/sections/sources";
import DeliverySection from "@/components/docs/sections/delivery";
import SecuritySection from "@/components/docs/sections/security";
import ArchitectureSection from "@/components/docs/sections/architecture";

const DocsPage = () => {
  return (
    <div className="flex max-w-350 mx-auto bg-[#0a0a0a]">
      <DocsSidebar />

      <main className="flex-1 px-8 lg:px-16 py-12 mt-16">


        {/* Modular Sections */}
        <GettingStartedSection />
        <QuickStartSection />
        <AuthSection />
        <ApiReferenceSection />
        <ApiKeySection />
        <CreateEndpointSection />
        <ReceiveWebhookSection />
        <div className="my-20" />
        <WebhookSourcesSection />
        <DeliverySection />
        <SecuritySection />
        <ArchitectureSection />
      </main>
    </div>
  );
};

export default DocsPage;