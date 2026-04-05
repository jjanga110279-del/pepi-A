import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import Layout from '../components/common/Layout';
import ProductCard from '../components/common/ProductCard';
import { ICONS } from '../constants/icons';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Ticket, 
  Coins, 
  Settings, 
  Headphones,
  Trash2
} from 'lucide-react';

export default function Wishlist() {
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const itemsPerPage = 12;
  
  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('pepi_wishlist') || '[]');
    setWishlistProducts(savedWishlist);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedWishlist = wishlistProducts.filter(item => item.id !== id);
    setWishlistProducts(updatedWishlist);
    localStorage.setItem('pepi_wishlist', JSON.stringify(updatedWishlist));
    
    // Also remove from selected items
    setSelectedItems(prev => prev.filter(selectedId => selectedId !== id));
    
    const totalPages = Math.ceil(updatedWishlist.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  };

  const currentItems = useMemo(() => {
    return wishlistProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [wishlistProducts, currentPage]);

  const totalPages = Math.ceil(wishlistProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Checkbox handlers
  const isAllSelected = wishlistProducts.length > 0 && selectedItems.length === wishlistProducts.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistProducts.map(p => p.id));
    }
  };

  const toggleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const sideMenu = [
    { name: '프로필', path: '/mypage', icon: User, active: false },
    { name: '주문/결재 내역', path: '/order-history', icon: ShoppingBag, active: false },
    { name: '관심 상품', path: '/wishlist', icon: Heart, active: true },
    { name: '쿠폰', path: '/coupons', icon: Ticket, active: false },
    { name: '포인트', path: '/points', icon: Coins, active: false },
    { name: '설정', path: '/settings', icon: Settings, active: false },
    { name: '고객 센터', path: '/customer-service', icon: Headphones, active: false },
  ];

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

  // Checkmark SVG data URIs
  const blackCheck = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E";
  const whiteCheck = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E";

  return (
    <Layout>
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-10 md:py-20 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-[260px] shrink-0 border-r border-black/5 pr-12 hidden md:block">
          <h2 className="text-2xl font-bold text-[#1b1d0e] font-serif mb-10 lowercase tracking-tight">my page categories</h2>
          <nav className="flex flex-col gap-6">
            {sideMenu.map((sub, idx) => (
              <Link 
                key={idx} 
                to={sub.path}
                className={`flex items-center gap-4 text-[16px] font-medium transition-colors group text-left ${sub.active ? 'text-[#dc2626]' : 'text-[#737373] hover:text-[#dc2626]'}`}
              >
                <span className={`w-5 h-5 flex items-center justify-center transition-all ${sub.active ? 'grayscale-0 opacity-100' : 'grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100'}`}>
                  <sub.icon size={20} strokeWidth={sub.active ? 2.5 : 2} />
                </span>
                {sub.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-grow">
          <h1 className="text-[36px] font-bold text-[#1b1d0e] font-hei mb-10">관심상품</h1>
          
          {/* Bulk Actions Header */}
          <div className="flex items-center justify-between py-4 border-b border-black/5 mb-12">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                checked={isAllSelected}
                onChange={toggleSelectAll}
                className="w-5 h-5 rounded-full border-black/30 appearance-none border cursor-pointer transition-all focus:ring-0 checked:bg-no-repeat checked:bg-center checked:bg-[length:12px_12px]"
                style={{ backgroundImage: isAllSelected ? `url("${blackCheck}")` : 'none' }}
              />
              <span className="text-sm font-medium text-[#171717] font-hei">
                전체 선택 <span className="ml-1 text-[#9C3F00] font-bold">{wishlistProducts.length}</span>
              </span>
            </div>
            
            {wishlistProducts.length > 0 && (
              <button 
                onClick={() => {
                  if (selectedItems.length === 0) {
                    alert('삭제할 상품을 선택해주세요.');
                    return;
                  }
                  if (window.confirm('선택한 상품을 삭제하시겠습니까?')) {
                    const newWishlist = wishlistProducts.filter(p => !selectedItems.includes(p.id));
                    setWishlistProducts(newWishlist);
                    localStorage.setItem('pepi_wishlist', JSON.stringify(newWishlist));
                    setSelectedItems([]);
                  }
                }}
                className="flex items-center gap-2 px-4 py-1.5 border border-black/10 rounded-full text-[12px] font-bold text-black hover:bg-gray-200 transition-all"
              >
                <span>선택 삭제</span>
                <Trash2 size={12} />
              </button>
            )}
          </div>

          {/* Product Grid */}
          {wishlistProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-16 min-h-[800px]">
                {currentItems.map((product) => (
                  <div key={product.id} className="relative group">
                    {/* Top-Left Checkbox - Line Style */}
                    <div className="absolute top-4 left-4 z-20">
                      <input 
                        type="checkbox" 
                        checked={selectedItems.includes(product.id)}
                        onChange={() => toggleSelectItem(product.id)}
                        className="w-5 h-5 rounded-full border-white/60 bg-black/10 backdrop-blur-sm appearance-none border cursor-pointer transition-all shadow-sm focus:ring-0 checked:bg-no-repeat checked:bg-center checked:bg-[length:12px_12px]"
                        style={{ backgroundImage: selectedItems.includes(product.id) ? `url("${whiteCheck}")` : 'none' }}
                      />
                    </div>
                    <ProductCard 
                      product={product} 
                      isWishlistPage={true} 
                      onRemove={handleRemoveItem}
                    />
                  </div>
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
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-40 text-center min-h-[600px]">
              <div className="w-20 h-20 bg-[#FAFAFA] rounded-full flex items-center justify-center mb-6">
                <Heart size={32} className="text-black/10" />
              </div>
              <h2 className="text-xl font-bold text-[#1B1D0E] mb-2 font-hei">관심상품이 없습니다.</h2>
              <p className="text-[#737373] text-sm mb-8 font-hei">마음에 드는 상품에 하트를 눌러보세요!</p>
              <Link 
                to="/" 
                className="px-10 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-[13px] font-medium transition-all inline-block text-black"
              >
                쇼핑하러 가기
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
