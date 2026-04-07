import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ICONS } from '../../constants/icons';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';

export default function FloatingMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { totalCount } = useCart();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleProtectedNavigation = (path, e) => {
    e.preventDefault();
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login', { state: { from: path } });
    } else {
      navigate(path);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="lg:hidden fixed bottom-24 right-4 flex flex-col gap-2.5 z-[45]">
      {/* KakaoTalk Button */}
      <a
        href="https://pf.kakao.com" // Replace with actual KakaoTalk channel URL
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#FEE500] shadow-lg rounded-full flex items-center justify-center border border-black/5 transition-all transform active:scale-95"
      >
        <ICONS.kakaoPay className="text-[24px] text-black" />
      </a>

      {/* 1:1 Inquiry Button */}
      <button
        onClick={() => navigate('/customer-service')}
        className="w-12 h-12 bg-white/90 backdrop-blur shadow-lg rounded-full flex items-center justify-center border border-black/5 hover:bg-white transition-all transform active:scale-95 text-black/70 flex flex-col items-center justify-center pt-0.5"
      >
        <span className="text-[10px] font-black leading-none">1:1</span>
        <span className="text-[8px] font-bold leading-none mt-0.5">문의</span>
      </button>

      {/* Top Button - Only visible after scrolling */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-black/90 text-white shadow-lg rounded-full flex items-center justify-center border border-white/10 hover:bg-black transition-all animate-in fade-in slide-in-from-bottom-2"
        >
          <ICONS.chevronLeft className="text-[18px] rotate-90" />
        </button>
      )}
    </div>
  );
}
