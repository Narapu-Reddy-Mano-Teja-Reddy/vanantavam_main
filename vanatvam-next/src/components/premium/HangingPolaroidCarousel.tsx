'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface HangingPolaroidItem {
  id: string | number;
  img: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  caption?: string;
}

interface HangingPolaroidCarouselProps {
  items: HangingPolaroidItem[];
  autoSpeed?: number; // pixels per second (default 36)
  autoPlayInterval?: number; // optional alias
  className?: string;
  theme?: 'dark' | 'light';
  sectionBadge?: string;
  sectionTitle?: string;
}

export default function HangingPolaroidCarousel({
  items,
  autoSpeed = 34,
  className = '',
  theme = 'dark',
}: HangingPolaroidCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Responsive container width and mobile detection
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setContainerWidth(w);
        setIsMobile(w < 640);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Check reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  // Responsive Dimensions
  const cardWidth = isMobile ? 180 : 250;
  const cardSpacing = isMobile ? 215 : 295;
  const singleLoopWidth = items.length * cardSpacing;

  // String Curvature Coordinates (exact shared coordinate system)
  const stringBaseY = isMobile ? 24 : 32; // Y position at screen edges
  const sagDepth = isMobile ? 28 : 50; // Central sag dip

  // Quadruple items for seamless infinite looping
  const loopedItems = useMemo(() => {
    return [...items, ...items, ...items, ...items];
  }, [items]);

  // Track position
  const xOffset = useMotionValue(0);
  const swingAngle = useSpring(0, { stiffness: 100, damping: 11, mass: 0.6 });

  // Animation frame loop for continuous silky-smooth auto-moving
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let animId: number;

    const animate = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!isDragging && !prefersReducedMotion) {
        const speed = isHovered ? autoSpeed * 0.3 : autoSpeed;
        let currentX = xOffset.get() - speed * delta;

        // Wrap around loop bounds seamlessly
        if (currentX <= -singleLoopWidth * 2) {
          currentX += singleLoopWidth;
        } else if (currentX >= 0) {
          currentX -= singleLoopWidth;
        }

        xOffset.set(currentX);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isDragging, isHovered, autoSpeed, singleLoopWidth, prefersReducedMotion, xOffset]);

  // Drag handlers with momentum swing
  const lastDragPos = useRef<number>(0);
  const lastDragTime = useRef<number>(0);

  const handleDragStart = (_: any, info: { point: { x: number } }) => {
    setIsDragging(true);
    lastDragPos.current = info.point.x;
    lastDragTime.current = Date.now();
  };

  const handleDrag = (_: any, info: { point: { x: number } }) => {
    const now = Date.now();
    const dt = Math.max(1, now - lastDragTime.current);
    const dx = info.point.x - lastDragPos.current;
    lastDragPos.current = info.point.x;
    lastDragTime.current = now;

    if (!prefersReducedMotion) {
      const v = (dx / dt) * 1000;
      const angle = Math.max(-18, Math.min(18, -v * 0.014));
      swingAngle.set(angle);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    swingAngle.set(0);

    let currentX = xOffset.get();
    if (currentX <= -singleLoopWidth * 2) {
      currentX += singleLoopWidth;
      xOffset.set(currentX);
    } else if (currentX >= 0) {
      currentX -= singleLoopWidth;
      xOffset.set(currentX);
    }
  };

  // Catenary String SVG path matching exact math
  const curvePath = useMemo(() => {
    const w = containerWidth || 1200;
    // Quadratic bezier dipping to stringBaseY + sagDepth at container center
    return `M -40 ${stringBaseY} Q ${w / 2} ${stringBaseY + sagDepth * 2} ${w + 40} ${stringBaseY}`;
  }, [containerWidth, stringBaseY, sagDepth]);

  const isDark = theme === 'dark';

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none ${
        isMobile ? 'h-[290px] py-4' : 'h-[380px] sm:h-[410px] py-6'
      } ${isDark ? 'bg-[#080B09]' : 'bg-[#FAF8F5]'} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Hanging polaroid carousel"
    >
      {/* ============================================================== */}
      {/* 1. TAUT SAGGING THREAD SVG (PASSES THROUGH CLIP NOTCHES)       */}
      {/* ============================================================== */}
      <div className="absolute top-0 left-0 right-0 w-full pointer-events-none z-10 overflow-visible">
        <svg
          viewBox={`0 0 ${containerWidth || 1200} ${stringBaseY + sagDepth + 15}`}
          className="w-full overflow-visible"
          style={{ height: `${stringBaseY + sagDepth + 15}px` }}
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="threadShadow" x="-10%" y="-10%" width="120%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.8" floodColor="#000000" floodOpacity="0.6" />
            </filter>
          </defs>
          <path
            d={curvePath}
            fill="none"
            stroke={isDark ? '#C7B599' : '#8A7A64'}
            strokeWidth={isMobile ? '2.0' : '2.4'}
            strokeLinecap="round"
            filter="url(#threadShadow)"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* 2. DRAGGABLE & CONTINUOUSLY ROTATING CAROUSEL TRACK            */}
      {/* ============================================================== */}
      <div className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing">
        <motion.div
          className="flex absolute top-0 left-0 will-change-transform h-full"
          drag="x"
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ x: xOffset }}
        >
          {loopedItems.map((item, index) => (
            <ClampedPolaroid
              key={`${item.id}-${index}`}
              item={item}
              index={index}
              cardWidth={cardWidth}
              cardSpacing={cardSpacing}
              xOffset={xOffset}
              containerWidth={containerWidth}
              stringBaseY={stringBaseY}
              sagDepth={sagDepth}
              swingAngle={swingAngle}
              prefersReducedMotion={prefersReducedMotion}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// INDIVIDUAL POLAROID CLAMPED VIA WOODEN PEG TO THE THREAD
// --------------------------------------------------------------------------
interface ClampedPolaroidProps {
  item: HangingPolaroidItem;
  index: number;
  cardWidth: number;
  cardSpacing: number;
  xOffset: any;
  containerWidth: number;
  stringBaseY: number;
  sagDepth: number;
  swingAngle: any;
  prefersReducedMotion: boolean;
  isMobile: boolean;
}

function ClampedPolaroid({
  item,
  index,
  cardWidth,
  cardSpacing,
  xOffset,
  containerWidth,
  stringBaseY,
  sagDepth,
  swingAngle,
  prefersReducedMotion,
  isMobile,
}: ClampedPolaroidProps) {
  // Base resting tilt angle for organic variety
  const restingAngles = [-2.2, 1.6, -1.0, 2.0, -1.6, 1.2, -2.0, 1.4];
  const baseTilt = restingAngles[index % restingAngles.length];

  // Dynamic Y offset and String Tangent Rotation following the curvature of the thread
  const [threadY, setThreadY] = useState(stringBaseY);
  const [stringAngle, setStringAngle] = useState(0);

  useEffect(() => {
    const unsubscribe = xOffset.on('change', (currentX: number) => {
      const cardCenterScreenX = currentX + index * cardSpacing + cardWidth / 2;
      const w = containerWidth || 1200;

      // Normalized horizontal coordinate along viewport (0 to 1)
      const t = Math.max(0, Math.min(1, cardCenterScreenX / w));

      // Exact Y on the quadratic bezier curve:
      // Y(t) = stringBaseY + 4 * sagDepth * t * (1 - t)
      const yOnCurve = stringBaseY + 4 * sagDepth * t * (1 - t);
      setThreadY(yOnCurve);

      // Tangent slope of the string at t: dY/dt = 4 * sagDepth * (1 - 2*t)
      // dY/dx = (dY/dt) / w
      const slope = (4 * sagDepth * (1 - 2 * t)) / w;
      const tangentDeg = Math.atan(slope) * (180 / Math.PI);
      setStringAngle(tangentDeg);
    });

    return () => unsubscribe();
  }, [xOffset, index, cardSpacing, cardWidth, containerWidth, stringBaseY, sagDepth]);

  // Combine dynamic velocity pendulum swing with string angle and resting tilt
  const combinedRotation = useTransform(swingAngle, (s: number) => {
    if (prefersReducedMotion) return 0;
    return s + baseTilt + stringAngle * 0.35;
  });

  // Peg dimensions
  const pegHeight = isMobile ? 28 : 34;
  const pegWidth = isMobile ? 11 : 14;
  const pegNotchFromTop = isMobile ? 10 : 12; // Distance from peg top to thread notch

  // Placement:
  // The peg notch is at threadY.
  // Therefore the top of the peg is at (threadY - pegNotchFromTop).
  // The frame starts inside the peg jaws at (threadY + 6px).
  // The photo inside the frame starts at (threadY + 18px), strictly below the thread!
  const pegTopY = threadY - pegNotchFromTop;

  return (
    <div
      className="absolute flex flex-col items-center flex-shrink-0"
      style={{
        left: index * cardSpacing,
        width: cardWidth,
        top: `${pegTopY}px`,
        transformOrigin: '50% 12px',
      }}
    >
      <motion.div
        className="flex flex-col items-center w-full"
        style={{
          transformOrigin: `50% ${pegNotchFromTop}px`, // Swings around the thread notch!
          rotate: combinedRotation,
        }}
        whileHover={{
          scale: 1.04,
          transition: { duration: 0.25 },
        }}
      >
        {/* ============================================================ */}
        {/* WOODEN CLOTHESPIN PEG (Z-INDEX 20: CLIPS IN FRONT OF THREAD)  */}
        {/* ============================================================ */}
        <div
          className="relative z-20 rounded-[2px] shadow-[0_4px_10px_rgba(0,0,0,0.65)]"
          style={{
            width: `${pegWidth}px`,
            height: `${pegHeight}px`,
            background: 'linear-gradient(180deg, #E6D2B5 0%, #D8BE9A 40%, #B89970 85%, #8B6B43 100%)',
            border: '1px solid rgba(80, 50, 20, 0.4)',
            marginBottom: isMobile ? '-10px' : '-14px', // Clamps over the top white margin of the frame
          }}
        >
          {/* Metallic spring band */}
          <div
            className="absolute rounded-[1px]"
            style={{
              top: `${pegNotchFromTop}px`,
              left: '-1.5px',
              right: '-1.5px',
              height: isMobile ? '3.5px' : '4.5px',
              background: 'linear-gradient(90deg, #888 0%, #FFF 50%, #555 100%)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.6)',
            }}
          />
          {/* Center groove */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-[#9D7D54]/70 rounded-full"
            style={{
              top: '2px',
              height: isMobile ? '6px' : '8px',
            }}
          />
        </div>

        {/* ============================================================ */}
        {/* PURE POLAROID PHOTO FRAME (Z-INDEX 5: BELOW THE THREAD)      */}
        {/* ============================================================ */}
        <div
          className="rounded-[3px] shadow-[0_16px_36px_rgba(0,0,0,0.6),0_2px_8px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_24px_48px_rgba(0,0,0,0.85)]"
          style={{
            width: `${cardWidth}px`,
            padding: isMobile ? '8px 8px 22px 8px' : '11px 11px 28px 11px',
            backgroundColor: '#FAF8F5',
            border: '1px solid rgba(0,0,0,0.06)',
            zIndex: 5,
          }}
        >
          {/* Photo cutout: Standard camera aspect ratio, zero black bars, fills frame */}
          <div
            className="relative w-full overflow-hidden rounded-[1px]"
            style={{
              aspectRatio: '4 / 3', // Natural landscape photo ratio
              backgroundColor: '#FAF8F5',
            }}
          >
            <img
              src={item.img}
              alt={item.alt || 'Vanatvam moment'}
              className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-500 ease-out hover:scale-104 block"
            />
            {/* Photographic gloss reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
