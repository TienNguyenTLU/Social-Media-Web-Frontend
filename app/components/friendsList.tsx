'use client';
import { useState } from 'react';
import { Search, Users, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { useDarkMode } from '@/app/context/DarkModeContext';
export interface Conversation {
  id: number;
  user: {
    name: string;
    avatar: string;
    isOnline: boolean;
    isGroup?: boolean;
    members?: number;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface FriendsListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

export default function FriendsList({ 
  conversations, 
  selectedConversation, 
  onSelectConversation
}: FriendsListProps) {
  const { isDark } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={`w-96 h-full flex flex-col border-r ${
      isDark ? 'bg-[#0d0d0d] border-white/10' : 'bg-white border-gray-200'
    }`}>
      <div className={`p-4 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Messages
          </h1>
          <button 
            className={`p-2 rounded-xl transition-colors ${
              isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
            }`}
          >
            <MoreVertical size={20} className={isDark ? 'text-white/70' : 'text-gray-600'} />
          </button>
        </div>

        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
          isDark 
            ? 'bg-white/5 border-white/10 focus-within:border-rose-500/50' 
            : 'bg-gray-50 border-gray-200 focus-within:border-rose-500'
        }`}>
          <Search size={18} className={isDark ? 'text-white/40' : 'text-gray-400'} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`flex-1 bg-transparent outline-none text-sm ${
              isDark ? 'text-white placeholder:text-white/40' : 'text-gray-900 placeholder:text-gray-400'
            }`}
          />
        </div>

        <button className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-xl transition-colors">
          <Users size={18} />
          <span>Create Group</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={`w-full p-4 flex items-center gap-3 transition-colors ${
                selectedConversation?.id === conversation.id
                  ? isDark ? 'bg-white/10' : 'bg-rose-50'
                  : isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={conversation.user.avatar}
                    alt={conversation.user.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 ${
                  isDark ? 'border-[#0d0d0d]' : 'border-white'
                } ${conversation.user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
              </div>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-semibold text-sm truncate ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {conversation.user.name}
                    {conversation.user.isGroup && (
                      <span className={`ml-1 text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                        ({conversation.user.members})
                      </span>
                    )}
                  </span>
                  <span className={`text-xs shrink-0 ${
                    conversation.unread > 0 
                      ? 'text-rose-500 font-medium' 
                      : isDark ? 'text-white/40' : 'text-gray-400'
                  }`}>
                    {conversation.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-sm truncate ${
                    conversation.unread > 0
                      ? isDark ? 'text-white font-medium' : 'text-gray-900 font-medium'
                      : isDark ? 'text-white/50' : 'text-gray-500'
                  }`}>
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread > 0 && (
                    <span className="ml-2 shrink-0 w-5 h-5 flex items-center justify-center bg-rose-500 text-white text-xs font-bold rounded-full">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="p-8 text-center">
            <Search size={40} className={`mx-auto mb-3 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
            <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              No conversations found
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
