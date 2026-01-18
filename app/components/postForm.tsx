"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  ImagePlus, 
  FileVideo, 
  BarChart2, 
  Smile, 
  SendHorizontal 
} from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
export default function PostComposer() {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handlePost = () => {
    if (!content.trim()) return;
    console.log("Posting vibe:", content);
    setContent("");
  };
  const { isDark } = useDarkMode();
  return (
    <div className={`${isDark ? 'bg-[#221017]/70 border-white/10' : 'bg-white border-gray-200'} backdrop-blur-xl border rounded-2xl p-4 shadow-xl`}>
      <div className="flex gap-4">
        <div className="relative w-10 h-10 shrink-0">
          <Image
            src="/default_avatar.png"
            alt="User profile"
            fill
            className="rounded-full object-cover border border-primary/30"
          />
        </div>

        <div className="flex-1 flex flex-col gap-3">
          {/* Input Area */}
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full bg-transparent border-none focus:ring-0 resize-none min-h-[48px] text-lg py-1 leading-relaxed ${isDark ? 'text-white placeholder:text-white/30' : 'text-gray-900 placeholder:text-gray-400'}`}     
            placeholder="What's the vibe?"
            rows={1}
          />

          {/* Action Row */}
          <div className={`flex justify-between items-center border-t ${isDark ? 'border-white/5' : 'border-gray-100'} pt-3`}>
            <div className="flex gap-1">
              <button 
                type="button"
                className={`p-2 ${isDark ? 'text-primary' : 'text-primary'} hover:bg-primary/10 rounded-lg transition-all group`}
                title="Add Image"
              >
                <ImagePlus size={35} className="bg-rose-600 mb-1 p-1 rounded-lg group-active:scale-90 transition-transform" />
              </button>
              
              <button 
                type="button"
                className={`p-2 ${isDark ? 'text-primary' : 'text-primary'} hover:bg-primary/10 rounded-lg transition-all group`}
                title="Add GIF"
              >
                <FileVideo size={35} className="bg-rose-600 mb-1 p-1 rounded-lg group-active:scale-90 transition-transform" />
              </button>

              <button 
                type="button"
                className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all group"
                title="Create Poll"
              >
                <BarChart2 size={35} className="bg-rose-600 mb-1 p-1 rounded-lg group-active:scale-90 transition-transform" />
              </button>

              <button 
                type="button"
                className={`p-2 ${isDark ? 'text-primary' : 'text-primary'} hover:bg-primary/10 rounded-lg transition-all group`}
                title="Add Emoji"
              >
                <Smile size={35} className="bg-rose-600 mb-1 p-1 rounded-lg group-active:scale-90 transition-transform" />
              </button>
            </div>
            <button
              onClick={handlePost}
              disabled={!content.trim()}
              className={`
                flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300
                ${content.trim() 
                  ? 'bg-rose-600 text-white hover:bg-primary/90 shadow-lg shadow-primary/20 scale-100' 
                  : isDark ? 'bg-white/5 text-white/30 cursor-not-allowed scale-95' : 'bg-gray-100 text-gray-300 cursor-not-allowed scale-95'}
              `}
            >
              <span>Post</span>
              <SendHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}