import React, { useState, useMemo } from 'react';
import Layout from '../components/common/Layout';
import ProductCard from '../components/common/ProductCard';
import { ICONS } from '../constants/icons';

export default function Bottom() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('최신순');
  const itemsPerPage = 8;

  const subCategories = [
    { name: '전체', icon: ICONS.all },
    { name: '슬랙스', icon: ICONS.slacks },
    { name: '데님', icon: ICONS.denim },
    { name: '스커트', icon: ICONS.skirt },
    { name: '팬츠', icon: ICONS.pants },
  ];

  // 하의 세부 상품 데이터 생성
  const generateBottomProducts = () => {
    const products = [];
    const subData = {
      '슬랙스': {
        names: ['실루엣 와이드 핀턱 슬랙스', '세미 부츠컷 슬랙스', '클래식 테일러드 슬랙스', '스트레이트 핏 슬랙스', '와이드 레그 린넨 슬랙스', '핀턱 크롭 슬랙스'],
        images: [
          'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
          'https://images.unsplash.com/photo-1584273143981-44c210f24e2d',
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246'
        ]
      },
      '데님': {
        names: ['에센셜 스트레이트 생지 데님', '빈티지 워싱 루즈핏 데님', '하이웨이스트 부츠컷 데님', '와이드 핏 다크 블루 데님', '크롭 스트레이트 데님', '슬림 핏 화이트 데님'],
        images: [
          'https://images.unsplash.com/photo-1483985988355-763728e1935b',
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
          'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa'
        ]
      },
      '스커트': {
        names: ['소프트 무드 롱 플리츠 스커트', '이브닝 글로우 새틴 스커트', '트위드 에이치라인 미니', '체크 패턴 울 스커트', '머메이드 라인 롱 스커트', '코튼 베이직 치마 바지'],
        images: [
          'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
          'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa',
          'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93'
        ]
      },
      '팬츠': {
        names: ['워킹 테일러드 코튼 팬츠', '썸머 이지 밴딩 숏 팬츠', '벨벳 트레이닝 조거 팬츠', '코듀로이 와이드 팬츠', '린넨 하프 팬츠', '카고 스트릿 팬츠'],
        images: [
          'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
          'https://images.unsplash.com/photo-1551028719-00167b16eac5'
        ]
      }
    };

    let idCount = 1;
    Object.keys(subData).forEach(subName => {
      const data = subData[subName];
      for (let i = 1; i <= 32; i++) {
        const nameIdx = (i - 1) % data.names.length;
        const imgIdx = (i - 1) % data.images.length;
        const basePrice = 38000 + (Math.floor(Math.random() * 12) * 5000);
        const discPrice = Math.floor(basePrice * 0.95);
        
        products.push({
          id: `bottom-${idCount++}`,
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

  const allBottomProducts = useMemo(() => generateBottomProducts(), []);

  const filteredProducts = useMemo(() => {
    let result = selectedSubCategory === '전체' 
      ? [...allBottomProducts] 
      : allBottomProducts.filter(p => p.subCategory === selectedSubCategory);

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
  }, [selectedSubCategory, allBottomProducts, sortBy]);

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
          <h2 className="text-2xl font-bold text-[#1b1d0e] font-serif mb-10 lowercase tracking-tight">bottom categories</h2>
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
              하의
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
