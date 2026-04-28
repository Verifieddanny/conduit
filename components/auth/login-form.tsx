"use client";
import { useAuth } from "@/hooks/use-auth";
import { LogIn, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
    const { loginMutation, getErrorMessage } = useAuth();
    const [formData, setFormData] = useState({ username: 'Tester', password: '12345678798' });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginMutation.mutate(formData);
    };
    return (
        <div className="bg-[#111113] border border-white/5 p-8 rounded-2xl shadow-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#00f2ad]/10 border border-[#00f2ad]/20 text-[#00f2ad] text-[10px] font-bold mb-6">
                <LogIn size={12} />
                Welcome back
            </div>

            <h1 className="text-3xl font-bold mb-2">Sign in to your dashboard</h1>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Use your Conduit account to access endpoints, delivery logs, the simulator, and your API key management flow.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="johndoe"
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm focus:border-[#00f2ad] outline-none transition-colors"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        disabled={loginMutation.isPending}
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">Password</label>
                        <button
                            type="button"
                            className="cursor-pointer text-[10px] text-gray-600 hover:text-white uppercase font-bold"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm focus:border-[#00f2ad] outline-none transition-colors placeholder:text-gray-700"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        disabled={loginMutation.isPending}
                    />
                </div>

                {loginMutation.isError && (
                    <div className="p-4 bg-red-950/20 border-l-2 border-red-500 rounded-r-lg flex gap-3 items-start">
                        <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-red-200/70 leading-relaxed">
                            {getErrorMessage(loginMutation.error)}
                        </p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="cursor-pointer w-full py-3.5 bg-[#00f2ad] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#00d195] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loginMutation.isPending ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        <>
                            Login
                            <LogIn size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 flex justify-between items-center text-[10px] font-bold">
                <span className="text-gray-500">Don't have an account? <Link href="/register" className="text-[#00f2ad] hover:underline">Register</Link></span>
            </div>

        </div>
    );
};

export default LoginForm;