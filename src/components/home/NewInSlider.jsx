import React from 'react';
import { Link } from 'react-router';
import { IMAGES } from '../../constants/images';
import { ICONS } from '../../constants/icons';

const newItems = [
  { id: 1, name: "오버핏 린넨 자켓", price: "129,000원", desc: "세련된 서머 아우터", image: IMAGES.newJacket },
  { id: 2, name: "내추럴 실크 스카프", price: "32,000원", desc: "은은한 포인트 아이템", image: IMAGES.newScarf },
  { id: 3, name: "플리츠 미디 스커트", price: "65,000원", desc: "매력적인 실루엣", image: IMAGES.newSkirt },
  { id: 4, name: "에디토리얼 레더 백", price: "158,000원", desc: "미니멀 디자인", image: IMAGES.newBag },
  { id: 5, name: "데일리 리넨 셔츠", price: "45,000원", desc: "베이직 아이템", image: IMAGES.newItem5 },
  { id: 6, name: "클래식 슬랙스", price: "59,000원", desc: "완벽한 핏", image: IMAGES.newItem6 },
  { id: 7, name: "실루엣 블라우스", price: "52,000원", desc: "우아한 무드", image: IMAGES.newItem7 },
  { id: 8, name: "서머 브리즈 원피스", price: "78,000원", desc: "시원한 소재", image: IMAGES.newItem8 },
  { id: 9, name: "퍼펙트 핏 셔츠", price: "48,000원", desc: "시그니처 라인", image: IMAGES.newItem9 },
  { id: 10, name: "와이드 데님 팬츠", price: "54,000원", desc: "편안한 착용감", image: IMAGES.newItem10 },
];

// For seamless infinite scroll, we duplicate the items
const scrollItems = [...newItems, ...newItems];

export default function NewInSlider() {
  return (
    <section className="bg-[#fafafa] py-32 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 mb-16 text-center">
        <h2 className="text-4xl font-serif mb-2">New In</h2>
        <p className="text-sm text-black/60 font-hei">금주의 새로운 아이템을 만나보세요</p>
      </div>

      <div className="relative flex">
        <div className="flex gap-6 animate-infinite-scroll hover:[animation-play-state:paused]">
          {scrollItems.map((item, index) => (
            <Link 
              to="/new-in"
              key={`${item.id}-${index}`} 
              className="min-w-[300px] md:min-w-[350px] relative group cursor-pointer overflow-hidden rounded-[48px] bg-white shadow-sm block"
            >
              <div className="h-[450px] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-6 text-center">
                <h4 className="text-xl font-medium mb-1 font-hei">{item.name}</h4>
                <p className="text-xs opacity-80 mb-4 font-hei">{item.desc}</p>
                <p className="text-base font-bold">{item.price}</p>
              </div>

              {/* Heart Icon - Unified Home style */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Add wishlist logic here if needed
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 hover:scale-110 transition-transform drop-shadow-md"
              >
                <ICONS.heart className="text-white text-[20px] md:text-[24px]" />
              </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
