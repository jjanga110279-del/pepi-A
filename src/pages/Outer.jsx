import React, { useState, useMemo } from 'react';
import Layout from '../components/common/Layout';
import ProductCard from '../components/common/ProductCard';
import { ICONS } from '../constants/icons';

export default function Outer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('최신순');
  const itemsPerPage = 8;

  const subCategories = [
    { name: '전체', icon: ICONS.all },
    { name: '자켓', icon: ICONS.jacket },
    { name: '코트', icon: ICONS.coat },
    { name: '점퍼', icon: ICONS.jumper },
    { name: '가디건', icon: ICONS.cardigan },
  ];

  // 아우터 세부 상품 데이터 생성
  const generateOuterProducts = () => {
    const products = [];
    const subData = {
      '자켓': {
        names: ['클래식 테일러드 울 자켓', '코튼 린넨 믹스 크롭 재킷', '오버핏 실루엣 블레이저', '에코 레더 미니멀 무스탕', '트위드 노카라 자켓', '체크 패턴 울 자켓'],
        images: [
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
          'https://images.unsplash.com/photo-1544022613-e87ca75a784a',
          'https://images.unsplash.com/photo-1551028719-00167b16eac5'
        ]
      },
      '코트': {
        names: ['헤리티지 더블 트렌치 코트', '벨티드 핸드메이드 롱 코트', '더블 브레스트 코트', '울 블렌디드 코트', '캐시미어 맥 코트', '오버사이즈 발마칸 코트'],
        images: [
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
          'https://images.unsplash.com/photo-1544022613-e87ca75a784a'
        ]
      },
      '점퍼': {
        names: ['에센셜 구스다운 경량 점퍼', '퀼팅 다이아몬드 점퍼', '필드 밀리터리 자켓', '바람막이 아노락 점퍼', '플리스 하이넥 점퍼', '봄버 에어 자켓'],
        images: [
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
          'https://images.unsplash.com/photo-1551028719-00167b16eac5'
        ]
      },
      '가디건': {
        names: ['소프트 캐시미어 하이넥 가디건', '벌룬 소매 울 가디건', '배색 라인 브이넥 가디건', '케이블 꽈배기 가디건', '모헤어 오버핏 가디건', '부클레 텍스처 가디건'],
        images: [
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
          'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504'
        ]
      }
    };

    let idCount = 1;
    Object.keys(subData).forEach(subName => {
      const data = subData[subName];
      for (let i = 1; i <= 32; i++) {
        const nameIdx = (i - 1) % data.names.length;
        const imgIdx = (i - 1) % data.images.length;
        const basePrice = 120000 + (Math.floor(Math.random() * 30) * 10000);
        const discPrice = Math.floor(basePrice * 0.95);
        
        products.push({
          id: `outer-${idCount++}`,
          subCategory: subName,
          name: data.names[nameIdx],
          originalPrice: `${basePrice.toLocaleString()}원`,
          price: `${discPrice.toLocaleString()}원`,
          isNew: i % 5 === 0,
          isBest: i % 7 === 0,
          image: `${data.images[imgIdx]}?q=80&w=800&auto=format&fit=crop`
        });
      }
    });

    return products;
  };

  const allOuterProducts = useMemo(() => generateOuterProducts(), []);

  const filteredProducts = useMemo(() => {
    let result = selectedSubCategory === '전체' 
      ? [...allOuterProducts] 
      : allOuterProducts.filter(p => p.subCategory === selectedSubCategory);

    // Sorting logic
    switch (sortBy) {
      case '인기순':
        result.sort((a, b) => {
          const idA = parseInt(a.id.split('-')[1]);
          const idB = parseInt(b.id.split('-')[1]);
          return (idA % 7) - (idB % 7);
        });
        break;
      case '낮은가격순':
        result.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceA - priceB;
        });
        break;
      case '높은가격순':
        result.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceB - priceA;
        });
        break;
      case '최신순':
      default:
        result.sort((a, b) => {
          const idA = parseInt(a.id.split('-')[1]);
          const idB = parseInt(b.id.split('-')[1]);
          return idB - idA;
        });
        break;
    }

    return result;
  }, [selectedSubCategory, allOuterProducts, sortBy]);

  const currentProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
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
          <h2 className="text-2xl font-bold text-[#1b1d0e] font-serif mb-10 lowercase tracking-tight">outer categories</h2>
          <nav className="flex flex-col gap-6">
            {subCategories.map((sub, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSubCategoryChange(sub.name)}
                className={`flex items-center gap-4 text-[16px] font-medium transition-colors group text-left ${selectedSubCategory === sub.name ? 'text-[#dc2626]' : 'text-[#737373] hover:text-[#dc2626]'}`}
              >
                <span className={`w-5 h-5 flex items-center justify-center transition-all ${selectedSubCategory === sub.name ? 'grayscale-0 opacity-100' : 'grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100'}`}>
                  <sub.icon className="text-[20px]" />
                </span>
                {sub.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-grow">
          {/* Title & Filter Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1b1d0e] font-sans tracking-tight">
              아우터
              {selectedSubCategory !== '전체' && <span className="text-xl md:text-2xl font-medium text-[#737373] ml-4 font-hei font-normal">/ {selectedSubCategory}</span>}
            </h1>
            <div className="flex items-center gap-6 text-[13px] md:text-[14px] font-medium text-[#a3a3a3]">
              <button 
                onClick={() => { setSortBy('최신순'); setCurrentPage(1); }}
                className={sortBy === '최신순' ? 'text-[#171717]' : 'hover:text-black transition-colors'}
              >
                최신순
              </button>
              <button 
                onClick={() => { setSortBy('인기순'); setCurrentPage(1); }}
                className={sortBy === '인기순' ? 'text-[#171717]' : 'hover:text-black transition-colors'}
              >
                인기순
              </button>
              <button 
                onClick={() => { setSortBy('낮은가격순'); setCurrentPage(1); }}
                className={sortBy === '낮은가격순' ? 'text-[#171717]' : 'hover:text-black transition-colors'}
              >
                낮은가격순
              </button>
              <button 
                onClick={() => { setSortBy('높은가격순'); setCurrentPage(1); }}
                className={sortBy === '높은가격순' ? 'text-[#171717]' : 'hover:text-black transition-colors'}
              >
                높은가격순
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-16 min-h-[800px]">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
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
