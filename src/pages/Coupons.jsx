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
  Download,
  CheckCircle2,
  Check,
  ClipboardList,
  MapPin
} from 'lucide-react';

export default function Coupons() {
  const [currentTab, setCurrentTab] = useState('쿠폰 존');
  const [couponCode, setCouponCode] = useState('');
  
  // 쿠폰 데이터 및 상태 관리
  const [downloadedIds, setDownloadedIds] = useState([1]); // 기본적으로 하나는 가지고 있음

  const allDownloadableCoupons = [
    { id: 1, title: '신규 회원 가입 감사 쿠폰', discount: '10,000원', condition: '50,000원 이상 구매 시', expiry: '2026.12.31까지', type: 'DISCOUNT' },
    { id: 101, title: '4월 회원 정기 10% 할인 쿠폰', discount: '10%', condition: '전 상품 대상 (최대 3만원)', expiry: '2026.04.30까지', type: 'PERCENTAGE' },
    { id: 102, title: '봄 맞이 아우터 15% 기획전', discount: '15%', condition: '아우터 카테고리 전용', expiry: '2026.04.15까지', type: 'PERCENTAGE' },
    { id: 103, title: '첫 구매 고객 감사 할인', discount: '5,000원', condition: '30,000원 이상 구매 시', expiry: '2026.05.31까지', type: 'DISCOUNT' },
    { id: 104, title: '무료 배송 혜택 쿠폰', discount: 'FREE', condition: '20,000원 이상 구매 시', expiry: '2026.06.30까지', type: 'SHIPPING' },
    { id: 105, title: '생일 축하 20% 특별 할인', discount: '20%', condition: '생일 전후 7일간 사용 가능', expiry: '2026.05.20까지', type: 'PERCENTAGE' },
  ];

  const usedCoupons = [
    { id: 201, title: '3월 회원 정기 할인 쿠폰', discount: '10,000원', date: '2026.03.15 사용완료', type: 'DISCOUNT' },
    { id: 202, title: '주말 깜짝 타임 세일 쿠폰', discount: '5%', date: '2026.03.02 사용완료', type: 'PERCENTAGE' },
  ];

  const expiredCoupons = [
    { id: 301, title: '겨울 시즌 오프 마지막 할인', discount: '30%', date: '2026.02.28 만료', type: 'PERCENTAGE' },
  ];

  const handleDownload = (id) => {
    if (!downloadedIds.includes(id)) {
      setDownloadedIds([...downloadedIds, id]);
    }
  };

  const handleDownloadAll = () => {
    const allIds = allDownloadableCoupons.map(c => c.id);
    setDownloadedIds(allIds);
  };

  const handleRegister = () => {
    if (couponCode.trim()) {
      alert(`쿠폰 등록 시도: ${couponCode}`);
      setCouponCode('');
    }
  };

  const sideMenu = [
    { name: '프로필', path: '/mypage', icon: User, active: false },
    { name: '주문/결재 내역', path: '/order-history', icon: ShoppingBag, active: false },
    { name: '주소록 관리', path: '/address-book', icon: MapPin, active: false },
    { name: '관심 상품', path: '/wishlist', icon: Heart, active: false },
    { name: '내 리뷰관리', path: '/my-reviews', icon: ClipboardList, active: false },
    { name: '쿠폰', path: '/coupons', icon: Ticket, active: true },
    { name: '포인트', path: '/points', icon: Coins, active: false },
    { name: '설정', path: '/settings', icon: Settings, active: false },
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
              <Link key={idx} to={sub.path} className={`flex items-center gap-4 text-[16px] font-medium transition-colors group ${sub.active ? 'text-[#dc2626]' : 'text-[#737373] hover:text-[#dc2626]'}`}>
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

          <h1 className="text-[28px] md:text-[36px] font-bold text-[#000000] font-hei mb-10">쿠폰함</h1>

          {/* Tabs - Added horizontal scroll for mobile */}
          <nav className="flex gap-6 md:gap-10 border-b border-black/5 mb-10 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {['쿠폰 존', '사용 가능', '사용 완료', '기간 만료'].map((tab) => {
              let count = 0;
              if (tab === '쿠폰 존') count = allDownloadableCoupons.length;
              if (tab === '사용 가능') count = downloadedIds.length;
              if (tab === '사용 완료') count = usedCoupons.length;
              if (tab === '기간 만료') count = expiredCoupons.length;
              
              return (
                <button 
                  key={tab}
                  onClick={() => setCurrentTab(tab)}
                  className={`pb-4 text-[15px] md:text-[18px] transition-all whitespace-nowrap shrink-0 ${currentTab === tab ? 'font-bold text-[#9C3F00] border-b-2 border-[#9C3F00]' : 'font-medium text-black/40 hover:text-black'}`}
                >
                  {tab} ({count})
                </button>
              );
            })}
          </nav>

          {/* Actions Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex-grow max-w-md">
              {currentTab === '사용 가능' && (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="쿠폰 코드를 입력하세요"
                    className="flex-grow h-11 px-4 bg-gray-50 border border-black/5 rounded-lg text-[13px] focus:outline-none focus:border-black/10 font-sans"
                  />
                  <button onClick={handleRegister} className="px-6 bg-black text-white rounded-lg text-[13px] font-bold hover:bg-black/80 transition-all font-hei shrink-0">등록</button>
                </div>
              )}
            </div>
            {currentTab === '쿠폰 존' && (
              <button 
                onClick={handleDownloadAll}
                className="flex items-center gap-2 px-8 py-3 bg-gray-100 text-black rounded-full text-[14px] font-bold hover:bg-gray-200 transition-all"
              >
                <Download size={18} />
                전체 쿠폰 다운로드
              </button>
            )}
          </div>

          {/* Coupons Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Coupon Zone Rendering */}
            {currentTab === '쿠폰 존' && allDownloadableCoupons.map((coupon) => {
              const isDownloaded = downloadedIds.includes(coupon.id);
              return (
                <div key={coupon.id} className="relative group overflow-hidden">
                  <div className={`bg-white border border-black/10 rounded-2xl p-5 md:p-8 flex justify-between items-center transition-all shadow-sm ${isDownloaded ? 'opacity-60' : 'hover:border-black/20'}`}>
                    <div className="flex flex-col gap-1.5 md:gap-2 pr-2">
                      <span className="text-[10px] md:text-[11px] font-bold text-[#9C3F00] font-sans tracking-widest uppercase">{coupon.type}</span>
                      <h3 className="text-[16px] md:text-[20px] font-bold text-black font-hei leading-tight">{coupon.title}</h3>
                      <p className="text-[12px] md:text-[13px] text-black/40 font-sans mt-0.5">{coupon.condition}</p>
                      <span className="text-[11px] md:text-[12px] font-medium text-black/60 font-sans mt-1">{coupon.expiry}</span>
                    </div>
                    <div className="text-right flex flex-col items-end gap-3 md:gap-4 shrink-0">
                      <span className="text-[28px] md:text-[36px] font-bold text-black font-sans leading-none whitespace-nowrap">{coupon.discount}</span>
                      {isDownloaded ? (
                        <div className="flex items-center gap-1 px-3 md:px-5 py-2 md:py-2.5 bg-gray-50 text-black/40 rounded-full text-[11px] md:text-[13px] font-bold font-hei whitespace-nowrap">
                          <Check size={12} className="md:w-3.5 md:h-3.5" />
                          다운로드 완료
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleDownload(coupon.id)}
                          className="flex items-center gap-1.5 px-4 md:px-5 py-2 md:py-2.5 bg-gray-100 rounded-full text-[11px] md:text-[13px] font-bold text-black hover:bg-black hover:text-white transition-all font-hei whitespace-nowrap"
                        >
                          <Download size={14} className="md:w-4 md:h-4" />
                          다운로드
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full border border-black/10 z-10 hidden lg:block" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white rounded-full border border-black/10 z-10 hidden lg:block" />
                </div>
              );
            })}

            {/* Available Coupons Rendering */}
            {currentTab === '사용 가능' && allDownloadableCoupons.filter(c => downloadedIds.includes(c.id)).map((coupon) => (
              <div key={coupon.id} className="relative group overflow-hidden">
                <div className="bg-white border border-black/10 rounded-2xl p-5 md:p-8 flex justify-between items-center hover:border-black/20 transition-all shadow-sm border-l-4 border-l-[#9C3F00]">
                  <div className="flex flex-col gap-1.5 md:gap-2 pr-2">
                    <span className="text-[10px] md:text-[11px] font-bold text-[#9C3F00] font-sans tracking-widest uppercase">{coupon.type}</span>
                    <h3 className="text-[16px] md:text-[20px] font-bold text-black font-hei leading-tight">{coupon.title}</h3>
                    <p className="text-[12px] md:text-[13px] text-black/40 font-sans mt-0.5">{coupon.condition}</p>
                    <span className="text-[11px] md:text-[12px] font-medium text-black/60 font-sans mt-1">{coupon.expiry}</span>
                  </div>
                  <div className="text-right flex flex-col items-end gap-3 md:gap-4 shrink-0">
                    <span className="text-[28px] md:text-[36px] font-bold text-black font-sans leading-none whitespace-nowrap">{coupon.discount}</span>
                    <button className="px-4 md:px-5 py-2 md:py-2.5 border border-black/10 rounded-full text-[11px] md:text-[12px] font-bold text-black hover:bg-black hover:text-white transition-all font-hei whitespace-nowrap">
                      상품보기
                    </button>
                  </div>
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full border border-black/10 z-10 hidden lg:block" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white rounded-full border border-black/10 z-10 hidden lg:block" />
              </div>
            ))}

            {/* Used/Expired Rendering */}
            {(currentTab === '사용 완료' || currentTab === '기간 만료') && (currentTab === '사용 완료' ? usedCoupons : expiredCoupons).map((coupon) => (
              <div key={coupon.id} className="relative group overflow-hidden grayscale opacity-60">
                <div className="bg-gray-50 border border-black/5 rounded-2xl p-5 md:p-8 flex justify-between items-center">
                  <div className="flex flex-col gap-1.5 md:gap-2 pr-2">
                    <span className="text-[10px] md:text-[11px] font-bold text-black/40 font-sans tracking-widest uppercase">{coupon.type}</span>
                    <h3 className="text-[16px] md:text-[20px] font-bold text-black/40 font-hei leading-tight">{coupon.title}</h3>
                    <span className="text-[11px] md:text-[12px] font-medium text-black/40 font-sans mt-1">{coupon.date}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[28px] md:text-[36px] font-bold text-black/20 font-sans leading-none whitespace-nowrap">{coupon.discount}</span>
                  </div>
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full border border-black/10 z-10 hidden lg:block" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white rounded-full border border-black/10 z-10 hidden lg:block" />
              </div>
            ))}
          </div>

          {/* Guidelines */}
          <div className="mt-24 pt-12 border-t border-black/5">
            <div className="flex items-center gap-2 mb-8">
              <CheckCircle2 size={20} className="text-[#9C3F00]" />
              <h4 className="text-[18px] font-bold text-black font-hei">쿠폰 이용 안내</h4>
            </div>
            <ul className="flex flex-col gap-4 text-[14px] text-black/60 font-sans leading-relaxed">
              <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-black/10 mt-2 shrink-0" /><span>쿠폰은 주문 시 결제 페이지에서 선택하여 적용하실 수 있습니다.</span></li>
              <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-black/10 mt-2 shrink-0" /><span>다운로드한 쿠폰은 '사용 가능' 탭에서 확인 가능합니다.</span></li>
              <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-black/10 mt-2 shrink-0" /><span>한 번 사용한 쿠폰은 주문 취소/반품 후에도 재사용이 불가할 수 있습니다.</span></li>
              <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-black/10 mt-2 shrink-0" /><span>기간이 만료된 쿠폰은 자동으로 삭제됩니다.</span></li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
