"use client";
import CodeSwitcher from "@/components/docs/code-block";

export default function KeyUsageExamples() {
  const snippets = {
    curl: `curl -X GET https://conduit-api.useshipyard.xyz/api/endpoints \\\n  -H "Authorization: Bearer cdt_your_api_key" \\\n  -H "Content-Type: application/json"`,
    javascript: `const res = await fetch('https://conduit-api.useshipyard.xyz/api/endpoints', {\n  headers: {\n    'Authorization': 'Bearer cdt_your_api_key',\n    'Content-Type': 'application/json'\n  }\n});`,
    python: `import requests\n\nheaders = {\n  'Authorization': 'Bearer cdt_your_api_key',\n  'Content-Type': 'application/json'\n}\n\nresponse = requests.get(url, headers=headers)`,
    go: `import "net/http"\n\nclient := &http.Client{}\nreq, _ := http.NewRequest("GET", "https://conduit-api.useshipyard.xyz/api/endpoints", nil)\nreq.Header.Set("Authorization", "Bearer cdt_your_api_key")\nreq.Header.Set("Content-Type", "application/json")\n\nresp, _ := client.Do(req)\ndefer resp.Body.Close()`
  };

  return (
    <div className="bg-[#111113] border border-white/5 rounded-3xl p-8">
      <div className="mb-6">
        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-2">Usage</span>
        <h3 className="text-xl font-bold text-white mb-2">Using your API key</h3>
        <p className="text-xs text-gray-500">All examples use the same bearer token format. Keep the key server-side.</p>
      </div>
      
      <CodeSwitcher codeSnippets={snippets} tabs={['curl', 'javascript', 'python', 'go']} />
    </div>
  );
}