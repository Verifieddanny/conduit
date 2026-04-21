import { AlertTriangle } from 'lucide-react';
import DocSection from '../section';

const AuthSection = () => {
  const badges = [
    "JWT → dashboard routes",
    "API key → REST API access",
    "Webhook signature → inbound verification"
  ];

  return (
    <DocSection title="JWT and API keys" id="auth">
      <div className="text-[#00f2ad] text-[10px] font-bold uppercase tracking-widest mb-2">
        Authentication
      </div>
      
      <p className="text-gray-300">
        Conduit uses two auth models. JWTs power the dashboard experience and user session. 
        API keys are for programmatic access to endpoint management, delivery logs, and simulator endpoints.
      </p>

      {/* Pills/Badges */}
      <div className="flex flex-wrap gap-3 mt-6">
        {badges.map((text) => (
          <span 
            key={text} 
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-400 font-medium"
          >
            {text}
          </span>
        ))}
      </div>

      {/* Warning Callout */}
      <div className="mt-8 flex items-start gap-4 p-4 bg-[#1a1608] border-l-4 border-amber-500 rounded-r-lg">
        <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[13px] text-amber-200/70 leading-relaxed">
          Generated API keys are shown once. Store them securely. Regenerating a key 
          invalidates the existing one immediately.
        </p>
      </div>
    </DocSection>
  );
};

export default AuthSection;