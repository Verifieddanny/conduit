import RegisterForm from "@/components/auth/register-form";
import MarketingFeature from "@/components/auth/marketing-feature";
import Navbar from "@/components/docs/navbar";

export default function RegisterPage() {
    return (
        <>

            <main className="pt-24 pb-12 px-6 flex items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* Left Side: Form Area */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <RegisterForm />
                    </div>

                    {/* Right Side: Marketing/Value Prop Area */}
                    <div className="lg:col-span-7 hidden lg:block">
                        <MarketingFeature />
                    </div>
                </div>
            </main>

            {/* Subtle Footer */}
            <footer className="fixed bottom-0 w-full p-6 flex justify-between items-center text-[10px] text-gray-600 font-mono tracking-widest border-t border-white/5 bg-[#0a0a0a]">
                <span>PUBLIC ROUTE • NO AUTH REQUIRED</span>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-white">DOCS</a>
                    <a href="#" className="hover:text-white">LOGIN</a>
                </div>
            </footer>
        </>

    );
}