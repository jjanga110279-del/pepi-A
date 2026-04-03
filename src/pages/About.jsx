import React from 'react';
import Layout from '../components/common/Layout';
import { IMAGES } from '../constants/images';
import { ICONS } from '../constants/icons';

export default function About() {
  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[90vh] overflow-hidden">
          <img src={IMAGES.aboutHero} alt="About Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
            <h2 className="text-5xl md:text-7xl font-normal leading-tight mb-6 font-serif">
              햇살이 머무는<br />아틀리에의 영혼
            </h2>
            <p className="text-sm md:text-base tracking-[3.2px] font-light opacity-90">
              늘 머무르는 아름다움, pepi-i
            </p>
          </div>
        </section>

        {/* Brand Values Section */}
        <section className="max-w-[1280px] mx-auto px-8 py-32 border-b border-black/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
            {/* Value 1 */}
            <div className="flex flex-col pt-12">
              <div className="aspect-[3/4] rounded-[32px] overflow-hidden mb-8">
                <img src={IMAGES.aboutValue1} alt="Value 1" className="w-full h-full object-cover grayscale mix-blend-multiply" />
              </div>
              <h3 className="text-2xl font-serif mb-4">아틀리에의 공기</h3>
              <p className="text-sm text-[#57534e] leading-relaxed font-hei">
                공간을 채우는 따스한 빛과 정적 속에서 탄생하는 pepi-i의 분위기는 세월이 흘러도 변하지 않는 우아함을 지향합니다.
              </p>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col md:translate-y-32">
              <div className="aspect-[3/4] rounded-full overflow-hidden mb-8">
                <img src={IMAGES.aboutValue2} alt="Value 2" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-serif mb-4">섬세한 손길</h3>
              <p className="text-sm text-[#57534e] leading-relaxed font-hei">
                숙련된 아틀리에 장인들의 섬세한 손길로 완성되는 한 벌 한 벌은 단순한 의복을 넘어 당신의 일상에 특별한 감각을 더합니다.
              </p>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col">
              <div className="aspect-[3/4] rounded-[32px] overflow-hidden mb-8">
                <img src={IMAGES.aboutValue3} alt="Value 3" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-serif mb-4">지속 가능한 본질</h3>
              <p className="text-sm text-[#57534e] leading-relaxed font-hei">
                우리는 자연과의 공존을 고민합니다. 책임감 있는 소재 선택과 지속 가능한 생산 방식을 통해 다음 세대를 위한 아름다움을 약속합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Legacy Timeline Section */}
        <section className="bg-white py-32">
          <div className="max-w-[896px] mx-auto px-8">
            <div className="text-center mb-24">
              <span className="text-xs tracking-widest uppercase mb-4 block font-hei opacity-60">아카이브</span>
              <h2 className="text-4xl font-serif">우리의 발자취</h2>
            </div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#f5f5f4]" />

              {/* Milestone 1 */}
              <div className="flex items-center gap-12 mb-24 relative">
                <div className="flex-1 text-right">
                  <h4 className="text-xl font-serif mb-2">시작</h4>
                  <p className="text-sm text-[#78716c] font-hei">성수동 작은 작업실에서 시작된<br />pepi-i의 첫 번째 컬렉션</p>
                </div>
                <div className="z-10 w-4 h-4 rounded-full bg-black ring-8 ring-white" />
                <div className="flex-1">
                  <span className="text-2xl font-serif">2018</span>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="flex items-center gap-12 mb-24 relative">
                <div className="flex-1 text-right">
                  <span className="text-2xl font-serif">2020</span>
                </div>
                <div className="z-10 w-4 h-4 rounded-full bg-black ring-8 ring-white" />
                <div className="flex-1">
                  <h4 className="text-xl font-serif mb-2">아틀리에 확장</h4>
                  <p className="text-sm text-[#78716c] font-hei">자체 생산 라인 구축을 통한<br />고감도 퀄리티의 실현</p>
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="flex items-center gap-12 relative">
                <div className="flex-1 text-right">
                  <h4 className="text-xl font-serif mb-2">글로벌 비전</h4>
                  <p className="text-sm text-[#78716c] font-hei">글로벌 마켓 진출과 지속 가능한<br />패션을 위한 브랜드 리뉴얼</p>
                </div>
                <div className="z-10 w-4 h-4 rounded-full bg-black ring-8 ring-white" />
                <div className="flex-1">
                  <span className="text-2xl font-serif">2024</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="max-w-[1280px] mx-auto px-8 py-32 border-t border-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#fafaf9] rounded-full opacity-50 -z-10" />
              <div className="rounded-[32px] overflow-hidden shadow-2xl shadow-black/5">
                <img src={IMAGES.aboutLegacy} alt="Seongsu Atelier" className="w-full h-[600px] object-cover" />
              </div>
            </div>

            <div className="flex flex-col gap-12">
              <div>
                <h2 className="text-4xl font-serif mb-6">성수 아틀리에</h2>
                <p className="text-[#78716c] leading-relaxed font-hei mb-10">
                  성수동의 고요한 골목 끝, pepi-i의 모든 영감이 시작되는 공간입니다. 예약제로 운영되는 아틀리에 방문을 통해 pepi-i만의 무드를 직접 경험해보세요.
                </p>
                
                <div className="space-y-6 pt-10 border-t border-[#f5f5f4]">
                  <div className="flex gap-4 items-start">
                    <ICONS.locationPin className="text-[19px] mt-1" />
                    <div>
                      <p className="text-base font-hei font-medium">서울특별시 성동구 성수이로 12길 34</p>
                      <p className="text-xs text-[#a8a29e] uppercase tracking-wider mt-1">34, Seongsu-ro 12-gil, Seongdong-gu, Seoul</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <ICONS.clock className="text-[19px]" />
                    <p className="text-sm font-hei">월 - 금 11:00 - 19:00 (주말 예약제 운영)</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 rounded-[48px] bg-[#fafaf9] border border-black/5 overflow-hidden relative flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 opacity-10 bg-repeat group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${IMAGES.mapPlaceholder}')` }} />
                <div className="relative flex flex-col items-center gap-3">
                  <ICONS.googleMap className="text-[19px]" />
                  <span className="text-[12px] font-hei tracking-[3.6px] uppercase border-b border-black/20 pb-1">구글 지도에서 보기</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
