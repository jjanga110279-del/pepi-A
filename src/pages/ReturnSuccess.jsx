import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router';
import Layout from '../components/common/Layout';
import { 
  ChevronRight, 
  Calendar, 
  RotateCcw,
  RefreshCw,
  Package,
  ClipboardCheck,
  Truck,
  Check
} from 'lucide-react';

export default function ReturnSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { requestInfo } = location.state || {};

  if (!requestInfo) {
    return (
      <Layout>
        <div className="py-40 text-center">
          <h2 className="text-2xl font-bold mb-4 font-serif">접수 정보를 찾을 수 없습니다.</h2>
          <Link to="/order-history" className="text-[#9C3F00] font-bold border-b border-[#9C3F00]">주문 내역으로 돌아가기</Link>
        </div>
      </Layout>
    );
  }

  const isReturn = requestInfo.type === 'return';

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-32 pb-20 overflow-x-hidden">
        {/* Hero Section with Custom Graphic */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center mb-24">
          <div className="relative w-full lg:w-[500px] aspect-square shrink-0 flex items-center justify-center">
            {/* Aesthetic Background Circles */}
            <div className="absolute w-[80%] h-[80%] bg-[#9C3F00]/5 rounded-full animate-pulse" />
            <div className="absolute w-[60%] h-[60%] border border-[#9C3F00]/10 rounded-full" />
            <div className="absolute w-[40%] h-[40%] bg-white shadow-2xl rounded-full flex items-center justify-center z-10 border border-black/5">
              <div className="w-20 h-20 bg-[#9C3F00] rounded-full flex items-center justify-center shadow-lg shadow-[#9C3F00]/20">
                <Check size={40} className="text-white" strokeWidth={3} />
              </div>
            </div>
            {/* Floating Decorative Dots */}
            <div className="absolute top-[20%] right-[20%] w-3 h-3 bg-[#9C3F00] rounded-full" />
            <div className="absolute bottom-[25%] left-[15%] w-2 h-2 bg-[#9C3F00]/40 rounded-full" />
            <div className="absolute top-[40%] left-[10%] w-4 h-4 border-2 border-[#9C3F00]/20 rounded-full" />
          </div>
          
          <div className="flex flex-col items-start gap-6 max-w-xl">
            <div className="px-4 py-1.5 bg-[#9C3F00]/5 text-[#9C3F00] text-[14px] font-bold rounded-full uppercase tracking-wider font-sans">
              Request Received
            </div>
            <h1 className="text-[48px] md:text-[60px] font-bold text-[#1B1D0E] font-serif leading-[1.1] tracking-tight">
              {isReturn ? '반품' : '교환'} 접수가<br />완료되었습니다.
            </h1>
            <p className="text-[18px] text-[#564338] font-hei leading-relaxed opacity-80">
              불편을 드려 대단히 죄송합니다. <br className="hidden md:block" />
              접수하신 내용을 확인하여 신속하게 처리해 드리겠습니다.
            </p>
          </div>
        </div>

        {/* Info Area */}
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-grow w-full flex flex-col gap-12">
            {/* Request Summary Card */}
            <div className="bg-white border border-black/5 rounded-[40px] p-8 md:p-12 flex flex-col gap-10 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-black/5 pb-8">
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] font-bold text-black/40 uppercase tracking-widest font-hei">접수 유형</span>
                  <div className="flex items-center gap-3">
                    {isReturn ? <RotateCcw size={20} className="text-[#9C3F00]" /> : <RefreshCw size={20} className="text-[#9C3F00]" />}
                    <span className="text-[20px] font-bold text-black font-hei">{isReturn ? '반품 신청' : '교환 신청'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-[#FAFAFA] rounded-2xl border border-black/5">
                  <Calendar size={18} className="text-black/20" />
                  <span className="text-[14px] font-bold text-black/60 font-hei">접수 일시: {new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-black/40">
                    <Package size={16} />
                    <span className="text-[12px] font-bold uppercase tracking-widest font-hei">접수 상품</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#FAFAFA] border border-black/5 shrink-0">
                      <img src={requestInfo.item.image} alt={requestInfo.item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-[16px] font-bold text-black font-hei leading-tight">{requestInfo.item.name}</h4>
                      <p className="text-[13px] text-black/40 font-sans uppercase">
                        {requestInfo.item.color} / {requestInfo.item.size || requestInfo.item.option} <span className="mx-2">|</span> {requestInfo.item.quantity}개
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-black/5 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-black/40">
                    <ClipboardCheck size={16} />
                    <span className="text-[12px] font-bold uppercase tracking-widest font-hei">처리 절차 안내</span>
                  </div>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</div>
                      <p className="text-[14px] text-black/60 font-hei">영업일 기준 1~3일 내에 택배사에서 상품 회수를 위해 방문합니다.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</div>
                      <p className="text-[14px] text-black/60 font-hei">상품이 판매처에 도착하면 검수 과정을 거칩니다.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</div>
                      <p className="text-[14px] text-black/60 font-hei">검토 완료 후 {isReturn ? '환불' : '교환 상품 재발송'} 처리가 완료됩니다.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Area */}
          <aside className="w-full lg:w-[360px] shrink-0 flex flex-col gap-6 lg:sticky lg:top-32">
            <div className="bg-white border border-black/5 rounded-[48px] p-10 flex flex-col gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col gap-3 items-center text-center">
                <span className="text-[13px] font-bold text-black/40 uppercase tracking-[0.2em] font-hei">예상 배송비</span>
                <span className={`text-[40px] font-bold font-sans tracking-tight ${requestInfo.shippingFee === 0 ? 'text-[#9C3F00]' : 'text-black'}`}>
                  {requestInfo.shippingFee === 0 ? '무료' : `₩${requestInfo.shippingFee.toLocaleString()}`}
                </span>
              </div>
              
              <div className="flex flex-col gap-3">
                <Link 
                  to="/order-history"
                  className="w-full h-16 bg-[#9C3F00] text-white rounded-full flex items-center justify-center gap-2 text-[16px] font-bold hover:bg-[#853600] transition-all shadow-[0_10px_20px_rgba(156,63,0,0.2)] active:translate-y-0.5"
                >
                  주문/결제 내역 보기 <ChevronRight size={18} />
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
              <Truck size={18} className="text-[#9C3F00]" />
              <p className="text-[12px] text-black/40 font-hei font-medium">상품을 처음 받으신 상태 그대로 포장해 주세요.</p>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
