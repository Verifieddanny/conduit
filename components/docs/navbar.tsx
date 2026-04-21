"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import MobileSidebar from './mobile-sidebar';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Mobile Toggle Button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <Image src="/svgs/conduit-logo.svg" alt="Logo" width={24} height={24} className='mr-2' />
                    <span className="text-white font-bold tracking-tight text-lg font-plex-kr">Conduit</span>
                </div>
                
                <div className="flex items-center gap-6 font-plex">
                    <a href="/" className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors">Home</a>
                    <button type='button' className="bg-[#00f2ad] text-black px-4 py-1.5 rounded font-bold text-xs">
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Mobile Slide-out Overlay */}
            <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};

export default Navbar;