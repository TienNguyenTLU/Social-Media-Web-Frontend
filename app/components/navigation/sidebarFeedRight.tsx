'use client';

import { Search, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useDarkMode } from '@/app/context/DarkModeContext';

const trendingTags = [
  { tag: '#SunsetVibes', posts: '12.5K' },
  { tag: '#TechTalk', posts: '8.2K' },
  { tag: '#Fitness2026', posts: '6.8K' },
  { tag: '#StreetStyle', posts: '5.1K' },
  { tag: '#MondayMotivation', posts: '4.3K' },
];

const suggestedPeople = [
  { name: 'Emma Wilson', handle: 'emmaw', avatar: '/avatar.avif', followers: '125K', verified: true },
  { name: 'Marcus Chen', handle: 'marcusc', avatar: '/avatar.avif', followers: '98K', verified: true },
  { name: 'Sofia Rodriguez', handle: 'sofiar', avatar: '/avatar.avif', followers: '76K', verified: false },
  { name: 'James Lee', handle: 'jameslee', avatar: '/avatar.avif', followers: '52K', verified: true },
];

export default function SidebarFeedRight() {
  const { isDark } = useDarkMode();

  return (
    <aside className={`w-80 h-screen p-4 flex flex-col gap-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {/* Search Bar */}
      <div className={`relative ${isDark ? 'bg-white/5' : 'bg-gray-100'} rounded-full`}>
        <Search size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search Skyline"
          className={`w-full py-3 pl-12 pr-4 rounded-full bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder:text-white/40' : 'text-gray-900 placeholder:text-gray-400'} focus:ring-2 focus:ring-rose-500/50 transition-all`}
        />
      </div>

      {/* Trending Tags */}
      <div className={`${isDark ? 'bg-white/5' : 'bg-white'} rounded-2xl ${isDark ? '' : 'border border-gray-200'}`}>
        <div className={`p-4 border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
          <h2 className={`font-bold text-lg flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <TrendingUp size={20} className="text-rose-500" />
            Trending Now
          </h2>
        </div>
        <div className="flex flex-col">
          {trendingTags.map((item, index) => (
            <Link
              key={index}
              href={`/explore?tag=${item.tag.slice(1)}`}
              className={`px-4 py-3 transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
            >
              <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.tag}</p>
              <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{item.posts} posts</p>
            </Link>
          ))}
        </div>
        <Link 
          href="/explore" 
          className={`block px-4 py-3 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors`}
        >
          Show more
        </Link>
      </div>

      {/* Who to Follow */}
      <div className={`${isDark ? 'bg-white/5' : 'bg-white'} rounded-2xl ${isDark ? '' : 'border border-gray-200'}`}>
        <div className={`p-4 border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
          <h2 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Who to Follow</h2>
        </div>
        <div className="flex flex-col">
          {suggestedPeople.map((person, index) => (
            <div
              key={index}
              className={`px-4 py-3 flex items-center gap-3 transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image src={person.avatar} alt={person.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{person.name}</p>
                  {person.verified && (
                    <svg className="w-4 h-4 text-rose-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  )}
                </div>
                <p className={`text-xs truncate ${isDark ? 'text-white/50' : 'text-gray-500'}`}>@{person.handle} · {person.followers} followers</p>
              </div>
              <button className="px-4 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-full transition-colors flex-shrink-0">
                Follow
              </button>
            </div>
          ))}
        </div>
        <Link 
          href="/explore/people" 
          className={`block px-4 py-3 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors`}
        >
          Show more
        </Link>
      </div>

      {/* Footer */}
      <footer className={`mt-auto pt-4 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/cookies" className="hover:underline">Cookie Policy</Link>
          <Link href="/accessibility" className="hover:underline">Accessibility</Link>
          <Link href="/ads" className="hover:underline">Ads Info</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/help" className="hover:underline">Help Center</Link>
        </div>
        <p className="text-xs mt-3">© 2026 Skyline Social, Inc.</p>
      </footer>
    </aside>
  );
}