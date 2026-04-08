import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router';
import Layout from '../components/common/Layout';
import { 
  CheckCircle2, 
  ChevronRight, 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  CreditCard,
  Package
} from 'lucide-react';
import orderHeroImg from '../assets/images/order_complete_hero.png';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    return (
      <Layout>
        <div className="py-40 text-center">
          <h2 className="text-2xl font-bold mb-4 font-serif">주문 정보를 찾을 수 없습니다.</h2>
          <Link to="/" className="text-[#9C3F00] font-bold border-b border-[#9C3F00]">홈으로 돌아가기</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-32 pb-20 overflow-x-hidden">
        {/* Hero Section - side by side layout */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-16 md:mb-24">
          <div className="relative w-full md:w-[480px] aspect-[4/3] md:aspect-[480/400] shrink-0">
            <img 
              src={orderHeroImg} 
              alt="Order Success" 
              className="w-full h-full object-cover rounded-none shadow-2xl relative z-10"
            />
          </div>
          
          <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 text-center md:text-left overflow-hidden">
            <div className="px-5 py-2 bg-[#FFDAD3] text-[#9F402D] text-[12px] md:text-[14px] font-bold rounded-full uppercase tracking-widest font-sans inline-block">
              Order Success
            </div>
            <h1 className="text-3xl md:text-[52px] lg:text-[60px] font-bold text-[#1B1D0E] font-serif leading-none tracking-tighter whitespace-nowrap">
              주문이 완료되었습니다.
            </h1>
            <p className="text-base md:text-[18px] text-[#564338] font-hei leading-relaxed opacity-70 max-w-[440px] break-keep">
              늘:pepi-i를 이용해 주셔서 감사합니다.<br className="hidden md:block" /> 정성을 담아 곧 보내드리겠습니다.
            </p>
          </div>
        </div>

        {/* Order Details Area */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-start">
          <div className="flex-grow w-full flex flex-col gap-8 md:gap-12">
            {/* Order Identity Card */}
            <div className="bg-white border border-black/5 rounded-[32px] md:rounded-[40px] p-6 md:p-12 flex flex-col gap-6 md:gap-10 shadow-sm">
              <div className="flex flex-row items-center justify-between gap-4 border-b border-black/5 pb-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] md:text-[12px] font-bold text-black/40 uppercase tracking-widest font-hei">주문 번호</span>
                  <span className="text-[14px] md:text-[20px] font-bold text-black font-sans">{order.id}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 px-3 py-2 md:px-6 md:py-3 bg-[#FAFAFA] rounded-xl md:rounded-2xl border border-black/5">
                  <Calendar size={14} className="text-black/20 md:w-[18px] md:h-[18px]" />
                  <span className="text-[11px] md:text-[14px] font-bold text-black/60 font-hei whitespace-nowrap">주문일: {order.date}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                <div className="flex flex-col gap-2 md:gap-4">
                  <div className="flex items-center gap-2 text-black/40">
                    <MapPin size={14} />
                    <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-widest font-hei">배송지</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[14px] md:text-[16px] font-bold text-black font-hei">{order.shippingName}</p>
                    <p className="text-[12px] md:text-[14px] text-black/60 font-hei leading-relaxed line-clamp-1 md:line-clamp-none">
                      [{order.zipcode}] {order.address}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:gap-4">
                  <div className="flex items-center gap-2 text-black/40">
                    <CreditCard size={14} />
                    <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-widest font-hei">결제 수단</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[14px] md:text-[16px] font-bold text-black font-hei">{order.paymentDetail}</p>
                    {order.cardInfo && <p className="text-[12px] md:text-[14px] text-black/60 font-hei">{order.cardInfo}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Row - Side by side on mobile */}
            <div className="flex flex-row gap-4 md:flex-col md:gap-12 items-stretch">
              {/* Product Summary */}
              <div className="flex-1 flex flex-col gap-4 bg-white border border-black/5 rounded-[32px] p-5 md:p-0 md:bg-transparent md:border-none">
                <div className="flex items-center gap-2 border-b border-black/5 pb-3 md:pb-4">
                  <Package size={16} className="text-black/20 md:w-5 md:h-5" />
                  <h3 className="text-[14px] md:text-[20px] font-bold text-[#1B1D0E] font-serif">주문 상품</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {order.items.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 md:gap-6 md:p-4 hover:bg-[#FAFAFA] rounded-2xl transition-colors">
                      <div className="w-10 h-12 md:w-16 md:h-20 rounded-lg overflow-hidden bg-[#FAFAFA] border border-black/5 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-[11px] md:text-[15px] font-bold text-black font-hei leading-tight line-clamp-1">{item.name}</h4>
                        <p className="text-[9px] md:text-[12px] text-black/40 font-sans uppercase">
                          {item.quantity}개
                        </p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-[10px] md:text-[14px] text-black/40 font-hei">외 {order.items.length - 2}건</p>
                  )}
                </div>
              </div>

              {/* Final Amount (Mobile only here, desktop uses sticky aside) */}
              <div className="lg:hidden flex-1 bg-[#9C3F00]/5 border border-[#9C3F00]/10 rounded-[32px] p-5 flex flex-col justify-between items-center text-center">
                <span className="text-[10px] font-bold text-[#9C3F00]/60 uppercase tracking-widest font-hei">최종 결제 금액</span>
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold text-[#9C3F00] font-sans">₩{order.totalPrice.toLocaleString()}</span>
                  <button onClick={() => navigate('/')} className="px-4 py-2 bg-[#9C3F00] text-white rounded-full text-[10px] font-bold font-hei">쇼핑 계속하기</button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Area (Desktop) */}
          <aside className="hidden lg:flex w-[360px] shrink-0 flex-col gap-6 sticky top-32">
            <div className="bg-white border border-black/5 rounded-[48px] p-10 flex flex-col gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col gap-3 items-center text-center">
                <span className="text-[13px] font-bold text-black/40 uppercase tracking-[0.2em] font-hei">최종 결제 금액</span>
                <span className="text-[40px] font-bold text-[#9C3F00] font-sans tracking-tight">₩{order.totalPrice.toLocaleString()}</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <Link 
                  to={`/order-detail/${order.id}`}
                  className="w-full h-[66px] rounded-full border border-[#9C3F00] text-[#9C3F00] text-base font-bold font-hei hover:bg-[#9C3F00]/5 flex items-center justify-center gap-2 transition-all active:translate-y-0.5"
                >
                  주문 상세 보기 <ChevronRight size={18} />
                </Link>
                <button 
                  onClick={() => navigate('/')}
                  className="w-full h-[66px] bg-white border border-[#9C3F00] text-[#9C3F00] rounded-full text-[16px] font-bold hover:bg-[#9C3F00]/5 transition-all active:translate-y-0.5 font-hei"
                >
                  쇼핑 계속하기
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
