"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { IconChevronLeft, IconChevronRight } from "./Icons";

interface CardSwiperProps {
  children: React.ReactNode[];
  id?: string;
  className?: string;
  cardWidthMobile?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export const CardSwiper: React.FC<CardSwiperProps> = ({
  children,
  id = "card-swiper",
  className = "",
  cardWidthMobile = "82vw",
  autoplay = false,
  autoplayInterval = 3500,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartLeft, setScrollStartLeft] = useState(0);

  const totalItems = React.Children.count(children);

  const updateScrollState = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    
    // Generous threshold to prevent edge rounding issues
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);

    // Calculate active slide index
    const firstChild = containerRef.current.children[0] as HTMLElement;
    if (firstChild) {
      const itemWidth = firstChild.offsetWidth + 18; // width + gap
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(Math.max(index, 0), totalItems - 1));
    }
  }, [totalItems]);

  useEffect(() => {
    // Reset scroll position to beginning whenever items change
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
    setActiveIndex(0);
    updateScrollState();

    const handleResize = () => updateScrollState();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateScrollState, totalItems]);

  // Scroll by 1 or more card widths
  const scrollStep = useCallback((direction: "left" | "right") => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const firstChild = container.children[0] as HTMLElement;
    const scrollAmount = firstChild ? (firstChild.offsetWidth + 18) * 1.2 : container.clientWidth * 0.75;

    // Loop back to start if at the end during auto-advance
    if (direction === "right" && container.scrollLeft >= container.scrollWidth - container.clientWidth - 16) {
      container.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

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

  // Autoplay timer with pause on hover/drag
  useEffect(() => {
    if (!autoplay || isHovered || isDragging || totalItems <= 1) return;

    const timer = setInterval(() => {
      scrollStep("right");
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [autoplay, autoplayInterval, isHovered, isDragging, totalItems, scrollStep]);

  // Mouse Drag to Scroll handlers (for desktop click & drag feel)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollStartLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollStartLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div
      className={`responsive-card-swiper ${className}`}
      id={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Top Header Controls (Counter & Arrows) */}
      <div className="swiper-header-controls">
        <div className="swiper-item-counter">
          <span>Showing</span>
          <span className="counter-active">{Math.min(activeIndex + 1, totalItems)}</span>
          <span>of {totalItems}</span>
          {autoplay && <span className="auto-pulse-indicator" title="Autoplay Active" />}
        </div>

        <div className="swiper-arrow-controls">
          <button
            type="button"
            className="swiper-arrow-btn swiper-arrow-prev"
            onClick={() => scrollStep("left")}
            disabled={!canScrollLeft}
            aria-label="Previous slide"
          >
            <IconChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="swiper-arrow-btn swiper-arrow-next"
            onClick={() => scrollStep("right")}
            disabled={!canScrollRight}
            aria-label="Next slide"
          >
            <IconChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Main Track Container */}
      <div
        ref={containerRef}
        onScroll={updateScrollState}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`swiper-track-container ${isDragging ? "is-dragging" : ""}`}
      >
        {React.Children.map(children, (child, idx) => (
          <div
            className="swiper-slide-item"
            key={idx}
            style={{ "--mobile-card-w": cardWidthMobile } as React.CSSProperties}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Pagination Dots (Interactive on both Desktop & Mobile) */}
      <div className="swiper-dots-nav" aria-label="Slide navigation">
        {Array.from({ length: totalItems }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`swiper-dot-indicator ${activeIndex === idx ? "active" : ""}`}
            onClick={() => scrollToSlide(idx)}
            aria-label={`Jump to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
