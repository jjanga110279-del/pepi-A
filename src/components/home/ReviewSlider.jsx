import React from 'react';
import { Link } from 'react-router';
import { IMAGES } from '../../constants/images';
import { ICONS } from '../../constants/icons';

const reviews = [
  {
    id: 1,
    title: "핏이 너무 예뻐요!",
    content: "생각했던 것보다 소재도 탄탄하고 색감도 너무 고급스러워요. 데일리로 입기 딱 좋습니다.",
    image: IMAGES.reviewer1,
    stars: 5
  },
  {
    id: 2,
    title: "재구매 의사 100%",
    content: "배송도 빠르고 포장도 정성스러워서 감동받았어요. 옷 퀄리티는 말할 것도 없네요.",
    image: IMAGES.reviewer2,
    stars: 5
  },
  {
    id: 3,
    title: "인생 셔츠를 만났어요",
    content: "리넨 소재인데도 까슬거림 전혀 없고 핏이 예술입니다. 다른 색상도 구매할 예정이에요.",
    image: IMAGES.bestItem1,
    stars: 5
  },
  {
    id: 4,
    title: "고민은 배송만 늦출 뿐",
    content: "디자인이 너무 세련되어서 어디에나 잘 어울려요. 친구들이 다 어디서 샀냐고 물어보네요.",
    image: IMAGES.bestItem2,
    stars: 5
  },
  {
    id: 5,
    title: "가성비 최고입니다",
    content: "이 가격에 이런 퀄리티라니 믿기지 않아요. 마감 처리도 깔끔하고 아주 만족스럽습니다.",
    image: IMAGES.newJacket,
    stars: 5
  }
];

// For seamless infinite scroll
const scrollReviews = [...reviews, ...reviews];

export default function ReviewSlider() {
  return (
    <section className="bg-[#f8f8f8] py-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 mb-16 text-center">
        <h2 className="text-4xl font-serif mb-2">Best Reviews</h2>
        <p className="text-sm text-black/60 font-hei">고객님들이 전하는 생생한 착용 후기</p>
      </div>

      <div className="relative flex">
        <div className="flex gap-8 animate-infinite-scroll hover:[animation-play-state:paused]">
          {scrollReviews.map((review, index) => (
            <Link 
              to="/" 
              key={`${review.id}-${index}`} 
              className="min-w-[400px] bg-white p-6 rounded-2xl flex gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0">
                <img src={review.image} alt="reviewer" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(review.stars)].map((_, i) => (
                    <ICONS.star key={i} className="text-yellow-400 text-[10px]" />
                  ))}
                </div>
                <h4 className="text-sm font-bold mb-1 font-hei">{review.title}</h4>
                <p className="text-xs text-black/70 leading-relaxed font-hei">{review.content}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
