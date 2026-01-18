'use client';
import SidebarFeed from "@/app/components/navigation/sidebarFeed";
import { useDarkMode } from "@/app/context/DarkModeContext";
import PostComposer from "../components/postForm";
import PostCard from "../components/PostCard";
import { useState } from "react";
export default function FeedPage() {
  const { isDark } = useDarkMode();
  const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you');
  return (

    <div className={`w-full min-h-screen flex transition-colors duration-300 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <nav className="fixed top-0 left-0 h-screen">
        <SidebarFeed />
      </nav>
      <main className="ml-64 flex-1 p-15">
        <PostComposer />
        {/* Tabs Navigation */}
      <div className="flex gap-8 border-b border-white/5 px-2">
        <button 
          onClick={() => setActiveTab('for-you')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'for-you' ? 'text-white' : 'text-white/50 hover:text-white'
          }`}
        >
          For You
          {activeTab === 'for-you' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_#f4257b]" />
          )}
        </button>

        <button 
          onClick={() => setActiveTab('following')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'following' ? 'text-white' : 'text-white/50 hover:text-white'
          }`}
        >
          Following
          {activeTab === 'following' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_#f4257b]" />
          )}
        </button>
      </div>
        <PostCard 
          user={{ name: "John Doe", handle: "johndoe", avatar: "/avatar.jpg", verified: true }}
          timestamp="2h"
          content="This is a sample post content."
          image="/post-image.jpg"
          stats={{ likes: 10, comments: 5, shares: 2 }}
        />
      </main>
    </div>
  );
}