"use client";
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, UserPlus, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
  const { registerMutation, getErrorMessage } = useAuth();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };
  return (
    <div className="bg-[#111113] border border-white/5 p-8 rounded-2xl shadow-2xl">
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#00f2ad]/10 border border-[#00f2ad]/20 text-[#00f2ad] text-[10px] font-bold mb-6">
        <UserPlus size={12} />
        Create your account
      </div>

      <h1 className="text-3xl font-bold mb-2">Set up your Conduit workspace</h1>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Create an account to register endpoints, inspect delivery logs, generate an API key, and test the pipeline from the dashboard.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Username</label>
          <input 
            type="text" 
            placeholder="johndoe"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm focus:border-[#00f2ad] outline-none transition-colors placeholder:text-gray-700"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            disabled={registerMutation.isPending}
          />
        </div>

        <div>
          <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Email</label>
          <input 
            type="email" 
            placeholder="you@example.com"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm focus:border-[#00f2ad] outline-none transition-colors placeholder:text-gray-700"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={registerMutation.isPending}
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
            placeholder="Create a strong password"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm focus:border-[#00f2ad] outline-none transition-colors placeholder:text-gray-700"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={registerMutation.isPending}
          />
        </div>

        {registerMutation.isError && (
            <div className="p-4 bg-red-950/20 border-l-2 border-red-500 rounded-r-lg flex gap-3 items-start">
                <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-red-200/70 leading-relaxed">
                    {getErrorMessage(registerMutation.error)}
                </p>
            </div>
        )}

        <button 
            type="submit"
            disabled={registerMutation.isPending}
            className="cursor-pointer w-full py-3.5 bg-[#00f2ad] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#00d195] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {registerMutation.isPending ? (
              <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating account...
              </>
          ) : (
              <>
                  Create Account
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
          )}
        </button>
      </form>

      <div className="mt-6 flex justify-between items-center text-[10px] font-bold tracking-tight">
        <span className="text-gray-500">Already have an account? <Link href="/login" className="text-[#00f2ad] hover:underline">Login</Link></span>
      </div>

    </div>
  );
};

export default RegisterForm;