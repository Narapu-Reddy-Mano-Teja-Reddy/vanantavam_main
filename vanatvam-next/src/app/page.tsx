"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
} from "lucide-react";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import RevealText from "@/components/premium/RevealText";
import Magnetic from "@/components/premium/Magnetic";
import Counter from "@/components/premium/Counter";
import TiltCard from "@/components/premium/TiltCard";
import { useLenis } from "@/components/premium/SmoothScroll";

import ApertureRevealCarousel, { ApertureSlide } from "@/components/premium/ApertureRevealCarousel";

const heroSlides = [
  {
    id: "brindavana",
    name: "BRINDAVANA",
    location: "Pavagada · 30 Acres",
    tagline:
      "Our benchmark project — barren land reborn as a thriving forest ecosystem.",
    img: "/assets/project-images/Ananthavana/hero_image_2.jpg",
  },
  {
    id: "madhuvana",
    name: "MADHUVANA",
    location: "Maddur · 18 Acres",
    tagline: "A dense water-forest ecosystem built around 250+ native trees.",
    img: "/assets/project-images/Maduvana/hero.png",
  },
  {
    id: "anantavana",
    name: "ANANTAVANA",
    location: "Near Kabini · 35 Acres",
    tagline: "Living within the Bandipur–Nagarhole wildlife corridor.",
    img: "/assets/project-images/Ananthavana/hero_image.jpg",
  },
  {
    id: "eeshavana",
    name: "EESHAVANA",
    location: "Kollegala · Cauvery Riverfront",
    tagline: "A premium riverfront community on the sacred Cauvery.",
    img: "/assets/project-images/Esahavana/EV%20River%20View%201.jpg",
  },
];

const livingEcosystemSlides: ApertureSlide[] = [
  {
    id: "brindavana",
    name: "BRINDAVANA",
    location: "PAVAGADA · 30 ACRES",
    badge: "BENCHMARK REGENERATION",
    category: "Benchmark Ecological Community",
    tagline:
      "A benchmark in ecological regeneration, turning barren land into a thriving Nakshatra Vana forest ecosystem.",
    highlights: ["Nakshatra Vana Groves", "Groundwater Recharged", "Zero Chemical Soil"],
    img: "/assets/project-images/Brindavana/Rainy%20Countryside%20Pond%20Reflections.png",
    link: "/brindavana",
  },
  {
    id: "madhuvana",
    name: "MADHUVANA",
    location: "MADDUR · 18 ACRES",
    badge: "WATER-FOREST SANCTUARY",
    category: "Water-Forest Living Estate",
    tagline:
      "A dense water-forest ecosystem built around 250+ native trees and tranquil farm courtyards.",
    highlights: ["250+ Native Trees", "Natural Waterbodies", "Vernacular Architecture"],
    img: "/assets/project-images/Maduvana/Sunlit%20Terracotta%20Cottage%20and%20Lush%20Garden.png",
    link: "/madhuvana",
  },
  {
    id: "anantavana",
    name: "ANANTAVANA",
    location: "NEAR KABINI · 35 ACRES",
    badge: "WILDLIFE CORRIDOR",
    category: "Wildlife Corridor Sanctuary",
    tagline:
      "Nestled in the Bandipur wildlife corridor, connecting heritage eco-architecture with pristine wilderness.",
    highlights: ["Wildlife Buffer Zone", "Ancient Tree Canopies", "Organic Farm Life"],
    img: "/assets/project-images/Ananthavana/hero_image.jpg",
    link: "/anantavana",
  },
  {
    id: "eeshavana",
    name: "EESHAVANA",
    location: "KOLLEGALA · CAUVERY RIVERFRONT",
    badge: "RIVERFRONT COMMUNITY",
    category: "Riverfront Nature Community",
    tagline:
      "A premier riverfront sanctuary on the sacred banks of Cauvery with pristine waterscapes.",
    highlights: ["Direct Cauvery Riverfront", "Sacred Groves", "Private Green Estates"],
    img: "/assets/project-images/Esahavana/Riverside%20view.png",
    link: "/eeshavana",
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
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                color: "#FFF",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Ecological Communities in Karnataka
            </motion.span>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span
                  style={{
                    display: "block",
                    color: "var(--accent-gold)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    marginBottom: "16px",
                  }}
                >
                  0{activeSlide + 1} / 0{heroSlides.length} · {slide.location}
                </span>
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
              right: "auto",
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
              right: "auto",
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

      {/* Ambient marquee strip — reinforces the "six ecosystems" scale */}
      <div className="vana-marquee">
        <div className="vana-marquee-track">
          {Array(2)
            .fill(null)
            .map((_, rep) => (
              <div className="vana-marquee-group" key={rep}>
                {["Brindavana", "Madhuvana", "Anantavana", "Eeshavana"].map(
                  (name) => (
                    <span key={name} className="vana-marquee-item">
                      {name}{" "}
                      <Leaf
                        className="size-4"
                        strokeWidth={1.5}
                        style={{
                          display: "inline",
                          margin: "0 28px",
                          color: "var(--accent-gold)",
                        }}
                      />
                    </span>
                  ),
                )}
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
                Vanatvam creates Natural Sustainable Farm Communities across
                Karnataka. We thoughtfully develop farmland into greener,
                nature-led places where people can own land, enjoy time outdoors
                and become part of a community that values the natural world.
              </p>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#556358",
                  lineHeight: 1.8,
                  marginBottom: "24px",
                }}
              >
                We start by understanding the land — its soil, water, trees and
                natural character. We then plan access, shared spaces, tree
                groves and nature-based experiences around the landscape, rather
                than treating nature as leftover space.
              </p>

              {/* Ancient Wisdom Callout Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(198,162,101,0.12) 0%, rgba(18,34,23,0.04) 100%)",
                  borderLeft: "4px solid var(--accent-gold)",
                  padding: "24px 28px",
                  borderRadius: "0 18px 18px 0",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                  }}
                >
                  <Sparkles
                    className="size-4"
                    style={{ color: "var(--accent-gold)" }}
                  />
                  <span
                    style={{
                      fontSize: "0.8rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      color: "var(--bg-dark-forest)",
                    }}
                  >
                    Ancient Wisdom · Living Landscapes
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.98rem",
                    color: "var(--bg-dark-forest)",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  &ldquo;Our inspiration draws from India’s long relationship
                  with sacred groves and the ecological ideas described in texts
                  such as Varahamihira’s <em>Brihat Samhita</em>.&rdquo;
                </p>
              </motion.div>

              {/* Quote block */}
              <div
                style={{
                  borderLeft: "3px solid #1E352F",
                  paddingLeft: "22px",
                  marginBottom: "32px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.25rem",
                    color: "var(--bg-dark-forest)",
                    fontStyle: "italic",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  &ldquo;Vana means forest. Tvam means you. The forest is not
                  separate from us — we are part of it.&rdquo;
                </p>
              </div>

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
                A DIFFERENT WAY TO NURTURE THE LAND
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
                Not just a farmland developer.
                <br />
                <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                  A landscape-led approach.
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
                Conventional development often ends at the transaction. At
                Vanatvam, the work is designed to continue — as the landscape
                matures, experiences take root and people become stewards of the
                place.
              </motion.p>
            </div>

            {/* RIGHT COLUMN: Overlapping Scrolling Approach Cards */}
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
                  num: "01 / Nature first",
                  title: "Start with the land",
                  desc: "We look for natural character — soil, water, vegetation and ecological potential — before shaping the plan.",
                },
                {
                  num: "02 / Biodiversity",
                  title: "Design for life",
                  desc: "Native trees, layered planting, water-sensitive spaces and habitat are considered part of the design, not decoration.",
                },
                {
                  num: "03 / Experience",
                  title: "Make nature part of life",
                  desc: "Trails, ponds, cottages, gardens and gathering spaces give families meaningful reasons to return to the land.",
                },
                {
                  num: "04 / Community",
                  title: "Grow a shared legacy",
                  desc: "Individual ownership sits within a wider landscape experienced collectively and cared for over time.",
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
                    top: `${140 + i * 22}px` /* Stacks cleanly one over another with an offset */,
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

      {/* When Nature Takes Over - Evolving Ecosystem */}
      <section
        style={{
          padding: "clamp(80px, 10vh, 120px) 0",
          background: "var(--bg-cream)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "90px",
              alignItems: "center",
            }}
          >
            {/* Image column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              style={{
                flex: "1 1 420px",
                borderRadius: "28px",
                overflow: "hidden",
                height: "540px",
                boxShadow: "0 30px 65px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src="/assets/project-images/Maduvana/Serene%20Tropical%20Garden%20Pond%20Retreat.png"
                alt="New growth on native leaf"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>

            {/* Content column */}
            <div style={{ flex: "1 1 440px" }}>
              <span
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
                When Nature Takes Over
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.4rem, 4.5vw, 3.3rem)",
                  color: "var(--bg-dark-forest)",
                  lineHeight: 1.15,
                  marginBottom: "22px",
                }}
              >
                <RevealText>We plant the beginning.</RevealText>
                <br />
                <RevealText
                  delay={0.1}
                  style={{ fontStyle: "italic", color: "var(--accent-gold)" }}
                >
                  Nature builds the rest.
                </RevealText>
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  marginBottom: "40px",
                }}
              >
                Vanatvam creates diverse and dense starter ecosystems. Over
                time, birds, bees, insects, and other natural agents begin
                carrying seeds, pollinating plants, and expanding vegetation
                beyond the areas originally planted. This is what we call an{" "}
                <strong
                  style={{ color: "var(--bg-dark-forest)", fontWeight: 500 }}
                >
                  Evolving Ecosystem
                </strong>
                .
              </p>

              <div>
                {[
                  {
                    icon: "fa-hands-holding-circle",
                    title: "Human Effort Creates The Foundation",
                    text: "We carefully select 200+ native tree species, establish soil microbial networks, and construct rainwater harvesting swales.",
                  },
                  {
                    icon: "fa-seedling",
                    title: "Nature Creates The Future",
                    text: "Natural agents propagate seeds into dense multi-tier canopy forests — a process measured not in months, but in years and generations.",
                  },
                ].map((item, i, arr) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    style={{
                      display: "flex",
                      gap: "20px",
                      position: "relative",
                      paddingBottom: i < arr.length - 1 ? "32px" : 0,
                    }}
                  >
                    {i < arr.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          left: "23px",
                          top: "50px",
                          bottom: 0,
                          width: "1px",
                          background: "rgba(198,162,101,0.3)",
                        }}
                      />
                    )}
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "var(--bg-cream)",
                        border: "1px solid rgba(198,162,101,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent-gold)",
                        fontSize: "1.15rem",
                        flexShrink: 0,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.25rem",
                          color: "var(--bg-dark-forest)",
                          marginBottom: "8px",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          color: "var(--text-muted)",
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: How we create value — step by step. */}
      {/* Section 7: How we create value — step by step with sticky left header and overlapping scrolling cards */}
      <section
        style={{
          padding: "clamp(100px, 14vh, 160px) 0",
          background: "#FBF9F5",
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
                FROM LAND TO LIVING EXPERIENCE
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
                How we create value —<br />
                <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                  step by step.
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
                  margin: 0,
                }}
              >
                Every place has its own character. Our process is designed to
                respect it, restore what can be nurtured and create a community
                that can grow with the landscape.
              </motion.p>
            </div>

            {/* RIGHT COLUMN: Overlapping Scrolling Steps */}
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
                  num: "01",
                  title: "Select land with character",
                  desc: "Understand the water, soil, terrain, vegetation and potential of a place.",
                },
                {
                  num: "02",
                  title: "Restore what exists",
                  desc: "Strengthen the landscape through native planting, water care and biodiversity spaces.",
                },
                {
                  num: "03",
                  title: "Design around nature",
                  desc: "Integrate access, shared spaces and amenities with the natural setting.",
                },
                {
                  num: "04",
                  title: "Create reasons to return",
                  desc: "Build experiences around walking, staying, gathering, learning and exploring.",
                },
                {
                  num: "05",
                  title: "Build a community",
                  desc: "Invite people to live with the landscape, care for it and pass it forward.",
                },
              ].map((step, i) => (
                <motion.div
                  key={step.num}
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
                    top: `${140 + i * 20}px` /* Stacks cleanly one over another with an offset */,
                    background: "#FFFFFF",
                    border: "1px solid rgba(198,162,101,0.25)",
                    borderRadius: "16px",
                    padding: "clamp(32px, 4vw, 44px)",
                    boxShadow: "0 12px 36px rgba(45, 55, 48, 0.06)",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: i + 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "2rem",
                        color: "var(--accent-gold)",
                        lineHeight: 1,
                        fontWeight: 600,
                      }}
                    >
                      {step.num}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#8A9A86",
                        fontWeight: 600,
                      }}
                    >
                      Phase {step.num} / 05
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.35rem, 2vw, 1.6rem)",
                      color: "var(--bg-dark-forest)",
                      fontWeight: 600,
                      lineHeight: 1.25,
                      marginBottom: "12px",
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "1.02rem",
                      color: "#687B63",
                      lineHeight: 1.7,
                      margin: 0,
                      fontWeight: 400,
                      maxWidth: "90%",
                    }}
                  >
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: We create the conditions. Nature does the rest. */}
      <section
        style={{
          padding: "clamp(90px, 12vh, 130px) 0",
          background: "#0F1D14",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "70px",
              alignItems: "center",
            }}
          >
            {/* Left Content Column */}
            <div style={{ flex: "1 1 520px" }}>
              <span
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "20px",
                }}
              >
                BIODIVERSITY BY DESIGN
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.6rem, 5vw, 4.4rem)",
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontWeight: 600,
                  marginBottom: "28px",
                }}
              >
                We create the conditions.
                <br />
                <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                  Nature does the rest.
                </span>
              </h2>
              <p
                style={{
                  fontSize: "1.12rem",
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.8,
                  marginBottom: "16px",
                  fontWeight: 400,
                }}
              >
                Our landscapes are planned around the relationships that sustain
                life: trees and soil, water and habitat, birds and pollinators,
                people and place. Over time, a diverse and thoughtfully nurtured
                landscape can become richer and more resilient.
              </p>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.8,
                  marginBottom: "44px",
                }}
              >
                Across Vanatvam communities, more than 200 varieties of trees
                and plants have been introduced or conserved, including native
                and ecologically significant species. The intention is habitat —
                not simply ornamental greenery.
              </p>

              {/* 2x2 Metric Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "32px 40px",
                  borderTop: "1px solid rgba(255,255,255,0.12)",
                  paddingTop: "32px",
                  marginBottom: "36px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "2.5rem",
                      color: "#FFFFFF",
                      fontWeight: 600,
                      lineHeight: 1,
                      marginBottom: "8px",
                    }}
                  >
                    200+
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.5,
                    }}
                  >
                    Tree and plant varieties
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "2.5rem",
                      color: "#FFFFFF",
                      fontWeight: 600,
                      lineHeight: 1,
                      marginBottom: "8px",
                    }}
                  >
                    5,000+
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.5,
                    }}
                  >
                    Trees cited for Madhuvana in brand material
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "2.5rem",
                      color: "#FFFFFF",
                      fontWeight: 600,
                      lineHeight: 1,
                      marginBottom: "8px",
                    }}
                  >
                    10,000+
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.5,
                    }}
                  >
                    Trees planned/cited for Anantavana in brand material
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "2.2rem",
                      color: "var(--accent-gold)",
                      fontWeight: 600,
                      lineHeight: 1.1,
                      marginBottom: "8px",
                    }}
                  >
                    Native-first
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.5,
                    }}
                  >
                    Planting and habitat thinking
                  </div>
                </div>
              </div>

              {/* Sacred Vana Pill Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {[
                  "Nakshatra Vana",
                  "Navagraha Vana",
                  "Saraswathi Vana",
                  "Vinayaka Vana",
                  "Ashoka Vana",
                ].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.78rem",
                      padding: "8px 18px",
                      borderRadius: "30px",
                      border: "1px solid rgba(255,255,255,0.22)",
                      color: "rgba(255,255,255,0.85)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Image Column */}
            <div style={{ flex: "1 1 420px", position: "relative" }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  height: "560px",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <img
                  src="/assets/project-images/Ananthavana/hero_image_2.jpg"
                  alt="Ancient tall trees sunlit forest grove"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Four Unique Expressions of Nature's Abundance — Aperture Reveal Carousel */}
      <section
        className="projects-section relative w-full overflow-hidden"
        id="projects"
        style={{
          background: "#0A1510",
          padding: 0,
        }}
      >
        {/* Full-width clean 100vh Aperture Reveal Slider */}
        <div className="w-full relative overflow-hidden">
          <ApertureRevealCarousel
            slides={livingEcosystemSlides}
            autoPlayInterval={7000}
            height="h-screen min-h-[640px]"
          />
        </div>
      </section>

      {/* See what your weekends could look like - Landscape Gallery */}
      <section
        style={{
          padding: "clamp(60px, 8vh, 100px) 0",
          background: "var(--bg-cream)",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <span
              className="subtitle-tag"
              style={{ color: "var(--accent-gold)" }}
            >
              LIFE AT THE FARM
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                color: "var(--bg-dark-forest)",
                marginTop: "16px",
                letterSpacing: "-0.02em",
                fontStyle: "italic",
              }}
            >
              See what your weekends could look like.
            </h2>
          </div>
        </div>

        {/* CSS Marquee Track for Landscape Images */}
        <div
          className="weekend-marquee"
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            padding: "10px 0",
          }}
        >
          <div
            className="weekend-marquee-track"
            style={{
              display: "flex",
              width: "calc(400px * 12)",
              animation: "marqueeScroll 40s linear infinite",
            }}
          >
            {/* We duplicate the images twice to create an infinite scroll loop */}
            {[...Array(2)].map((_, loopIndex) => (
              <div key={loopIndex} style={{ display: "flex" }}>
                {[
                  {
                    img: "/assets/project-images/Brindavana/Sunny%20Tropical%20Banana%20Orchard.png",
                    alt: "Lush tropical banana orchard",
                  },
                  {
                    img: "/assets/project-images/Brindavana/Vibrant%20Tropical%20Garden%20Nursery.png",
                    alt: "Sapling nursery planting native species",
                  },
                  {
                    img: "/assets/project-images/Esahavana/20260731_113013.jpg.jpeg",
                    alt: "Lush tree canopy along serene trail",
                  },
                  {
                    img: "/assets/project-images/Maduvana/Modern%20Brick%20Courtyard%20with%20Arched%20Canopy.png",
                    alt: "Sustainable brick pavilion and courtyard",
                  },
                  {
                    img: "/assets/project-images/Brindavana/Tropical%20Garden%20Pathway%20Tunnel.png",
                    alt: "Verdant green foliage garden tunnel",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      width: "400px",
                      height: "280px",
                      margin: "0 12px",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes marqueeScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .weekend-marquee-track:hover {
            animation-play-state: paused !important;
          }
        `,
          }}
        />
      </section>
{/* Nature. Community. Future. */}
      <section
        style={{
          padding: "clamp(90px, 12vh, 140px) 0",
          background: "#F9F8F6",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60vw",
            height: "40vw",
            background:
              "radial-gradient(ellipse, rgba(198,162,101,0.08) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
        <div className="container relative" style={{ zIndex: 1 }}>
          <div
            style={{
              textAlign: "center",
              maxWidth: "680px",
              margin: "0 auto 70px",
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                color: "var(--accent-gold)",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "16px",
              }}
            >
              A Different Way To Develop Land
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)",
                color: "var(--bg-dark-forest)",
                lineHeight: 1.15,
                fontWeight: 600,
              }}
            >
              Nature. Community. Future.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ 
                color: "var(--text-muted)", 
                marginTop: "16px",
                fontSize: "1.05rem",
                fontWeight: 300,
              }}
            >
              Vanatvam brings together four core pillars that are often treated
              separately in real estate development:
            </motion.p>
          </div>

          {/* Premium Grid Layout */}
          <div
            className="philosophy-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "28px",
            }}
          >
            {[
              {
                icon: TreePine,
                num: "01",
                title: "Nature",
                text: "Native forests, biodiversity creation, soil regeneration, and long-term ecological restoration.",
              },
              {
                icon: Users,
                num: "02",
                title: "People",
                text: "Communities designed around meaningful shared experiences, wellness, and quiet reflection in nature.",
              },
              {
                icon: Target,
                num: "03",
                title: "Purpose",
                text: "A commercially viable managed farmland investment model that supports long-term ecological growth.",
              },
              {
                icon: Leaf,
                num: "04",
                title: "Biodiversity",
                text: "Rich ecological diversity, fostering habitats that support endemic species and complex natural webs.",
              },
            ].map((t, i) => (
              <motion.div
                key={t.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 1, 0.5, 1] }}
                whileHover={{ 
                  y: -10, 
                  borderColor: "rgba(198,162,101,0.4)",
                  boxShadow: "0 24px 50px rgba(14,26,18,0.08)",
                  transition: { duration: 0.3 } 
                }}
                className="philosophy-card"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(45,106,79,0.08)",
                  borderRadius: "24px",
                  padding: "40px 32px",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                }}
              >
                {/* Decorative Subtle Background Accent on Hover/Card */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "120px",
                    height: "120px",
                    background: "radial-gradient(circle, rgba(198,162,101,0.06) 0%, transparent 70%)",
                    borderRadius: "0 24px 0 100%",
                    zIndex: 0,
                  }}
                />

                <div 
                  className="philosophy-num"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "2.2rem",
                    fontWeight: 400,
                    color: "rgba(198,162,101,0.35)",
                    marginBottom: "16px",
                    lineHeight: 1,
                  }}
                >
                  {t.num}
                </div>

                <div 
                  className="philosophy-icon-wrap"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "16px",
                    background: "rgba(45,106,79,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--bg-dark-forest)",
                    marginBottom: "24px",
                  }}
                >
                  <t.icon className="size-6" strokeWidth={1.5} />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.5rem",
                    color: "var(--bg-dark-forest)",
                    margin: "0 0 12px",
                    fontWeight: 600,
                  }}
                >
                  {t.title}
                </h3>

                <p
                  style={{
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    margin: 0,
                    fontSize: "0.95rem",
                    fontWeight: 300,
                  }}
                >
                  {t.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Events */}
      <section
        style={{
          padding: "clamp(80px, 10vh, 120px) 0",
          background: "var(--bg-cream)",
        }}
      >
        <div className="container">
          <div
            style={{
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto 60px",
            }}
          >
            <span
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
              🌟 Community Events at Vanatvam
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.4rem, 4.5vw, 3.5rem)",
                color: "var(--bg-dark-forest)",
                lineHeight: 1.15,
                marginBottom: "24px",
              }}
            >
              Celebrating Life, Nature, and Togetherness
            </h2>
            <p
              style={{
                fontSize: "1.15rem",
                color: "var(--text-muted)",
                lineHeight: 1.8,
              }}
            >
              At both Madhuvana and AnantaVana, we host vibrant seasonal
              festivals that bring our community closer to the land—and to each
              other. Each event transforms our shared spaces—courtyards,
              pondside lawns, and open-air plazas—into stages for memorable
              experiences, nurturing a true sense of belonging and harmony
              within our farm community.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "40px",
              marginBottom: "60px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: "#FFF",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ width: "100%", height: "240px" }}>
                <img
                  src="/Event%20images/DSC08963.JPG"
                  alt="Deepotsava celebration"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "40px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.8rem",
                    color: "var(--bg-dark-forest)",
                    marginBottom: "16px",
                  }}
                >
                  Deepotsava
                </h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                  A magical evening where hundreds of earthen lamps are lovingly
                  lit across the farm, illuminating pathways, courtyards, and
                  green spaces—creating a warm, communal glow and a sense of
                  shared wonder.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                background: "#FFF",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ width: "100%", height: "240px" }}>
                <img
                  src="/Event%20images/DSC08964%20(1).JPG"
                  alt="Vasantotsava celebration"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "40px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.8rem",
                    color: "var(--bg-dark-forest)",
                    marginBottom: "16px",
                  }}
                >
                  Vasantotsava
                </h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                  A joyful celebration of spring, complete with nature-inspired
                  arts, guided walks, interactive workshops, and farm-to-table
                  gatherings—designed to awaken the senses and connect us all
                  with the rhythms of growth and renewal.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                background: "#FFF",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ width: "100%", height: "240px" }}>
                <img
                  src="/Event%20images/DSC09025.JPG"
                  alt="Seasonal gatherings"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "40px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.8rem",
                    color: "var(--bg-dark-forest)",
                    marginBottom: "16px",
                  }}
                >
                  Seasonal Gatherings
                </h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                  From planting festivals, to stargazing nights, nature
                  workshops, communal cooking, and storytelling by the
                  bonfire—we host events that celebrate biodiversity, culture,
                  and sustainable living.
                </p>
              </div>
            </motion.div>
          </div>

          <div
            className="weekend-marquee"
            style={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              padding: "10px 0",
            }}
          >
            <div
              className="weekend-marquee-track"
              style={{
                display: "flex",
                width: "calc(350px * 12)",
                animation: "vanaMarqueeScroll 40s linear infinite",
              }}
            >
              {[...Array(2)].map((_, loopIndex) => (
                <div key={loopIndex} style={{ display: "flex" }}>
                  {[
                    "/Event%20images/IMG-20240108-WA0006%20(1).jpg",
                    "/Event%20images/IMG-20240108-WA0013.jpg",
                    "/Event%20images/IMG-20240108-WA0023.jpg",
                    "/Event%20images/WhatsApp%20Image%202024-04-02%20at%202.37.57%20PM%20(2)%20(1).jpeg",
                    "/Event%20images/WhatsApp%20Image%202024-04-02%20at%202.38.05%20PM.jpeg",
                    "/Event%20images/WhatsApp%20Image%202024-04-02%20at%202.39.30%20PM%20(2).jpeg",
                  ].map((imgSrc, i) => (
                    <div
                      key={i}
                      style={{
                        width: "350px",
                        height: "240px",
                        margin: "0 12px",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={imgSrc}
                        alt={`Vanatvam event highlight ${i + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
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
                <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                  Tourism &amp; Hospitality.
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
                Vanatvam&apos;s ecological model has received distinguished
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
                    State-Level Industry Honor
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
                    Ecological &amp; Agrarian Excellence
                  </span>
                </div>
              </div>
            </motion.div>

            {/* FKCCI Citation Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                background: "#FFFFFF",
                padding: "48px 40px",
                borderRadius: "28px",
                boxShadow: "0 25px 60px rgba(0,0,0,0.06)",
                border: "1px solid rgba(198,162,101,0.25)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "6px",
                  background:
                    "linear-gradient(90deg, var(--accent-gold), #E8D3A7, var(--accent-gold))",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "var(--bg-cream)",
                    border: "2px solid rgba(198,162,101,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Award
                    className="size-8"
                    style={{ color: "var(--accent-gold)" }}
                  />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      color: "var(--bg-dark-forest)",
                      margin: 0,
                      fontWeight: 700,
                    }}
                  >
                    FKCCI Excellence
                  </h3>
                  <span
                    style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}
                  >
                    Federation of Karnataka Chambers of Commerce
                  </span>
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  paddingTop: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--accent-gold)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Award Category
                  </span>
                  <div
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--bg-dark-forest)",
                      fontFamily: "var(--font-serif)",
                      fontWeight: 600,
                    }}
                  >
                    Excellence in Tourism &amp; Nature Hospitality
                  </div>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--accent-gold)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Honoring Institution
                  </span>
                  <div
                    style={{
                      fontSize: "1.05rem",
                      color: "var(--bg-dark-forest)",
                      fontWeight: 500,
                    }}
                  >
                    FKCCI (Estd. 1916 by Bharat Ratna Sir M. Visvesvaraya)
                  </div>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--accent-gold)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Impact Recognized
                  </span>
                  <div
                    style={{
                      fontSize: "0.95rem",
                      color: "#556358",
                      lineHeight: 1.6,
                    }}
                  >
                    Revival of traditional Karnataka tree groves, groundwater
                    aquifers, and natural agrarian living ecosystems.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Leadership Section */}
      <section
        style={{
          padding: "clamp(90px, 12vh, 130px) 0",
          background: "#122217",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "80px",
              alignItems: "center",
            }}
          >
            {/* Founder Visual Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ flex: "1 1 420px", position: "relative" }}
            >
              <div
                style={{
                  borderRadius: "28px",
                  overflow: "hidden",
                  height: "520px",
                  boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <img
                  src="/assets/project-images/Brindavana/Farmer%20Tending%20Lush%20Seedlings.png"
                  alt="Founder leadership and land care"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Floating Quote Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-25px",
                  right: "-15px",
                  background: "rgba(18,34,23,0.92)",
                  backdropFilter: "blur(16px)",
                  padding: "28px 32px",
                  borderRadius: "20px",
                  border: "1px solid rgba(198,162,101,0.4)",
                  maxWidth: "320px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "2rem",
                    color: "var(--accent-gold)",
                    lineHeight: 0.5,
                    display: "block",
                    marginBottom: "14px",
                  }}
                >
                  &ldquo;
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.18rem",
                    fontStyle: "italic",
                    margin: 0,
                    lineHeight: 1.5,
                    color: "#FFFFFF",
                  }}
                >
                  If you want to save the wildlife, start by saving the trees.
                </p>
                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "0.8rem",
                    color: "var(--accent-gold)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  — Deepak Kasthuri
                </div>
              </div>
            </motion.div>

            {/* Founder Bio Column */}
            <div style={{ flex: "1 1 500px" }}>
              <span
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "18px",
                }}
              >
                FOUNDER &amp; MANAGING DIRECTOR
              </span>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.6rem, 5vw, 4rem)",
                  color: "#FFFFFF",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  fontWeight: 600,
                  marginBottom: "20px",
                }}
              >
                Deepak Kasthuri
              </h2>

              <p
                style={{
                  fontSize: "1.2rem",
                  color: "var(--accent-gold)",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  marginBottom: "24px",
                }}
              >
                Pioneering Karnataka&apos;s Nature-Led Managed Farmland Movement
              </p>

              <p
                style={{
                  fontSize: "1.12rem",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.8,
                  marginBottom: "18px",
                  fontWeight: 400,
                }}
              >
                Driven by a profound reverence for India&apos;s sacred forestry
                traditions, Deepak Kasthuri founded Vanatvam to dismantle the
                false boundary between urban families and the natural earth.
              </p>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.8,
                  marginBottom: "32px",
                }}
              >
                Under his leadership, Vanatvam has transformed over 100 acres of
                barren and depleted soil across Pavagada, Maddur, Kabini, and
                Kollegala into biodiverse multi-canopy ecosystems. His
                pioneering work unites regenerative permaculture, Vedic
                forestry, and hassle-free managed land ownership.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "24px",
                  borderTop: "1px solid rgba(255,255,255,0.12)",
                  paddingTop: "28px",
                  marginBottom: "36px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Registered Entity
                  </span>
                  <strong
                    style={{
                      fontSize: "1.05rem",
                      color: "#FFFFFF",
                      fontWeight: 600,
                    }}
                  >
                    Vanatvam Private Limited
                  </strong>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Headquarters
                  </span>
                  <strong
                    style={{
                      fontSize: "1.05rem",
                      color: "#FFFFFF",
                      fontWeight: 600,
                    }}
                  >
                    Bengaluru, Karnataka
                  </strong>
                </div>
              </div>

              <Magnetic strength={0.25}>
                <Link
                  href="/about"
                  className="btn-pill btn-pill-gold"
                  style={{
                    padding: "14px 32px",
                    fontSize: "1rem",
                    fontWeight: 700,
                  }}
                >
                  Read Our Full Story <ArrowRight className="size-4" />
                </Link>
              </Magnetic>
            </div>
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
                Vanatvam.
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

      {/* Final CTA: The future is not built. It is grown. */}

      <Footer />
    </>
  );
}
