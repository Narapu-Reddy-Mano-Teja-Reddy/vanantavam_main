'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export interface ApertureSlide {
  id: string;
  name: string;
  location: string;
  tagline: string;
  img: string;
  badge?: string;
  category?: string;
  highlights?: string[];
  link?: string;
}

interface ApertureRevealCarouselProps {
  slides: ApertureSlide[];
  autoPlayInterval?: number; // ms, default 7000
  onSlideChange?: (index: number) => void;
  className?: string;
  height?: string; // e.g. "h-screen min-h-[640px]"
  badgeLabel?: string;
}

interface ClickOrigin {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export default function ApertureRevealCarousel({
  slides,
  autoPlayInterval = 7000,
  onSlideChange,
  className = '',
  height = 'h-screen min-h-[640px]',
  badgeLabel = 'Living Ecosystems Across Karnataka',
}: ApertureRevealCarouselProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [incomingIdx, setIncomingIdx] = useState<number | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [clickOrigin, setClickOrigin] = useState<ClickOrigin>({ x: 50, y: 50 });
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Custom Cursor Lens state
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [lensSide, setLensSide] = useState<'next' | 'prev'>('next');

  // Touch Swipe tracking
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Check reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const triggerTransition = useCallback((targetIdx: number, origin?: ClickOrigin, dir: 'next' | 'prev' = 'next') => {
    if (isRevealing || targetIdx === currentIdx) return;
    
    setDirection(dir);
    setClickOrigin(origin || { x: 50, y: 50 });
    setIncomingIdx(targetIdx);
    setIsRevealing(true);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [isRevealing, currentIdx]);

  const goToNext = useCallback((origin?: ClickOrigin) => {
    const nextIndex = (currentIdx + 1) % slides.length;
    triggerTransition(nextIndex, origin, 'next');
  }, [currentIdx, slides.length, triggerTransition]);

  const goToPrev = useCallback((origin?: ClickOrigin) => {
    const prevIndex = (currentIdx - 1 + slides.length) % slides.length;
    triggerTransition(prevIndex, origin, 'prev');
  }, [currentIdx, slides.length, triggerTransition]);

  // Handle animation complete of the aperture circle
  const handleApertureComplete = useCallback(() => {
    if (incomingIdx !== null) {
      setCurrentIdx(incomingIdx);
      if (onSlideChange) onSlideChange(incomingIdx);
    }
    setIncomingIdx(null);
    setIsRevealing(false);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [incomingIdx, onSlideChange]);

  // Autoplay ticker with smooth progress
  useEffect(() => {
    if (isPaused || isRevealing) return;

    startTimeRef.current = Date.now() - (progress / 100) * autoPlayInterval;

    const interval = 50; // update progress every 50ms
    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / autoPlayInterval) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(progressTimerRef.current!);
        goToNext({ x: 50, y: 50 });
      }
    }, interval);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPaused, isRevealing, autoPlayInterval, goToNext, progress]);

  // Keyboard navigation (ArrowLeft / ArrowRight, Space for pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToPrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Mouse move handler for custom cursor lens
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x: e.clientX, y: e.clientY });

    // Determine left or right side of slider
    if (x > rect.width / 2) {
      setLensSide('next');
    } else {
      setLensSide('prev');
    }
  };

  // Click on carousel container triggers aperture reveal from that exact point
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If the click is on an interactive element (button, link, form control), don't trigger slide change
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button') || target.closest('.no-aperture-trigger')) {
      return;
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const origin: ClickOrigin = {
      x: Math.round(clickX * 10) / 10,
      y: Math.round(clickY * 10) / 10,
    };

    if (clickX > 50) {
      goToNext(origin);
    } else {
      goToPrev(origin);
    }
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Only respond to horizontal swipes
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = ((touchEndX - rect.left) / rect.width) * 100;
      const clickY = ((touchEndY - rect.top) / rect.height) * 100;
      const origin: ClickOrigin = {
        x: Math.max(0, Math.min(100, clickX)),
        y: Math.max(0, Math.min(100, clickY)),
      };

      if (deltaX < 0) {
        goToNext(origin);
      } else {
        goToPrev(origin);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentSlide = slides[currentIdx];
  const incomingSlide = incomingIdx !== null ? slides[incomingIdx] : null;

  // Animation configuration
  const apertureDuration = prefersReducedMotion ? 0.4 : 0.95;
  const apertureEase: [number, number, number, number] = [0.22, 1, 0.36, 1]; // cubic-bezier smooth shutter opening

  return (
    <div
      ref={containerRef}
      className={`aperture-carousel-root relative w-full overflow-hidden select-none ${height} ${className}`}
      onClick={handleContainerClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovering(true);
        setIsPaused(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsPaused(false);
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isHovering ? 'none' : 'default' }}
      aria-label="Aperture Image Carousel"
      role="region"
    >
      {/* ============================================================== */}
      {/* 1. BASE SLIDE (CURRENT IMAGE UNDERNEATH)                        */}
      {/* ============================================================== */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#0A1510]">
        <img
          src={currentSlide.img}
          alt={currentSlide.name}
          className="w-full h-full object-cover scale-[1.02] transition-transform duration-[8000ms] ease-out will-change-transform"
        />
        {/* Soft, clean bottom-only gradient to keep image bright while ensuring text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)',
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* 2. INCOMING SLIDE REVEALED THROUGH CIRCULAR IRIS APERTURE      */}
      {/* ============================================================== */}
      {isRevealing && incomingSlide && (
        <motion.div
          key={`aperture-layer-${incomingSlide.id}`}
          className="absolute inset-0 w-full h-full z-10 overflow-hidden pointer-events-none"
          initial={{
            clipPath: prefersReducedMotion
              ? 'circle(100% at 50% 50%)'
              : `circle(0% at ${clickOrigin.x}% ${clickOrigin.y}%)`,
            opacity: prefersReducedMotion ? 0 : 1,
          }}
          animate={{
            clipPath: `circle(150% at ${clickOrigin.x}% ${clickOrigin.y}%)`,
            opacity: 1,
          }}
          transition={{
            duration: apertureDuration,
            ease: apertureEase,
          }}
          onAnimationComplete={handleApertureComplete}
        >
          <img
            src={incomingSlide.img}
            alt={incomingSlide.name}
            className="w-full h-full object-cover scale-[1.04] will-change-transform"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)',
            }}
          />

          {/* ============================================================== */}
          {/* HAIRLINE APERTURE RING ON THE EXPANDING EDGE                   */}
          {/* ============================================================== */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute pointer-events-none z-20 rounded-full"
              style={{
                left: `${clickOrigin.x}%`,
                top: `${clickOrigin.y}%`,
                transform: 'translate(-50%, -50%)',
                border: '1.5px solid rgba(255, 255, 255, 0.85)',
                boxShadow:
                  '0 0 0 1px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.5)',
              }}
              initial={{
                width: 0,
                height: 0,
                opacity: 1,
              }}
              animate={{
                width: '320vmax',
                height: '320vmax',
                opacity: [1, 0.9, 0],
              }}
              transition={{
                duration: apertureDuration,
                ease: apertureEase,
              }}
            />
          )}
        </motion.div>
      )}

      {/* ============================================================== */}
      {/* 3. MINIMAL CLEAN CONTENT (MATCHING REFERENCE IMAGE)             */}
      {/* Clean bottom layout: Title & location on left, counter on right */}
      {/* Elevated from screen bottom with explicit generous margins      */}
      {/* ============================================================== */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 w-full pointer-events-none"
        style={{
          paddingBottom: 'clamp(50px, 9vh, 90px)',
          paddingLeft: 'clamp(24px, 5vw, 64px)',
          paddingRight: 'clamp(24px, 5vw, 64px)',
        }}
      >
        <div
          className="w-full max-w-[1440px] mx-auto flex flex-col pointer-events-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 },
                },
                exit: {
                  opacity: 0,
                  y: -8,
                  transition: { duration: 0.18 },
                },
              }}
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '24px',
                marginBottom: '18px',
              }}
            >
              {/* Left: Project Name and clean single-line location */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                >
                  <Link
                    href={currentSlide.link || `/${currentSlide.id}`}
                    className="no-aperture-trigger group inline-block"
                  >
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                        fontWeight: 400,
                        color: '#FFFFFF',
                        lineHeight: 1.1,
                        letterSpacing: '-0.01em',
                        margin: 0,
                        textShadow: '0 3px 24px rgba(0,0,0,0.85)',
                      }}
                    >
                      {currentSlide.name}
                    </h2>
                  </Link>
                </motion.div>

                {currentSlide.location && (
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                    }}
                    style={{
                      fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontWeight: 300,
                      letterSpacing: '0.04em',
                      margin: 0,
                      textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                    }}
                  >
                    {currentSlide.location}
                  </motion.p>
                )}
              </div>

              {/* Right: Slide Counter (e.g. 02 — 06) */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.35 } },
                }}
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontFamily: 'monospace, ui-monospace, SFMono-Regular, Menlo, Monaco',
                  fontSize: 'clamp(0.85rem, 1.2vw, 1.15rem)',
                  letterSpacing: '0.14em',
                  paddingBottom: '4px',
                  userSelect: 'none',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                0{currentIdx + 1} <span style={{ color: 'rgba(255, 255, 255, 0.4)', margin: '0 6px' }}>—</span> 0{slides.length}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Clean Thin Hairline Progress Line */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '1.5px',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '9999px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                backgroundColor: '#FFFFFF',
                borderRadius: '9999px',
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                width: `${progress}%`,
                transition: isRevealing ? 'none' : 'width 50ms linear',
              }}
            />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. CLEAN MINIMAL CURSOR LENS (DESKTOP ONLY, NO FANCY ROTATIONS) */}
      {/* ============================================================== */}
      {isHovering && !prefersReducedMotion && (
        <motion.div
          className="hidden md:flex pointer-events-none fixed z-50 rounded-full items-center justify-center -translate-x-1/2 -translate-y-1/2"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            width: 70,
            height: 70,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        >
          {/* Glass Lens body */}
          <div className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-md border border-white/30 shadow-[0_8px_24px_rgba(0,0,0,0.4)]" />

          {/* Clean subtle ring */}
          <div className="absolute inset-1 rounded-full border border-white/20" />

          {/* Direction indicator */}
          <div className="relative z-10 flex items-center justify-center text-white">
            {lensSide === 'next' ? (
              <ChevronRight className="w-5 h-5 text-white" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-white" />
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
