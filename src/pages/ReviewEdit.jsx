import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import { Star, Camera, X, ChevronLeft } from 'lucide-react';

export default function ReviewEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reviews, updateReview } = useUser();
  
  // ID에 맞는 리뷰 찾기
  const targetReview = reviews.find(r => r.id === id);

  const [rating, setRating] = useState(targetReview?.rating || 5);
  const [content, setContent] = useState(targetReview?.content || '');
  const [images, setImages] = useState(targetReview?.images || []);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    if (targetReview) {
      setRating(targetReview.rating);
      setContent(targetReview.content);
      setImages(targetReview.images);
    }
  }, [targetReview]);

  if (!targetReview) {
    return (
      <Layout>
        <div className="py-32 text-center">
          <p>리뷰를 찾을 수 없습니다.</p>
          <button onClick={() => navigate('/my-reviews')}>목록으로 돌아가기</button>
        </div>
      </Layout>
    );
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert('사진은 최대 5장까지 첨부할 수 있습니다.');
      return;
    }

    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 전역 상태 업데이트
    updateReview(id, {
      rating,
      content,
      images
    });

    alert('리뷰가 수정되었습니다.');
    navigate('/my-reviews');
  };

  const removeImage = (index) => {
    const imageToRemove = images[index];
    if (imageToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove);
    }
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <div className="max-w-[800px] mx-auto px-4 py-12 md:py-20">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-black/40 hover:text-black transition-colors mb-10 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[14px] font-bold font-hei">뒤로가기</span>
        </button>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] font-bold text-[#1b1d0e] font-hei">리뷰 수정하기</h1>
            <p className="text-[14px] text-black/40 font-hei">구매하신 상품에 대한 소중한 후기를 수정해주세요.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-12">
            {/* Product Info Summary */}
            <div className="flex items-center gap-6 p-6 bg-[#FAFAFA] rounded-2xl border border-black/5">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-black/5 shrink-0">
                <img src={targetReview.productImage} alt={targetReview.productName} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[16px] font-bold text-black font-hei leading-tight">{targetReview.productName}</h4>
                <span className="text-[13px] text-black/40 font-sans">{targetReview.options}</span>
              </div>
            </div>

            {/* Rating Selection */}
            <div className="flex flex-col gap-4">
              <span className="text-[14px] font-bold text-black font-hei">상품은 만족하셨나요?</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star 
                      size={32} 
                      className={num <= rating ? 'fill-[#9C3F00] text-[#9C3F00]' : 'text-black/10'} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Input */}
            <div className="flex flex-col gap-4">
              <span className="text-[14px] font-bold text-black font-hei">리뷰 내용</span>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력해주세요 (최소 10자 이상)"
                className="w-full h-40 p-6 bg-[#FAFAFA] border border-black/5 rounded-2xl text-[15px] font-hei focus:outline-none focus:border-[#9C3F00]/30 transition-colors resize-none"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-4">
              <span className="text-[14px] font-bold text-black font-hei">사진 첨부 (최대 5장)</span>
              <div className="flex flex-wrap gap-4">
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
                    onClick={triggerFileInput}
                    className="w-24 h-24 rounded-2xl bg-[#FAFAFA] border border-dashed border-black/10 flex flex-col items-center justify-center gap-2 text-black/20 hover:text-[#9C3F00] hover:border-[#9C3F00]/30 transition-all"
                  >
                    <Camera size={24} />
                    <span className="text-[11px] font-bold font-hei">사진 추가</span>
                  </button>
                )}
                
                {images.map((img, idx) => (
                  <div key={idx} className="w-24 h-24 rounded-2xl overflow-hidden relative group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-8">
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 h-16 rounded-full border border-black/10 text-[16px] font-bold font-hei hover:bg-[#FAFAFA] transition-all"
              >
                취소
              </button>
              <button 
                type="submit"
                className="flex-[2] h-16 rounded-full bg-[#1b1d0e] text-white text-[16px] font-bold font-hei hover:bg-black transition-all shadow-lg shadow-black/10"
              >
                수정 완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
