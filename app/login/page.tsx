'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DraftingCompass, Eye, EyeClosed, Lock, LogIn, Mail } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative w-full h-screen flex items-center justify-center p-4 overflow-hidden bg-background-dark antialiased">
        <div className="absolute inset-0 bg-gradient-to-br from-[#231018]/90 via-[#231018]/70 to-primary/20 z-10" />
        <Image
          src="/Background_Login.png"
          alt="Cyberpunk skyline"
          fill
          quality={100}
          className="object-cover object-center blur-xs opacity-90"
          priority
        />

      <div className="relative z-20 w-full max-w-[440px] flex flex-col backdrop-blur-xs bg-surface-dark/100 border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-14 w-14 rounded-full bg-white border border-white flex items-center justify-center mb-5 text-primary shadow-[0_0_15px_rgba(244,37,123,0.3)]">
            <DraftingCompass className="text-3xl text-rose-600" />
          </div>
          <h1 className="text-white tracking-tight text-3xl font-bold leading-tight mb-2">Welcome Back!</h1>
          <p className="text-gray-300 text-base font-normal">Ready to tap in? Enter your deets below.</p>
        </div>

        {/* Form Section */}
        <form className="flex flex-col gap-5 w-full" onSubmit={(e) => e.preventDefault()}>
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-200 ml-1">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-placeholder group-focus-within:text-primary transition-colors">
                <Mail className="text-white" /  >
              </div>
              <input 
                type="email" 
                placeholder="user@example.com"
                className="w-full rounded-full text-white bg-input-bg border border-input-border focus:border-primary focus:ring-primary/50 h-14 pl-12 pr-4 placeholder:text-text-placeholder/70 text-base transition-all duration-200 shadow-inner outline-none" 
              />
            </div>
          </div>

          {/* Password Input */}
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
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? <Eye className='text-white' /> : <EyeClosed className='text-white' />}
                </span>
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <a href="#" className="text-white text-sm hover:text-primary hover:underline transition-colors">Forgot Password?</a>
            </div>
          </div>

          {/* Primary Action Button */}
          <button className="w-full bg-rose-600 hover:bg-primary/90 text-white font-bold h-14 rounded-full shadow-[0_4px_20px_rgba(244,37,123,0.4)] hover:shadow-[0_6px_25px_rgba(244,37,123,0.6)] transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-2">
            Slide In <span className="material-symbols-outlined text-lg"><LogIn /></span>
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 py-6">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-sm text-gray-400 font-medium whitespace-nowrap">Or vibe with</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-4">
          <SocialButton icon="google" label="Google" />
          <SocialButton icon="apple" label="Apple" isApple />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            New here? <a href="/signup" className="text-primary font-bold hover:underline ml-1">Join the Fam</a>
          </p>
        </div>
      </div>
    </main>
  );
}

function SocialButton({ icon, label, isApple = false }: { icon: string, label: string, isApple?: boolean }) {
  return (
    <button className="flex items-center justify-center h-12 rounded-full bg-surface-dark border border-white hover:bg-input-bg hover:border-primary/50 transition-all gap-2 group">
      {isApple ? (
        <span className="material-symbols-outlined text-white text-xl">ios</span>
      ) : (
        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z" />
        </svg>
      )}
      <span className="text-white text-sm font-medium">{label}</span>
    </button>
  );
}