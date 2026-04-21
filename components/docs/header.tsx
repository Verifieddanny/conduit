import React from 'react'

function Header() {
    return (
        <header className="border-b border-white/5 pb-12 mt-20 max-w-350 mx-auto">
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-[#00f2ad]/10 border border-[#00f2ad]/20 text-[#00f2ad] text-[10px] font-bold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ad] animate-pulse" />
                Public documentation
            </div>
            <h1 className="text-5xl font-extrabold text-white mb-6">Documentation</h1>
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                Stripe-like, airy docs for building against Conduit. Learn the auth model, create endpoints, receive
                inbound events, inspect delivery logs, and verify every signed payload.
            </p>
        </header>
    )
}

export default Header