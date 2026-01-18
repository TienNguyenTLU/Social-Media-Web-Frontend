"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  ImagePlus, 
  FileVideo, 
  BarChart2, 
  Smile, 
  SendHorizontal,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';
export default function PostComposer() {
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isDark } = useDarkMode();

  useEffect(() => {
    if (textareaRef.current && isModalOpen) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.focus();
    }
  }, [content, isModalOpen]);

  const handlePost = () => {
    if (!content.trim()) return;
    console.log("Posting vibe:", content);
    setContent("");
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Compact Input Trigger */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className={`${isDark ? 'bg-[#221017]/70 border-white/10 hover:border-white/20' : 'bg-white border-gray-200 hover:border-gray-300'} backdrop-blur-xl border rounded-2xl p-4 shadow-xl cursor-pointer transition-all`}
      >
        <div className="flex gap-4 items-center">
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src="/default_avatar.png"
              alt="User profile"
              fill
              className="rounded-full object-cover border border-primary/30"
            />
          </div>
          <div className={`flex-1 py-2 px-4 rounded-full ${isDark ? 'bg-white/5 text-white/40' : 'bg-gray-100 text-gray-400'}`}>
            What's the vibe?
          </div>
          <div className="flex gap-2">
            <ImagePlus size={20} className={`${isDark ? 'text-white/40' : 'text-gray-400'}`} />
            <Smile size={20} className={`${isDark ? 'text-white/40' : 'text-gray-400'}`} />
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 ${isDark ? 'bg-black/80' : 'bg-black/50'} backdrop-blur-sm`}
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className={`${isDark ? 'bg-[#1a1a1f] border-white/10' : 'bg-white border-gray-200'} border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl`}
            >
              {/* Modal Header */}
              <div className={`p-4 border-b ${isDark ? 'border-white/10' : 'border-gray-200'} flex items-center justify-between`}>
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Create Post</h2>
                <button 
                  onClick={handleClose}
                  className={`p-1 rounded-full ${isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'} transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-10 h-10 shrink-0">
                    <Image
                      src="/default_avatar.png"
                      alt="User profile"
                      fill
                      className="rounded-full object-cover border border-primary/30"
                    />
                  </div>
                  <div className="flex-1">
                    <textarea
                      ref={textareaRef}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className={`w-full bg-transparent border-none outline-none focus:outline-none resize-none min-h-[120px] text-lg py-1 leading-relaxed ${isDark ? 'text-white placeholder:text-white/40' : 'text-gray-900 placeholder:text-gray-400'}`}     
                      placeholder="What's the vibe?"
                      autoFocus
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className={`p-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    <button 
                      type="button"
                      className={`p-2 rounded-lg transition-all group ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                      title="Add Image"
                    >
                      <ImagePlus size={24} className="text-rose-500" />
                    </button>
                    
                    <button 
                      type="button"
                      className={`p-2 rounded-lg transition-all group ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                      title="Add Video"
                    >
                      <FileVideo size={24} className="text-rose-500" />
                    </button>

                    <button 
                      type="button"
                      className={`p-2 rounded-lg transition-all group ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                      title="Create Poll"
                    >
                      <BarChart2 size={24} className="text-rose-500" />
                    </button>

                    <button 
                      type="button"
                      className={`p-2 rounded-lg transition-all group ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                      title="Add Emoji"
                    >
                      <Smile size={24} className="text-rose-500" />
                    </button>
                  </div>
                  
                  <button
                    onClick={handlePost}
                    disabled={!content.trim()}
                    className={`
                      flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300
                      ${content.trim() 
                        ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-500/20' 
                        : isDark ? 'bg-white/5 text-white/30 cursor-not-allowed' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}
                    `}
                  >
                    <span>Post</span>
                    <SendHorizontal size={16} />
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