import React, { useState, useEffect } from 'react';
import { IMAGES } from '../../constants/images';

const slides = [
  { id: 1, image: IMAGES.hero1, title: "The Soft 늘:pepi-i", subtitle: "24 Autumn Collection" },
  { id: 2, image: IMAGES.hero2, title: "Modern Classic", subtitle: "Essential Pieces" },
  { id: 3, image: IMAGES.hero3, title: "Linen Mood", subtitle: "Summer to Autumn" },
  { id: 4, image: IMAGES.hero4, title: "Urban Silhouette", subtitle: "Daily Wear" },
  { id: 5, image: IMAGES.hero5, title: "Nature's Palette", subtitle: "Premium Fabric" },
  { id: 6, image: IMAGES.hero6, title: "Timeless Elegance", subtitle: "Signature Line" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // 5초마다 슬라이드 전환
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] min-h-[400px] md:min-h-[600px] overflow-hidden group">
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-1000 ease-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 md:px-6 text-center">
              <span className="text-[11px] md:text-[14px] tracking-[3px] md:tracking-[4.2px] uppercase mb-3 md:mb-4 opacity-80 animate-fadeInUp">
                {slide.subtitle}
              </span>
              <h2 className="text-4xl md:text-8xl font-serif font-bold mb-6 md:mb-8 drop-shadow-lg animate-fadeInUp delay-100">
                {slide.title}
              </h2>
              <button className="px-7 py-3 md:px-10 md:py-4 border border-white/30 bg-white/20 backdrop-blur-md rounded-full text-[10px] md:text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all animate-fadeInUp delay-200 font-hei">
                Explore Collection
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Navigation Arrows - Hidden on mobile */}
      <button 
        onClick={() => setCurrent(current === 0 ? slides.length - 1 : current - 1)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white opacity-0 md:group-hover:opacity-100 transition-opacity hidden md:block"
      >
        <span className="text-3xl md:text-4xl font-light">‹</span>
      </button>
      <button 
        onClick={() => setCurrent(current === slides.length - 1 ? 0 : current + 1)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white opacity-0 md:group-hover:opacity-100 transition-opacity hidden md:block"
      >
        <span className="text-3xl md:text-4xl font-light">›</span>
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-[2px] transition-all duration-500 ${i === current ? 'w-8 md:w-12 bg-white' : 'w-5 md:w-8 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
}
