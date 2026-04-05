import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import Layout from '../components/common/Layout';
import { CreditCard, Landmark, PiggyBank, MapPin, Package, RotateCcw, AlertTriangle, PenTool, CheckCircle2, Box, MessageCircle, Navigation, Smartphone, ArrowRight } from 'lucide-react';
import { ICONS } from '../constants/icons';

export default function Guide() {
  const location = useLocation();
  const tabs = [
    { name: '이용약관', path: '/terms' },
    { name: '개인정보 처리방침', path: '/privacy' },
    { name: '이용안내', path: '/guide' },
  ];

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <Layout>
      <div className="max-w-[1024px] mx-auto px-4 md:px-6 py-12 md:py-20">
        
        {/* Header Section */}
        <div className="flex flex-col items-center gap-8 mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-sans text-[#1c1917] tracking-tighter">이용안내</h1>
          
          <div className="flex border-b border-[#f5f5f4] w-full justify-center">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-6 md:px-12 py-4 text-sm font-medium transition-colors relative ${
                  tab.path === '/guide'
                    ? 'text-[#9c3f00] border-b-2 border-[#9c3f00]'
                    : 'text-[#a8a29e] hover:text-[#1c1917]'
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-20 md:gap-32">
          
          {/* Payment Section */}
          <section className="flex flex-col gap-10 md:gap-14">
            <div className="flex items-center gap-4">
              <CreditCard className="text-[#9c3f00] w-8 h-8 md:w-10 md:h-10" />
              <h2 className="text-3xl md:text-[36px] font-hei text-[#1b1d0e]">결제 안내</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div className="border border-gray-100 rounded-[24px] p-8 md:p-10 flex flex-col items-center justify-center gap-4 bg-white">
                <CreditCard className="text-[#3B82F6] w-8 h-8 md:w-10 md:h-10" />
                <span className="text-[15px] md:text-[16px] font-medium font-hei text-gray-700">신용/체크카드</span>
              </div>
              <div className="border border-gray-100 rounded-[24px] p-8 md:p-10 flex flex-col items-center justify-center gap-4 bg-white">
                <Landmark className="text-[#6366F1] w-8 h-8 md:w-10 md:h-10" />
                <span className="text-[15px] md:text-[16px] font-medium font-hei text-gray-700">실시간 계좌이체</span>
              </div>
              <div className="border border-gray-100 rounded-[24px] p-8 md:p-10 flex flex-col items-center justify-center gap-4 bg-white">
                <PiggyBank className="text-[#EC4899] w-8 h-8 md:w-10 md:h-10" />
                <span className="text-[15px] md:text-[16px] font-medium font-hei text-gray-700">무통장 입금</span>
              </div>
              <div className="border border-gray-100 rounded-[24px] p-8 md:p-10 flex flex-col items-center justify-center gap-4 bg-white">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FEE500] rounded-[8px] flex items-center justify-center text-[14px] md:text-[16px] font-black font-sans text-[#1B1D0E]">K</div>
                <span className="text-[15px] md:text-[16px] font-medium font-hei text-gray-700">카카오페이</span>
              </div>
              <div className="border border-gray-100 rounded-[24px] p-8 md:p-10 flex flex-col items-center justify-center gap-4 bg-white">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#03C75A] rounded-[8px] flex items-center justify-center text-[14px] md:text-[16px] font-black font-sans text-white">N</div>
                <span className="text-[15px] md:text-[16px] font-medium font-hei text-gray-700">네이버페이</span>
              </div>
              <div className="border border-gray-100 rounded-[24px] p-8 md:p-10 flex flex-col items-center justify-center gap-4 bg-white">
                <Smartphone className="text-[#6B7280] w-8 h-8 md:w-10 md:h-10" />
                <span className="text-[15px] md:text-[16px] font-medium font-hei text-gray-700">기타결제</span>
              </div>
            </div>

            <div className="bg-[#fafafa] border border-black/5 rounded-[24px] p-8 md:p-10">
              <ul className="flex flex-col gap-4 md:gap-5 text-base md:text-lg text-[#564338] font-hei">
                <li className="flex items-start gap-3">
                  <span className="text-[#9c3f00] font-bold">•</span>
                  <span>무통장 입금 시 주문 시 입력한 입금자명과 실제 입금자의 성명이 반드시 일치해야 합니다.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9c3f00] font-bold">•</span>
                  <span>3일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동 취소됩니다.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Delivery Section */}
          <section id="delivery-section" className="flex flex-col gap-6 md:gap-10 scroll-mt-32">
            <div className="flex items-center gap-3">
              <Package className="text-[#9c3f00] w-6 h-6 md:w-8 md:h-8" />
              <h2 className="text-2xl md:text-[30px] font-hei text-[#1b1d0e]">배송 안내</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="border border-gray-200 rounded-2xl p-6 md:p-10 flex flex-col gap-6 md:gap-8">
                <h3 className="text-lg font-medium text-[#9c3f00] font-hei">배송 기간 및 지역</h3>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-start pb-5 border-b border-black/5">
                    <span className="font-medium text-sm md:text-base font-hei w-20">배송 기간</span>
                    <div className="text-right">
                      <p className="text-sm md:text-base text-[#564338] mb-1">주문 확인 후 2 - 5일 소요</p>
                      <p className="text-xs text-[#564338]/70 font-hei">(주말 및 공휴일 제외)</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-5 border-b border-black/5">
                    <span className="font-medium text-sm md:text-base font-hei w-20">배송 지역</span>
                    <span className="text-sm md:text-base text-[#564338] font-hei">대한민국 전 지역</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm md:text-base font-hei w-20">배송 업체</span>
                    <span className="text-sm md:text-base text-[#564338] font-hei">CJ대한통운</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-2xl p-6 md:p-10 flex flex-col gap-6 md:gap-8">
                <h3 className="text-lg font-medium text-[#9c3f00] font-hei">배송비 안내</h3>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-[#9c3f00]/20 flex items-center justify-center bg-[#9c3f00]/5 shrink-0">
                      <Package className="text-[#9c3f00] w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-lg md:text-xl font-medium text-[#1b1d0e] font-hei mb-1">5만원 이상 무료 배송</p>
                      <p className="text-sm text-[#564338] font-hei">5만원 미만 기본배송비 3,000원</p>
                    </div>
                  </div>
                  <div className="bg-[#fafafa] rounded-lg p-4 mt-auto">
                    <p className="text-xs text-[#564338] font-hei leading-relaxed">
                      * 제주 및 도서 산간 지역은 추가 배송비가 발생할 수 있습니다.<br/>
                      * 예약 판매 상품의 경우 공지된 출고일에 맞춰 순차 배송됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Return & Exchange Section */}
          <section id="return-section" className="flex flex-col gap-6 md:gap-10 scroll-mt-32">
            <div className="flex items-center gap-3">
              <RotateCcw className="text-[#9c3f00] w-6 h-6 md:w-8 md:h-8" />
              <h2 className="text-2xl md:text-[30px] font-hei text-[#1b1d0e]">교환 및 반품 안내</h2>
            </div>
            
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="border-l-4 border-[#9c3f00] pl-6 md:pl-8 py-2">
                <h3 className="text-lg md:text-xl font-medium text-[#1b1d0e] font-hei mb-2">반품 및 교환 신청 기간</h3>
                <p className="text-sm md:text-base text-[#564338] font-hei">
                  상품 수령일로부터 <span className="text-[#9c3f00] font-medium">7일 이내</span>에 고객센터 또는 마이페이지를 통해 접수해 주셔야 합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="border border-gray-200 rounded-2xl p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-medium text-[#1b1d0e] font-hei">변심에 의한 반품</h4>
                    <span className="text-xs font-bold text-[#564338]/40 tracking-wider">CASE 01</span>
                  </div>
                  <ul className="flex flex-col gap-3 text-sm text-[#564338] font-hei">
                    <li className="flex items-start gap-2">
                      <span className="text-[#9c3f00] font-bold">•</span>
                      <span>단순 변심에 의한 교환/반품 비용은 고객님 부담입니다.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#9c3f00] font-bold">•</span>
                      <span>왕복 배송비 6,000원이 부과됩니다.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#9c3f00] font-bold">•</span>
                      <span>상품 및 패키지가 훼손되지 않은 상태여야 합니다.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-2xl p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-medium text-[#1b1d0e] font-hei">상품 불량 및 오배송</h4>
                    <span className="text-xs font-bold text-[#564338]/40 tracking-wider">CASE 02</span>
                  </div>
                  <ul className="flex flex-col gap-3 text-sm text-[#564338] font-hei">
                    <li className="flex items-start gap-2">
                      <span className="text-[#9c3f00] font-bold">•</span>
                      <span>불량 상품의 경우 배송비는 늘:pepi-i가 부담합니다.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#9c3f00] font-bold">•</span>
                      <span>수령 후 즉시 사진 촬영과 함께 접수 부탁드립니다.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#9c3f00] font-bold">•</span>
                      <span>동일 상품으로의 무상 교환을 원칙으로 합니다.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border border-gray-200 rounded-2xl p-6 md:p-12 mt-4 md:mt-0">
                <h4 className="text-xl md:text-2xl font-medium text-[#1b1d0e] font-hei text-center mb-10 md:mb-12">진행 절차</h4>
                
                <div className="relative">
                  <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-black/5 -translate-y-1/2"></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 relative z-10">
                    
                    <div className="flex flex-col items-center bg-white">
                      <div className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center bg-white mb-4 shadow-sm">
                        <PenTool className="w-5 h-5 text-[#9c3f00]" />
                      </div>
                      <p className="font-bold text-sm text-[#1b1d0e] mb-1">01. 접수</p>
                      <p className="text-xs text-[#564338] font-hei text-center">마이페이지에서 접수</p>
                    </div>

                    <div className="flex flex-col items-center bg-white">
                      <div className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center bg-white mb-4 shadow-sm">
                        <Box className="w-5 h-5 text-[#9c3f00]" />
                      </div>
                      <p className="font-bold text-sm text-[#1b1d0e] mb-1">02. 패키징</p>
                      <p className="text-xs text-[#564338] font-hei text-center">원래 상태로 포장</p>
                    </div>

                    <div className="flex flex-col items-center bg-white">
                      <div className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center bg-white mb-4 shadow-sm">
                        <RotateCcw className="w-5 h-5 text-[#9c3f00]" />
                      </div>
                      <p className="font-bold text-sm text-[#1b1d0e] mb-1">03. 수거</p>
                      <p className="text-xs text-[#564338] font-hei text-center">지정 택배사 수거</p>
                    </div>

                    <div className="flex flex-col items-center bg-white">
                      <div className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center bg-white mb-4 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-[#9c3f00]" />
                      </div>
                      <p className="font-bold text-sm text-[#1b1d0e] mb-1">04. 검수 및 환불</p>
                      <p className="text-xs text-[#564338] font-hei text-center">상품 확인 후 처리</p>
                    </div>

                  </div>
                </div>
              </div>

              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 md:p-8 mt-4">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <AlertTriangle className="text-red-600 w-5 h-5" />
                  <h4 className="text-base md:text-lg font-medium text-red-600 font-hei">교환/반품이 불가한 경우</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm text-[#564338] font-hei">
                  <div className="flex items-start gap-2">
                    <span className="text-[#564338]">•</span>
                    <span>상품 수령 후 7일이 경과한 경우</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#564338]">•</span>
                    <span>고객님의 부주의로 상품이 훼손되거나 가치가 상실된 경우</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#564338]">•</span>
                    <span>착용 흔적, 향수, 화장품 등의 오염이 발견된 경우</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#564338]">•</span>
                    <span>세탁 또는 수선을 진행한 상품</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
}

