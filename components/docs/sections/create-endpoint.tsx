import { Key } from 'lucide-react';
import { CopyButton } from '../copy-button';
import CodeSwitcher from '../code-block';

const CreateEndpointSection = () => {
    const requestJSON = `{
  "url": "https://your-app.com/webhooks",
  "subscribed_event": "payment.failed,order.created",
  "external_source": "stripe",
  "secret": "whsec_your_stripe_webhook_secret"
}`;

    const responseJSON = `{
  "endpoint": {
    "id": "14109de8-03d6-4267-b0cd-ec8627241ba0",
    "endpointPath": "https://your-app.com/webhooks",
    "status": "active",
    "subscribedEvent": ["payment.failed", "order.created"],
    "externalSource": "stripe",
    "secret": "whsec_your_stripe_webhook_secret"
  }
}`;

    const apiCode = {
        curl: `curl -X POST https://conduit-api.useshipyard.xyz/api/endpoints \\
  -H "Authorization: Bearer cdt_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '${requestJSON}'`,
        javascript: `fetch('https://conduit-api.useshipyard.xyz/api/endpoints', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer cdt_your_api_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(${requestJSON})
});`,
        typescript: `interface EndpointReq {
  url: string;
  subscribed_event: string;
  external_source: string;
  secret?: string;
}

const resp = await fetch('https://conduit-api.useshipyard.xyz/api/endpoints', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer cdt_your_api_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload as EndpointReq)
});`,
        python: `import requests
import json

url = "https://conduit-api.useshipyard.xyz/api/endpoints"
headers = {
    "Authorization": "Bearer cdt_your_api_key",
    "Content-Type": "application/json"
}
data = {
    "url": "https://your-app.com/webhooks",
    "subscribed_event": "payment.failed,order.created",
    "external_source": "stripe",
    "secret": "whsec_your_stripe_webhook_secret"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`,
        go: `package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

type EndpointReq struct {
    URL             string \`json:"url"\`
    SubscribedEvent string \`json:"subscribed_event"\`
    ExternalSource  string \`json:"external_source"\`
    Secret          string \`json:"secret,omitempty"\`
}

func main() {
    data := EndpointReq{
        URL:             "https://your-app.com/webhooks",
        SubscribedEvent: "payment.failed,order.created",
        ExternalSource:  "stripe",
        Secret:          "whsec_your_stripe_webhook_secret",
    }
    
    jsonData, _ := json.Marshal(data)
    req, _ := http.NewRequest("POST", "https://conduit-api.useshipyard.xyz/api/endpoints", bytes.NewBuffer(jsonData))
    req.Header.Set("Authorization", "Bearer cdt_your_api_key")
    req.Header.Set("Content-Type", "application/json")
    http.DefaultClient.Do(req)
}`,
    };

    return (
        <div id="create-endpoint" className="mt-24 scroll-mt-28">
            <h3 className="text-xl font-bold text-white mb-4">Create Endpoint</h3>

            {/* Route Badge */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center bg-[#0d0d0f] border border-white/10 rounded-full px-3 py-1 gap-3">
                    <span className="text-[10px] font-black text-[#00f2ad]">POST</span>
                    <span className="text-xs font-mono text-gray-400">/api/endpoints</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-[#00f2ad]/10 border border-[#00f2ad]/20 rounded text-[#00f2ad] font-medium">
                    API Key Required
                </span>
            </div>

            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                Creates a new webhook destination for the authenticated user. You provide the destination URL, a source 
                label, subscribed events, and optionally a webhook secret.
            </p>

            {/* Headers Table */}
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Headers</h4>
            <div className="border border-white/5 rounded-lg overflow-hidden mb-8">
                <table className="w-full text-xs text-left">
                    <thead className="bg-white/5 text-gray-500 font-bold uppercase tracking-tighter">
                        <tr>
                            <th className="px-4 py-2">Header</th>
                            <th className="px-4 py-2">Required</th>
                            <th className="px-4 py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-400 divide-y divide-white/5">
                        <tr>
                            <td className="px-4 py-3 font-mono">Authorization</td>
                            <td className="px-4 py-3">Yes</td>
                            <td className="px-4 py-3">Bearer token using a <code className="bg-white/10 px-1 rounded">cdt_</code> API key.</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-mono">Content-Type</td>
                            <td className="px-4 py-3">Yes</td>
                            <td className="px-4 py-3">Must be <code className="bg-white/10 px-1 rounded">application/json</code>.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Request Body Area */}
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Request Body</h4>
            <div className="bg-[#0d0d0f] border border-white/10 rounded-lg p-4 font-mono text-xs text-gray-300 mb-4">
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                    <span className="text-gray-500">JSON</span>
                    <CopyButton content={requestJSON} />
                </div>
                <pre className="overflow-x-auto">{requestJSON}</pre>
            </div>

            {/* Field Definitions Table */}
            <div className="border border-white/5 rounded-lg overflow-hidden mb-8">
                <table className="w-full text-xs text-left">
                    <thead className="bg-white/5 text-gray-500 font-bold uppercase tracking-tighter text-[10px]">
                        <tr>
                            <th className="px-4 py-2">Field</th>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Required</th>
                            <th className="px-4 py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-400 divide-y divide-white/5">
                        <tr>
                            <td className="px-4 py-3 font-mono">url</td>
                            <td className="px-4 py-3 text-gray-500 italic">string</td>
                            <td className="px-4 py-3">Yes</td>
                            <td className="px-4 py-3">The URL to deliver webhooks to.</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-mono">subscribed_event</td>
                            <td className="px-4 py-3 text-gray-500 italic">string</td>
                            <td className="px-4 py-3">Yes</td>
                            <td className="px-4 py-3">Comma-separated event types.</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-mono">external_source</td>
                            <td className="px-4 py-3 text-gray-500 italic">string</td>
                            <td className="px-4 py-3">Yes</td>
                            <td className="px-4 py-3 flex gap-1.5 flex-wrap">
                                Label such as <code className="bg-white/5 px-1 rounded">github</code>, <code className="bg-white/5 px-1 rounded">stripe</code>, or <code className="bg-white/5 px-1 rounded">simulator</code>.
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-mono">secret</td>
                            <td className="px-4 py-3 text-gray-500 italic">string</td>
                            <td className="px-4 py-3">No</td>
                            <td className="px-4 py-3">Webhook secret. Auto-generated if omitted.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Response Section */}
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Response</h4>
            <div className="bg-[#0d0d0f] border border-white/10 rounded-lg p-4 font-mono text-xs mb-4">
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                    <div className="text-gray-500">201 CREATED <span className="text-[#00f2ad] ml-2 text-[10px] font-black uppercase">Success</span></div>
                    <CopyButton content={responseJSON} />
                </div>
                <pre className="text-gray-300">{responseJSON}</pre>
                <div className="mt-4 pt-4 border-t border-white/5 text-gray-500 space-y-1">
                    <div>401 Unauthorized — &#123; "message": "No API KEY" &#125;</div>
                    <div>422 Unprocessable Entity — &#123; "message": "Invalid inputs" &#125;</div>
                </div>
            </div>

            {/* Secret Hint Callout */}
            <div className="mt-8 mb-12 flex items-center gap-3 px-4 py-3 bg-[#00f2ad]/5 border border-[#00f2ad]/10 rounded-lg">
                <Key size={16} className="text-[#00f2ad] shrink-0" />
                <p className="text-[11px] text-gray-400">
                    If <code className="bg-white/10 px-1 rounded text-gray-300 mx-0.5">secret</code> is omitted, a 32-byte random secret is generated automatically and returned once. Store it securely for downstream signature verification.
                </p>
            </div>

            {/* CURL Example */}
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">CURL Example</h4>
            <CodeSwitcher codeSnippets={apiCode} />
        </div>
    );
};

export default CreateEndpointSection;