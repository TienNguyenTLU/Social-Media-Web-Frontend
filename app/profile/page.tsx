'use client';

import { useState } from 'react';
import { Grid3X3, Heart, Bookmark } from 'lucide-react';
import SidebarFeed from '@/app/components/navigation/sidebarFeed';
import ProfileHeader, { UserProfile, ProfileStats } from '@/app/components/profileHeader';
import PostCard from '@/app/components/PostCard';
import { useDarkMode } from '@/app/context/DarkModeContext';

const userProfile: UserProfile = {
  name: 'John Doe',
  handle: 'johndoe',
  avatar: '/avatar.avif',
  background: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',
  bio: '🚀 Full-stack developer | UI/UX enthusiast | Building cool stuff with code. Love to share my journey and connect with fellow creators!',
  location: 'San Francisco, CA',
  website: 'https://johndoe.dev',
  joinedDate: 'March 2023',
  isVerified: true,
  isOwnProfile: true,
};

const userStats: ProfileStats = {
  posts: 142,
  followers: 12500,
  following: 890,
};

const userPosts = [
  {
    id: 1,
    user: { name: 'John Doe', handle: 'johndoe', avatar: '/avatar.avif', verified: true },
    timestamp: '2h',
    content: 'Just shipped a new feature! 🚀 Really proud of how the team came together on this one. #coding #webdev',
    image: '/post-image.jpg',
    stats: { likes: 234, comments: 45, shares: 12 },
  },
  {
    id: 2,
    user: { name: 'John Doe', handle: 'johndoe', avatar: '/avatar.avif', verified: true },
    timestamp: '1d',
    content: 'Beautiful sunset from my office window today 🌅 Sometimes you just need to stop and appreciate the little things.',
    image: '/post-image.jpg',
    stats: { likes: 567, comments: 89, shares: 23 },
  },
  {
    id: 3,
    user: { name: 'John Doe', handle: 'johndoe', avatar: '/avatar.avif', verified: true },
    timestamp: '3d',
    content: 'New blog post is up! "10 Tips for Better React Performance" - Link in bio 📝',
    stats: { likes: 892, comments: 156, shares: 78 },
  },
];

const likedPosts = [
  {
    id: 4,
    user: { name: 'Sarah Chen', handle: 'sarahc', avatar: '/avatar.avif', verified: true },
    timestamp: '5h',
    content: 'AI is changing the game! Here are my thoughts on the future of development 🤖',
    image: '/post-image.jpg',
    stats: { likes: 1234, comments: 234, shares: 89 },
  },
  {
    id: 5,
    user: { name: 'Alex Kim', handle: 'alexk', avatar: '/avatar.avif', verified: false },
    timestamp: '1d',
    content: 'Just finished my morning workout! 💪 Consistency is key.',
    stats: { likes: 456, comments: 67, shares: 12 },
  },
];

const savedPosts = [
  {
    id: 6,
    user: { name: 'Tech Daily', handle: 'techdaily', avatar: '/avatar.avif', verified: true },
    timestamp: '2d',
    content: '🔥 Top 10 VS Code extensions for 2026 - Boost your productivity!',
    image: '/post-image.jpg',
    stats: { likes: 3456, comments: 567, shares: 234 },
  },
  {
    id: 7,
    user: { name: 'Design Hub', handle: 'designhub', avatar: '/avatar.avif', verified: true },
    timestamp: '1w',
    content: 'Figma tips that will save you hours ⏰ Thread 🧵',
    stats: { likes: 2345, comments: 345, shares: 123 },
  },
];

type TabType = 'posts' | 'liked' | 'saved';

export default function ProfilePage() {
  const { isDark } = useDarkMode();
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const tabs = [
    { id: 'posts' as TabType, label: 'Posts', icon: Grid3X3, count: userStats.posts },
    { id: 'liked' as TabType, label: 'Liked', icon: Heart, count: likedPosts.length },
    { id: 'saved' as TabType, label: 'Saved', icon: Bookmark, count: savedPosts.length },
  ];

  const getActivePostsList = () => {
    switch (activeTab) {
      case 'posts':
        return userPosts;
      case 'liked':
        return likedPosts;
      case 'saved':
        return savedPosts;
      default:
        return userPosts;
    }
  };

  return (
    <div className={`w-full min-h-screen flex transition-colors duration-300 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <nav className="fixed top-0 left-0 h-screen z-40">
        <SidebarFeed />
      </nav>

      <main className="ml-64 flex-1 w-auto mx-auto px-6 py-6">
        <ProfileHeader
          user={userProfile}
          stats={userStats}
          isFollowing={isFollowing}
          onFollowClick={() => setIsFollowing(!isFollowing)}
          onEditClick={() => console.log('Edit profile clicked')}
        />

        <div className={`mt-6 rounded-xl border overflow-hidden ${
          isDark ? 'bg-[#0d0d0d] border-white/10' : 'bg-white border-gray-200'
        }`}>
          <div className={`flex border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-all relative ${
                    isActive
                      ? isDark ? 'text-white' : 'text-gray-900'
                      : isDark ? 'text-white/50 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-rose-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          {getActivePostsList().length > 0 ? (
            getActivePostsList().map((post) => (
              <PostCard
                key={post.id}
                user={post.user}
                timestamp={post.timestamp}
                content={post.content}
                image={post.image}
                stats={post.stats}
              />
            ))
          ) : (
            <div className={`text-center py-16 rounded-2xl border ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
            }`}>
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                isDark ? 'bg-white/10' : 'bg-gray-100'
              }`}>
                {activeTab === 'posts' && <Grid3X3 size={28} className={isDark ? 'text-white/30' : 'text-gray-300'} />}
                {activeTab === 'liked' && <Heart size={28} className={isDark ? 'text-white/30' : 'text-gray-300'} />}
                {activeTab === 'saved' && <Bookmark size={28} className={isDark ? 'text-white/30' : 'text-gray-300'} />}
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No {activeTab} yet
              </h3>
              <p className={`${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                {activeTab === 'posts' && "When you create posts, they'll appear here."}
                {activeTab === 'liked' && "Posts you like will appear here."}
                {activeTab === 'saved' && "Save posts to see them here."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
