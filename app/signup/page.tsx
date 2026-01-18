"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AtSign, DraftingCompass, Eye, EyeClosed, Lock, Mail, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative w-full h-screen flex items-center justify-center p-4 overflow-hidden bg-background-dark antialiased">
      
      {/* Background Image Section */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#231018]/90 via-[#231018]/70 to-primary/20 z-10" />
      <Image
        src="/Background_Login.png"
        alt="Vibrant city skyline at sunset"
        fill
        quality={100}
        className="object-cover object-center blur-xs opacity-90"
        priority
      />

      {/* Glass Card Container */}
      <div className="relative z-20 w-full max-w-[440px] flex flex-col backdrop-blur-xs bg-surface-dark/100 border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-14 w-14 rounded-full bg-white border border-white flex items-center justify-center mb-5 text-primary shadow-[0_0_15px_rgba(244,37,123,0.3)]">
            <DraftingCompass className="text-3xl text-rose-600" />
          </div>
          <h1 className="text-white tracking-tight text-3xl font-bold leading-tight mb-2">
            Create Your Vibe
          </h1>
          <p className="text-gray-300 text-base font-normal">
            Join the fam and start sharing.
          </p>
        </div>

          {/* Form */}
          <form className="flex flex-col gap-5 w-full" onSubmit={(e) => e.preventDefault()}>
            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-200 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-placeholder group-focus-within:text-primary transition-colors">
                  <AtSign className="text-white" />
                </div>
                <input 
                  type="text"
                  placeholder="Enter your username"
                  className="w-full rounded-full text-white bg-input-bg border border-input-border focus:border-primary focus:ring-primary/50 h-14 pl-12 pr-4 placeholder:text-text-placeholder/70 text-base transition-all duration-200 shadow-inner outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-200 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-placeholder group-focus-within:text-primary transition-colors">
                  <Mail className="text-white" />
                </div>
                <input 
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-full text-white bg-input-bg border border-input-border focus:border-primary focus:ring-primary/50 h-14 pl-12 pr-4 placeholder:text-text-placeholder/70 text-base transition-all duration-200 shadow-inner outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-200 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-placeholder group-focus-within:text-primary transition-colors">
                  <Lock className="text-white" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-full text-white bg-input-bg border border-input-border focus:border-primary focus:ring-primary/50 h-14 pl-12 pr-12 placeholder:text-text-placeholder/70 text-base transition-all duration-200 shadow-inner outline-none"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-placeholder hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <Eye className="text-white" /> : <EyeClosed className="text-white" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 px-2 pt-1">
              <input 
                id="terms" 
                type="checkbox" 
                className="w-5 h-5 border border-white/20 rounded bg-gray-900/50 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer mt-0.5"
              />
              <label htmlFor="terms" className="text-sm text-white/60 font-medium leading-tight cursor-pointer select-none">
                I agree to the <Link href="#" className="text-white hover:text-primary hover:underline transition-colors">Terms</Link> & <Link href="#" className="text-white hover:text-primary hover:underline transition-colors">Privacy Policy</Link>
              </label>
            </div>

            <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold h-14 rounded-full shadow-[0_4px_20px_rgba(225,29,72,0.4)] hover:shadow-[0_6px_25px_rgba(225,29,72,0.6)] transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-2">
              Join the Fam <ArrowRight className="text-lg" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 py-6">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-sm text-gray-400 font-medium whitespace-nowrap">Or sign up with</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center h-12 rounded-full bg-surface-dark border border-white hover:bg-input-bg hover:border-primary/50 transition-all gap-2 group">
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z" />
              </svg>
              <span className="text-white text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center h-12 rounded-full bg-surface-dark border border-white hover:bg-input-bg hover:border-primary/50 transition-all gap-2 group">
              <span className="material-symbols-outlined text-white text-xl">ios</span>
              <span className="text-white text-sm font-medium">Apple</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account? <Link href="/login" className="text-primary font-bold hover:underline ml-1">Login</Link>
            </p>
          </div>
      </div>
    </main>
  );
}