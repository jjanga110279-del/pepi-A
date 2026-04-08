import React, { useState, useMemo } from 'react';
import Layout from '../components/common/Layout';
import ProductCard from '../components/common/ProductCard';
import { ICONS } from '../constants/icons';
import { IMAGES } from '../constants/images';
import { ALL_PRODUCTS } from '../constants/products';

export default function NewIn() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('최신순');
  const itemsPerPage = 12;

  const categories = [
    { name: '전체', icon: ICONS.all },
    { name: '아우터', icon: ICONS.outer },
    { name: '상의', icon: ICONS.top },
    { name: '하의', icon: ICONS.bottom },
    { name: '원피스', icon: ICONS.dress },
    { name: '세트', icon: ICONS.set },
    { name: '액세서리', icon: ICONS.acc },
  ];

  // 모든 가용 이미지들을 모아 중복 없는 풍성한 이미지 풀 생성
  const allAvailableImages = useMemo(() => {
    const images = [
      // 직접 올리신 로컬 이미지 (18개)
      IMAGES.best1, IMAGES.best2, IMAGES.best3, IMAGES.best4, IMAGES.best5, 
      IMAGES.best6, IMAGES.best7, IMAGES.best8, IMAGES.best9, IMAGES.best10,
      IMAGES.best11, IMAGES.best12, IMAGES.best13, IMAGES.best14, IMAGES.best15,
      IMAGES.best16, IMAGES.best17, IMAGES.best18,
      
      // 기존 프로젝트 고화질 이미지 및 피그마 에셋
      IMAGES.newJacket, IMAGES.newScarf, IMAGES.newSkirt, IMAGES.newBag,
      IMAGES.productLinenShirt, IMAGES.productSlacks, IMAGES.productBlouse, IMAGES.productDress,
      IMAGES.bestItem1, IMAGES.bestItem2, IMAGES.recItem1, IMAGES.recItem2,
      IMAGES.hero1, IMAGES.hero2, IMAGES.hero3, IMAGES.hero4, IMAGES.hero5, IMAGES.hero6,
      
      // 개별 페이지에서 사용하던 고화질 Unsplash 이미지 리스트
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584273143981-44c210f24e2d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013307-f9a8a9264bb7?q=80&w=800&auto=format&fit=crop'
    ];
    // 중복 제거 및 유효한 값만 필터링
    return Array.from(new Set(images)).filter(Boolean);
  }, []);

  const generateProducts = () => {
    const products = [];
    const categoryData = {
      '아우터': ['핸드메이드 코트', '트렌치 코트', '레더 자켓', '더블 버튼 코트', '울 블렌드 자켓', '푸퍼 패딩', '롱 가디건', '모던 블레이저'],
      '상의': ['실크 슬림 블라우스', '캐시미어 라운드 니트', '스트라이프 코튼 셔츠', '오버핏 레터링 티', '터틀넥 스웨터', '셔링 실크 탑'],
      '하의': ['와이드 핀턱 슬랙스', '생지 데님 팬츠', '플리츠 미디 스커트', '트위드 미니 스커트', '세미 부츠컷 데님', '조거 트레이닝 팬츠'],
      '원피스': ['새틴 슬립 롱 원피스', '브이넥 미디 원피스', '퍼프 소매 미니 드레스', '플라워 패턴 원피스', '니트 투피스 원피스'],
      '세트': ['트위드 체크 셋업', '린넨 포켓 세트', '코튼 트레이닝 셋업', '수트 베스트 세트', '가디건 나시 세트'],
      '액세서리': ['진주 드롭 이어링', '실크 쁘띠 스카프', '체인 레이어드 네크리스', '비건 레더 벨트', '울 베레모']
    };

    let idCount = 1;
    Object.keys(categoryData).forEach(catName => {
      const names = categoryData[catName];
      for (let i = 1; i <= 40; i++) {
        const nameIdx = (i - 1) % names.length;
        // 50개 이상의 이미지 풀에서 순차적으로 이미지를 가져와 중복을 최소화합니다.
        const imgIdx = (idCount - 1) % allAvailableImages.length;
        const basePrice = 40000 + (Math.floor(Math.random() * 30) * 10000);
        const discPrice = Math.floor(basePrice * 0.95);
        
        products.push({
          id: `new-gen-${idCount++}`,
          category: catName,
          name: `[NEW] ${names[nameIdx]}`,
          originalPrice: `${basePrice.toLocaleString()}원`,
          price: `${discPrice.toLocaleString()}원`,
          discount: "5%",
          isNew: true,
          reviews: Math.floor(Math.random() * 200 + 10),
          image: allAvailableImages[imgIdx]
        });
      }
    });

    return products;
  };

  const allProducts = useMemo(() => {
    const realNewItems = ALL_PRODUCTS.filter(p => p.category === 'new');
    return [...realNewItems, ...generateProducts()];
  }, [allAvailableImages]);

  const filteredProducts = useMemo(() => {
    let result = selectedCategory === '전체' 
      ? [...allProducts] 
      : allProducts.filter(p => p.category === selectedCategory);

    if (sortBy === '낮은가격순') {
      result.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
    } else if (sortBy === '높은가격순') {
      result.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));
    }

    return result;
  }, [selectedCategory, allProducts, sortBy]);

  const currentProducts = useMemo(() => {
    return filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
          <h2 className="text-2xl font-bold text-[#1b1d0e] font-serif mb-10 lowercase tracking-tight">new categories</h2>
          <nav className="flex flex-col gap-6">
            {categories.map((cat, idx) => (
              <button 
                key={idx} 
                onClick={() => { setSelectedCategory(cat.name); setCurrentPage(1); }}
                className={`flex items-center gap-4 text-[16px] font-medium transition-colors group text-left ${selectedCategory === cat.name ? 'text-[#dc2626]' : 'text-[#737373] hover:text-[#dc2626]'}`}
              >
                <span className={`w-5 h-5 flex items-center justify-center transition-all ${selectedCategory === cat.name ? 'grayscale-0 opacity-100' : 'grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100'}`}>
                  {typeof cat.icon === 'string' ? <span className="text-lg">{cat.icon}</span> : <cat.icon className="text-[20px]" />}
                </span>
                {cat.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-grow">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1b1d0e] font-sans tracking-tight mb-6 md:mb-0">
                신상 <span className="text-[#dc2626]">5%</span>
                {selectedCategory !== '전체' && <span className="text-xl md:text-2xl font-medium text-[#737373] ml-4 font-hei font-normal">/ {selectedCategory}</span>}
              </h1>

              {/* Mobile Sub Categories - Horizontal Scroll */}
              <div className="flex md:hidden overflow-x-auto pb-4 gap-2 no-scrollbar -mx-4 px-4">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedCategory(cat.name); setCurrentPage(1); }}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-[14px] font-bold transition-all ${selectedCategory === cat.name ? 'bg-[#1b1d0e] text-white shadow-lg' : 'bg-gray-100 text-[#737373]'}`}
                  >
                    {cat.name}
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

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-16 min-h-[800px]">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} hideNewBadge={true} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-24 w-full flex justify-center items-center gap-2 md:gap-4">
              <button 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:border-black transition-colors"
              >
                <ICONS.chevronLeft className="text-[16px]" />
              </button>
              
              <div className="flex items-center justify-center gap-1 md:gap-2">
                {getPageNumbers().map((page, i) => (
                  page === '...' ? (
                    <span key={`sep-${i}`} className="px-2 text-[#737373]">...</span>
                  ) : (
                    <button 
                      key={page} 
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 md:w-12 md:h-12 rounded-full text-sm md:text-base font-bold flex items-center justify-center transition-all ${currentPage === page ? 'bg-[#9c3f00] text-white shadow-md' : 'text-[#1b1d0e] hover:bg-gray-100'}`}
                    >
                      {page}
                    </button>
                  )
                ))}
              </div>

              <button 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:border-black transition-colors"
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
