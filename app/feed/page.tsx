'use client';
import SidebarFeed from "@/app/components/navigation/sidebarFeed";
import { useDarkMode } from "@/app/context/DarkModeContext";
import PostComposer from "../components/postForm";
import PostCard from "../components/PostCard";
import SidebarFeedRight from "../components/navigation/sidebarFeedRight";
import { useState } from "react";

export default function FeedPage() {
  const { isDark } = useDarkMode();
  const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you');

  return (
    <div className={`w-full min-h-screen flex transition-colors duration-300 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <nav className="fixed top-0 left-0 h-screen z-40">
        <SidebarFeed />
      </nav>

      <main className="ml-70 mr-80 flex-1 w-auto mx-auto px-4 py-6">
        <div className={`flex gap-0 border-b ${isDark ? 'border-white/10' : 'border-gray-200'} mb-6`}>
          <button 
            onClick={() => setActiveTab('for-you')}
            className={`flex-1 py-4 text-sm font-bold transition-all relative ${
              activeTab === 'for-you' 
                ? isDark ? 'text-white' : 'text-gray-900' 
                : isDark ? 'text-white/50 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            For You
            {activeTab === 'for-you' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-rose-500 rounded-full" />
            )}
          </button>

          <button 
            onClick={() => setActiveTab('following')}
            className={`flex-1 py-4 text-sm font-bold transition-all relative ${
              activeTab === 'following' 
                ? isDark ? 'text-white' : 'text-gray-900' 
                : isDark ? 'text-white/50 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Following
            {activeTab === 'following' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-rose-500 rounded-full" />
            )}
          </button>
        </div>

        <div className="mb-6">
          <PostComposer />
        </div>

        <div className="flex flex-col gap-6">
          {activeTab === 'for-you' ? (
            <>
              <PostCard 
                user={{ name: "John Doe", handle: "johndoe", avatar: "/avatar.avif", verified: true }}
                timestamp="2h"
                content="This is a sample post content. Enjoying the vibes today! 🔥"
                image="/post-image.jpg"
                stats={{ likes: 128, comments: 24, shares: 12 }}
              />
              <PostCard 
                user={{ name: "Jane Smith", handle: "janesmith", avatar: "/avatar.avif", verified: false }}
                timestamp="4h"
                content="Just finished my morning workout. Feeling great! 💪"
                image="/post-image.jpg"
                stats={{ likes: 89, comments: 15, shares: 5 }}
              />
            </>
          ) : (
            <>
              <PostCard 
                user={{ name: "Alex Kim", handle: "alexk", avatar: "/avatar.avif", verified: true }}
                timestamp="1h"
                content="New project coming soon! Stay tuned 👀"
                image="/post-image.jpg"
                stats={{ likes: 256, comments: 42, shares: 28 }}
              />
            </>
          )}
        </div>
        <aside className="absolute top-0 right-0 h-screen">
          <SidebarFeedRight />
        </aside>
      </main>
        
    </div>
  );
}