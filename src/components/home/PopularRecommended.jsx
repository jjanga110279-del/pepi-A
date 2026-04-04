import React from 'react';
import { Link } from 'react-router';
import { ICONS } from '../../constants/icons';
import { ALL_PRODUCTS } from '../../constants/products';
import ProductCard from '../common/ProductCard';

const popularItems = ALL_PRODUCTS.filter(p => p.category === 'popular').slice(0, 4);
const recommendedItems = ALL_PRODUCTS.filter(p => p.category === 'recommended').slice(0, 4);

export default function PopularRecommended() {
  return (
    <section className="max-w-[1280px] mx-auto px-8 py-24 flex flex-col gap-24">
      {/* Popular Section */}
      <div>
        <div className="flex justify-between items-center mb-10 border-b border-black/5 pb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-3xl font-medium font-hei">인기 상품</h3>
            <ICONS.trending className="text-2xl text-[#dc2626]" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {popularItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>

      {/* Recommended Section */}
      <div>
        <div className="flex justify-between items-center mb-10 border-b border-black/5 pb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-3xl font-medium font-hei">추천 상품</h3>
            <ICONS.recommend className="text-2xl text-[#9c3f00]" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommendedItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
