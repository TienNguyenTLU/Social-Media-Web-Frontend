'use client';
import { useState } from 'react';
import {
  Phone,
  Video,
  Info,
  Send,
  Smile,
  Paperclip,
  Image as ImageIcon,
  Check,
  CheckCheck,
  MessageSquare
} from 'lucide-react';
import Image from 'next/image';
import { useDarkMode } from '@/app/context/DarkModeContext';
import { Conversation } from '@/app/components/friendsList';
export interface Message {
  id: number;
  senderId: 'me' | 'other';
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}
interface MessagePanelProps {
  selectedConversation: Conversation | null;
  messages: Message[];
}
export default function MessagePanel({
  selectedConversation,
  messages
}: MessagePanelProps) {
  const { isDark } = useDarkMode();
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className={`flex-1 flex flex-col h-full ${
      isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'
    }`}>
      {selectedConversation ? (
        <>
          <div className={`px-4 py-3 flex items-center justify-between border-b ${
            isDark ? 'bg-[#0d0d0d] border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={selectedConversation.user.avatar}
                    alt={selectedConversation.user.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
                  isDark ? 'border-[#0d0d0d]' : 'border-white'
                } ${selectedConversation.user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
              </div>

              <div>
                <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedConversation.user.name}
                </h2>
                <p className={`text-xs ${
                  selectedConversation.user.isOnline
                    ? 'text-green-500'
                    : isDark ? 'text-white/40' : 'text-gray-400'
                }`}>
                  {selectedConversation.user.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button className={`p-2.5 rounded-xl transition-colors ${
                isDark ? 'hover:bg-white/10 text-white/70 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}>
                <Phone size={20} />
              </button>
              <button className={`p-2.5 rounded-xl transition-colors ${
                isDark ? 'hover:bg-white/10 text-white/70 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}>
                <Video size={20} />
              </button>
              <button className={`p-2.5 rounded-xl transition-colors ${
                isDark ? 'hover:bg-white/10 text-white/70 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}>
                <Info size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${message.senderId === 'me' ? 'order-2' : ''}`}>
                  {message.senderId !== 'me' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden mb-1 hidden">
                      <Image
                        src={selectedConversation.user.avatar}
                        alt=""
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className={`px-4 py-2.5 rounded-2xl ${
                    message.senderId === 'me'
                      ? 'bg-rose-500 text-white rounded-br-md'
                      : isDark
                        ? 'bg-white/10 text-white rounded-bl-md'
                        : 'bg-white text-gray-900 rounded-bl-md shadow-sm'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className={`flex items-center gap-1 mt-1 ${
                    message.senderId === 'me' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                      {message.timestamp}
                    </span>
                    {message.senderId === 'me' && (
                      message.status === 'read' ? (
                        <CheckCheck size={14} className="text-rose-500" />
                      ) : (
                        <Check size={14} className={isDark ? 'text-white/40' : 'text-gray-400'} />
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`p-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${
              isDark ? 'bg-white/5' : 'bg-white border border-gray-200'
            }`}>
              <button className={`p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
              }`}>
                <Smile size={20} />
              </button>
              <button className={`p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
              }`}>
                <Paperclip size={20} />
              </button>
              <button className={`p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
              }`}>
                <ImageIcon size={20} />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`flex-1 bg-transparent outline-none text-sm px-2 ${
                  isDark ? 'text-white placeholder:text-white/40' : 'text-gray-900 placeholder:text-gray-400'
                }`}
              />
              <button
                onClick={handleSendMessage}
                className={`p-2.5 rounded-xl transition-colors ${
                  messageInput.trim()
                    ? 'bg-rose-500 hover:bg-rose-600 text-white'
                    : isDark ? 'bg-white/10 text-white/30' : 'bg-gray-100 text-gray-400'
                }`}
                disabled={!messageInput.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
            isDark ? 'bg-white/5' : 'bg-gray-100'
          }`}>
            <MessageSquare size={40} className={isDark ? 'text-white/30' : 'text-gray-300'} />
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Select a conversation
          </h3>
          <p className={`text-center ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
            Choose a conversation from the list to start messaging
          </p>
        </div>
      )}
    </main>
  );
}
