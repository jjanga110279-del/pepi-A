import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import { Star, Camera, X, Check, ChevronLeft } from 'lucide-react';

export default function ReviewWrite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { orders, addReview } = useUser();

  // Find product from orders if not in state
  const findProductInOrders = (productId) => {
    for (const order of orders) {
      const item = order.items.find(i => i.id === productId);
      if (item) return item;
    }
    return null;
  };

  const productInfo = location.state?.product || findProductInOrders(id) || {
    id: id,
    name: '아티산 리넨 드레이프 코트',
    color: '웜 오트',
    option: 'Medium',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop'
  };

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [attributes, setAttributes] = useState({
    size: '',
    quality: '',
    delivery: ''
  });

  const fileInputRef = React.useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert('사진은 최대 5장까지 첨부할 수 있습니다.');
      return;
    }
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const imageToRemove = images[index];
    if (imageToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove);
    }
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleAttribute = (key, value) => {
    setAttributes(prev => ({
      ...prev,
      [key]: prev[key] === value ? '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('만족도 평가를 선택해주세요.');
      return;
    }
    if (content.length < 10) {
      alert('리뷰 내용을 10자 이상 입력해주세요.');
      return;
    }

    // Save review to global state
    addReview({
      id: Date.now().toString(),
      productName: productInfo.name,
      productImage: productInfo.image,
      rating,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, ''),
      content,
      options: `${productInfo.color} / ${productInfo.size || productInfo.option}`,
      images
    });

    alert('리뷰가 성공적으로 등록되었습니다.');
    navigate('/my-reviews');
  };

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-12 md:py-32">
        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-16 md:mb-32">
          <div className="flex flex-col gap-2">
            <h1 className="text-[36px] font-black text-[#1B1D0E] font-hei leading-tight">리뷰 작성하기</h1>
            <p className="text-[14px] text-[#9CA3AF] font-hei">구매하신 상품의 소중한 경험을 들려주세요.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 md:gap-32">
          {/* Left: Product Information */}
          <aside className="w-full lg:w-[352px] shrink-0">
            <div className="border border-[#F3F4F6] rounded-[16px] p-6 flex flex-col gap-6 sticky top-32">
              <div className="aspect-[3/4] rounded-[48px] overflow-hidden bg-[#F9FAFB]">
                <img src={productInfo.image} alt={productInfo.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider font-hei">구매 확정 상품</span>
                <h2 className="text-[20px] font-bold text-[#1B1D0E] font-hei leading-tight">{productInfo.name}</h2>
                <div className="flex gap-2 flex-wrap mt-1">
                  <span className="px-4 py-1.5 bg-[#F9FAFB] border border-[#F3F4F6] rounded-full text-[12px] text-[#6B7280] font-hei">색상: {productInfo.color}</span>
                  <span className="px-4 py-1.5 bg-[#F9FAFB] border border-[#F3F4F6] rounded-full text-[12px] text-[#6B7280] font-sans">사이즈: {productInfo.size || productInfo.option}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right: Review Form */}
          <form onSubmit={handleSubmit} className="flex-grow flex flex-col gap-12">
            {/* 1. Star Rating */}
            <div className="flex flex-col gap-6 pb-10 border-b border-[#F3F4F6]">
              <label className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wider font-hei">만족도 평가</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star 
                      size={30} 
                      className={`${star <= (hover || rating) ? 'fill-[#9C3F00] text-[#9C3F00]' : 'text-black/10'} transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Detailed Review */}
            <div className="flex flex-col gap-6 pb-10 border-b border-[#F3F4F6]">
              <label className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wider font-hei">상세 리뷰</label>
              <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-[48px] p-8 md:p-10">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="피부에 닿는 느낌은 어떤가요? 핏이나 착용했던 순간들에 대해 들려주세요."
                  className="w-full h-48 bg-transparent text-[16px] text-[#1B1D0E] font-hei focus:outline-none resize-none placeholder:text-[#D1D5DB]"
                  required
                />
              </div>
            </div>

            {/* 3. Photo Upload */}
            <div className="flex flex-col gap-6 pb-10 border-b border-[#F3F4F6]">
              <label className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wider font-hei">사진 첨부 (최대 5장)</label>
              <div className="flex gap-4 flex-wrap">
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden" 
                />
                
                {images.length < 5 && (
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-[180px] h-[168px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[48px] flex flex-col items-center justify-center gap-3 text-[#9CA3AF] hover:text-[#9C3F00] hover:border-[#9C3F00]/20 transition-all"
                  >
                    <Camera size={32} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold font-hei uppercase">이미지 추가</span>
                  </button>
                )}

                {images.map((img, idx) => (
                  <div key={idx} className="w-[180px] h-[180px] rounded-[48px] overflow-hidden relative border border-[#F3F4F6] group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-4 right-4 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Attributes */}
            <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-[16px] p-8 md:p-10 flex flex-col gap-8">
              <label className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wider font-hei">추가 정보</label>
              <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                {/* Size Fitting */}
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-bold text-black uppercase tracking-widest font-hei">사이즈 피팅</span>
                  <div className="flex flex-col gap-4">
                    {['정사이즈에요', '생각보다 작아요', '생각보다 커요'].map((val) => (
                      <label key={val} className="flex items-center gap-3 cursor-pointer group">
                        <div 
                          onClick={() => toggleAttribute('size', val)}
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${attributes.size === val ? 'bg-[#9C3F00] border-[#9C3F00]' : 'bg-white border-[#E5E7EB] group-hover:border-black/20'}`}
                        >
                          {attributes.size === val && <Check size={12} className="text-white" />}
                        </div>
                        <span className="text-[14px] text-[#4B5563] font-hei">{val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Quality */}
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-bold text-black uppercase tracking-widest font-hei">품질 만족도</span>
                  <div className="flex flex-col gap-4">
                    {['소재가 우수해요', '마감이 깔끔해요', '색감이 예뻐요'].map((val) => (
                      <label key={val} className="flex items-center gap-3 cursor-pointer group">
                        <div 
                          onClick={() => toggleAttribute('quality', val)}
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${attributes.quality === val ? 'bg-[#9C3F00] border-[#9C3F00]' : 'bg-white border-[#E5E7EB] group-hover:border-black/20'}`}
                        >
                          {attributes.quality === val && <Check size={12} className="text-white" />}
                        </div>
                        <span className="text-[14px] text-[#4B5563] font-hei">{val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Delivery */}
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-bold text-black uppercase tracking-widest font-hei">배송 서비스</span>
                  <div className="flex flex-col gap-4">
                    {['배송이 빨라요', '포장이 정성스러워요'].map((val) => (
                      <label key={val} className="flex items-center gap-3 cursor-pointer group">
                        <div 
                          onClick={() => toggleAttribute('delivery', val)}
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${attributes.delivery === val ? 'bg-[#9C3F00] border-[#9C3F00]' : 'bg-white border-[#E5E7EB] group-hover:border-black/20'}`}
                        >
                          {attributes.delivery === val && <Check size={12} className="text-white" />}
                        </div>
                        <span className="text-[14px] text-[#4B5563] font-hei">{val}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mt-12">
              <p className="text-[12px] text-[#9CA3AF] font-hei max-w-[440px]">
                리뷰를 게시함으로써 커뮤니티 가이드라인 및 개인정보 처리방침에 동의하게 됩니다.
              </p>
              <button
                type="submit"
                className="w-full md:w-[215px] h-[66px] bg-white border border-[#9C3F00] text-[#9C3F00] rounded-full text-[16px] font-bold font-hei hover:bg-[#9C3F00]/5 transition-all active:translate-y-0.5"
              >
                리뷰 게시하기
              </button>            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
