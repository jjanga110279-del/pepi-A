import React from 'react';
import { useParams, Link } from 'react-router';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import { 
  ChevronLeft, 
  Package, 
  MapPin, 
  CreditCard, 
  Truck, 
  CheckCircle2,
  Phone,
  User as UserIcon,
  Calendar
} from 'lucide-react';

export default function OrderDetail() {
  const { id } = useParams();
  const { orders } = useUser();
  
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <Layout>
        <div className="py-40 text-center">
          <h2 className="text-2xl font-bold mb-4">주문 내역을 찾을 수 없습니다.</h2>
          <Link to="/order-history" className="text-[#9C3F00] font-bold border-b border-[#9C3F00]">주문 내역으로 돌아가기</Link>
        </div>
      </Layout>
    );
  }

  const subtotal = order.items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const shippingFee = subtotal >= 50000 ? 0 : 3000;

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-32 pb-20">
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-6 border-b border-black/5 pb-10">
            <Link to="/order-history" className="flex items-center gap-2 text-black/40 hover:text-black transition-colors group w-fit">
              <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-[14px] font-bold font-hei">주문 내역으로 돌아가기</span>
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-[36px] font-black text-[#1B1D0E] font-serif tracking-tight">주문 상세 정보</h1>
                <p className="text-[14px] text-black/40 font-sans font-medium uppercase tracking-widest">
                  Order ID: <span className="text-black/80 font-bold">{order.id}</span>
                </p>
              </div>
              <div className="px-6 py-3 bg-[#9C3F00]/5 border border-[#9C3F00]/10 rounded-2xl flex items-center gap-3">
                <Calendar size={18} className="text-[#9C3F00]" />
                <span className="text-[14px] font-bold text-black font-hei">주문 일시: {order.date}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-grow flex flex-col gap-12 w-full">
              {/* 1. Order Items */}
              <section className="flex flex-col gap-6">
                <div className="flex items-center gap-3 border-b border-black/5 pb-4">
                  <Package size={20} className="text-black/20" />
                  <h2 className="text-[20px] font-bold text-[#1B1D0E] font-serif">주문 상품 정보</h2>
                </div>
                <div className="flex flex-col gap-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="bg-white border border-black/5 rounded-[32px] p-6 flex gap-6 items-center">
                      <div className="w-24 h-32 rounded-2xl overflow-hidden bg-[#FAFAFA] border border-black/5 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest font-sans">{item.brand}</span>
                            <h3 className="text-[18px] font-bold text-black font-hei leading-tight">{item.name}</h3>
                          </div>
                          <span className="px-4 py-1.5 bg-black text-white text-[11px] font-bold rounded-full uppercase tracking-tight">{item.status}</span>
                        </div>
                        <p className="text-[13px] font-bold text-black/40 font-sans uppercase">Color: {item.color} / Size: {item.size || item.option}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[18px] font-bold text-black font-sans">₩{item.price.toLocaleString()}</span>
                          <span className="text-black/20">|</span>
                          <span className="text-[14px] font-medium text-black/40 font-sans">{item.quantity || 1}개</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 2. Shipping Info */}
              <section className="flex flex-col gap-6">
                <div className="flex items-center gap-3 border-b border-black/5 pb-4">
                  <Truck size={20} className="text-black/20" />
                  <h2 className="text-[20px] font-bold text-[#1B1D0E] font-serif">배송지 정보</h2>
                </div>
                <div className="bg-[#FAFAFA] rounded-[40px] p-10 flex flex-col gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-black/40">
                        <UserIcon size={16} />
                        <span className="text-[12px] font-bold uppercase tracking-widest font-hei">수령인</span>
                      </div>
                      <p className="text-[16px] font-bold text-black font-hei">{order.shippingName || 'Elena Kim'}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-black/40">
                        <Phone size={16} />
                        <span className="text-[12px] font-bold uppercase tracking-widest font-hei">연락처</span>
                      </div>
                      <p className="text-[16px] font-bold text-black font-sans">{order.shippingPhone || '010-1234-5678'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-black/40">
                      <MapPin size={16} />
                      <span className="text-[12px] font-bold uppercase tracking-widest font-hei">배송 주소</span>
                    </div>
                    <p className="text-[16px] font-bold text-black font-hei leading-relaxed">
                      [{order.zipcode || '06035'}] {order.address || '서울특별시 강남구 가로수길 15'} {order.detailAddress || '아뜰리에 빌딩 3층'}
                    </p>
                  </div>
                  {order.deliveryNote && (
                    <div className="pt-8 border-t border-black/5 flex flex-col gap-3">
                      <span className="text-[12px] font-bold text-black/40 uppercase tracking-widest font-hei">배송 요청사항</span>
                      <p className="text-[14px] text-black/60 font-hei">{order.deliveryNote}</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* 3. Payment Summary */}
            <aside className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-32">
              <div className="bg-white border border-black/5 shadow-xl rounded-[48px] overflow-hidden">
                <div className="bg-black p-8 flex items-center gap-4">
                  <CreditCard size={24} className="text-white/60" />
                  <h3 className="text-[18px] font-bold text-white font-serif">결제 정보 상세</h3>
                </div>
                <div className="p-10 flex flex-col gap-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-black/40 font-hei font-bold uppercase tracking-tight">상품 합계</span>
                      <span className="text-black font-sans font-bold">₩{order.subtotal?.toLocaleString() || subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-black/40 font-hei font-bold uppercase tracking-tight">배송비</span>
                      <span className="text-black font-sans font-bold">{order.shippingFee === 0 ? '무료' : `+ ₩${(order.shippingFee || shippingFee).toLocaleString()}`}</span>
                    </div>
                    {(order.couponDiscount > 0) && (
                      <div className="flex justify-between items-center text-[14px]">
                        <span className="text-black/40 font-hei font-bold uppercase tracking-tight">쿠폰 할인</span>
                        <span className="text-[#dc2626] font-sans font-bold">- ₩{order.couponDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    {(order.usedPoint > 0) && (
                      <div className="flex justify-between items-center text-[14px]">
                        <span className="text-black/40 font-hei font-bold uppercase tracking-tight">포인트 사용</span>
                        <span className="text-[#dc2626] font-sans font-bold">- ₩{order.usedPoint.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-8 border-t border-black/5 flex flex-col gap-8">
                    <div className="flex justify-between items-end">
                      <span className="text-[12px] font-bold text-black/40 font-hei uppercase tracking-widest">최종 결제 금액</span>
                      <span className="text-[32px] font-bold text-[#9C3F00] font-sans leading-none tracking-tight">₩{order.totalPrice.toLocaleString()}</span>
                    </div>
                    
                    <div className="bg-[#FAFAFA] rounded-2xl p-6 flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest font-hei">결제 수단</span>
                        <span className="text-[13px] font-bold text-black font-hei">{order.paymentDetail}</span>
                      </div>
                      {order.cardInfo && (
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest font-hei">카드 정보</span>
                          <span className="text-[13px] font-bold text-black font-hei">{order.cardInfo}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest font-hei">결제 상태</span>
                        <div className="flex items-center gap-2 text-[#9C3F00]">
                          <CheckCircle2 size={14} />
                          <span className="text-[13px] font-bold font-hei">결제 완료</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 px-8">
                <button className="w-full py-4 bg-white border border-black/10 rounded-full text-[14px] font-bold text-black hover:bg-gray-50 transition-all font-hei">전체 주문 취소 문의</button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
