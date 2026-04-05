import React from 'react';
import { useParams, Link } from 'react-router';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import { 
  ChevronLeft, 
  Calendar, 
  RotateCcw,
  RefreshCw,
  Package,
  ClipboardCheck,
  Truck,
  Check,
  AlertCircle
} from 'lucide-react';

export default function ReturnDetail() {
  const { orderId, itemId } = useParams();
  const { orders } = useUser();
  
  const order = orders.find(o => o.id === orderId);
  const item = order?.items.find(i => i.id === itemId);
  const requestInfo = item?.returnDetail;

  if (!requestInfo) {
    return (
      <Layout>
        <div className="py-40 text-center">
          <h2 className="text-2xl font-bold mb-4 font-serif">접수 내역을 찾을 수 없습니다.</h2>
          <Link to="/order-history" className="text-[#9C3F00] font-bold border-b border-[#9C3F00]">주문 내역으로 돌아가기</Link>
        </div>
      </Layout>
    );
  }

  const isReturn = requestInfo.type === 'return';

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
            <div className="flex justify-between items-end">
              <h1 className="text-[36px] font-black text-[#1B1D0E] font-serif tracking-tight">교환/반품 접수 내역</h1>
              <div className="px-4 py-1.5 bg-[#9C3F00]/5 text-[#9C3F00] text-[14px] font-bold rounded-full uppercase tracking-wider font-sans">
                {requestInfo.item.status}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-grow w-full flex flex-col gap-12">
              
              {/* 1. Request Summary Card */}
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
                    <span className="text-[14px] font-bold text-black/60 font-hei">접수 일시: {requestInfo.date}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-10">
                  {/* Product */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-black/40">
                      <Package size={16} />
                      <span className="text-[12px] font-bold uppercase tracking-widest font-hei">접수 상품</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-24 rounded-2xl overflow-hidden bg-[#FAFAFA] border border-black/5 shrink-0">
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

                  {/* Reason */}
                  <div className="pt-8 border-t border-black/5 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-black/40">
                      <AlertCircle size={16} />
                      <span className="text-[12px] font-bold uppercase tracking-widest font-hei">접수 사유</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {requestInfo.reasons.map(rId => (
                        <span key={rId} className="px-4 py-2 bg-[#FAFAFA] border border-black/5 rounded-full text-[13px] font-bold text-black/60">
                          {rId === 'simple' ? '단순 변심' : rId === 'size' ? '사이즈 교환' : rId === 'defect' ? '상품 불량' : '오배송'}
                        </span>
                      ))}
                    </div>
                    {requestInfo.detailReason && (
                      <p className="mt-2 text-[14px] text-black/60 leading-relaxed bg-[#FAFAFA] p-6 rounded-3xl border border-black/5 italic">
                        "{requestInfo.detailReason}"
                      </p>
                    )}
                    {requestInfo.images && requestInfo.images.length > 0 && (
                      <div className="flex gap-3 mt-4">
                        {requestInfo.images.map((img, idx) => (
                          <div key={idx} className="w-24 h-24 rounded-2xl overflow-hidden border border-black/5">
                            <img src={img} alt="Attached" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <aside className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-32">
              <div className="bg-white border border-black/5 rounded-[48px] p-10 flex flex-col gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col gap-3">
                  <h3 className="text-[20px] font-bold text-black font-serif">처리 정보 요약</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-black/40 font-hei">현재 상태:</span>
                    <span className="px-3 py-1 bg-[#9C3F00]/5 text-[#9C3F00] text-[12px] font-bold rounded-full">검수 대기 중</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-6 pt-10 border-t border-black/5">
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="text-black/40 font-hei font-bold uppercase tracking-tight">부과 배송비</span>
                    <span className={`font-sans font-bold text-[18px] ${requestInfo.shippingFee === 0 ? 'text-[#9C3F00]' : 'text-black'}`}>
                      {requestInfo.shippingFee === 0 ? '무료 (회사 부담)' : `₩${requestInfo.shippingFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="p-4 bg-[#FAFAFA] rounded-2xl border border-black/5">
                    <p className="text-[11px] text-black/40 font-hei leading-relaxed">
                      * 수거 방식: {requestInfo.collectionMethod === 'auto' ? '지정 택배사 수거' : '직접 반송'} <br />
                      * 상품 확인 후 영업일 기준 3~5일 내에 처리가 완료됩니다.
                    </p>
                  </div>
                </div>

                <Link to="/customer-service" className="w-full h-16 bg-black text-white rounded-full flex items-center justify-center gap-2 text-[16px] font-bold hover:bg-black/80 transition-all shadow-lg active:translate-y-0.5">
                  고객센터 문의하기
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
