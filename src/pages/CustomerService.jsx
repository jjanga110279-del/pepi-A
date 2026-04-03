import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import { Search, ChevronDown, Bell, HelpCircle, MessageSquare, Truck, RotateCcw, Box, CreditCard, User, ArrowRight } from 'lucide-react';

export default function CustomerService() {
  const [openFaq, setOpenFaq] = useState(null);

  const sidebarLinks = [
    { icon: <Bell size={18} />, name: '공지사항', active: false },
    { icon: <HelpCircle size={18} />, name: '자주 묻는 질문 (FAQ)', active: true },
    { icon: <MessageSquare size={18} />, name: '1:1 문의', active: false },
    { icon: <Truck size={18} />, name: '배송 안내', active: false },
    { icon: <RotateCcw size={18} />, name: '교환/반품 안내', active: false },
  ];

  const featuredTopics = [
    { icon: <Truck className="text-[#d2691e]" />, title: '주문/배송', desc: '주문 확인, 배송 추적 및 취소 정책 안내입니다.' },
    { icon: <CreditCard className="text-[#d2691e]" />, title: '결제/환불', desc: '결제 수단 및 환불 절차에 관한 정보를 확인하세요.' },
    { icon: <User className="text-[#d2691e]" />, title: '멤버십', desc: '등급별 혜택, 포인트 및 계정 관리 안내입니다.' },
  ];

  const faqs = [
    { q: '배송은 언제 시작되나요?', a: '주문 확인 후 영업일 기준 2-5일 이내에 배송이 시작됩니다.' },
    { q: '교환이나 반품은 어떻게 신청하나요?', a: '마이페이지 > 주문내역에서 수령 후 7일 이내에 신청 가능합니다.' },
    { q: '배송지 주소를 변경하고 싶어요.', a: '배송 준비 중 단계 전까지 고객센터를 통해 변경이 가능합니다.' },
    { q: '사용 가능한 결제 수단은 무엇인가요?', a: '신용카드, 계좌이체, 무통장입금, 카카오페이, 네이버페이 이용이 가능합니다.' },
  ];

  return (
    <Layout>
      <div className="flex min-h-screen bg-white">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col w-[280px] border-r border-gray-100 p-8 pt-12 gap-10 shrink-0">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-[#1b1d0e] font-sans tracking-tighter">고객센터</h2>
            <p className="text-[10px] text-[#78716c] uppercase tracking-wider">How can we assist you?</p>
          </div>

          <nav className="flex flex-col gap-3">
            {sidebarLinks.map((link, idx) => (
              <button
                key={idx}
                className={`flex items-center gap-5 px-5 py-4 rounded-full text-[15px] font-medium transition-colors ${
                  link.active 
                  ? 'bg-[#f9fafb] text-[#d2691e]' 
                  : 'text-[#78716c] hover:bg-gray-50 hover:text-[#dc2626]'
                }`}
              >
                <span className={link.active ? 'text-[#d2691e]' : 'text-gray-400 group-hover:text-[#dc2626]'}>{link.icon}</span>
                {link.name}
              </button>
            ))}
          </nav>

          <div className="mt-auto bg-[#f9fafb] rounded-[32px] p-8 relative overflow-hidden">
            <div className="relative z-10 flex flex-col gap-2">
              <span className="text-[11px] text-[#a8a29e] font-medium uppercase tracking-wider">상담 가능 시간</span>
              <p className="text-base font-bold text-[#1b1d0e]">10:00 — 18:00</p>
              <p className="text-sm text-[#78716c]">주말 및 공휴일 휴무</p>
            </div>
            <div className="absolute -bottom-3 -right-3 opacity-10">
              <MessageSquare size={80} />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow px-6 md:px-12 lg:px-20 py-12 md:py-24 max-w-[1300px]">
          <div className="flex flex-col gap-20 md:gap-28">
            
            {/* Hero Section */}
            <div className="flex flex-col items-center gap-10 text-center">
              <h1 className="text-5xl md:text-6xl lg:text-[72px] font-sans text-[#1b1d0e] tracking-tighter">무엇을 도와드릴까요?</h1>
              <div className="relative w-full max-w-[720px]">
                <input 
                  type="text" 
                  placeholder="검색어를 입력해주세요..." 
                  className="w-full bg-[#f9fafb] border-none rounded-full py-6 px-10 pr-20 text-xl focus:ring-2 focus:ring-[#d2691e]/20 outline-none font-hei"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-[#d2691e] rounded-full flex items-center justify-center text-white hover:bg-[#dc2626] transition-colors">
                  <Search size={24} />
                </button>
              </div>
            </div>

            {/* Featured Topics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTopics.map((topic, idx) => (
                <div key={idx} className="border border-gray-100 rounded-[40px] p-10 flex flex-col gap-8 hover:shadow-2xl hover:shadow-gray-100 transition-all group cursor-pointer">
                  <div className="w-16 h-14 bg-[#f9fafb] rounded-full flex items-center justify-center group-hover:bg-[#dc2626]/10 transition-colors">
                    {React.cloneElement(topic.icon, { size: 28, className: "text-[#d2691e] group-hover:text-[#dc2626] transition-colors" })}
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-[#1b1d0e] font-hei">{topic.title}</h3>
                    <p className="text-base text-[#78716c] leading-relaxed font-hei">{topic.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Accordion */}
            <div className="flex flex-col gap-10">
              <h2 className="text-3xl font-bold text-[#1b1d0e] font-serif border-b border-gray-100 pb-8">자주 묻는 질문</h2>
              <div className="flex flex-col">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-100">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between py-8 text-left group"
                    >
                      <span className="text-xl font-medium text-[#1b1d0e] font-hei group-hover:text-[#dc2626] transition-colors">{faq.q}</span>
                      <ChevronDown size={24} className={`text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="pb-10 text-[#78716c] text-[17px] leading-relaxed font-hei animate-slideDown">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Banner */}
            <div className="relative rounded-[48px] overflow-hidden bg-gray-900 h-[280px] flex items-center">
              {/* Fallback pattern if image fails */}
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
              <div className="relative z-10 px-12 flex flex-col gap-8 items-start">
                <h2 className="text-2xl md:text-[30px] font-serif text-white">해결되지 않은 궁금증이 있으신가요?</h2>
                <button className="bg-white text-[#d2691e] px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gray-100 transition-colors">
                  1:1 상담 시작하기
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </Layout>
  );
}
