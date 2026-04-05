import React from 'react';
import { Link } from 'react-router';
import Layout from '../components/common/Layout';

export default function SizeGuide() {
  const tabs = [
    { name: '이용약관', path: '/terms' },
    { name: '개인정보 처리방침', path: '/privacy' },
    { name: '이용안내', path: '/guide' },
    { name: '사이즈 가이드', path: '/size-guide' },
  ];

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-20">
        
        {/* Header Section */}
        <div className="flex flex-col items-center gap-8 mb-20 md:mb-32">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-sans text-[#1c1917] tracking-tighter">사이즈 가이드</h1>
          
          <div className="flex border-b border-[#f5f5f4] w-full justify-center">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-8 md:px-16 py-5 text-[16px] font-medium transition-colors relative ${
                  tab.path === '/size-guide'
                    ? 'text-[#9c3f00] border-b-2 border-[#9c3f00]'
                    : 'text-[#a8a29e] hover:text-[#1c1917]'
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-32 max-w-[1100px] mx-auto">
          {/* Subtitle */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-[28px] font-bold font-hei text-[#1b1d0e]">Size Guide</h2>
            <p className="text-[14px] text-black/40 font-hei">상품의 실측 사이즈를 확인하여 나에게 맞는 최적의 사이즈를 선택하세요.</p>
          </div>

          {/* 1. 상의 (Top) */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-[12px] font-bold text-[#9C3F00] font-sans">Category 01</span>
              <h2 className="text-[30px] font-serif text-[#1b1d0e]">상의 (Top)</h2>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Left: Measurement Guide & Table */}
              <div className="flex-grow flex flex-col gap-10">
                <div className="flex flex-col gap-4 py-4 border-b border-[#F4F4F5]">
                  <h3 className="text-[14px] font-bold text-[#1b1d0e] font-hei">측정 방법 안내</h3>
                  <ul className="flex flex-col gap-3 text-[14px] text-[#52525B] font-sans">
                    <li>• 어깨: 어깨 솔기 양 끝을 직선으로 측정합니다.</li>
                    <li>• 가슴: 겨드랑이 밑 지점의 단면을 수평으로 측정합니다.</li>
                    <li>• 소매: 어깨 솔기부터 소매 끝단까지 측정합니다.</li>
                    <li>• 총장: 뒷목 중심부터 밑단까지 수직으로 측정합니다.</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-[14px] font-bold text-[#1b1d0e] font-hei py-2 border-b border-[#F4F4F5]">표준 사이즈 가이드 (cm)</h3>
                  <table className="w-full text-sm font-sans">
                    <thead>
                      <tr className="text-black/40">
                        <th className="py-4 text-left font-normal">Size</th>
                        <th className="py-4 text-center font-normal">어깨</th>
                        <th className="py-4 text-center font-normal">가슴</th>
                        <th className="py-4 text-center font-normal">소매</th>
                        <th className="py-4 text-center font-normal">총장</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#52525B]">
                      {[
                        {s:'90-95 (S)', a:'44', b:'52', c:'60', d:'68'},
                        {s:'100 (M)', a:'46', b:'54', c:'61', d:'70'},
                        {s:'105 (L)', a:'48', b:'56', c:'62', d:'72'}
                      ].map((r, i) => (
                        <tr key={i} className="border-t border-[#FAFAFA]">
                          <td className="py-4 font-bold text-[#1b1d0e]">{r.s}</td>
                          <td className="py-4 text-center">{r.a}</td>
                          <td className="py-4 text-center">{r.b}</td>
                          <td className="py-4 text-center">{r.c}</td>
                          <td className="py-4 text-center">{r.d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right: Visual Diagram */}
              <div className="w-full lg:w-[576px] aspect-[4/3] bg-[#FAFAFA] rounded-[16px] flex items-center justify-center relative p-12 overflow-hidden">
                <div className="relative w-full max-w-[280px]">
                  <svg viewBox="0 0 280 336" className="w-full h-auto text-[#D4D4D8]">
                    <path d="M60 40 L220 40 L280 120 L240 336 L40 336 L0 120 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    {/* 어깨 */}
                    <line x1="60" y1="40" x2="220" y2="40" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                    {/* 가슴 */}
                    <line x1="20" y1="120" x2="260" y2="120" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                    {/* 소매 */}
                    <line x1="220" y1="40" x2="280" y2="120" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                    {/* 총장 */}
                    <line x1="140" y1="40" x2="140" y2="336" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                  </svg>
                  {/* Labels */}
                  <span className="absolute top-[10px] left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#9C3F00]">어깨</span>
                  <span className="absolute top-[130px] left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#9C3F00]">가슴</span>
                  <span className="absolute top-[70px] right-[10px] text-[11px] font-bold text-[#9C3F00] rotate-45">소매</span>
                  <span className="absolute top-[180px] left-[150px] text-[11px] font-bold text-[#9C3F00]">총장</span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. 하의 (Bottom) */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-[12px] font-bold text-[#9C3F00] font-sans">Category 02</span>
              <h2 className="text-[30px] font-serif text-[#1b1d0e]">하의 (Bottom)</h2>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Left: Measurement Guide & Table */}
              <div className="flex-grow flex flex-col gap-10">
                <div className="flex flex-col gap-4 py-4 border-b border-[#F4F4F5]">
                  <h3 className="text-[14px] font-bold text-[#1b1d0e] font-hei">측정 방법 안내</h3>
                  <ul className="flex flex-col gap-3 text-[14px] text-[#52525B] font-sans">
                    <li>• 허리: 벨트 라인의 양 끝 단면을 측정합니다.</li>
                    <li>• 힙: 허리선에서 약 18~20cm 아래 가장 넓은 부분을 측정합니다.</li>
                    <li>• 허벅지: 밑위 아래 약 1cm 지점의 단면을 측정합니다.</li>
                    <li>• 밑위: 허리선부터 십자 이음새 지점까지 수직으로 측정합니다.</li>
                    <li>• 총장: 옆선 허리부터 밑단까지 수직으로 측정합니다.</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-[14px] font-bold text-[#1b1d0e] font-hei py-2 border-b border-[#F4F4F5]">표준 사이즈 가이드 (cm)</h3>
                  <table className="w-full text-sm font-sans">
                    <thead>
                      <tr className="text-black/40">
                        <th className="py-4 text-left font-normal">Size</th>
                        <th className="py-4 text-center font-normal">허리</th>
                        <th className="py-4 text-center font-normal">힙</th>
                        <th className="py-4 text-center font-normal">허벅지</th>
                        <th className="py-4 text-center font-normal">밑위</th>
                        <th className="py-4 text-center font-normal">총장</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#52525B]">
                      {[
                        {s:'25-26 (S)', a:'33', b:'46', c:'28', d:'28', e:'102'},
                        {s:'27-28 (M)', a:'35', b:'48', c:'29.5', d:'29', e:'103'},
                        {s:'29-30 (L)', a:'37', b:'50', c:'31', d:'30', e:'104'}
                      ].map((r, i) => (
                        <tr key={i} className="border-t border-[#FAFAFA]">
                          <td className="py-4 font-bold text-[#1b1d0e]">{r.s}</td>
                          <td className="py-4 text-center">{r.a}</td>
                          <td className="py-4 text-center">{r.b}</td>
                          <td className="py-4 text-center">{r.c}</td>
                          <td className="py-4 text-center">{r.d}</td>
                          <td className="py-4 text-center">{r.e}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right: Visual Diagram */}
              <div className="w-full lg:w-[576px] aspect-[4/3] bg-[#FAFAFA] rounded-[16px] flex items-center justify-center relative p-12 overflow-hidden">
                <div className="relative w-full max-w-[280px]">
                  <svg viewBox="0 0 280 336" className="w-full h-auto text-[#D4D4D8]">
                    <path d="M70 56 L210 56 L210 308 L140 308 L140 168 L70 308 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    {/* 허리 */}
                    <line x1="70" y1="56" x2="210" y2="56" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                    {/* 밑위 */}
                    <line x1="140" y1="56" x2="140" y2="168" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                    {/* 힙 */}
                    <line x1="70" y1="120" x2="210" y2="120" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                    {/* 허벅지 */}
                    <line x1="70" y1="180" x2="140" y2="180" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                    {/* 총장 */}
                    <line x1="210" y1="56" x2="210" y2="308" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                  </svg>
                  {/* Labels */}
                  <span className="absolute top-[35px] left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#9C3F00]">허리</span>
                  <span className="absolute top-[100px] left-[150px] text-[11px] font-bold text-[#9C3F00]">밑위</span>
                  <span className="absolute top-[100px] left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#9C3F00]">힙</span>
                  <span className="absolute top-[165px] left-[85px] text-[11px] font-bold text-[#9C3F00]">허벅지</span>
                  <span className="absolute top-[170px] right-[55px] text-[11px] font-bold text-[#9C3F00]">총장</span>
                </div>
              </div>
            </div>
          </section>

          {/* 3. 원피스 (Dress) */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-[12px] font-bold text-[#9C3F00] font-sans">Category 03</span>
              <h2 className="text-[30px] font-serif text-[#1b1d0e]">원피스 (Dress)</h2>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Left: Measurement Guide & Table */}
              <div className="flex-grow flex flex-col gap-10">
                <div className="flex flex-col gap-4 py-4 border-b border-[#F4F4F5]">
                  <h3 className="text-[14px] font-bold text-[#1b1d0e] font-hei">측정 방법 안내</h3>
                  <ul className="flex flex-col gap-3 text-[14px] text-[#52525B] font-sans">
                    <li>• 총장: 뒷목 중심부터 밑단까지 수직으로 측정합니다.</li>
                    <li>• 가슴: 겨드랑이 밑 지점의 단면을 수평으로 측정합니다.</li>
                    <li>• 허리: 디자인에 따른 허리선의 단면을 수평으로 측정합니다.</li>
                    <li>• 소매: 어깨 솔기부터 소매 끝단까지 측정합니다.</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-[14px] font-bold text-[#1b1d0e] font-hei py-2 border-b border-[#F4F4F5]">표준 사이즈 가이드 (cm)</h3>
                  <table className="w-full text-sm font-sans">
                    <thead>
                      <tr className="text-black/40">
                        <th className="py-4 text-left font-normal">Size</th>
                        <th className="py-4 text-center font-normal">총장</th>
                        <th className="py-4 text-center font-normal">어깨</th>
                        <th className="py-4 text-center font-normal">가슴</th>
                        <th className="py-4 text-center font-normal">소매</th>
                        <th className="py-4 text-center font-normal">허리</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#52525B]">
                      {[
                        {s:'S (Free)', a:'118', b:'38', c:'45', d:'58', e:'36'},
                        {s:'M (Free)', a:'120', b:'40', c:'47', d:'59', e:'38'}
                      ].map((r, i) => (
                        <tr key={i} className="border-t border-[#FAFAFA]">
                          <td className="py-4 font-bold text-[#1b1d0e]">{r.s}</td>
                          <td className="py-4 text-center">{r.a}</td>
                          <td className="py-4 text-center">{r.b}</td>
                          <td className="py-4 text-center">{r.c}</td>
                          <td className="py-4 text-center">{r.d}</td>
                          <td className="py-4 text-center">{r.e}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right: Visual Diagram */}
              <div className="w-full lg:w-[576px] aspect-[4/3] bg-[#FAFAFA] rounded-[16px] flex items-center justify-center relative p-12 overflow-hidden">
                <div className="relative w-full max-w-[280px]">
                  <svg viewBox="0 0 280 364" className="w-full h-auto text-[#D4D4D8]">
                    <path d="M56 46 L224 46 L280 120 L240 364 L40 364 L0 120 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    {/* 어깨 */}
                    <line x1="56" y1="78" x2="224" y2="78" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                    {/* 소매 */}
                    <line x1="224" y1="78" x2="280" y2="120" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                    {/* 가슴 */}
                    <line x1="70" y1="154" x2="210" y2="154" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                    {/* 총장 */}
                    <line x1="140" y1="50" x2="140" y2="336" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                    {/* 허리 */}
                    <line x1="78" y1="224" x2="201" y2="224" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                  </svg>
                  {/* Labels */}
                  <span className="absolute top-[55px] left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#9C3F00]">어깨</span>
                  <span className="absolute top-[100px] right-[20px] text-[11px] font-bold text-[#9C3F00] rotate-45">소매</span>
                  <span className="absolute top-[135px] left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#9C3F00]">가슴</span>
                  <span className="absolute top-[170px] left-[125px] text-[11px] font-bold text-[#9C3F00]">총장</span>
                  <span className="absolute top-[205px] left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#9C3F00]">허리</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
