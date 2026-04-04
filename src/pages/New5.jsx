import React, { useState, useMemo } from 'react';
import Layout from '../components/common/Layout';
import ProductCard from '../components/common/ProductCard';
import { ICONS } from '../constants/icons';

export default function NewIn() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('최신순');
  const itemsPerPage = 8;

  const categories = [
    { name: '전체', icon: ICONS.all },
    { name: '아우터', icon: ICONS.outer },
    { name: '상의', icon: ICONS.top },
    { name: '하의', icon: ICONS.bottom },
    { name: '원피스', icon: ICONS.dress },
    { name: '세트', icon: ICONS.set },
    { name: '액세서리', icon: ICONS.acc },
  ];

  const generateProducts = () => {
    const products = [];
    const categoryData = {
      '아우터': {
        names: ['핸드메이드 코트', '트렌치 코트', '레더 자켓', '더블 코트', '울 자켓', '푸퍼 패딩', '가디건', '블레이저', '무스탕', '퀼팅 점퍼'],
        images: [
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
          'https://images.unsplash.com/photo-1551028719-00167b16eac5',
          'https://images.unsplash.com/photo-1544022613-e87ca75a784a',
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea'
        ]
      },
      '상의': {
        names: ['실크 블라우스', '캐시미어 니트', '스트라이프 셔츠', '오버핏 티셔츠', '터틀넥 스웨터', '셔링 탑', '퍼프 블라우스', '크롭 후드', '슬림 핏 폴라', '코튼 셔츠'],
        images: [
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
          'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504',
          'https://images.unsplash.com/photo-1584273143981-44c210f24e2d',
          'https://images.unsplash.com/photo-1556906781-9a412961c28c'
        ]
      },
      '하의': {
        names: ['와이드 슬랙스', '생지 데님', '플리츠 스커트', '트위드 미니', '부츠컷 팬츠', '조거 팬츠', '에이치라인 스커트', '코듀로이 바지', '린넨 쇼츠', '핀턱 슬랙스'],
        images: [
          'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
          'https://images.unsplash.com/photo-1483985988355-763728e1935b',
          'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
          'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa',
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246'
        ]
      },
      '원피스': {
        names: ['새틴 롱 원피스', '미디 원피스', '미니 드레스', '플라워 원피스', '니트 원피스', '셔츠 원피스', '오프숄더 드레스', '뷔스티에 원피스', '슬립 드레스', '체크 원피스'],
        images: [
          'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93',
          'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
          'https://images.unsplash.com/photo-1572804013307-f9a8a9264bb7'
        ]
      },
      '세트': {
        names: ['트위드 셋업', '린넨 세트', '트레이닝 셋업', '수트 세트', '니트 투피스', '가디건 세트', '데님 셋업', '코튼 셋업', '라운지웨어 세트', '자켓&스커트 세트'],
        images: [
          'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
          'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b'
        ]
      },
      '액세서리': {
        names: ['진주 이어링', '실크 스카프', '체인 네크리스', '레더 벨트', '울 베레모', '골드 브레이슬릿', '헤어 밴드', '선글라스', '숄더 백', '미니 파우치'],
        images: [
          'https://images.unsplash.com/photo-1535633302723-99e3d3e426ec',
          'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e',
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338',
          'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd',
          'https://images.unsplash.com/photo-1523206489230-c012c64b2b48'
        ]
      }
    };

    let idCount = 1;
    Object.keys(categoryData).forEach(catName => {
      const data = categoryData[catName];
      for (let i = 1; i <= 32; i++) {
        const nameIdx = (i - 1) % data.names.length;
        const imgIdx = (i - 1) % data.images.length;
        const basePrice = 50000 + (Math.floor(Math.random() * 20) * 10000);
        const discPrice = Math.floor(basePrice * 0.95);
        
        products.push({
          id: `new-${idCount++}`,
          category: catName,
          name: `[NEW] ${data.names[nameIdx]}`,
          originalPrice: `${basePrice.toLocaleString()}원`,
          price: `${discPrice.toLocaleString()}원`,
          isNew: true,
          isBest: i % 10 === 0, // 중간중간 베스트 적용
          image: `${data.images[imgIdx]}?q=80&w=800&auto=format&fit=crop`
        });
      }
    });

    return products;
  };

  const allProducts = useMemo(() => generateProducts(), []);

  const filteredProducts = useMemo(() => {
    let result = selectedCategory === '전체' 
      ? [...allProducts] 
      : allProducts.filter(p => p.category === selectedCategory);

    if (sortBy === '최신순') {
      result.sort((a, b) => parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]));
    } else if (sortBy === '인기순') {
      result.sort((a, b) => ((parseInt(b.id.split('-')[1]) * 7) % 10) - ((parseInt(a.id.split('-')[1]) * 7) % 10));
    } else if (sortBy === '낮은가격순') {
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
            <h1 className="text-4xl md:text-5xl font-bold text-[#1b1d0e] font-sans tracking-tight">
              신상 <span className="text-[#dc2626]">5%</span>
              {selectedCategory !== '전체' && <span className="text-xl md:text-2xl font-medium text-[#737373] ml-4 font-hei font-normal">/ {selectedCategory}</span>}
            </h1>
            <div className="flex items-center gap-6 text-[13px] md:text-[14px] font-medium text-[#a3a3a3]">
              {['최신순', '인기순', '낮은가격순', '높은가격순'].map((sort) => (
                <button key={sort} onClick={() => { setSortBy(sort); setCurrentPage(1); }} className={`transition-colors ${sortBy === sort ? 'text-[#171717]' : 'hover:text-black'}`}>{sort}</button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-16 min-h-[800px]">
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
