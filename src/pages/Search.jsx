import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Layout from '../components/common/Layout';
import { ICONS } from '../constants/icons';
import { ALL_PRODUCTS } from '../constants/products';
import ProductCard from '../components/common/ProductCard';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(['실크 테일러드 팬츠', '캐시미어 코트', '리넨 셔츠']);
  const navigate = useNavigate();

  const popularKeywords = [
    '레이어드 시스루 블라우스',
    '볼드 골드 이어링',
    '레더 숄더백',
    '오버사이즈 린넨 자켓',
    '벨티드 원피스'
  ];

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    // Filter products
    const filtered = ALL_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filtered);
    setIsSearched(true);

    // Update recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== searchQuery);
      return [searchQuery, ...filtered].slice(0, 5);
    });
  };

  const removeRecentSearch = (e, item) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter(i => i !== item));
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
  };

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-20 pb-32 animate-fadeIn">
        {/* Search Input Section */}
        <div className="max-w-[896px] mx-auto mb-20 md:mb-28">
          <form onSubmit={handleSearch} className="relative flex items-center border-b border-[#E7E5E4] pb-4 group">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (isSearched) setIsSearched(false);
              }}
              placeholder="늘:pepi-i의 감성을 검색해보세요"
              className="w-full text-[24px] md:text-[30px] font-hei font-light text-[#1C1917] placeholder:text-[#D6D3D1] outline-none bg-transparent transition-all duration-300 pr-12"
              autoFocus
            />
            <button type="submit" className="absolute right-0 text-[#1C1917] opacity-20 group-focus-within:opacity-100 transition-opacity duration-300">
              <ICONS.search className="text-2xl md:text-3xl" />
            </button>
          </form>
        </div>

        {!isSearched ? (
          <div className="max-w-[896px] mx-auto">
            {/* Suggestions Grid */}
            <div className="grid md:grid-cols-2 gap-20 md:gap-32 mb-40">
              {/* Recent Searches */}
              <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-[20px] font-bold text-[#1C1917] font-hei">최근 검색어</h2>
                  {recentSearches.length > 0 && (
                    <button onClick={clearAllRecent} className="text-[10px] text-[#A8A29E] font-hei hover:text-[#9C3F00] transition-colors">전체 삭제</button>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {recentSearches.length > 0 ? (
                    recentSearches.map((item) => (
                      <button 
                        key={item} 
                        onClick={() => { setSearchQuery(item); setTimeout(() => handleSearch(), 0); }}
                        className="px-4 py-2 rounded-full bg-[#FAFAF9] flex items-center gap-2 group hover:bg-[#F5F5F4] transition-all"
                      >
                        <span className="text-[14px] text-[#57534E] font-hei">{item}</span>
                        <div onClick={(e) => removeRecentSearch(e, item)} className="p-1 hover:bg-black/5 rounded-full transition-colors">
                          <ICONS.close className="text-[7px] text-[#A8A29E] group-hover:text-[#57534E]" />
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-[#A8A29E] font-hei">최근 검색어가 없습니다.</p>
                  )}
                </div>
              </div>

              {/* Popular Keywords */}
              <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-[20px] font-bold text-[#1C1917] font-hei">인기 키워드</h2>
                  <span className="text-[10px] text-[#A8A29E] font-hei">실시간 업데이트</span>
                </div>
                <div className="flex flex-col gap-4">
                  {popularKeywords.map((item, idx) => (
                    <button 
                      key={item} 
                      onClick={() => { setSearchQuery(item); setTimeout(() => handleSearch(), 0); }}
                      className="flex items-center justify-between group text-left"
                    >
                      <div className="flex items-center gap-6">
                        <span className="text-[14px] font-serif italic text-[#D6D3D1] group-hover:text-[#1C1917] transition-colors">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[14px] text-[#44403C] font-hei group-hover:text-[#1C1917] transition-colors">{item}</span>
                      </div>
                      <div className="w-4 h-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <ICONS.chevronRight className="text-[10px] text-[#1C1917]" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Editorial Section (Matching Figma) */}
            <div className="border-t border-[#F5F5F4] pt-40">
              <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full md:w-[509px] aspect-[4/5] rounded-[48px] overflow-hidden bg-[#F5F5F4] relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" 
                    alt="Luxury editorial fashion photography" 
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-[#1C1917]/5" />
                </div>
                
                <div className="w-full md:w-[355px] flex flex-col gap-4 md:pl-12">
                  <span className="text-[#7C2D12] text-[10px] font-bold uppercase tracking-widest font-sans">Seasonal Edit</span>
                  <h3 className="text-[32px] md:text-[36px] font-bold text-[#1C1917] font-hei leading-[1.25] tracking-tight">
                    당신의 무드를 완성<br />하는 아카이브
                  </h3>
                  <p className="text-[14px] text-[#78716C] leading-[23px] font-hei opacity-90 mt-2">
                    단순한 의류를 넘어 하나의 예술 작품으로 제안하는 늘:pepi-i의 큐레이션을 경험해보세요. 매일 새로운 영감이 당신을 기다립니다.
                  </p>
                  <button className="flex items-center gap-4 group mt-8 w-fit">
                    <span className="text-[12px] font-bold text-[#1C1917] uppercase tracking-widest font-sans">Discover More</span>
                    <div className="w-8 h-[1px] bg-[#1C1917] transition-all duration-500 group-hover:w-12" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {results.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-12 border-b border-black/5 pb-6">
                  <h3 className="text-xl font-bold font-hei text-[#1C1917]">
                    검색 결과 <span className="text-[#9C3F00] ml-1">{results.length}</span>
                  </h3>
                  <button onClick={() => setIsSearched(false)} className="text-sm text-black/40 hover:text-black font-hei">검색창으로 돌아가기</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-16">
                  {results.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-32 flex flex-col items-center justify-center text-center animate-fadeIn">
                <div className="w-20 h-20 bg-[#FAFAF9] rounded-full flex items-center justify-center mb-8">
                  <ICONS.search className="text-3xl text-black/10" />
                </div>
                <h3 className="text-2xl font-bold text-[#1C1917] mb-4 font-hei">검색 결과가 없습니다</h3>
                <p className="text-[#78716C] font-hei mb-12">
                  입력하신 <span className="text-[#9C3F00] font-bold">"{searchQuery}"</span>에 대한 결과가 없습니다.<br />
                  다른 검색어를 입력하시거나 철자를 확인해 주세요.
                </p>
                <button 
                  onClick={() => setIsSearched(false)}
                  className="px-10 py-4 bg-[#1C1917] text-white rounded-full text-sm font-bold tracking-widest hover:bg-black transition-all"
                >
                  다시 검색하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
