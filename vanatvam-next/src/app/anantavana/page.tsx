"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import AccordionGallery from "@/components/premium/AccordionGallery";

const EASE = [0.2, 0.9, 0.2, 1] as const;
const TITLE = "ANANTAVANA";

/* ---------- Fireflies (canvas) ---------- */
function Fireflies({ still }: { still: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let w = 0,
      h = 0,
      raf = 0;
    type F = {
      x: number;
      y: number;
      r: number;
      v: number;
      amp: number;
      ph: number;
      fq: number;
      o: number;
      amber: boolean;
    };
    let flies: F[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      flies = Array.from({ length: 70 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + Math.random() * 1.8,
        v: 0.12 + Math.random() * 0.38,
        amp: 5 + Math.random() * 20,
        ph: Math.random() * 6.28,
        fq: 0.0008 + Math.random() * 0.0014,
        o: 0.35 + Math.random() * 0.55,
        amber: Math.random() > 0.58,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      flies.forEach((f) => {
        const pulse = 0.55 + Math.sin(t * 0.0015 + f.ph) * 0.25;
        const dx = Math.sin(t * f.fq + f.ph) * f.amp;
        const c = f.amber ? "255,194,105" : "183,222,153";
        ctx.beginPath();
        ctx.fillStyle = `rgba(${c},${f.o * pulse})`;
        ctx.shadowColor = `rgba(${c},0.9)`;
        ctx.shadowBlur = f.r * 7;
        ctx.arc(f.x + dx, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
        if (!still) {
          f.y -= f.v;
          if (f.y < -f.r) {
            f.y = h + f.r;
            f.x = Math.random() * w;
          }
        }
      });
      ctx.shadowBlur = 0;
      if (!still) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    if (!still) raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [still]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.8,
      }}
    />
  );
}

/* ---------- Reusable animation helpers ---------- */
const GOLD = "var(--accent-gold)";
const FOREST = "var(--bg-dark-forest)";

function Words({
  text,
  delay = 0,
  style,
}: {
  text: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion() ?? false;
  const centered = style?.textAlign === "center";
  return (
    <h2
      aria-label={text}
      style={{
        ...style,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: centered ? "center" : "flex-start",
        columnGap: "0.28em",
      }}
    >
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: "inline-block",
            overflow: "hidden",
            paddingBottom: "0.14em",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={reduce ? false : { y: "110%", rotate: 4 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: delay + i * 0.07, ease: EASE }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

function Reveal({
  children,
  delay = 0,
  x = 0,
  y = 36,
  style,
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      style={style}
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Kicker({
  children,
  color = GOLD,
  center = false,
}: {
  children: ReactNode;
  color?: string;
  center?: boolean;
}) {
  return (
    <Reveal
      y={16}
      style={{ marginBottom: "20px", textAlign: center ? "center" : "left" }}
    >
      <span
        style={{
          color,
          fontSize: "0.85rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </Reveal>
  );
}

function FloatingOrb({
  size,
  top,
  left,
  right,
  delay = 0,
  color = "rgba(190,212,167,0.35)",
}: {
  size: number;
  top?: string;
  left?: string;
  right?: string;
  delay?: number;
  color?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: size,
        height: size,
        top,
        left,
        right,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: "blur(6px)",
        pointerEvents: "none",
      }}
      animate={
        reduce
          ? undefined
          : { y: [0, -34, 0], x: [0, 16, 0], scale: [1, 1.12, 1] }
      }
      transition={{ duration: 9, delay, ease: "easeInOut", repeat: Infinity }}
    />
  );
}

type Pillar = { n: string; title: string; desc: string };

function PillarCard({ p, i, dark }: { p: Pillar; i: number; dark: boolean }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: i * 0.15, ease: EASE }}
      whileHover={reduce ? undefined : { y: -10 }}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "36px 30px 34px",
        borderRadius: "24px",
        background: dark ? "rgba(255,255,255,0.05)" : "#FFF",
        border: dark
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid rgba(0,0,0,0.04)",
        boxShadow: dark
          ? "0 20px 50px rgba(0,0,0,0.25)"
          : "0 16px 40px rgba(0,0,0,0.05)",
        backdropFilter: dark ? "blur(10px)" : undefined,
      }}
    >
      <motion.span
        initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: EASE }}
        style={{
          display: "block",
          fontFamily: "var(--font-serif)",
          fontSize: "3.4rem",
          lineHeight: 1,
          marginBottom: "18px",
          color: GOLD,
          transformOrigin: "left center",
        }}
      >
        {p.n}
      </motion.span>
      <h4
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.6rem",
          marginBottom: "12px",
          color: dark ? "#FFF" : FOREST,
        }}
      >
        {p.title}
      </h4>
      <p
        style={{
          margin: 0,
          fontSize: "1rem",
          lineHeight: 1.7,
          color: dark ? "rgba(255,255,255,0.75)" : "var(--text-muted)",
        }}
      >
        {p.desc}
      </p>
    </motion.div>
  );
}

function TreeMarquee() {
  const reduce = useReducedMotion() ?? false;
  const trees = ["Sandalwood", "Seeta Ashoka", "Teak", "Seethaphala"];
  const row = [...trees, ...trees, ...trees, ...trees];
  return (
    <div
      aria-label="Native trees: Sandalwood, Seeta Ashoka, Teak and Seethaphala"
      style={{
        overflow: "hidden",
        margin: "50px 0 10px",
        maskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{ display: "flex", gap: "48px", width: "max-content" }}
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      >
        {row.map((t, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "48px",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.8rem, 3.6vw, 3rem)",
              color: FOREST,
              whiteSpace: "nowrap",
            }}
          >
            {t}{" "}
            <span
              style={{ color: GOLD, fontStyle: "normal", fontSize: "1.2rem" }}
            >
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SpaceBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        textAlign: "center",
        padding: "80px 24px",
      }}
    >
      <motion.div style={{ position: "absolute", inset: "-15% 0", y }}>
        <img
          src="/assets/project-images/Ananthavana/hero_image_2.jpg"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(18,34,23,0.7), rgba(18,34,23,0.85))",
          }}
        />
      </motion.div>
      <FloatingOrb
        size={220}
        top="10%"
        left="8%"
        color="rgba(190,212,167,0.28)"
      />
      <FloatingOrb
        size={160}
        top="55%"
        right="10%"
        delay={2}
        color="rgba(198,162,101,0.28)"
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Kicker center>Our promise</Kicker>
        <Words
          text="Space to live with nature"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
            lineHeight: 1.05,
            color: "#FFF",
            textAlign: "center",
            maxWidth: 900,
          }}
        />
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
          style={{
            width: "min(320px, 60vw)",
            height: 1,
            margin: "30px auto 0",
            background:
              "linear-gradient(90deg, transparent, rgba(223,230,190,0.95), rgba(198,162,101,0.85), transparent)",
          }}
        />
      </div>
    </section>
  );
}

const pillars: Pillar[] = [
  {
    n: "01",
    title: "Conscious community",
    desc: "A place for like-minded landowners to connect, share experiences and care for their surroundings.",
  },
  {
    n: "02",
    title: "Natural farming",
    desc: "A nature-conscious approach that seeks to support soil life and biodiversity while avoiding hazardous synthetic inputs.",
  },
  {
    n: "03",
    title: "A living landscape",
    desc: "Thoughtful planning that makes space for greenery, water-sensitive features and outdoor pauses.",
  },
];

const landscape: Pillar[] = [
  {
    n: "01",
    title: "Native trees",
    desc: "A landscape vision featuring trees such as Sandalwood, Seeta Ashoka, Teak and Seethaphala.",
  },
  {
    n: "02",
    title: "Wildlife-rich region",
    desc: "Kabini is celebrated for its wider regional bird and mammal diversity; wildlife sightings are never guaranteed.",
  },
  {
    n: "03",
    title: "Herbal heritage",
    desc: "Herbal gardens inspired by traditional knowledge and the relationship between plants and people.",
  },
];

const amenities = [
  {
    image: "/assets/project-images/Ananthavana/fa9905d3-3bb6-4dfd-9e16-d72bb1d681ff.png",
    name: "20%+ Common Spaces",
    desc: "Open areas to gather, unwind and connect.",
  },
  {
    image: "/assets/project-images/Ananthavana/WhatsApp Image 2026-10-04 at 3.30.48 PM.jpeg",
    name: "Tree-Lined Roads",
    desc: "Native landscapes along the way.",
  },
  {
    image: "/assets/project-images/Ananthavana/hero_image_2.jpg",
    name: "Natural Ponds",
    desc: "Water features and biodiversity spaces.",
  },
  {
    image: "/assets/project-images/Ananthavana/ChatGPT Image Aug 3, 2026, 01_16_33 PM (2).png",
    name: "Pergolas",
    desc: "Shaded spots for rest and quiet gatherings.",
  },
  {
    image: "/assets/project-images/Ananthavana/hero_image.jpg",
    name: "Heritage Cottages",
    desc: "Traditional cottages and mud houses.",
  },
  {
    image: "/assets/project-images/Ananthavana/AV Tree House.png",
    name: "Tree House",
    desc: "A raised retreat amidst nature.",
  },
  {
    image: "/assets/project-images/Ananthavana/b242b80b-0580-4b54-8c15-02001d35bacf.png",
    name: "Herbal Gardens",
    desc: "Inspired by ancient wisdom.",
  },
  {
    image: "/assets/project-images/Ananthavana/9f5cea54-01f1-417d-862a-f818a7f97cfb.png",
    name: "Fire Camp & Tents",
    desc: "Outdoor evenings under the open sky.",
  },
];

export default function Anantavana() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ["0%", "15%"], {
    clamp: true,
  });
  const heroScale = useTransform(scrollY, [0, 1000], [1, 1.15], {
    clamp: true,
  });
  const reduce = useReducedMotion() ?? false;

  // Hero entrance helpers (instant when the visitor prefers reduced motion)
  const enter = (delay: number, duration = 0.8) =>
    reduce ? { duration: 0 } : { duration, delay, ease: EASE };
  const from = (y: number) => (reduce ? false : { opacity: 0, y });

  const specs = [
    { label: "Location", value: "Near Kabini, Karnataka" },
    { label: "Total Area", value: "34 Acres" },
    { label: "Ecosystem Type", value: "Wildlife Corridor Buffer" },
    { label: "Green Cover", value: "82%+ Native Canopy" },
  ];

  const galleryItems = [
    {
      img: "/assets/project-images/Ananthavana/hero_image.jpg",
      title: "Wildlife Corridor",
      desc: "Acting as a gentle buffer for the Bandipur and Nagarhole sanctuaries.",
    },
    {
      img: "/assets/project-images/Ananthavana/AV Tree House.png",
      title: "Tree House Retreats",
      desc: "Experience the magic of living amidst the canopy.",
    },
    {
      img: "/assets/project-images/Ananthavana/hero_image_2.jpg",
      title: "Native Biodiversity",
      desc: "Over 80% of the land is planted with rare & endangered tree species.",
    },
    {
      img: "/assets/project-images/Ananthavana/b242b80b-0580-4b54-8c15-02001d35bacf.png",
      title: "Low-Impact Design",
      desc: "Extremely low density footprints ensuring nature remains the dominant force.",
    },
  ];

  const mist = [
    {
      bg: "radial-gradient(ellipse at 25% 42%, rgba(231,241,215,0.25), transparent 38%)",
      o: 0.3,
      a: { x: "-3%", y: "-1%", scale: 0.95 },
      b: { x: "4%", y: "2%", scale: 1.12 },
    },
    {
      bg: "radial-gradient(ellipse at 76% 63%, rgba(255,255,255,0.24), transparent 36%)",
      o: 0.22,
      a: { x: "3%", y: "2%", scale: 1.1 },
      b: { x: "-4%", y: "-2%", scale: 0.95 },
    },
  ];

  return (
    <>
      <Navigation />

      {/* ================= HERO (animated) ================= */}
      <section
        style={{
          height: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background: parallax wrapper → Ken Burns drift → image + overlay */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            top: "-15%",
            height: "130%",
            y: heroY,
            scale: heroScale,
            transformOrigin: "center center",
          }}
        >
          <motion.div
            style={{ position: "absolute", inset: 0 }}
            animate={
              reduce
                ? undefined
                : { scale: [1, 1.18], x: ["0%", "-1.3%"], y: ["0%", "1%"] }
            }
            transition={{
              duration: 28,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <img
              src="/assets/project-images/Ananthavana/hero_image.jpg"
              alt="ANANTAVANA"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 47%, rgba(13,31,20,0.5) 0%, rgba(13,31,20,0.75) 55%, rgba(13,31,20,0.9) 100%), linear-gradient(180deg, rgba(18,34,23,0.4) 0%, rgba(18,34,23,0.9) 100%)",
            }}
          />
        </motion.div>

        {/* Drifting mist */}
        {mist.map((m, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              pointerEvents: "none",
              opacity: m.o,
              filter: "blur(48px)",
              background: m.bg,
            }}
            initial={m.a}
            animate={reduce ? m.a : m.b}
            transition={{
              duration: 18,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        <Fireflies still={reduce} />

        <div
          className="container relative"
          style={{
            zIndex: 2,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 20px",
          }}
        >
          {/* Badge: rise + un-blur, then soft glow pulse */}
          <motion.span
            initial={
              reduce ? false : { opacity: 0, y: 30, filter: "blur(8px)" }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              textShadow: reduce
                ? "0 0 0 rgba(220,235,194,0)"
                : [
                    "0 0 0 rgba(220,235,194,0)",
                    "0 0 15px rgba(220,235,194,0.55)",
                  ],
            }}
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: 0.9,
                    delay: 0.2,
                    ease: EASE,
                    textShadow: {
                      duration: 2.5,
                      delay: 1.2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                  }
            }
            style={{
              display: "inline-block",
              padding: "6px 16px",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              color: "#FFF",
              borderRadius: "30px",
              fontSize: "clamp(0.7rem, 1.3vw, 0.85rem)",
              letterSpacing: "0.12em",
              marginBottom: "24px",
            }}
          >
            A natural sanctuary · Kabini
          </motion.span>

          {/* Title: letter-by-letter 3D flip */}
          <h1
            aria-label={TITLE}
            style={{
              display: "flex",
              justifyContent: "center",
              perspective: 700,
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(3.5rem, 11vw, 8rem)",
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            {Array.from(TITLE).map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                initial={reduce ? false : { opacity: 0, y: 80, rotateX: -70 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={enter(0.5 + i * 0.09, 0.85)}
                style={{
                  display: "inline-block",
                  transformOrigin: "bottom center",
                  background: "linear-gradient(180deg, #fff 8%, #d6e7ca 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  whiteSpace: "pre",
                }}
              >
                {ch === " " ? "\u00a0" : ch}
              </motion.span>
            ))}
          </h1>

          {/* Growing gradient rule */}
          <motion.div
            aria-hidden="true"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={enter(1.85, 0.85)}
            style={{
              width: "min(320px, 56vw)",
              height: 1,
              margin: "24px 0 20px",
              transformOrigin: "center",
              background:
                "linear-gradient(90deg, transparent, rgba(223,230,190,0.95), rgba(198,162,101,0.85), transparent)",
            }}
          />

          <motion.p
            initial={from(20)}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(2.1)}
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              color: "rgba(255,255,255,0.94)",
              maxWidth: "600px",
              fontWeight: 300,
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            You&apos;re in{" "}
            <span style={{ color: "var(--accent-gold)" }}>Kabini.</span>
          </motion.p>

          <motion.p
            initial={from(18)}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(2.4)}
            style={{
              maxWidth: "640px",
              margin: "16px auto 0",
              color: "rgba(255,255,255,0.84)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            Welcome to AnantaVana — where the forest breathes with you. A
            nature-led sanctuary created by Vanatvam, shaped around the quiet
            beauty of the Kabini region.
          </motion.p>

          <motion.div
            initial={from(18)}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(2.75)}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "14px",
              marginTop: "24px",
            }}
          >
            <a
              href="/assets/project-images/AnantaVana%20Brochure.pdf"
              download
              className="btn-pill btn-pill-gold"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              Download brochure <span aria-hidden="true">↓</span>
            </a>
            <Link href="/contact" className="btn-pill btn-pill-outline">
              Plan a visit
            </Link>
          </motion.div>

          <motion.p
            initial={from(14)}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(3.05)}
            style={{
              margin: "20px 0 0",
              color: "#c5d9b1",
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              fontStyle: "italic",
            }}
          >
            Live where nature still whispers.
          </motion.p>
        </div>
      </section>

      {/* ================= THE ANANTAVANA IDEA ================= */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "clamp(70px, 10vh, 120px) 0",
          background: "var(--bg-cream)",
        }}
      >
        <FloatingOrb size={260} top="-60px" right="-60px" />
        <FloatingOrb
          size={180}
          top="60%"
          left="-50px"
          delay={3}
          color="rgba(198,162,101,0.25)"
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "70px",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1.1 1 420px" }}>
              <Kicker>The AnantaVana idea</Kicker>
              <Words
                text="Where the forest breathes with you."
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.2rem, 4.2vw, 4rem)",
                  lineHeight: 1.1,
                  color: FOREST,
                  marginBottom: "30px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  color: "var(--text-dark)",
                  fontSize: "1.08rem",
                  lineHeight: 1.8,
                }}
              >
                <Reveal delay={0.1}>
                  <p style={{ margin: 0 }}>
                    AnantaVana is a nature-led community planned across 34 acres
                    near Kabini, a region celebrated for its wildlife and
                    timeless landscapes. It invites you to slow down, reconnect
                    with the outdoors and experience a more thoughtful
                    relationship with nature.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <p style={{ margin: 0 }}>
                    The project vision brings together native trees, natural
                    ponds, herbal gardens and nature-inspired places to pause.
                    The wider Kabini region is known for its rich wildlife;
                    references to bird and mammal diversity describe the region,
                    not a verified count on the project land.
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <p style={{ margin: 0 }}>
                    Our approach is rooted in conscious community, natural
                    farming and care for the living landscape.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.4} style={{ marginTop: "34px" }}>
                <motion.a
                  href="#plan"
                  className="btn-pill btn-pill-outline"
                  whileHover={{ y: -4, scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  See the proposed layout <span aria-hidden="true">↗</span>
                </motion.a>
              </Reveal>
            </div>

            <div style={{ flex: "1 1 340px", position: "relative" }}>
              <motion.div
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, ease: EASE }}
                style={{
                  borderRadius: "28px",
                  overflow: "hidden",
                  aspectRatio: "4 / 5",
                  boxShadow: "0 30px 60px rgba(18,34,23,0.2)",
                }}
              >
                <motion.img
                  src="/assets/project-images/Ananthavana/hero_image_2.jpg"
                  alt="Native forest landscape at AnantaVana"
                  initial={{ scale: 1.3 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: EASE }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1, ease: EASE }}
                style={{
                  position: "absolute",
                  left: -20,
                  bottom: 36,
                  background: FOREST,
                  color: "#FFF",
                  padding: "18px 24px",
                  borderRadius: "18px",
                  boxShadow: "0 20px 40px rgba(18,34,23,0.3)",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    fontFamily: "var(--font-serif)",
                    fontSize: "2rem",
                    lineHeight: 1,
                  }}
                >
                  34 Acres
                </strong>
                <span
                  style={{
                    fontSize: "0.78rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: GOLD,
                  }}
                >
                  Near Kabini
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= A QUIETER RHYTHM (3 pillars) ================= */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "clamp(70px, 10vh, 110px) 0",
          background: FOREST,
        }}
      >
        <FloatingOrb
          size={300}
          top="-80px"
          left="10%"
          color="rgba(190,212,167,0.18)"
        />
        <FloatingOrb
          size={240}
          top="55%"
          right="5%"
          delay={2}
          color="rgba(198,162,101,0.2)"
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Kicker center>Three ideas</Kicker>
            <Words
              text="A quieter rhythm, shaped by nature."
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 3.6rem)",
                lineHeight: 1.15,
                color: "#FFF",
                textAlign: "center",
                maxWidth: 780,
                margin: "0 auto",
              }}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "28px",
            }}
          >
            {pillars.map((p, i) => (
              <PillarCard key={p.n} p={p} i={i} dark />
            ))}
          </div>
        </div>
      </section>

      {/* ================= A LANDSCAPE TO RECONNECT WITH ================= */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "clamp(70px, 10vh, 110px) 0",
          background: "#F4F1EA",
        }}
      >
        <FloatingOrb size={240} top="5%" right="-40px" delay={1} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
            <Kicker center>A landscape to reconnect with</Kicker>
            <Words
              text="Rooted in nature. Inspired by heritage."
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 3.6rem)",
                lineHeight: 1.15,
                color: FOREST,
                textAlign: "center",
                marginBottom: "28px",
              }}
            />
            <Reveal delay={0.15}>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-dark)",
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                }}
              >
                From Sandalwood and Seeta Ashoka to Teak and Seethaphala, the
                project narrative celebrates native and culturally significant
                trees. Herbal gardens inspired by ancient Indian traditions
                bring another layer of meaning to the landscape.
              </p>
            </Reveal>
          </div>

          <TreeMarquee />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "28px",
              marginTop: "40px",
            }}
          >
            {landscape.map((p, i) => (
              <PillarCard key={p.n} p={p} i={i} dark={false} />
            ))}
          </div>

          {/*
            Editorial note supplied with the content (keep internal, do not publish as-is):
            The 34-acre extent, 70% forest-cover figure and biodiversity counts were supplied in the project
            narrative and should be substantiated before publication. Forest cover, species counts and
            air-quality readings require clear definitions and reliable, dated evidence.
          */}
        </div>
      </section>

      {/* ================= SPACE TO LIVE WITH NATURE (parallax band) ================= */}
      <SpaceBand />

      {/* ================= THOUGHTFUL SPACES ================= */}
      <section
        id="amenities"
        style={{
          padding: "clamp(60px, 8vh, 90px) 0",
          background: "#FFFFFF",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Kicker center>Space to live with nature</Kicker>
            <Words
              text="Thoughtful spaces. Natural living."
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
                lineHeight: 1.15,
                color: FOREST,
                textAlign: "center",
                justifyContent: "center",
                margin: "0 auto",
              }}
            />
            <Reveal delay={0.15}>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-muted)",
                  maxWidth: "600px",
                  margin: "12px auto 0",
                  lineHeight: 1.7,
                }}
              >
                More room for shared moments, quiet pauses and a closer
                connection with the land.
              </p>
            </Reveal>
          </div>

          <div className="anantavana-amenities-grid">
            {amenities.map((amenity, index) => (
              <motion.article
                key={amenity.name}
                className="anantavana-amenity-card"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.02,
                        boxShadow: "0 22px 45px rgba(18,34,23,0.16)",
                        transition: { duration: 0.3, ease: EASE },
                      }
                }
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: EASE,
                }}
                style={{
                  background: "#FFF",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    height: "180px",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    className="anantavana-amenity-image"
                    src={amenity.image}
                    alt={amenity.name}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ padding: "24px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.35rem",
                        color: FOREST,
                        margin: 0,
                      }}
                    >
                      {amenity.name}
                    </h3>
                  </div>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {amenity.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VIDEO TOUR ================= */}
      <section
        style={{ padding: "clamp(50px, 6vh, 70px) 0", background: "#122217" }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span
              style={{
                color: "var(--accent-gold)",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Project Video
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
                color: "#FFF",
              }}
            >
              Experience AnantaVana
            </h2>
          </div>

          <div
            style={{
              background: "#000",
              padding: "0",
              borderRadius: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              overflow: "hidden",
              position: "relative",
              paddingTop: "56.25%",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/ZMd2mZhfvsI?si=UftSlEEPsjw9E41T&autoplay=1&mute=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      {galleryItems.length > 0 && (
        <section
          style={{ padding: "clamp(60px, 8vh, 90px) 0", background: "#FFF" }}
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                GALLERY
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.8rem, 3.0vw, 3.0rem)",
                  color: "var(--bg-dark-forest)",
                  marginBottom: "60px",
                  textAlign: "center",
                }}
              >
                Life at ANANTAVANA
              </h2>
            </motion.div>

            <AccordionGallery items={galleryItems} height="500px" />
          </div>
        </section>
      )}

      {/* ================= NEARBY DESTINATIONS ================= */}
      <section
        style={{
          padding: "clamp(60px, 8vh, 90px) 0",
          background: "var(--bg-cream)",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span
              style={{
                color: "var(--accent-gold)",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Nearby Destinations
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "var(--bg-dark-forest)",
              }}
            >
              Surrounded by Wilderness. Connected to Comfort.
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "30px",
            }}
          >
            {[
              {
                time: "85",
                unit: "Kilometers",
                desc: "To Bandipur National Park",
                icon: "fa-leaf",
              },
              {
                time: "27",
                unit: "Kilometers",
                desc: "To Kakankote Forest",
                icon: "fa-tree",
              },
              {
                time: "7",
                unit: "Kilometers",
                desc: "To Boating in Gandatoor",
                icon: "fa-ship",
              },
              {
                time: "130",
                unit: "Kilometers",
                desc: "To Scenic Coorg",
                icon: "fa-mountain",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "#FFF",
                  padding: "30px",
                  borderRadius: "20px",
                  textAlign: "center",
                  border: "1px solid rgba(0,0,0,0.03)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    color: "var(--accent-gold)",
                    marginBottom: "16px",
                  }}
                >
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "2.5rem",
                    color: "var(--bg-dark-forest)",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {item.time}
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--text-dark)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "12px",
                  }}
                >
                  {item.unit}
                </div>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.95rem",
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     {/* ================= CTA ================= */}
<section
  style={{
    padding: 'clamp(70px, 10vh, 110px) 0',
    background: 'var(--bg-dark-forest)',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  }}
>
  {/* Slow breathing glow behind the content */}
  <motion.div
    aria-hidden="true"
    style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse at 50% 40%, rgba(190,212,167,0.18), transparent 60%)',
    }}
    animate={reduce ? undefined : { opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] }}
    transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
  />
  <FloatingOrb size={280} top="-80px" left="6%" color="rgba(190,212,167,0.2)" />
  <FloatingOrb size={220} top="55%" right="6%" delay={2} color="rgba(198,162,101,0.22)" />

  <div className="container relative" style={{ zIndex: 1 }}>
    <Kicker center>Visit the land</Kicker>

    <Words
      text="Experience ANANTAVANA"
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(2rem, 4vw, 3.6rem)',
        lineHeight: 1.1,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: '24px',
      }}
    />

    <Reveal delay={0.2}>
      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 }}>
        Step into the wild. Secure your legacy in the heart of nature. Schedule a site visit to walk the land and
        understand the ecological principles driving this community.
      </p>
    </Reveal>

    {/* Primary button: pulse ring + hover lift + light sweep */}
    <Reveal delay={0.35} style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '44px' }}>
      <motion.div
        whileHover={{ y: -5, scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        animate={reduce ? undefined : { boxShadow: ['0 0 0 0 rgba(198,162,101,0.45)', '0 0 0 18px rgba(198,162,101,0)'] }}
        transition={{ boxShadow: { duration: 2.4, repeat: Infinity, ease: 'easeOut' } }}
        style={{ position: 'relative', overflow: 'hidden', borderRadius: '999px' }}
      >
        <Link href="/contact" className="btn-pill btn-pill-gold">
          Schedule a Site Visit
        </Link>
        <motion.span
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, bottom: 0, width: '40%', pointerEvents: 'none',
            background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.45), transparent)',
          }}
          initial={{ left: '-60%' }}
          animate={reduce ? undefined : { left: ['-60%', '130%'] }}
          transition={{ duration: 2.2, delay: 1.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
        />
      </motion.div>
    </Reveal>

    {/* Divider that grows from the centre */}
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
      style={{
        height: 1, maxWidth: 720, margin: '0 auto 32px', transformOrigin: 'center',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)',
      }}
    />

    {/* Contact items: staggered entrance + hover lift */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', flexWrap: 'wrap', color: '#FFF' }}>
      {[
        {
          icon: 'fa-phone',
          label: '080 47095111',
          href: 'tel:+918047095111',
          external: false,
        },
        {
          icon: 'fa-location-dot',
          label: 'View location on Google Maps',
          href: 'https://maps.app.goo.gl/QT39pF4XsRq3YYHR6',
          external: true,
        },
        {
          icon: 'fa-globe',
          label: 'Visit the AnantaVana website',
          href: 'https://priyankadharemane-spec.github.io/Anantavana/',
          external: true,
        },
      ].map((item, i) => (
        <motion.a
          key={item.icon}
          href={item.href}
          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 + i * 0.12, ease: EASE }}
          whileHover={{ y: -6, borderColor: 'rgba(198,162,101,0.7)', backgroundColor: 'rgba(255,255,255,0.08)' }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '14px',
            padding: '14px 22px', borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.03)',
            color: '#FFF', textDecoration: 'none', fontSize: '1.05rem',
          }}
        >
          {/* Icon with soft pulse ring */}
          <span style={{ position: 'relative', display: 'inline-flex', width: 34, height: 34, alignItems: 'center', justifyContent: 'center' }}>
            <motion.span
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid var(--accent-gold)' }}
              animate={reduce ? undefined : { scale: [1, 1.7], opacity: [0.7, 0] }}
              transition={{ duration: 2.2, delay: i * 0.5, repeat: Infinity, ease: 'easeOut' }}
            />
            <i className={`fa-solid ${item.icon}`} style={{ color: 'var(--accent-gold)' }}></i>
          </span>
          <span>
            {item.label}
            {item.external && <span aria-hidden="true" style={{ marginLeft: 8, opacity: 0.7 }}>↗</span>}
          </span>
        </motion.a>
      ))}
    </div>
  </div>
</section>
      

      <Footer />
    </>
  );
}
