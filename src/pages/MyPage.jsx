import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import { ICONS } from '../constants/icons';
import { 
  User, 
  ShoppingBag, 
  Heart as LucideHeart, 
  Ticket, 
  Coins, 
  Settings, 
  Headphones,
  ChevronRight,
  CreditCard,
  ClipboardList,
  Truck,
  CheckCircle,
  MapPin
} from 'lucide-react';

export default function MyPage() {
  const { user, orders } = useUser();
  const navigate = useNavigate();
  
  // Recent products like state
  const [likedItems, setLikedItems] = useState({});

  const toggleLike = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/mypage' } });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (location.hash === '#delivery-status') {
      const scrollToSection = () => {
        const element = document.getElementById('delivery-status');
        if (element) {
          const yOffset = -150; // Extra offset to position it lower than the header
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };
      // Try twice to ensure layout is ready
      setTimeout(scrollToSection, 100);
      setTimeout(scrollToSection, 500);
    }
  }, [location]);

  if (!user) return null;

  const orderStats = {
    paymentDone: 0,
    preparing: 0,
    shipping: 0,
    delivered: 0
  };

  orders.forEach(order => {
    order.items.forEach(item => {
      if (item.status === '결제완료' || item.status === '주문 확인 중') orderStats.paymentDone++;
      else if (item.status === '상품준비중') orderStats.preparing++;
      else if (item.status === '배송중') orderStats.shipping++;
      else if (item.status === '배송완료') orderStats.delivered++;
    });
  });

  const sideMenu = [
    { name: '프로필', path: '/mypage', icon: User, active: true },
    { name: '주문/결재 내역', path: '/order-history', icon: ShoppingBag, active: false },
    { name: '주소록 관리', path: '/address-book', icon: MapPin, active: false },
    { name: '관심 상품', path: '/wishlist', icon: LucideHeart, active: false },
    { name: '내 리뷰관리', path: '/my-reviews', icon: ClipboardList, active: false },
    { name: '쿠폰', path: '/coupons', icon: Ticket, active: false },
    { name: '포인트', path: '/points', icon: Coins, active: false },
    { name: '설정', path: '/settings', icon: Settings, active: false },
    { name: '고객 센터', path: '/customer-service', icon: Headphones, active: false },
  ];

  const recentProducts = [
    {
      id: 'recent-1',
      brand: 'Atelier Selection',
      name: '조각적인 울 아뜰리에 코트',
      price: '₩458,000',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'recent-2',
      brand: 'Seasonal Glow',
      name: '리퀴드 실크 바이어스 컷 가운',
      price: '₩289,000',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
    }
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
        <div className="flex-grow">
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

          {/* Section: User Summary & My Wallet */}
          <section className="flex flex-col lg:flex-row justify-between items-stretch border-b border-black/5 pb-8 md:pb-16 mb-8 md:mb-16 gap-4 md:gap-12">
            {/* User Profile Info */}
            <div className="flex-1 flex items-center gap-4 md:gap-8 py-6 md:py-[69px] px-4 md:px-0 bg-gray-50/50 md:bg-transparent rounded-3xl md:rounded-none">
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-black/5 flex items-center justify-center overflow-hidden bg-white shrink-0">
                 <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <div className="flex items-center gap-2 md:gap-4">
                  <h1 className="text-xl md:text-[36px] font-bold text-black font-hei leading-none">{user.name}</h1>
                  <span className="border border-black rounded-full px-2 py-0.5 md:px-4 md:py-1 text-[8px] md:text-[10px] font-bold tracking-tight uppercase">{user.rank}</span>
                </div>
                <p className="text-[12px] md:text-[14px] font-medium text-black/60 font-sans truncate max-w-[150px] md:max-w-none">{user.email}</p>
                <div className="mt-1">
                  <Link to="/edit-profile" className="text-[11px] md:text-[12px] font-bold text-black border-b border-black pb-0.5 font-hei hover:text-[#dc2626] hover:border-[#dc2626] transition-colors">정보 수정</Link>
                </div>
              </div>
            </div>

            {/* MY WALLET */}
            <div className="flex-1 md:w-[305px] h-auto md:h-[265px] bg-[#FAFAFA]/50 border border-black/5 rounded-3xl md:rounded-[48px] p-6 md:p-[41px] flex flex-col justify-between">
              <div className="flex flex-col gap-2 md:gap-4">
                <span className="text-[10px] font-bold text-black/40 font-sans tracking-tight uppercase">My Benefits</span>
                <div className="flex items-baseline gap-1 md:gap-2">
                  <span className="text-2xl md:text-[36px] font-bold text-[#9C3F00] font-serif leading-none tracking-tight">12,450</span>
                  <span className="text-[12px] md:text-[14px] font-bold text-black/60 font-sans">P</span>
                </div>
              </div>
              <div className="pt-4 md:pt-[40px] border-t border-black/5 flex items-center md:items-end justify-between">
                <div className="flex flex-col gap-0.5 md:gap-1">
                  <span className="text-[10px] text-black/40 font-hei">보유 쿠폰</span>
                  <span className="text-lg md:text-[20px] font-bold text-black font-sans leading-none">04</span>
                </div>
                <Link to="/coupons" className="px-4 py-2 md:px-5 md:py-2.5 bg-white border border-black/10 rounded-full text-[10px] md:text-[11px] font-bold text-black hover:bg-gray-200 transition-all font-hei">
                  더보기
                </Link>
              </div>
            </div>
          </section>

          {/* Section: Order Status Dashboard */}
          <section id="delivery-status" className="border-b border-black/5 pb-8 md:pb-16 mb-8 md:mb-16 scroll-mt-40">
            <div className="flex items-center justify-between mb-6 md:min-h-[40px]">
              <h3 className="text-lg md:text-[18px] font-bold text-black font-hei">주문/배송조회</h3>
              <Link to="/order-history" className="flex items-center gap-1 text-black/40 hover:text-black transition-colors group">
                <span className="text-[11px] md:text-[12px] font-bold font-hei">전체 보기</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            
            <div className="bg-white border border-black/5 rounded-3xl md:rounded-[48px] overflow-hidden grid grid-cols-4 md:flex">
              {[
                { label: '결제완료', icon: CreditCard, count: orderStats.paymentDone },
                { label: '상품준비', icon: ClipboardList, count: orderStats.preparing },
                { label: '배송중', icon: Truck, count: orderStats.shipping },
                { label: '배송완료', icon: CheckCircle, count: orderStats.delivered }
              ].map((item, idx) => (
                <div key={idx} className={`flex flex-col items-center justify-center py-6 md:py-10 gap-2 md:gap-4 group cursor-pointer hover:bg-[#FAFAFA] transition-colors border-r border-black/5 last:border-r-0 md:flex-1 ${idx === 3 ? 'bg-[#FAFAFA]/30' : ''}`}>
                  <item.icon size={18} className="text-black/20 group-hover:text-black transition-colors md:w-6 md:h-6" />
                  <div className="text-center">
                    <p className="text-[10px] md:text-[12px] font-bold text-black/40 mb-0.5 md:mb-1 font-hei break-keep">{item.label}</p>
                    <p className="text-base md:text-xl font-bold font-sans">{item.count}</p>
                  </div>
                  {idx === 3 && (
                    <button className="mt-1 md:mt-2 px-3 py-1 md:px-6 md:py-1.5 bg-white border border-black/10 rounded-full text-[9px] md:text-[11px] font-bold font-hei text-black hover:bg-gray-200 transition-all shadow-sm whitespace-nowrap">구매확정</button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section: Recent Products */}
          <section>
            <div className="flex items-center justify-between mb-6 md:mb-10">
              <h3 className="text-xl md:text-[24px] font-bold text-black font-hei">최근 본 상품</h3>
              <Link to="/wishlist" className="text-[11px] md:text-[13px] font-bold text-black/40 cursor-pointer hover:text-black transition-colors font-hei">모두보기</Link>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex flex-col gap-2 md:gap-4 group cursor-pointer">
                  <div className="w-full aspect-[3/4] bg-[#FAFAFA] rounded-3xl md:rounded-[48px] overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <button 
                      onClick={(e) => toggleLike(product.id, e)}
                      className="absolute top-3 right-3 md:top-6 md:right-6 z-20 hover:scale-110 transition-transform drop-shadow-md"
                    >
                      {likedItems[product.id] ? (
                        <ICONS.heartFilled className="text-[#dc2626] text-[18px] md:text-[24px]" />
                      ) : (
                        <ICONS.heart className="text-white text-[18px] md:text-[24px] brightness-0 invert" />
                      )}
                    </button>
                  </div>
                  <div className="flex flex-col gap-0.5 md:gap-1 px-2 md:px-4">
                    <span className="text-[8px] md:text-[10px] font-bold text-black/40 uppercase tracking-wider font-sans">{product.brand}</span>
                    <h4 className="text-sm md:text-[18px] font-bold text-black font-hei leading-tight line-clamp-1">{product.name}</h4>
                    <span className="text-sm md:text-[18px] font-bold text-black font-sans">{product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
