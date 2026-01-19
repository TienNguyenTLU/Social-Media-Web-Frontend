'use client';

import Image from 'next/image';
import { Camera, Edit2, MapPin, Link as LinkIcon, Calendar } from 'lucide-react';
import { useDarkMode } from '@/app/context/DarkModeContext';

export interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  background: string;
  bio: string;
  location?: string;
  website?: string;
  joinedDate?: string;
  isVerified?: boolean;
  isOwnProfile?: boolean;
}

export interface ProfileStats {
  posts: number;
  followers: number;
  following: number;
}

interface ProfileHeaderProps {
  user: UserProfile;
  stats: ProfileStats;
  isFollowing?: boolean;
  onFollowClick?: () => void;
  onEditClick?: () => void;
}

export default function ProfileHeader({
  user,
  stats,
  isFollowing = false,
  onFollowClick,
  onEditClick
}: ProfileHeaderProps) {
  const { isDark } = useDarkMode();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className={`rounded-2xl overflow-hidden border ${
      isDark ? 'bg-[#0d0d0d] border-white/10' : 'bg-white border-gray-200'
    }`}>
      <div className="relative h-48 w-full">
        <Image
          src={user.background}
          alt="Profile background"
          fill
          className="object-cover"
        />
        {user.isOwnProfile && (
          <button className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${
            isDark ? 'bg-black/50 hover:bg-black/70 text-white' : 'bg-white/80 hover:bg-white text-gray-900'
          }`}>
            <Camera size={18} />
          </button>
        )}
      </div>

      <div className="relative px-6 pb-6">
        <div className="relative -mt-16 mb-4">
          <div className={`w-32 h-32 rounded-full overflow-hidden border-4 ${
            isDark ? 'border-[#0d0d0d]' : 'border-white'
          }`}>
            <Image
              src={user.avatar}
              alt={user.name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          {user.isOwnProfile && (
            <button className={`absolute bottom-2 right-0 p-2 rounded-full transition-colors ${
              isDark ? 'bg-[#0d0d0d] hover:bg-white/10 text-white border border-white/20' : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 shadow-sm'
            }`}>
              <Camera size={16} />
            </button>
          )}
        </div>

        <div className="absolute top-4 right-6">
          {user.isOwnProfile ? (
            <button
              onClick={onEditClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                  : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-300'
              }`}
            >
              <Edit2 size={16} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <button
              onClick={onFollowClick}
              className={`px-6 py-2 rounded-xl font-medium transition-colors ${
                isFollowing
                  ? isDark 
                    ? 'bg-white/10 hover:bg-red-500/20 text-white border border-white/20 hover:text-red-400 hover:border-red-500/50' 
                    : 'bg-white hover:bg-red-50 text-gray-900 border border-gray-300 hover:text-red-500 hover:border-red-300'
                  : 'bg-rose-500 hover:bg-rose-600 text-white'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>

        <div className="mb-3">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {user.name}
          </h1>
          <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
            @{user.handle}
          </p>
        </div>

        <p className={`mb-4 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
          {user.bio}
        </p>

        <div className="flex flex-wrap gap-4 mb-4">
          {user.location && (
            <div className={`flex items-center gap-1 text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              <MapPin size={16} />
              <span>{user.location}</span>
            </div>
          )}
          {user.website && (
            <a 
              href={user.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-sm text-rose-500 hover:underline`}
            >
              <LinkIcon size={16} />
              <span>{user.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          {user.joinedDate && (
            <div className={`flex items-center gap-1 text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              <Calendar size={16} />
              <span>Joined {user.joinedDate}</span>
            </div>
          )}
        </div>

        <div className="flex gap-6">
          <div className="flex items-center gap-1">
            <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {formatNumber(stats.posts)}
            </span>
            <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              Posts
            </span>
          </div>
          <button className="flex items-center gap-1 hover:underline">
            <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {formatNumber(stats.followers)}
            </span>
            <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              Followers
            </span>
          </button>
          <button className="flex items-center gap-1 hover:underline">
            <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {formatNumber(stats.following)}
            </span>
            <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              Following
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
