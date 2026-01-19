'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type Language = 'en' | 'vi';

interface Translations {
  [key: string]: {
    en: string;
    vi: string;
  };
}

export const translations: Translations = {
  home: { en: 'Home', vi: 'Trang chủ' },
  explore: { en: 'Explore', vi: 'Khám phá' },
  notifications: { en: 'Notifications', vi: 'Thông báo' },
  messages: { en: 'Messages', vi: 'Tin nhắn' },
  profile: { en: 'Profile', vi: 'Hồ sơ' },
  settings: { en: 'Settings', vi: 'Cài đặt' },
  postAVibe: { en: 'Post a Vibe', vi: 'Đăng bài' },
  darkMode: { en: 'Dark Mode', vi: 'Chế độ tối' },
  lightMode: { en: 'Light Mode', vi: 'Chế độ sáng' },
  managePreferences: { en: 'Manage your account preferences', vi: 'Quản lý tùy chọn tài khoản' },
  account: { en: 'Account', vi: 'Tài khoản' },
  editProfile: { en: 'Edit Profile', vi: 'Chỉnh sửa hồ sơ' },
  updatePersonalInfo: { en: 'Update your personal information', vi: 'Cập nhật thông tin cá nhân' },
  emailAddress: { en: 'Email Address', vi: 'Địa chỉ email' },
  changePassword: { en: 'Change Password', vi: 'Đổi mật khẩu' },
  updatePassword: { en: 'Update your password', vi: 'Cập nhật mật khẩu' },
  privacy: { en: 'Privacy', vi: 'Quyền riêng tư' },
  privateAccount: { en: 'Private Account', vi: 'Tài khoản riêng tư' },
  onlyFollowers: { en: 'Only followers can see your posts', vi: 'Chỉ người theo dõi mới xem được bài viết' },
  activityStatus: { en: 'Activity Status', vi: 'Trạng thái hoạt động' },
  showOnline: { en: 'Show when you are online', vi: 'Hiển thị khi bạn trực tuyến' },
  readReceipts: { en: 'Read Receipts', vi: 'Xác nhận đã đọc' },
  letOthersKnow: { en: 'Let others know you have read their messages', vi: 'Cho người khác biết bạn đã đọc tin nhắn' },
  notificationsTitle: { en: 'Notifications', vi: 'Thông báo' },
  pushNotifications: { en: 'Push Notifications', vi: 'Thông báo đẩy' },
  receivePush: { en: 'Receive push notifications', vi: 'Nhận thông báo đẩy' },
  emailNotifications: { en: 'Email Notifications', vi: 'Thông báo email' },
  receiveEmail: { en: 'Receive email updates', vi: 'Nhận cập nhật qua email' },
  likes: { en: 'Likes', vi: 'Lượt thích' },
  notifyLikes: { en: 'Notify when someone likes your post', vi: 'Thông báo khi có người thích bài viết' },
  comments: { en: 'Comments', vi: 'Bình luận' },
  notifyComments: { en: 'Notify when someone comments', vi: 'Thông báo khi có người bình luận' },
  newFollowers: { en: 'New Followers', vi: 'Người theo dõi mới' },
  notifyFollowers: { en: 'Notify when someone follows you', vi: 'Thông báo khi có người theo dõi bạn' },
  sounds: { en: 'Notification Sounds', vi: 'Âm thanh thông báo' },
  playSounds: { en: 'Play sound for notifications', vi: 'Phát âm thanh khi có thông báo' },
  appearance: { en: 'Appearance', vi: 'Giao diện' },
  toggleTheme: { en: 'Toggle dark/light theme', vi: 'Chuyển đổi chế độ tối/sáng' },
  language: { en: 'Language', vi: 'Ngôn ngữ' },
  switchLanguage: { en: 'Switch between English and Vietnamese', vi: 'Chuyển đổi giữa Tiếng Anh và Tiếng Việt' },
  english: { en: 'EN', vi: 'EN' },
  vietnamese: { en: 'VI', vi: 'VI' },
  device: { en: 'Device', vi: 'Thiết bị' },
  linkedDevices: { en: 'Linked Devices', vi: 'Thiết bị đã liên kết' },
  manageDevices: { en: 'Manage your logged-in devices', vi: 'Quản lý các thiết bị đã đăng nhập' },
  support: { en: 'Support', vi: 'Hỗ trợ' },
  helpCenter: { en: 'Help Center', vi: 'Trung tâm trợ giúp' },
  getHelp: { en: 'Get help and support', vi: 'Nhận trợ giúp và hỗ trợ' },
  logOut: { en: 'Log Out', vi: 'Đăng xuất' },
  signOut: { en: 'Sign out of your account', vi: 'Đăng xuất khỏi tài khoản' },
  forYou: { en: 'For You', vi: 'Dành cho bạn' },
  following: { en: 'Following', vi: 'Đang theo dõi' },
  whatsTheVibe: { en: "What's the vibe?", vi: 'Bạn đang nghĩ gì?' },
  exploreWorld: { en: 'Explore your world', vi: 'Khám phá thế giới' },
  discoverTrending: { en: 'Discover trending content and connect with new communities', vi: 'Khám phá nội dung xu hướng và kết nối với cộng đồng mới' },
  searchPlaceholder: { en: 'Search posts, hashtags, or people...', vi: 'Tìm kiếm bài viết, hashtag hoặc người dùng...' },
  topCategories: { en: 'Top Categories', vi: 'Danh mục hàng đầu' },
  allCategories: { en: 'All Categories', vi: 'Tất cả danh mục' },
  trendingHashtags: { en: 'Trending Hashtags', vi: 'Hashtag xu hướng' },
  posts: { en: 'posts', vi: 'bài viết' },
  noPostsFound: { en: 'No posts found', vi: 'Không tìm thấy bài viết' },
  trySearching: { en: 'Try searching for something else or select a different category', vi: 'Thử tìm kiếm nội dung khác hoặc chọn danh mục khác' },
  selectConversation: { en: 'Select a conversation', vi: 'Chọn cuộc trò chuyện' },
  chooseConversation: { en: 'Choose a conversation from the list to start messaging', vi: 'Chọn cuộc trò chuyện từ danh sách để bắt đầu nhắn tin' },
  typeMessage: { en: 'Type a message...', vi: 'Nhập tin nhắn...' },
  createGroup: { en: 'Create Group', vi: 'Tạo nhóm' },
  searchConversations: { en: 'Search conversations...', vi: 'Tìm kiếm cuộc trò chuyện...' },
  online: { en: 'Online', vi: 'Trực tuyến' },
  offline: { en: 'Offline', vi: 'Ngoại tuyến' },
  editProfileBtn: { en: 'Edit Profile', vi: 'Chỉnh sửa' },
  follow: { en: 'Follow', vi: 'Theo dõi' },
  followers: { en: 'Followers', vi: 'Người theo dõi' },
  liked: { en: 'Liked', vi: 'Đã thích' },
  saved: { en: 'Saved', vi: 'Đã lưu' },
  close: { en: 'Close', vi: 'Đóng' },
  showMore: { en: 'Show more', vi: 'Xem thêm' },
  trendingNow: { en: 'Trending Now', vi: 'Xu hướng' },
  whoToFollow: { en: 'Who to Follow', vi: 'Gợi ý theo dõi' },
  writeComment: { en: 'Write a comment...', vi: 'Viết bình luận...' },
  viewAllComments: { en: 'View all comments', vi: 'Xem tất cả bình luận' },
  like: { en: 'Like', vi: 'Thích' },
  reply: { en: 'Reply', vi: 'Trả lời' },
  share: { en: 'Share', vi: 'Chia sẻ' },
  post: { en: 'Post', vi: 'Đăng' },
  createPost: { en: 'Create Post', vi: 'Tạo bài viết' },
  termsOfService: { en: 'Terms of Service', vi: 'Điều khoản dịch vụ' },
  privacyPolicy: { en: 'Privacy Policy', vi: 'Chính sách bảo mật' },
  cookiePolicy: { en: 'Cookie Policy', vi: 'Chính sách cookie' },
  accessibility: { en: 'Accessibility', vi: 'Trợ năng' },
  adsInfo: { en: 'Ads Info', vi: 'Thông tin quảng cáo' },
  about: { en: 'About', vi: 'Giới thiệu' },
  searchSkyline: { en: 'Search Skyline', vi: 'Tìm kiếm Skyline' },
  allPosts: { en: 'All Posts', vi: 'Tất cả bài viết' },
};

interface LanguageContextType {
  language: Language;
  isVie: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'vi')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('language', language);
  }, [language, mounted]);

  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => prev === 'en' ? 'vi' : 'en');
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback((key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language];
  }, [language]);

  const isVie = language === 'vi';

  return (
    <LanguageContext.Provider value={{ language, isVie, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}   