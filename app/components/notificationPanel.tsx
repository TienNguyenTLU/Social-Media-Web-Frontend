'use client';
import { SettingsIcon } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

export type FilterType = 'All' | 'Mentions' | 'Likes' | 'Follows' | 'Comments';

// Khởi tạo Prop để truyền dữ liệu Atribute activeType và phương thức onTypeChange 
interface NotificationsPanelProps {
    activeType: FilterType;
    onTypeChange: (type: FilterType) => void;
}

export default function NotificationsPanel({ activeType, onTypeChange }: NotificationsPanelProps) {
    const { isDark } = useDarkMode();
    const types: FilterType[] = ['All', 'Mentions', 'Likes', 'Follows', 'Comments'];
  return (
    <div className={`w-full flex flex-col p-4 border-b  ${isDark ? 'bg-[#0a0a0a] text-white border-white/10' : 'border-gray-200 bg-gray-50 text-gray-900'}`}>
        <div className="flex flex-row justify-around items-center gap-300 pb-2 mb-4">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <SettingsIcon className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="flex space-x-4 mb-4 transition-all rounded-3xl">
            {types.map((type) => (  
                <button
                    key={type}
                    onClick={() => onTypeChange(type)}
                    className={`flex-1 py-4 text-sm font-bold transition-all relative ${
                        activeType === type
                        ? isDark ? 'text-white' : 'text-gray-900' 
                : isDark ? 'text-white/50 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                    {type}
                    {activeType === type && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-rose-500 rounded-full" />
            )}
                </button>
            ))}
        </div>
    </div>
  );
}