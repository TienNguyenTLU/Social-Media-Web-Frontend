'use client';
import { useState, useEffect } from 'react';
import { DraftingCompass } from 'lucide-react';
export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/60 to-transparent transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <DraftingCompass className="text-primary text-5xl text-[#e63946]" />
            <span className="font-display font-bold text-2xl text-white tracking-wide">Skyline</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-gray-200 hover:text-primary font-medium transition-colors" href="#">Home</a>
            <a className="text-gray-200 hover:text-primary font-medium transition-colors" href="#features">Features</a>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-medium border border-white/20 transition-all">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}