import React, { useState, useMemo } from 'react';
import Layout from '../components/common/Layout';
import ProductCard from '../components/common/ProductCard';
import { ICONS } from '../constants/icons';

export default function Sale() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('최신순');
  const itemsPerPage = 8;

  const subCategories = [
    { name: '전체', icon: ICONS.all },
    { name: '아우터', icon: ICONS.outer },
    { name: '상의', icon: ICONS.top },
    { name: '하의', icon: ICONS.bottom },
    { name: '원피스', icon: ICONS.dress },
    { name: '세트', icon: ICONS.set },
    { name: '액세서리', icon: ICONS.acc },
  ];

  // 세일 상품 데이터 생성
  const generateSaleProducts = () => {
    const products = [];
    const subData = {
      '아우터': {
        names: ['시즌 오프 울 코트', '라이트 가디건 세일', '윈터 파카 특가', '클래식 재킷'],
        images: [
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea'
        ]
      },
      '상의': {
        names: ['베이직 티셔츠 번들', '스트라이프 셔츠', '소프트 니트웨어', '린넨 블라우스'],
        images: [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518',
          'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8'
        ]
      },
      '하의': {
        names: ['데일리 슬랙스', '빈티지 데님 팬츠', '린넨 쇼츠', '코튼 치노 팬츠'],
        images: [
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
          'https://images.unsplash.com/photo-1582552938357-32b906df40cb'
        ]
      },
      '원피스': {
        names: ['플로럴 롱 원피스', '셔츠형 미니 드레스', '니트 맥시 원피스', '코튼 뷔스티에 드레스'],
        images: [
          'https://images.unsplash.com/photo-1539008835270-18861630138c',
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8'
        ]
      },
      '세트': {
        names: ['라운지웨어 세트', '트레이닝 셋업', '니트 가디건 세트', '린넨 수트 셋업'],
        images: [
          'https://images.unsplash.com/photo-1556906781-9a412961c28c',
          'https://images.unsplash.com/photo-1475178626620-a4d074967452'
        ]
      },
      '액세서리': {
        names: ['실버 쥬얼리 세트', '레더 미니 백', '데일리 슈즈', '실크 스카프'],
        images: [
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338',
          'https://images.unsplash.com/photo-1584917033794-c735e946b991'
        ]
      }
    };

    let idCount = 1;
    Object.keys(subData).forEach(subName => {
      const data = subData[subName];
      for (let i = 1; i <= 16; i++) {
        const nameIdx = (i - 1) % data.names.length;
        const imgIdx = (i - 1) % data.images.length;
        const basePrice = 50000 + (Math.floor(Math.random() * 10) * 10000);
        const discountRate = 20 + (Math.floor(Math.random() * 4) * 10); // 20%, 30%, 40%, 50%
        const discPrice = Math.floor(basePrice * (1 - discountRate / 100));
        
        products.push({
          id: `sale-${idCount++}`,
          subCategory: subName,
          name: data.names[nameIdx],
          originalPrice: `${basePrice.toLocaleString()}원`,
          price: `${discPrice.toLocaleString()}원`,
          discount: `${discountRate}%`,
          isSale: true,
          isNew: false,
          isBest: false,
          image: `${data.images[imgIdx]}?q=80&w=800&auto=format&fit=crop`
        });
      }
    });

    return products;
  };

  const allSaleProducts = useMemo(() => generateSaleProducts(), []);

  const filteredProducts = useMemo(() => {
    let result = selectedSubCategory === '전체' 
      ? [...allSaleProducts] 
      : allSaleProducts.filter(p => p.subCategory === selectedSubCategory);

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
    } else if (sortBy === '할인율순') {
      result.sort((a, b) => {
        const rateA = parseInt(a.discount.replace(/[^0-9]/g, ''));
        const rateB = parseInt(b.discount.replace(/[^0-9]/g, ''));
        return rateB - rateA;
      });
    } else if (sortBy === '낮은가격순') {
      result.sort((a, b) => {
        const priceA = parseInt((a.price || a.originalPrice).replace(/[^0-9]/g, ''));
        const priceB = parseInt((b.price || b.originalPrice).replace(/[^0-9]/g, ''));
        return priceA - priceB;
      });
    } else if (sortBy === '높은가격순') {
      result.sort((a, b) => {
        const priceA = parseInt((a.price || a.originalPrice).replace(/[^0-9]/g, ''));
        const priceB = parseInt((b.price || b.originalPrice).replace(/[^0-9]/g, ''));
        return priceB - priceA;
      });
    }

    return result;
  }, [selectedSubCategory, allSaleProducts, sortBy]);

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
          <h2 className="text-2xl font-bold text-[#1b1d0e] font-serif mb-10 lowercase tracking-tight">sale categories</h2>
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
              SALE
              {selectedSubCategory !== '전체' && <span className="text-xl md:text-2xl font-medium text-[#737373] ml-4 font-hei font-normal">/ {selectedSubCategory}</span>}
            </h1>
            <div className="flex items-center gap-6 text-[13px] md:text-[14px] font-medium text-[#a3a3a3]">
              {['최신순', '인기순', '할인율순', '낮은가격순', '높은가격순'].map((sort) => (
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
