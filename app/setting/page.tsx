'use client';

import { useState } from 'react';
import {
  User,
  Bell,
  Lock,
  Eye,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Shield,
  Smartphone,
  Mail,
  Heart,
  MessageSquare,
  Users,
  Volume2,
  VolumeX
} from 'lucide-react';
import SidebarFeed from '@/app/components/navigation/sidebarFeed';
import { useDarkMode } from '@/app/context/DarkModeContext';
import { useLanguage } from '@/app/context/LanguageContext';
interface SettingItem {
  id: string;
  icon: React.ElementType;
  labelKey: string;
  descriptionKey?: string;
  type: 'toggle' | 'link' | 'language';
  value?: boolean;
}

interface SettingSection {
  titleKey: string;
  items: SettingItem[];
}

const settingsConfig: SettingSection[] = [
  {
    titleKey: 'account',
    items: [
      { id: 'edit-profile', icon: User, labelKey: 'editProfile', descriptionKey: 'updatePersonalInfo', type: 'link' },
      { id: 'email', icon: Mail, labelKey: 'emailAddress', descriptionKey: 'john@example.com', type: 'link' },
      { id: 'password', icon: Lock, labelKey: 'changePassword', descriptionKey: 'updatePassword', type: 'link' },
    ]
  },
  {
    titleKey: 'privacy',
    items: [
      { id: 'private-account', icon: Eye, labelKey: 'privateAccount', descriptionKey: 'onlyFollowers', type: 'toggle', value: false },
      { id: 'activity-status', icon: Shield, labelKey: 'activityStatus', descriptionKey: 'showOnline', type: 'toggle', value: true },
      { id: 'read-receipts', icon: MessageSquare, labelKey: 'readReceipts', descriptionKey: 'letOthersKnow', type: 'toggle', value: true },
    ]
  },
  {
    titleKey: 'notificationsTitle',
    items: [
      { id: 'push-notifications', icon: Bell, labelKey: 'pushNotifications', descriptionKey: 'receivePush', type: 'toggle', value: true },
      { id: 'email-notifications', icon: Mail, labelKey: 'emailNotifications', descriptionKey: 'receiveEmail', type: 'toggle', value: false },
      { id: 'likes', icon: Heart, labelKey: 'likes', descriptionKey: 'notifyLikes', type: 'toggle', value: true },
      { id: 'comments', icon: MessageSquare, labelKey: 'comments', descriptionKey: 'notifyComments', type: 'toggle', value: true },
      { id: 'new-followers', icon: Users, labelKey: 'newFollowers', descriptionKey: 'notifyFollowers', type: 'toggle', value: true },
      { id: 'sounds', icon: Volume2, labelKey: 'sounds', descriptionKey: 'playSounds', type: 'toggle', value: true },
    ]
  },
  {
    titleKey: 'appearance',
    items: [
      { id: 'dark-mode', icon: Moon, labelKey: 'darkMode', descriptionKey: 'toggleTheme', type: 'toggle', value: true },
      { id: 'language', icon: Globe, labelKey: 'language', descriptionKey: 'switchLanguage', type: 'language' },
    ]
  },
  {
    titleKey: 'device',
    items: [
      { id: 'linked-devices', icon: Smartphone, labelKey: 'linkedDevices', descriptionKey: 'manageDevices', type: 'link' },
    ]
  },
  {
    titleKey: 'support',
    items: [
      { id: 'help', icon: HelpCircle, labelKey: 'helpCenter', descriptionKey: 'getHelp', type: 'link' },
      { id: 'logout', icon: LogOut, labelKey: 'logOut', descriptionKey: 'signOut', type: 'link' },
    ]
  }
];

export default function SettingsPage() {
  const { isDark, toggleTheme } = useDarkMode();
  const { isVie, toggleLanguage, t } = useLanguage();
  const [settings, setSettings] = useState<SettingSection[]>(settingsConfig);

  const handleToggle = (sectionIndex: number, itemId: string) => {
    if (itemId === 'dark-mode') {
      toggleTheme();
    }
    
    setSettings(prev => prev.map((section, sIdx) => {
      if (sIdx !== sectionIndex) return section;
      return {
        ...section,
        items: section.items.map(item => {
          if (item.id !== itemId || item.type !== 'toggle') return item;
          return { ...item, value: !item.value };
        })
      };
    }));
  };

  return (
    <div className={`w-full min-h-screen flex transition-colors duration-300 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <nav className="fixed top-0 left-0 h-screen z-40">
        <SidebarFeed />
      </nav>

      <main className="ml-64 flex-1 w-auto mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('settings')}</h1>
          <p className={`${isDark ? 'text-white/60' : 'text-gray-500'}`}>{t('managePreferences')}</p>
        </div>

        <div className="space-y-6">
          {settings.map((section, sectionIndex) => (
            <div
              key={section.titleKey}
              className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-[#0d0d0d] border-white/10' : 'bg-white border-gray-200'}`}
            >
              <div className={`px-5 py-3 border-b ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50'}`}>
                <h2 className={`text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                  {t(section.titleKey)}
                </h2>
              </div>

              <div className="divide-y divide-white/5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isLogout = item.id === 'logout';
                  const isEmail = item.id === 'email';

                  return (
                    <div
                      key={item.id}
                      className={`px-5 py-4 flex items-center justify-between transition-colors ${
                        item.type === 'link' ? (isDark ? 'hover:bg-white/5 cursor-pointer' : 'hover:bg-gray-50 cursor-pointer') : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isLogout 
                            ? 'bg-red-500/10' 
                            : isDark ? 'bg-white/5' : 'bg-gray-100'
                        }`}>
                          <Icon size={20} className={isLogout ? 'text-red-500' : 'text-rose-500'} />
                        </div>
                        <div>
                          <p className={`font-medium ${isLogout ? 'text-red-500' : isDark ? 'text-white' : 'text-gray-900'}`}>
                            {t(item.labelKey)}
                          </p>
                          {item.descriptionKey && (
                            <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                              {isEmail ? item.descriptionKey : t(item.descriptionKey)}
                            </p>
                          )}
                        </div>
                      </div>

                      {item.type === 'toggle' && (
                        <button
                          onClick={() => handleToggle(sectionIndex, item.id)}
                          className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
                            (item.id === 'dark-mode' ? isDark : item.value) ? 'bg-rose-500' : isDark ? 'bg-white/20' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center ${
                              (item.id === 'dark-mode' ? isDark : item.value) ? 'left-6' : 'left-1'
                            }`}
                          >
                            {item.id === 'dark-mode' && (
                              (item.id === 'dark-mode' ? isDark : item.value) 
                                ? <Moon size={12} className="text-rose-500" />
                                : <Sun size={12} className="text-yellow-500" />
                            )}
                            {item.id === 'sounds' && (
                              (item.value) 
                                ? <Volume2 size={10} className="text-rose-500" />
                                : <VolumeX size={10} className="text-gray-400" />
                            )}
                          </span>
                        </button>
                      )}

                      {item.type === 'language' && (
                        <button
                          onClick={toggleLanguage}
                          className={`relative flex items-center h-8 rounded-full transition-colors duration-300 ${
                            isDark ? 'bg-white/10' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
                              !isVie 
                                ? 'bg-rose-500 text-white' 
                                : isDark ? 'text-white/50' : 'text-gray-500'
                            }`}
                          >
                            EN
                          </span>
                          <span
                            className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
                              isVie 
                                ? 'bg-rose-500 text-white' 
                                : isDark ? 'text-white/50' : 'text-gray-500'
                            }`}
                          >
                            VI
                          </span>
                        </button>
                      )}

                      {item.type === 'link' && !isLogout && (
                        <ChevronRight size={20} className={isDark ? 'text-white/30' : 'text-gray-400'} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className={`text-center text-sm mt-8 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
          Skyline v1.0.0 • © 2026 Skyline Social, Inc.
        </p>
      </main>
    </div>
  );
}
