"use client";
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export const CopyButton = ({ content }: { content: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="text-gray-500 hover:text-white uppercase text-[10px] font-bold flex items-center gap-1.5 transition-colors"
        >
            {copied ? (
                <>
                    <Check size={12} className="text-[#00f2ad]" />
                    <span className="text-[#00f2ad]">Copied</span>
                </>
            ) : (
                <>
                    <Copy size={12} />
                    <span>Copy</span>
                </>
            )}
        </button>
    );
};