"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue, Variants } from "framer-motion";

type ProjectItem = {
  id: string;
  name: string;
  img: string;
};

type TunnelCardData = {
  item: ProjectItem;
  index: number;
  angle: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
};

type TunnelCardProps = {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  total: number;
  width: number;
  height: number;
  isMobile: boolean;
  reduceMotion: boolean;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const RING_COUNT = 4;
const TITLE_LINE_ONE = ["A", "Journey"];
const TITLE_LINE_TWO = ["Through", "Nature"];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

const DUST = Array.from({ length: 28 }, (_, i) => {
  const random = (seed: number) => {
    const value = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
    return value - Math.floor(value);
  };

  return {
    left: `${(random(1) * 100).toFixed(2)}%`,
    top: `${(random(2) * 100).toFixed(2)}%`,
    size: `${(2 + random(3) * 3).toFixed(1)}px`,
    duration: `${(8 + random(4) * 9).toFixed(1)}s`,
    delay: `${(-random(5) * 15).toFixed(1)}s`,
    drift: `${((random(6) - 0.5) * 70).toFixed(0)}px`,
  };
});

function TitleLine({
  words,
  italic = false,
}: {
  words: string[];
  italic?: boolean;
}) {
  return (
    <span className={`project-tunnel-line${italic ? " is-italic" : ""}`}>
      {words.map((word) => (
        <motion.span
          key={word}
          className="project-tunnel-word"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function TunnelRing({
  progress,
  index,
  total,
  reduceMotion,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  reduceMotion: boolean;
}) {
  const start = (index / total) * 0.58;
  const end = Math.min(1, start + 0.52);
  const scale = useTransform(progress, [start, end], [0.18, 3.25]);
  const opacity = useTransform(
    progress,
    [
      start,
      Math.min(end, start + 0.14),
      Math.max(start + 0.15, end - 0.12),
      end,
    ],
    [0, 0.38, 0.12, 0],
  );

  return (
    <motion.div
      aria-hidden="true"
      className="project-tunnel-ring"
      style={{
        scale: reduceMotion ? 0.85 + index * 0.42 : scale,
        opacity: reduceMotion ? 0.12 : opacity,
      }}
    />
  );
}

function TunnelCard({
  card,
  progress,
  pointerX,
  pointerY,
  total,
  width,
  height,
  isMobile,
  reduceMotion,
}: TunnelCardProps) {
  const start = (card.index / total) * 0.52;
  const end = Math.min(1, start + 0.58);
  const localProgress = useTransform(progress, [start, end], [0, 1]);
  const z = useTransform(
    localProgress,
    [0, 0.2, 0.55, 0.85, 1],
    [
      isMobile ? -550 : -1100,
      isMobile ? -300 : -650,
      isMobile ? -50 : -100,
      240,
      380,
    ],
  );
  const opacity = useTransform(localProgress, [0, 0.12, 0.82, 1], [0, 1, 1, 0]);
  const blur = useTransform(
    localProgress,
    [0, 0.24, 0.65, 1],
    ["blur(7px)", "blur(0px)", "blur(0px)", "blur(1px)"],
  );

  const baseX = Math.cos(card.angle) * width * card.radiusX;
  const baseY = Math.sin(card.angle) * height * card.radiusY;
  const panStrength = isMobile ? 8 : 22;
  const tiltStrength = isMobile ? 0 : 5;

  const transform = useTransform(
    [z, pointerX, pointerY],
    ([currentZ, px, py]) =>
      `translate3d(calc(-50% + ${baseX - Number(px) * panStrength}px), calc(-50% + ${baseY - Number(py) * panStrength}px), ${Number(currentZ)}px) rotateX(${-Number(py) * tiltStrength}deg) rotateY(${Number(px) * tiltStrength}deg) rotateZ(${card.rotation}deg)`,
  );

  const staticTransform = `translate3d(calc(-50% + ${baseX}px), calc(-50% + ${baseY}px), 0) rotateZ(${card.rotation}deg)`;
  const cardWidth = isMobile
    ? Math.max(116, Math.min(170, width * 0.39))
    : Math.max(170, Math.min(260, width * 0.19));

  const floatStyle = {
    "--float-delay": `${-card.index * 0.65}s`,
  } as CSSProperties;

  return (
    <motion.div
      aria-hidden="true"
      className="project-tunnel-card"
      style={{
        width: cardWidth,
        transform: reduceMotion ? staticTransform : transform,
        opacity: reduceMotion ? 0.82 : opacity,
        filter: reduceMotion || isMobile ? undefined : blur,
        zIndex: card.index + 1,
      }}
    >
      <div className="project-tunnel-card-float" style={floatStyle}>
        {card.item.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={card.item.img} alt="" draggable={false} loading="lazy" />
        ) : (
          <div className="project-tunnel-card-placeholder" />
        )}
        <span>{card.item.name}</span>
      </div>
    </motion.div>
  );
}

export default function ProjectTunnel({ items }: { items: ProjectItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [stage, setStage] = useState({ width: 1280, height: 800 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 28,
    mass: 0.7,
    restDelta: 0.0001,
  });
  const pointerX = useSpring(0, { stiffness: 55, damping: 24, mass: 0.5 });
  const pointerY = useSpring(0, { stiffness: 55, damping: 24, mass: 0.5 });

  const cards = useMemo<TunnelCardData[]>(() => {
    if (!items.length) return [];
    return Array.from({ length: 9 }, (_, index) => ({
      item: items[index % items.length],
      index,
      angle: index * (137.5 * (Math.PI / 180)),
      radiusX: 0.23 + (index % 3) * 0.075,
      radiusY: 0.2 + (index % 2) * 0.08,
      rotation: (index % 2 === 0 ? 1 : -1) * (2 + (index % 4) * 1.8),
    }));
  }, [items]);

  useEffect(() => {
    const updateDimensions = () => {
      setStage({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || stage.width < 768) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const titleScale = useTransform(
    smoothProgress,
    [0, 0.55, 1],
    [0.92, 1, 1.06],
  );
  const titleOpacity = useTransform(
    smoothProgress,
    [0, 0.08, 0.82, 1],
    [0.7, 1, 1, 0],
  );
  const titleBlur = useTransform(
    smoothProgress,
    [0, 0.86, 1],
    ["blur(0px)", "blur(0px)", "blur(8px)"],
  );
  const titleX = useTransform(pointerX, [-1, 1], [-10, 10]);
  const titleY = useTransform(pointerY, [-1, 1], [-7, 7]);
  const promptOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  if (!items.length) return null;

  return (
    <section ref={sectionRef} className="project-tunnel-section">
      <div
        className="project-tunnel-stage"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div aria-hidden="true" className="project-tunnel-glow" />
        <div aria-hidden="true" className="project-tunnel-orb is-one" />
        <div aria-hidden="true" className="project-tunnel-orb is-two" />

        <div aria-hidden="true" className="project-tunnel-rings">
          {Array.from({ length: RING_COUNT }, (_, index) => (
            <TunnelRing
              key={index}
              progress={smoothProgress}
              index={index}
              total={RING_COUNT}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <div aria-hidden="true" className="project-tunnel-dust">
          {DUST.map((dust, index) => (
            <i
              key={index}
              style={
                {
                  left: dust.left,
                  top: dust.top,
                  width: dust.size,
                  height: dust.size,
                  animationDuration: dust.duration,
                  animationDelay: dust.delay,
                  "--drift": dust.drift,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div
          className="project-tunnel-plane"
          aria-hidden="true"
          style={{ perspective: stage.width < 768 ? "850px" : "1200px" }}
        >
          {cards.map((card) => (
            <TunnelCard
              key={`${card.item.id}-${card.index}`}
              card={card}
              progress={smoothProgress}
              pointerX={pointerX}
              pointerY={pointerY}
              total={cards.length}
              width={stage.width}
              height={stage.height}
              isMobile={stage.width < 768}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <div aria-hidden="true" className="project-tunnel-vignette" />

        <motion.div
          className="project-tunnel-title"
          style={{
            scale: reduceMotion ? 1 : titleScale,
            opacity: reduceMotion ? 1 : titleOpacity,
            filter: reduceMotion ? undefined : titleBlur,
            x: reduceMotion ? 0 : titleX,
            y: reduceMotion ? 0 : titleY,
          }}
        >
          <motion.div
            className="project-tunnel-title-inner"
            variants={containerVariants}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div
              className="project-tunnel-eyebrow"
              variants={fadeUpVariants}
            >
              <i className="is-left" aria-hidden="true" />
              <span>Our Living Landscapes</span>
              <i className="is-right" aria-hidden="true" />
            </motion.div>

            <h2>
              <TitleLine words={TITLE_LINE_ONE} />
              <TitleLine words={TITLE_LINE_TWO} italic />
            </h2>

            <motion.p variants={fadeUpVariants}>
              Scroll to explore the places we are growing together.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      <style jsx global>{`
        .project-tunnel-section {
          position: relative;
          height: 280svh;
          background: #122217;
          isolation: isolate;
        }

        .project-tunnel-stage {
          position: sticky;
          top: 0;
          display: flex;
          height: 100svh;
          min-height: 520px;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #122217;
          color: #fff;
          isolation: isolate;
        }

        .project-tunnel-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              ellipse at 50% 45%,
              rgba(198, 162, 101, 0.1),
              transparent 52%
            ),
            linear-gradient(
              135deg,
              rgba(198, 162, 101, 0.06),
              transparent 48%,
              rgba(88, 150, 104, 0.06)
            );
          pointer-events: none;
        }

        .project-tunnel-orb {
          position: absolute;
          width: 48vmax;
          height: 48vmax;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(198, 162, 101, 0.15),
            transparent 68%
          );
          filter: blur(48px);
          pointer-events: none;
          will-change: transform;
        }

        .project-tunnel-orb.is-one {
          top: -20vmax;
          left: -16vmax;
          animation: project-tunnel-drift-a 20s ease-in-out infinite;
        }

        .project-tunnel-orb.is-two {
          right: -18vmax;
          bottom: -22vmax;
          background: radial-gradient(
            circle,
            rgba(88, 150, 104, 0.18),
            transparent 68%
          );
          animation: project-tunnel-drift-b 24s ease-in-out infinite;
        }

        .project-tunnel-rings,
        .project-tunnel-dust {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .project-tunnel-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 68vmin;
          height: 68vmin;
          margin: -34vmin 0 0 -34vmin;
          border: 1px solid rgba(198, 162, 101, 0.48);
          border-radius: 50%;
          box-shadow:
            0 0 38px rgba(198, 162, 101, 0.12),
            inset 0 0 34px rgba(198, 162, 101, 0.08);
          will-change: transform, opacity;
        }

        .project-tunnel-dust i {
          position: absolute;
          border-radius: 50%;
          background: #f2dcae;
          box-shadow: 0 0 9px rgba(242, 220, 174, 0.7);
          opacity: 0;
          animation: project-tunnel-dust 10s ease-in-out infinite;
          animation-fill-mode: both;
        }

        .project-tunnel-vignette {
          position: absolute;
          inset: 0;
          z-index: 8;
          background: radial-gradient(
            ellipse at center,
            transparent 38%,
            rgba(5, 12, 8, 0.68) 100%
          );
          pointer-events: none;
        }

        .project-tunnel-title {
          position: sticky;
          top: 0;
          z-index: 20;

          width: min(100%, 1240px);
          margin-inline: auto;
          padding: 32px 24px;

          text-align: center;
          pointer-events: none;

          /* Keep text above the tunnel images */
          isolation: isolate;
          will-change: transform, opacity, filter;
        }

        .project-tunnel-title-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;

          /* Improve readability over images */
          filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.75));
        }

        /* Keep tunnel images on a lower layer */
        .project-tunnel-card,
        .project-tunnel-images {
          position: relative;
          z-index: 1;
        }

        .project-tunnel-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(12px, 2vw, 24px);
          width: 100%;
        }

        .project-tunnel-eyebrow span {
          padding-left: 0.3em;
          color: #d3b477;
          font-family: var(--font-sans);
          font-size: clamp(0.72rem, 1.15vw, 1rem);
          font-weight: 700;
          letter-spacing: clamp(0.16em, 0.32vw, 0.34em);
          line-height: 1.6;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .project-tunnel-eyebrow i {
          display: block;
          flex: 0 1 clamp(24px, 8vw, 112px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #c6a265);
          transform-origin: right center;
        }

        .project-tunnel-eyebrow i.is-right {
          transform-origin: left center;
          background: linear-gradient(90deg, #c6a265, transparent);
        }

        .project-tunnel-title h2 {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin: clamp(24px, 3vh, 38px) 0 26px;
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 7vw, 6.5rem);
          font-weight: 700;
          letter-spacing: -0.055em;
          line-height: 0.96;
          text-align: center;
        }

        .project-tunnel-line {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0 0.24em;
          width: 100%;
          text-align: center;
        }

        .project-tunnel-line.is-italic {
          font-style: italic;
          font-weight: 500;
        }

        .project-tunnel-word {
          display: inline-block;
          padding-bottom: 0.08em;
          background: linear-gradient(
            100deg,
            #c6a265 0%,
            #fff8e9 25%,
            #c6a265 50%,
            #fff8e9 75%,
            #c6a265 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: project-tunnel-shimmer 8s linear infinite;
        }

        .project-tunnel-title p {
          max-width: 38ch;
          margin: 0 auto;
          color: rgba(255, 255, 255, 0.82);
          font-size: clamp(0.98rem, 1.45vw, 1.3rem);
          line-height: 1.7;
          text-align: center;
        }

        .project-tunnel-prompt {
          position: absolute;
          bottom: 34px;
          left: 50%;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.72);
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          pointer-events: none;
          white-space: nowrap;
        }

        .project-tunnel-prompt i {
          display: block;
          width: 1px;
          height: 34px;
          background: linear-gradient(#c6a265, transparent);
          transform-origin: top;
          animation: project-tunnel-scroll 2.2s ease-in-out infinite;
        }

        .project-tunnel-progress {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 20;
          height: 3px;
          background: rgba(198, 162, 101, 0.14);
          pointer-events: none;
        }

        .project-tunnel-progress i {
          display: block;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #8a6c3a, #f2dcae);
          transform-origin: left center;
        }

        .project-tunnel-plane {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          pointer-events: none;
        }

        .project-tunnel-card {
          position: absolute;
          top: 50%;
          left: 50%;
          aspect-ratio: 4 / 5;
          overflow: visible;
          will-change: transform, opacity, filter;
          backface-visibility: hidden;
        }

        .project-tunnel-card-float {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border: 1px solid rgba(198, 162, 101, 0.5);
          border-radius: 16px;
          background: linear-gradient(160deg, #24443a, #1e352f);
          box-shadow:
            0 24px 70px rgba(0, 0, 0, 0.46),
            inset 0 0 0 1px rgba(255, 248, 233, 0.04);
          animation: project-tunnel-float 6s ease-in-out infinite;
          animation-delay: var(--float-delay, 0s);
        }

        .project-tunnel-card-float img,
        .project-tunnel-card-placeholder {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .project-tunnel-card-placeholder {
          background: radial-gradient(circle at 50% 35%, #456c50, #122217 70%);
        }

        .project-tunnel-card-float::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 35%,
            rgba(255, 248, 233, 0.2) 50%,
            transparent 65%
          );
          transform: translateX(-120%);
          animation: project-tunnel-sheen 6s ease-in-out infinite;
          animation-delay: var(--float-delay, 0s);
          pointer-events: none;
        }

        .project-tunnel-card-float span {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          display: block;
          padding: 48px 12px 18px;
          background: linear-gradient(transparent, rgba(18, 34, 23, 0.96));
          color: #fff;
          font-family: var(--font-sans);
          font-size: clamp(0.78rem, 1.05vw, 1.08rem);
          font-weight: 700;
          letter-spacing: 0.1em;
          line-height: 1.35;
          text-align: center;
          text-transform: uppercase;
        }

        .project-tunnel-card-float span::before {
          content: "";
          display: block;
          width: 28px;
          height: 2px;
          margin: 0 auto 10px;
          background: #c6a265;
        }

        @keyframes project-tunnel-shimmer {
          to {
            background-position: 200% 50%;
          }
        }

        @keyframes project-tunnel-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes project-tunnel-sheen {
          0%,
          60% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }

        @keyframes project-tunnel-dust {
          0% {
            opacity: 0;
            transform: translate3d(0, 22px, 0);
          }
          20% {
            opacity: 0.7;
          }
          80% {
            opacity: 0.45;
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--drift, 20px), -130px, 0);
          }
        }

        @keyframes project-tunnel-drift-a {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(7vmax, 5vmax, 0);
          }
        }

        @keyframes project-tunnel-drift-b {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-7vmax, -5vmax, 0);
          }
        }

        @keyframes project-tunnel-scroll {
          0% {
            transform: scaleY(0);
            transform-origin: top;
          }
          50% {
            transform: scaleY(1);
            transform-origin: top;
          }
          51% {
            transform: scaleY(1);
            transform-origin: bottom;
          }
          100% {
            transform: scaleY(0);
            transform-origin: bottom;
          }
        }

        @media (max-width: 767px) {
          .project-tunnel-section {
            height: 230svh;
          }
          .project-tunnel-stage {
            min-height: 480px;
          }
          .project-tunnel-title {
            padding: 22px 14px;
          }
          .project-tunnel-title h2 {
            font-size: clamp(3rem, 15vw, 5.6rem);
            letter-spacing: -0.045em;
            margin-block: 24px 18px;
          }
          .project-tunnel-eyebrow {
            gap: 10px;
          }
          .project-tunnel-eyebrow span {
            font-size: 0.64rem;
            letter-spacing: 0.15em;
          }
          .project-tunnel-eyebrow i {
            flex-basis: 22px;
          }
          .project-tunnel-title p {
            max-width: 30ch;
            font-size: 0.95rem;
          }
          .project-tunnel-prompt {
            bottom: 22px;
            font-size: 0.6rem;
          }
          .project-tunnel-card-float {
            border-radius: 12px;
          }
          .project-tunnel-card-float span {
            padding: 38px 8px 14px;
            font-size: 0.72rem;
            letter-spacing: 0.07em;
          }
        }

        @media (max-width: 380px) {
          .project-tunnel-title h2 {
            font-size: 2.75rem;
          }
          .project-tunnel-eyebrow span {
            font-size: 0.57rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-tunnel-orb,
          .project-tunnel-dust i,
          .project-tunnel-word,
          .project-tunnel-prompt i,
          .project-tunnel-card-float,
          .project-tunnel-card-float::after {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
