import React from 'react';
import { Link } from 'react-router';
import { IMAGES } from '../../constants/images';
import { ICONS } from '../../constants/icons';

const products = [
  { id: 1, name: "데일리 리넨 셔츠", price: "45,000원", image: IMAGES.productLinenShirt, reviews: 128 },
  { id: 2, name: "클래식 슬랙스", price: "59,000원", image: IMAGES.productSlacks, reviews: 85 },
  { id: 3, name: "실루엣 블라우스", price: "52,000원", image: IMAGES.productBlouse, reviews: 210 },
  { id: 4, name: "서머 브리즈 원피스", price: "78,000원", image: IMAGES.productDress, reviews: 54 },
  { id: 5, name: "오버핏 린넨 자켓", price: "129,000원", image: IMAGES.newJacket, reviews: 42 },
  { id: 6, name: "내추럴 실크 스카프", price: "32,000원", image: IMAGES.newScarf, reviews: 15 },
  { id: 7, name: "플리츠 미디 스커트", price: "65,000원", image: IMAGES.newSkirt, reviews: 92 },
  { id: 8, name: "에디토리얼 레더 백", price: "158,000원", image: IMAGES.newBag, reviews: 33 }
];

export default function Best50Section() {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="flex flex-col items-center gap-2 mb-10 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-serif">Best 50</h2>
        <div className="w-10 md:w-12 h-0.5 bg-primary" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-16">
        {products.map((product) => (
          <Link to="/best50" key={product.id} className="group cursor-pointer relative block">
            <div className="aspect-[3/4] rounded-[20px] md:rounded-[32px] overflow-hidden bg-[#f8f8f8] mb-3 md:mb-4 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Heart Icon - Unified Home style */}
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
            <h3 className="text-xs md:text-sm font-medium mb-1 font-hei truncate">{product.name}</h3>
            <p className="text-sm md:text-sm font-bold text-primary mb-2">{product.price}</p>
            <div className="flex items-center gap-1 opacity-50">
               <ICONS.star className="text-yellow-400 text-[10px]" />
               <span className="text-[9px] md:text-[10px]">리뷰 {product.reviews}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <Link to="/best50" className="px-10 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-[13px] font-medium transition-all inline-block">
          <span className="font-hei">더보기</span>
        </Link>
      </div>
    </section>
  );
}
