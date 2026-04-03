import React from 'react';
import Layout from '../components/common/Layout';
import { ICONS } from '../constants/icons';

export default function Best50() {
  // 다양한 패션 관련 이미지 키워드/ID 리스트
  const fashionImages = [
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1445205174273-593960ba012a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529133039941-7f169bc20f73?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564485371131-f9125483a8d9?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532332248682-206cc786359f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552664199-fd31f7431a55?q=80&w=800&auto=format&fit=crop'
  ];

  // Generate 50 items with more variety
  const products = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    rank: i + 1,
    name: `에디토리얼 컬렉션 No.${i + 1}`,
    price: `${(Math.floor(Math.random() * 20) + 5) * 10000}원`,
    reviews: Math.floor(Math.random() * 1000 + 100).toLocaleString(),
    image: fashionImages[i % fashionImages.length] + `&sig=${i}`, // sig를 추가해 캐시 방지 및 다양성 확보
  }));

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
            <div key={product.id} className="flex flex-col gap-5 group cursor-pointer">
              <div className="relative aspect-[3/4] bg-[#fafafa] rounded-[40px] md:rounded-[56px] overflow-hidden group-hover:shadow-2xl transition-all duration-700">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                
                {/* Ranking Number - Elegant Serif Overlay */}
                <div className="absolute top-6 left-8 z-10">
                  <span className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] opacity-90 group-hover:opacity-100 transition-opacity italic">
                    {product.rank}
                  </span>
                </div>

                {/* Heart Icon - Unified Home style */}
                <button className="absolute top-8 right-8 z-10 hover:scale-125 transition-transform drop-shadow-lg">
                  <ICONS.heart className="text-white text-[20px] md:text-[24px]" />
                </button>
              </div>

              <div className="flex flex-col gap-2 px-4 text-center">
                <h3 className="text-base md:text-lg font-medium text-[#1b1d0e] font-hei line-clamp-1 tracking-tight">{product.name}</h3>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg md:text-xl font-bold text-black font-sans">{product.price}</span>
                  <div className="flex items-center gap-1.5 opacity-30 group-hover:opacity-60 transition-opacity">
                    <ICONS.star className="text-yellow-400 text-[10px]" />
                    <span className="text-[12px] font-hei tracking-widest uppercase">Reviews {product.reviews}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
