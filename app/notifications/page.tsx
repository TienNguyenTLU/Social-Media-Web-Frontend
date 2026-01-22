'use client';
import SidebarFeed from "../components/navigation/sidebarFeed";
import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import NotificationsPanel, { FilterType } from "../components/notificationPanel";
import NotificationList from "../components/notificationList";

export default function NotificationsPage() {
    const { isDark } = useDarkMode();
    const [activeType, setActiveType] = useState<FilterType>('All');

    return(
        <div className={`flex min-h-screen ${
            isDark ? 'bg-[#050505]' : 'bg-white'
        }`}>
            <aside className="fixed left-0 w-64 h-full ">
                <SidebarFeed />
            </aside>
            <div className={`ml-64 w-full flex flex-col `}>
                <NotificationsPanel activeType={activeType} onTypeChange={setActiveType} />
                <NotificationList activeType={activeType} />
            </div>
        </div>
    )
}