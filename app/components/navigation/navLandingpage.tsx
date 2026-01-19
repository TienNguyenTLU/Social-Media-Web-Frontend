'use client';

import { DraftingCompass } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/60 to-transparent transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <DraftingCompass className="text-primary text-5xl text-[#e63946]" />
            <span className="font-display font-bold text-2xl text-white tracking-wide">Skyline</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link className="text-gray-200 hover:text-primary font-medium transition-colors" href="#">Home</Link  >
            <Link className="text-gray-200 hover:text-primary font-medium transition-colors" href="#features">Features</Link>
            <Link href='/login' className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-medium border border-white/20 transition-all">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}