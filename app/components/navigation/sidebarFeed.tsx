'use client';

import { Bell, Compass, DraftingCompass, Home, MessageSquare, Moon, Settings, Sun, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDarkMode } from "@/app/context/DarkModeContext";

const navLinks = [
  { name: "Home", href: "/feed", icon: Home },
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Notifications", href: "/notifications", icon: Bell, badge: true },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function SidebarFeed() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <aside className={`w-64 h-screen p-6 flex flex-col font-poppins border-r transition-colors duration-300
      ${isDark ? 'bg-[#0d0d0d] text-white border-white/5' : 'bg-white text-gray-900 border-gray-200'}`}>
      <div className="mb-8 flex gap-3 items-center">
        <DraftingCompass className="text-rose-500" size={28} />
        <p className={`text-xl font-bold tracking-wide ${isDark ? 'text-white' : 'text-gray-900'}`}>Skyline</p>
      </div>
      <nav className="flex-1">
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 relative
                    ${isActive 
                      ? 'bg-rose-600 text-white' 
                      : isDark 
                        ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  <Icon size={20} />
                  <span>{link.name}</span>
                  {link.badge && !isActive && (
                    <span className="absolute right-4 w-2 h-2 bg-rose-500 rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={`py-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between px-2">
          <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </span>
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 
              ${isDark ? 'bg-rose-600' : 'bg-gray-300'}`}
            aria-label="Toggle theme"
          >
            <span
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center
                ${isDark ? 'left-8' : 'left-1'}`}
            >
              {isDark ? (
                <Moon size={12} className="text-rose-600" />
              ) : (
                <Sun size={12} className="text-yellow-500" />
              )}
            </span>
          </button>
        </div>
      </div>

      <div className="pt-4">
        <button className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg shadow-rose-500/20">
          Post a Vibe
        </button>
      </div>
    </aside>
  );
}