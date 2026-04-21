import { ShieldCheck } from 'lucide-react';
import { CopyButton } from '../copy-button';
import CodeSwitcher from '../code-block';

const ApiKeySection = () => {
    const apiKeyResponse = `{
  "apiKey": "cdt_xxxxxxxxxxxxx"
}`;

    const apiKeyCode = {
        curl: `curl -X PUT https://conduit-api.useshipyard.xyz/api/auth/api-key \\
  -H "Authorization: Bearer eyJ..."`,
        javascript: `fetch('https://conduit-api.useshipyard.xyz/api/auth/api-key', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer eyJ...'
  }
});`,
        typescript: `const resp = await fetch('https://conduit-api.useshipyard.xyz/api/auth/api-key', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer eyJ...'
  }
});

const { apiKey } = await resp.json();`,
        python: `import requests

url = "https://conduit-api.useshipyard.xyz/api/auth/api-key"
headers = {"Authorization": "Bearer eyJ..."}

response = requests.put(url, headers=headers)
print(response.json())`,
        go: `package main

import (
    "net/http"
)

func main() {
    req, _ := http.NewRequest("PUT", "https://conduit-api.useshipyard.xyz/api/auth/api-key", nil)
    req.Header.Set("Authorization", "Bearer eyJ...")
    http.DefaultClient.Do(req)
}`,
    };

    return (
        <div id="update-key" className="mt-24 scroll-mt-28">
            <h3 className="text-xl font-bold text-white mb-4">Generate API Key</h3>

            {/* Route Badge */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center bg-[#0d0d0f] border border-white/10 rounded-full px-3 py-1 gap-3">
                    <span className="text-[10px] font-black text-amber-500">PUT</span>
                    <span className="text-xs font-mono text-gray-400">/api/auth/api-key</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 font-medium italic">
                    JWT Required
                </span>
            </div>

            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                Generates or replaces the active API key for the authenticated user. The key is returned once and should
                be stored securely by the client.
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
                            <td className="px-4 py-3 text-white/70">Yes</td>
                            <td className="px-4 py-3">Bearer JWT received after login.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Success Callout Bar */}
            <div className="mb-8 flex items-center gap-3 px-4 py-3 bg-[#00f2ad]/5 border border-[#00f2ad]/20 rounded-lg">
                <ShieldCheck size={18} className="text-[#00f2ad] shrink-0" />
                <p className="text-[11px] text-[#00f2ad]/90 font-medium">
                    The API key is shown once. Calling this endpoint again replaces the existing key.
                </p>
            </div>

            {/* Response Section */}
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Response</h4>
            <div className="bg-[#0d0d0f] border border-white/10 rounded-lg p-4 font-mono text-xs mb-8">
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                    <div className="text-gray-500">200 OK <span className="text-[#00f2ad] ml-2 text-[10px] font-black uppercase">Success</span></div>
                    <CopyButton content={apiKeyResponse} />
                </div>
                <pre className="text-gray-300">
                    {apiKeyResponse}
                </pre>
                <div className="mt-4 pt-4 border-t border-white/5 text-gray-500">
                    401 Unauthorized — &#123; "message": "not authenticated" &#125;
                </div>
            </div>

            {/* CURL Example */}
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">CURL Example</h4>
            <CodeSwitcher codeSnippets={apiKeyCode} />
        </div>
    );
};

export default ApiKeySection;