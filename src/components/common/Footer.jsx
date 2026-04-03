import React from 'react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/5 pt-12 pb-8">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-3 md:gap-4">
            <h2 className="text-xl md:text-2xl font-serif font-bold italic">늘:pepi-i</h2>
            <p className="text-xs md:text-[13px] text-[#737373] leading-relaxed font-hei break-keep">
              일상의 특별함을 제안하는 프리미엄 셀렉트 샵입니다.<br />
              감도 높은 디자인과 품질로 당신의 가치를 더합니다.
            </p>
          </div>

          {/* Customer Center */}
          <div className="flex flex-col gap-3 md:gap-4">
            <h3 className="text-xs md:text-sm font-bold tracking-widest uppercase">Customer Center</h3>
            <p className="text-xl md:text-2xl font-bold text-primary">1588-0000</p>
            <div className="text-[11px] md:text-xs text-[#737373] leading-relaxed">
              <p>평일 10:00 - 17:00 / 점심 12:00 - 13:00</p>
              <p>토, 일, 공휴일 휴무</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-widest uppercase">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-xs text-[#737373] hover:text-black font-hei">회사소개</Link>
              <Link to="/terms" className="text-xs text-[#737373] hover:text-black font-hei">이용약관</Link>
              <Link to="/privacy" className="text-xs text-[#737373] hover:text-black font-hei">개인정보처리방침</Link>
              <Link to="/guide" className="text-xs text-[#737373] hover:text-black font-hei">이용안내</Link>
              <Link to="/customer-service" className="text-xs text-[#737373] hover:text-black font-hei">고객센터</Link>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5">
          <p className="text-[11px] text-[#a3a3a3] text-center uppercase tracking-wider">
            © 2026 늘:pepi-i. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
