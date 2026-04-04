import React, { useState, useMemo } from 'react';
import Layout from '../components/common/Layout';
import ProductCard from '../components/common/ProductCard';
import { ICONS } from '../constants/icons';

export default function Accessory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('최신순');
  const itemsPerPage = 8;

  const subCategories = [
    { name: '전체', icon: ICONS.all },
    { name: '주얼리', icon: ICONS.jewelry },
    { name: '가방', icon: ICONS.bag },
    { name: '슈즈', icon: ICONS.shoes },
    { name: '기타', icon: ICONS.others },
  ];

  // 액세서리 세부 상품 데이터 생성
  const generateAccProducts = () => {
    const products = [];
    const subData = {
      '주얼리': {
        names: ['실버 925 미니멀 링', '진주 드롭 이어링', '골드 레이어드 목걸이', '크리스탈 테니스 팔찌', '엔틱 무드 펜던트', '심플 라인 뱅글'],
        images: [
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338',
          'https://images.unsplash.com/photo-1535633302703-9420414421ee',
          'https://images.unsplash.com/photo-1599643478123-53d0453b894a',
          'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0'
        ]
      },
      '가방': {
        names: ['미니멀 레더 숄더백', '캔버스 데일리 토트백', '클래식 체인 크로스백', '소프트 호보백', '어반 백팩', '퀼팅 미니 파우치'],
        images: [
          'https://images.unsplash.com/photo-1584917033794-c735e946b991',
          'https://images.unsplash.com/photo-1591561954557-26941169b49e',
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa'
        ]
      },
      '슈즈': {
        names: ['베이직 로우 스니커즈', '모던 스퀘어토 블로퍼', '데일리 플랫 슈즈', '청키 플랫폼 샌들', '클래식 첼시 부츠', '슬림 라인 펌프스'],
        images: [
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
          'https://images.unsplash.com/photo-1549298916-b41d501d3772',
          'https://images.unsplash.com/photo-1560769629-975ec94e6a86'
        ]
      },
      '기타': {
        names: ['실크 스카프 에디션', '클래식 레더 벨트', '울 블렌드 비니', '패브릭 헤어 밴드', '빈티지 선글라스', '체크 패턴 머플러'],
        images: [
          'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9',
          'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3'
        ]
      }
    };

    let idCount = 1;
    Object.keys(subData).forEach(subName => {
      const data = subData[subName];
      for (let i = 1; i <= 32; i++) {
        const nameIdx = (i - 1) % data.names.length;
        const imgIdx = (i - 1) % data.images.length;
        const basePrice = 25000 + (Math.floor(Math.random() * 15) * 5000);
        const discPrice = Math.floor(basePrice * 0.95);
        
        products.push({
          id: `acc-${idCount++}`,
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

  const allAccProducts = useMemo(() => generateAccProducts(), []);

  const filteredProducts = useMemo(() => {
    let result = selectedSubCategory === '전체' 
      ? [...allAccProducts] 
      : allAccProducts.filter(p => p.subCategory === selectedSubCategory);

    // Sorting logic
    if (sortBy === '최신순') {
      result.sort((a, b) => {
        const idA = parseInt(a.id.split('-')[1]);
        const idB = parseInt(b.id.split('-')[1]);
        return idB - idA;
      });
    } else if (sortBy === '인기순') {
      result.sort((a, b) => {
        const idA = parseInt(a.id.split('-')[1]);
        const idB = parseInt(b.id.split('-')[1]);
        return ((idA * 7) % 10) - ((idB * 7) % 10);
      });
    } else if (sortBy === '낮은가격순') {
      result.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceA - priceB;
      });
    } else if (sortBy === '높은가격순') {
      result.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceB - priceA;
      });
    }

    return result;
  }, [selectedSubCategory, allAccProducts, sortBy]);

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

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
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
          <h2 className="text-2xl font-bold text-[#1b1d0e] font-serif mb-10 lowercase tracking-tight">accessory categories</h2>
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
              액세서리
              {selectedSubCategory !== '전체' && <span className="text-xl md:text-2xl font-medium text-[#737373] ml-4 font-hei font-normal">/ {selectedSubCategory}</span>}
            </h1>
            <div className="flex items-center gap-6 text-[13px] md:text-[14px] font-medium text-[#a3a3a3]">
              {['최신순', '인기순', '낮은가격순', '높은가격순'].map((sort) => (
                <button
                  key={sort}
                  onClick={() => handleSortChange(sort)}
                  className={`transition-colors ${sortBy === sort ? 'text-[#171717]' : 'hover:text-black'}`}
                >
                  {sort}
                </button>
              ))}
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
