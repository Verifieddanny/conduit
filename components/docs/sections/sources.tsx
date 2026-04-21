import DocSection from '../section';
import Image from 'next/image';

const WebhookSourcesSection = () => {
  const providers = [
    { name: "GitHub", header: "x-hub-signature-256", algo: "HMAC-SHA256 (hex)", location: "x-github-event", replay: "No" },
    { name: "Stripe", header: "stripe-signature", algo: "HMAC-SHA256 (hex)", location: "body.type", replay: "Yes (5 min)" },
    { name: "Paystack", header: "x-paystack-signature", algo: "HMAC-SHA512 (hex)", location: "body.event", replay: "No" },
    { name: "Slack", header: "x-slack-signature", algo: "HMAC-SHA256 (hex)", location: "body.event.type / body.type", replay: "Yes (5 min)" },
    { name: "Shopify", header: "x-shopify-hmac-sha256", algo: "HMAC-SHA256 (base64)", location: "x-shopify-topic", replay: "No" },
  ];

  return (
    <DocSection title="Supported providers" id="sources">
      <div className="text-[#00f2ad] text-[10px] font-bold uppercase tracking-widest mb-2">Webhook Sources</div>
      <p className="text-gray-400 mb-8 leading-relaxed">
        Conduit understands the signing models of common provider ecosystems and can infer the sender by 
        signature header presence alone.
      </p>

      {/* Comparison Table */}
      <div className="border border-white/5 rounded-lg overflow-hidden mb-12 bg-[#0d0d0f]">
        <table className="w-full text-[11px] text-left">
          <thead className="bg-white/5 text-gray-500 font-bold uppercase tracking-widest text-[9px]">
            <tr>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Signature Header</th>
              <th className="px-4 py-3">Algorithm</th>
              <th className="px-4 py-3">Event Location</th>
              <th className="px-4 py-3 text-right">Replay Protection</th>
            </tr>
          </thead>
          <tbody className="text-gray-400 divide-y divide-white/5">
            {providers.map((p) => (
              <tr key={p.name} className="hover:bg-white/2 transition-colors">
                <td className="px-4 py-4 text-white font-medium">{p.name}</td>
                <td className="px-4 py-4 font-mono text-gray-500">{p.header}</td>
                <td className="px-4 py-4">{p.algo}</td>
                <td className="px-4 py-4 font-mono">{p.location}</td>
                <td className="px-4 py-4 text-right text-gray-500">{p.replay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Provider Cards */}
      <div className="space-y-4">
        
        {/* GitHub Card */}
        <div className="p-8 rounded-xl bg-[#111113] border border-white/5 relative group">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
               <Image src="/svgs/github.svg" alt="GitHub" width={20} height={22} className='w-auto h-auto' />
              <h4 className="text-lg font-bold text-white">GitHub</h4>
            </div>
            <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-500">
              Paste repository webhook secret into Conduit
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Find the signing secret in your repository or organization webhook settings. Use the generated 
            Conduit inbound URL as the webhook URL and map GitHub events like <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-300">push</code> or <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-300">pull_request</code> into your subscribed event list.
          </p>
        </div>

        {/* Stripe Card */}
        <div className="p-8 rounded-xl bg-[#111113] border border-white/5 relative group">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Image src="/svgs/stripe.svg" alt="Stripe" width={20} height={12} className='w-auto h-auto'  /> 
              <h4 className="text-lg font-bold text-white">Stripe</h4>
            </div>
            <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-500">
              Replay-safe with 5 minute window
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Copy the Stripe signing secret from the Developers → Webhooks section, paste it into the Conduit 
            endpoint secret field, and subscribe to events such as <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-300">payment.failed</code> or <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-300">invoice.paid</code>.
          </p>
        </div>

        {/* Paystack Card */}
        <div className="p-8 rounded-xl bg-[#111113] border border-white/5 relative group">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Image src="/svgs/paystack.svg" alt="Paystack" width={21.33} height={20} className='w-auto h-auto' />
              <h4 className="text-lg font-bold text-white">Paystack</h4>
            </div>
            <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-500">
              HMAC-SHA512 verification
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Use your dashboard secret key-derived signature flow and point Paystack to the Conduit inbound 
            URL. Choose subscribed events that mirror the incoming <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-300 font-mono">body.event</code> names.
          </p>
        </div>

        {/* Slack Card */}
        <div className="p-8 rounded-xl bg-[#111113] border border-white/5 relative group">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Image src="/svgs/slack.svg" alt="Slack" width={20} height={20} className='w-auto h-auto' />
              <h4 className="text-lg font-bold text-white">Slack</h4>
            </div>
            <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-500">
              Replay-safe with 5 minute window
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Configure Slack Events API to POST to your Conduit inbound URL using the signing secret from your 
            app settings. Slack events are identified in <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-300">body.event.type</code> or <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-300">body.type</code> depending on the 
            event type.
          </p>
        </div>

        {/* Shopify Card */}
        <div className="p-8 rounded-xl bg-[#111113] border border-white/5 relative group">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Image src="/svgs/shopify.svg" alt="Shopify" width={20} height={20} className='w-auto h-auto' />
              <h4 className="text-lg font-bold text-white">Shopify</h4>
            </div>
            <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-500">
              Base64 HMAC-SHA256 signature
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Copy your webhook signing secret from the Shopify Admin API credentials and configure your webhook 
            URL to point to Conduit. Map Shopify topics like <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-300">orders/create</code> or <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-300">products/update</code> from the <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-300">x-shopify-topic</code> header.
          </p>
        </div>

      </div>
    </DocSection>
  );
};

export default WebhookSourcesSection;