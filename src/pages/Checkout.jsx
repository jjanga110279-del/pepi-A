import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';
import { 
  CreditCard, 
  Wallet, 
  Smartphone, 
  ChevronDown,
  X,
  Ticket,
  Coins,
  Check,
  Building2,
  Banknote,
  MapPin,
  Plus,
  Search as SearchIcon
} from 'lucide-react';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, coupons, useCoupon, addressBook, addOrder } = useUser();
  const { clearCart } = useCart();

  const [orderItems, setOrderItems] = useState([]);
  const [isSameAsOrderer, setIsSameAsOrderer] = useState(false);
  const [showDirectInput, setShowDirectInput] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showAddressBook, setShowAddressBook] = useState(false);
  
  // 주소 검색 관련 상태
  const [showAddressSearch, setShowAddressSearch] = useState(false);
  const [addressSearchQuery, setAddressSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const allMockAddresses = [
    { zip: '06035', base: '서울특별시 강남구 가로수길 15 (신사동)' },
    { zip: '04524', base: '서울특별시 중구 세종대로 110 (태평로1가, 서울특별시청)' },
    { zip: '03154', base: '서울특별시 종로구 사직로 161 (세종로, 경복궁)' },
    { zip: '06164', base: '서울특별시 강남구 영동대로 513 (삼성동, 코엑스)' },
    { zip: '05551', base: '서울특별시 송파구 올림픽로 300 (신천동, 롯데월드타워)' },
    { zip: '48058', base: '부산광역시 해운대구 수영강변대로 120 (우동, 영화의전당)' },
    { zip: '16514', base: '경기도 수원시 영통구 광교중앙로 140 (이의동, 경기도청)' }
  ];

  const [formData, setFormData] = useState({
    ordererName: user.name || '',
    ordererPhone: user.phone || '',
    shippingName: '',
    shippingPhone: '',
    zipcode: '',
    address: '',
    detailAddress: '',
    deliveryNote: '',
    customNote: '',
    usePoint: 0,
    paymentMethod: 'card',
    selectedCard: '현대카드 (2개월 무이자)',
    cardInstallment: '2개월 무이자',
    vbankBank: ''
  });

  const availableCoupons = coupons.filter(c => !c.used);

  // 실시간 주소 검색 시뮬레이션
  useEffect(() => {
    if (addressSearchQuery.length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = allMockAddresses.filter(addr => 
          addr.base.toLowerCase().includes(addressSearchQuery.toLowerCase()) || 
          addr.zip.includes(addressSearchQuery)
        );
        setSearchResults(filtered);
        setIsSearching(false);
        setFocusedIndex(-1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
      setFocusedIndex(-1);
    }
  }, [addressSearchQuery]);

  const selectAddress = (addr) => {
    setFormData(prev => ({
      ...prev,
      zipcode: addr.zip,
      address: addr.base,
      detailAddress: ''
    }));
    setShowAddressSearch(false);
    setAddressSearchQuery('');
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showAddressSearch || searchResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < searchResults.length) {
        selectAddress(searchResults[focusedIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowAddressSearch(false);
    }
  };

  useEffect(() => {
    if (location.state?.items) {
      setOrderItems(location.state.items);
    } else {
      alert('주문할 상품이 없습니다.');
      navigate('/cart');
    }
    
    // 기본 배송지 설정
    const defaultAddr = addressBook.find(a => a.isDefault);
    if (defaultAddr) {
      setFormData(prev => ({
        ...prev,
        shippingName: defaultAddr.name,
        shippingPhone: defaultAddr.phone,
        zipcode: defaultAddr.zipcode,
        address: defaultAddr.address,
        detailAddress: defaultAddr.detail
      }));
    }
  }, [location.state, navigate, addressBook]);

  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const shippingFee = subtotal >= 50000 ? 0 : 3000;
  const couponDiscount = selectedCoupon ? selectedCoupon.amount : 0;
  const usedPoint = parseInt(formData.usePoint) || 0;
  const finalTotal = subtotal + shippingFee - couponDiscount - usedPoint;

  const handleSameAsOrderer = () => {
    const nextValue = !isSameAsOrderer;
    setIsSameAsOrderer(nextValue);
    if (nextValue) {
      setFormData(prev => ({ ...prev, shippingName: prev.ordererName, shippingPhone: prev.ordererPhone }));
    }
  };

  const selectFromAddressBook = (addr) => {
    setFormData(prev => ({
      ...prev,
      shippingName: addr.name,
      shippingPhone: addr.phone,
      zipcode: addr.zipcode,
      address: addr.address,
      detailAddress: addr.detail
    }));
    setShowAddressBook(false);
    setIsSameAsOrderer(false);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (selectedCoupon) useCoupon(selectedCoupon.id);
    
    // 주문 데이터 생성
    const orderData = {
      items: orderItems.map(item => ({ ...item, status: '주문 확인 중' })),
      totalPrice: finalTotal,
      subtotal: subtotal,
      shippingFee: shippingFee,
      couponDiscount: couponDiscount,
      usedPoint: usedPoint,
      paymentMethod: formData.paymentMethod,
      paymentDetail: formData.paymentMethod === 'card' ? '신용카드' : formData.paymentMethod === 'kakao' ? '카카오페이' : '무통장입금',
      cardInfo: formData.paymentMethod === 'card' ? `${formData.selectedCard} / ${formData.cardInstallment}` : '',
      status: '주문 확인 중',
      shippingName: formData.shippingName,
      shippingPhone: formData.shippingPhone,
      zipcode: formData.zipcode,
      address: formData.address,
      detailAddress: formData.detailAddress
    };
    
    const newOrder = addOrder(orderData);
    
    if (location.state?.fromCart) clearCart();
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <Layout>
      <div className="w-full bg-white pt-32 pb-20 overflow-x-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2 border-b border-black/5 pb-10">
              <h1 className="text-[36px] font-black text-[#1B1D0E] font-serif tracking-tight">주문 / 결제</h1>
              <p className="text-[14px] text-[#9CA3AF] font-hei font-medium uppercase tracking-widest">
                The Sun-Drenched Atelier Checkout Flow
              </p>
            </div>

            <form onSubmit={handleOrder} className="flex flex-col xl:flex-row gap-16 items-start">
              <div className="flex-grow flex flex-col gap-16 w-full">
                
                {/* 1. Orderer Info */}
                <section className="flex flex-col gap-8">
                  <div className="border-b border-black/5 pb-4"><h2 className="text-[20px] font-bold text-[#1B1D0E] font-serif">주문자 정보</h2></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" value={formData.ordererName} className="h-14 px-6 bg-[#FAFAFA] rounded-2xl border-none font-hei font-bold" readOnly />
                    <input type="tel" value={formData.ordererPhone} className="h-14 px-6 bg-[#FAFAFA] rounded-2xl border-none font-sans font-bold" readOnly />
                  </div>
                </section>

                {/* 2. Shipping Info */}
                <section className="flex flex-col gap-8">
                  <div className="border-b border-black/5 pb-4 flex justify-between items-end">
                    <h2 className="text-[20px] font-bold text-[#1B1D0E] font-serif">배송지 정보</h2>
                    <div className="flex items-center gap-6">
                      <button type="button" onClick={() => setShowAddressBook(true)} className="text-[12px] font-bold text-[#9C3F00] border-b border-[#9C3F00] pb-0.5">주소록에서 선택</button>
                      <div onClick={handleSameAsOrderer} className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSameAsOrderer ? 'bg-[#9C3F00] border-[#9C3F00]' : 'border-gray-200 group-hover:border-gray-300'}`}>
                          <Check size={12} className={isSameAsOrderer ? 'text-white' : 'text-transparent'} />
                        </div>
                        <span className="text-[12px] font-bold text-black/40 font-hei">주문자 정보와 동일</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" value={formData.shippingName} onChange={(e) => setFormData({...formData, shippingName: e.target.value})} placeholder="수령인" className="h-14 px-6 bg-[#FAFAFA] rounded-2xl border-none font-hei font-bold" required />
                    <input type="tel" value={formData.shippingPhone} onChange={(e) => setFormData({...formData, shippingPhone: e.target.value})} placeholder="연락처" className="h-14 px-6 bg-[#FAFAFA] rounded-2xl border-none font-sans font-bold" required />
                  </div>
                  <div className="flex flex-col gap-3 relative">
                    <div className="flex gap-2">
                      <input type="text" value={formData.zipcode} placeholder="우편번호" readOnly className="w-32 h-14 px-6 bg-[#FAFAFA] rounded-2xl border-none font-bold" />
                      <button 
                        type="button" 
                        onClick={() => {
                          setShowAddressSearch(true);
                          setSearchResults(allMockAddresses.slice(0, 3));
                        }}
                        className="px-6 bg-white border border-black/10 rounded-2xl text-[13px] font-bold hover:bg-gray-200 transition-all font-hei"
                      >
                        주소 검색
                      </button>
                    </div>
                    <input type="text" value={formData.address} placeholder="기본 주소" readOnly className="w-full h-14 px-6 bg-[#FAFAFA] rounded-2xl border-none font-bold" />
                    <input type="text" value={formData.detailAddress} onChange={(e) => setFormData({...formData, detailAddress: e.target.value})} placeholder="상세 주소" className="w-full h-14 px-6 bg-white border border-black/10 rounded-2xl focus:border-black/20 outline-none" required />

                    {/* Real-feel Address Search Modal - NOW APPEARING ABOVE */}
                    {showAddressSearch && (
                      <div className="absolute left-0 bottom-full mb-2 w-full bg-white border border-black/10 rounded-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.15)] z-50 p-6 animate-in slide-in-from-bottom-2 duration-200">
                        <div className="flex justify-between items-center mb-6">
                          <h4 className="text-[16px] font-bold text-black font-hei">주소 검색</h4>
                          <button type="button" onClick={() => {
                            setShowAddressSearch(false);
                            setAddressSearchQuery('');
                            setSearchResults([]);
                          }}><X size={20} className="text-black/20 hover:text-black"/></button>
                        </div>
                        <div className="relative mb-6">
                          <input 
                            autoFocus
                            type="text" 
                            value={addressSearchQuery}
                            onChange={(e) => setAddressSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="주소 키워드 입력 (예: 서울, 강남, 춘천...)" 
                            className="w-full h-12 pl-10 pr-4 bg-gray-50 border-none rounded-xl text-[14px] focus:ring-2 focus:ring-[#9C3F00]/20 font-hei" 
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black/20">
                            {isSearching ? <SearchIcon size={18} className="animate-spin text-[#9C3F00]" /> : <SearchIcon size={18} />}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                          {addressSearchQuery.length === 0 ? (
                            <div className="py-10 text-center">
                              <p className="text-[13px] text-black/40 font-hei">찾으시는 도로명 주소 또는 지번을 입력하세요.</p>
                            </div>
                          ) : searchResults.length > 0 ? (
                            <>
                              <p className="text-[11px] font-bold text-black/30 uppercase tracking-wider mb-2 px-2">검색 결과 ({searchResults.length})</p>
                              {searchResults.map((addr, i) => (
                                <button 
                                  key={i} 
                                  type="button"
                                  onClick={() => selectAddress(addr)}
                                  onMouseEnter={() => setFocusedIndex(i)}
                                  className={`flex flex-col items-start p-4 rounded-2xl transition-all border border-transparent text-left w-full group ${focusedIndex === i ? 'bg-[#9C3F00]/5 border-[#9C3F00]/10' : 'hover:bg-gray-50'}`}
                                >
                                  <span className={`text-[14px] font-bold mb-1 transition-colors font-hei ${focusedIndex === i ? 'text-[#9C3F00]' : 'text-black group-hover:text-[#9C3F00]'}`}>{addr.base}</span>
                                  <span className={`text-[12px] font-sans ${focusedIndex === i ? 'text-[#9C3F00]/60' : 'text-black/40'}`}>우편번호: {addr.zip}</span>
                                </button>
                              ))}
                            </>
                          ) : !isSearching && (
                            <div className="py-16 text-center flex flex-col items-center gap-4">
                              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-black/20">
                                <SearchIcon size={24} />
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-[15px] font-bold text-black/60 font-hei">검색 결과가 없습니다.</p>
                                <p className="text-[12px] text-black/30 font-hei">정확한 주소 또는 키워드로 다시 검색해 주세요.</p>
                              </div>
                              <button 
                                type="button"
                                onClick={() => setAddressSearchQuery('')}
                                className="mt-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-[12px] font-bold text-black/60 transition-all"
                              >
                                검색어 초기화
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* 3. Coupon & Points */}
                <section className="flex flex-col gap-8">
                  <div className="border-b border-black/5 pb-4"><h2 className="text-[20px] font-bold text-[#1B1D0E] font-serif">쿠폰 / 포인트 사용</h2></div>
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-[12px] font-bold text-black/40 uppercase tracking-widest font-hei ml-1">쿠폰 적용</label>
                      <div className="relative">
                        <button type="button" onClick={() => setShowCouponModal(!showCouponModal)} className="w-full h-14 px-6 flex items-center justify-between bg-white border border-black/10 rounded-2xl hover:bg-gray-50 transition-all">
                          <div className="flex items-center gap-3">
                            <Ticket size={18} className={selectedCoupon ? "text-[#9C3F00]" : "text-black/20"} />
                            <span className={`text-[14px] font-bold ${selectedCoupon ? "text-black" : "text-black/40"}`}>{selectedCoupon ? selectedCoupon.name : "사용 가능한 쿠폰을 선택하세요"}</span>
                          </div>
                          <ChevronDown size={18} className={`text-black/20 transition-transform ${showCouponModal ? 'rotate-180' : ''}`} />
                        </button>
                        {showCouponModal && (
                          <div className="absolute top-16 left-0 w-full bg-white border border-black/10 rounded-2xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                            {availableCoupons.length > 0 ? availableCoupons.map(coupon => (
                              <button key={coupon.id} type="button" onClick={() => { setSelectedCoupon(coupon); setShowCouponModal(false); }} className="w-full px-6 py-4 text-left hover:bg-gray-50 flex justify-between items-center border-b border-black/5 last:border-0">
                                <span className="text-[14px] font-bold text-black">{coupon.name}</span>
                                <span className="text-[13px] font-bold text-[#9C3F00]">-₩{coupon.amount.toLocaleString()}</span>
                              </button>
                            )) : <div className="px-6 py-8 text-center text-black/40 text-[13px]">사용 가능한 쿠폰이 없습니다.</div>}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[12px] font-bold text-black/40 uppercase tracking-widest font-hei ml-1">포인트 사용</label>
                      <div className="flex gap-2 md:gap-3">
                        <input type="number" value={formData.usePoint || ''} onChange={(e) => setFormData({...formData, usePoint: e.target.value})} className="flex-grow h-14 px-4 md:px-6 bg-[#FAFAFA] rounded-2xl border-none focus:ring-2 focus:ring-black/5 font-sans font-bold text-[14px] md:text-base" placeholder="0" />
                        <button type="button" onClick={() => setFormData({...formData, usePoint: 12450})} className="px-4 md:px-6 bg-white border border-black/10 rounded-2xl text-[12px] md:text-[13px] font-bold hover:bg-gray-200 transition-all font-hei whitespace-nowrap shrink-0">전액 사용</button>
                      </div>
                      <p className="text-[12px] text-black/40 font-hei ml-1">보유 포인트: <strong className="text-black/80">12,450 P</strong></p>
                    </div>
                  </div>
                </section>

                {/* 4. Payment Method */}
                <section className="flex flex-col gap-8">
                  <div className="border-b border-black/5 pb-4"><h2 className="text-[20px] font-bold text-[#1B1D0E] font-serif">결제 수단</h2></div>
                  <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4">
                    {[
                      { id: 'card', label: '신용카드', icon: <CreditCard size={18} md:size={20}/> },
                      { id: 'kakao', label: '카카오', icon: <div className="w-5 h-5 md:w-6 md:h-6 bg-[#FEE500] rounded-[6px] flex items-center justify-center text-[10px] font-black text-black">K</div> },
                      { id: 'naver', label: '네이버', icon: <div className="w-5 h-5 md:w-6 md:h-6 bg-[#03C75A] rounded-[6px] flex items-center justify-center text-[10px] font-black text-white">N</div> },
                      { id: 'vbank', label: '무통장', icon: <Banknote size={18} md:size={20}/> },
                      { id: 'transfer', label: '계좌이체', icon: <Building2 size={18} md:size={20}/> },
                      { id: 'etc', label: '기타결제', icon: <Smartphone size={18} md:size={20}/> }
                    ].map((method) => (
                      <button key={method.id} type="button" onClick={() => setFormData({...formData, paymentMethod: method.id})} className={`flex flex-col items-center justify-center gap-1.5 md:gap-2 h-20 md:h-24 rounded-2xl border transition-all ${formData.paymentMethod === method.id ? 'border-[#9C3F00] bg-[#9C3F00]/5 shadow-sm' : 'border-black/5 bg-white hover:border-black/10'}`}>
                        <span className={formData.paymentMethod === method.id ? 'text-[#9C3F00]' : 'text-black/20'}>{method.icon}</span>
                        <span className={`text-[11px] md:text-[13px] font-bold ${formData.paymentMethod === method.id ? 'text-black' : 'text-black/40'} break-keep text-center`}>{method.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">
                    {formData.paymentMethod === 'card' && (
                      <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-black/5 flex flex-col gap-4">
                        <p className="text-[13px] font-bold text-black font-hei">카드사 선택</p>
                        <select className="w-full h-12 px-4 bg-white border border-black/10 rounded-xl text-[14px] focus:outline-none appearance-none font-hei font-bold"><option>현대카드 (2개월 무이자)</option><option>삼성카드</option></select>
                      </div>
                    )}
                    {formData.paymentMethod === 'vbank' && (
                      <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-black/5 flex flex-col gap-4">
                        <p className="text-[13px] font-bold text-black font-hei">입금 은행 선택</p>
                        <select className="w-full h-12 px-4 bg-white border border-black/10 rounded-xl text-[14px] focus:outline-none font-hei font-bold"><option>우리은행 1002-123-456789 (예금주: 늘:pepi-i)</option></select>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Order Summary */}
              <div className="w-full xl:w-[448px] shrink-0 xl:sticky xl:top-32">
                <div className="bg-[#FAFAFA] rounded-[48px] p-10 border border-black/5 flex flex-col gap-10">
                  <h3 className="text-[20px] font-bold text-black font-serif">주문 요약</h3>
                  
                  {/* Product List in Summary */}
                  <div className="flex flex-col gap-6 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                    {orderItems.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="w-20 h-24 rounded-2xl overflow-hidden bg-white border border-black/5 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-1 py-1">
                          <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest font-sans">{item.brand}</span>
                          <h4 className="text-[14px] font-bold text-black font-hei leading-tight line-clamp-1">{item.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[13px] font-bold text-black font-sans">₩{(item.price * (item.quantity || 1)).toLocaleString()}</span>
                            <span className="text-[12px] text-black/40 font-sans">/ {item.quantity || 1}개</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-6 pt-6 border-t border-black/5">
                    <div className="flex justify-between items-center text-[14px]"><span className="text-black/40 font-hei font-bold">총 상품 금액</span><span className="text-black font-sans font-bold">₩{subtotal.toLocaleString()}</span></div>
                    <div className="flex justify-between items-center text-[14px]"><span className="text-black/40 font-hei font-bold">배송비</span><span className="text-black font-sans font-bold">{shippingFee === 0 ? '무료' : `+ ₩${shippingFee.toLocaleString()}`}</span></div>
                    {couponDiscount > 0 && <div className="flex justify-between items-center text-[14px]"><span className="text-black/40 font-hei font-bold">쿠폰 할인</span><span className="text-[#dc2626] font-sans font-bold">- ₩{couponDiscount.toLocaleString()}</span></div>}
                    {usedPoint > 0 && <div className="flex justify-between items-center text-[14px]"><span className="text-black/40 font-hei font-bold">포인트 사용</span><span className="text-[#dc2626] font-sans font-bold">- ₩{usedPoint.toLocaleString()}</span></div>}
                  </div>
                  <div className="pt-10 border-t border-black/5 flex flex-col gap-10">
                    <div className="flex justify-between items-end"><span className="text-[12px] font-bold text-black/40 font-hei">최종 결제 금액</span><span className="text-[32px] font-bold text-[#9C3F00] font-sans leading-none tracking-tight">₩{finalTotal.toLocaleString()}</span></div>
                    <button type="submit" className="w-full h-16 bg-[#F9FAFB] border border-black/5 text-[#1B1D0E] rounded-full text-[16px] font-bold hover:bg-gray-200 transition-all shadow-[6px_6px_15px_rgba(0,0,0,0.1)] active:translate-y-0.5 font-hei">결제하기</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Address Book Modal */}
      {showAddressBook && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-10 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-[20px] font-bold text-black font-serif">나의 주소록</h4>
              <button type="button" onClick={() => setShowAddressBook(false)}><X size={24} className="text-black/20 hover:text-black"/></button>
            </div>
            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {addressBook.map((addr) => (
                <button key={addr.id} type="button" onClick={() => selectFromAddressBook(addr)} className="w-full flex flex-col items-start p-6 rounded-3xl border border-black/5 hover:border-[#9C3F00] hover:bg-[#9C3F00]/5 transition-all group text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[15px] font-bold text-black font-hei">{addr.label}</span>
                    {addr.isDefault && <span className="px-2 py-0.5 bg-black text-white text-[9px] font-bold rounded-full uppercase">Default</span>}
                  </div>
                  <p className="text-[13px] text-black/60 font-sans mb-1">{addr.address} {addr.detail}</p>
                  <p className="text-[12px] text-black/30 font-sans">{addr.name} | {addr.phone}</p>
                </button>
              ))}
            </div>
            <Link to="/address-book" className="mt-8 w-full h-14 border border-black/10 rounded-full flex items-center justify-center gap-2 text-[14px] font-bold text-black hover:bg-gray-50 transition-all font-hei">
              <Plus size={18} /> 새 주소 추가하기
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
}
