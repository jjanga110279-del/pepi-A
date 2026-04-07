import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Ticket, 
  Coins, 
  Settings, 
  Headphones,
  ChevronRight,
  Search,
  Calendar,
  MapPin,
  ClipboardList
} from 'lucide-react';

export default function OrderHistory() {
  const { orders, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/order-history' } });
    }
  }, [user, navigate]);

  if (!user) return null;

  const [currentTab, setCurrentTab] = useState('주문 내역');
  const [dateRange, setDateRange] = useState('3개월');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-03-31');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      alert(`검색 실행: ${startDate} ~ ${endDate}, 검색어: ${searchQuery}`);
    }
  };

  const sideMenu = [
    { name: '프로필', path: '/mypage', icon: User, active: false },
    { name: '주문/결재 내역', path: '/order-history', icon: ShoppingBag, active: true },
    { name: '주소록 관리', path: '/address-book', icon: MapPin, active: false },
    { name: '관심 상품', path: '/wishlist', icon: Heart, active: false },
    { name: '내 리뷰관리', path: '/my-reviews', icon: ClipboardList, active: false },
    { name: '쿠폰', path: '/coupons', icon: Ticket, active: false },
    { name: '포인트', path: '/points', icon: Coins, active: false },
    { name: '설정', path: '/settings', icon: Settings, active: false },
    { name: '고객 센터', path: '/customer-service', icon: Headphones, active: false },
  ];

  const returnItems = [
    {
      id: 'R20240320-001102',
      date: '2024.03.20',
      name: '프리미엄 캐시미어 가디건',
      color: 'Beige',
      option: 'Free',
      quantity: 1,
      price: '189,000원',
      status: '반품완료',
      reason: '사이즈 부적합',
      refundDate: '2024.03.22',
      collectionDate: '완료',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=200&auto=format&fit=crop'
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
              <Link key={idx} to={sub.path} className={`flex items-center gap-4 text-[16px] font-medium transition-colors group text-left ${sub.active ? 'text-[#dc2626]' : 'text-[#737373] hover:text-[#dc2626]'}`}>
                <span className={`w-5 h-5 flex items-center justify-center transition-all ${sub.active ? 'grayscale-0 opacity-100' : 'grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100'}`}>
                  <sub.icon size={20} strokeWidth={sub.active ? 2.5 : 2} />
                </span>
                {sub.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-grow min-w-0">
          {/* Mobile MyPage Navigation */}
          <div className="md:hidden overflow-x-auto no-scrollbar -mx-4 px-4 mb-8">
            <div className="flex gap-2 pb-2">
              {sideMenu.map((sub, idx) => (
                <Link key={idx} to={sub.path} className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold transition-all ${sub.active ? 'bg-[#1b1d0e] text-white shadow-md' : 'bg-gray-100 text-black/40'}`}><sub.icon size={14} />{sub.name}</Link>
              ))}
            </div>
          </div>

          <h1 className="text-[28px] md:text-[36px] font-bold text-[#000000] font-hei mb-10">주문/결재 내역</h1>

          {/* Tabs */}
          <nav className="flex gap-6 md:gap-10 border-b border-black/5 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
            {['주문 내역', '결제 내역', '반품/교환 내역'].map((tab) => (
              <button key={tab} onClick={() => setCurrentTab(tab)} className={`pb-4 text-[16px] md:text-[18px] transition-all whitespace-nowrap ${currentTab === tab ? 'font-bold text-[#9C3F00] border-b-2 border-[#9C3F00]' : 'font-medium text-black/40 hover:text-black'}`}>{tab}</button>
            ))}
          </nav>

          <div className="flex flex-col gap-8">
            {currentTab === '주문 내역' && orders.map((order) => (
              <div key={order.id} className="flex flex-col gap-4">
                {order.items.map((product, pIdx) => (
                  <article key={`${order.id}-${pIdx}`} className="w-full border border-black/10 rounded-2xl overflow-hidden bg-white shadow-sm">
                    <div className="bg-[#F9FAFB] h-12 px-4 flex items-center justify-between border-b border-black/5">
                      <span className="text-[11px] font-medium text-black/60 font-sans whitespace-nowrap truncate mr-2">
                        {order.date} <span className="mx-1.5 text-black/5">|</span> No. {order.id}
                      </span>
                      <Link to={`/order-detail/${order.id}`} className="text-[11px] font-bold text-black/40 whitespace-nowrap shrink-0">상세보기</Link>
                    </div>
                    <div className="p-4 flex gap-4 items-center">
                      <div className="w-[70px] h-[90px] rounded-lg overflow-hidden bg-[#F5F5F5] shrink-0 border border-black/5">
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow min-w-0 flex flex-col gap-1">
                        <span className="text-[12px] font-bold text-[#9C3F00] whitespace-nowrap">{product.status}</span>
                        <h3 className="text-[15px] font-bold text-black truncate whitespace-nowrap">{product.name}</h3>
                        <p className="text-[11px] font-medium text-black/40 whitespace-nowrap truncate">
                          {product.color} / {product.size || product.option}
                        </p>
                        <span className="text-[15px] font-bold text-black whitespace-nowrap">₩{product.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="px-4 pb-4 flex gap-2">
                      {product.status === '배송완료' && (
                        <Link to={`/write-review/${product.id}`} state={{ product }} className="flex-1 h-10 rounded-full text-[12px] font-bold border border-[#9C3F00] text-[#9C3F00] flex items-center justify-center whitespace-nowrap">리뷰작성</Link>
                      )}
                      <Link to="/mypage" className="flex-1 h-10 rounded-full text-[12px] font-bold border border-black/10 text-black flex items-center justify-center whitespace-nowrap">배송조회</Link>
                      <Link to={`/return-request/${order.id}/${product.id}`} className="flex-1 h-10 rounded-full text-[12px] font-bold border border-black/10 text-black flex items-center justify-center whitespace-nowrap">교환/반품</Link>
                    </div>
                  </article>
                ))}
              </div>
            ))}

            {currentTab === '결제 내역' && orders.map((payment) => (
              <article key={payment.id} className="w-full border border-black/10 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="bg-[#F9FAFB] h-12 px-4 flex items-center justify-between border-b border-black/5">
                  <span className="text-[11px] font-medium text-black/60 font-sans whitespace-nowrap truncate mr-2">
                    결제: {payment.date} <span className="mx-1.5 text-black/5">|</span> No. {payment.id}
                  </span>
                  <button className="text-[11px] font-bold text-[#9C3F00] whitespace-nowrap shrink-0">영수증</button>
                </div>
                <div className="p-4 flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-xl overflow-hidden bg-[#F5F5F5] shrink-0 border border-black/5">
                    <img src={payment.items[0].image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-[15px] font-bold text-black truncate whitespace-nowrap">
                      {payment.items[0].name} {payment.items.length > 1 ? `외 ${payment.items.length - 1}건` : ''}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[12px] text-black/40 whitespace-nowrap">{payment.paymentDetail}</span>
                      <span className="text-[12px] font-bold text-[#9C3F00] whitespace-nowrap">결제완료</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-black/30 font-bold leading-none mb-1">총 결제액</p>
                    <span className="text-[16px] font-bold text-black whitespace-nowrap">₩{payment.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </article>
            ))}

            {currentTab === '반품/교환 내역' && returnItems.map((ret) => (
              <article key={ret.id} className="w-full border border-black/10 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="bg-[#F9FAFB] h-12 px-4 flex items-center justify-between border-b border-black/5">
                  <span className="text-[11px] font-medium text-black/60 font-sans whitespace-nowrap truncate mr-2">
                    접수: {ret.date} <span className="mx-1.5 text-black/5">|</span> No. {ret.id}
                  </span>
                  <button className="text-[11px] font-bold text-black/40 whitespace-nowrap shrink-0">진행상세</button>
                </div>
                <div className="p-4 flex gap-4 items-center">
                  <div className="w-[70px] h-[90px] rounded-lg overflow-hidden bg-[#F5F5F5] shrink-0 border border-black/5">
                    <img src={ret.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0 flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold text-[#dc2626] whitespace-nowrap">{ret.status}</span>
                      <span className="text-[11px] text-black/40 truncate whitespace-nowrap">/ {ret.reason}</span>
                    </div>
                    <h3 className="text-[15px] font-bold text-black truncate whitespace-nowrap">{ret.name}</h3>
                    <p className="text-[11px] text-black/40 whitespace-nowrap truncate">
                      {ret.color} / {ret.option} / {ret.quantity}개
                    </p>
                    <div className="flex items-center gap-3 mt-1 overflow-hidden">
                      <span className="text-[10px] text-black/30 whitespace-nowrap">환불완료: {ret.refundDate}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-black/30 font-bold leading-none mb-1">환불액</p>
                    <span className="text-[16px] font-bold text-black whitespace-nowrap">{ret.price}</span>
                  </div>
                </div>
              </article>
            ))}

            <div className="mt-8 flex justify-center pb-10">
               <button className="px-10 py-3 rounded-full bg-gray-50 text-[13px] font-bold text-black/40 hover:bg-gray-100 transition-all border border-black/5">더보기</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
