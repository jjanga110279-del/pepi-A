import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { ICONS } from '../../constants/icons';
import { useUser } from '../../context/UserContext';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const handleProtectedNavigation = (path, e) => {
    e.preventDefault();
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login', { state: { from: path } });
    } else {
      navigate(path);
    }
  };

  const menuItems = [
    { icon: ICONS.wishlist, label: '찜', path: '/wishlist', protected: true },
    { icon: ICONS.home, label: '홈', path: '/' },
    { icon: ICONS.user, label: '마이', path: '/mypage', protected: true }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-black/5 z-[50] safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.label}
              onClick={(e) => item.protected ? handleProtectedNavigation(item.path, e) : navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${isActive ? 'text-[#dc2626]' : 'text-black/40 hover:text-black/60'}`}
            >
              <Icon className={`${isActive ? 'text-[22px]' : 'text-[20px]'}`} />
              <span className="text-[10px] font-bold tracking-tighter">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
