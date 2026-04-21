import { Share2, ArrowRight } from 'lucide-react';
import { CopyButton } from '../copy-button';
import CodeSwitcher from '../code-block';

const ReceiveWebhookSection = () => {
    const rawPayloadJSON = `{
  "type": "payment.failed",
  "data": {
    "id": "evt_123",
    "amount": 5000
  }
}`;

    const apiCode = {
        curl: `curl -X POST https://conduit-api.useshipyard.xyz/api/inbound/14109de8-03d6-4267-b0cd-ec8627241ba0 \\
  -H "stripe-signature: t=1492774577,v1=6a9582..." \\
  -d '${rawPayloadJSON}'`,
        javascript: `// Example simulating a Stripe webhook
fetch('https://conduit-api.useshipyard.xyz/api/inbound/:endpointId', {
  method: 'POST',
  headers: {
    'stripe-signature': 't=1492774577,v1=6a9582...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(${rawPayloadJSON})
});`,
        typescript: `interface WebhookPayload {
  type: string;
  data: Record<string, any>;
}

const endpointId = '14109de8-03d6-4267-b0cd-ec8627241ba0';
const payload: WebhookPayload = ${rawPayloadJSON};

const resp = await fetch(\`https://conduit-api.useshipyard.xyz/api/inbound/\${endpointId}\`, {
  method: 'POST',
  headers: {
    'stripe-signature': 't=1492774577,v1=6a9582...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
});`,
        python: `import requests
import json

endpoint_id = '14109de8-03d6-4267-b0cd-ec8627241ba0'
payload = ${rawPayloadJSON}

headers = {
    'stripe-signature': 't=1492774577,v1=6a9582...',
    'Content-Type': 'application/json'
}

response = requests.post(
    f'https://conduit-api.useshipyard.xyz/api/inbound/{endpoint_id}',
    json=payload,
    headers=headers
)
print(response.status_code)`,
        go: `package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

type WebhookPayload struct {
    Type string                 \`json:"type"\`
    Data map[string]interface{} \`json:"data"\`
}

func main() {
    payload := WebhookPayload{
        Type: "payment.failed",
        Data: map[string]interface{}{
            "id":     "evt_123",
            "amount": 5000,
        },
    }

    jsonData, _ := json.Marshal(payload)
    req, _ := http.NewRequest("POST", "https://conduit-api.useshipyard.xyz/api/inbound/14109de8-03d6-4267-b0cd-ec8627241ba0", bytes.NewBuffer(jsonData))
    req.Header.Set("stripe-signature", "t=1492774577,v1=6a9582...")
    req.Header.Set("Content-Type", "application/json")
    http.DefaultClient.Do(req)
}`,
    };

    const detectionSteps = [
        "x-hub-signature-256",
        "stripe-signature",
        "x-paystack-signature",
        "x-slack-signature",
        "x-shopify-hmac-sha256"
    ];

    return (
        <div id="inbound" className="mt-24 scroll-mt-28">
            <h3 className="text-xl font-bold text-white mb-4">Receive Webhook</h3>

            {/* Route Badge */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center bg-[#0d0d0f] border border-white/10 rounded-full px-3 py-1 gap-3">
                    <span className="text-[10px] font-black text-[#00f2ad]">POST</span>
                    <span className="text-xs font-mono text-gray-400">/api/inbound/:endpointId</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-amber-500 font-medium italic">
                    Webhook Signature
                </span>
            </div>

            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                Accepts raw webhook payloads from external services. Conduit auto-detects the source by checking which 
                provider-specific signature header is present, then validates the payload against the stored secret before queuing delivery.
            </p>

            {/* Headers Table */}
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Headers</h4>
            <div className="border border-white/5 rounded-lg overflow-hidden mb-8">
                <table className="w-full text-xs text-left">
                    <thead className="bg-white/5 text-gray-500 font-bold uppercase tracking-tighter text-[10px]">
                        <tr>
                            <th className="px-4 py-2">Header</th>
                            <th className="px-4 py-2">Required</th>
                            <th className="px-4 py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-400 divide-y divide-white/5">
                        {[
                            { h: "x-hub-signature-256", d: "GitHub signature header." },
                            { h: "stripe-signature", d: "Stripe signature header." },
                            { h: "x-paystack-signature", d: "Paystack signature header." },
                            { h: "x-slack-signature", d: "Slack signature header." },
                            { h: "x-shopify-hmac-sha256", d: "Shopify signature header." },
                        ].map((item) => (
                            <tr key={item.h}>
                                <td className="px-4 py-3 font-mono">{item.h}</td>
                                <td className="px-4 py-3 text-gray-500">Conditional</td>
                                <td className="px-4 py-3">{item.d}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Path Parameters Table */}
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Path Parameters</h4>
            <div className="border border-white/5 rounded-lg overflow-hidden mb-8">
                <table className="w-full text-xs text-left">
                    <thead className="bg-white/5 text-gray-500 font-bold uppercase tracking-tighter text-[10px]">
                        <tr>
                            <th className="px-4 py-2">Parameter</th>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-400 divide-y divide-white/5">
                        <tr>
                            <td className="px-4 py-3 font-mono text-[#00f2ad]">endpointId</td>
                            <td className="px-4 py-3 text-gray-500 italic">uuid</td>
                            <td className="px-4 py-3">The Conduit endpoint UUID receiving the incoming webhook.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Request Body */}
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Request Body</h4>
            <div className="bg-[#0d0d0f] border border-white/10 rounded-lg p-4 font-mono text-xs text-gray-300 mb-8">
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                    <span className="text-gray-500 text-[10px] font-bold uppercase">Raw Payload</span>
                    <span className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">Provider Body</span>
                </div>
                <pre className="overflow-x-auto">{rawPayloadJSON}</pre>
            </div>

            {/* Response Section */}
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Response</h4>
            <div className="bg-[#0d0d0f] border border-white/10 rounded-lg p-4 font-mono text-xs mb-8">
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                    <div className="text-gray-500">202 ACCEPTED <span className="text-[#00f2ad] ml-2 text-[10px] font-black uppercase">Success</span></div>
                </div>
                <pre className="text-[#00f2ad]">"Accepted"</pre>
                <div className="mt-4 pt-4 border-t border-white/5 text-gray-500 space-y-1">
                    <div>400 Bad Request — &#123; "message": "unsupported source" &#125;</div>
                    <div>401 Unauthorized — &#123; "message": "invalid signature" &#125;</div>
                    <div>404 Not Found — &#123; "message": "endpoint not found" &#125;</div>
                </div>
            </div>

            {/* Detection Order Callout */}
            <div className="mt-8 mb-12 p-4 bg-[#00f2ad]/5 border border-[#00f2ad]/10 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                    <Share2 size={16} className="text-[#00f2ad]" />
                    <span className="text-[11px] text-gray-300 font-bold uppercase tracking-tight">Source detection order:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {detectionSteps.map((step, i) => (
                        <div key={step} className="flex items-center gap-2">
                            <code className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-gray-400 font-mono">
                                {step}
                            </code>
                            {i < detectionSteps.length - 1 && <ArrowRight size={12} className="text-gray-700" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Code Example */}
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Code Example</h4>
            <CodeSwitcher codeSnippets={apiCode} />
        </div>
    );
};

export default ReceiveWebhookSection;