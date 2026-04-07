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
          <section className="flex flex-col xl:flex-row justify-between items-start border-b border-black/5 pb-16 mb-16 gap-12">
            <div className="flex items-center gap-8 py-[69px]">
              <div className="w-32 h-32 rounded-full border border-black/5 flex items-center justify-center overflow-hidden bg-gray-50">
                 <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <h1 className="text-[36px] font-bold text-black font-hei leading-none">{user.name}</h1>
                  <span className="border border-black rounded-full px-4 py-1 text-[10px] font-bold tracking-tight uppercase">{user.rank}</span>
                </div>
                <p className="text-[14px] font-medium text-black/60 font-sans">{user.email}</p>
                <div className="mt-2">
                  <Link to="/edit-profile" className="text-[12px] font-bold text-black border-b border-black pb-0.5 font-hei hover:text-[#dc2626] hover:border-[#dc2626] transition-colors">회원 정보 수정</Link>
                </div>
              </div>
            </div>

            {/* MY WALLET */}
            <div className="w-[305px] h-[265px] bg-[#FAFAFA]/50 border border-black/5 rounded-[48px] p-[41px] flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold text-black/40 font-sans tracking-tight uppercase">My Benefits</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[36px] font-bold text-[#9C3F00] font-serif leading-none tracking-tight">12,450</span>
                  <span className="text-[14px] font-bold text-black/60 font-sans">P</span>
                </div>
              </div>
              <div className="pt-[40px] border-t border-black/5 flex items-end justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-black/40 font-hei">보유 쿠폰</span>
                  <span className="text-[20px] font-bold text-black font-sans leading-none">04</span>
                </div>
                <Link to="/coupons" className="px-5 py-2.5 bg-white border border-black/10 rounded-full text-[11px] font-bold text-black hover:bg-gray-200 transition-all font-hei">
                  혜택 더보기
                </Link>
              </div>
            </div>
          </section>

          {/* Section: Order Status Dashboard */}
          <section id="delivery-status" className="border-b border-black/5 pb-16 mb-16 scroll-mt-40">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-[18px] font-bold text-black font-hei">주문/배송조회</h3>
              <Link to="/order-history" className="flex items-center gap-1 text-black/40 hover:text-black transition-colors group">
                <span className="text-[12px] font-bold font-hei">전체 주문 보기</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            
            <div className="bg-white border border-black/5 rounded-[48px] overflow-hidden flex flex-col md:flex-row">
              {[
                { label: '결제 완료', icon: CreditCard, count: orderStats.paymentDone },
                { label: '상품 준비 중', icon: ClipboardList, count: orderStats.preparing },
                { label: '배송 중', icon: Truck, count: orderStats.shipping }
              ].map((item, idx) => (
                <div key={idx} className="flex-1 border-b md:border-b-0 md:border-r border-black/5 flex flex-col items-center justify-center py-10 gap-4 group cursor-pointer hover:bg-[#FAFAFA] transition-colors">
                  <item.icon size={24} className="text-black/20 group-hover:text-black transition-colors" />
                  <div className="text-center">
                    <p className="text-[12px] font-bold text-black/40 mb-1 font-hei">{item.label}</p>
                    <p className="text-xl font-bold font-sans">{item.count}</p>
                  </div>
                </div>
              ))}
              
              <div className="flex-[1.5] flex flex-col items-center justify-center py-10 gap-4 bg-[#FAFAFA]/30 p-8">
                <CheckCircle size={24} className="text-black/20" />
                <div className="text-center mb-2">
                  <p className="text-[12px] font-bold text-black/40 mb-1 font-hei">배송 완료</p>
                  <p className="text-xl font-bold font-sans">{orderStats.delivered}</p>
                </div>
                <div className="flex justify-center">
                  <button className="px-8 py-2 bg-white border border-black/10 rounded-full text-[12px] font-bold font-hei text-black hover:bg-gray-200 transition-all shadow-sm">구매확정</button>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Recent Products */}
          <section>
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-[24px] font-bold text-black font-hei">최근 본 상품</h3>
              <Link to="/wishlist" className="text-[13px] font-bold text-black/40 cursor-pointer hover:text-black transition-colors font-hei">관심 상품 모두보기</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex flex-col gap-4 group cursor-pointer">
                  <div className="w-full aspect-[3/4] bg-[#FAFAFA] rounded-[48px] overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <button 
                      onClick={(e) => toggleLike(product.id, e)}
                      className="absolute top-6 right-6 z-20 hover:scale-110 transition-transform drop-shadow-md"
                    >
                      {likedItems[product.id] ? (
                        <ICONS.heartFilled className="text-[#dc2626] text-[24px]" />
                      ) : (
                        <ICONS.heart className="text-white text-[24px] brightness-0 invert" />
                      )}
                    </button>
                  </div>
                  <div className="flex flex-col gap-1 px-4">
                    <span className="text-[10px] font-bold text-black/40 uppercase tracking-wider font-sans">{product.brand}</span>
                    <h4 className="text-[18px] font-bold text-black font-hei leading-tight">{product.name}</h4>
                    <span className="text-[18px] font-bold text-black font-sans">{product.price}</span>
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
