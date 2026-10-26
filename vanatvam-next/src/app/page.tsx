"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import {
  TreePine,
  Leaf,
  Droplets,
  RefreshCcw,
  Users,
  Target,
  Award,
  Sparkles,
  Compass,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  MoveLeft,
} from "lucide-react";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import RevealText from "@/components/premium/RevealText";
import Magnetic from "@/components/premium/Magnetic";
import Counter from "@/components/premium/Counter";
import TiltCard from "@/components/premium/TiltCard";
import { useLenis } from "@/components/premium/SmoothScroll";

type PolaroidItem = {
  id: string;
  title: string;
  caption: string;
  subtitle: string;
  img: string;
};

const lifeAtVanatvamPolaroids: PolaroidItem[] = [
  {
    id: "deepotsava",
    title: "Deepotsava at Farm",
    caption: "Deepotsava",
    subtitle:
      "Hundreds of earthen lamps lovingly lit across pathways, courtyards, and sacred groves.",
    img: "/Event%20images/DSC08963.JPG",
  },
  {
    id: "banana-orchard",
    title: "Tropical Banana Grove",
    caption: "Banana Grove",
    subtitle:
      "Vibrant multi-canopy banana and fruit orchards nurtured through chemical-free living soil.",
    img: "/assets/project-images/Brindavana/Sunny%20Tropical%20Banana%20Orchard.png",
  },
  {
    id: "vasantotsava",
    title: "Vasantotsava Gathering",
    caption: "Vasantotsava",
    subtitle:
      "Joyous spring celebration with music, guided forest walks, and organic farm feasts.",
    img: "/Event%20images/DSC08964%20(1).JPG",
  },
  {
    id: "brick-courtyard",
    title: "Verdant Courtyard",
    caption: "Brick Courtyard",
    subtitle:
      "Vernacular sustainable architecture embracing terracotta courtyards and open breeze pavilions.",
    img: "/assets/project-images/Maduvana/Modern%20Brick%20Courtyard%20with%20Arched%20Canopy.png",
  },
  {
    id: "nursery-saplings",
    title: "Native Sapling Nursery",
    caption: "Native Nursery",
    subtitle:
      "Propagating indigenous forestry saplings to restore ancient biodiversity and sacred groves.",
    img: "/assets/project-images/Brindavana/Vibrant%20Tropical%20Garden%20Nursery.png",
  },
  {
    id: "bonfire-nights",
    title: "Twilight Bonfire Evenings",
    caption: "Bonfire Nights",
    subtitle:
      "Stargazing, storytelling, and communal cooking around gentle twilight farm fires.",
    img: "/Event%20images/DSC09025.JPG",
  },
  {
    id: "green-tunnel",
    title: "Canopy Trail Pathways",
    caption: "Canopy Trails",
    subtitle:
      "Tranquil walking pathways winding through living bamboo clusters and bird-friendly flora.",
    img: "/assets/project-images/Brindavana/Tropical%20Garden%20Pathway%20Tunnel.png",
  },
  {
    id: "community-harvest",
    title: "Community Harvest",
    caption: "Harvest Days",
    subtitle:
      "Families and children reconnecting directly with the earth, gathering fresh seasonal produce.",
    img: "/Event%20images/WhatsApp%20Image%202024-04-02%20at%202.37.57%20PM%20(2)%20(1).jpeg",
  },
];

const heroSlides = [
  {
    id: "anantavana",
    name: "ANANTAVANA",
     
    tagline: "Near Kabini— a biodiversity hotspot.",
    img: "/assets/project-images/Ananthavana/hero_image.jpg",
  },
  {
    id: "eeshavana",
    name: "EESHAVANA",
    
    tagline: "A premium riverfront community on the sacred Cauvery.",
    img: "/assets/project-images/Esahavana/EV%20River%20View%201.jpg",
  },
  {
    id: "madhuvana",
    name: "MADHUVANA",
   
    tagline: "A dense water-forest ecosystem built around 250+ native trees.",
    img: "/assets/project-images/Maduvana/hero.png",
  },
  {
    id: "brindavana",
    name: "BRINDAVANA",
     
    tagline:
      "Our benchmark project — barren land reborn as a thriving forest ecosystem.",
    img: "/assets/project-images/Brindavana/brindavanaaa.png",
  },
];

export default function Home() {
  const lenisRef = useLenis();
  const [activeSlide, setActiveSlide] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) {
        setActiveSlide((prev) => (prev + 1) % heroSlides.length);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setActiveSlide((p) => (p + 1) % heroSlides.length);
  const prevSlide = () =>
    setActiveSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length);
  const slide = heroSlides[activeSlide];

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (lenisRef?.current) {
      lenisRef.current.scrollTo("#projects", { offset: -60, duration: 1.6 });
    } else {
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <>
      <Navigation />

      {/* ORIGINAL HERO SECTION RESTORED */}
      <section
        className="hero hero-carousel"
        id="hero"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            className="hero-bg-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            <motion.img
              src={slide.img}
              alt={slide.name}
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 6.5, ease: "linear" }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        </AnimatePresence>
        <div
          className="hero-overlay"
          style={{
            background:
              "linear-gradient(180deg, rgba(18, 34, 23, 0.4) 0%, rgba(18, 34, 23, 0.8) 100%)",
          }}
        ></div>

        <div
          className="container relative"
          style={{
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            paddingTop: "80px",
          }}
        >
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ maxWidth: "800px" }}
          >
            <motion.span
              variants={fadeIn}
              style={{
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.4)",
                padding: "6px 16px",
                borderRadius: "30px",
                fontSize: "1.3rem",
                fontWeight: 900,
                letterSpacing: "0.15em",
                color: "#FFF",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Nature-First Farm Communities
            </motion.span>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                 
                <h1
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 700,
                    fontSize: "clamp(3rem, 6.0vw, 5.8rem)",
                    lineHeight: 1.05,
                    color: "#FFFFFF",
                    marginBottom: "20px",
                    letterSpacing: "0.04em",
                    textShadow: "0 4px 24px rgba(0,0,0,0.65)",
                  }}
                >
                  {slide.name}
                </h1>
                <p
                  style={{
                    fontSize: "1.3rem",
                    color: "#FFFFFF",
                    textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                    lineHeight: 1.6,
                    maxWidth: "640px",
                    marginBottom: "36px",
                    fontWeight: 400,
                  }}
                >
                  {slide.tagline}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "28px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Magnetic strength={0.4}>
                    <Link
                      href={`/${slide.id}`}
                      className="btn-pill btn-pill-gold"
                      style={{
                        padding: "16px 36px",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        letterSpacing: "0.02em",
                        boxShadow: "0 8px 30px rgba(198, 162, 101, 0.4)",
                      }}
                    >
                      Explore{" "}
                      {slide.name.charAt(0) + slide.name.slice(1).toLowerCase()}
                    </Link>
                  </Magnetic>
                  <Magnetic strength={0.4}>
                    <a
                      href="#projects"
                      onClick={scrollToProjects}
                      style={{
                        color: "#FFFFFF",
                        textDecoration: "none",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        borderBottom: "2px solid rgba(255,255,255,0.7)",
                        paddingBottom: "4px",
                        transition: "border-color 0.3s",
                        textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                      }}
                    >
                      View All Communities
                    </a>
                  </Magnetic>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            display: "flex",
            gap: "15px",
            zIndex: 15,
          }}
        >
          <button
            className="hero-carousel-arrow"
            style={{
              position: "relative",
              top: "auto",
              left: "auto",
              right: "100px",
              transform: "none",
            }}
            onClick={prevSlide}
            aria-label="Previous community"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            className="hero-carousel-arrow"
            style={{
              position: "relative",
              top: "auto",
              left: "auto",
              right: "70px",
              transform: "none",
            }}
            onClick={nextSlide}
            aria-label="Next community"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div
          className="hero-carousel-dots"
          style={{ left: "40px", transform: "none" }}
        >
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              className={`hero-carousel-dot ${i === activeSlide ? "active" : ""}`}
              onClick={() => setActiveSlide(i)}
              aria-label={`Go to ${s.name}`}
            />
          ))}
        </div>
      </section>
      {/* Continuous Infinite Ecosystem Marquee */}
      <div
        className="vana-marquee"
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          whiteSpace: "nowrap",
        }}
      >
        <div
          className="vana-marquee-track"
          style={{
            display: "flex",
            width: "max-content",
            willChange: "transform",
            animationName: "vana-marquee-scroll",
            animationDuration: "30s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: "running",
          }}
        >
          {Array.from({ length: 2 }, (_, rep) => (
            <div
              className="vana-marquee-group"
              key={rep}
              aria-hidden={rep === 1}
              style={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {[
                "Brindavana",
                "Madhuvana",
                "Anantavana",
                "Eeshavana",
                "Brindavana",
                "Madhuvana",
                "Anantavana",
                "Eeshavana",
                "Brindavana",
                "Madhuvana",
                "Anantavana",
                "Eeshavana",
              ].map((name, index) => (
                <span
                  key={`${rep}-${index}`}
                  className="vana-marquee-item"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {name}
                  <Leaf
                    className="size-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                    style={{
                      display: "inline-block",
                      flexShrink: 0,
                      margin: "0 28px",
                      color: "var(--accent-gold)",
                    }}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>


      {/* Section 5: More than land. A way to belong. & Ancient Wisdom */}
      <section
        style={{
          padding: "clamp(90px, 12vh, 130px) 0",
          background: "var(--bg-cream)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-10%",
            width: "50vw",
            height: "50vw",
            background:
              "radial-gradient(circle, rgba(198,162,101,0.06) 0%, transparent 70%)",
            zIndex: 0,
            borderRadius: "50%",
          }}
        />

        <div className="container relative" style={{ zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "80px",
              alignItems: "center",
            }}
          >
            {/* Image composition column */}
            <div
              style={{
                flex: "1 1 440px",
                position: "relative",
                minHeight: "520px",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  height: "460px",
                  width: "82%",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
                }}
              >
                <img
                  src="/assets/project-images/Ananthavana/ChatGPT%20Image%20Aug%203,%202026,%2001_16_33%20PM%20(2).png"
                  alt="Ancient tall forest grove canopy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>

              {/* Overlapping offset image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "0",
                  width: "58%",
                  height: "240px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
                  border: "5px solid #F9F8F6",
                }}
              >
                <img
                  src="/assets/project-images/Maduvana/Rustic%20Tropical%20Garden%20Gateway.png"
                  alt="Living landscape gateway"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>

              {/* Floating aesthetic caption tag */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-25px",
                  left: "20px",
                  background: "#FFFFFF",
                  padding: "16px 24px",
                  borderRadius: "16px",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(0,0,0,0.04)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.05rem",
                    color: "var(--bg-dark-forest)",
                    fontWeight: 600,
                  }}
                >
                  A living landscape.
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                  }}
                >
                  A shared legacy.
                </span>
              </div>
            </div>

            {/* Text content column */}
            <div style={{ flex: "1 1 480px" }}>
              <span
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "18px",
                }}
              >
                WHO WE ARE
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)",
                  color: "var(--bg-dark-forest)",
                  lineHeight: 1.12,
                  marginBottom: "24px",
                  letterSpacing: "-0.02em",
                  fontWeight: 600,
                }}
              >
                More than land.
                <br />A way to{" "}
                <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                  belong.
                </span>
              </h2>

              <p
                style={{
                  fontSize: "1.15rem",
                  color: "#333D35",
                  lineHeight: 1.8,
                  marginBottom: "16px",
                  fontWeight: 400,
                }}
              >
                Four organic, biodiversity-led farm communities across Karnataka — built on six commitments most farmland developers skip.
              </p>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#556358",
                  lineHeight: 1.8,
                  marginBottom: "24px",
                }}
              >
                Vana means forest, Tvam means you — the forest isn't separate from us, we're part of it. Vanatvam was born during the pandemic, out of realising how far we'd drifted from that balance. We create Natural Sustainable Farm Communities across Karnataka: organic, biodiverse, and built to be lived in, not just owned.
              </p>


              <Magnetic strength={0.2}>
                <Link
                  href="/about"
                  className="link-underline"
                  style={{
                    color: "var(--bg-dark-forest)",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  Understand our approach <ArrowRight className="size-4" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

     {/* Section 6: Not just a farmland developer. A landscape-led approach. */}
<section
  style={{
    padding: "clamp(100px, 14vh, 160px) 0",
    background: "#F5F2EB",
    position: "relative",
  }}
>
  <div
    className="container"
    style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}
  >
    {/* Main Grid Layout: Left Sticky Header, Right Scrolling Overlap Stack */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "clamp(48px, 6vw, 96px)",
        alignItems: "start",
        position: "relative",
      }}
    >
      {/* LEFT COLUMN: Sticky Header Content */}
      <div
        style={{
          position: "sticky",
          top: "120px",
          maxWidth: "480px",
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            color: "var(--accent-gold)",
            fontSize: "0.8rem",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            fontWeight: 700,
            display: "block",
            marginBottom: "16px",
          }}
        >
          Our Approach
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
            color: "var(--bg-dark-forest)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            fontWeight: 600,
            marginBottom: "24px",
          }}
        >
          Not a farmland developer. 
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 400 }}>
            A philosophy.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "clamp(1.05rem, 1.2vw, 1.2rem)",
            color: "#556358",
            lineHeight: "1.75",
            fontWeight: 400,
            margin: 0,
          }}
        >
          Every decision on every piece of land we touch comes back to six foundational principles — ensuring that as the landscape matures, experiences take root and people become true stewards of the place.
        </motion.p>
      </div>

      {/* RIGHT COLUMN: Overlapping Scrolling Approach Cards (All 6 Commitments) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          position: "relative",
          paddingBottom: "40px",
        }}
      >
        {[
          {
            num: "01 / Excellent Locations",
            title: "Along the Bangalore–Mysore Corridor",
            desc: "Located amidst stunning natural settings in MadhuVana (Maddur, on the Cauvery), AnantaVana (near Kabini), Eeshavana (on the Kaveri, Kollegala), and BrindaVana (where it all began). Places worth visiting, not just owning, selected only after rigorous due diligence.",
          },
          {
            num: "02 / Biodiversity by Design",
            title: "We plant for the ecosystem, not just a crop",
            desc: "Featuring 200+ native, rare and endangered tree species gathered into sacred groves like Nakshatra, Navagraha and Saraswathi Vana. Naturalists have documented 50+ bird species on our chemical-free land against national decline trends (State of India's Birds, 2023).",
          },
          {
            num: "03 / Natural and Organic",
            title: "Grown naturally, no compromise",
            desc: "Everything we grow is organic, full stop — not a certification to chase, but the discipline the company is built on. We stay on the land season after season, adapting to local soil and climate rather than planting once and walking away.",
          },
          {
            num: "04 / Sacred Groves",
            title: "Vedic forest science, woven into the land",
            desc: "Woven with conceptual Vanas based on traditions documented in the Vanyashastra Samhita, where each grove has a specific composition of trees and a specific purpose. These are treated as essential ecological infrastructure.",
          },
          {
            num: "05 / Enriching Experiences",
            title: "Cottages, ponds, gazebos and tree houses",
            desc: "Laid out in an architect-led master plan and shared across the community. Features like these are built to enrich the experience and invite people to keep returning to Vanatvam communities.",
          },
          {
            num: "06 / Water Bodies",
            title: "Ponds and groves that purify groundwater",
            desc: "Designed around our relationship with water to purify groundwater and shape how a place feels. Three of our four communities sit on real water: MadhuVana on the Cauvery, Eeshavana on the Kaveri, and AnantaVana near Kabini.",
          },
        ].map((card, i) => (
          <motion.div
            key={card.num}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              ease: [0.25, 1, 0.5, 1],
              delay: 0.05 * i,
            }}
            style={{
              position: "sticky",
              top: `${140 + i * 22}px`, // Stacks cleanly one over another with an offset
              background: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: "20px",
              padding: "clamp(32px, 4vw, 44px)",
              boxShadow: "0 12px 36px rgba(45, 55, 48, 0.07)",
              display: "flex",
              flexDirection: "column",
              zIndex: i + 1,
            }}
          >
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--accent-gold)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 700,
                display: "block",
                marginBottom: "16px",
              }}
            >
              {card.num}
            </span>

            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.4rem, 2.2vw, 1.7rem)",
                color: "var(--bg-dark-forest)",
                fontWeight: 600,
                lineHeight: 1.25,
                marginBottom: "14px",
              }}
            >
              {card.title}
            </h3>

            <p
              style={{
                fontSize: "1.02rem",
                color: "#687B63",
                lineHeight: 1.7,
                margin: 0,
                fontWeight: 400,
                maxWidth: "92%",
              }}
            >
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Impact in Numbers */}
      <section
        style={{
          padding: "clamp(70px, 9vh, 100px) 0",
          background: "var(--bg-dark-forest)",
          borderTop: "1px solid var(--border-dark)",
          borderBottom: "1px solid var(--border-dark)",
        }}
      >
        <div
          className="container"
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "50px",
              textAlign: "center",
            }}
          >
            {[
              {
                value: 4,
                suffix: "",
                label: "Living Ecosystems Across Karnataka",
              },
              {
                value: 100,
                suffix: "+",
                label: "Acres Under Active Regeneration",
              },
              { value: 100, suffix: "+", label: "Families In Our Community" },
              { value: 250, suffix: "+", label: "Native Tree Varieties" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(3rem, 5vw, 4.2rem)",
                    color: "var(--accent-gold)",
                    lineHeight: 1,
                    marginBottom: "16px",
                    fontWeight: 600,
                  }}
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "0.98rem",
                    letterSpacing: "0.04em",
                    maxWidth: "260px",
                    margin: "0 auto",
                    fontWeight: 300,
                    lineHeight: 1.5,
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>






      {/* Section 9: Four Unique Expressions of Nature's Abundance with Sticky Left Header and Overlapping Scrolling Cards */}
      <section
        className="projects-section projects-sticky-section"
        id="projects"
        style={{
          padding: "clamp(100px, 14vh, 160px) 0",
          background: "var(--bg-cream)",
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* Background Glows */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "40vw",
            height: "40vw",
            background:
              "radial-gradient(circle, rgba(198,162,101,0.08) 0%, transparent 70%)",
            zIndex: 0,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-5%",
            width: "50vw",
            height: "50vw",
            background:
              "radial-gradient(circle, rgba(45,106,79,0.05) 0%, transparent 70%)",
            zIndex: 0,
            borderRadius: "50%",
          }}
        />

        <div
          className="container relative-z projects-sticky-container"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            zIndex: 2,
          }}
        >
          {/* Main Grid Layout: Left Sticky Header, Right Scrolling Overlap Stack */}
          <div className="projects-sticky-layout">
            {/* LEFT COLUMN: Sticky Header Content */}
            <div className="projects-sticky-header">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="subtitle-tag"
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                LIVING ECOSYSTEMS
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                  lineHeight: 1.15,
                  color: "var(--bg-dark-forest)",
                  letterSpacing: "-0.025em",
                  fontWeight: 600,
                  marginBottom: "24px",
                }}
              >
                Four Unique Expressions
                <br />
                of{" "}
                <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                  Nature&apos;s Abundance.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontSize: "clamp(1.05rem, 1.2vw, 1.2rem)",
                  color: "#556358",
                  lineHeight: 1.75,
                  fontWeight: 400,
                  marginBottom: "32px",
                }}
              >
                Explore our signature ecosystem developments designed to
                harmonize luxurious living with pristine ecological
                regeneration.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Magnetic strength={0.25}>
                  <Link
                    href="/projects"
                    className="btn-pill btn-pill-dark"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "14px 28px",
                      fontSize: "1rem",
                      fontWeight: 600,
                      borderRadius: "100px",
                    }}
                  >
                    Explore All Projects <ArrowRight className="size-4" />
                  </Link>
                </Magnetic>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Overlapping Scrolling Project Cards Stack */}
            <div className="projects-sticky-cards">
              {[
                
                {
                  id: "anantavana",
                  name: "ANANTAVANA",
                  badge: "NEAR KABINI · 34 ACRES",
                  img: "/assets/project-images/Ananthavana/hero_image.jpg",
                   
                },
                {
                  id: "eeshavana",
                  name: "EESHAVANA",
                  badge: "KOLLEGALA · CAUVERY RIVERFRONT",
                  img: "/assets/project-images/Esahavana/Riverside%20view.png",
                   
                },
                {
                  id: "madhuvana",
                  name: "MADHUVANA",
                  badge: "MADDUR · 17 ACRES",
                  img: "/assets/project-images/Maduvana/Sunlit%20Terracotta%20Cottage%20and%20Lush%20Garden.png",
                   
                },
                {
                  id: "brindavana",
                  name: "BRINDAVANA",
                  badge: "PAVAGADA · 30 ACRES",
                  img: "/assets/project-images/Brindavana/Rainy%20Countryside%20Pond%20Reflections.png",
                   
                },
                
              ].map((proj, i) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 1, 0.5, 1],
                    delay: 0.05 * i,
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="projects-sticky-card"
                  style={{ top: `${140 + i * 20}px`, zIndex: i + 1 }}
                >
                  <Link
                    href={`/${proj.id}`}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      textDecoration: "none",
                      position: "relative",
                    }}
                  >
                    <img
                      src={proj.img}
                      alt={proj.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.6s ease",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(14,26,18,0.92) 0%, rgba(14,26,18,0.3) 45%, rgba(0,0,0,0.05) 100%)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: "36px 32px",
                      }}
                    >
                      <div style={{ marginBottom: "14px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            background: "rgba(0,0,0,0.45)",
                            backdropFilter: "blur(8px)",
                            color: "rgba(255,255,255,0.9)",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            fontSize: "0.72rem",
                            letterSpacing: "0.12em",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            border: "1px solid rgba(255,255,255,0.18)",
                          }}
                        >
                          {proj.badge}
                        </span>
                      </div>

                      <h3
                        style={{
                          color: "#FFFFFF",
                          fontFamily: "'Cinzel', var(--font-serif), serif",
                          fontSize: "2.1rem",
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          margin: "0 0 8px 0",
                          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                        }}
                      >
                        {proj.name}
                      </h3>

                       
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Life at the Farm - Continuous Right-to-Left Flow */}
      <section
        id="life-at-the-farm"
        style={{
          background: "#122217",
          position: "relative",
          overflow: "hidden",
          padding: "100px 0 120px",
        }}
      >
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 24px 55px",
          }}
        >
          <span
            style={{
              display: "block",
              color: "var(--accent-gold)",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            LIFE AT VanaTvam
          </span>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 500,
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              margin: "0 0 20px",
            }}
          >
            See What Your{" "}
            <span
              style={{
                color: "var(--accent-gold)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Weekends
            </span>{" "}
            Look Like
          </h2>

          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.05rem",
              lineHeight: 1.8,
            }}
          >
            Slow mornings, open skies, nature-filled moments, and memories
            waiting to be made. Discover the feeling of life at VanaTvam.
          </p>

          {/* Decorative Gold Line */}
          <div
            aria-hidden="true"
            style={{
              width: "64px",
              height: "2px",
              background: "var(--accent-gold)",
              margin: "30px auto 0",
            }}
          />
        </motion.div>

        {/* Continuous Flow Infinite Marquee */}
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            position: "relative",
            padding: "20px 0",
          }}
        >
          <div className="polaroid-marquee-track">
            {[0, 1].map((rep) => (
              <div
                key={rep}
                className="polaroid-marquee-group"
                style={{
                  display: "flex",
                  gap: "32px",
                  paddingRight: "32px",
                  flexShrink: 0,
                }}
              >
                {lifeAtVanatvamPolaroids.map((item) => (
                  <motion.div
                    key={item.id + rep}
                    whileHover={{ y: -8, scale: 1.03 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: "360px",
                      height: "250px",
                      flexShrink: 0,
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      position: "relative",
                      background: "#1E352F",
                      cursor: "pointer",
                    }}
                  >
                    <motion.img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
            ))}
          </div>
        </div>

        <style jsx global>{`
          @keyframes vana-marquee-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
          .polaroid-marquee-track {
            display: flex;
            width: max-content;
            will-change: transform;
            animation: polaroid-marquee-scroll 45s linear infinite;
          }
          .polaroid-marquee-track:hover {
            animation-play-state: paused;
          }
          @keyframes polaroid-marquee-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>



      {/* FKCCI Award Recognition Section */}
      <section
        style={{
          padding: "clamp(90px, 12vh, 120px) 0",
          background: "#F7F5F0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "35vw",
            height: "35vw",
            background:
              "radial-gradient(circle, rgba(198,162,101,0.08) 0%, transparent 70%)",
            zIndex: 0,
            borderRadius: "50%",
          }}
        />

        <div className="container relative" style={{ zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "60px",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(198,162,101,0.15)",
                  border: "1px solid rgba(198,162,101,0.3)",
                  padding: "6px 16px",
                  borderRadius: "30px",
                  marginBottom: "20px",
                }}
              >
                <Award
                  className="size-4"
                  style={{ color: "var(--accent-gold)" }}
                />
                <span
                  style={{
                    color: "#1B2B1F",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Institutional Recognition
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                  color: "var(--bg-dark-forest)",
                  lineHeight: 1.15,
                  marginBottom: "24px",
                  letterSpacing: "-0.02em",
                  fontWeight: 600,
                }}
              >
                FKCCI Award in
                <br />
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "2.8rem",
                  }}
                >
                   Tourism &amp; Hospitality - 2026
                </span>
              </h2>

              <p
                style={{
                  fontSize: "1.15rem",
                  color: "#333D35",
                  lineHeight: 1.8,
                  marginBottom: "20px",
                  fontWeight: 400,
                }}
              >
                VanaTvam&apos;s ecological model has received distinguished
                recognition through the{" "}
                <strong
                  style={{ color: "var(--bg-dark-forest)", fontWeight: 600 }}
                >
                  FKCCI Award in Tourism and Hospitality
                </strong>{" "}
                presented by the Federation of Karnataka Chambers of Commerce
                and Industry.
              </p>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#556358",
                  lineHeight: 1.8,
                  marginBottom: "32px",
                }}
              >
                This honor reaffirms that nature-led land development, cultural
                restoration of sacred groves, and commercial viability thrive
                together — creating long-term generational wealth and living
                habitats.
              </p>

              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <CheckCircle2
                    className="size-5"
                    style={{ color: "var(--accent-gold)" }}
                  />
                  <span
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--bg-dark-forest)",
                    }}
                  >
                    Honoring Institution
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <CheckCircle2
                    className="size-5"
                    style={{ color: "var(--accent-gold)" }}
                  />
                  <span
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--bg-dark-forest)",
                    }}
                  >
                    Excellence in Tourism & Nature Hospitality
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Side — Premium Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "22px",
                width: "100%",
              }}
            >
              {/* First Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "auto",
                }}
              >
                <img
                  src="/Event images/award.png"
                  alt="Vanatvam's natural forest landscape"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(80px, 10vh, 120px) 0",
          background: "#122217",
          color: "#FFF",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                color: "var(--accent-gold)",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "20px",
              }}
            >
              Client Stories
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.1,
                marginBottom: "20px",
              }}
            >
              Voices of{" "}
              <span
                style={{ fontStyle: "italic", color: "var(--accent-gold)" }}
              >
                VanaTvam.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                color: "rgba(255,255,255,0.65)",
                maxWidth: "560px",
                margin: "0 auto",
                fontWeight: 300,
              }}
            >
              Hear directly from the families and landowners who walked the land
              before they chose to call it home.
            </motion.p>
          </div>

          <div
            style={{
              overflow: "hidden",
              padding: "20px 0",
              width: "100vw",
              marginLeft: "calc(-50vw + 50%)",
            }}
          >
            <div className="reviews-marquee-track">
              {[0, 1].map((rep) => (
                <div
                  key={rep}
                  className="reviews-marquee-group"
                  style={{
                    display: "flex",
                    gap: "30px",
                    paddingRight: "30px",
                    flexShrink: 0,
                  }}
                >
                  {[
                    "oTd69o1SAkk",
                    "rPMv_cggbH8",
                    "HIuRfVHefz0",
                    "5sDm6-yiMPs",
                    "61PcdiIYtgs",
                  ].map((id, i) => (
                    <motion.div
                      key={id + rep}
                      style={{
                        width: "360px",
                        flexShrink: 0,
                        borderRadius: "24px",
                        overflow: "hidden",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                        background: "#0A1510",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div style={{ aspectRatio: "16/9" }}>
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`}
                          title="Client Review"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div
                        style={{
                          padding: "14px 18px",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <i
                          className="fa-solid fa-circle-play"
                          style={{
                            color: "var(--accent-gold)",
                            fontSize: "0.85rem",
                          }}
                        ></i>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "rgba(255,255,255,0.6)",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                          }}
                        >
                          Client Video Testimonial
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
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
                Your next chapter begins here
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
              A life closer to{" "}
              <span
                style={{
                  display: "inline-block",
                  color: "#B38B4D",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                nature.
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
              Discover thoughtfully nurtured landscapes, meaningful outdoor
              experiences, and a community shaped by nature. Tell us what you
              are looking for, and let&apos;s start a conversation.
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
                  Rooted in nature.
                </div>
                <div
                  style={{
                    color: "#727E74",
                    fontSize: "0.86rem",
                    letterSpacing: "0.035em",
                  }}
                >
                  Thoughtfully grown for generations.
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
                Let&apos;s connect
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
                Begin your journey.
              </h3>

              <p
                style={{
                  color: "#6B776D",
                  fontSize: "0.92rem",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Share your details and we&apos;ll be in touch.
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
              Send an enquiry
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
              Your details will be used to respond to your enquiry.
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
          padding: "clamp(40px, 5vw, 800px) 10px",
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
                About Vanatvam
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
                question:
                  "What makes Vanatvam different from other farmland developers?",
                answer:
                  "VanaTvam creates natural, green spaces where people can experience life closer to nature. Our projects focus on native trees, fruit-bearing plants, bird-friendly habitats and sustainable land care. We create thoughtfully planned farm communities where families can benefit from living close to nature for years to come.",
              },
              {
                number: "02",
                question: "Where can I buy managed farmland near Bangalore?",
                answer:
                  "If you are looking to buy farmland near Bangalore, Vanatvam offers nature-focused farm communities in selected locations across Karnataka, including the Mysore and Kaveri regions. Explore our managed farmland near Bangalore to learn about available plots, pricing and site visits. You can also enquire about farmland near Bangalore and Mysore. ",
              },
              {
                number: "03",
                question:
                  "What is managed farmland, and how does Vanatvam maintain it?",
                answer:
                  "Managed farmland combines land ownership with organised support for plantation development and ongoing land care, depending on the project. Vanatvam focuses on tree care, soil health and biodiversity. Our managed farmland near Bangalore include hassle free maintenance.",
              },
              {
                number: "04",
                question:
                  "Can I build a farmhouse on agricultural land in Karnataka?",
                answer:
                  "Building a farmhouse depends on the property's legal status, applicable land-use rules and local building regulations. If you plan to buy agricultural land in Karnataka or are considering whether agricultural land can be used to build a farmhouse in Karnataka, Under Section 95 of the Karnataka Land Revenue Act, 1964, agricultural land may be used for a limited farmhouse (not exceeding 10% of the holding).",
              },
              {
                number: "05",
                question:
                  "How does Vanatvam promote biodiversity and natural farming?",
                answer:
                  "Vanatvam focuses on native trees, fruit-bearing plants and flowering species that support birds, bees, butterflies and other wildlife. Inspired by traditional Indian forest gardens, including Nakshatra Vana and Navagraha Vana, our approach encourages biodiversity and a closer connection with nature. For those interested in farmland for sustainable living in Karnataka, our projects bring together natural surroundings and thoughtfully managed green spaces.",
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

      <Footer />
    </>
  );
}
