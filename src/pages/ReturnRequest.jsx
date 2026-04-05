import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import { 
  ChevronLeft, 
  Package, 
  AlertCircle,
  Check,
  Camera,
  Truck,
  RotateCcw,
  RefreshCw,
  X
} from 'lucide-react';

export default function ReturnRequest() {
  const { orderId, itemId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderItemStatus } = useUser();
  
  const order = orders.find(o => o.id === orderId);
  const item = order?.items.find(i => i.id === itemId);

  const [requestType, setReturnRequestType] = useState('return'); // 'return' or 'exchange'
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [detailReason, setDetailReason] = useState('');
  const [collectionMethod, setCollectionMethod] = useState('auto'); // 'auto' or 'self'
  const [attachedImages, setAttachedImages] = useState([]);
  const fileInputRef = React.useRef(null);

  const reasons = [
    { id: 'simple', label: '단순 변심', desc: '색상/디자인 등이 마음에 들지 않음', type: 'customer' },
    { id: 'size', label: '사이즈 교환', desc: '사이즈가 맞지 않아 다른 사이즈로 교환 희망', type: 'customer' },
    { id: 'defect', label: '상품 불량', desc: '상품에 오염, 파손 등의 결함이 있음', type: 'company', note: '* 사진 첨부 필수' },
    { id: 'wrong', label: '오배송', desc: '주문한 상품과 다른 상품이 배송됨', type: 'company' }
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (attachedImages.length + files.length > 3) {
      alert('사진은 최대 3장까지만 첨부 가능합니다.');
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setAttachedImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleReason = (id) => {
    setSelectedReasons(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const isCompanyFault = selectedReasons.some(rId => {
    const reason = reasons.find(r => r.id === rId);
    return reason?.type === 'company';
  });

  const estimatedShippingFee = selectedReasons.length === 0 ? 0 : (isCompanyFault ? 0 : 6000);
  const isDefectSelected = selectedReasons.includes('defect');

  if (!order || !item) {
    return (
      <Layout>
        <div className="py-40 text-center">
          <h2 className="text-2xl font-bold mb-4 font-serif">주문 항목을 찾을 수 없습니다.</h2>
          <Link to="/order-history" className="text-[#9C3F00] font-bold border-b border-[#9C3F00]">주문 내역으로 돌아가기</Link>
        </div>
      </Layout>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedReasons.length === 0) {
      alert('접수 사유를 최소 하나 이상 선택해 주세요.');
      return;
    }
    if (isDefectSelected && attachedImages.length === 0) {
      alert('상품 불량의 경우 원활한 처리를 위해 하단의 사진 첨부란에 사진을 최소 1장 이상 등록해 주시기 바랍니다.');
      return;
    }
    
    const requestInfo = {
      type: requestType,
      item: { ...item, status: '접수완료' },
      reasons: selectedReasons,
      shippingFee: estimatedShippingFee,
      collectionMethod: collectionMethod,
      date: new Date().toLocaleDateString(),
      detailReason: detailReason,
      images: attachedImages
    };

    // 상태 및 상세 정보 업데이트
    updateOrderItemStatus(orderId, itemId, '접수완료', requestInfo);

    navigate('/return-success', { state: { requestInfo } });
  };

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
            <h1 className="text-[36px] font-black text-[#1B1D0E] font-serif tracking-tight">교환/반품 접수</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-grow flex flex-col gap-16 w-full">
              
              {/* 1. Request Type Selection */}
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3 border-b border-black/5 pb-4">
                  <Package size={20} className="text-black/20" />
                  <h2 className="text-[20px] font-bold text-[#1B1D0E] font-serif">접수 유형 선택</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setReturnRequestType('return')}
                    className={`h-20 rounded-2xl border flex items-center justify-center gap-3 font-bold transition-all ${requestType === 'return' ? 'border-[#9C3F00] bg-[#9C3F00]/5 text-black' : 'border-black/5 bg-[#FAFAFA] text-black/40 hover:border-black/10'}`}
                  >
                    <RotateCcw size={20} /> 반품 신청
                  </button>
                  <button 
                    type="button"
                    onClick={() => setReturnRequestType('exchange')}
                    className={`h-20 rounded-2xl border flex items-center justify-center gap-3 font-bold transition-all ${requestType === 'exchange' ? 'border-[#9C3F00] bg-[#9C3F00]/5 text-black' : 'border-black/5 bg-[#FAFAFA] text-black/40 hover:border-black/10'}`}
                  >
                    <RefreshCw size={20} /> 교환 신청
                  </button>
                </div>
              </section>

              {/* 2. Product Info */}
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3 border-b border-black/5 pb-4">
                  <Package size={20} className="text-black/20" />
                  <h2 className="text-[20px] font-bold text-[#1B1D0E] font-serif">접수 상품 정보</h2>
                </div>
                <div className="bg-white border border-black/5 rounded-[32px] p-8 flex gap-8 items-center">
                  <div className="w-24 h-32 rounded-2xl overflow-hidden bg-[#FAFAFA] border border-black/5 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest font-sans">{item.brand}</span>
                    <h3 className="text-[18px] font-bold text-black font-hei leading-tight">{item.name}</h3>
                    <p className="text-[13px] font-bold text-black/40 font-sans uppercase">Color: {item.color} / Size: {item.size || item.option}</p>
                    <span className="text-[16px] font-bold text-black font-sans mt-1">₩{item.price.toLocaleString()} / {item.quantity}개</span>
                  </div>
                </div>
              </section>

              {/* 3. Reason */}
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3 border-b border-black/5 pb-4">
                  <AlertCircle size={20} className="text-black/20" />
                  <h2 className="text-[20px] font-bold text-[#1B1D0E] font-serif">접수 사유 (복수 선택 가능)</h2>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reasons.map((r) => (
                      <div 
                        key={r.id}
                        onClick={() => toggleReason(r.id)}
                        className={`p-6 rounded-[24px] border cursor-pointer transition-all flex items-start gap-4 ${selectedReasons.includes(r.id) ? 'border-[#9C3F00] bg-[#9C3F00]/5' : 'border-black/5 bg-[#FAFAFA] hover:border-black/10'}`}
                      >
                        <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedReasons.includes(r.id) ? 'bg-[#9C3F00] border-[#9C3F00]' : 'bg-white border-black/10'}`}>
                          {selectedReasons.includes(r.id) && <Check size={12} className="text-white" />}
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[15px] font-bold font-hei ${selectedReasons.includes(r.id) ? 'text-black' : 'text-black/60'}`}>{r.label}</span>
                            {r.note && <span className="text-[11px] font-bold text-[#dc2626] font-hei">{r.note}</span>}
                          </div>
                          <p className="text-[12px] text-black/40 font-hei leading-tight">{r.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <textarea 
                    className="w-full h-40 p-6 bg-white border border-black/10 rounded-[32px] focus:border-[#9C3F00]/40 outline-none font-hei text-[14px] leading-relaxed resize-none mt-4"
                    placeholder="상세한 사유를 적어주시면 빠른 처리에 도움이 됩니다. (선택 사항)"
                    value={detailReason}
                    onChange={(e) => setDetailReason(e.target.value)}
                  />
                  
                  <div className="flex flex-col gap-4 mt-2">
                    <p className="text-[13px] font-bold text-black/40 uppercase tracking-widest font-hei ml-1">
                      사진 첨부 {isDefectSelected && <span className="text-[#dc2626] ml-1">(불량 접수 시 사진은 필수입니다)</span>}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {attachedImages.map((img, idx) => (
                        <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-black/5 group">
                          <img src={img} alt={`Attached ${idx}`} className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      {attachedImages.length < 3 && (
                        <button 
                          type="button" 
                          onClick={() => fileInputRef.current.click()}
                          className="w-24 h-24 rounded-2xl border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-2 text-black/20 hover:text-[#9C3F00] hover:border-[#9C3F00]/20 transition-all bg-[#FAFAFA]"
                        >
                          <Camera size={24} />
                          <span className="text-[10px] font-bold">{attachedImages.length}/3</span>
                        </button>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        multiple 
                        onChange={handleImageUpload} 
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. Collection Info */}
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3 border-b border-black/5 pb-4">
                  <Truck size={20} className="text-black/20" />
                  <h2 className="text-[20px] font-bold text-[#1B1D0E] font-serif">수거 방식 설정</h2>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <button 
                      type="button"
                      onClick={() => setCollectionMethod('auto')}
                      className={`p-6 rounded-[24px] border flex items-start gap-4 transition-all text-left ${collectionMethod === 'auto' ? 'border-[#9C3F00] bg-[#9C3F00]/5' : 'border-black/5 bg-[#FAFAFA]'}`}
                    >
                      <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${collectionMethod === 'auto' ? 'bg-[#9C3F00] border-[#9C3F00]' : 'border-black/10 bg-white'}`}>
                        {collectionMethod === 'auto' && <Check size={12} className="text-white" />}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[15px] font-bold text-black font-hei">지정 택배사 수거 요청</span>
                        <p className="text-[13px] text-black/40 font-hei">판매자와 계약된 택배사에서 영업일 기준 1~3일 내에 방문합니다.</p>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setCollectionMethod('self')}
                      className={`p-6 rounded-[24px] border flex items-start gap-4 transition-all text-left ${collectionMethod === 'self' ? 'border-[#9C3F00] bg-[#9C3F00]/5' : 'border-black/5 bg-[#FAFAFA]'}`}
                    >
                      <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${collectionMethod === 'self' ? 'bg-[#9C3F00] border-[#9C3F00]' : 'border-black/10 bg-white'}`}>
                        {collectionMethod === 'self' && <Check size={12} className="text-white" />}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[15px] font-bold text-black font-hei">직접 반송</span>
                        <p className="text-[13px] text-black/40 font-hei">고객님이 직접 택배사를 통해 발송하는 방식입니다.</p>
                      </div>
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar Summary */}
            <aside className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-32">
              <div className="bg-white border border-black/5 rounded-[48px] p-10 flex flex-col gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col gap-3">
                  <h3 className="text-[20px] font-bold text-black font-serif">접수 정보 요약</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-black/40 font-hei">접수 유형:</span>
                    <span className="px-3 py-1 bg-[#9C3F00]/5 text-[#9C3F00] text-[12px] font-bold rounded-full">{requestType === 'return' ? '반품 신청' : '교환 신청'}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-6 pt-10 border-t border-black/5">
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="text-black/40 font-hei font-bold uppercase tracking-tight">예상 배송비</span>
                    <span className={`font-sans font-bold text-[18px] ${estimatedShippingFee === 0 ? 'text-[#9C3F00]' : 'text-black'}`}>
                      {estimatedShippingFee === 0 ? '무료 (회사 부담)' : `₩${estimatedShippingFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="p-4 bg-[#FAFAFA] rounded-2xl border border-black/5">
                    <p className="text-[11px] text-black/40 font-hei leading-relaxed">
                      {isCompanyFault 
                        ? '* 상품 불량/오배송 사유가 포함되어 배송비가 면제됩니다.'
                        : '* 단순 변심/사이즈 교환의 경우 왕복 배송비가 발생할 수 있습니다.'
                      }
                      <br />
                      * 상품 회수 및 검수 후 최종 처리가 진행됩니다.
                    </p>
                  </div>
                </div>

                <button type="submit" className="w-full h-16 bg-[#9C3F00] text-white rounded-full text-[16px] font-bold hover:bg-[#853600] transition-all shadow-[0_10px_20px_rgba(156,63,0,0.2)] active:translate-y-0.5">
                  {requestType === 'return' ? '반품' : '교환'} 접수 완료하기
                </button>
              </div>
            </aside>
          </form>
        </div>
      </div>
    </Layout>
  );
}
