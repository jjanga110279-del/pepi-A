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
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center mb-24">
          <div className="relative w-full lg:w-[584px] aspect-[584/500] shrink-0">
            <div className="absolute inset-4 -right-0 -bottom-0 bg-[#9C3F00]/5 rounded-[48px]" />
            <img 
              src={orderHeroImg} 
              alt="Order Success" 
              className="w-full h-full object-cover rounded-[48px] shadow-2xl relative z-10"
            />
          </div>
          
          <div className="flex flex-col items-start gap-6 max-w-xl">
            <div className="px-4 py-1.5 bg-[#FFDAD3] text-[#9F402D] text-[14px] font-bold rounded-full uppercase tracking-wider font-sans">
              Success
            </div>
            <h1 className="text-[48px] md:text-[60px] font-bold text-[#1B1D0E] font-serif leading-[1.1] tracking-tight">
              주문이<br />완료되었습니다.
            </h1>
            <p className="text-[18px] text-[#564338] font-hei leading-relaxed opacity-80">
              늘:pepi-i를 이용해 주셔서 감사합니다. <br className="hidden md:block" />
              정성을 담아 준비하여 곧 보내드리겠습니다.
            </p>
          </div>
        </div>

        {/* Order Details Area */}
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-grow w-full flex flex-col gap-12">
            {/* Order Identity Card */}
            <div className="bg-white border border-black/5 rounded-[40px] p-8 md:p-12 flex flex-col gap-10 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-black/5 pb-8">
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] font-bold text-black/40 uppercase tracking-widest font-hei">주문 번호</span>
                  <span className="text-[20px] font-bold text-black font-sans">{order.id}</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-[#FAFAFA] rounded-2xl border border-black/5">
                  <Calendar size={18} className="text-black/20" />
                  <span className="text-[14px] font-bold text-black/60 font-hei">주문 일시: {order.date}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-black/40">
                    <MapPin size={16} />
                    <span className="text-[12px] font-bold uppercase tracking-widest font-hei">배송지</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[16px] font-bold text-black font-hei">{order.shippingName}</p>
                    <p className="text-[14px] text-black/60 font-hei leading-relaxed">
                      [{order.zipcode}] {order.address} {order.detailAddress}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-black/40">
                    <CreditCard size={16} />
                    <span className="text-[12px] font-bold uppercase tracking-widest font-hei">결제 수단</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[16px] font-bold text-black font-hei">{order.paymentDetail}</p>
                    {order.cardInfo && <p className="text-[14px] text-black/60 font-hei">{order.cardInfo}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Summary */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-black/5 pb-4">
                <Package size={20} className="text-black/20" />
                <h3 className="text-[20px] font-bold text-[#1B1D0E] font-serif">주문 상품 요약</h3>
              </div>
              <div className="flex flex-col gap-4">
                {order.items.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-4 hover:bg-[#FAFAFA] rounded-3xl transition-colors">
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#FAFAFA] border border-black/5 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-[15px] font-bold text-black font-hei leading-tight">{item.name}</h4>
                      <p className="text-[12px] text-black/40 font-sans uppercase">
                        {item.color} / {item.size || item.option} <span className="mx-2">|</span> {item.quantity}개
                      </p>
                    </div>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <p className="text-[14px] text-black/40 font-hei ml-22">외 {order.items.length - 3}건의 상품</p>
                )}
              </div>
            </div>
          </div>

          {/* CTA Area */}
          <aside className="w-full lg:w-[360px] shrink-0 flex flex-col gap-6 lg:sticky lg:top-32">
            <div className="bg-white border border-black/5 rounded-[48px] p-10 flex flex-col gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col gap-3 items-center text-center">
                <span className="text-[13px] font-bold text-black/40 uppercase tracking-[0.2em] font-hei">최종 결제 금액</span>
                <span className="text-[40px] font-bold text-[#9C3F00] font-sans tracking-tight">₩{order.totalPrice.toLocaleString()}</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <Link 
                  to={`/order-detail/${order.id}`}
                  className="w-full h-16 bg-[#9C3F00] text-white rounded-full flex items-center justify-center gap-2 text-[16px] font-bold hover:bg-[#853600] transition-all shadow-[0_10px_20px_rgba(156,63,0,0.2)] active:translate-y-0.5"
                >
                  주문 상세 보기 <ChevronRight size={18} />
                </Link>
                <button 
                  onClick={() => navigate('/')}
                  className="w-full h-16 bg-white border border-black/10 text-black/60 rounded-full text-[16px] font-bold hover:bg-gray-50 transition-all active:translate-y-0.5"
                >
                  쇼핑 계속하기
                </button>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#FAFAFA] rounded-3xl border border-black/5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#9C3F00] animate-pulse" />
              <p className="text-[12px] text-black/40 font-hei font-medium">정성을 담아 검수 후 배송을 시작합니다.</p>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
