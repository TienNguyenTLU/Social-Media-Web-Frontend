'use client';

import { useState } from 'react';
import { Search, TrendingUp, Hash, X } from 'lucide-react';
import Image from 'next/image';
import SidebarFeed from '@/app/components/navigation/sidebarFeed';
import PostCard from '@/app/components/PostCard';
import { useDarkMode } from '@/app/context/DarkModeContext';
import SidebarFeedRight from '../components/navigation/sidebarFeedRight';

// Top categories with images
const topCategories = [
  { id: 1, name: 'Travel', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop', posts: 12500 },
  { id: 2, name: 'Food', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', posts: 9800 },
  { id: 3, name: 'Fashion', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', posts: 8700 },
  { id: 4, name: 'Technology', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop', posts: 7600 },
  { id: 5, name: 'Art', image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=300&fit=crop', posts: 6500 },
  { id: 6, name: 'Music', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop', posts: 5400 },
];

// All categories list
const allCategories = [
  'All', 'Travel', 'Food', 'Fashion', 'Technology', 'Art', 'Music', 
  'Sports', 'Gaming', 'Photography', 'Fitness', 'Nature', 'Movies',
  'Books', 'DIY', 'Pets', 'Beauty', 'Science', 'Education', 'News'
];

// Trending hashtags
const trendingHashtags = [
  { tag: 'wanderlust', posts: '125K' },
  { tag: 'foodie', posts: '98K' },
  { tag: 'ootd', posts: '87K' },
  { tag: 'techlife', posts: '76K' },
  { tag: 'artistsonrise', posts: '65K' },
];

// Sample posts data
const samplePosts = [
  {
    id: 1,
    category: 'Travel',
    user: { name: 'Emma Wilson', handle: 'emmaw', avatar: '/avatar.avif', verified: true },
    timestamp: '2h',
    content: 'Just arrived in Bali! The sunset here is absolutely breathtaking 🌅✨ #wanderlust #travel #bali',
    image: '/post-image.jpg',
    stats: { likes: 2456, comments: 89, shares: 45 }
  },
  {
    id: 2,
    category: 'Food',
    user: { name: 'Chef Marco', handle: 'chefmarco', avatar: '/avatar.avif', verified: true },
    timestamp: '4h',
    content: 'New recipe alert! 🍝 Homemade truffle pasta with fresh parmigiano. Recipe in bio! #foodie #cooking',
    image: '/post-image.jpg',
    stats: { likes: 1823, comments: 156, shares: 78 }
  },
  {
    id: 3,
    category: 'Technology',
    user: { name: 'Tech Today', handle: 'techtoday', avatar: '/avatar.avif', verified: true },
    timestamp: '6h',
    content: 'AI is revolutionizing the way we work. Here are 5 tools you need to know about in 2026 🤖 #techlife #AI',
    image: '/post-image.jpg',
    stats: { likes: 3421, comments: 234, shares: 189 }
  },
  {
    id: 4,
    category: 'Fashion',
    user: { name: 'Style Maven', handle: 'stylemaven', avatar: '/avatar.avif', verified: false },
    timestamp: '8h',
    content: 'Winter collection preview! ❄️ Cozy vibes only. What\'s your favorite piece? #ootd #fashion',
    image: '/post-image.jpg',
    stats: { likes: 987, comments: 67, shares: 23 }
  },
  {
    id: 5,
    category: 'Art',
    user: { name: 'Digital Artist', handle: 'digiart', avatar: '/avatar.avif', verified: true },
    timestamp: '12h',
    content: 'Spent 40 hours on this piece. Every detail matters 🎨 #artistsonrise #digitalart',
    image: '/post-image.jpg',
    stats: { likes: 4567, comments: 321, shares: 234 }
  },
  {
    id: 6,
    category: 'Music',
    user: { name: 'Beat Maker', handle: 'beatmaker', avatar: '/avatar.avif', verified: false },
    timestamp: '1d',
    content: 'New track dropping tomorrow! 🎵 Who\'s ready? #newmusic #producer',
    image: '/post-image.jpg',
    stats: { likes: 2134, comments: 178, shares: 89 }
  },
];

export default function ExplorePage() {
  const { isDark } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showHashtags, setShowHashtags] = useState(false);

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'All' 
    ? samplePosts 
    : samplePosts.filter(post => post.category === selectedCategory);

  // Filter based on search query
  const searchFilteredPosts = searchQuery 
    ? filteredPosts.filter(post => 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.user.handle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredPosts;

  return (
    <div className={`w-full min-h-screen flex transition-colors duration-300 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <nav className="fixed top-0 left-0 h-screen z-40">
        <SidebarFeed />
      </nav>

      {/* Main Content */}
      <main className="ml-64 flex-1 w-auto mx-auto px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Explore your world
          </h1>
          <p className={`text-lg ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
            Discover trending content and connect with new communities
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all duration-200 ${
            isDark 
              ? 'bg-white/5 border-white/10 focus-within:border-rose-500/50 focus-within:bg-white/10' 
              : 'bg-white border-gray-200 focus-within:border-rose-500 focus-within:shadow-lg'
          }`}>
            <Search size={22} className={isDark ? 'text-white/40' : 'text-gray-400'} />
            <input
              type="text"
              placeholder="Search posts, hashtags, or people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowHashtags(true)}
              className={`flex-1 bg-transparent outline-none text-base ${
                isDark ? 'text-white placeholder:text-white/40' : 'text-gray-900 placeholder:text-gray-400'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className={`p-1 rounded-full transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
              >
                <X size={18} className={isDark ? 'text-white/40' : 'text-gray-400'} />
              </button>
            )}
          </div>

          {/* Trending Hashtags Dropdown */}
          {showHashtags && !searchQuery && (
            <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl border overflow-hidden z-50 ${
              isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200 shadow-xl'
            }`}>
              <div className={`px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-rose-500" />
                  <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Trending Hashtags</span>
                </div>
              </div>
              {trendingHashtags.map((hashtag, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(`#${hashtag.tag}`);
                    setShowHashtags(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
                    isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Hash size={18} className="text-rose-500" />
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>#{hashtag.tag}</span>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-400'}`}>{hashtag.posts} posts</span>
                </button>
              ))}
              <button 
                onClick={() => setShowHashtags(false)}
                className={`w-full px-4 py-3 text-center text-sm font-medium border-t transition-colors ${
                  isDark ? 'border-white/10 text-rose-400 hover:bg-white/5' : 'border-gray-100 text-rose-500 hover:bg-gray-50'
                }`}
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Backdrop to close hashtags */}
        {showHashtags && !searchQuery && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowHashtags(false)}
          />
        )}

        {/* Top Categories with Images */}
        <div className="mb-8">
          <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Top Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {topCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`relative group overflow-hidden rounded-2xl aspect-[4/3] transition-all duration-300 ${
                  selectedCategory === category.name 
                    ? 'ring-2 ring-rose-500 ring-offset-2 ' + (isDark ? 'ring-offset-[#0a0a0a]' : 'ring-offset-gray-50')
                    : ''
                }`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                  <p className="text-white/70 text-sm">{category.posts.toLocaleString()} posts</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* List Categories (Row, title only) */}
        <div className="mb-8">
          <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            All Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                    : isDark 
                      ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {selectedCategory === 'All' ? 'All Posts' : `${selectedCategory} Posts`}
            </h2>
            <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              {searchFilteredPosts.length} {searchFilteredPosts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>

          {/* Posts List */}
          <div className="flex flex-col gap-6">
            {searchFilteredPosts.length > 0 ? (
              searchFilteredPosts.map((post) => (
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
                <Search size={48} className={`mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  No posts found
                </h3>
                <p className={`${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                  Try searching for something else or select a different category
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <SidebarFeedRight />
    </div>
  );
}