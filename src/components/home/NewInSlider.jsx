import React from 'react';
import { Link, useNavigate } from 'react-router';
import { ICONS } from '../../constants/icons';
import { ALL_PRODUCTS } from '../../constants/products';

const newItems = ALL_PRODUCTS.filter(p => p.category === 'new');

// For seamless infinite scroll, we duplicate the items
const scrollItems = [...newItems, ...newItems];

export default function NewInSlider() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#fafafa] py-32 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 mb-16 text-center">
        <h2 className="text-4xl font-serif mb-2">New In</h2>
        <p className="text-sm text-black/60 font-hei">금주의 새로운 아이템을 만나보세요</p>
      </div>

      <div className="relative flex">
        <div className="flex gap-6 animate-infinite-scroll hover:[animation-play-state:paused]">
          {scrollItems.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
              className="min-w-[300px] md:min-w-[350px] relative group cursor-pointer overflow-hidden rounded-[48px] bg-white shadow-sm block"
            >
              <div className="h-[450px] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay on hover - restored as requested */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-6 text-center backdrop-blur-[2px]">
                <h4 className="text-xl font-medium mb-1 font-hei">{item.name}</h4>
                <p className="text-base font-bold mt-2">{item.price}</p>
              </div>

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
          ))}
        </div>
      </div>
    </section>
  );
}
