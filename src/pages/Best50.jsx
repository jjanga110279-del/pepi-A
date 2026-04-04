import React from 'react';
import { Link } from 'react-router';
import Layout from '../components/common/Layout';
import { ICONS } from '../constants/icons';
import { ALL_PRODUCTS } from '../constants/products';
import ProductCard from '../components/common/ProductCard';

export default function Best50() {
  const bestProducts = ALL_PRODUCTS.filter(p => p.category === 'best');
  
  // Generate 50 items by repeating best products
  const products = Array.from({ length: 50 }, (_, i) => {
    const baseProduct = bestProducts[i % bestProducts.length];
    return {
      ...baseProduct,
      id: `best-${i + 1}`,
      realId: baseProduct.id,
      rank: i + 1,
      reviews: Math.floor(Math.random() * 1000 + 100).toLocaleString(),
    };
  });

  return (
    <Layout>
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-10 md:py-20">
        {/* Page Header */}
        <div className="flex flex-col items-center justify-center mb-20 border-b border-black/10 pb-16 text-center">
          <h1 className="text-5xl md:text-[64px] font-bold text-black font-serif tracking-tighter uppercase mb-6">Best 50</h1>
          <p className="text-lg md:text-2xl text-[#525252] font-hei italic mt-2 tracking-wide">The Most Loved Pieces, Right Now.</p>
        </div>

        {/* Product Grid - 5 Columns for Desktop (xl) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 md:gap-x-8 gap-y-20">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              {/* Ranking Number - Elegant Serif Overlay */}
              <div className="absolute top-6 left-8 z-20 pointer-events-none transition-transform group-hover:scale-110 duration-700">
                <span className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] opacity-90 italic">
                  {product.rank}
                </span>
              </div>
              <ProductCard product={product} hideBest={true} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
