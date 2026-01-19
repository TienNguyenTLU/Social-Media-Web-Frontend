"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  CheckCircle2,
  Send,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';

interface Comment {
  id: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

interface PostProps {
  user: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  timestamp: string;
  content: string;
  image?: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  comments?: Comment[];
}
const sampleComments: Comment[] = [
  {
    id: '1',
    user: { name: 'Sarah Chen', handle: 'sarahc', avatar: '/avatar.avif' },
    content: 'This is amazing! Love the vibes 🔥',
    timestamp: '2h',
    likes: 12,
    replies: [
      {
        id: '1-1',
        user: { name: 'Mike Ross', handle: 'mikeross', avatar: '/avatar.avif' },
        content: 'Totally agree!',
        timestamp: '1h',
        likes: 3,
      }
    ]
  },
  {
    id: '2',
    user: { name: 'Alex Kim', handle: 'alexk', avatar: '/avatar.avif' },
    content: 'Where was this taken? 😍',
    timestamp: '1h',
    likes: 5,
  },
];

export default function PostCard({ user, timestamp, content, image, stats, comments = sampleComments }: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { isDark } = useDarkMode();

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`flex gap-3 ${isReply ? 'ml-10 mt-3' : ''}`}>
      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
        <Image src={comment.user.avatar} alt={comment.user.name} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`${isDark ? 'bg-white/5' : 'bg-gray-100'} rounded-2xl px-4 py-2`}>
          <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{comment.user.name}</span>
          <p className={`text-sm ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{comment.content}</p>
        </div>
        <div className="flex items-center gap-4 mt-1 px-2">
          <span className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>{comment.timestamp}</span>
          <button className={`text-xs ${isDark ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}>Like</button>
          <button className={`text-xs ${isDark ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}>Reply</button>
        </div>
        {comment.replies?.map(reply => (
          <CommentItem key={reply.id} comment={reply} isReply />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className={`${isDark ? 'bg-[#221017]/40' : 'bg-white'} backdrop-blur-md border ${isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'} rounded-2xl overflow-hidden transition-all`}>
        <div className={`p-4 flex justify-between items-center border-b ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <div className={`relative w-10 h-10 rounded-full ring-2 ring-primary/20 ring-offset-2 ${isDark ? 'ring-offset-[#0f0f12]' : 'ring-offset-white'}`}>
              <Image
                src="/avatar.avif"
                alt={user.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.name}</span>
                {user.verified && (
                  <CheckCircle2 size={14} className="fill-primary text-primary" />
                )}
              </div>
              <span className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>@{user.handle} • {timestamp}</span>
            </div>
          </div>
          <button className={`${isDark ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-900'} transition-colors`}>
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-4">
            {image && (
              <div className={`relative aspect-square w-full rounded-xl overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                <Image
                  src="/background.png"
                  alt="Post media"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="mt-3">
              <p className={`text-sm leading-relaxed ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{content}</p>
            </div>

            <div className={`flex items-center gap-6 mt-4 pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-rose-500' : isDark ? 'text-white/60 hover:text-rose-500' : 'text-gray-500 hover:text-rose-500'}`}
              >
                <motion.div whileTap={{ scale: 1.4 }}>
                  <Heart size={22} className={isLiked ? "fill-rose-500" : ""} />
                </motion.div>
                <span className="text-sm font-semibold">{isLiked ? stats.likes + 1 : stats.likes}</span>
              </button>

              <button 
                onClick={() => setIsModalOpen(true)}
                className={`flex items-center gap-2 ${isDark ? 'text-white/60' : 'text-gray-500'} hover:text-blue-400 transition-colors`}
              >
                <MessageCircle size={22} />
                <span className="text-sm font-semibold">{stats.comments}</span>
              </button>

              <button className={`flex items-center gap-2 ${isDark ? 'text-white/60' : 'text-gray-500'} hover:text-green-400 transition-colors`}>
                <Share2 size={22} />
                <span className="text-sm font-semibold">{stats.shares}</span>
              </button>

              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`ml-auto transition-colors ${isBookmarked ? 'text-amber-500' : isDark ? 'text-white/40 hover:text-amber-500' : 'text-gray-400 hover:text-amber-500'}`}
              >
                <Bookmark size={22} className={isBookmarked ? "fill-amber-500" : ""} />
              </button>
            </div>
          </div>

          <div className={`lg:w-1/2 border-t lg:border-t-0 lg:border-l ${isDark ? 'border-white/5' : 'border-gray-100'} flex flex-col max-h-100 lg:max-h-125`}>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.slice(0, 3).map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
              {comments.length > 3 && (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className={`text-sm ${isDark ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
                >
                  View all {stats.comments} comments
                </button>
              )}
            </div>

            <div className={`p-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
              <div 
                onClick={() => setIsModalOpen(true)}
                className={`flex items-center gap-3 ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'} rounded-full px-4 py-3 cursor-pointer transition-colors`}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <Image src={user.avatar} alt="Your avatar" fill className="object-cover" />
                </div>
                <span className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-400'}`}>Write a comment...</span>
                <Send size={18} className={`${isDark ? 'text-white/30' : 'text-gray-300'} ml-auto`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isDark ? 'bg-black/80' : 'bg-black/50'} backdrop-blur-sm`}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`${isDark ? 'bg-[#1a1a1f] border-white/10' : 'bg-white border-gray-200'} border rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden`}
            >
              <div className={`p-4 border-b ${isDark ? 'border-white/10' : 'border-gray-200'} flex items-center justify-between`}>
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Comments</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className={`${isDark ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-gray-900'} transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {comments.map(comment => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </div>

              <div className={`p-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image src={user.avatar} alt="Your avatar" fill className="object-cover" />
                  </div>
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className={`flex-1 ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : 'bg-gray-100 border-gray-200 text-gray-900 placeholder:text-gray-400'} border rounded-full px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50 transition-colors`}
                  />
                  <button 
                    className={`p-3 rounded-full transition-colors ${commentText ? 'bg-rose-500 text-white hover:bg-rose-600' : isDark ? 'bg-white/5 text-white/30' : 'bg-gray-100 text-gray-300'}`}
                    disabled={!commentText}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}