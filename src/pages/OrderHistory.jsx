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

  // 반품 내역은 임시 목데이터 유지 (기능 미구현)
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

          <h1 className="text-[36px] font-bold text-[#000000] font-hei mb-10">주문/결재 내역</h1>

          {/* Tabs */}
          <nav className="flex gap-10 border-b border-black/5 mb-8">
            {['주문 내역', '결제 내역', '반품/교환 내역'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setCurrentTab(tab)}
                className={`pb-4 text-[18px] transition-all ${currentTab === tab ? 'font-bold text-[#9C3F00] border-b-2 border-[#9C3F00]' : 'font-medium text-black/40 hover:text-black'}`}
              >
                {tab}
              </button>
            ))}
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

          {/* Dynamic Content */}
          <div className="flex flex-col gap-8">
            {currentTab === '주문 내역' && (
              <>
                {orders.map((order) => (
                  <div key={order.id} className="flex flex-col gap-4">
                    {order.items.map((product, pIdx) => (
                      <article key={`${order.id}-${pIdx}`} className="w-full border border-black/10 rounded-2xl overflow-hidden bg-white">
                        <div className="bg-[#F9FAFB] h-12 md:h-14 px-4 md:px-6 flex items-center justify-between border-b border-black/5">
                          <span className="text-[11px] md:text-[12px] font-medium text-black/60 font-sans whitespace-nowrap overflow-hidden text-ellipsis">
                            {order.date} <span className="mx-1.5 md:mx-2 text-black/10">|</span> 주문번호 {order.id}
                          </span>
                          <Link to={`/order-detail/${order.id}`} className="text-[11px] md:text-[12px] font-bold text-black/40 hover:text-black transition-colors font-hei shrink-0 ml-2">상세보기</Link>
                        </div>
                        <div className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
                          <div className="flex items-start gap-4 md:gap-6 flex-grow w-full">
                            <div className="w-[80px] md:w-[96px] h-[106px] md:h-[128px] rounded-lg overflow-hidden bg-[#F5F5F5] shrink-0 border border-black/5">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-1 md:gap-2 py-0.5 md:py-1 min-w-0">
                              <span className="text-[13px] md:text-[14px] font-bold text-[#9C3F00] font-hei">{product.status}</span>
                              <h3 className="text-[16px] md:text-[18px] font-bold text-black font-hei leading-tight truncate">{product.name}</h3>
                              <p className="text-[11px] md:text-[12px] font-bold text-black/40 font-sans uppercase tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                                {product.color} / {product.size || product.option}
                              </p>
                              <span className="text-[16px] md:text-[18px] font-bold text-black font-sans mt-0.5 md:mt-1 whitespace-nowrap">₩{product.price.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                            {product.status === '배송완료' && (
                              <Link 
                                to={`/write-review/${product.id}`}
                                state={{ product }}
                                className="flex-1 md:w-auto px-8 py-3 rounded-full text-[14px] font-bold flex items-center justify-center transition-all font-hei border border-[#9C3F00] text-[#9C3F00] hover:bg-[#9C3F00]/5 bg-white"
                              >
                                리뷰 작성하기
                              </Link>
                            )}
                            <Link 
                              to="/mypage"
                              className="flex-1 md:w-auto px-8 py-3 rounded-full text-[14px] font-bold flex items-center justify-center transition-all font-hei border border-black/10 text-black hover:bg-gray-200"
                            >
                              배송조회
                            </Link>
                            {product.status === '접수완료' ? (
                              <Link 
                                to={`/return-detail/${order.id}/${product.id}`}
                                className="flex-1 md:w-auto px-8 py-3 rounded-full text-[14px] font-bold flex items-center justify-center transition-all font-hei bg-[#FAFAFA] border border-black/5 text-[#9C3F00] hover:bg-[#9C3F00]/5"
                              >
                                접수 내역 확인
                              </Link>
                            ) : (
                              <Link 
                                to={`/return-request/${order.id}/${product.id}`}
                                className="flex-1 md:w-auto px-8 py-3 rounded-full text-[14px] font-bold flex items-center justify-center transition-all font-hei border border-black/10 text-black hover:bg-gray-200"
                              >
                                교환/반품 접수
                              </Link>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
                {orders.length === 0 && <div className="py-20 text-center text-black/40 font-hei">주문 내역이 없습니다.</div>}
              </>
            )}

            {currentTab === '결제 내역' && (
              <>
                {orders.map((payment) => (
                  <article key={payment.id} className="w-full border border-black/10 rounded-2xl overflow-hidden bg-white shadow-sm">
                    <div className="bg-[#F9FAFB] h-14 px-6 flex items-center justify-between border-b border-black/5">
                      <span className="text-[12px] font-medium text-black/60 font-sans">
                        결제일시: {payment.date} <span className="mx-2 text-black/10">|</span> 주문번호 {payment.id}
                      </span>
                      <button className="text-[12px] font-bold text-[#9C3F00] hover:underline transition-colors font-hei">영수증 보기</button>
                    </div>
                    <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="flex items-center gap-8 flex-grow">
                        <div className="w-[80px] h-[80px] rounded-2xl overflow-hidden bg-[#F5F5F5] shrink-0 border border-black/5">
                          <img src={payment.items[0].image} alt={payment.items[0].name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-[18px] font-bold text-black font-hei leading-tight">
                            {payment.items[0].name} {payment.items.length > 1 ? `외 ${payment.items.length - 1}건` : ''}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="text-[14px] text-black/40 font-sans">{payment.paymentDetail}</span>
                            <span className="w-1 h-1 bg-black/10 rounded-full" />
                            <span className="text-[14px] font-bold text-[#9C3F00] font-hei">결제완료</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <p className="text-[12px] text-black/40 font-hei mb-1 font-bold">총 결제금액</p>
                        <span className="text-[24px] font-bold text-black font-sans leading-none">₩{payment.totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </article>
                ))}
                {orders.length === 0 && <div className="py-20 text-center text-black/40 font-hei">결제 내역이 없습니다.</div>}
              </>
            )}

            {currentTab === '반품/교환 내역' && (
              <>
                {returnItems.map((ret) => (
                  <article key={ret.id} className="w-full border border-black/10 rounded-2xl overflow-hidden bg-white shadow-sm">
                    <div className="bg-[#F9FAFB] h-14 px-6 flex items-center justify-between border-b border-black/5">
                      <span className="text-[12px] font-medium text-black/60 font-sans">
                        접수일자: {ret.date} <span className="mx-2 text-black/10">|</span> 주문번호 {ret.id}
                      </span>
                      <button className="text-[12px] font-bold text-black/40 hover:text-black transition-colors font-hei">진행상세</button>
                    </div>
                    <div className="p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                      <div className="flex items-start gap-6 flex-grow">
                        <div className="w-[96px] h-[128px] rounded-lg overflow-hidden bg-[#F5F5F5] shrink-0 border border-black/5">
                          <img src={ret.image} alt={ret.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-2 py-1">
                          <div className="flex items-center gap-3">
                            <span className={`text-[14px] font-bold font-hei ${ret.status.includes('완료') ? 'text-black/40' : 'text-[#dc2626]'}`}>{ret.status}</span>
                            <span className="w-px h-3 bg-black/10" />
                            <span className="text-[13px] text-black/60 font-hei">{ret.reason}</span>
                          </div>
                          <h3 className="text-[18px] font-bold text-black font-hei leading-tight">
                            {ret.name} <span className="ml-2 text-[14px] font-normal text-black/40 font-sans">x{ret.quantity}</span>
                          </h3>
                          <p className="text-[12px] font-bold text-black/40 font-sans uppercase tracking-tight">
                            Color: {ret.color} / Size: {ret.option}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold text-black/30 font-hei uppercase">환불일자</span>
                              <span className="text-[13px] font-medium text-black/80 font-sans">{ret.refundDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold text-black/30 font-hei uppercase">수거예정</span>
                              <span className="text-[13px] font-medium text-black/80 font-sans">{ret.collectionDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="lg:text-right w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-black/5 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-1">
                        <p className="text-[11px] text-black/40 font-hei lg:mb-1">환불 예정 금액</p>
                        <span className="text-[20px] font-bold text-black font-sans">{ret.price}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </>
            )}

            <div className="mt-12 flex justify-center">
               <button className="px-8 py-3 rounded-full border border-black/10 text-[14px] font-bold text-black hover:bg-gray-200 transition-all">
                 {currentTab} 더보기
               </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
