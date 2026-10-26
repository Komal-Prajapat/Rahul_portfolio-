"use client";

import React, { useRef, useState, useEffect } from "react";

interface MobileSwiperProps {
  children: React.ReactNode[];
  desktopGridClass?: string;
  cardWidthMobile?: string;
  id?: string;
}

export const MobileSwiper: React.FC<MobileSwiperProps> = ({
  children,
  desktopGridClass = "",
  cardWidthMobile = "85vw",
  id = "swiper",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.children[0]?.clientWidth || container.offsetWidth * 0.85;
    const index = Math.round(scrollLeft / (itemWidth + 14));
    setActiveIndex(Math.min(Math.max(index, 0), children.length - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const slide = container.children[index] as HTMLElement;
    if (slide) {
      slide.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className="mobile-swiper-wrapper" id={id}>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={`mobile-swiper-container ${desktopGridClass}`}
      >
        {React.Children.map(children, (child, idx) => (
          <div
            className="mobile-swiper-slide"
            key={idx}
            style={{ "--mobile-card-w": cardWidthMobile } as React.CSSProperties}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Mobile Swipe Pagination Dots Indicator */}
      <div className="swiper-pagination-dots" aria-hidden="true">
        {children.map((_, idx) => (
          <button
            key={idx}
            className={`swiper-dot ${activeIndex === idx ? "active" : ""}`}
            onClick={() => scrollToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
