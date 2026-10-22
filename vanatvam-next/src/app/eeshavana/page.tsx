"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";

const EASE = [0.2, 0.9, 0.2, 1] as const;
const TITLE = "EESHAVANA";
const GOLD = "var(--accent-gold)";
const FOREST = "#122217";

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
      flies = Array.from({ length: 60 }, () => ({
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
  className,
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className={className}
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
  bottom,
  delay = 0,
  color = "rgba(190,212,167,0.35)",
}: {
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
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
        bottom,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: "blur(6px)",
        pointerEvents: "none",
        zIndex: 1,
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

const overview = [
  {
    number: "01",
    eyebrow: "SPACE",
    title: "20 planned plots",
    description:
      "The concept plan shows 20 plots, with plot sizes starting from 8,000 sq. ft. Final dimensions and availability should be confirmed with the project team.",
  },
  {
    number: "02",
    eyebrow: "COMMUNITY",
    title: "Shared spaces",
    description:
      "Planned common areas are intended to support gathering, play, quiet reflection and time outdoors.",
  },
  {
    number: "03",
    eyebrow: "LANDSCAPE",
    title: "A riverfront setting",
    description:
      "The design vision prioritises a landscape-led experience. Exact access, boundaries and permitted use must be confirmed during due diligence.",
  },
];

const amenities = [
  {
    image: "/assets/project-images/Esahavana/EV%20Arial%20View%204.png",
    title: "Bio-pool",
    description:
      "A natural-style water feature is proposed as a shared gathering space.",
  },
  {
    image: "/assets/project-images/Esahavana/EV%20Arial%20View%202.png",
    title: "Temple",
    description: "A place for quiet reflection within the community plan.",
  },
  {
    image: "/assets/project-images/Esahavana/WAlking%20path.png",
    title: "Garden and landscape",
    description:
      "Planned green spaces to soften the built environment and create places to pause.",
  },
  {
    image: "/assets/project-images/Esahavana/ChatGPT%20Image%20Jul%2014,%202026,%2005_50_15%20PM%20(1).png",
    title: "Play area",
    description: "A shared outdoor space intended for children and families.",
  },
  {
    image: "/assets/project-images/Esahavana/Amphithiater.png",
    title: "Amphitheatre",
    description: "A proposed venue for community gatherings and small events.",
  },
  {
    image: "/assets/project-images/Esahavana/WAlking%20path.png",
    title: "Riverside promenade",
    description:
      "A planned walking edge, subject to the applicable river buffer and approvals.",
  },
  {
    image: "/assets/project-images/Esahavana/Dainind%20Deck.png",
    title: "Riverside dining and sitting decks",
    description:
      "Conceptual places to gather outdoors, subject to permissions and final design.",
  },
  {
    image: "/assets/project-images/Esahavana/EV%20Arial%20View%203.png",
    title: "Car parking and internal roads",
    description:
      "Circulation and parking are indicated in the concept master plan.",
  },
];

const stats = [
  { value: "6.5", unit: "acres", label: "Community area" },
  { value: "20", unit: "plots", label: "In the concept plan" },
  { value: "8,000+", unit: "sq. ft.", label: "Plot sizes" },
  { value: "Kaveri", unit: "riverfront", label: "Setting" },
];

const galleryImages = [
  {
    src: "/assets/project-images/Esahavana/EV River View 1.jpg",
    alt: "River landscape near Eeshavana",
  },
  {
    src: "/assets/project-images/Esahavana/EV River View 2.jpg",
    alt: "River and green landscape",
  },
  {
    src: "/assets/project-images/Esahavana/EV Arial View 1.png",
    alt: "Eeshavana riverfront concept visual",
  },
];

export default function Eeshavana() {
  const reduce = useReducedMotion() ?? false;
  const enter = (delay: number, duration = 0.8) =>
    reduce ? { duration: 0 } : { duration, delay, ease: EASE };
  const from = (y: number) => (reduce ? false : { opacity: 0, y });

  return (
    <>
      <Navigation />
      <main className="eeshavana-page">
        {/* ================= HERO ================= */}
        <section
          style={{
            height: "100vh",
            position: "relative",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            background: FOREST,
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              top: "-15%",
              height: "130%",
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
                src="/assets/project-images/Esahavana/EV River View 1.jpg"
                alt="EESHAVANA"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 50% 47%, rgba(18,34,23,0.5) 0%, rgba(18,34,23,0.75) 55%, rgba(18,34,23,0.9) 100%), linear-gradient(180deg, rgba(18,34,23,0.4) 0%, rgba(18,34,23,0.9) 100%)",
              }}
            />
          </motion.div>

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
              width: "100%",
            }}
          >
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
              A premium riverfront farm community
            </motion.span>

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
                    background:
                      "linear-gradient(180deg, #fff 8%, #d6e7ca 100%)",
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
                fontSize: "clamp(1rem, 1.7vw, 1.2rem)",
                color: "rgba(255,255,255,0.86)",
                maxWidth: "690px",
                fontWeight: 300,
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              A thoughtfully planned community near Kollegala, created for people
              who want more room for nature, quieter weekends and a lasting
              connection with the land.
            </motion.p>

            <motion.div
              initial={from(18)}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(2.4)}
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "14px",
                marginTop: "24px",
              }}
            >
              <a
                className="btn-pill btn-pill-gold"
                href="/assets/project-images/Eeshavana%20Brochure.pdf"
                download
              >
                Download brochure <span aria-hidden="true">↓</span>
              </a>
              <Link className="btn-pill btn-pill-outline" href="/contact">
                Plan a site visit
              </Link>
            </motion.div>

            <motion.p
              initial={from(14)}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(2.75)}
              style={{
                margin: "20px 0 0",
                color: "rgba(255,255,255,0.72)",
                fontSize: "0.8rem",
                letterSpacing: "0.015em",
              }}
            >
              Concept visuals shown for design intent. Proposed amenities are not
              yet built.
            </motion.p>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="eeshavana-stats" aria-label="Eeshavana at a glance">
          <div className="eeshavana-stats-grid">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.06}>
                <div className="eeshavana-stat">
                  <p className="eeshavana-stat-value">
                    {stat.value} <span>{stat.unit}</span>
                  </p>
                  <p className="eeshavana-stat-label">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= THE IDEA ================= */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "clamp(70px, 10vh, 120px) 0",
            background: "var(--bg-cream, #f9f8f6)",
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
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <div className="eeshavana-idea">
              <div className="eeshavana-idea-image-wrap">
                <motion.img
                  src="/assets/project-images/Esahavana/EV River View 2.jpg"
                  alt="A view of the Kaveri river landscape"
                  loading="lazy"
                  initial={reduce ? false : { scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: EASE }}
                />
                <span className="eeshavana-image-caption">
                  The Eeshavana idea
                </span>
              </div>
              <div className="eeshavana-idea-copy">
                <Kicker>The Eeshavana idea</Kicker>
                <Words
                  text="A little closer to what matters."
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
                    gap: "16px",
                    color: "#4d594d",
                    fontSize: "1.08rem",
                    lineHeight: 1.8,
                  }}
                >
                  <Reveal delay={0.1}>
                    <p style={{ margin: 0 }}>
                      Some places are not about doing more. They are about having
                      the space to slow down, spend time outdoors and bring
                      people together.
                    </p>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p style={{ margin: 0 }}>
                      Eeshavana is envisioned as a small farm community shaped
                      around the landscape and the presence of the Kaveri. The
                      plan brings together private plots, shared spaces and a
                      nature-led setting.
                    </p>
                  </Reveal>
                  <Reveal delay={0.3}>
                    <p style={{ margin: 0 }}>
                      It is a place to imagine a future farm home, weekend
                      retreat or a gathering place for family—while being part of
                      a considered community.
                    </p>
                  </Reveal>
                </div>
                <div className="eeshavana-pills">
                  {[
                    "Space to unwind",
                    "A small community",
                    "Nature-led planning",
                  ].map((item, index) => (
                    <Reveal key={item} delay={0.12 + index * 0.06}>
                      <span className="eeshavana-pill">{item}</span>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= OVERVIEW ================= */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "clamp(70px, 10vh, 120px) 0",
            background: "#F4F1EA",
          }}
        >
          <FloatingOrb size={240} top="5%" right="-40px" delay={1} />
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <div className="eeshavana-section-heading" style={{ textAlign: "center", maxWidth: 820, margin: "0 auto 52px" }}>
              <Kicker center>At a glance</Kicker>
              <Words
                text="Designed around land, water and belonging."
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.3rem, 4.5vw, 3.7rem)",
                  lineHeight: 1.15,
                  color: FOREST,
                  textAlign: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              />
              <Reveal delay={0.15}>
                <p style={{ maxWidth: "620px", margin: "0 auto", color: "var(--eeshavana-muted)", fontSize: "1.05rem", lineHeight: 1.75, fontWeight: 300 }}>
                  A clear, compact plan with room for private ownership and shared
                  community experiences.
                </p>
              </Reveal>
            </div>

            <div className="eeshavana-overview-grid">
              {overview.map((item, index) => (
                <motion.article
                  key={item.number}
                  className="eeshavana-overview-card"
                  initial={reduce ? false : { opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          y: -10,
                          scale: 1.02,
                          borderColor: "rgba(198,162,101,0.4)",
                          boxShadow: "0 30px 60px rgba(18,34,23,0.12)",
                          transition: { duration: 0.35, ease: EASE },
                        }
                  }
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: EASE,
                  }}
                  style={{
                    position: "relative",
                    minHeight: "310px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "36px 32px",
                    border: "1px solid rgba(18, 34, 23, 0.08)",
                    borderRadius: "24px",
                    background: "#fff",
                    boxShadow: "0 14px 34px rgba(18, 34, 23, 0.04)",
                    overflow: "hidden",
                    willChange: "transform",
                  }}
                >
                  <div className="eeshavana-overview-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                    <span
                      style={{
                        color: "var(--accent-gold)",
                        fontFamily: "var(--font-serif)",
                        fontSize: "2.2rem",
                        lineHeight: 1,
                        fontWeight: 400,
                      }}
                    >
                      {item.number}
                    </span>
                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: "99px",
                        background: "rgba(18, 34, 23, 0.04)",
                        color: "var(--eeshavana-muted)",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.eyebrow}
                    </span>
                  </div>
                  <div className="eeshavana-overview-card-body">
                    <h3
                      style={{
                        margin: "0 0 12px",
                        color: FOREST,
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.6rem",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.25,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        color: "#606b60",
                        fontSize: "0.95rem",
                        lineHeight: 1.75,
                        fontWeight: 300,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div
                    className="eeshavana-card-indicator"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: "linear-gradient(90deg, transparent, var(--accent-gold), transparent)",
                    }}
                  />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= COMMUNITY PLAN ================= */}
        <section id="community-plan" className="eeshavana-plan section-padding">
          <div className="eeshavana-section-heading">
            <Kicker center>The community plan</Kicker>
            <Words
              text="Shared spaces, thoughtfully imagined."
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.3rem, 4.5vw, 3.7rem)",
                lineHeight: 1.15,
                color: FOREST,
                textAlign: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            />
            <Reveal delay={0.15}>
              <p>
                The current concept includes the following proposed amenities.
                They are future development concepts and should not be understood
                as completed facilities.
              </p>
            </Reveal>
          </div>
          <div className="eeshavana-amenities-grid">
            {amenities.map((amenity, index) => (
              <motion.article
                key={amenity.title}
                className="eeshavana-amenity-card"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
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
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: EASE,
                }}
              >
                <div className="eeshavana-amenity-image-wrap">
                  <Image
                    className="eeshavana-amenity-image"
                    src={amenity.image}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 900px) 50vw, 25vw"
                  />
                </div>
                <div className="eeshavana-amenity-card-content">
                  <h3>{amenity.title}</h3>
                  <p>{amenity.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ================= GALLERY ================= */}
        <section className="eeshavana-gallery section-padding">
          <div className="eeshavana-section-heading">
            <Kicker center>A sense of place</Kicker>
            <Words
              text="Along the Kaveri."
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.3rem, 4.5vw, 3.7rem)",
                lineHeight: 1.15,
                color: FOREST,
                textAlign: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            />
            <Reveal delay={0.15}>
              <p>
                Landscape and concept imagery to help picture the setting and
                design intent.
              </p>
            </Reveal>
          </div>
          <div className="eeshavana-gallery-grid">
            {galleryImages.map((image, index) => (
              <Reveal key={image.src} delay={index * 0.08}>
                <figure className="eeshavana-gallery-image">
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="eeshavana-cta">
          <FloatingOrb size={280} top="-80px" left="6%" color="rgba(190,212,167,0.2)" />
          <FloatingOrb size={220} bottom="10%" right="6%" delay={2} color="rgba(198,162,101,0.22)" />
          <div className="container relative" style={{ zIndex: 2 }}>
            <Kicker center>Discover Eeshavana</Kicker>
            <Words
              text="Make room for a different kind of weekend."
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 3.6rem)",
                lineHeight: 1.1,
                color: "#FFF",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            />
            <Reveal delay={0.2}>
              <p>
                Speak with our team to learn more about the concept plan, plot
                details and due diligence.
              </p>
            </Reveal>
            <Reveal delay={0.35} style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
              <Link className="btn-pill btn-pill-gold" href="/contact">
                Plan a site visit
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .eeshavana-page {
          --eeshavana-forest: #122217;
          --eeshavana-muted: #687b63;
          color: var(--text-dark);
          overflow: hidden;
          background: #f9f8f6;
        }

        .section-padding {
          padding: clamp(72px, 9vw, 120px) max(24px, calc((100vw - 1320px) / 2));
        }

        .eeshavana-stats {
          position: relative;
          z-index: 2;
          width: min(1180px, calc(100% - 48px));
          margin: -42px auto 0;
          padding: 20px;
          border: 1px solid rgba(18, 34, 23, 0.06);
          border-radius: 24px;
          background: #fff;
          box-shadow: 0 22px 60px rgba(18, 34, 23, 0.1);
        }

        .eeshavana-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .eeshavana-stat {
          min-height: 105px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 15px 24px;
          border-right: 1px solid rgba(18, 34, 23, 0.1);
          text-align: center;
        }

        .eeshavana-stats-grid > *:last-child .eeshavana-stat {
          border-right: 0;
        }

        .eeshavana-stat-value {
          margin: 0;
          color: var(--eeshavana-forest);
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          line-height: 1.1;
        }

        .eeshavana-stat-value span {
          color: var(--accent-gold);
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .eeshavana-stat-label {
          margin: 7px 0 0;
          color: var(--eeshavana-muted);
          font-size: 0.82rem;
        }

        .eeshavana-idea {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr);
          align-items: center;
          gap: clamp(40px, 7vw, 100px);
        }

        .eeshavana-idea-image-wrap {
          position: relative;
          min-height: 420px;
          overflow: hidden;
          border-radius: 28px;
          background: #d8ddd3;
          box-shadow: 0 25px 60px rgba(18, 34, 23, 0.12);
        }

        .eeshavana-idea-image-wrap img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .eeshavana-image-caption {
          position: absolute;
          bottom: 18px;
          left: 18px;
          padding: 9px 14px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          border-radius: 99px;
          color: #fff;
          background: rgba(18, 34, 23, 0.55);
          backdrop-filter: blur(10px);
          font-size: 0.78rem;
          z-index: 2;
        }

        .eeshavana-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 26px;
        }

        .eeshavana-pill {
          display: inline-flex;
          padding: 10px 15px;
          border: 1px solid rgba(18, 34, 23, 0.12);
          border-radius: 99px;
          color: var(--eeshavana-forest);
          background: rgba(255, 255, 255, 0.66);
          font-size: 0.82rem;
        }

        .eeshavana-overview {
          background: #f0eee7;
          position: relative;
        }

        .eeshavana-overview-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }

        .eeshavana-card-indicator {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .eeshavana-overview-card {
          position: relative;
          min-height: 310px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 36px 32px;
          border: 1px solid rgba(18, 34, 23, 0.08);
          border-radius: 24px;
          background: #fff;
          box-shadow: 0 14px 34px rgba(18, 34, 23, 0.04);
          overflow: hidden;
          will-change: transform;
        }

        .eeshavana-overview-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .eeshavana-overview-number {
          color: var(--accent-gold);
          font-family: var(--font-serif);
          font-size: 2.2rem;
          line-height: 1;
          font-weight: 400;
        }

        .eeshavana-overview-eyebrow {
          padding: 5px 12px;
          border-radius: 99px;
          background: rgba(18, 34, 23, 0.04);
          color: var(--eeshavana-muted);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .eeshavana-overview-card h3 {
          margin: 0 0 12px;
          color: var(--eeshavana-forest);
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.25;
        }

        .eeshavana-overview-card p {
          margin: 0;
          color: #606b60;
          font-size: 0.95rem;
          line-height: 1.75;
          font-weight: 300;
        }

        /* Subtle bottom accent line that grounds the card */
        .eeshavana-card-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .eeshavana-overview-card:hover .eeshavana-card-indicator {
          opacity: 1;
        }

        @media (max-width: 900px) {
          .eeshavana-overview-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .eeshavana-overview-card {
            min-height: 0 !important;
            padding: 28px 24px !important;
          }
        }

        .eeshavana-plan {
          background: #fff;
        }

        .eeshavana-amenities-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
        }

        .eeshavana-amenity-card {
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 24px;
          background: #fff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .eeshavana-amenity-image-wrap {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
        }

        .eeshavana-amenity-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 700ms cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        .eeshavana-amenity-card:hover .eeshavana-amenity-image {
          transform: scale(1.06);
        }

        .eeshavana-amenity-card-content {
          padding: 24px;
        }

        .eeshavana-amenity-card h3 {
          margin: 0 0 12px;
          color: var(--eeshavana-forest);
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 500;
          line-height: 1.25;
        }

        .eeshavana-amenity-card p {
          margin: 0;
          color: var(--eeshavana-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .eeshavana-gallery {
          background: #f0eee7;
        }

        .eeshavana-gallery-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr 1fr;
          gap: 18px;
        }

        .eeshavana-gallery-image {
          height: 300px;
          overflow: hidden;
          margin: 0;
          border-radius: 20px;
          background: #d8ddd3;
        }

        .eeshavana-gallery-image img {
          width: 100%;
          height: 100%;
          object-object: cover;
          object-fit: cover;
          transition: transform 0.7s ease;
        }

        .eeshavana-gallery-image:hover img {
          transform: scale(1.04);
        }

        .eeshavana-cta {
          padding: clamp(80px, 10vw, 130px) 24px;
          color: #fff;
          background: var(--eeshavana-forest);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .eeshavana-cta p {
          max-width: 620px;
          margin: 0 auto 28px;
          color: rgba(255, 255, 255, 0.74);
          font-size: 1.2rem;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .eeshavana-idea {
            grid-template-columns: 1fr;
          }

          .eeshavana-idea-image-wrap {
            min-height: 360px;
          }

          .eeshavana-amenities-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .eeshavana-stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .eeshavana-stat:nth-child(2) {
            border-right: 0;
          }

          .eeshavana-stat:nth-child(-n + 2) {
            border-bottom: 1px solid rgba(18, 34, 23, 0.1);
          }

          .eeshavana-overview-grid {
            grid-template-columns: 1fr;
          }

          .eeshavana-overview-card {
            min-height: 290px;
          }

          .eeshavana-overview-number {
            margin-bottom: 32px;
          }

          .eeshavana-gallery-grid {
            grid-template-columns: 1fr;
          }

          .eeshavana-gallery-image {
            height: 260px;
          }
        }

        @media (max-width: 520px) {
          .eeshavana-stats {
            width: calc(100% - 32px);
            padding: 10px;
          }

          .eeshavana-stat {
            min-height: 94px;
            padding: 12px 7px;
          }

          .eeshavana-stat-value {
            font-size: 1.35rem;
          }

          .eeshavana-stat-label {
            font-size: 0.72rem;
          }

          .eeshavana-amenities-grid {
            grid-template-columns: 1fr;
          }

          .eeshavana-amenity-image-wrap {
            height: 200px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .eeshavana-amenity-image {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}