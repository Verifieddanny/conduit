"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Book, LogIn } from "lucide-react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* --- Main Navbar (Desktop + Mobile Header) --- */}
            <nav className="w-full sticky top-0 bg-background/70 backdrop-blur-3xl z-50 max-w-325 mx-auto md:px-8 px-6 py-4 flex items-center justify-between font-mono">
                <Link href="/" className="flex items-center gap-x-2">
                    <Image
                        src="/svgs/conduit-logo.svg"
                        alt="Conduit Logo"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                    />
                    <p className="font-plex-kr font-bold text-lg text-white tracking-tight">
                        Conduit
                    </p>
                </Link>

                {/* Desktop Links - Hidden on Mobile */}
                <div className="hidden md:flex font-plex items-center gap-x-8">
                    <Link href="/docs" className="text-[#9CA3AF] text-sm hover:text-white transition-colors">Docs</Link>
                    <Link href="https://github.com/Verifieddanny/conduit" target="_blank" className="text-[#9CA3AF] text-sm hover:text-white transition-colors">GitHub</Link>
                    <Link href="/login" className="text-[#9CA3AF] text-sm hover:text-white transition-colors">Login</Link>
                    <Link
                        href="/register"
                        className="text-[#041012] text-sm ml-4 bg-[#00D4AA] px-5 py-2 rounded-full font-bold hover:bg-[#00B894] transition-all shadow-[0_0_15px_rgba(0,212,170,0.3)]"
                    >
                        Get started
                    </Link>
                </div>

                {/* Mobile Menu Toggle (Minimalist) */}
                <button
                    type="button"
                    className="md:hidden p-2 bg-white/5 rounded-full border border-white/10 text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {/* --- Mobile Floating Dock --- */}
            <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden ${isOpen ? "w-[90%] opacity-100" : "w-0 opacity-0 pointer-events-none translate-y-10"
                }`}>
                <div className="bg-[#151518]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-2xl flex flex-wrap justify-center gap-4">
                    <Link href="/docs" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-1 min-w-17.5">
                        <div className="p-2 bg-white/5 rounded-xl"><Book size={18} className="text-[#ffffff]" /></div>
                        <span className="text-[10px] font-plex text-[#9CA3AF]">Docs</span>
                    </Link>
                    <Link href="https://github.com/Verifieddanny/conduit" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-1 min-w-17.5">
                        <div className="p-2 bg-white/5 rounded-xl">
                            <Image src="/svgs/github.svg" alt="github" width={18} height={18} />
                        </div>
                        <span className="text-[10px] font-plex text-[#9CA3AF]">GitHub</span>
                    </Link>
                    <Link href="/login" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-1 min-w-17.5">
                        <div className="p-2 bg-white/5 rounded-xl"><LogIn size={18} className="text-[#ffffff]" /></div>
                        <span className="text-[10px] font-plex text-[#9CA3AF]">Login</span>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-1 min-w-17.5">
                        <div className="p-2 bg-[#00D4AA]/20 rounded-xl border border-[#00D4AA]/30">

                            <Image src="/svgs/conduit-logo.svg" alt="conduit" width={18} height={18} />
                        </div>
                        <span className="text-[10px] font-plex text-[#00D4AA] font-bold">Register</span>
                    </Link>
                </div>
            </div>

            {/* Background Overlay (Dimming effect) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-90 md:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}

export default Navbar;