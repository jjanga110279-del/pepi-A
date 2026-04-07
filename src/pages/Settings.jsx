import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Layout from '../components/common/Layout';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Ticket, 
  Coins, 
  Settings as SettingsIcon, 
  Headphones,
  Bell,
  Lock,
  ShieldCheck,
  Smartphone,
  LogOut,
  ChevronRight,
  ToggleLeft as ToggleOff,
  ToggleRight as ToggleOn,
  ClipboardList,
  MapPin
} from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    push: true,
    sms: false,
    email: true,
    marketing: false
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sideMenu = [
    { name: '프로필', path: '/mypage', icon: User, active: false },
    { name: '주문/결재 내역', path: '/order-history', icon: ShoppingBag, active: false },
    { name: '주소록 관리', path: '/address-book', icon: MapPin, active: false },
    { name: '관심 상품', path: '/wishlist', icon: Heart, active: false },
    { name: '내 리뷰관리', path: '/my-reviews', icon: ClipboardList, active: false },
    { name: '쿠폰', path: '/coupons', icon: Ticket, active: false },
    { name: '포인트', path: '/points', icon: Coins, active: false },
    { name: '설정', path: '/settings', icon: SettingsIcon, active: true },
    { name: '고객 센터', path: '/customer-service', icon: Headphones, active: false },
  ];

  return (
    <Layout>
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-10 md:py-20 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-[260px] shrink-0 border-r border-black/5 pr-12 hidden md:block">
          <h2 className="text-2xl font-bold text-[#1b1d0e] font-serif mb-10 lowercase tracking-tight">my page categories</h2>
          <nav className="flex flex-col gap-6">
            {sideMenu.map((sub, idx) => (
              <Link 
                key={idx} 
                to={sub.path}
                className={`flex items-center gap-4 text-[16px] font-medium transition-colors group text-left ${sub.active ? 'text-[#dc2626]' : 'text-[#737373] hover:text-[#dc2626]'}`}
              >
                <span className={`w-5 h-5 flex items-center justify-center transition-all ${sub.active ? 'grayscale-0 opacity-100' : 'grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100'}`}>
                  <sub.icon size={20} strokeWidth={sub.active ? 2.5 : 2} />
                </span>
                {sub.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-grow max-w-4xl">
          {/* Mobile MyPage Navigation */}
          <div className="md:hidden overflow-x-auto no-scrollbar -mx-4 px-4 mb-8">
            <div className="flex gap-2 pb-2">
              {sideMenu.map((sub, idx) => (
                <Link 
                  key={idx} 
                  to={sub.path}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold transition-all ${sub.active ? 'bg-[#1b1d0e] text-white shadow-md' : 'bg-gray-100 text-black/40'}`}
                >
                  <sub.icon size={14} />
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>

          <h1 className="text-[36px] font-bold text-[#000000] font-hei mb-10">설정</h1>

          {/* Section: Notifications */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Bell size={20} className="text-[#9C3F00]" />
              <h3 className="text-[20px] font-bold text-black font-hei">알림 설정</h3>
            </div>
            
            <div className="bg-[#FAFAFA] rounded-[32px] border border-black/5 overflow-hidden">
              {[
                { key: 'push', label: '푸시 알림', desc: '주문, 배송, 활동 내역 등 주요 알림을 받습니다.' },
                { key: 'sms', label: 'SMS 알림', desc: '이벤트 및 혜택 정보를 문자로 받습니다.' },
                { key: 'email', label: '이메일 알림', desc: '뉴스레터 및 공지사항을 메일로 받습니다.' },
                { key: 'marketing', label: '마케팅 정보 수신 동의', desc: '맞춤형 혜택과 이벤트 정보를 수신합니다.' }
              ].map((item, idx) => (
                <div key={item.key} className={`flex items-center justify-between p-8 ${idx !== 3 ? 'border-b border-black/5' : ''}`}>
                  <div className="flex flex-col gap-1">
                    <span className="text-[16px] font-bold text-black font-hei">{item.label}</span>
                    <span className="text-[13px] text-black/40 font-sans">{item.desc}</span>
                  </div>
                  <button 
                    onClick={() => toggleNotification(item.key)}
                    className="transition-all transform hover:scale-110"
                  >
                    {notifications[item.key] ? (
                      <ToggleOn size={44} className="text-[#9C3F00] stroke-[1.5px]" />
                    ) : (
                      <ToggleOff size={44} className="text-black/10 stroke-[1.5px]" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Account & Privacy */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <ShieldCheck size={20} className="text-[#9C3F00]" />
              <h3 className="text-[20px] font-bold text-black font-hei">계정 및 보안</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              {[
                { icon: Lock, label: '비밀번호 변경', path: '/edit-profile#password' },
                { icon: Smartphone, label: '휴대폰 번호 변경', path: '/edit-profile#phone' },
                { icon: User, label: '회원 정보 수정', path: '/edit-profile#profile' }
              ].map((item, idx) => (
                <Link 
                  key={idx} 
                  to={item.path}
                  className="flex items-center justify-between p-6 bg-white border border-black/10 rounded-2xl hover:border-black/20 active:bg-gray-50 transition-all group w-full"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-black/40 group-hover:bg-[#9C3F00]/5 group-hover:text-[#9C3F00] transition-colors">
                      <item.icon size={18} />
                    </div>
                    <span className="text-[15px] font-bold text-black font-hei">{item.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-black/20 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </section>

          {/* Section: App Info & Support */}
          <section className="mb-16 pt-12 border-t border-black/5">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between text-[14px]">
                <span className="font-bold text-black/40 font-hei">현재 버전</span>
                <span className="font-sans font-medium text-black/60">v 1.2.4 (최신 버전 사용 중)</span>
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <span className="font-bold text-black/40 font-hei">캐시 데이터 삭제</span>
                <button className="px-4 py-1.5 border border-black/10 rounded-full text-[11px] font-bold hover:bg-gray-100 transition-all">삭제하기</button>
              </div>
            </div>
          </section>

          {/* Bottom Actions */}
          <div className="flex items-center gap-6 pt-8">
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full text-[13px] font-bold text-black/60 hover:bg-black hover:text-white transition-all font-hei">
              <LogOut size={16} />
              로그아웃
            </button>
            <button className="text-[13px] font-bold text-black/20 hover:text-[#dc2626] transition-colors font-hei border-b border-transparent hover:border-[#dc2626] pb-0.5">
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
