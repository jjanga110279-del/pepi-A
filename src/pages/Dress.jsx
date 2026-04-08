import React, { useState, useMemo } from 'react';
import Layout from '../components/common/Layout';
import ProductCard from '../components/common/ProductCard';
import { ICONS } from '../constants/icons';
import { IMAGES } from '../constants/images';
import { ALL_PRODUCTS } from '../constants/products';

export default function Dress() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('최신순');
  const itemsPerPage = 12;

  const subCategories = [
    { name: '전체', icon: ICONS.all },
    { name: '미니', icon: ICONS.mini || '👗' },
    { name: '미디', icon: ICONS.midi || '👗' },
    { name: '롱', icon: ICONS.long || '👗' },
    { name: '점퍼수트', icon: ICONS.jumpsuit || '👗' },
  ];

  // 모든 가용 이미지들을 모아 중복 없는 풍성한 이미지 풀 생성
  const allAvailableImages = useMemo(() => {
    const images = [
      IMAGES.best5, IMAGES.best13, IMAGES.best15, IMAGES.best18, IMAGES.best3, 
      IMAGES.best1, IMAGES.best2, IMAGES.best4, IMAGES.best6, IMAGES.best7, 
      IMAGES.best8, IMAGES.best9, IMAGES.best10, IMAGES.best11, IMAGES.best12, 
      IMAGES.best14, IMAGES.best16, IMAGES.best17,
      IMAGES.productDress, IMAGES.newSkirt, IMAGES.productBlouse, 
      IMAGES.bestItem1, IMAGES.recItem2, IMAGES.hero5, IMAGES.hero6,
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013307-f9a8a9264bb7?q=80&w=800&auto=format&fit=crop'
    ];
    return Array.from(new Set(images)).filter(Boolean);
  }, []);

  const generateDressProducts = () => {
    const products = [];
    const subData = {
      '미니': ['스퀘어넥 버튼 미니', '트위드 배색 미니', '코튼 에이라인 미니', '셔링 스트랩 미니'],
      '미디': ['실크 드레이프 미디', '벨티드 셔츠 미디', '어반 시크 셔츠 원피스', '머메이드 라인 미디'],
      '롱': ['슬림핏 린넨 맥시', '플리츠 쉬폰 롱', '모던 선셋 홀터넥 롱', '내추럴 무드 랩 원피스'],
      '점퍼수트': ['테일러드 점퍼수트', '린넨 브이넥 점퍼수트', '데님 포켓 점퍼수트', '유틸리티 벨티드 수트']
    };

    let idCount = 1;
    Object.keys(subData).forEach(subName => {
      const names = subData[subName];
      for (let i = 1; i <= 30; i++) {
        const nameIdx = (i - 1) % names.length;
        const imgIdx = (idCount - 1) % allAvailableImages.length;
        const basePrice = 68000 + (Math.floor(Math.random() * 20) * 5000);
        const isNewItem = i % 5 === 0;
        const discPrice = isNewItem ? Math.floor(basePrice * 0.95) : basePrice;
        
        products.push({
          id: `dress-gen-${idCount++}`,
          subCategory: subName,
          category: 'dress',
          name: names[nameIdx],
          price: `${discPrice.toLocaleString()}원`,
          originalPrice: isNewItem ? `${basePrice.toLocaleString()}원` : null,
          discount: isNewItem ? "5%" : null,
          isNew: isNewItem,
          isBest: i % 7 === 0,
          reviews: Math.floor(Math.random() * 90 + 12),
          image: allAvailableImages[imgIdx]
        });
      }
    });

    return products;
  };

  const allDressProducts = useMemo(() => {
    const realDressItems = ALL_PRODUCTS.filter(p => p.category === 'dress');
    return [...realDressItems, ...generateDressProducts()];
  }, [allAvailableImages]);

  const filteredProducts = useMemo(() => {
    let result = selectedSubCategory === '전체' 
      ? [...allDressProducts] 
      : allDressProducts.filter(p => p.subCategory === selectedSubCategory);

    if (sortBy === '낮은가격순') {
      result.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
    } else if (sortBy === '높은가격순') {
      result.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));
    }

    return result;
  }, [selectedSubCategory, allDressProducts, sortBy]);

  const currentProducts = useMemo(() => {
    return filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubCategoryChange = (subCat) => {
    setSelectedSubCategory(subCat);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const range = [];
    const delta = 2;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }
    return range;
  };

  return (
    <Layout>
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-10 md:py-20 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-[260px] shrink-0 border-r border-black/5 pr-12 hidden md:block">
          <h2 className="text-2xl font-bold text-[#1b1d0e] font-serif mb-10 lowercase tracking-tight">dress categories</h2>
          <nav className="flex flex-col gap-6">
            {subCategories.map((sub, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSubCategoryChange(sub.name)}
                className={`flex items-center gap-4 text-[16px] font-medium transition-colors group text-left ${selectedSubCategory === sub.name ? 'text-[#dc2626]' : 'text-[#737373] hover:text-[#dc2626]'}`}
              >
                <span className={`w-5 h-5 flex items-center justify-center transition-all ${selectedSubCategory === sub.name ? 'grayscale-0 opacity-100' : 'grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100'}`}>
                  {typeof sub.icon === 'string' ? <span className="text-lg">{sub.icon}</span> : <sub.icon className="text-[20px]" />}
                </span>
                {sub.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1b1d0e] font-sans tracking-tight mb-6 md:mb-0">
                원피스
                {selectedSubCategory !== '전체' && <span className="text-xl md:text-2xl font-medium text-[#737373] ml-4 font-hei font-normal">/ {selectedSubCategory}</span>}
              </h1>

              {/* Mobile Sub Categories - Horizontal Scroll */}
              <div className="flex md:hidden overflow-x-auto pb-4 gap-2 no-scrollbar -mx-4 px-4">
                {subCategories.map((sub, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSubCategoryChange(sub.name)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-[14px] font-bold transition-all ${selectedSubCategory === sub.name ? 'bg-[#1b1d0e] text-white shadow-lg' : 'bg-gray-100 text-[#737373]'}`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 text-[13px] md:text-[14px] font-medium text-[#a3a3a3]">
              {['최신순', '인기순', '낮은가격순', '높은가격순'].map((sort) => (
                <button key={sort} onClick={() => { setSortBy(sort); setCurrentPage(1); }} className={`transition-colors ${sortBy === sort ? 'text-[#171717]' : 'hover:text-black'}`}>{sort}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-16 min-h-[800px]">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-24 w-full flex justify-center items-center gap-4 md:gap-6">
              <button 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`w-12 h-12 rounded-full border border-black/10 flex items-center justify-center transition-colors ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-black/40 hover:border-black/20 hover:text-black'}`}
              >
                <ICONS.chevronLeft className="text-[16px]" />
              </button>
              <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 max-w-full">
                {getPageNumbers().map((page, i) => (
                  page === '...' ? (
                    <span key={`sep-${i}`} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-[#737373] font-bold">...</span>
                  ) : (
                    <button 
                      key={page} 
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full text-sm md:text-base font-bold flex items-center justify-center transition-all ${currentPage === page ? 'bg-[#9c3f00] text-white shadow-lg shadow-[#9c3f00]/20' : 'text-[#1b1d0e] hover:bg-gray-100'}`}
                    >
                      {page}
                    </button>
                  )
                ))}
              </div>
              <button 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`w-12 h-12 rounded-full border border-black/10 flex items-center justify-center transition-colors ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-black/40 hover:border-black/20 hover:text-black'}`}
              >
                <ICONS.chevronRight className="text-[16px]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
