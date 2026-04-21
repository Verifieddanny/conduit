import { ShieldAlert } from 'lucide-react';
import DocSection from '../section';
import CodeSwitcher from '../code-block';

const SecuritySection = () => {
  const securitySnippets = {
    python: `import hmac
import hashlib

def verify_conduit_signature(raw_body, secret, signature):
    # Compute the HMAC-SHA256 hash
    h = hmac.new(secret.encode(), raw_body.encode(), hashlib.sha256)
    expected = "cdtsig_sha256=" + h.hexdigest()
    
    # Timing-safe comparison
    return hmac.compare_digest(expected, signature)`,
    
    go: `package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "crypto/subtle"
)

func VerifyConduitSignature(rawBody []byte, secret string, signature string) bool {
    h := hmac.New(sha256.New, []byte(secret))
    h.Write(rawBody)
    expected := "cdtsig_sha256=" + hex.EncodeToString(h.Sum(nil))

    // Timing-safe comparison
    return subtle.ConstantTimeCompare([]byte(expected), []byte(signature)) == 1
}`,
    javascript: `const crypto = require('crypto')

function verifyConduitSignature(req, secret) {
  const signature = req.headers['x-conduit-signature'];
  const hmac = crypto.createHmac('sha256', secret);
  const expected = 'cdtsig_sha256=' + hmac.update(req.rawBody).digest('hex');

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}`
  };

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

      {/* Interactive Code Switcher */}
      <div className="mb-6">
        <CodeSwitcher codeSnippets={securitySnippets} tabs={['javascript', 'python', 'go']} />
      </div>

      {/* Timing Safe Callout */}
      <div className="flex items-center gap-4 p-4 bg-[#1a1608] border-l-4 border-amber-600 rounded-r-lg">
        <ShieldAlert size={20} className="text-amber-500 shrink-0" />
        <p className="text-[12px] text-amber-200/70">
          Always use timing-safe comparison. Never compare signatures with <code className="bg-white/10 px-1 rounded text-amber-100">==</code> or <code className="bg-white/10 px-1 rounded text-amber-100">===</code>. This prevents timing attacks where an attacker can brute-force the signature.
        </p>
      </div>
    </DocSection>
  );
};

export default SecuritySection;