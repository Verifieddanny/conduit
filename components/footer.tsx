import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="font-plex w-full bg-[#0a0a0a] border-t border-white/5 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

                {/* Brand & Attribution */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Image src="/svgs/conduit-logo.svg"
                            alt="Conduit Logo"
                            width={24}
                            height={24}
                            className='inline-block mr-2'
                        />
                        <span className="text-white font-bold tracking-tight font-plex-kr">Conduit</span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">
                        Built by <a href='https://x.com/dannyclassi_c' className="text-gray-400 hover:text-white cursor-pointer transition-colors">DevDanny</a>
                    </p>
                </div>

                {/* Links */}
                <nav className="flex flex-wrap items-center gap-x-8 gap-y-4">
                    <a
                        href="https://github.com/Verifieddanny/conduit"
                        className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/devdanny0"
                        className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="httops://x.com/dannyclassi_c"
                        className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
                    >
                        X
                    </a>
                </nav>

            </div>
        </footer>
    );
};

export default Footer;