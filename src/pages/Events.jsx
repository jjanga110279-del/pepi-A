import React from 'react';
import Layout from '../components/common/Layout';

export default function Events() {
  const eventCards = [
    {
      id: 1,
      title: "시즌 오프 기획전: 감각의 기록",
      period: "2024.05.01 - 2024.05.31",
      status: "진행중",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "신규 멤버십 웰컴 혜택 가이드",
      period: "2024.05.10 - 2024.05.24",
      status: "진행중",
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "서머 액세서리: 빛나는 디테일",
      period: "2024.05.15 - 2024.06.10",
      status: "진행중",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "데일리 룩북: 감각적인 일상",
      period: "2024.05.01 - 상시진행",
      status: "진행중",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "프리미엄 레더 셀렉션",
      period: "2024.05.20 - 2024.06.20",
      status: "진행중",
      image: "https://images.unsplash.com/photo-1584917033794-c735e946b991?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "베이직 아이템: 클래식의 힘",
      period: "2024.05.01 - 2024.05.31",
      status: "진행중",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "늘:pepi-i 비하인드: 감도 높은 제안",
      period: "2024.05.12 - 2024.05.30",
      status: "진행중",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 8,
      title: "위켄드 니트웨어 특가전",
      period: "2024.05.18 - 2024.05.25",
      status: "진행중",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <Layout>
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-10 md:py-20">
        {/* Header Section (Centered) */}
        <div className="flex flex-col items-center justify-center mb-16 pb-12 border-b border-black/5 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl md:text-[48px] font-bold text-[#1b1d0e] font-hei tracking-tight">이벤트 / 기획전</h1>
            <p className="text-xl md:text-[20px] text-[#737373] font-hei font-light">늘:pepi-i가 제안하는 감각적인 스타일 큐레이션</p>
          </div>
          <div className="mt-8">
            <span className="text-sm md:text-[14px] text-[#a3a3a3] font-serif tracking-widest uppercase italic">Current Editorial</span>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-16">
          {eventCards.map((event) => (
            <div key={event.id} className="flex flex-col gap-4 group cursor-pointer">
              <div className="relative aspect-[3/4] bg-[#fafafa] rounded-[32px] overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-500">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/5" />
              </div>
              
              <div className="flex flex-col gap-0.5 px-1">
                {/* Status Badge */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full animate-pulse"></span>
                  <span className="text-[#dc2626] text-[11px] md:text-[12px] font-bold font-hei animate-blink">
                    {event.status}
                  </span>
                </div>
                
                {/* Title (Increased Size) */}
                <h2 className="text-xl md:text-[22px] font-medium text-[#1b1d0e] font-hei leading-snug line-clamp-2 transition-colors mb-0.5">
                  {event.title}
                </h2>
                
                {/* Period (Increased Font Size & Tight Spacing) */}
                <p className="text-[16px] md:text-[18px] text-[#a3a3a3] font-serif font-light tracking-wide">
                  {event.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .animate-blink {
          animation: blink 1.5s infinite;
        }
      `}</style>
    </Layout>
  );
}
