import DocSection from '../section';
import CodeSwitcher from '../code-block';
import { CopyButton } from '../copy-button'

const ApiReferenceSection = () => {
    const requestBodyJSON = `{
  "username": "danny",
  "email": "danny@example.com",
  "password": "strong-password"
}`;

    const registerCode = {
        curl: `curl -X POST https://conduit-api.useshipyard.xyz/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "danny",
    "email": "danny@example.com",
    "password": "strong-password"
  }'`,
        javascript: `fetch('https://conduit-api.useshipyard.xyz/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'danny',
    email: 'danny@example.com',
    password: 'strong-password'
  })
});`,
        typescript: `const response = await fetch('https://conduit-api.useshipyard.xyz/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'danny',
    email: 'danny@example.com',
    password: 'strong-password'
  })
});

interface RegisterResponse {
  message: string;
}

const data: RegisterResponse = await response.json();`,
        go: `package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

type RegisterRequest struct {
    Username string \`json:"username"\`
    Email    string \`json:"email"\`
    Password string \`json:"password"\`
}

func main() {
    data := RegisterRequest{
        Username: "danny",
        Email:    "danny@example.com",
        Password: "strong-password",
    }
    jsonData, _ := json.Marshal(data)
    http.Post("https://conduit-api.useshipyard.xyz/api/auth/register", "application/json", bytes.NewBuffer(jsonData))
}`,
        python: `import requests

url = "https://conduit-api.useshipyard.xyz/api/auth/register"
headers = {"Content-Type": "application/json"}
data = {
    "username": "danny",
    "email": "danny@example.com",
    "password": "strong-password"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`,
    };

    return (
        <DocSection title="Representative endpoints" id="api">
            <div className="text-[#00f2ad] text-[10px] font-bold uppercase tracking-widest mb-2">API Reference</div>
            <p className="text-gray-400 mb-12">
                This first documentation view emphasizes structure and clarity: top-level docs plus four representative
                endpoints that demonstrate unauthenticated auth flows, JWT-protected key creation, API-key endpoint management, and webhook ingestion.
            </p>

            {/* Register Endpoint */}
            <div id="register" className="scroll-mt-28">
                <h3 className="text-xl font-bold text-white mb-4">Register</h3>

                {/* Route Badge */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center bg-[#0d0d0f] border border-white/10 rounded-full px-3 py-1 gap-3">
                        <span className="text-[10px] font-black text-[#00f2ad]">POST</span>
                        <span className="text-xs font-mono text-gray-400">/api/auth/register</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded text-gray-500">No Auth</span>
                </div>

                <p className="text-sm text-gray-400 mb-8">
                    Creates a new Conduit user account. This endpoint is used before dashboard access and returns a simple success message once the user record is stored.
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
                                <td className="px-4 py-3 font-mono">Content-Type</td>
                                <td className="px-4 py-3">Yes</td>
                                <td className="px-4 py-3">Must be <code className="bg-white/10 px-1 rounded">application/json</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Request Body Code */}
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Request Body</h4>
                <div className="bg-[#0d0d0f] border border-white/10 rounded-lg p-4 font-mono text-xs text-gray-300 mb-8">
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-500">JSON</span>
                        <CopyButton content={requestBodyJSON} />
                    </div>
                    <pre>{requestBodyJSON}</pre>
                </div>

                {/* Response */}
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Response</h4>
                <div className="bg-[#0d0d0f] border border-white/10 rounded-lg p-4 font-mono text-xs mb-8">
                    <div className="text-gray-500 mb-2">201 CREATED <span className="text-[#00f2ad] ml-2">SUCCESS</span></div>
                    <pre className="text-gray-300">{`{ "message": "user created" }`}</pre>
                </div>

                {/* The Toggleable CURL Example */}
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">CURL Example</h4>
                <CodeSwitcher codeSnippets={registerCode} />
            </div>
        </DocSection>
    );
};

export default ApiReferenceSection;