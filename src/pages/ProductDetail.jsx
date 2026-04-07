import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router';
import Layout from '../components/common/Layout';
import { ICONS } from '../constants/icons';
import { ALL_PRODUCTS, getProductById } from '../constants/products';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { Plus, Minus, X, ThumbsUp, ThumbsDown, Check, LogIn } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const productFromState = location.state?.product;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getDynamicProduct = (productId) => {
    if (!productId) return null;
    let found = getProductById(productId);
    if (found) return found;
    return null;
  };

  const product = location.state?.editItem || productFromState || getDynamicProduct(id) || {
    id: id || 'detail-main',
    name: id?.includes('outer') ? "클래식 테일러드 울 자켓" : "핀턱 레이스 블라우스",
    price: "189,000원",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    category: 'new'
  };

  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
  ];
  
  const [mainImage, setMainImage] = useState(productImages[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentTab, setCurrentTab] = useState('detail');
  const [sortBy, setSortBy] = useState('recommended');

  // Handle initial tab from navigation state
  React.useEffect(() => {
    if (location.state?.tab === 'review') {
      setCurrentTab('review');
      // Delay scroll to ensure content is rendered
      setTimeout(() => {
        if (tabRef.current) {
          const yOffset = -120;
          const element = tabRef.current;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.state]);

  const [photoOnly, setPhotoOnly] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const tabRef = React.useRef(null);

  // 제품별 맞춤 리뷰 데이터 생성 헬퍼 함수
  const generateReviews = (count, category) => {
    const names = ['김*현', '이*영', '박*서', '최*아', '정*진', '윤*나', '한*지', '조*우', '임*민', '강*수'];
    const fashionImages = [
      '1515886657613-9f3515b0c78f', '1434389677669-e08b4cac3105', '1490481651871-ab68de25d43d',
      '1539109136881-3be0616acf4b', '1469334031218-e382a71b716b', '1496747611176-843222e1e57c',
      '1572804013307-f9a8a9264bb7', '1485230895905-ec40ba36bc9c', '1492707892479-7bc8d5a4ee93',
      '1554412930-c74c636ff851'
    ];

    const contents = {
      outer: [
        '핏이 너무 예술이에요. 어깨 라인이 딱 잡혀서 고급스러워 보입니다.',
        '소재가 정말 탄탄하네요. 유행 안 타고 오래 입을 수 있을 것 같아요.',
        '배송도 빠르고 포장도 정성스러워서 감동했습니다. 자켓 맛집이네요.',
        '색감이 화면보다 실물이 훨씬 예뻐요. 가볍고 따뜻해서 자주 손이 가요.'
      ],
      dress: [
        '기장감도 적당하고 허리 라인을 잘 잡아줘서 날씬해 보여요.',
        '중요한 모임에 입고 나갔는데 다들 어디서 샀냐고 물어보네요.',
        '하늘하늘한 소재가 너무 기분 좋아요. 여성스러운 무드 뿜뿜입니다.',
        '안감이 꼼꼼하게 되어 있어서 비침 걱정 없이 입을 수 있어요.',
        '데이트 룩으로 최고예요. 남친이 너무 예쁘다고 칭찬해줬어요.'
      ],
      top: [
        '기본 템으로 최고예요. 촉감이 너무 부드럽어서 피부에 닿는 느낌이 좋아요.',
        '깔별로 쟁여두고 싶은 아이템입니다. 청바지, 스커트 어디든 잘 어울려요.',
        '세탁 후에도 변형이 거의 없어서 놀랐어요. 퀄리티 대박입니다.',
        '사이즈가 정사이즈라 편하게 잘 맞아요. 가성비 최고의 선택이었습니다.'
      ]
    };

    const categoryKey = category === 'outer' ? 'outer' : category === 'dress' ? 'dress' : 'top';
    const selectedContents = contents[categoryKey];

    return Array.from({ length: count }, (_, i) => {
      const reviewImages = [];
      if (i % 2 === 0) {
        const imgCount = (i % 3) + 1;
        for (let j = 0; j < imgCount; j++) {
          reviewImages.push(`https://images.unsplash.com/photo-${fashionImages[(i + j) % fashionImages.length]}?q=80&w=600&auto=format&fit=crop`);
        }
      }

      return {
        id: i + 1,
        user: names[i % names.length],
        date: `2024.03.${Math.max(1, 28 - i)}`,
        rating: i % 5 === 0 ? 4 : 5,
        content: `${product.name} ${selectedContents[i % selectedContents.length]}`,
        option: `Option ${i + 1} 구매`,
        images: reviewImages,
        activeIndex: 0, // 현재 메인으로 보여줄 이미지 인덱스
        helpful: Math.floor(Math.random() * 20),
        notHelpful: Math.floor(Math.random() * 2)
      };
    });
  };

  const getInitialReviews = () => {
    const isOuter = product.name.includes('자켓') || product.name.includes('코트');
    const isDress = product.name.includes('원피스');
    
    if (isOuter) return generateReviews(6, 'outer');
    if (isDress) return generateReviews(22, 'dress');
    return generateReviews(12, 'top');
  };

  const [reviews, setReviews] = useState(getInitialReviews());

  // 제품이 변경될 때마다 리뷰 데이터 및 페이지 초기화
  React.useEffect(() => {
    setReviews(getInitialReviews());
    setCurrentPage(1);
    setSelectedUser(null);
  }, [product.id]);

  const handleHelpfulClick = (reviewId, type) => {
    setReviews(prev => prev.map(rev => {
      if (rev.id === reviewId) {
        return {
          ...rev,
          [type]: rev[type] + 1
        };
      }
      return rev;
    }));
  };

  const handleReviewImageClick = (reviewId, idx, e) => {
    e.stopPropagation(); // 부모의 작성자 필터링 클릭 방지
    setReviews(prev => prev.map(rev => 
      rev.id === reviewId ? { ...rev, activeIndex: idx } : rev
    ));
  };

  const filteredReviews = reviews
    .filter(rev => !photoOnly || rev.images.length > 0)
    .filter(rev => !selectedUser || rev.user === selectedUser)
    .sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'recommended') return b.helpful - a.helpful;
      return 0;
    });

  // 페이지네이션 로직
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const scrollToTabs = () => {
    if (tabRef.current) {
      const yOffset = -100; // Adjusted for header
      const y = tabRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'auto' });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTabs();
  };

  const handleUserClick = (userName) => {
    setSelectedUser(userName);
    setCurrentPage(1);
    scrollToTabs();
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
    scrollToTabs();
  };

  const handleTabClick = (tabId) => {
    setCurrentTab(tabId);
    scrollToTabs();
  };

  const checkLoginAndProceed = (action) => {
    // 임시로 user가 'Elena Kim'이면 로그인된 것으로 간주하지만, 
    // 팝업 테스트를 위해 실제로는 로그인이 필요한 상황을 시뮬레이션해야 할 수도 있습니다.
    // 여기서는 user가 null이거나 특정 조건일 때 팝업을 띄우는 로직을 추가합니다.
    // 사용자가 요청한 '로그인 후 진행' 시나리오를 위해 강제로 로그인이 필요한 상태를 체크합니다.
    
    if (!user || user.name === 'Guest' || !user.email) {
      setShowLoginModal(action); // 'cart' or 'buy'
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!checkLoginAndProceed('cart')) return;

    if (selectedOptions.length === 0) {
      alert('옵션을 선택해주세요.');
      return;
    }

    selectedOptions.forEach(opt => {
      addToCart({
        id: product.id,
        name: product.name,
        price: numericPrice,
        image: product.image,
        color: opt.color,
        size: opt.size,
        quantity: opt.quantity
      });
    });
    
    alert('선택한 모든 상품이 장바구니에 담겼습니다.');
    setSelectedOptions([]);
  };

  const handleBuyNow = () => {
    if (!checkLoginAndProceed('buy')) return;

    if (selectedOptions.length === 0) {
      alert('옵션을 선택해주세요.');
      return;
    }

    const itemsToOrder = selectedOptions.map(opt => ({
      id: product.id,
      name: product.name,
      price: numericPrice,
      image: product.image,
      color: opt.color,
      size: opt.size,
      quantity: opt.quantity
    }));

    navigate('/checkout', { state: { items: itemsToOrder, fromCart: false } });
  };

  return (
    <Layout>
      {/* Login Requirement Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLoginModal(false)} />
          <div className="bg-white w-full max-w-[448px] rounded-[32px] p-10 md:p-12 relative z-10 animate-scaleUp shadow-2xl">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute right-8 top-8 text-black/20 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col gap-8">
              <div className="w-16 h-16 bg-[#F9FAFB] rounded-2xl flex items-center justify-center mx-auto mb-2">
                <LogIn size={28} className="text-[#9C3F00]" />
              </div>
              
              <div className="flex flex-col gap-3 text-center">
                <h3 className="text-[24px] font-bold text-[#1B1D0E] font-hei">로그인이 필요합니다</h3>
                <p className="text-[15px] text-[#9CA3AF] font-hei leading-relaxed">
                  요청하신 기능을 이용하시려면<br />로그인이 필요합니다.
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <Link 
                  to="/login"
                  state={{ 
                    from: location.pathname,
                    action: showLoginModal === 'cart' ? 'add_to_cart' : 'buy_now',
                    product: product,
                    selectedOptions: selectedOptions
                  }}
                  className="w-full h-16 bg-[#F9FAFB] border border-black/5 text-[#1B1D0E] rounded-full text-[16px] font-bold hover:bg-gray-200 transition-all shadow-[6px_6px_15px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:shadow-inner flex items-center justify-center"
                >
                  로그인하러 가기
                </Link>
                <button 
                  onClick={() => setShowLoginModal(false)}
                  className="w-full h-14 text-[14px] font-bold text-black/30 hover:text-black/60 transition-colors"
                >
                  나중에 하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-8 pb-32">
        {/* Main Selection Area */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-20 mb-32">
          {/* Left: Gallery */}
          <div className="lg:w-[683px] flex flex-col md:flex-row gap-4 h-fit lg:sticky lg:top-40">
            {/* Desktop Vertical Thumbnails */}
            <div className="hidden md:flex flex-col gap-4 w-20 max-h-[800px] overflow-y-auto no-scrollbar pb-10">
              {productImages.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`aspect-[3/4] rounded-lg overflow-hidden bg-[#fafafa] cursor-pointer border-2 transition-all flex-shrink-0 ${mainImage === img ? 'border-[#9C3F00] shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Main Large Image */}
            <div className="flex-grow aspect-[3/4] rounded-2xl overflow-hidden bg-[#fafafa] transition-all duration-500 shadow-sm">
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Mobile Horizontal Thumbnails */}
            <div className="flex md:hidden gap-3 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 mt-2">
              {productImages.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`w-20 aspect-[3/4] rounded-xl overflow-hidden bg-[#fafafa] cursor-pointer border-2 transition-all flex-shrink-0 ${mainImage === img ? 'border-[#9C3F00] shadow-md' : 'border-transparent opacity-60'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:w-[469px] flex flex-col">
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#9C3F00] text-sm font-semibold tracking-tight">New Arrival</span>
                <ICONS.share className="text-black/40 cursor-pointer hover:text-black transition-colors" />
              </div>
              <h1 className="text-[32px] md:text-[36px] font-bold text-[#1b1d0e] font-hei mb-4 leading-tight">{product.name}</h1>
              <div className="text-[24px] font-bold text-[#9C3F00] font-sans mb-5">{product.price}</div>
              <div className="inline-block px-3 py-1 bg-[#F9F9F9] rounded-lg text-[#9C3F00] text-[11px] font-bold font-hei">무료배송</div>
            </div>

            {/* Selection Inputs */}
            <div className="flex flex-col gap-8 mb-10">
              <div>
                <span className="text-xs font-bold text-[#564338] mb-4 block tracking-tight uppercase font-hei">Color Selection</span>
                <div className="flex gap-4">
                  {[
                    { name: 'Ivory', color: '#FFFFFF' },
                    { name: 'Beige', color: '#F5F5DC' },
                    { name: 'Charcoal', color: '#3D3D3D' }
                  ].map((c) => (
                    <button 
                      key={c.name}
                      onClick={() => handleOptionSelect('color', c.name)}
                      className={`w-8 h-8 rounded-full border transition-all ${selectedColor === c.name ? 'border-[#9C3F00] scale-110 ring-2 ring-[#9C3F00]/20' : 'border-[#F0F0F0]'}`}
                      style={{ backgroundColor: c.color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-[#564338] mb-4 block tracking-tight uppercase font-hei">Size Selection</span>
                <div className="flex gap-2">
                  {['S', 'M', 'L'].map((s) => (
                    <button 
                      key={s}
                      onClick={() => handleOptionSelect('size', s)}
                      className={`flex-1 h-11 rounded-lg border text-sm font-medium transition-all ${selectedSize === s ? 'border-[#9C3F00] text-[#9C3F00] font-bold' : 'border-[#F0F0F0] text-black/60 bg-white hover:border-black/20'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected List */}
            {selectedOptions.length > 0 && (
              <div className="flex flex-col gap-3 mb-10 pt-6 border-t border-black/5">
                {selectedOptions.map((opt) => (
                  <div key={opt.optionId} className="bg-[#FAFAFA] rounded-xl p-5 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-black font-hei">{product.name}</span>
                        <span className="text-[12px] text-black/40 font-sans uppercase">{opt.color} / {opt.size}</span>
                      </div>
                      <button onClick={() => removeOption(opt.optionId)} className="text-black/20 hover:text-black"><X size={16} /></button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-black/10 rounded-full h-8 px-1.5 gap-3 bg-white">
                        <button onClick={() => updateOptionQuantity(opt.optionId, -1)} className="w-5 h-5 flex items-center justify-center text-black/40"><Minus size={12}/></button>
                        <span className="text-[13px] font-bold w-4 text-center font-sans">{opt.quantity}</span>
                        <button onClick={() => updateOptionQuantity(opt.optionId, 1)} className="w-5 h-5 flex items-center justify-center text-black/40"><Plus size={12}/></button>
                      </div>
                      <span className="text-[15px] font-bold text-black font-sans">₩{(numericPrice * opt.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Final Actions */}
            <div className="pt-8 border-t border-[#F0F0F0]">
              {selectedOptions.length > 0 && (
                <div className="flex justify-between items-end mb-8">
                  <span className="text-sm font-bold text-black font-hei uppercase tracking-widest">Total Amount</span>
                  <span className="text-[28px] font-bold text-[#9C3F00] font-sans leading-none tracking-tight">₩{totalPrice.toLocaleString()}</span>
                </div>
              )}
              <div className="flex gap-4">
                <button onClick={handleAddToCart} className="flex-1 h-[66px] rounded-full border border-[#9C3F00] text-[#9C3F00] text-base font-bold font-hei hover:bg-[#9C3F00]/5 transition-all">
                  장바구니 담기
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 h-[66px] rounded-full bg-[#9C3F00] text-white text-base font-bold font-hei shadow-lg shadow-[#9C3F00]/20 hover:bg-[#853600] transition-all"
                >
                  바로 구매하기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div ref={tabRef} className="border-b border-[#F0F0F0] mb-20 flex justify-center sticky top-0 bg-white/95 backdrop-blur-sm z-30">
          <div className="flex gap-4 md:gap-12 px-4">
            {[
              { id: 'detail', label: '상세정보' },
              { id: 'size', label: '사이즈 가이드' },
              { id: 'review', label: `구매후기(${reviews.length})` },
              { id: 'shipping', label: '배송&반품' }
            ].map((tab) => (
              tab.id === 'shipping' ? (
                <Link
                  key={tab.id}
                  to="/guide#delivery-section"
                  className="py-4 text-[13px] md:text-sm font-bold text-[#564338] opacity-60 hover:opacity-100 transition-all border-b-2 border-transparent"
                >
                  {tab.label}
                </Link>
              ) : (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`py-4 text-[13px] md:text-sm font-bold transition-all border-b-2 ${
                    currentTab === tab.id 
                      ? 'border-[#9C3F00] text-[#9C3F00]' 
                      : 'border-transparent text-[#564338] opacity-60 hover:opacity-100'
                  }`}
                >
                  {tab.label}
                </button>
              )
            ))}
          </div>
        </div>

        {/* Tab Content Section */}
        <div className="max-w-[896px] mx-auto">
          {currentTab === 'detail' && (
            <div className="flex flex-col gap-32">
              {/* 1. Product Features */}
              <div className="text-center">
                <div className="flex flex-col items-center gap-6 mb-16">
                  <h2 className="text-[30px] font-serif italic text-[#1b1d0e]">Product Check Point</h2>
                  <div className="w-12 h-0.5 bg-[#9C3F00]" />
                </div>
                <div className="bg-[#FAFAFA] rounded-3xl p-10 text-left">
                  <ul className="flex flex-col gap-10">
                    {[
                      { title: '프리미엄 코튼 혼방 소재', desc: '피부 자극이 적고 통기성이 뛰어나 한여름에도 쾌적한 착용감을 선사합니다.' },
                      { title: '핸드메이드 핀턱 & 프랑스 레이스', desc: '장인의 정교한 손길이 닿은 핀턱 디테일과 고급스러운 레이스 배색으로 소장 가치를 높였습니다.' },
                      { title: '세련된 세미 크롭 실루엣', desc: '다양한 하의와 매치하기 좋은 적절한 기장감으로 체형 보정 효과와 함께 우아한 핏을 연출합니다.' }
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-6 items-start">
                        <div className="w-5 h-5 rounded-full bg-[#9C3F00]/10 flex items-center justify-center mt-1 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-[#9C3F00]" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[16px] font-bold text-[#1b1d0e] font-hei">{item.title}</span>
                          <span className="text-[16px] text-[#564338] font-hei opacity-80 leading-relaxed">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 2. Visual Content */}
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-8">
                  <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" alt="Detail 1" className="aspect-[3/4] rounded-2xl object-cover" />
                  <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop" alt="Detail 2" className="aspect-[3/4] rounded-2xl object-cover mt-12" />
                </div>
                <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop" alt="Wide View" className="aspect-video rounded-3xl object-cover mt-12" />
              </div>

              {/* 3. Small Size Guide (Quick View) */}
              <div className="py-24 border-t border-black/5">
                <div className="flex flex-col gap-12">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[24px] font-bold text-[#1b1d0e] font-hei">Size Guide</h3>
                    <p className="text-[14px] text-black/40 font-hei">해당 제품의 실측 사이즈 가이드입니다.</p>
                  </div>
                  
                  <div className="w-full">
                    {/* 상의 (Top) - 이름에 자켓, 블라우스, 셔츠, 티셔츠 등이 포함된 경우 */}
                    {(product.name.includes('자켓') || product.name.includes('블라우스') || product.name.includes('셔츠') || product.name.includes('티') || !product.name.includes('팬츠') && !product.name.includes('슬랙스') && !product.name.includes('원피스')) && (
                      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                        {/* Left Info */}
                        <div className="flex-grow flex flex-col gap-10">
                          <div className="flex flex-col gap-4 py-4 border-b border-[#F4F4F5]">
                            <h5 className="text-[14px] font-bold text-[#1b1d0e] font-hei">측정 방법 안내</h5>
                            <ul className="flex flex-col gap-3 text-[14px] text-[#52525B] font-sans">
                              <li>• 어깨: 어깨 솔기 양 끝을 직선으로 측정합니다.</li>
                              <li>• 가슴: 겨드랑이 밑 지점의 단면을 수평으로 측정합니다.</li>
                              <li>• 소매: 어깨 솔기부터 소매 끝단까지 측정합니다.</li>
                              <li>• 총장: 뒷목 중심부터 밑단까지 수직으로 측정합니다.</li>
                            </ul>
                          </div>
                          <div className="flex flex-col gap-4">
                            <h5 className="text-[14px] font-bold text-[#1b1d0e] font-hei py-2 border-b border-[#F4F4F5]">표준 사이즈 가이드 (cm)</h5>
                            <table className="w-full text-sm font-sans">
                              <thead>
                                <tr className="text-black/40">
                                  <th className="py-4 text-left font-normal">Size</th>
                                  <th className="py-4 text-center font-normal">어깨</th>
                                  <th className="py-4 text-center font-normal">가슴</th>
                                  <th className="py-4 text-center font-normal">소매</th>
                                  <th className="py-4 text-center font-normal">총장</th>
                                </tr>
                              </thead>
                              <tbody className="text-[#52525B]">
                                {[{s:'90-95 (S)', a:'44', b:'52', c:'60', d:'68'}, {s:'100 (M)', a:'46', b:'54', c:'61', d:'70'}, {s:'105 (L)', a:'48', b:'56', c:'62', d:'72'}].map((r, i) => (
                                  <tr key={i} className="border-t border-[#FAFAFA]">
                                    <td className="py-4 font-bold text-[#1b1d0e]">{r.s}</td>
                                    <td className="py-4 text-center">{r.a}</td>
                                    <td className="py-4 text-center">{r.b}</td>
                                    <td className="py-4 text-center">{r.c}</td>
                                    <td className="py-4 text-center">{r.d}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* Right Diagram */}
                        <div className="w-full lg:w-[320px] aspect-[4/3] bg-[#FAFAFA] rounded-[16px] flex items-center justify-center relative p-8 shrink-0">
                          <div className="relative w-full max-w-[200px]">
                            <svg viewBox="0 0 280 336" className="w-full h-auto text-[#D4D4D8]">
                              <path d="M60 40 L220 40 L280 120 L240 336 L40 336 L0 120 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                              <line x1="60" y1="40" x2="220" y2="40" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                              <line x1="20" y1="120" x2="260" y2="120" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                              <line x1="220" y1="40" x2="280" y2="120" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                              <line x1="140" y1="40" x2="140" y2="336" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                            </svg>
                            <span className="absolute top-[0px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#9C3F00]">어깨</span>
                            <span className="absolute top-[100px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#9C3F00]">가슴</span>
                            <span className="absolute top-[50px] right-[0px] text-[10px] font-bold text-[#9C3F00] rotate-45">소매</span>
                            <span className="absolute top-[160px] left-[110px] text-[10px] font-bold text-[#9C3F00]">총장</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 하의 (Bottom) - 이름에 팬츠, 슬랙스, 스커트 등이 포함된 경우 */}
                    {(product.name.includes('팬츠') || product.name.includes('슬랙스') || product.name.includes('스커트')) && (
                      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                        {/* Left Info */}
                        <div className="flex-grow flex flex-col gap-10">
                          <div className="flex flex-col gap-4 py-4 border-b border-[#F4F4F5]">
                            <h5 className="text-[14px] font-bold text-[#1b1d0e] font-hei">측정 방법 안내</h5>
                            <ul className="flex flex-col gap-3 text-[14px] text-[#52525B] font-sans">
                              <li>• 허리: 벨트 라인의 양 끝 단면을 측정합니다.</li>
                              <li>• 힙: 허리선에서 약 18~20cm 아래 가장 넓은 부분을 측정합니다.</li>
                              <li>• 허벅지: 밑위 아래 약 1cm 지점의 단면을 측정합니다.</li>
                              <li>• 밑위: 허리선부터 십자 이음새 지점까지 수직으로 측정합니다.</li>
                              <li>• 총장: 옆선 허리부터 밑단까지 수직으로 측정합니다.</li>
                            </ul>
                          </div>
                          <div className="flex flex-col gap-4">
                            <h5 className="text-[14px] font-bold text-[#1b1d0e] font-hei py-2 border-b border-[#F4F4F5]">표준 사이즈 가이드 (cm)</h5>
                            <table className="w-full text-sm font-sans">
                              <thead>
                                <tr className="text-black/40">
                                  <th className="py-4 text-left font-normal">Size</th>
                                  <th className="py-4 text-center font-normal">허리</th>
                                  <th className="py-4 text-center font-normal">힙</th>
                                  <th className="py-4 text-center font-normal">허벅지</th>
                                  <th className="py-4 text-center font-normal">밑위</th>
                                  <th className="py-4 text-center font-normal">총장</th>
                                </tr>
                              </thead>
                              <tbody className="text-[#52525B]">
                                {[{s:'25-26 (S)', a:'33', b:'46', c:'28', d:'28', e:'102'}, {s:'27-28 (M)', a:'35', b:'48', c:'29.5', d:'29', e:'103'}, {s:'29-30 (L)', a:'37', b:'50', c:'31', d:'30', e:'104'}].map((r, i) => (
                                  <tr key={i} className="border-t border-[#FAFAFA]">
                                    <td className="py-4 font-bold text-[#1b1d0e]">{r.s}</td>
                                    <td className="py-4 text-center">{r.a}</td>
                                    <td className="py-4 text-center">{r.b}</td>
                                    <td className="py-4 text-center">{r.c}</td>
                                    <td className="py-4 text-center">{r.d}</td>
                                    <td className="py-4 text-center">{r.e}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* Right Diagram */}
                        <div className="w-full lg:w-[320px] aspect-[4/3] bg-[#FAFAFA] rounded-[16px] flex items-center justify-center relative p-8 shrink-0">
                          <div className="relative w-full max-w-[200px]">
                            <svg viewBox="0 0 280 336" className="w-full h-auto text-[#D4D4D8]">
                              <path d="M70 56 L210 56 L210 308 L140 308 L140 168 L70 308 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                              <line x1="70" y1="56" x2="210" y2="56" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                              <line x1="140" y1="56" x2="140" y2="168" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                              <line x1="70" y1="120" x2="210" y2="120" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                              <line x1="70" y1="180" x2="140" y2="180" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                              <line x1="210" y1="56" x2="210" y2="308" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                            </svg>
                            <span className="absolute top-[25px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#9C3F00]">허리</span>
                            <span className="absolute top-[80px] left-[110px] text-[10px] font-bold text-[#9C3F00]">밑위</span>
                            <span className="absolute top-[85px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#9C3F00]">힙</span>
                            <span className="absolute top-[150px] left-[55px] text-[10px] font-bold text-[#9C3F00]">허벅지</span>
                            <span className="absolute top-[160px] right-[30px] text-[10px] font-bold text-[#9C3F00]">총장</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 원피스 (Dress) */}
                    {product.name.includes('원피스') && (
                      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                        {/* Left Info */}
                        <div className="flex-grow flex flex-col gap-10">
                          <div className="flex flex-col gap-4 py-4 border-b border-[#F4F4F5]">
                            <h5 className="text-[14px] font-bold text-[#1b1d0e] font-hei">측정 방법 안내</h5>
                            <ul className="flex flex-col gap-3 text-[14px] text-[#52525B] font-sans">
                              <li>• 총장: 뒷목 중심부터 밑단까지 수직으로 측정합니다.</li>
                              <li>• 가슴: 겨드랑이 밑 지점의 단면을 수평으로 측정합니다.</li>
                              <li>• 허리: 디자인에 따른 허리선의 단면을 수평으로 측정합니다.</li>
                              <li>• 소매: 어깨 솔기부터 소매 끝단까지 측정합니다.</li>
                            </ul>
                          </div>
                          <div className="flex flex-col gap-4">
                            <h5 className="text-[14px] font-bold text-[#1b1d0e] font-hei py-2 border-b border-[#F4F4F5]">표준 사이즈 가이드 (cm)</h5>
                            <table className="w-full text-sm font-sans">
                              <thead>
                                <tr className="text-black/40">
                                  <th className="py-4 text-left font-normal">Size</th>
                                  <th className="py-4 text-center font-normal">총장</th>
                                  <th className="py-4 text-center font-normal">어깨</th>
                                  <th className="py-4 text-center font-normal">가슴</th>
                                  <th className="py-4 text-center font-normal">소매</th>
                                  <th className="py-4 text-center font-normal">허리</th>
                                </tr>
                              </thead>
                              <tbody className="text-[#52525B]">
                                {[{s:'S (Free)', a:'118', b:'38', c:'45', d:'58', e:'36'}, {s:'M (Free)', a:'120', b:'40', c:'47', d:'59', e:'38'}].map((r, i) => (
                                  <tr key={i} className="border-t border-[#FAFAFA]">
                                    <td className="py-4 font-bold text-[#1b1d0e]">{r.s}</td>
                                    <td className="py-4 text-center">{r.a}</td>
                                    <td className="py-4 text-center">{r.b}</td>
                                    <td className="py-4 text-center">{r.c}</td>
                                    <td className="py-4 text-center">{r.d}</td>
                                    <td className="py-4 text-center">{r.e}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* Right Diagram */}
                        <div className="w-full lg:w-[320px] aspect-[4/3] bg-[#FAFAFA] rounded-[16px] flex items-center justify-center relative p-8 shrink-0">
                          <div className="relative w-full max-w-[200px]">
                            <svg viewBox="0 0 280 364" className="w-full h-auto text-[#D4D4D8]">
                              <path d="M56 46 L224 46 L280 120 L240 364 L40 364 L0 120 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                              <line x1="56" y1="78" x2="224" y2="78" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                              <line x1="224" y1="78" x2="280" y2="120" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                              <line x1="70" y1="154" x2="210" y2="154" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                              <line x1="140" y1="50" x2="140" y2="336" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                              <line x1="78" y1="224" x2="201" y2="224" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                            </svg>
                            <span className="absolute top-[40px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#9C3F00]">어깨</span>
                            <span className="absolute top-[80px] right-[0px] text-[10px] font-bold text-[#9C3F00] rotate-45">소매</span>
                            <span className="absolute top-[110px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#9C3F00]">가슴</span>
                            <span className="absolute top-[150px] left-[120px] text-[10px] font-bold text-[#9C3F00]">총장</span>
                            <span className="absolute top-[185px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#9C3F00]">허리</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 4. Shipping & Care (Always under detail) */}
              <div className="pt-24 border-t border-black/5 mb-20 flex flex-col gap-20">
                <div className="grid md:grid-cols-2 gap-20">
                  <div className="flex flex-col gap-4">
                    <h4 className="text-[18px] font-bold text-[#1b1d0e] font-hei">배송 안내</h4>
                    <p className="text-[14px] text-[#564338] leading-[23px] font-hei opacity-80">
                      기본 배송비는 3,000원입니다. 50,000원 이상 구매 시 무료 배송되며, 결제 완료 후 영업일 기준 2-5일 이내 출고됩니다. 제주 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-[18px] font-bold text-[#1b1d0e] font-hei">세탁 및 관리</h4>
                    <p className="text-[14px] text-[#564338] leading-[23px] font-hei opacity-80">
                      중성세제를 이용한 찬물 단독 손세탁 또는 드라이클리닝을 권장합니다. 형태 보존을 위해 옷걸이 사용보다 뉘어서 건조해주세요.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-[18px] font-bold text-[#1b1d0e] font-hei">교환 및 반품 안내</h4>
                  <p className="text-[14px] text-[#564338] leading-[23px] font-hei opacity-80">
                    상품 수령 후 7일 이내에 고객센터 또는 마이페이지를 통해 신청 가능합니다. 단순 변심에 의한 교환/반품 시 왕복 배송비는 고객 부담이며, 상품의 가치가 훼손된 경우 처리가 어려울 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'size' && (
            <div className="flex flex-col gap-24 py-10">
              <div className="flex flex-col gap-4">
                <h3 className="text-[28px] font-bold font-hei text-[#1b1d0e]">Size Guide</h3>
                <p className="text-[14px] text-black/40 font-hei">상품의 실측 사이즈를 확인하여 나에게 맞는 최적의 사이즈를 선택하세요.</p>
              </div>

              {/* 1. 상의 (Top) */}
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] font-bold text-[#9C3F00] font-sans">Category 01</span>
                  <h4 className="text-[30px] font-serif text-[#1b1d0e]">상의 (Top)</h4>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-16">
                  {/* Left: Measurement Guide & Table */}
                  <div className="flex-grow flex flex-col gap-10">
                    <div className="flex flex-col gap-4 py-4 border-b border-[#F4F4F5]">
                      <h5 className="text-[14px] font-bold text-[#1b1d0e] font-hei">측정 방법 안내</h5>
                      <ul className="flex flex-col gap-3 text-[14px] text-[#52525B] font-sans">
                        <li>• 어깨: 어깨 솔기 양 끝을 직선으로 측정합니다.</li>
                        <li>• 가슴: 겨드랑이 밑 지점의 단면을 수평으로 측정합니다.</li>
                        <li>• 소매: 어깨 솔기부터 소매 끝단까지 측정합니다.</li>
                        <li>• 총장: 뒷목 중심부터 밑단까지 수직으로 측정합니다.</li>
                      </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h5 className="text-[14px] font-bold text-[#1b1d0e] font-hei py-2 border-b border-[#F4F4F5]">표준 사이즈 가이드 (cm)</h5>
                      <table className="w-full text-sm font-sans">
                        <thead>
                          <tr className="text-black/40">
                            <th className="py-4 text-left font-normal">Size</th>
                            <th className="py-4 text-center font-normal">어깨</th>
                            <th className="py-4 text-center font-normal">가슴</th>
                            <th className="py-4 text-center font-normal">소매</th>
                            <th className="py-4 text-center font-normal">총장</th>
                          </tr>
                        </thead>
                        <tbody className="text-[#52525B]">
                          {[
                            {s:'90-95 (S)', a:'44', b:'52', c:'60', d:'68'},
                            {s:'100 (M)', a:'46', b:'54', c:'61', d:'70'},
                            {s:'105 (L)', a:'48', b:'56', c:'62', d:'72'}
                          ].map((r, i) => (
                            <tr key={i} className="border-t border-[#FAFAFA]">
                              <td className="py-4 font-bold text-[#1b1d0e]">{r.s}</td>
                              <td className="py-4 text-center">{r.a}</td>
                              <td className="py-4 text-center">{r.b}</td>
                              <td className="py-4 text-center">{r.c}</td>
                              <td className="py-4 text-center">{r.d}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right: Visual Diagram */}
                  <div className="w-full lg:w-[576px] aspect-[4/3] bg-[#FAFAFA] rounded-[16px] flex items-center justify-center relative p-12">
                    <div className="relative w-full max-w-[280px]">
                      <svg viewBox="0 0 280 336" className="w-full h-auto text-[#D4D4D8]">
                        <path d="M60 40 L220 40 L280 120 L240 336 L40 336 L0 120 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        {/* 어깨 */}
                        <line x1="60" y1="40" x2="220" y2="40" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                        {/* 가슴 */}
                        <line x1="20" y1="120" x2="260" y2="120" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                        {/* 소매 */}
                        <line x1="220" y1="40" x2="280" y2="120" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                        {/* 총장 */}
                        <line x1="140" y1="40" x2="140" y2="336" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                      </svg>
                      {/* Labels */}
                      <span className="absolute top-[10px] left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#9C3F00]">어깨</span>
                      <span className="absolute top-[130px] left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#9C3F00]">가슴</span>
                      <span className="absolute top-[70px] right-[10px] text-[11px] font-bold text-[#9C3F00] rotate-45">소매</span>
                      <span className="absolute top-[180px] left-[150px] text-[11px] font-bold text-[#9C3F00]">총장</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. 하의 (Bottom) */}
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] font-bold text-[#9C3F00] font-sans">Category 02</span>
                  <h4 className="text-[30px] font-serif text-[#1b1d0e]">하의 (Bottom)</h4>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-16">
                  {/* Left: Measurement Guide & Table */}
                  <div className="flex-grow flex flex-col gap-10">
                    <div className="flex flex-col gap-4 py-4 border-b border-[#F4F4F5]">
                      <h5 className="text-[14px] font-bold text-[#1b1d0e] font-hei">측정 방법 안내</h5>
                      <ul className="flex flex-col gap-3 text-[14px] text-[#52525B] font-sans">
                        <li>• 허리: 벨트 라인의 양 끝 단면을 측정합니다.</li>
                        <li>• 힙: 허리선에서 약 18~20cm 아래 가장 넓은 부분을 측정합니다.</li>
                        <li>• 허벅지: 밑위 아래 약 1cm 지점의 단면을 측정합니다.</li>
                        <li>• 밑위: 허리선부터 십자 이음새 지점까지 수직으로 측정합니다.</li>
                        <li>• 총장: 옆선 허리부터 밑단까지 수직으로 측정합니다.</li>
                      </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h5 className="text-[14px] font-bold text-[#1b1d0e] font-hei py-2 border-b border-[#F4F4F5]">표준 사이즈 가이드 (cm)</h5>
                      <table className="w-full text-sm font-sans">
                        <thead>
                          <tr className="text-black/40">
                            <th className="py-4 text-left font-normal">Size</th>
                            <th className="py-4 text-center font-normal">허리</th>
                            <th className="py-4 text-center font-normal">힙</th>
                            <th className="py-4 text-center font-normal">허벅지</th>
                            <th className="py-4 text-center font-normal">밑위</th>
                            <th className="py-4 text-center font-normal">총장</th>
                          </tr>
                        </thead>
                        <tbody className="text-[#52525B]">
                          {[
                            {s:'25-26 (S)', a:'33', b:'46', c:'28', d:'28', e:'102'},
                            {s:'27-28 (M)', a:'35', b:'48', c:'29.5', d:'29', e:'103'},
                            {s:'29-30 (L)', a:'37', b:'50', c:'31', d:'30', e:'104'}
                          ].map((r, i) => (
                            <tr key={i} className="border-t border-[#FAFAFA]">
                              <td className="py-4 font-bold text-[#1b1d0e]">{r.s}</td>
                              <td className="py-4 text-center">{r.a}</td>
                              <td className="py-4 text-center">{r.b}</td>
                              <td className="py-4 text-center">{r.c}</td>
                              <td className="py-4 text-center">{r.d}</td>
                              <td className="py-4 text-center">{r.e}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right: Visual Diagram */}
                  <div className="w-full lg:w-[576px] aspect-[4/3] bg-[#FAFAFA] rounded-[16px] flex items-center justify-center relative p-12">
                    <div className="relative w-full max-w-[280px]">
                      <svg viewBox="0 0 280 336" className="w-full h-auto text-[#D4D4D8]">
                        <path d="M70 56 L210 56 L210 308 L140 308 L140 168 L70 308 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        {/* 허리 */}
                        <line x1="70" y1="56" x2="210" y2="56" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                        {/* 밑위 */}
                        <line x1="140" y1="56" x2="140" y2="168" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                        {/* 힙 */}
                        <line x1="70" y1="120" x2="210" y2="120" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                        {/* 허벅지 */}
                        <line x1="70" y1="180" x2="140" y2="180" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                        {/* 총장 */}
                        <line x1="210" y1="56" x2="210" y2="308" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                      </svg>
                      {/* Labels */}
                      <span className="absolute top-[35px] left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#9C3F00]">허리</span>
                      <span className="absolute top-[100px] left-[150px] text-[11px] font-bold text-[#9C3F00]">밑위</span>
                      <span className="absolute top-[100px] left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#9C3F00]">힙</span>
                      <span className="absolute top-[165px] left-[85px] text-[11px] font-bold text-[#9C3F00]">허벅지</span>
                      <span className="absolute top-[170px] right-[55px] text-[11px] font-bold text-[#9C3F00]">총장</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. 원피스 (Dress) */}
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] font-bold text-[#9C3F00] font-sans">Category 03</span>
                  <h4 className="text-[30px] font-serif text-[#1b1d0e]">원피스 (Dress)</h4>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-16">
                  {/* Left: Measurement Guide & Table */}
                  <div className="flex-grow flex flex-col gap-10">
                    <div className="flex flex-col gap-4 py-4 border-b border-[#F4F4F5]">
                      <h5 className="text-[14px] font-bold text-[#1b1d0e] font-hei">측정 방법 안내</h5>
                      <ul className="flex flex-col gap-3 text-[14px] text-[#52525B] font-sans">
                        <li>• 총장: 뒷목 중심부터 밑단까지 수직으로 측정합니다.</li>
                        <li>• 가슴: 겨드랑이 밑 지점의 단면을 수평으로 측정합니다.</li>
                        <li>• 허리: 디자인에 따른 허리선의 단면을 수평으로 측정합니다.</li>
                        <li>• 소매: 어깨 솔기부터 소매 끝단까지 측정합니다.</li>
                      </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h5 className="text-[14px] font-bold text-[#1b1d0e] font-hei py-2 border-b border-[#F4F4F5]">표준 사이즈 가이드 (cm)</h5>
                      <table className="w-full text-sm font-sans">
                        <thead>
                          <tr className="text-black/40">
                            <th className="py-4 text-left font-normal">Size</th>
                            <th className="py-4 text-center font-normal">총장</th>
                            <th className="py-4 text-center font-normal">어깨</th>
                            <th className="py-4 text-center font-normal">가슴</th>
                            <th className="py-4 text-center font-normal">소매</th>
                            <th className="py-4 text-center font-normal">허리</th>
                          </tr>
                        </thead>
                        <tbody className="text-[#52525B]">
                          {[
                            {s:'S (Free)', a:'118', b:'38', c:'45', d:'58', e:'36'},
                            {s:'M (Free)', a:'120', b:'40', c:'47', d:'59', e:'38'}
                          ].map((r, i) => (
                            <tr key={i} className="border-t border-[#FAFAFA]">
                              <td className="py-4 font-bold text-[#1b1d0e]">{r.s}</td>
                              <td className="py-4 text-center">{r.a}</td>
                              <td className="py-4 text-center">{r.b}</td>
                              <td className="py-4 text-center">{r.c}</td>
                              <td className="py-4 text-center">{r.d}</td>
                              <td className="py-4 text-center">{r.e}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right: Visual Diagram */}
                  <div className="w-full lg:w-[576px] aspect-[4/3] bg-[#FAFAFA] rounded-[16px] flex items-center justify-center relative p-12">
                    <div className="relative w-full max-w-[280px]">
                      <svg viewBox="0 0 280 364" className="w-full h-auto text-[#D4D4D8]">
                        <path d="M56 46 L224 46 L280 120 L240 364 L40 364 L0 120 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        {/* 어깨 */}
                        <line x1="56" y1="78" x2="224" y2="78" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                        {/* 소매 */}
                        <line x1="224" y1="78" x2="280" y2="120" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                        {/* 가슴 */}
                        <line x1="70" y1="154" x2="210" y2="154" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                        {/* 총장 */}
                        <line x1="140" y1="50" x2="140" y2="336" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                        {/* 허리 */}
                        <line x1="78" y1="224" x2="201" y2="224" stroke="#9C3F00" strokeWidth="1.5" strokeDasharray="4" />
                      </svg>
                      {/* Labels */}
                      <span className="absolute top-[55px] left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#9C3F00]">어깨</span>
                      <span className="absolute top-[100px] right-[20px] text-[11px] font-bold text-[#9C3F00] rotate-45">소매</span>
                      <span className="absolute top-[135px] left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#9C3F00]">가슴</span>
                      <span className="absolute top-[170px] left-[125px] text-[11px] font-bold text-[#9C3F00]">총장</span>
                      <span className="absolute top-[205px] left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#9C3F00]">허리</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'review' && (
            <div className="flex flex-col gap-10">
              <div className="flex justify-between items-center border-b border-black/5 pb-6">
                <h3 className="text-xl font-bold font-hei text-[#1b1d0e]">
                  구매후기 <span className="text-[#9C3F00]">{reviews.length}</span>
                  {selectedUser && (
                    <span className="ml-4 text-[14px] text-black/40 font-normal">
                      '{selectedUser}'님의 리뷰 모아보기
                    </span>
                  )}
                </h3>
                <div className="flex gap-3">
                  {selectedUser && (
                    <button 
                      onClick={() => setSelectedUser(null)}
                      className="px-4 py-2 border border-black/10 text-sm font-bold rounded-lg hover:bg-[#FAFAFA] transition-all"
                    >
                      전체 리뷰 보기
                    </button>
                  )}
                </div>
              </div>

              {/* Filter & Sort Bar */}
              <div className="flex justify-between items-center bg-[#FAFAFA] rounded-xl px-8 py-4">
                <div className="flex gap-8 items-center">
                  <button 
                    onClick={() => setPhotoOnly(false)}
                    className={`text-[14px] font-hei transition-all relative py-1 ${!photoOnly ? 'text-black font-bold' : 'text-black/40 hover:text-black/60'}`}
                  >
                    전체
                    {!photoOnly && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
                  </button>
                  <button 
                    onClick={() => setPhotoOnly(true)}
                    className={`text-[14px] font-hei transition-all relative py-1 ${photoOnly ? 'text-black font-bold' : 'text-black/40 hover:text-black/60'}`}
                  >
                    포토리뷰
                    {photoOnly && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
                  </button>
                </div>
                
                <div className="flex gap-6 items-center border-l border-black/5 pl-8">
                  {[
                    { id: 'recommended', label: '추천순' },
                    { id: 'latest', label: '최신순' },
                    { id: 'rating', label: '별점순' }
                  ].map((sort) => (
                    <button
                      key={sort.id}
                      onClick={() => handleSortChange(sort.id)}
                      className={`text-[13px] font-hei transition-all ${sortBy === sort.id ? 'text-black font-bold' : 'text-black/40 hover:text-black/60'}`}
                    >
                      {sort.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-12">
                {currentReviews.length > 0 ? (
                  currentReviews.map((rev) => (
                    <div key={rev.id} className="border-b border-black/5 pb-16">
                      <div className="flex flex-col lg:flex-row gap-10">
                        {/* 1. Review Images (Left) */}
                        {rev.images.length > 0 && (
                          <div 
                            className="w-full lg:w-[320px] flex flex-col gap-3 shrink-0"
                          >
                            {/* Main Large Image */}
                            <div 
                              onClick={() => handleUserClick(rev.user)}
                              className="w-full aspect-square rounded-2xl overflow-hidden bg-[#FAFAFA] border border-black/5 cursor-pointer group/img"
                            >
                              <img 
                                src={rev.images[rev.activeIndex || 0]} 
                                alt="" 
                                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" 
                              />
                            </div>
                            {/* Sub Images (Horizontal) */}
                            {rev.images.length > 1 && (
                              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                                {rev.images.map((img, idx) => (
                                  <div 
                                    key={idx} 
                                    onClick={(e) => handleReviewImageClick(rev.id, idx, e)}
                                    className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden border cursor-pointer transition-all ${rev.activeIndex === idx ? 'border-[#9C3F00] opacity-100' : 'border-black/5 opacity-60 hover:opacity-100'}`}
                                  >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* 2. Review Content (Right) */}
                        <div className="flex flex-col gap-6 flex-grow">
                          {/* Clickable Info Area */}
                          <div 
                            onClick={() => handleUserClick(rev.user)}
                            className="flex flex-col gap-4 cursor-pointer group/text"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex flex-col gap-1">
                                <div className="flex gap-0.5 mb-1">
                                  {[...Array(5)].map((_, i) => (
                                    <ICONS.star key={i} className={`${i < rev.rating ? 'text-yellow-400' : 'text-black/10'} text-[10px]`} />
                                  ))}
                                </div>
                                <div className="flex items-center gap-2 text-[13px] font-hei">
                                  <span className="font-bold text-[#1b1d0e] group-hover/text:text-[#9C3F00] transition-colors">{rev.user}</span>
                                  <span className="text-black/30">{rev.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-[12px] text-black/40 font-hei bg-[#F5F5F5] inline-block self-start px-2 py-0.5 rounded">
                              {rev.option}
                            </div>
                            <p className="text-[16px] text-[#564338] leading-relaxed font-hei opacity-80 group-hover/text:opacity-100 transition-opacity">
                              {rev.content}
                            </p>
                          </div>
                          
                          {/* Helpful Buttons (Always Interactive) */}
                          <div className="flex gap-3 mt-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleHelpfulClick(rev.id, 'helpful');
                              }}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/5 hover:border-black/10 transition-all group/btn"
                            >
                              <ThumbsUp size={14} className="text-black/20 group-hover/btn:text-[#9C3F00] transition-colors" />
                              <span className="text-[12px] font-hei text-[#525252]">도움이 돼요</span>
                              <span className="text-[12px] font-bold font-sans text-black ml-1">{rev.helpful}</span>
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleHelpfulClick(rev.id, 'notHelpful');
                              }}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/5 hover:border-black/10 transition-all group/btn"
                            >
                              <ThumbsDown size={14} className="text-black/20 group-hover/btn:text-black/40 transition-colors" />
                              <span className="text-[12px] font-hei text-[#525252]">도움이 안 돼요</span>
                              <span className="text-[12px] font-bold font-sans text-black ml-1">{rev.notHelpful}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-24 text-center bg-[#FAFAFA] rounded-[32px] border border-dashed border-black/10">
                    <p className="text-black/40 font-hei">조건에 맞는 리뷰가 없습니다.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-black/20 hover:text-black transition-all disabled:opacity-30"
                  >
                    <ICONS.chevronLeft size={16} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${currentPage === i + 1 ? 'bg-[#9C3F00] text-white' : 'text-[#1B1D0E] hover:bg-[#FAFAFA]'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-black/20 hover:text-black transition-all disabled:opacity-30"
                  >
                    <ICONS.chevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
