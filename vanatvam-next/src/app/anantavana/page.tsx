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
import {
  ArrowRight,
  ArrowUpRight,
  Droplets,
  Leaf,
  MapPin,
  Mountain,
  PawPrint,
  Ship,
  Trees,
  Waves,
} from "lucide-react";

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
    image: "/assets/project-images/Ananthavana/Common.png",
    name: "20%+ Common Spaces",
    desc: "Open areas to gather, unwind and connect.",
  },
  {
    image: "/assets/project-images/Ananthavana/Tree-Lined.png",
    name: "Tree-Lined Roads",
    desc: "Native landscapes along the way.",
  },
  {
    image: "/assets/project-images/Ananthavana/NaturalPonds.png",
    name: "Natural Ponds",
    desc: "Water features and biodiversity spaces.",
  },
  {
    image: "/assets/project-images/Ananthavana/Pergolas.png",
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
    image:
      "/assets/project-images/Ananthavana/b242b80b-0580-4b54-8c15-02001d35bacf.png",
    name: "Herbal Gardens",
    desc: "Inspired by ancient wisdom.",
  },
  {
    image: "/assets/project-images/Ananthavana/FireCamp.png",
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
            Breathe in, You&apos;re in{" "}
            <span style={{ color: "var(--accent-gold)" }}>Kabini...</span>
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
                backgroundColor: "var(--accent-gold)",
                color: "#0d0d0d",
                fontWeight: 600,
                fontSize:  "1rem",
              }}
            >
              Download brochure <span aria-hidden="true">↓</span>
            </a>
            <Link href="/contact" className="btn-pill btn-pill-outline" style={{
                
                fontWeight: 600,
                fontSize:  "1rem",
              }}>
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
              <Kicker>The AnantaVana</Kicker>
              <Words
                text="WHERE NATURE SHAPES EVERYDAY LIFE"
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
                    A nature-led community near Kabini, rooted in conscious
                    living and respect for the natural world.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <p style={{ margin: 0 }}>
                    Spread across 34 acres near Kabini, AnantaVana brings people
                    closer to the outdoors in a landscape celebrated for its
                    timeless beauty and rich wildlife. It offers an opportunity
                    to slow down, reconnect with nature and experience a more
                    thoughtful way of living.
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <p style={{ margin: 0 }}>
                    Native trees, natural ponds, herbal gardens and thoughtfully
                    created places to pause bring a sense of calm to the
                    surroundings. Walking paths and spaces for quiet reflection
                    encourage residents to spend more time outdoors and
                    appreciate the rhythms of the natural world.
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <p style={{ margin: 0 }}>
                    At its heart, AnantaVana is about more than a place to stay.
                    It is about conscious community, natural farming and a
                    deeper appreciation of the living landscape.
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <p style={{ margin: 0 }}>
                    The wider Kabini region is renowned for its birdlife and
                    diverse mammals, adding to the natural character of the
                    setting. This regional biodiversity is part of the larger
                    landscape story, rather than a verified species count for
                    the AnantaVana property itself.
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

      {/* ================= THE LAND IN NUMBERS ================= */}
      <section
        style={{
          padding: "clamp(56px, 8vh, 88px) 0",
          background: FOREST,
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: "clamp(24px, 4vw, 48px)",
              alignItems: "start",
            }}
          >
            {[
              {
                value: "34",
                suffix: "acres",
                label: "Project area",
              },
              {
                value: "70%",
                suffix: "*",
                label: "Forest cover",
              },
              {
                value: "200+",
                suffix: "*",
                label: "Native trees",
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.65,
                  delay: reduce ? 0 : i * 0.12,
                  ease: EASE,
                }}
                style={{
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 14,
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  <span
                    style={{
                      color: GOLD,
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    style={{
                      fontSize: s.suffix === "*" ? "0.5em" : "0.3em",
                      fontWeight: 600,
                      color: GOLD,
                      letterSpacing: s.suffix === "*" ? 0 : "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.suffix}
                  </span>
                </div>

                <h3
                  style={{
                    maxWidth: 280,
                    margin: "0 auto",
                    color: "rgba(255,255,255,0.88)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(1.92rem, 2.3vw, 2.05rem)",
                    fontWeight: 400,
                    lineHeight: 1.55,
                  }}
                >
                  {s.label}
                </h3>
              </motion.div>
            ))}
          </div>


        </div>
      </section>

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

      {/* ================= CONCEPT MASTER PLAN ================= */}
      <section
        id="master-plan"
        style={{
          padding: "clamp(60px, 8vh, 100px) 0",
          background: "#F4F1EA",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <Kicker center>Master Plan</Kicker>
            <Words
              text="Concept Layout & Master Plan"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)",
                lineHeight: 1.15,
                color: FOREST,
                textAlign: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            />
            <Reveal delay={0.15}>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                  maxWidth: "720px",
                  margin: "0 auto",
                  lineHeight: 1.75,
                }}
              >
                Explore the 34-acre master plan featuring farm parcels starting from 12,000+ sq. ft., tree-lined roads, natural ponds, heritage cottages, and tree house retreats near Kabini.
              </p>
            </Reveal>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
              gap: "clamp(30px, 5vw, 60px)",
              alignItems: "center",
            }}
          >
            {/* Left: Legend & Key Highlights */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
              }}
            >
              {/* Plots Box */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(18, 34, 23, 0.08)",
                  borderRadius: "24px",
                  padding: "36px 40px",
                  boxShadow: "0 12px 35px rgba(0, 0, 0, 0.035)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "#844329",
                      color: "#FFFFFF",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    1–35
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.85rem",
                      fontWeight: 600,
                      color: FOREST,
                      margin: 0,
                    }}
                  >
                    Private Farm Parcels
                  </h3>
                </div>
                <p
                  style={{
                    margin: 0,
                    color: "#4A584E",
                    fontSize: "1.2rem",
                    lineHeight: 1.8,
                  }}
                >
                  35 individually carved plots starting from 12,000+ sq. ft., arranged thoughtfully amidst native forest cover and wildlife corridors.
                </p>
              </div>

              {/* Amenities Legend Grid */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(18, 34, 23, 0.08)",
                  borderRadius: "24px",
                  padding: "36px 40px",
                  boxShadow: "0 12px 35px rgba(0, 0, 0, 0.035)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.85rem",
                    fontWeight: 600,
                    color: FOREST,
                    margin: "0 0 24px",
                  }}
                >
                  Master Plan Key (A – H)
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(210px, 1fr))",
                    gap: "18px 24px",
                  }}
                >
                  {[
                    { code: "A", label: "20%+ Common Spaces" },
                    { code: "B", label: "Tree-Lined Roads" },
                    { code: "C", label: "Natural Ponds" },
                    { code: "D", label: "Shaded Pergolas" },
                    { code: "E", label: "Heritage Cottages" },
                    { code: "F", label: "Tree House Retreat" },
                    { code: "G", label: "Herbal Gardens" },
                    { code: "H", label: "Fire Camp & Tents" },
                  ].map((item) => (
                    <div
                      key={item.code}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                      }}
                    >
                      <span
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: "rgba(198, 162, 101, 0.22)",
                          color: "#844329",
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        {item.code}
                      </span>
                      <span
                        style={{
                          fontSize: "1.2rem",
                          color: "#2C3E31",
                          fontWeight: 600,
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Master Plan Main Image */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              style={{
                position: "relative",
                borderRadius: "28px",
                overflow: "hidden",
                background: "#FFFFFF",
                border: "1px solid rgba(18, 34, 23, 0.08)",
                boxShadow: "0 22px 55px rgba(18, 34, 23, 0.12)",
                padding: "16px",
                width: "100%",
                maxWidth: "520px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#E8ECE5",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/assets/project-images/Ananthavana/ananthavanamasterplan.webp"
                  alt="AnantaVana Concept Master Plan Layout"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "580px",
                    objectFit: "contain",
                    display: "block",
                    borderRadius: "20px",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      {galleryItems.length > 0 && (
        <section
          id="gallery"
          style={{ padding: "clamp(60px, 8vh, 90px) 0", background: "#FFF" }}
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "40px" }}
            >
              <span
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                Gallery
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                  color: "var(--bg-dark-forest)",
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Glimpses of AnantaVana
              </h2>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
                gap: "24px",
              }}
            >
              {galleryItems.slice(0, 4).map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: EASE }}
                  whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(18, 34, 23, 0.08)",
                    aspectRatio: "4 / 3",
                    position: "relative",
                    background: "#F4F1E8",
                  }}
                >
                  <img
                    src={item.img}
                    alt={`AnantaVana Gallery Image ${idx + 1}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "44px",
              }}
            >
              <a
                href="https://photos.app.goo.gl/dJaNg8zYHyjvxHnN6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-gold"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                backgroundColor: "var(--accent-gold)",
                                color: "#0d0d0d",
                                fontWeight: 600,
                                fontSize:  "1rem",
                              }}
              >
                Show More <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* ================= NEARBY DESTINATIONS ================= */}
      <section
        style={{
          position: "relative",
          isolation: "isolate",
          padding: "clamp(72px, 10vh, 120px) 0",
          background: "linear-gradient(180deg, #FBF9F5 0%, #F4F1E8 100%)",
          overflow: "hidden",
        }}
      >
        {/* Soft background ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "20%",
            left: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(198,162,101,0.08), transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "10%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(24,48,35,0.05), transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <style>{`
          .av-nearby-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
            gap: clamp(28px, 4.5vw, 56px);
            align-items: stretch;
            max-width: 1240px;
            margin: 0 auto;
          }
          .av-nearby-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding: 16px 20px;
            border: 1px solid rgba(18, 34, 23, 0.08);
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            box-shadow: 0 4px 18px rgba(18, 34, 23, 0.03);
            transition: all 300ms cubic-bezier(0.2, 0.9, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          .av-nearby-card::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: var(--accent-gold);
            opacity: 0;
            transition: opacity 300ms ease;
          }
          .av-nearby-card:hover {
            transform: translateX(6px);
            border-color: rgba(198, 162, 101, 0.4);
            background: #FFFFFF;
            box-shadow: 0 12px 32px rgba(18, 34, 23, 0.08);
          }
          .av-nearby-card:hover::before {
            opacity: 1;
          }
          .av-nearby-card:hover .av-nearby-icon {
            background: var(--accent-gold);
            color: #122217;
            transform: scale(1.05);
          }
          .av-nearby-icon {
            display: grid;
            width: 48px;
            height: 48px;
            place-items: center;
            border-radius: 14px;
            color: var(--bg-dark-forest);
            background: rgba(198, 162, 101, 0.15);
            flex-shrink: 0;
            transition: all 300ms ease;
          }
          .av-nearby-name {
            color: var(--bg-dark-forest);
            font-family: var(--font-serif);
            font-size: clamp(1.05rem, 1.4vw, 1.25rem);
            font-weight: 600;
            line-height: 1.25;
            margin-bottom: 2px;
          }
          .av-nearby-desc {
            color: var(--text-muted);
            font-size: 0.8rem;
            line-height: 1.3;
            margin: 0;
          }
          .av-nearby-badge {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            flex-shrink: 0;
          }
          .av-nearby-distance {
            display: flex;
            align-items: baseline;
            gap: 3px;
            color: var(--bg-dark-forest);
          }
          .av-nearby-distance strong {
            font-family: var(--font-serif);
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--bg-dark-forest);
          }
          .av-nearby-distance span {
            color: var(--text-muted);
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          .av-nearby-time {
            font-size: 0.74rem;
            color: #987443;
            font-weight: 600;
            background: rgba(198, 162, 101, 0.12);
            padding: 2px 8px;
            border-radius: 20px;
            margin-top: 4px;
            white-space: nowrap;
          }
          .av-nearby-map {
            position: relative;
            min-height: 580px;
            height: 100%;
            overflow: hidden;
            isolation: isolate;
            border: 1px solid rgba(198, 162, 101, 0.4);
            border-radius: 28px;
            background: #E5E8E0;
            box-shadow: 0 24px 60px rgba(18, 34, 23, 0.12);
          }
          .av-nearby-map iframe {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            border: 0;
          }
          .av-nearby-map-header {
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 2;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 18px;
            border-radius: 999px;
            background: rgba(18, 34, 23, 0.88);
            border: 1px solid rgba(198, 162, 101, 0.35);
            backdrop-filter: blur(12px);
            color: #FFF;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          }
          .av-nearby-map-header .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #B38B4D;
            box-shadow: 0 0 10px #B38B4D;
            animation: pulse-dot 2s infinite;
          }
          @keyframes pulse-dot {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.3); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.8; }
          }
          .av-nearby-map-link {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 2;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 11px 18px;
            border: 1px solid rgba(198, 162, 101, 0.5);
            border-radius: 999px;
            color: #122217;
            background: #F3E3C0;
            box-shadow: 0 8px 24px rgba(18, 34, 23, 0.16);
            font-size: 0.8rem;
            font-weight: 700;
            letter-spacing: 0.04em;
            transition: all 250ms ease;
            text-decoration: none;
          }
          .av-nearby-map-link:hover {
            transform: translateY(-2px);
            background: #FFFFFF;
            box-shadow: 0 12px 30px rgba(18, 34, 23, 0.22);
          }
          .av-nearby-map-label {
            position: absolute;
            bottom: 20px;
            left: 20px;
            right: 20px;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            border: 1px solid rgba(198, 162, 101, 0.35);
            border-radius: 20px;
            color: #FFF;
            background: rgba(18, 34, 23, 0.92);
            box-shadow: 0 12px 32px rgba(18, 34, 23, 0.25);
            backdrop-filter: blur(12px);
          }
          .av-nearby-map-label strong {
            display: block;
            color: #F3E3C0;
            font-family: var(--font-serif);
            font-size: 1.15rem;
            line-height: 1.2;
          }
          .av-nearby-map-label span {
            display: block;
            margin-top: 3px;
            color: rgba(255, 255, 255, 0.75);
            font-size: 0.8rem;
          }
          @media (max-width: 900px) {
            .av-nearby-grid {
              grid-template-columns: minmax(0, 1fr);
            }
            .av-nearby-map {
              min-height: 480px;
            }
          }
          @media (max-width: 520px) {
            .av-nearby-card {
              padding: 14px 16px;
            }
            .av-nearby-icon {
              width: 42px;
              height: 42px;
            }
            .av-nearby-map {
              min-height: 400px;
              border-radius: 20px;
            }
            .av-nearby-map-header {
              top: 14px;
              left: 14px;
              padding: 8px 14px;
              font-size: 0.75rem;
            }
            .av-nearby-map-link {
              top: 14px;
              right: 14px;
              padding: 9px 14px;
            }
            .av-nearby-map-label {
              bottom: 14px;
              left: 14px;
              right: 14px;
              padding: 12px 16px;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .av-nearby-card, .av-nearby-map-link {
              transition: none;
            }
          }
        `}</style>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              maxWidth: 820,
              margin: "0 auto clamp(36px, 5vw, 56px)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  width: "24px",
                  height: "1px",
                  background: "var(--accent-gold)",
                }}
              />
              <span
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Nearby destinations
              </span>
              <span
                style={{
                  width: "24px",
                  height: "1px",
                  background: "var(--accent-gold)",
                }}
              />
            </div>

            <h2
              style={{
                margin: 0,
                color: "var(--bg-dark-forest)",
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                fontWeight: 500,
                letterSpacing: "-0.035em",
                lineHeight: 1.12,
                textWrap: "balance",
              }}
            >
              Surrounded by wilderness.
              <br />
              <span style={{ color: "#987443", fontStyle: "italic", fontWeight: 400 }}>
                Connected to comfort.
              </span>
            </h2>
          </motion.div>

          <div className="av-nearby-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                {
                  name: "Bheemanakolli",
                  desc: "Scenic riverfront & backwaters",
                  km: 6,
                  time: "~10 mins",
                  icon: Waves,
                },
                {
                  name: "Boating in Gandatoor",
                  desc: "Tranquil boat rides & water views",
                  km: 7,
                  time: "~12 mins",
                  icon: Ship,
                },
                {
                  name: "Kabini Dam",
                  desc: "Historic reservoir & bird sanctuary",
                  km: 11,
                  time: "~18 mins",
                  icon: Droplets,
                },
                {
                  name: "Kakankote Safari",
                  desc: "Famous elephant & jungle safari",
                  km: 27,
                  time: "~35 mins",
                  icon: PawPrint,
                },
                {
                  name: "Bandipur National Park",
                  desc: "Renowned tiger & wildlife reserve",
                  km: 85,
                  time: "~1.5 hrs",
                  icon: Trees,
                },
                {
                  name: "Coorg",
                  desc: "Coffee plantations & misty hills",
                  km: 130,
                  time: "~2.5 hrs",
                  icon: Mountain,
                },
              ].map(({ name, desc, km, time, icon: Icon }, i) => (
                <motion.div
                  key={name}
                  className="av-nearby-card"
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.5,
                    delay: reduce ? 0 : i * 0.08,
                    ease: EASE,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span className="av-nearby-icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="av-nearby-name">{name}</h3>
                      <p className="av-nearby-desc">{desc}</p>
                    </div>
                  </div>

                  <div className="av-nearby-badge">
                    <div className="av-nearby-distance">
                      <strong>{km}</strong>
                      <span>km</span>
                    </div>
                    <span className="av-nearby-time">{time}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="av-nearby-map"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: reduce ? 0 : 0.15, ease: EASE }}
            >
              <div className="av-nearby-map-header">
                <span className="dot" aria-hidden="true" />
                <span style={{ fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.03em" }}>
                  AnantaVana Location
                </span>
              </div>

              <iframe
                title="Google Maps showing AnantaVana near Kabini"
                src="https://www.google.com/maps?q=11.9128648,76.3000445&z=13&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              <a
                className="av-nearby-map-link"
                href="https://maps.app.goo.gl/QT39pF4XsRq3YYHR6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
                <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </a>

              <div className="av-nearby-map-label">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      background: "rgba(198,162,101,0.18)",
                      color: "#F3E3C0",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <strong>AnantaVana Sanctuary</strong>
                    <span>Near Kabini, Mysore Region, Karnataka</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Final CTA — Nature-inspired Contact Experience */}
      <section
        id="contact-cta"
        style={{
          position: "relative",
          isolation: "isolate",
          overflow: "hidden",
          padding: "clamp(60px, 8vw, 110px) 20px",
          width: "100%",
          boxSizing: "border-box",
          background: "#FFFFFF",
          color: "#183023",
        }}
      >
        {/* Soft ambient background decoration */}
        <motion.div
          aria-hidden="true"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            zIndex: -1,
            width: "clamp(280px, 40vw, 560px)",
            aspectRatio: "1",
            top: "-180px",
            left: "-130px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(198,162,101,0.35), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={{
            scale: [1.05, 1, 1.05],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            zIndex: -1,
            width: "clamp(320px, 45vw, 640px)",
            aspectRatio: "1",
            right: "-220px",
            bottom: "-300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(72,119,81,0.3), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Decorative gold divider */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "2%",
            right: "2%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(198,162,101,0.45), transparent)",
          }}
        />

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "1240px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            alignItems: "center",
            gap: "clamp(48px, 6vw, 96px)",
            boxSizing: "border-box",
            padding: "0 10px",
          }}
        >
          {/* Left: Editorial content */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "28px",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "34px",
                  height: "1px",
                  background: "#B38B4D",
                }}
              />

              <span
                style={{
                  color: "#987443",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Your Kabini Sanctuary Awaits
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 4.5vw, 4.2rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                fontWeight: 500,
                margin: "0 0 28px",
                maxWidth: "100%",
                color: "#183023",
              }}
            >
              Experience{" "}
              <span
                style={{
                  display: "inline-block",
                  color: "#B38B4D",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                AnantaVana.
              </span>
              <br />A space to live with nature.
            </h2>

            <p
              style={{
                maxWidth: "100%",
                color: "#5A685E",
                fontSize: "clamp(1.02rem, 1.25vw, 1.15rem)",
                lineHeight: 1.95,
                margin: "0 0 36px",
              }}
            >
              Discover 34 acres of forest-inspired managed farmland near Kabini. Nurture your connection with nature through native tree canopies, organic farming, natural ponds, and a conscious community. Schedule a site visit or connect with our team to explore available farmland plots.
            </p>

            {/* Decorative signature */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                paddingTop: "24px",
                borderTop: "1px solid #E2E8E3",
                maxWidth: "100%",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  color: "#B38B4D",
                  border: "1px solid rgba(179,139,77,0.35)",
                  background: "rgba(198,162,101,0.06)",
                }}
              >
                <Leaf className="size-6" strokeWidth={1.5} />
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.12rem",
                    fontWeight: 600,
                    marginBottom: "3px",
                    color: "#183023",
                  }}
                >
                  AnantaVana at Kabini
                </div>
                <div
                  style={{
                    color: "#727E74",
                    fontSize: "0.86rem",
                    letterSpacing: "0.035em",
                  }}
                >
                  34 Acres · Managed Natural Farmland
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Premium larger contact form */}

          <motion.form
            initial={{ opacity: 0, y: 25, scale: 0.99 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            action="/api/contact"
            method="POST"
            style={{
              position: "relative",
              background: "linear-gradient(145deg, #F9FBF9 0%, #F3F7F4 100%)",
              color: "#26352B",
              padding: "clamp(30px, 3.5vw, 48px)",
              borderRadius: "24px",
              border: "1px solid #DCE4DE",
              boxShadow: "0 22px 55px rgba(0,0,0,0.08)",
              boxSizing: "border-box",
              width: "100%",
              maxWidth: "560px",
              justifySelf: "center",
              margin: "0 auto",
            }}
          >
            {/* Gold accent */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: "4px",
                borderRadius: "0 0 4px 4px",
                background:
                  "linear-gradient(90deg, transparent, #C6A265, #E9D6AD, #C6A265, transparent)",
              }}
            />

            {/* Form heading */}
            <div style={{ marginBottom: "28px" }}>
              <span
                style={{
                  display: "block",
                  color: "#987443",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Plan Your Visit
              </span>

              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.8rem, 2.4vw, 2.2rem)",
                  lineHeight: 1.2,
                  fontWeight: 500,
                  color: "#183023",
                  margin: "0 0 10px",
                }}
              >
                Enquire About AnantaVana.
              </h3>

              <p
                style={{
                  color: "#6B776D",
                  fontSize: "0.92rem",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Fill out your details below to receive plot details, brochure &amp; site visit availability.
              </p>
            </div>

            {/* Form fields */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {[
                {
                  id: "cta-name",
                  label: "Full name",
                  type: "text",
                  placeholder: "Enter your full name",
                  name: "name",
                  autoComplete: "name",
                },
                {
                  id: "cta-phone",
                  label: "Phone number",
                  type: "tel",
                  placeholder: "Enter your phone number",
                  name: "phone",
                  autoComplete: "tel",
                },
                {
                  id: "cta-email",
                  label: "Email address",
                  type: "email",
                  placeholder: "Enter your email address",
                  name: "email",
                  autoComplete: "email",
                },
              ].map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15 + index * 0.08,
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <label
                    htmlFor={field.id}
                    style={{
                      color: "#35483A",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                    }}
                  >
                    {field.label}
                  </label>

                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    required
                    style={{
                      width: "100%",
                      minHeight: "52px",
                      boxSizing: "border-box",
                      padding: "13px 16px",
                      border: "1px solid #DCE1DA",
                      borderRadius: "10px",
                      background: "#FFFFFF",
                      color: "#26352B",
                      fontFamily: "inherit",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition:
                        "border-color 0.25s ease, box-shadow 0.25s ease",
                    }}
                    onFocus={(event) => {
                      event.currentTarget.style.borderColor = "#B38B4D";
                      event.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(198,162,101,0.15)";
                    }}
                    onBlur={(event) => {
                      event.currentTarget.style.borderColor = "#DCE1DA";
                      event.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              whileHover={{
                y: -2,
                boxShadow: "0 12px 26px rgba(116,53,31,0.25)",
              }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2 }}
              style={{
                width: "100%",
                minHeight: "54px",
                marginTop: "26px",
                padding: "14px 22px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                border: "none",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #844329, #67301D)",
                color: "#FFFFFF",
                fontFamily: "inherit",
                fontSize: "0.98rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Request AnantaVana Details
              <ArrowRight className="size-5" />
            </motion.button>

            <p
              style={{
                margin: "14px 0 0",
                textAlign: "center",
                color: "#7B857D",
                fontSize: "0.75rem",
                lineHeight: 1.6,
              }}
            >
              Your information is private and will only be used to answer your enquiry.
            </p>
          </motion.form>
        </div>
      </section>

      {/* Premium FAQ Section — Vanatvam */}
      <section
        id="faq-section"
        style={{
          position: "relative",
          isolation: "isolate",
          overflow: "hidden",
          padding: "clamp(40px, 5vw, 80px) 10px",
          width: "100%",
          boxSizing: "border-box",
          background: "#FFFFFF",
          color: "#183023",
        }}
      >
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "0 10px",
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              textAlign: "center",
              marginBottom: "clamp(40px, 6vw, 70px)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{ width: "24px", height: "1px", background: "#B38B4D" }}
              />
              <span
                style={{
                  color: "#987443",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Got Questions?
              </span>
              <span
                style={{ width: "24px", height: "1px", background: "#B38B4D" }}
              />
            </div>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                fontWeight: 500,
                color: "#183023",
                margin: 0,
              }}
            >
              Frequently Asked Questions <br />
              <span
                style={{
                  color: "#B38B4D",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                About AnantaVana
              </span>
            </h2>
          </motion.div>

          {/* FAQ Items */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {[
              {
                number: "01",
                question: "Where is AnantaVana located?",
                answer: (
                  <>
                    N Begur Rd, Katwalu, Begurjungle, Karnataka 571116
                    <br />
                    <a
                      href="https://maps.app.goo.gl/QT39pF4XsRq3YYHR6"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#B38B4D",
                        textDecoration: "underline",
                        marginTop: "6px",
                        display: "inline-block",
                      }}
                    >
                      https://maps.app.goo.gl/QT39pF4XsRq3YYHR6
                    </a>
                  </>
                ),
              },
              {
                number: "02",
                question: "What is AnantaVana at Kabini?",
                answer:
                  "AnantaVana is a nature-oriented managed farmland community by Vanatvam, envisioned as a forest-inspired retreat rooted in sustainable land management, biodiversity, and a deeper connection with nature. Designed to offer a peaceful escape into the natural world, the community brings together organic farming, green landscapes, and nature-conscious living. The master plan shows agricultural parcels, internal roads, common areas, theme-park areas, a water body, and an existing building.",
              },
              {
                number: "03",
                question:
                  "What are the available plot sizes at AnantaVana Managed Farmland near Kabini?",
                answer: (
                  <>
                    Plot sizes at AnantaVana, a natural managed farmland
                    community by Vanatvam near Kabini, Karnataka, start from{" "}
                    <strong>12,000 sq. ft.</strong> Designed for nature-inspired
                    living and organic farming, AnantaVana offers a peaceful,
                    forest-style retreat surrounded by natural landscapes. Contact
                    the Vanatvam team for the latest farmland plot availability,
                    exact plot measurements, and pricing.
                  </>
                ),
              },
              {
                number: "04",
                question:
                  "What makes AnantaVana a unique managed farmland community near Kabini?",
                answer:
                  "AnantaVana by Vanatvam is envisioned as a nature-inspired farmland community that combines organic farming, biodiversity, and forest-style retreat living. Beyond agricultural plots, the proposed master plan includes common spaces, theme-park areas, and a water body, creating opportunities to connect with nature. Contact the Vanatvam team to learn more about the project and confirm which features are completed or proposed.",
              },
              {
                number: "05",
                question: "What amenities are planned at AnantaVana?",
                answer:
                  "The project brief highlights over 20% of land reserved for common spaces, tree-lined roads and native landscapes, natural ponds and biodiversity spaces, pergolas, heritage cottages and mud houses, a tree house, herbal gardens inspired by ancient wisdom, and fire-camp and outdoor tent spaces. Confirm final specifications and implementation status with Vanatvam.",
              },
              {
                number: "06",
                question:
                  "Will I earn guaranteed income from my AnantaVana plot?",
                answer:
                  "No income should be assumed unless it is supported by a specific, legally reviewed agreement. Agricultural output depends on crop selection, weather, water, management and market prices. Consider the land for its ownership and nature-oriented experience rather than assuming assured returns.",
              },
            ].map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                style={{
                  background:
                    "linear-gradient(145deg, #F9FBF9 0%, #F3F7F4 100%)",
                  border: "1px solid #DCE4DE",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                }}
              >
                <summary
                  style={{
                    padding: "22px 28px",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "#183023",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    userSelect: "none",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <span
                      style={{
                        color: "#987443",
                        fontSize: "0.85rem",
                        fontWeight: 200,
                      }}
                    >
                      {faq.number}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  {/* Custom arrow toggle indicator */}
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "rgba(152, 116, 67, 0.1)",
                      color: "#987443",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      fontSize: "0.8rem",
                    }}
                  >
                    ↓
                  </span>
                </summary>

                <div
                  style={{
                    padding: "0 28px 24px 28px",
                    color: "#5A685E",
                    fontSize: "0.96rem",
                    lineHeight: 1.85,
                    borderTop: "1px solid rgba(220, 228, 222, 0.6)",
                    marginTop: "4px",
                    paddingTop: "16px",
                  }}
                >
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

    <section style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: '#FFFFFF', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)', color: 'var(--bg-dark-forest)' }}>Discover Other Projects</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
            {[
              { id: 'brindavana', name: 'BRINDAVANA', loc: 'Pavagada', img: '/assets/images/Project-Logos/BrindaVana.webp' },
              { id: 'madhuvana', name: 'MADHUVANA', loc: 'Maddur', img: '/assets/images/Project-Logos/Logo-MadhuVana.svg' },
              { id: 'eeshavana', name: 'EESHAVANA', loc: 'Kollegala', img: '/assets/images/Project-Logos/eeshavanaalogo.webp' }
            ].map((p, i) => (
              <Link key={p.id} href={`/${p.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ background: 'var(--bg-cream)', borderRadius: '24px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', border: '1px solid rgba(0,0,0,0.02)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px', fontWeight: 600 }}>{p.loc}</span>
                  <img src={p.img} alt={p.name} style={{ maxHeight: '60px', maxWidth: '180px', objectFit: 'contain' }} />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
