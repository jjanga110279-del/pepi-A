import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { ICONS } from '../../constants/icons';
import { useUser } from '../../context/UserContext';
import { X, LogIn } from 'lucide-react';

export default function ProductCard({ 
  product, 
  hideNewBadge = false, 
  hideBestBadge = false, 
  hideSaleBadge = false, 
  isWishlistPage = false, 
  autoSlide = false,
  onRemove 
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(false);

  // Using 3 very distinct, high-quality images to ensure they all show up differently
  const slideImages = React.useMemo(() => {
    const validImage = product.image && typeof product.image === 'string' && product.image.length > 0 
      ? product.image 
      : "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80";

    return [
      validImage, // Original product image or fallback
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80", // Distinct fashion 1
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"  // Distinct fashion 2
    ].filter(Boolean);
  }, [product.image]);

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80";
  };

  // Interval for image rotation - strictly within bounds of slideImages
  React.useEffect(() => {
    if (!autoSlide || slideImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideImages.length);
    }, 900); // Super fast interval (0.9 seconds)
    
    return () => clearInterval(interval);
  }, [autoSlide, slideImages.length]);

  // Sync wishlist status
  React.useEffect(() => {
    if (!user) {
      setIsLiked(false);
      return;
    }
    const wishlist = JSON.parse(localStorage.getItem('pepi_wishlist') || '[]');
    setIsLiked(wishlist.some(item => item.id === product.id));
  }, [user, product.id]);

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    const wishlist = JSON.parse(localStorage.getItem('pepi_wishlist') || '[]');
    let newWishlist;
    if (isLiked) {
      newWishlist = wishlist.filter(item => item.id !== product.id);
      if (isWishlistPage && onRemove) onRemove(product.id);
    } else {
      if (!wishlist.some(item => item.id === product.id)) {
        newWishlist = [...wishlist, product];
      } else {
        newWishlist = wishlist;
      }
    }
    localStorage.setItem('pepi_wishlist', JSON.stringify(newWishlist));
    setIsLiked(!isLiked);
  };

  const isNew = product.isNew;
  const isBest = product.isBest;
  const isSale = product.isSale;

  return (
    <div 
      onClick={handleNavigate}
      className="flex flex-col gap-5 group cursor-pointer animate-fadeIn relative h-full block"
    >
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 cursor-default" onClick={(e) => e.stopPropagation()}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLoginModal(false)} />
          <div className="bg-white w-full max-w-[400px] rounded-[32px] p-8 md:p-10 relative z-10 animate-scaleUp shadow-2xl">
            <button onClick={() => setShowLoginModal(false)} className="absolute right-6 top-6 text-black/20 hover:text-black transition-colors"><X size={20} /></button>
            <div className="flex flex-col gap-6 text-center">
              <div className="w-14 h-14 bg-[#F9FAFB] rounded-2xl flex items-center justify-center mx-auto mb-2"><LogIn size={24} className="text-[#9C3F00]" /></div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[20px] font-bold text-[#1B1D0E] font-hei">로그인이 필요합니다</h3>
                <p className="text-[14px] text-[#9CA3AF] font-hei leading-relaxed">찜하기 기능을 이용하시려면<br />로그인이 필요합니다.</p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/login" state={{ from: location.pathname }} className="w-full h-14 bg-[#F9FAFB] border border-black/5 text-[#1B1D0E] rounded-full text-[15px] font-bold hover:bg-gray-200 transition-all shadow-[4px_4px_10px_rgba(0,0,0,0.05)] flex items-center justify-center">로그인하러 가기</Link>
                <button onClick={() => setShowLoginModal(false)} className="w-full h-12 text-[13px] font-bold text-black/30 hover:text-black/60 transition-colors">나중에 하기</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Area */}
      <div className="relative aspect-[3/4] bg-[#fafafa] rounded-[32px] md:rounded-[48px] overflow-hidden">
        {autoSlide ? (
          <div className="w-full h-full relative bg-[#fafafa]">
            {slideImages.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`${product.name} ${idx}`} 
                onError={handleImageError}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${currentImageIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              />
            ))}
          </div>
        ) : (
          <img 
            src={product.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"} 
            alt={product.name} 
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        )}
        <button onClick={handleLike} className="absolute top-6 right-6 z-20 hover:scale-110 transition-transform drop-shadow-md">
          {isLiked ? <ICONS.heartFilled className="text-[#dc2626] text-[20px] md:text-[24px]" /> : <ICONS.heart className="text-white text-[20px] md:text-[24px] brightness-0 invert" />}
        </button>
      </div>
      
      {/* Info Area */}
      <div className="flex flex-col gap-2 px-2">
        <h3 className="text-base md:text-lg font-medium text-[#1b1d0e] font-hei line-clamp-1">{product.name}</h3>
        <div className="flex flex-wrap items-baseline gap-2">
          {(isNew || isSale) ? (
            <>
              {product.originalPrice && <span className="text-xs md:text-sm text-[#a3a3a3] line-through">{product.originalPrice}</span>}
              <span className="text-lg md:text-xl font-bold text-black font-sans">{product.price}</span>
              <span className="text-sm md:text-base font-bold text-[#dc2626] font-sans">{product.discount || '5%'}</span>
            </>
          ) : (
            <span className="text-lg md:text-xl font-bold text-black font-sans">{product.price}</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <div className="flex items-center"><ICONS.starFilled className="text-[#FFD700] text-[12px] md:text-[14px]" /><span className="text-[12px] md:text-[13px] font-bold text-black/80 ml-1 font-sans">4.8</span></div>
          <span className="text-black/10 text-[10px]">|</span>
          <span className="text-[12px] md:text-[13px] text-black/40 font-medium font-hei">리뷰 {product.reviews || 0}</span>
        </div>
        <div className="flex gap-2 mt-1">
          {(isNew && !hideNewBadge) && <span className="bg-white border border-black/10 text-black text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full tracking-tighter uppercase">NEW</span>}
          {(isBest && !hideBestBadge) && <span className="bg-[#dc2626] text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full tracking-tighter uppercase">BEST</span>}
          {(isSale && !hideSaleBadge && !isNew) && <span className="bg-[#dc2626] text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full tracking-tighter uppercase">SALE</span>}
        </div>
      </div>
    </div>
  );
}