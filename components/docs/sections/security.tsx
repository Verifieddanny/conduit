import { ShieldAlert } from 'lucide-react';
import DocSection from '../section';
import { CopyButton } from '../copy-button';

const SecuritySection = () => {
  const nodeCode = `const crypto = require('crypto')

function verifyConduitSignature(req, secret) {
  const signature = req.headers['x-conduit-signature'];
  const hmac = crypto.createHmac('sha256', secret);
  const expected = 'cdtsig_sha256=' + hmac.update(req.rawBody).digest('hex');

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}`;

  const headers = [
    "X-Conduit-Signature",
    "X-Conduit-Event",
    "X-Conduit-Callback-Id",
    "Content-Type: application/json"
  ];

  return (
    <DocSection title="Verifying Conduit signatures" id="security">
      <div className="text-[#00f2ad] text-[10px] font-bold uppercase tracking-widest mb-2">Security</div>
      <p className="text-gray-400 mb-8 leading-relaxed">
        Every outbound webhook Conduit delivers includes <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-300">X-Conduit-Signature</code>. 
        Compute an HMAC-SHA256 of the raw request body using your endpoint secret and compare it with a timing-safe function.
      </p>

      {/* Header Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {headers.map(h => (
          <span key={h} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-500 font-medium">
            {h}
          </span>
        ))}
      </div>

      {/* Code Block */}
      <div className="rounded-lg overflow-hidden border border-white/10 bg-[#0d0d0f] mb-6">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Node.js</span>
          <CopyButton content={nodeCode} />
        </div>
        <pre className="p-6 text-xs font-mono text-gray-400 overflow-x-auto leading-6">
          <span className="text-blue-400">const</span> crypto = <span className="text-blue-400">require</span>(<span className="text-[#00f2ad]">'crypto'</span>)<br /><br />
          <span className="text-blue-400">function</span> <span className="text-yellow-200">verifyConduitSignature</span>(req, secret) {'{'}<br />
          &nbsp;&nbsp;<span className="text-blue-400">const</span> signature = req.headers[<span className="text-[#00f2ad]">'x-conduit-signature'</span>];<br />
          &nbsp;&nbsp;<span className="text-blue-400">const</span> hmac = crypto.<span className="text-yellow-200">createHmac</span>(<span className="text-[#00f2ad]">'sha256'</span>, secret);<br />
          &nbsp;&nbsp;<span className="text-blue-400">const</span> expected = <span className="text-[#00f2ad]">'cdtsig_sha256='</span> + hmac.<span className="text-yellow-200">update</span>(req.rawBody).<span className="text-yellow-200">digest</span>(<span className="text-[#00f2ad]">'hex'</span>);<br /><br />
          &nbsp;&nbsp;<span className="text-blue-400">return</span> crypto.<span className="text-yellow-200">timingSafeEqual</span>(Buffer.<span className="text-yellow-200">from</span>(signature), Buffer.<span className="text-yellow-200">from</span>(expected));<br />
          {'}'}
        </pre>
      </div>

      {/* Timing Safe Callout */}
      <div className="flex items-center gap-4 p-4 bg-[#1a1608] border-l-4 border-amber-600 rounded-r-lg">
        <ShieldAlert size={20} className="text-amber-500 shrink-0" />
        <p className="text-[12px] text-amber-200/70">
          Always use timing-safe comparison. Never compare signatures with <code className="bg-white/10 px-1 rounded text-amber-100">==</code> or <code className="bg-white/10 px-1 rounded text-amber-100">===</code>.
        </p>
      </div>
    </DocSection>
  );
};

export default SecuritySection;