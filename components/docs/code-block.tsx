"use client";
import { useState, useMemo } from 'react';
import { CopyButton } from './copy-button';

// Default tabs if none are provided
const DEFAULT_LANGS = ['curl', 'javascript', 'python', 'go', 'typescript'];

const CodeSwitcher = ({ 
    codeSnippets, 
    tabs = DEFAULT_LANGS // Added this prop
}: { 
    codeSnippets: Record<string, string>, 
    tabs?: string[] 
}) => {
    // Set the initial language to the first tab provided
    const [lang, setLang] = useState(tabs[0]);

    const highlightCode = (code: string) => {
        if (!code) return "";
        let html = code
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

        return html
            .replace(/(&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="code-string">$1</span>')
            .replace(/\b(const|let|var|function|return|import|export|await|async|type|interface|package|func|def|requests|print|fetch|method|headers|body|JSON|stringify|string)\b/g, 
                '<span class="code-keyword">$1</span>')
            .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span class="code-method">$1</span>')
            .replace(/(\/\/.*|\#.*)/g, '<span class="code-comment">$1</span>')
            .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');
    };

    const renderedCode = useMemo(() => {
        return highlightCode(codeSnippets[lang] || "");
    }, [lang, codeSnippets]);

    return (
        <div className="mt-6 rounded-xl overflow-hidden border border-white/5 bg-[#0d0d0f] shadow-2xl w-full">
            <div className="flex items-center justify-between px-2 bg-[#111113] border-b border-white/5">
                <div className="flex flex-wrap">
                    {tabs.map((l) => (
                        <button
                            type="button"
                            key={l}
                            onClick={() => setLang(l)}
                            className={`relative px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${
                                lang === l ? 'text-[#00f2ad]' : 'text-gray-500 hover:text-gray-300'
                            }`}
                        >
                            {l}
                            {lang === l && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00f2ad] shadow-[0_0_8px_#00f2ad]" />
                            )}
                        </button>
                    ))}
                </div>
                <div className="pr-4 shrink-0">
                    <CopyButton content={codeSnippets[lang]} />
                </div>
            </div>

            <div className="relative group overflow-hidden w-full">
                <pre className="p-6 text-[13px] font-mono text-gray-400 leading-relaxed min-h-30 whitespace-pre-wrap break-all">
                    <code 
                        className="block whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: renderedCode }} 
                    />
                </pre>
            </div>
        </div>
    );
};

export default CodeSwitcher;