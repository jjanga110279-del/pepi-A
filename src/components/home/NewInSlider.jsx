import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { ICONS } from '../../constants/icons';
import { ALL_PRODUCTS } from '../../constants/products';
import { useUser } from '../../context/UserContext';
import { X, LogIn } from 'lucide-react';

const newItems = ALL_PRODUCTS.filter(p => p.category === 'new');

// For seamless infinite scroll, we duplicate the items
const scrollItems = [...newItems, ...newItems];

export default function NewInSlider() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const [wishlistIds, setWishlistIds] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Load wishlist from localStorage on mount and when user changes
  useEffect(() => {
    if (!user) {
      setWishlistIds([]);
      return;
    }
    const savedWishlist = JSON.parse(localStorage.getItem('pepi_wishlist') || '[]');
    setWishlistIds(savedWishlist.map(item => item.id));
  }, [user]);

  const handleLike = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    const savedWishlist = JSON.parse(localStorage.getItem('pepi_wishlist') || '[]');
    let newWishlist;
    const isLiked = wishlistIds.includes(item.id);

    if (isLiked) {
      newWishlist = savedWishlist.filter(p => p.id !== item.id);
    } else {
      newWishlist = [...savedWishlist, item];
    }

    localStorage.setItem('pepi_wishlist', JSON.stringify(newWishlist));
    setWishlistIds(newWishlist.map(p => p.id));
  };

  return (
    <section className="bg-[#fafafa] py-32 overflow-hidden relative">
      {/* Login Requirement Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 cursor-default" onClick={(e) => e.stopPropagation()}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLoginModal(false)} />
          <div className="bg-white w-full max-w-[400px] rounded-[32px] p-8 md:p-10 relative z-10 animate-scaleUp shadow-2xl">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute right-6 top-6 text-black/20 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col gap-6 text-center">
              <div className="w-14 h-14 bg-[#F9FAFB] rounded-2xl flex items-center justify-center mx-auto mb-2">
                <LogIn size={24} className="text-[#9C3F00]" />
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-[20px] font-bold text-[#1B1D0E] font-hei">로그인이 필요합니다</h3>
                <p className="text-[14px] text-[#9CA3AF] font-hei leading-relaxed">
                  찜하기 기능을 이용하시려면<br />로그인이 필요합니다.
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <Link 
                  to="/login"
                  state={{ from: location.pathname }}
                  className="w-full h-14 bg-[#F9FAFB] border border-black/5 text-[#1B1D0E] rounded-full text-[15px] font-bold hover:bg-gray-200 transition-all shadow-[4px_4px_10px_rgba(0,0,0,0.05)] flex items-center justify-center"
                >
                  로그인하러 가기
                </Link>
                <button 
                  onClick={() => setShowLoginModal(false)}
                  className="w-full h-12 text-[13px] font-bold text-black/30 hover:text-black/60 transition-colors"
                >
                  나중에 하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center mb-16">
        <h2 className="text-4xl font-bold font-logo italic tracking-tight text-[#1b1d0e]">New In</h2>
        <div className="w-12 h-[2px] bg-[#dc2626] mt-4" />
      </div>

      <div className="relative flex">
        <div className="flex gap-6 animate-infinite-scroll hover:[animation-play-state:paused]">
          {scrollItems.map((item, index) => {
            const isLiked = wishlistIds.includes(item.id);
            return (
              <div 
                key={`${item.id}-${index}`} 
                onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
                className="min-w-[300px] md:min-w-[350px] relative group cursor-pointer overflow-hidden rounded-none bg-white shadow-sm block"
              >
                <div className="h-[450px] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-6 text-center backdrop-blur-[2px]">
                  <h4 className="text-xl font-medium mb-1 font-hei">{item.name}</h4>
                  <p className="text-base font-bold mt-2">{item.price}</p>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center">
                      <ICONS.starFilled className="text-[#FFD700] text-[14px]" />
                      <span className="text-[13px] font-bold ml-1">4.8</span>
                    </div>
                    <span className="text-white/30 text-[10px]">|</span>
                    <span className="text-[13px] text-white/70 font-medium">리뷰 {item.reviews || 0}</span>
                  </div>
                </div>

                {/* Heart Icon - Fixed Home style */}
                <button 
                  onClick={(e) => handleLike(e, item)}
                  className="absolute top-2 right-2 md:top-2 md:right-2 z-10 hover:scale-110 transition-transform drop-shadow-md"
                >
                  {isItemLiked(item.id) ? (
                    <ICONS.heartFilled className="text-[#dc2626] text-[20px] md:text-[22px]" />
                  ) : (
                    <ICONS.heart className="text-white text-[20px] md:text-[22px] brightness-0 invert" />
                  )}
                </button>

              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-20">
        <Link 
          to="/new-5" 
          className="px-10 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-[13px] font-bold text-black/80 transition-all inline-block shadow-sm"
        >
          <span className="font-hei">더보기</span>
        </Link>
      </div>
    </section>
  );
}
