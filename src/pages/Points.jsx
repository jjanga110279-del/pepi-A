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
  AlertCircle,
  X,
  ClipboardList,
  MapPin
} from 'lucide-react';

export default function Points() {
  const [currentTab, setCurrentTab] = useState('전체 내역');
  const [showExpiringInfo, setShowExpiringInfo] = useState(false);

  const sideMenu = [
    { name: '프로필', path: '/mypage', icon: User, active: false },
    { name: '주문/결재 내역', path: '/order-history', icon: ShoppingBag, active: false },
    { name: '주소록 관리', path: '/address-book', icon: MapPin, active: false },
    { name: '관심 상품', path: '/wishlist', icon: Heart, active: false },
    { name: '내 리뷰관리', path: '/my-reviews', icon: ClipboardList, active: false },
    { name: '쿠폰', path: '/coupons', icon: Ticket, active: false },
    { name: '포인트', path: '/points', icon: Coins, active: true },
    { name: '설정', path: '/settings', icon: Settings, active: false },
    { name: '고객 센터', path: '/customer-service', icon: Headphones, active: false },
  ];

  const pointSummary = {
    balance: '12,450',
    expiring: '1,200'
  };

  const expiringDetails = [
    { date: '2024.04.30', amount: '500 P', reason: '23년 4월 적립분' },
    { date: '2024.05.15', amount: '700 P', reason: '이벤트 당첨 포인트' }
  ];

  const pointHistory = [
    { id: 1, type: '적립', title: '구매 확정 포인트 적립', date: '2024.03.25', amount: '+4,250', detail: '주문번호: 20240325-001234' },
    { id: 2, type: '사용', title: '상품 구매 시 포인트 사용', date: '2024.03.20', amount: '-5,000', detail: '주문번호: 20240320-001102' },
    { id: 3, type: '적립', title: '리뷰 작성 이벤트 적립', date: '2024.03.15', amount: '+500', detail: '프리미엄 캐시미어 가디건' },
    { id: 4, type: '적립', title: '신규 회원 가입 축하 포인트', date: '2024.03.01', amount: '+3,000', detail: '가입 환영 혜택' },
    { id: 5, type: '적립', title: '구매 확정 포인트 적립', date: '2024.02.28', amount: '+1,500', detail: '주문번호: 20240228-000987' },
    { id: 6, type: '사용', title: '상품 구매 시 포인트 사용', date: '2024.02.15', amount: '-2,000', detail: '주문번호: 20240215-000854' },
    { id: 7, type: '사용', title: '배송비 결제 시 포인트 사용', date: '2024.02.05', amount: '-3,000', detail: '주문번호: 20240205-000765' }
  ];

  const filteredHistory = pointHistory.filter(item => {
    if (currentTab === '적립 내역') return item.type === '적립';
    if (currentTab === '사용 내역') return item.type === '사용';
    return true;
  });

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

          <h1 className="text-[28px] md:text-[36px] font-bold text-[#000000] font-hei mb-10">포인트</h1>

          {/* Points Summary Box */}
          <div className="bg-[#FAFAFA] rounded-[32px] md:rounded-[48px] p-8 md:p-12 border border-black/5 mb-12 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold text-black/40 font-sans tracking-tight uppercase whitespace-nowrap">Available Points</span>
                  <span className="px-2 py-0.5 bg-white border border-black/5 rounded-full text-[9px] font-bold text-[#9C3F00] font-hei whitespace-nowrap">1% 적립</span>
                </div>
                <div className="flex items-baseline gap-2 overflow-hidden">
                  <span className="text-[40px] md:text-[56px] font-bold text-[#9C3F00] font-serif leading-none tracking-tighter whitespace-nowrap">{pointSummary.balance}</span>
                  <span className="text-[18px] md:text-[24px] font-bold text-black/60 font-sans whitespace-nowrap">P</span>
                </div>
              </div>

              <div className="relative shrink-0">
                <button 
                  onClick={() => setShowExpiringInfo(!showExpiringInfo)}
                  className="flex items-center gap-2 text-[12px] md:text-[14px] text-black/60 font-hei hover:text-black transition-colors bg-white px-5 py-2.5 rounded-full border border-black/5 shadow-sm whitespace-nowrap"
                >
                  <AlertCircle size={14} className="text-[#dc2626]" />
                  <span>소멸 예정: <strong>{pointSummary.expiring} P</strong></span>
                </button>

                {showExpiringInfo && (
                  <div className="absolute right-0 top-12 w-[280px] bg-white border border-black/10 rounded-2xl p-5 shadow-xl z-20">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="text-[12px] font-bold text-black font-hei whitespace-nowrap">미사용 소멸 예정 안내</h5>
                      <button onClick={() => setShowExpiringInfo(false)} className="text-black/20"><X size={14} /></button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {expiringDetails.map((detail, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b border-black/5 last:border-0">
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] text-black/40 whitespace-nowrap">{detail.date} 소멸</span>
                            <span className="text-[11px] font-medium text-black/80 truncate whitespace-nowrap">{detail.reason}</span>
                          </div>
                          <span className="text-[12px] font-bold text-[#dc2626] whitespace-nowrap ml-2">{detail.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex gap-6 md:gap-10 border-b border-black/5 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
            {['전체 내역', '적립 내역', '사용 내역'].map((tab) => (
              <button key={tab} onClick={() => setCurrentTab(tab)} className={`pb-4 text-[16px] md:text-[18px] transition-all whitespace-nowrap ${currentTab === tab ? 'font-bold text-[#9C3F00] border-b-2 border-[#9C3F00]' : 'font-medium text-black/40 hover:text-black'}`}>{tab}</button>
            ))}
          </nav>

          {/* Points History List - Optimized for Single Line */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center px-4 md:px-8 py-4 bg-[#FAFAFA] rounded-t-2xl border-b border-black/5 text-[11px] md:text-[12px] font-bold text-black/40 font-hei uppercase">
              <span className="w-[70px] md:w-[100px] shrink-0">날짜</span>
              <span className="flex-grow min-w-0 px-2">내역 상세</span>
              <span className="w-[80px] md:w-[120px] text-right shrink-0">포인트</span>
            </div>
            
            <div className="flex flex-col border-x border-b border-black/5 rounded-b-2xl overflow-hidden bg-white">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <div key={item.id} className="flex items-center px-4 md:px-8 py-6 md:py-8 border-b border-black/5 last:border-b-0 hover:bg-gray-50 transition-colors">
                    <div className="w-[70px] md:w-[100px] shrink-0 flex flex-col gap-1">
                      <span className="text-[12px] md:text-[14px] text-black font-sans font-medium whitespace-nowrap">{item.date}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full inline-block w-fit whitespace-nowrap ${item.type === '적립' ? 'bg-[#9C3F00]/10 text-[#9C3F00]' : 'bg-black/5 text-black/40'}`}>
                        {item.type}
                      </span>
                    </div>
                    <div className="flex-grow min-w-0 px-2 flex flex-col gap-0.5">
                      <h4 className="text-[14px] md:text-[17px] font-bold text-black font-hei leading-tight truncate whitespace-nowrap">{item.title}</h4>
                      <p className="text-[11px] md:text-[13px] text-black/40 font-sans truncate whitespace-nowrap">{item.detail}</p>
                    </div>
                    <div className="w-[80px] md:w-[120px] text-right shrink-0">
                      <span className={`text-[16px] md:text-[22px] font-bold font-sans tracking-tight whitespace-nowrap ${item.amount.startsWith('+') ? 'text-[#9C3F00]' : 'text-black'}`}>
                        {item.amount} <small className="text-[11px] md:text-[13px] font-bold ml-0.5">P</small>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center flex flex-col items-center">
                  <p className="text-[13px] text-black/40 font-hei italic whitespace-nowrap">내역이 존재하지 않습니다.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-center pb-10">
             <button className="px-8 py-2.5 rounded-full border border-black/10 text-[13px] font-bold text-black/40 hover:bg-gray-100 transition-all font-hei whitespace-nowrap">내역 더보기</button>
          </div>

          {/* Info Section */}
          <div className="mt-20 pt-10 border-t border-black/5">
            <h4 className="text-[16px] md:text-[18px] font-bold text-black font-hei mb-6 whitespace-nowrap">포인트 이용 안내</h4>
            <div className="flex flex-col gap-4">
              {[
                "1,000P 이상부터 10P 단위로 사용 가능합니다.",
                "결제 금액의 1%가 기본 적립됩니다.",
                "일부 상품은 포인트 사용이 제한될 수 있습니다.",
                "유효기간은 적립일로부터 1년입니다.",
                "주문 취소 시 포인트는 자동 복구됩니다."
              ].map((text, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <span className="w-1 h-1 rounded-full bg-[#9C3F00]/30 mt-2 shrink-0" />
                  <span className="text-[13px] text-black/60 font-sans leading-snug whitespace-nowrap truncate">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
