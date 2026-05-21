import React, { useState, useEffect } from 'react';
import { ICONS } from '../../constants/icons';
import { IMAGES } from '../../constants/images';

export default function MainPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 팝업 닫힘 기록 확인 (세션 단위로 변경하여 재방문 시 다시 표시되도록 함)
    const isPopupClosed = sessionStorage.getItem('hasClosedMainPopup');
    
    if (!isPopupClosed) {
      // 약간의 지연 후 팝업 표시
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    // 팝업을 닫았음을 기록 (현재 세션 동안만 다시 뜨지 않게)
    sessionStorage.setItem('hasClosedMainPopup', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-5 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-[540px] bg-white rounded-[32px] overflow-hidden shadow-2xl animate-modal-in mx-auto">
        {/* 닫기 아이콘 */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 rounded-full hover:bg-white shadow-sm transition-all active:scale-95 md:top-5 md:right-5"
          aria-label="Close"
        >
          <ICONS.close className="text-xl text-gray-700" />
        </button>

        {/* 컨텐츠 영역 */}
        <div className="flex flex-col md:flex-row h-full">
          {/* 이미지 섹션: 모바일에서는 상단, 데스크톱에서는 왼쪽 */}
          <div className="md:w-[42%] h-[200px] md:h-auto overflow-hidden">
            <img 
              src={IMAGES.hero1} 
              alt="Promotion" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* 텍스트 섹션 */}
          <div className="md:w-[58%] p-7 md:p-8 flex flex-col justify-center bg-white text-left">
            <h2 className="text-xl md:text-2xl font-logo font-black italic mb-2 text-gray-900">늘:pepi-i</h2>
            <div className="space-y-4">
              <div>
                <p className="text-[#dc2626] font-bold text-[14px] md:text-base mb-1">[이커머스 기능 검증 공간]</p>
                <p className="text-gray-700 font-medium text-[13px] md:text-[15px] leading-snug">
                  백엔드 없이 프론트엔드 로직만으로<br className="hidden md:block" />
                  실제 서비스와 동일하게 작동합니다.
                </p>
              </div>

              <div className="bg-gray-50 p-4 md:p-5 rounded-2xl space-y-2">
                <p className="text-gray-900 font-bold text-[13px] md:text-sm flex items-center gap-2">
                  <span className="text-base md:text-lg">💡</span> 직접 체험해보세요!
                </p>
                <ul className="text-gray-600 text-[12px] md:text-[13px] space-y-1.5 leading-tight">
                  <li className="flex gap-2">
                    <span className="text-[#dc2626]">•</span>
                    <span><strong>개인화</strong>: 로그인/로그아웃 프로필 전환</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#dc2626]">•</span>
                    <span><strong>쇼핑</strong>: 검색 및 자동 포인트 차감</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#dc2626]">•</span>
                    <span><strong>상세 기능</strong>: 장바구니, 찜, 리뷰 인터랙션</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#dc2626]">•</span>
                    <span><strong>최적화</strong>: 반응형 UI 및 실시간 상담</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-center pt-1 md:pt-2">
                <button 
                  onClick={handleClose}
                  className="transition-transform active:scale-90 hover:opacity-80"
                  aria-label="Close"
                >
                  <ICONS.recommend className="text-2xl md:text-3xl text-[#dc2626] animate-bounce" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
