import React from 'react';
import { Link, useNavigate } from 'react-router';
import Layout from '../components/common/Layout';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, totalCount } = useCart();
  const navigate = useNavigate();

  const shippingFee = totalPrice >= 50000 ? 0 : 3000;
  const tax = Math.floor(totalPrice * 0.1);
  const finalTotal = totalPrice + shippingFee;

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-[1280px] mx-auto min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 pb-20">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
            <ShoppingBag size={40} className="text-black/10" />
          </div>
          <h2 className="text-[24px] font-bold text-black font-hei mb-4">장바구니가 비어있습니다</h2>
          <p className="text-[15px] text-black/40 font-hei mb-10 text-center">
            늘:pepi-i의 엄선된 컬렉션에서<br/>마음에 드는 상품을 찾아보세요.
          </p>
          <Link 
            to="/" 
            className="w-full max-w-[280px] h-[66px] bg-white border border-[#9C3F00] text-[#9C3F00] rounded-full flex items-center justify-center text-[16px] font-bold hover:bg-[#9C3F00]/5 transition-all active:translate-y-0.5 font-hei"
          >
            쇼핑하러 가기
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full overflow-x-hidden bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-32 pb-20">
          <div className="flex flex-col gap-10 md:gap-12">
            {/* Page Header */}
            <div className="flex flex-col gap-2 border-b border-black/5 pb-8 md:pb-10">
              <h1 className="text-[28px] md:text-[36px] font-black text-black font-serif tracking-tight">장바구니</h1>
              <p className="text-[12px] md:text-[14px] text-black/40 font-hei font-bold uppercase tracking-widest">
                Shopping Cart <span className="ml-2 text-[#9C3F00] font-sans">({totalCount})</span>
              </p>
            </div>

            <div className="flex flex-col xl:flex-row gap-10 xl:gap-16 items-start">
              {/* Cart Items List */}
              <div className="flex-grow flex flex-col gap-6 md:gap-8 w-full order-2 xl:order-1">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4 md:gap-10 py-2 border-b border-black/5 last:border-0 pb-6 md:pb-8 last:pb-0 group relative">
                    {/* Product Image */}
                    <div className="w-20 md:w-32 aspect-[3/4] bg-[#FAFAFA] rounded-xl md:rounded-2xl overflow-hidden shrink-0 border border-black/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow flex flex-col justify-between py-0.5 md:py-1">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[16px] md:text-[20px] font-bold text-black font-hei leading-tight pr-8">{item.name}</h3>
                        <p className="text-[11px] md:text-[12px] font-bold text-black/40 font-sans uppercase tracking-tight">
                          Color: {item.color} / Size: {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 md:mt-6">
                        <div className="flex items-center gap-3 md:gap-4">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-black/10 rounded-full h-8 md:h-10 px-1.5 md:px-2 gap-3 md:gap-4 bg-white shadow-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, item.color, item.size, -1)}
                              className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-black/40 hover:text-black transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-[13px] md:text-[14px] font-bold w-3 md:w-4 text-center font-sans">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.color, item.size, 1)}
                              className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-black/40 hover:text-black transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Option Change Button */}
                          <button 
                            onClick={() => navigate(`/product/${item.id}`, { state: { editItem: item } })}
                            className="px-3 md:px-4 py-1.5 bg-white border border-black/10 rounded-full text-[10px] md:text-[11px] font-bold text-black/60 hover:bg-gray-200 hover:text-black transition-all font-hei"
                          >
                            옵션 변경
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-[16px] md:text-[20px] font-bold text-black font-sans">
                          ₩{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button 
                      onClick={() => removeFromCart(item.id, item.color, item.size)}
                      className="absolute top-1 right-0 p-2 text-black/20 hover:text-[#dc2626] transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Price Summary Section */}
              <div className="w-full xl:w-[400px] shrink-0 xl:sticky xl:top-32 order-1 xl:order-2">
                <div className="bg-[#FAFAFA] rounded-[32px] md:rounded-[48px] p-6 md:p-10 border border-black/5 flex flex-col gap-8 md:gap-10">
                  <h3 className="text-[18px] md:text-[20px] font-bold text-black font-hei">주문 요약</h3>
                  
                  <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex justify-between items-center text-[13px] md:text-[14px]">
                      <span className="text-black/40 font-hei font-bold">총 상품 금액</span>
                      <span className="text-black font-sans font-bold">₩{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px] md:text-[14px]">
                      <span className="text-black/40 font-hei font-bold">배송비</span>
                      <span className="text-black font-sans font-bold">
                        {shippingFee === 0 ? '무료' : `₩${shippingFee.toLocaleString()}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[13px] md:text-[14px]">
                      <span className="text-black/40 font-hei font-bold">부가세 (10%)</span>
                      <span className="text-black font-sans font-bold">₩{tax.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="pt-8 md:pt-10 border-t border-black/5 flex flex-col gap-8 md:gap-10">
                    <div className="flex justify-between items-end">
                      <span className="text-[11px] md:text-[12px] font-bold text-black/40 font-hei">총 결제 금액</span>
                      <span className="text-[26px] md:text-[32px] font-bold text-[#9C3F00] font-sans leading-none tracking-tight">
                        ₩{finalTotal.toLocaleString()}
                      </span>
                    </div>

                    <button 
                      onClick={() => navigate('/checkout', { state: { items: cartItems, fromCart: true } })}
                      className="w-full h-14 md:h-16 bg-[#F9FAFB] border border-black/5 text-[#1B1D0E] rounded-full text-[15px] md:text-[16px] font-bold hover:bg-gray-200 transition-all shadow-[6px_6px_15px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:shadow-inner font-hei"
                    >
                      주문하기
                    </button>

                    <div className="flex flex-col gap-2 items-center">
                      <p className="text-[10px] md:text-[11px] text-black/30 font-hei text-center leading-relaxed">
                        14일 이내 무료 반품 가능<br/>
                        늘:pepi-i 시스템을 통한 안전 결제
                      </p>
                    </div>
                  </div>
                </div>

                {/* Atelier Note */}
                <div className="mt-6 md:mt-8 px-6 md:px-10 py-6 md:py-8 border-l-2 border-[#9C3F00]/20 flex flex-col gap-4">
                  <p className="text-[11px] md:text-[12px] text-black/40 font-hei leading-relaxed italic">
                    "모든 제품은 늘:pepi-i에 스며드는 자연스러운 빛의 흐름을 담아, 의도적인 비대칭과 함께 정성스럽게 제작됩니다."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
