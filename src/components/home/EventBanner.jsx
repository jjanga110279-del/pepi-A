import React from 'react';
import { Link } from 'react-router';
import { IMAGES } from '../../constants/images';

export default function EventBanner() {
  return (
    <section className="max-w-[1216px] mx-auto px-4 md:px-0">
      <div className="h-[300px] md:h-[400px] rounded-2xl md:rounded-3xl overflow-hidden relative group">
        <img 
          src={IMAGES.eventBanner} 
          alt="Event Banner" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/25 md:bg-black/20" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 md:p-8">
          <span className="text-[10px] md:text-xs tracking-[2px] md:tracking-widest uppercase mb-3 md:mb-4 opacity-90">Special Event</span>
          <h3 className="text-2xl md:text-5xl font-medium mb-4 md:mb-6 font-hei leading-tight">시즌 오프 기획전:<br className="md:hidden" /> 감각의 기록</h3>
          <p className="text-xs md:text-sm opacity-80 mb-6 md:mb-8 max-w-[280px] md:max-w-lg leading-relaxed font-hei">
            늘:pepi-i가 제안하는 이번 시즌 마지막 큐레이션을 특별한 혜택으로 만나보세요.
          </p>
          <Link to="/events">
            <button className="px-6 py-2.5 md:px-8 md:py-3 border border-white/40 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium hover:bg-white hover:text-black transition-all font-hei">
              기획전 보러가기
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
