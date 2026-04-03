import React from 'react';
import { Link } from 'react-router';
import { IMAGES } from '../../constants/images';
import { ICONS } from '../../constants/icons';

const popularItems = [
  { id: 1, rank: "01", name: "퍼펙트 핏 셔츠", price: "48,000원", image: IMAGES.bestItem1 },
  { id: 2, rank: "02", name: "와이드 데님 팬츠", price: "54,000원", image: IMAGES.bestItem2 },
  { id: 3, rank: "03", name: "퍼펙트 핏 셔츠", price: "48,000원", image: IMAGES.bestItem1 },
  { id: 4, rank: "04", name: "와이드 데님 팬츠", price: "54,000원", image: IMAGES.bestItem2 },
];

const recommendedItems = [
  { id: 1, name: "데일리 오브제 세트", price: "39,000원", image: IMAGES.recItem1 },
  { id: 2, name: "소프트 가디건", price: "89,000 원", image: IMAGES.recItem2 },
  { id: 3, name: "데일리 오브제 세트", price: "39,000원", image: IMAGES.recItem1 },
  { id: 4, name: "소프트 가디건", price: "89,000원", image: IMAGES.recItem2 },
];

export default function PopularRecommended() {
  return (
    <section className="max-w-[1280px] mx-auto px-8 py-24 flex flex-col gap-24">
      {/* Popular Section */}
      <div>
        <div className="flex justify-between items-center mb-10 border-b border-black/5 pb-4">
          <h3 className="text-3xl font-medium font-hei">인기 상품</h3>
          <ICONS.moreHorizontal className="text-[19px] cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {popularItems.map((item) => (
            <Link to="/best50" key={item.id} className="group cursor-pointer block">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-[#f8f8f8] mb-4 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-10 hover:scale-110 transition-transform drop-shadow-md"
                >
                  <ICONS.heart className="text-white text-[20px] md:text-[24px]" />
                </button>
              </div>
              <div className="px-2">
                <span className="text-[10px] font-bold text-primary block mb-1">BEST {item.rank}</span>
                <h4 className="text-sm font-medium mb-1 font-hei truncate">{item.name}</h4>
                <p className="text-xs text-black/60 font-bold">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Section */}
      <div>
        <div className="flex justify-between items-center mb-10 border-b border-black/5 pb-4">
          <h3 className="text-3xl font-medium font-hei">추천 상품</h3>
          <ICONS.moreVertical className="text-[20px] cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommendedItems.map((item) => (
            <Link to="/new-in" key={item.id} className="group cursor-pointer block">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-[#f8f8f8] mb-4 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-10 hover:scale-110 transition-transform drop-shadow-md"
                >
                  <ICONS.heart className="text-white text-[20px] md:text-[24px]" />
                </button>
              </div>
              <div className="px-2">
                <span className="text-[10px] font-bold text-[#9f402d] block mb-1">FOR YOU</span>
                <h4 className="text-sm font-medium mb-1 font-hei truncate">{item.name}</h4>
                <p className="text-xs text-black/60 font-bold">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
