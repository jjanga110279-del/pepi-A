import React, { useState } from 'react';
import { Link } from 'react-router';
import Layout from '../components/common/Layout';
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
  Calendar
} from 'lucide-react';

export default function OrderHistory() {
  const [dateRange, setDateRange] = useState('3개월');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-03-31');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      alert(`검색 실행: ${startDate} ~ ${endDate}, 검색어: ${searchQuery}`);
      // 실제 필터링 로직이 들어갈 자리입니다.
    }
  };

  const sideMenu = [
    { name: '프로필', path: '/mypage', icon: User, active: false },
    { name: '주문/결재 내역', path: '/order-history', icon: ShoppingBag, active: true },
    { name: '관심 상품', path: '/wishlist', icon: Heart, active: false },
    { name: '쿠폰', path: '#', icon: Ticket, active: false },
    { name: '포인트', path: '#', icon: Coins, active: false },
    { name: '설정', path: '#', icon: Settings, active: false },
    { name: '고객 센터', path: '/customer-service', icon: Headphones, active: false },
  ];

  const orderSections = [
    {
      title: "주문 내역",
      items: [
        {
          id: '20240325-001234',
          date: '2024.03.25',
          name: '시그니처 울 트라우저',
          color: 'Charcoal',
          option: 'M',
          price: '425,000원',
          status: '배송중',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=200&auto=format&fit=crop',
          buttons: ['리뷰 작성', '반품접수']
        },
        {
          id: '20240320-001102',
          date: '2024.03.20',
          name: '프리미엄 캐시미어 가디건',
          color: 'Beige',
          option: 'Free',
          price: '189,000원',
          status: '배송완료',
          image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=200&auto=format&fit=crop',
          buttons: ['리뷰 작성', '교환접수']
        },
        {
          id: '20240318-001050',
          date: '2024.03.18',
          name: '울 블렌드 싱글 코트',
          color: 'Black',
          option: 'L',
          price: '528,000원',
          status: '배송완료',
          image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=200&auto=format&fit=crop',
          buttons: ['리뷰 작성', '반품접수']
        },
        {
          id: '20240315-000987',
          date: '2024.03.15',
          name: '오버사이즈 코튼 셔츠',
          color: 'White',
          option: 'L',
          price: '89,000원',
          status: '배송완료',
          image: 'https://images.unsplash.com/photo-1598033129183-c4f50c717658?q=80&w=200&auto=format&fit=crop',
          buttons: ['리뷰 작성', '교환접수']
        },
        {
          id: '20240312-000854',
          date: '2024.03.12',
          name: '린넨 블렌드 슬랙스',
          color: 'Navy',
          option: 'S',
          price: '125,000원',
          status: '배송완료',
          image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=200&auto=format&fit=crop',
          buttons: ['리뷰 작성', '반품접수']
        },
        {
          id: '20240310-000721',
          date: '2024.03.10',
          name: '헤비 코튼 스웻셔츠',
          color: 'Gray',
          option: 'M',
          price: '79,000원',
          status: '배송완료',
          image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200&auto=format&fit=crop',
          buttons: ['리뷰 작성', '교환접수']
        }
      ]
    },
    {
      title: "결제 내역",
      items: [
        {
          id: '20240315-000987',
          date: '2024.03.15',
          name: '오버사이즈 코튼 셔츠',
          color: 'White',
          option: 'L',
          price: '89,000원',
          status: '결제완료',
          image: 'https://images.unsplash.com/photo-1598033129183-c4f50c717658?q=80&w=200&auto=format&fit=crop',
          buttons: ['주문취소']
        }
      ]
    },
    {
      title: "반품/교환 내역",
      items: [
        {
          id: '20240310-000854',
          date: '2024.03.10',
          name: '린넨 블렌드 슬랙스',
          color: 'Navy',
          option: 'S',
          price: '125,000원',
          status: '반품완료',
          image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=200&auto=format&fit=crop',
          buttons: ['내역삭제']
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-10 md:py-20 flex flex-col md:flex-row gap-12">
        {/* Sidebar - Synchronized with MyPage */}
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
          <h1 className="text-[36px] font-bold text-[#000000] font-hei mb-10">주문/결제 내역</h1>

          {/* Tabs */}
          <nav className="flex gap-10 border-b border-black/5 mb-8">
            <button className="pb-4 text-[18px] font-bold text-[#9C3F00] border-b-2 border-[#9C3F00]">주문 내역</button>
            <button className="pb-4 text-[18px] font-medium text-black/40 hover:text-black transition-colors">결제 내역</button>
            <button className="pb-4 text-[18px] font-medium text-black/40 hover:text-black transition-colors">반품/교환 내역</button>
          </nav>

          {/* Filters */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-black/10 p-6 mb-12 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex gap-2">
                {['오늘', '1개월', '3개월', '6개월', '1년'].map((range) => (
                  <button 
                    key={range}
                    onClick={() => setDateRange(range)}
                    className={`px-5 py-2 rounded-lg text-[14px] font-medium transition-all ${dateRange === range ? 'bg-[#F5F5F5] text-black' : 'bg-white border border-black/10 text-black/60 hover:border-black/20'}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 px-4 py-2 border border-black/10 rounded-lg bg-white min-w-[340px]">
                <Calendar size={18} className="text-black/40 shrink-0" />
                <div className="flex items-center gap-2 flex-grow">
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    onKeyDown={handleSearch}
                    className="text-[14px] text-black/80 font-sans focus:outline-none bg-transparent cursor-pointer"
                  />
                  <span className="text-black/20">~</span>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    onKeyDown={handleSearch}
                    className="text-[14px] text-black/80 font-sans focus:outline-none bg-transparent cursor-pointer"
                  />
                </div>
              </div>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="주문 번호 또는 상품명으로 검색"
                className="w-full h-12 pl-12 pr-4 bg-white border border-black/10 rounded-lg text-[14px] focus:outline-none focus:border-black/20 transition-all placeholder:text-black/40"
              />
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
            </div>
          </div>

          {/* Orders List */}
          <div className="flex flex-col gap-8">
            {orderSections[0].items.map((order) => (
              <article key={order.id} className="w-full border border-black/10 rounded-2xl overflow-hidden bg-white">
                {/* Order Header */}
                <div className="bg-[#F9FAFB] h-14 px-6 flex items-center justify-between border-b border-black/5">
                  <span className="text-[12px] font-medium text-black/60 font-sans">
                    {order.date} <span className="mx-2 text-black/10">|</span> 주문번호 {order.id}
                  </span>
                  <button className="text-[12px] font-bold text-black/40 hover:text-black transition-colors font-hei">상세보기</button>
                </div>

                {/* Order Body */}
                <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-start gap-6 flex-grow">
                    <div className="w-[96px] h-[128px] rounded-lg overflow-hidden bg-[#F5F5F5] shrink-0 border border-black/5">
                      <img src={order.image} alt={order.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex flex-col gap-2 py-1">
                      <span className="text-[14px] font-bold text-[#9C3F00] font-hei">{order.status}</span>
                      <h3 className="text-[18px] font-bold text-black font-hei leading-tight">{order.name}</h3>
                      <p className="text-[12px] font-bold text-black/40 font-sans uppercase tracking-tight">
                        Color: {order.color} / Size: {order.option}
                      </p>
                      <span className="text-[18px] font-bold text-black font-sans mt-1">{order.price}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                    {order.buttons.map((btn, bIdx) => (
                      <button 
                        key={bIdx}
                        className={`flex-1 md:w-auto px-8 py-3 rounded-full text-[14px] font-bold flex items-center justify-center transition-all font-hei border border-black/10 text-black hover:bg-gray-200`}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            ))}

            {/* Empty State / More Items */}
            <div className="mt-12 flex justify-center">
               <button className="px-8 py-3 rounded-full border border-black/10 text-[14px] font-bold text-black hover:bg-gray-200 transition-all">
                 주문 내역 더보기
               </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
