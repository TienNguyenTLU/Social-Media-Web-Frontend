'use client';
import { useDarkMode } from "../context/DarkModeContext";
import { useState, useMemo } from "react";
import { Heart, MessageCircle, UserPlus, Bell, CheckCheck } from "lucide-react";
import Image from "next/image";
import { FilterType } from "./notificationPanel";

export type NotificationType = 'like' | 'comment' | 'follow' | 'mention';

interface NotificationListProps {
    activeType: FilterType;
}

export default function NotificationList({ activeType }: NotificationListProps) {
    const { isDark } = useDarkMode();
    type Notification = {
        id: number;
        type: NotificationType;
        title: string;
        message: string;
        timestamp: string;
        isRead: boolean;
        avatar: string;
    };
    const Mock: Notification[] = [
        {
            id: 1,
            type: 'like',
            title: "New Like",
            message: "User123 liked your post.",
            timestamp: "2 hours ago",
            isRead: false,
            avatar: "/avatar.avif"
        },
        {
            id: 2,
            type: 'comment',
            title: "New Comment",
            message: "User456 commented on your photo.",
            timestamp: "1 day ago",
            isRead: true,
            avatar: "/avatar.avif"
        },
        {
            id: 3,
            type: 'follow',
            title: "New Follower",
            message: "User789 started following you.",
            timestamp: "3 days ago",
            isRead: true,
            avatar: "/avatar.avif"
        }
    ];

    const [notifications, setNotifications] = useState<Notification[]>(Mock);
    //Hàm lọc notifications theo activeType
    const filteredNotifications = useMemo(() => {
        if (activeType === 'All') return notifications;
        
        const typeMap: Record<FilterType, NotificationType | null> = {
            'All': null,
            'Likes': 'like',
            'Comments': 'comment',
            'Follows': 'follow',
            'Mentions': 'mention'
        };
        
        const filterType = typeMap[activeType];
        return filterType ? notifications.filter(n => n.type === filterType) : notifications;
    }, [notifications, activeType]);

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case 'like':
                return <Heart size={16} className="text-rose-500" />;
            case 'comment':
                return <MessageCircle size={16} className="text-blue-500" />;
            case 'follow':
                return <UserPlus size={16} className="text-green-500" />;
            case 'mention':
                return <Bell size={16} className="text-yellow-500" />;
            default:
                return <Bell size={16} className="text-gray-500" />;
        }
    };
    const markAsRead = (id: number) => {
        setNotifications(prev => 
            prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
    };
    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    return (
        <div className={`flex p-8 h-full flex-col ${
            isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'
        }`}>
            <div className={`px-4 py-3 flex items-center justify-between border-b ${
                isDark ? 'border-white/10' : 'border-gray-200'
            }`}>
                <span className={`text-sm font-medium ${
                    isDark ? 'text-white/50' : 'text-gray-500'
                }`}>
                    {filteredNotifications.filter(n => !n.isRead).length} unread
                </span>
                <button 
                    onClick={markAllAsRead}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                        isDark 
                            ? 'text-rose-400 hover:text-rose-300' 
                            : 'text-rose-500 hover:text-rose-600'
                    }`}
                >
                    <CheckCheck size={16} />
                    Mark all read
                </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-8">
                        <Bell size={48} className={isDark ? 'text-white/20' : 'text-gray-300'} />
                        <p className={`mt-4 text-sm ${
                            isDark ? 'text-white/50' : 'text-gray-500'
                        }`}>
                            {activeType === 'All' ? 'No notifications to display' : `No ${activeType.toLowerCase()} notifications`}
                        </p>
                    </div>
                ) : (
                    filteredNotifications.map((notification) => (
                        <button
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            className={`w-full p-4 flex items-start gap-3 transition-colors border-b ${
                                isDark ? 'border-white/5' : 'border-gray-100'
                            } ${
                                !notification.isRead
                                    ? isDark 
                                        ? 'bg-rose-500/10 hover:bg-rose-500/15' 
                                        : 'bg-rose-50 hover:bg-rose-100'
                                    : isDark 
                                        ? 'hover:bg-white/5' 
                                        : 'hover:bg-gray-50'
                            }`}
                        >
                            {/* Avatar with Icon Badge */}
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        src={notification.avatar}
                                        alt=""
                                        width={48}
                                        height={48}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full ${
                                    isDark ? 'bg-[#0a0a0a]' : 'bg-white'
                                }`}>
                                    <div className={`p-1 rounded-full ${
                                        isDark ? 'bg-white/10' : 'bg-gray-100'
                                    }`}>
                                        {getIcon(notification.type)}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 text-left">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className={`font-semibold text-sm ${
                                        isDark ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        {notification.title}
                                    </h3>
                                    {!notification.isRead && (
                                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                                    )}
                                </div>
                                <p className={`text-sm truncate ${
                                    isDark ? 'text-white/70' : 'text-gray-600'
                                }`}>
                                    {notification.message}
                                </p>
                                <span className={`text-xs mt-1 block ${
                                    isDark ? 'text-white/40' : 'text-gray-400'
                                }`}>
                                    {notification.timestamp}
                                </span>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}
