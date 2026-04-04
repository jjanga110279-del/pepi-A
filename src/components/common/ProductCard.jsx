import React from 'react';
import { useNavigate } from 'react-router';
import { ICONS } from '../../constants/icons';

export default function ProductCard({ product, hideNewBadge = false, hideBestBadge = false, hideSaleBadge = false, isWishlistPage = false, onRemove }) {
  const navigate = useNavigate();
  
  // Initialize state from localStorage to persist across pages
  const [isLiked, setIsLiked] = React.useState(() => {
    const wishlist = JSON.parse(localStorage.getItem('pepi_wishlist') || '[]');
    return wishlist.some(item => item.id === product.id);
  });

  // Determine pricing style based on flags
  const isNew = product.isNew;
  const isBest = product.isBest;
  const isSale = product.isSale;

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleLike = (e) => {
    e.stopPropagation();
    
    const wishlist = JSON.parse(localStorage.getItem('pepi_wishlist') || '[]');
    let newWishlist;

    if (isLiked) {
      // Remove from wishlist
      newWishlist = wishlist.filter(item => item.id !== product.id);
      if (isWishlistPage && onRemove) {
        onRemove(product.id);
      }
    } else {
      // Add to wishlist
      if (!wishlist.some(item => item.id === product.id)) {
        newWishlist = [...wishlist, product];
      } else {
        newWishlist = wishlist;
      }
    }

    localStorage.setItem('pepi_wishlist', JSON.stringify(newWishlist));
    setIsLiked(!isLiked);
  };

  return (
    <div 
      onClick={handleNavigate}
      className="flex flex-col gap-5 group cursor-pointer animate-fadeIn relative h-full block"
    >
      <div className="relative aspect-[3/4] bg-[#fafafa] rounded-[32px] md:rounded-[48px] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button 
          onClick={handleLike}
          className="absolute top-6 right-6 z-10 hover:scale-110 transition-transform drop-shadow-md"
        >
          {isLiked ? (
            <ICONS.heartFilled className="text-[#dc2626] text-[20px] md:text-[24px]" />
          ) : (
            <ICONS.heart className="text-white text-[20px] md:text-[24px] brightness-0 invert" />
          )}
        </button>
      </div>
      
      <div className="flex flex-col gap-2 px-2">
        <h3 className="text-base md:text-lg font-medium text-[#1b1d0e] font-hei line-clamp-1">{product.name}</h3>
        
        <div className="flex flex-wrap items-baseline gap-2">
          {(isNew || isSale) ? (
            <>
              {product.originalPrice && (
                <span className="text-xs md:text-sm text-[#a3a3a3] line-through">{product.originalPrice}</span>
              )}
              <span className="text-lg md:text-xl font-bold text-black font-sans">{product.price}</span>
              <span className="text-sm md:text-base font-bold text-[#dc2626] font-sans">{product.discount || '5%'}</span>
            </>
          ) : (
            <span className="text-lg md:text-xl font-bold text-black font-sans">{product.price}</span>
          )}
        </div>

        {/* Badges below price */}
        <div className="flex gap-2 mt-1">
          {(isNew && !hideNewBadge) && (
            <span className="bg-black text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full tracking-tighter uppercase">NEW</span>
          )}
          {(isBest && !hideBestBadge) && (
            <span className="bg-[#dc2626] text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full tracking-tighter uppercase">BEST</span>
          )}
          {(isSale && !hideSaleBadge && !isNew) && (
            <span className="bg-[#dc2626] text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full tracking-tighter uppercase">SALE</span>
          )}
        </div>
      </div>
    </div>
  );
}
