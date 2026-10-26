"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";
import BrochureModal from "@/components/premium/BrochureModal";
import { ArrowRight, ArrowUpRight, Droplets, Leaf, MapPin, Mountain, PawPrint, ShieldCheck, Ship, Sparkles, Trees, Users, Waves } from "lucide-react";

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
    image:
      "/assets/project-images/Esahavana/ChatGPT%20Image%20Jul%2014,%202026,%2005_50_15%20PM%20(1).png",
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
  { value: "10", unit: "acres", label: "Community area" },
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
  {
    src: "/assets/project-images/Esahavana/EV Arial View 4.png",
    alt: "Eeshavana riverfront aerial view",
  },
];

export default function Eeshavana() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
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
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              color: "rgba(255,255,255,0.94)",
              maxWidth: "600px",
              fontWeight: 300,
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            Find your place beside the  {" "}
            <span style={{ color: "var(--accent-gold)" }}>Kaveri...</span>
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
              <button
                type="button"
                onClick={() => setIsBrochureOpen(true)}
                className="btn-pill btn-pill-gold"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "var(--accent-gold)",
                  color: "#0d0d0d",
                  fontWeight: 600,
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Download brochure <span aria-hidden="true">↓</span>
              </button>
              <Link className="btn-pill btn-pill-outline" href="/contact" style={{
                
                fontWeight: 600,
                fontSize:  "1rem",
              }}>
                Plan a site visit
              </Link>
            </motion.div>

             
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
         <div
           className="container"
           style={{ position: "relative", zIndex: 2 }}
         >
           <div className="eeshavana-idea">
             <div style={{ position: "relative", width: "100%", maxWidth: "520px" }}>
               <motion.div
                 initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                 whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                 viewport={{ once: true, margin: "-80px" }}
                 transition={{ duration: 1.2, ease: EASE }}
                 style={{
                   borderRadius: "28px",
                   overflow: "hidden",
                   aspectRatio: "4 / 5",
                   boxShadow: "0 30px 60px rgba(18, 34, 23, 0.14)",
                   border: "1px solid rgba(198, 162, 101, 0.25)",
                   position: "relative",
                 }}
               >
                 <motion.img
                   src="/assets/project-images/Esahavana/EV River View 2.jpg"
                   alt="A view of the Kaveri river landscape"
                   loading="lazy"
                   initial={reduce ? false : { scale: 1.2 }}
                   whileInView={{ scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1.8, ease: EASE }}
                   style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                 />
                 <span className="eeshavana-image-caption">
                   The Eeshavana idea
                 </span>
               </motion.div>

               {/* Floating Acreage Badge */}
               <motion.div
                 initial={{ opacity: 0, y: 30, scale: 0.9 }}
                 whileInView={{ opacity: 1, y: 0, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
                 style={{
                   position: "absolute",
                   left: -16,
                   bottom: 32,
                   background: FOREST,
                   color: "#FFF",
                   padding: "18px 24px",
                   borderRadius: "20px",
                   border: "1px solid rgba(198, 162, 101, 0.35)",
                   boxShadow: "0 20px 40px rgba(18, 34, 23, 0.3)",
                   zIndex: 3,
                 }}
               >
                 <strong
                   style={{
                     display: "block",
                     fontFamily: "var(--font-serif)",
                     fontSize: "1.8rem",
                     lineHeight: 1,
                     marginBottom: "4px",
                   }}
                 >
                   10 Acres
                 </strong>
                 <span
                   style={{
                     fontSize: "0.78rem",
                     letterSpacing: "0.15em",
                     textTransform: "uppercase",
                     color: GOLD,
                     fontWeight: 600,
                   }}
                 >
                   Kollegala · Cauvery River
                 </span>
               </motion.div>
             </div>
             <div className="eeshavana-idea-copy">
               <Kicker>A premium Kaveri riverfront farm community by Vanatvam</Kicker>
               <Words
                 text="Where the river becomes part of everyday life"
                 style={{
                   fontFamily: "var(--font-serif)",
                   fontSize: "clamp(1.5rem, 3vw, 2.6rem)",
                   lineHeight: 1.12,
                   color: FOREST,
                   marginBottom: "28px",
                 }}
               />
               <div
                 style={{
                   display: "flex",
                   flexDirection: "column",
                   gap: "18px",
                   color: "#4d594d",
                   fontSize: "1.05rem",
                   lineHeight: 1.8,
                 }}
               >
                
                 <Reveal delay={0.1}>
                   <p style={{ margin: 0 }}>
                     Nestled along the sacred Kaveri river in Dhanagere, Kollegala Taluk, Eeshavana is envisioned as a nature-first community where architecture listens to the land, landscapes remain alive, and every home enjoys the calm rhythm of rural Karnataka.
                   </p>
                 </Reveal>
                 <Reveal delay={0.2}>
                   <p style={{ margin: 0 }}>
                     Inspired by the philosophy of living with nature, Eeshavana brings together river, trees, open skies, and thoughtfully designed community spaces. The architectural vision emphasizes organic forms, natural materials, native vegetation, and experiences that deepen one&apos;s connection with the land and water.
                   </p>
                 </Reveal>
                 <Reveal delay={0.3}>
                   <p style={{ margin: 0 }}>
                     The Kaveri is more than a river. It is part of the cultural, ecological, and historical identity of Karnataka. At Eeshavana, the river is not a distant view — it is a living presence. Its changing reflections, cool breeze, birdsong, and seasonal moods become part of everyday life. Beyond the river stretch coconut groves, native vegetation, and fertile agricultural landscapes that give this place its unmistakable rural character. Eeshavana has been conceived to preserve and enhance this natural setting rather than compete with it.
                   </p>
                 </Reveal>
               </div>
               <div className="eeshavana-pills" style={{ marginTop: "24px" }}>
                 {[
                   "Sacred Kaveri Riverfront",
                   "Dhanagere, Kollegala",
                   "Nature-First Architecture",
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

        {/* ================= THE LAND IN NUMBERS / STATS ================= */}
        <section
          style={{
            padding: "clamp(52px, 7vh, 80px) 0",
            background: FOREST,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Soft radial gold glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-50%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "800px",
              height: "400px",
              background:
                "radial-gradient(ellipse, rgba(198,162,101,0.12), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            className="container"
            style={{ position: "relative", zIndex: 2 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
                gap: "clamp(24px, 4vw, 48px)",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {[
                {
                  value: "10 acres",
                  label: "Community area",
                },
                {
                  value: "20",
                  label: "Plots in the concept plan",
                },
                {
                  value: "8,000+",
                  label: "Sq. ft. plot sizes",
                },
                {
                  value: "Kaveri",
                  label: "Riverfront setting",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.65,
                    delay: reduce ? 0 : i * 0.1,
                    ease: EASE,
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 16px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)",
                      fontWeight: 700,
                      color: GOLD,
                      lineHeight: 1.1,
                      marginBottom: "8px",
                    }}
                  >
                    {s.value}
                  </div>

                  <div
                    style={{
                      color: "rgba(255, 255, 255, 0.82)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      fontWeight: 400,
                      letterSpacing: "0.02em",
                      lineHeight: 1.45,
                      maxWidth: "220px",
                    }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= OUR APPROACH ================= */}
        <section
          id="our-approach"
          style={{
            padding: "clamp(60px, 8vh, 100px) 0",
            background: "#FFFFFF",
            position: "relative",
          }}
        >
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <Kicker center>OUR PHILOSOPHY</Kicker>
              <Words
                text="Our Approach"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)",
                  fontWeight: 500,
                  color: FOREST,
                  textAlign: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  letterSpacing: "-0.02em",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
                gap: "24px",
              }}
            >
              {[
                {
                  num: "01 /",
                  title: "Excellent Locations",
                  subtitle: "Along the Bangalore–Mysore Corridor",
                  desc: "Located amidst stunning natural settings in MadhuVana (Maddur, on the Cauvery), AnantaVana (near Kabini), Eeshavana (on the Kaveri, Kollegala), and BrindaVana (where it all began). Places worth visiting, not just owning, selected only after rigorous due diligence.",
                  icon: MapPin,
                },
                {
                  num: "02 /",
                  title: "Biodiversity by Design",
                  subtitle: "We plant for the ecosystem, not just a crop",
                  desc: "Featuring 200+ native, rare and endangered tree species gathered into sacred groves like Nakshatra, Navagraha and Saraswathi Vana. Naturalists have documented 50+ bird species on our chemical-free land against national decline trends (State of India's Birds, 2023).",
                  icon: Trees,
                },
                {
                  num: "03 /",
                  title: "Natural and Organic",
                  subtitle: "Grown naturally, no compromise",
                  desc: "Everything we grow is organic, full stop — not a certification to chase, but the discipline the company is built on. We stay on the land season after season, adapting to local soil and climate rather than planting once and walking away.",
                  icon: Leaf,
                },
                {
                  num: "04 /",
                  title: "Integration Of Sacred Groves",
                  subtitle: "Vedic forest science, woven into the land",
                  desc: "Our communities are woven with conceptual Vanas — Nakshatra, Navagraha, Saraswathi and more — a tradition documented in the Vanyashastra Samhita, where each grove has a specific composition of trees and a specific purpose.",
                  icon: Sparkles,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.num}
                    initial={reduce ? false : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.6,
                      delay: reduce ? 0 : idx * 0.1,
                      ease: EASE,
                    }}
                    whileHover={
                      reduce
                        ? undefined
                        : {
                            y: -6,
                            boxShadow: "0 18px 40px rgba(18, 34, 23, 0.08)",
                            borderColor: "rgba(198, 162, 101, 0.4)",
                          }
                    }
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(18, 34, 23, 0.08)",
                      borderRadius: "24px",
                      padding: "36px 28px 32px",
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.02)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "50%",
                          background: "rgba(132, 67, 41, 0.07)",
                          border: "1px solid rgba(132, 67, 41, 0.2)",
                          color: "#844329",
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={24} strokeWidth={1.6} />
                      </div>
 
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.35rem",
                        fontWeight: 600,
                        color: FOREST,
                        margin: "0 0 6px",
                        lineHeight: 1.25,
                      }}
                    >
                      {item.title}
                    </h3>

                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "#844329",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "14px",
                        display: "block",
                      }}
                    >
                      {item.subtitle}
                    </span>

                    <p
                      style={{
                        margin: 0,
                        color: "#5A685E",
                        fontSize: "0.93rem",
                        lineHeight: 1.7,
                        fontWeight: 300,
                      }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= AMENITIES ================= */}
        <section
          id="amenities"
          style={{ padding: "clamp(60px, 8vh, 100px) 0", background: "#FFFFFF" }}
        >
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <Kicker center>Eeshavana Experiences</Kicker>
              <Words
                text="Designed for Slower, Holistic Living"
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
                    color: "var(--eeshavana-muted, #687b63)",
                    maxWidth: "680px",
                    margin: "0 auto",
                    lineHeight: 1.75,
                  }}
                >
                  More room for shared moments, quiet pauses, and a closer connection with the Cauvery river.
                </p>
              </Reveal>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: "24px",
              }}
            >
              {[
                {
                  name: "Walk by the River",
                  desc: "Tranquil riverfront walking pathways winding along the scenic banks of the Cauvery.",
                  image: "/assets/project-images/Esahavana/EV1.png",
                },
                {
                  name: "Bio Pool",
                  desc: "Natural chemical-free bio pool integrated with aquatic filtration flora.",
                  image: "/assets/project-images/Esahavana/Biopool.png",
                },
                {
                  name: "Amphitheatre",
                  desc: "Open-air eco amphitheatre designed for cultural gatherings and starlit evenings.",
                  image: "/assets/project-images/Esahavana/Amphithiater.png",
                },
                {
                  name: "Dining Deck",
                  desc: "Elevated open-breeze wooden dining deck overlooking the serene river landscape.",
                  image: "/assets/project-images/Esahavana/EV.png",
                },
              ].map((amenity, index) => (
                <motion.article
                  key={amenity.name}
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
                    delay: index * 0.08,
                    ease: EASE,
                  }}
                  style={{
                    background: "#FFF",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0.04)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      height: "200px",
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <img
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
                  <div style={{ padding: "24px", flexGrow: 1 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.35rem",
                        color: FOREST,
                        margin: "0 0 10px",
                        fontWeight: 600,
                      }}
                    >
                      {amenity.name}
                    </h3>
                    <p
                      style={{
                        color: "var(--eeshavana-muted, #687b63)",
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
                  href="https://photos.app.goo.gl/cQi23iTeCgKVP6co8"
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
                    fontSize: "1rem",
                    textDecoration: "none",
                  }}
                >
                  Show More <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
                </a>
              </motion.div>
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
                    color: "var(--eeshavana-muted, #687b63)",
                    maxWidth: "720px",
                    margin: "0 auto",
                    lineHeight: 1.75,
                  }}
                >
                  Explore the 20 planned private plots along with shared community spaces, bio-pool, riverside promenade, and internal road network directly facing the Kaveri River.
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
              {/* Left: Legend & Key Highlights with Increased Text Size */}
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
                      1–20
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
                      Private Farm Plots
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
                    Work in progress - 20 individually carved plots, each spanning 8,000+ sq. ft., thoughtfully arranged to preserve the natural topography and ensure privacy.
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
                    Master Plan Key (A – J)
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
                      { code: "A", label: "Parking Area" },
                      { code: "B", label: "Play Area" },
                      { code: "C", label: "Garden & Landscape" },
                      { code: "D", label: "Central Lawn" },
                      { code: "E", label: "Bio-pool Area" },
                      { code: "F", label: "Amphitheatre" },
                      { code: "G", label: "Riverside Promenade" },
                      { code: "H", label: "Temple Place" },
                      { code: "I", label: "Riverside Dining Deck" },
                      { code: "J", label: "Internal Roads" },
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

              {/* Right: Master Plan Main Image Only */}
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
                    src="/assets/project-images/Esahavana/masterplan.jpg"
                    alt="Eeshavana Concept Master Plan Layout"
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
                  name: "Kaveri Riverfront",
                  desc: "Direct Kaveri river views & promenade",
                  km: 0,
                  time: "On site",
                  icon: Waves,
                },
                {
                  name: "Kollegala Town",
                  desc: "Historical town & daily necessities",
                  km: 12,
                  time: "~15 mins",
                  icon: Mountain,
                },
                {
                  name: "Shivanasamudra Falls",
                  desc: "Famous waterfalls & hydro-power site",
                  km: 28,
                  time: "~35 mins",
                  icon: Droplets,
                },
                {
                  name: "BR Hills Wildlife Sanctuary",
                  desc: "Tiger reserve & mountain range",
                  km: 45,
                  time: "~55 mins",
                  icon: PawPrint,
                },
                {
                  name: "Mysore City",
                  desc: "Palace city & cultural hub",
                  km: 65,
                  time: "~1.2 hrs",
                  icon: Trees,
                },
                {
                  name: "Bengaluru",
                  desc: "Capital city connection",
                  km: 145,
                  time: "~3 hrs",
                  icon: Ship,
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
                  Eeshavana Location
                </span>
              </div>

              <iframe
                title="Google Maps showing Eeshavana at Kollegala"
                src="https://www.google.com/maps?q=12.1648,77.1082&z=12&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              <a
                className="av-nearby-map-link"
                href="https://maps.app.goo.gl/Q5DGmjzsUQefhZJ67"
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
                    <strong>Eeshavana Riverfront</strong>
                    <span>Kollegala, Cauvery River Region, Karnataka</span>
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
                Your Kaveri Riverfront Sanctuary
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
                Eeshavana.
              </span>
              <br />A place to belong.
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
              Discover 20 planned riverfront farm plots along the serene Kaveri River near Kollegala. Build your retreat surrounded by native greenery, riverside walkways, bio-pool, and a conscious community. Schedule a site visit or connect with our team to learn more.
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
                  Eeshavana at Kollegala
                </div>
                <div
                  style={{
                    color: "#727E74",
                    fontSize: "0.86rem",
                    letterSpacing: "0.035em",
                  }}
                >
                  Cauvery Riverfront Farm Community
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Premium contact form */}

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
                Enquire About Eeshavana.
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

              {/* Community / Project Select Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.39,
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <label
                  htmlFor="cta-project"
                  style={{
                    color: "#35483A",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                  }}
                >
                  Select project of interest
                </label>

                <select
                  id="cta-project"
                  name="project"
                  required
                  defaultValue="Eeshavana (Cauvery Riverfront)"
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
                    cursor: "pointer",
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
                >
                  <option value="" disabled hidden>
                    Select project of interest...
                  </option>
                  <option value="Brindavana (Pavagada · 30 Acres)">
                    Brindavana (Pavagada · 30 Acres)
                  </option>
                  <option value="Madhuvana (Maddur · 18 Acres)">
                    Madhuvana (Maddur · 18 Acres)
                  </option>
                  <option value="Anantavana (Kabini · 35 Acres)">
                    Anantavana (Kabini · 35 Acres)
                  </option>
                  <option value="Eeshavana (Cauvery Riverfront)">
                    Eeshavana (Cauvery Riverfront)
                  </option>
                </select>
              </motion.div>
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
              Request Eeshavana Details
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

      {/* Premium FAQ Section — Eeshavana */}
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
                About Eeshavana
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
                question: "Where is Eeshavana located?",
                answer: (
                  <>
                    Kollegala, Karnataka
                    <br />
                    <a
                      href="https://maps.app.goo.gl/Q5DGmjzsUQefhZJ67"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#B38B4D",
                        textDecoration: "underline",
                        marginTop: "6px",
                        display: "inline-block",
                      }}
                    >
                      https://maps.app.goo.gl/Q5DGmjzsUQefhZJ67
                    </a>
                  </>
                ),
              },
              {
                number: "02",
                question: "What is Eeshavana at Kollegala?",
                answer:
                  "Eeshavana is a premium riverfront farm community by Vanatvam, set along the banks of the Kaveri River near Kollegala. It is envisioned as a low-density retreat that brings together private farm plots, planned common spaces, bio-pool, and direct Kaveri frontage for those seeking a quiet escape in nature.",
              },
              {
                number: "03",
                question:
                  "What are the available plot sizes at Eeshavana?",
                answer: (
                  <>
                    Plot sizes at Eeshavana start from <strong>8,000+ sq. ft.</strong>, with 20 individually carved plots in the concept plan arranged to preserve privacy and natural landscape views.
                  </>
                ),
              },
              {
                number: "04",
                question: "What amenities are planned in Eeshavana?",
                answer:
                  "Proposed amenities include a natural bio-pool, temple, gardens and landscape, children's play area, amphitheatre, riverside promenade, riverside dining and sitting decks, car parking, and internal roads.",
              },
              {
                number: "05",
                question:
                  "Can I build a farmhouse on my plot in Eeshavana?",
                answer:
                  "Building permissions and farmhouse construction depend on local land-use guidelines, river buffer norms, and Karnataka agricultural land regulations. Consult our project team and legal advisor for detailed guidance.",
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
              { id: 'anantavana', name: 'ANANTAVANA', loc: 'Kabini', img: '/assets/images/Project-Logos/Anantavana.webp' }
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

      </main>

      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        projectName="Eeshavana"
        brochureUrl="/assets/project-images/Eeshavana%20Brochure.pdf"
      />

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
          background: linear-gradient(
            90deg,
            transparent,
            var(--accent-gold),
            transparent
          );
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
