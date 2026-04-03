import React from 'react';
import { Link } from 'react-router';
import Layout from '../components/common/Layout';
import { ArrowRight } from 'lucide-react';

export default function Privacy() {
  const tabs = [
    { name: '이용약관', path: '/terms' },
    { name: '개인정보 처리방침', path: '/privacy' },
    { name: '이용안내', path: '/guide' },
  ];

  return (
    <Layout>
      <div className="max-w-[1024px] mx-auto px-4 md:px-6 py-12 md:py-20">
        
        {/* Header Section */}
        <div className="flex flex-col items-center gap-8 mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-sans text-[#1c1917] tracking-tighter">개인정보 처리방침</h1>
          
          <div className="flex border-b border-[#f5f5f4] w-full justify-center">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-8 md:px-16 py-5 text-[16px] font-medium transition-colors relative ${
                  tab.path === '/privacy'
                    ? 'text-[#9c3f00] border-b-2 border-[#9c3f00]'
                    : 'text-[#a8a29e] hover:text-[#1c1917]'
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          
          {/* Section 1 */}
          <section className="flex flex-col gap-8">
            <h2 className="text-2xl font-bold text-[#1c1917] font-hei">1. 개인정보의 처리 목적</h2>
            <div className="text-[#44403c] text-lg leading-relaxed font-hei flex flex-col gap-6">
              <p>
                늘:pepi-i(이하 '회사')는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-3 text-[#44403c]/80">
                <li>홈페이지 회원 가입 및 관리</li>
                <li>재화 또는 서비스 제공 (배송, 결제, 정산)</li>
                <li>마케팅 및 광고에의 활용 (선택 동의 시)</li>
              </ul>
            </div>
          </section>

          <div className="h-px bg-[#f5f5f4]" />

          {/* Section 2 */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-medium text-[#1c1917] font-hei">2. 수집하는 개인정보의 항목</h2>
            <p className="text-[#44403c] text-[15px] leading-relaxed font-hei">
              회사는 회원가입, 원활한 고객상담, 각종 서비스 등 서비스 제공을 위해 아래와 같은 최소한의 개인정보를 수집하고 있습니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[#e7e5e4] rounded-[32px] md:rounded-[48px] p-8 md:p-10 flex flex-col gap-2">
                <span className="text-[15px] font-medium text-[#1c1917] font-hei">필수 항목</span>
                <p className="text-[15px] text-[#44403c]/70 font-hei leading-relaxed">
                  성명, 아이디, 비밀번호, 휴대전화번호, 이메일 주소, 주소
                </p>
              </div>
              <div className="border border-[#e7e5e4] rounded-[32px] md:rounded-[48px] p-8 md:p-10 flex flex-col gap-2">
                <span className="text-[15px] font-medium text-[#1c1917] font-hei">자동 수집 항목</span>
                <p className="text-[15px] text-[#44403c]/70 font-hei leading-relaxed">
                  IP 주소, 쿠키, 서비스 이용 기록, 접속 로그
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-[#f5f5f4]" />

          {/* Section 3 */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-medium text-[#1c1917] font-hei">3. 개인정보의 보유 및 이용기간</h2>
            <div className="text-[#44403c] text-[15px] leading-relaxed font-hei flex flex-col gap-6">
              <p>
                회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </p>
              <ul className="flex flex-col gap-3 text-[#44403c]/80 text-sm">
                <li>• 회원 탈퇴 시까지 (단, 관계 법령에 의해 보존할 필요가 있는 경우 해당 기간까지)</li>
                <li>• 계약 또는 청약철회 등에 관한 기록: 5년</li>
                <li>• 대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                <li>• 소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
              </ul>
            </div>
          </section>

          <div className="h-px bg-[#f5f5f4]" />

          {/* Section 4 */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-medium text-[#1c1917] font-hei">4. 정보주체와 법정대리인의 권리·의무 및 그 행사방법</h2>
            <p className="text-[#44403c] text-[15px] leading-relaxed font-hei">
              정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다. 권리 행사는 회사에 대해 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.
            </p>
          </section>

          {/* Inquiry Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-[#9c3f00] text-white px-12 md:px-16 py-5 rounded-full flex items-center gap-3 text-sm font-medium shadow-lg shadow-[#9c3f00]/10 hover:bg-[#853600] transition-colors">
              문의사항이 있으신가요?
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
}
