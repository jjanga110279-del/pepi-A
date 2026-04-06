import React from 'react';
import { Link } from 'react-router';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Ticket, 
  Coins, 
  Settings, 
  Headphones,
  MapPin,
  ClipboardList,
  Star,
  Trash2,
  Edit2
} from 'lucide-react';

export default function MyReviews() {
  const { reviews, deleteReview } = useUser();
  
  const sideMenu = [
    { name: '프로필', path: '/mypage', icon: User, active: false },
    { name: '주문/결재 내역', path: '/order-history', icon: ShoppingBag, active: false },
    { name: '주소록 관리', path: '/address-book', icon: MapPin, active: false },
    { name: '관심 상품', path: '/wishlist', icon: Heart, active: false },
    { name: '내 리뷰관리', path: '/my-reviews', icon: ClipboardList, active: true },
    { name: '쿠폰', path: '/coupons', icon: Ticket, active: false },
    { name: '포인트', path: '/points', icon: Coins, active: false },
    { name: '설정', path: '/settings', icon: Settings, active: false },
    { name: '고객 센터', path: '/customer-service', icon: Headphones, active: false },
  ];

  const handleDelete = (id) => {
    if (window.confirm('리뷰를 삭제하시겠습니까?')) {
      deleteReview(id);
    }
  };

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
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <h1 className="text-[32px] font-bold text-[#1b1d0e] font-hei">내 리뷰관리</h1>
              <p className="text-[14px] text-black/40 font-hei">작성하신 리뷰를 확인하고 수정하거나 삭제할 수 있습니다.</p>
            </div>

            <div className="flex flex-col gap-8">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="bg-[#FAFAFA] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row gap-8 relative group">
                    {/* Product Info */}
                    <div className="w-full md:w-[200px] shrink-0">
                      <div className="flex flex-col gap-4">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-black/5">
                          <img src={review.productImage} alt={review.productName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h4 className="text-[14px] font-bold text-black font-hei leading-tight">{review.productName}</h4>
                          <span className="text-[12px] text-black/40 font-sans">{review.options}</span>
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="flex-grow flex flex-col gap-6">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={i < review.rating ? 'fill-[#9C3F00] text-[#9C3F00]' : 'text-black/10'} 
                              />
                            ))}
                          </div>
                          <span className="text-[12px] text-black/30 font-sans">{review.date}</span>
                        </div>

                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            to={`/edit-review/${review.id}`}
                            className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-black/40 hover:text-black hover:border-black/20 transition-all"
                          >
                            <Edit2 size={16} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(review.id)}
                            className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-black/40 hover:text-[#dc2626] hover:border-[#dc2626]/20 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <p className="text-[16px] text-[#564338] leading-relaxed font-hei opacity-80">
                        {review.content}
                      </p>

                      {review.images.length > 0 && (
                        <div className="flex gap-4 mt-2">
                          {review.images.map((img, idx) => (
                            <div key={idx} className="w-24 h-24 rounded-xl overflow-hidden bg-white border border-black/5 cursor-pointer hover:opacity-80 transition-opacity">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-32 flex flex-col items-center justify-center gap-6 bg-[#FAFAFA] rounded-[48px] border border-dashed border-black/10">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                    <ClipboardList size={32} className="text-black/10" />
                  </div>
                  <p className="text-[16px] text-black/40 font-hei">작성된 리뷰가 없습니다.</p>
                  <Link 
                   to="/order-history" 
                   className="w-full max-w-[280px] h-[66px] bg-white border border-[#9C3F00] text-[#9C3F00] rounded-full flex items-center justify-center text-[16px] font-bold hover:bg-[#9C3F00]/5 transition-all active:translate-y-0.5 font-hei"
                  >
                    리뷰 작성하러 가기
                  </Link>                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
