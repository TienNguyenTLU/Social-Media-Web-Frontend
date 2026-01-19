'use client';
import { useState } from 'react';
import SidebarFeed from '@/app/components/navigation/sidebarFeed';
import FriendsList, { Conversation } from '@/app/components/friendsList';
import MessagePanel, { Message } from '@/app/components/messagePanel';
import { useDarkMode } from '@/app/context/DarkModeContext';
// Mẫu cuộc trò chuyện
const conversations: Conversation[] = [
  {
    id: 1,
    user: {
      name: 'Emma Wilson',
      avatar: '/avatar.avif',
      isOnline: true,
    },
    lastMessage: 'That sounds amazing! Let me know when you\'re free 😊',
    timestamp: '2m',
    unread: 2,
  },
  {
    id: 2,
    user: {
      name: 'Alex Chen',
      avatar: '/avatar.avif',
      isOnline: true,
    },
    lastMessage: 'Did you see the new design updates?',
    timestamp: '15m',
    unread: 0,
  },
  {
    id: 3,
    user: {
      name: 'Sarah Johnson',
      avatar: '/avatar.avif',
      isOnline: false,
    },
    lastMessage: 'Thanks for your help yesterday!',
    timestamp: '1h',
    unread: 0,
  },
  {
    id: 4,
    user: {
      name: 'Mike Ross',
      avatar: '/avatar.avif',
      isOnline: true,
    },
    lastMessage: 'The meeting is scheduled for tomorrow at 3 PM',
    timestamp: '2h',
    unread: 1,
  },
  {
    id: 5,
    user: {
      name: 'Jessica Lee',
      avatar: '/avatar.avif',
      isOnline: false,
    },
    lastMessage: 'I\'ll send you the files later today',
    timestamp: '5h',
    unread: 0,
  },
  {
    id: 6,
    user: {
      name: 'David Kim',
      avatar: '/avatar.avif',
      isOnline: false,
    },
    lastMessage: 'Happy birthday! 🎂🎉',
    timestamp: '1d',
    unread: 0,
  },
  {
    id: 7,
    user: {
      name: 'Creative Team',
      avatar: '/avatar.avif',
      isOnline: true,
      isGroup: true,
      members: 8,
    },
    lastMessage: 'John: Let\'s finalize the project today',
    timestamp: '3h',
    unread: 5,
  },
  {
    id: 8,
    user: {
      name: 'Marketing Squad',
      avatar: '/avatar.avif',
      isOnline: false,
      isGroup: true,
      members: 12,
    },
    lastMessage: 'Lisa: Campaign results are in!',
    timestamp: '6h',
    unread: 0,
  },
];

// Mẫu tin nhắn cho cuộc trò chuyện được chọn
const sampleMessages: Message[] = [
  {
    id: 1,
    senderId: 'other',
    content: 'Hey! How are you doing?',
    timestamp: '10:30 AM',
    status: 'read',
  },
  {
    id: 2,
    senderId: 'me',
    content: 'I\'m doing great! Just finished working on that project we discussed.',
    timestamp: '10:32 AM',
    status: 'read',
  },
  {
    id: 3,
    senderId: 'other',
    content: 'That\'s awesome! Can\'t wait to see it. When can we meet up to review?',
    timestamp: '10:33 AM',
    status: 'read',
  },
  {
    id: 4,
    senderId: 'me',
    content: 'How about tomorrow afternoon? I\'m free after 2 PM.',
    timestamp: '10:35 AM',
    status: 'read',
  },
  {
    id: 5,
    senderId: 'other',
    content: 'Perfect! Let\'s do 3 PM at the usual cafe ☕',
    timestamp: '10:36 AM',
    status: 'read',
  },
  {
    id: 6,
    senderId: 'me',
    content: 'Sounds good to me! I\'ll bring my laptop so we can go through everything.',
    timestamp: '10:38 AM',
    status: 'delivered',
  },
  {
    id: 7,
    senderId: 'other',
    content: 'That sounds amazing! Let me know when you\'re free 😊',
    timestamp: '10:40 AM',
    status: 'read',
  },
];

export default function MessagesPage() {
  const { isDark } = useDarkMode();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };
  return (
    <div className={`w-full min-h-screen flex transition-colors duration-300 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <nav className="fixed top-0 left-0 h-screen z-40 hidden lg:block">
        <SidebarFeed />
      </nav>
      <div className="ml-64 flex-1 flex h-screen">
        <FriendsList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
        />
        <MessagePanel
          selectedConversation={selectedConversation}
          messages={sampleMessages}
        />
      </div>
    </div>
  );
}
