import React from 'react';
import { Link } from 'react-router';
import { ICONS } from '../../constants/icons';
import { ALL_PRODUCTS } from '../../constants/products';
import ProductCard from '../common/ProductCard';

const products = ALL_PRODUCTS.filter(p => p.category === 'best').slice(0, 8);

export default function Best50Section() {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-4xl font-bold font-logo italic tracking-tight text-[#1b1d0e]">Best 50</h2>
        <div className="w-12 h-[2px] bg-[#dc2626] mt-4" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
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
