import Image from "next/image"
import Link from "next/link"


function Navbar() {
    return (
        <nav className='w-full sticky top-0 bg-background/70 backdrop-blur-3xl z-50 max-w-325 mx-auto md:px-8 md:py-4.5 px-4 py-3 flex items-center justify-between font-mono '>
            <Link href="/" className="flex items-center gap-x-0.5">
                <Image src="/svgs/conduit-logo.svg"
                    alt="Conduit Logo"
                    width={24}
                    height={24}
                    className='inline-block mr-2'
                />
                <p className='font-plex-kr font-bold text-[1.125rem] text-white '>Conduit</p>
            </Link>

            <div className='font-plex flex items-center gap-x-6'>
                <Link href="/docs" className="text-[#9CA3AF] text-sm ">Docs</Link>
                <Link href="https://github.com/Verifieddanny/conduit" target="_blank" className="text-[#9CA3AF] text-sm ">GitHub</Link>
                <Link href="/login" className="text-[#9CA3AF] text-sm ">Login</Link>
                <Link href="/register"
                    type='button'
                    className='text-[#041012] text-sm ml-4 bg-[#00D4AA] px-4 py-2 rounded-sm font-semibold cursor-pointer hover:bg-[#00B894] transition-colors duration-200'
                >
                    Get started
                </Link>
            </div>
        </nav>

    )
}

export default Navbar