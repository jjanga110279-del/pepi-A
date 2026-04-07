import React from 'react';
import { Link } from 'react-router';
import { ALL_PRODUCTS } from '../../constants/products';
import ProductCard from '../common/ProductCard';

const anotherItems = [
  ...ALL_PRODUCTS.filter(p => p.category === 'popular').slice(0, 4),
  ...ALL_PRODUCTS.filter(p => p.category === 'recommended').slice(0, 4)
];

export default function PopularRecommended() {
  return (
    <section className="max-w-[1280px] mx-auto px-8 py-24">
      <div className="flex flex-col items-center mb-16">
        <h3 className="text-4xl font-bold font-logo italic tracking-tight">어나더 아이템</h3>
        <div className="w-12 h-[2px] bg-[#dc2626] mt-4"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 mb-16">
        {anotherItems.map((item) => (
          <ProductCard key={item.id} product={item} autoSlide={true} />
        ))}
      </div>

      <div className="flex justify-center">
        <Link to="/accessory" className="px-10 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-[13px] font-medium transition-all inline-block">
          <span className="font-hei">더보기</span>
        </Link>
      </div>
    </section>
  );
}
