import React, { useEffect } from 'react';
import { Link } from 'react-router';
import Layout from '../components/common/Layout';
import { ICONS } from '../constants/icons';
import { ArrowRight } from 'lucide-react';

export default function Terms() {
  const tabs = [
    { name: '이용약관', path: '/terms' },
    { name: '개인정보 처리방침', path: '/privacy' },
    { name: '이용안내', path: '/guide' },
  ];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="max-w-[1024px] mx-auto px-4 md:px-6 py-12 md:py-20">
        
        {/* Header Section */}
        <div className="flex flex-col items-center gap-8 mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-sans text-[#1c1917] tracking-tighter">이용약관</h1>
          
          <div className="flex border-b border-[#f5f5f4] w-full justify-center">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-8 md:px-16 py-5 text-[16px] font-medium transition-colors relative ${
                  tab.path === '/terms'
                    ? 'text-[#9c3f00] border-b-2 border-[#9c3f00]'
                    : 'text-[#a8a29e] hover:text-[#1c1917]'
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <section className="max-w-[896px] mx-auto px-8 pb-32">
          <div className="space-y-20">
            {/* Article 1 */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-[#1b1d0e] font-hei">제1조 (목적)</h3>
              <div className="text-lg text-black/80 leading-relaxed font-hei space-y-4">
                <p>본 약관은 늘:pepi-i(이하 "몰")이 운영하는 온라인 쇼핑몰에서 제공하는 인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 사이버 몰과 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                <p>'늘:pepi-i'는 프리미엄 늘:pepi-i 감성을 바탕으로 사용자에게 최상의 쇼핑 경험을 제공합니다.</p>
              </div>
            </div>

            {/* Article 2 */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-[#1b1d0e] font-hei">제2조 (정의)</h3>
              <div className="space-y-6">
                <div className="flex gap-5">
                  <span className="text-[#9c3f00] font-bold text-lg">1.</span>
                  <p className="text-lg text-black/80 leading-relaxed font-hei">"몰"이란 늘:pepi-i가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.</p>
                </div>
                <div className="flex gap-5">
                  <span className="text-[#9c3f00] font-bold text-lg">2.</span>
                  <p className="text-lg text-black/80 leading-relaxed font-hei">"이용자"란 "몰"에 접속하여 이 약관에 따라 "몰"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</p>
                </div>
                <div className="flex gap-5">
                  <span className="text-[#9c3f00] font-bold text-lg">3.</span>
                  <p className="text-lg text-black/80 leading-relaxed font-hei">'회원'이라 함은 "몰"에 회원등록을 한 자로서, 계속적으로 "몰"이 제공하는 서비스를 이용할 수 있는 자를 말합니다.</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-[#f0f0f0]" />

            {/* Article 3 */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-[#1b1d0e] font-hei">제3조 (약관 등의 명시와 설명 및 개정)</h3>
              <p className="text-lg text-black/80 leading-relaxed font-hei">
                "몰"은 이 약관의 내용과 상호 및 영업소 소재지 주소, 대표자의 성명, 사업자등록번호, 연락처 등을 이용자가 쉽게 알 수 있도록 늘:pepi-i 사이버몰의 초기 서비스화면에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 구성할 수 있습니다.
              </p>
            </div>

            {/* Article 4 */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-[#1b1d0e] font-hei">제4조 (서비스의 제공 및 변경)</h3>
              <div className="space-y-6">
                <div className="flex gap-5">
                  <span className="text-[#9c3f00] font-bold text-lg">1.</span>
                  <p className="text-lg text-black/80 leading-relaxed font-hei">재화 또는 용역에 대한 정보 제공 및 구매계약의 체결</p>
                </div>
                <div className="flex gap-5">
                  <span className="text-[#9c3f00] font-bold text-lg">2.</span>
                  <p className="text-lg text-black/80 leading-relaxed font-hei">구매계약이 체결된 재화 또는 용역의 배송</p>
                </div>
                <div className="flex gap-5">
                  <span className="text-[#9c3f00] font-bold text-lg">3.</span>
                  <p className="text-lg text-black/80 leading-relaxed font-hei">기타 "몰"이 정하는 업무</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-[#f0f0f0]" />

            {/* Article 5 */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-[#1b1d0e] font-hei">제5조 (회원가입)</h3>
              <div className="space-y-8">
                <p className="text-lg text-black/80 leading-relaxed font-hei">
                  이용자는 "몰"이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다. "몰"은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
                </p>
                <div className="pl-8 border-l-2 border-[#9c3f00]/20 space-y-4 opacity-80">
                  <p className="text-[15px] text-black/80 font-hei">- 가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우</p>
                  <p className="text-[15px] text-black/80 font-hei">- 등록 내용에 허위, 기재누락, 오기가 있는 경우</p>
                  <p className="text-[15px] text-black/80 font-hei">- 기타 회원으로 등록하는 것이 "몰"의 기술상 현저히 지장이 있다고 판단되는 경우</p>
                </div>
              </div>
            </div>

            {/* Article 6 */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-[#1b1d0e] font-hei">제6조 (구매신청 및 개인정보 제공 동의 등)</h3>
              <p className="text-lg text-black/80 leading-relaxed font-hei">
                "몰" 이용자는 "몰"상에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, "몰"은 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다. 늘:pepi-i 제품의 특성상 주문 제작 상품의 경우 별도의 고지 사항을 따릅니다.
              </p>
            </div>

            {/* Article 7 */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-[#1b1d0e] font-hei">제7조 (청약철회 등)</h3>
              <p className="text-lg text-black/80 leading-relaxed font-hei">
                "몰"과 재화등의 구매에 관한 계약을 체결한 이용자는 「전자상거래 등에서의 소비자보호에 관한 법률」 제13조 제2항에 따른 계약내용에 관한 서면을 받은 날부터 7일 이내에는 청약의 철회를 할 수 있습니다. 단, 늘:pepi-i의 핸드메이드 혹은 커스텀 제품군은 별도의 기준이 적용될 수 있습니다.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-20 flex justify-center">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-full flex items-center gap-2.5 transition-all shadow-md hover:shadow-lg group">
              <span className="text-[13px] font-medium font-hei tracking-tight">문의사항이 있으신가요?</span>
              <ICONS.arrowRight className="text-white text-[14px] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
