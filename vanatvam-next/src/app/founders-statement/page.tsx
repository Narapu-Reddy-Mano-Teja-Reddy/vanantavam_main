"use client";
import { useEffect, useRef, useState } from "react";
import type { ReactNode, CSSProperties } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionStyle, Variants } from "framer-motion";
import Link from "next/link";
import { Leaf, Compass, ArrowRight, MoveLeft } from "lucide-react";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Magnetic from "@/components/premium/Magnetic";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const COLORS = {
  forest: "#122217",
  forestSoft: "#1E352F",
  cream: "#F6F3EB",
  creamLight: "#FBF9F4",
  creamDeep: "#EBE6DA",
  brown: "#74351F",
  body: "#334A42",
};

/* ------------------------------------------------------------------ */
/*  IMAGES  — replace these paths with your own photos                 */
/*  If a path is wrong, a green gradient shows instead of a broken     */
/*  image, so nothing looks broken while you swap them in.             */
/* ------------------------------------------------------------------ */

const BASE_IMG = "/assets/project-images/Brindavana/Farmer%20Tending%20Lush%20Seedlings.png";

const IMAGES = {
  hero: BASE_IMG,
  belief: BASE_IMG, // e.g. forest canopy / people in nature
  work: BASE_IMG, // e.g. birds, bees, native planting
  roots: BASE_IMG, // e.g. sacred grove / Nakshatra Vana
  community: BASE_IMG, // e.g. cottages, treehouse, watching deck
  journey: BASE_IMG, // e.g. sunrise over the land
  quoteBand: BASE_IMG,
  vision: BASE_IMG,
  projects: {
    Brindavana: BASE_IMG,
    Madhuvana: BASE_IMG,
    Anantavana: BASE_IMG,
  } as Record<string, string>,
};

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type Block = { kind: "p" | "hl"; text: string };

type Chapter = {
  id: "belief" | "work" | "roots" | "community" | "journey";
  no: string;
  title: string;
  caption: string;
  position: string;
  blocks: Block[];
  extra?: "heritage";
};

const HERO_WORDS = ["From", "Our", "Belief", "to", "a", "Living", "Reality"];

const CHAPTERS: Chapter[] = [
  {
    id: "belief",
    no: "01",
    title: "Our Belief",
    caption: "Coexistence",
    position: "30% 50%",
    blocks: [
      {
        kind: "p",
        text: "At Vanatvam, our journey began with a simple belief: humans and nature were always meant to coexist. We were never meant to be separate from the forests, trees, birds and countless living organisms that sustain our world.",
      },
      {
        kind: "p",
        text: "Over time, we have moved away from nature into increasingly hurried and demanding lives. We find ourselves exhausted, disconnected and searching for peace. Yet, the moment we step into a forest, walk beneath a canopy of trees or listen to the morning chorus of birds, something within us begins to settle. We feel lighter, calmer and more at home.",
      },
      {
        kind: "p",
        text: "Perhaps this is because our relationship with nature is far older than modern civilisation. We evolved alongside the natural world, and our minds and bodies continue to respond to its rhythms. Our connection with nature is not merely a preference; it is part of our human story.",
      },
      { kind: "hl", text: "This understanding inspires us to build Vanatvam." },
    ],
  },
  {
    id: "work",
    no: "02",
    title: "Our Work",
    caption: "Living landscapes",
    position: "70% 40%",
    blocks: [
      {
        kind: "p",
        text: "We have brought this belief to life through our projects Brindavana, Madhuvana and Anantavana. Each has taught us something new about the land, its ecology and the delicate relationships that sustain life. As we work with these landscapes, we continue to learn, adapt and refine our approach. We observe what thrives, understand what the land needs and apply that knowledge to create healthier, more biodiverse environments.",
      },
      {
        kind: "p",
        text: "Our work goes beyond planting trees. We conserve native species, nurture rare and endangered plants, restore ecological balance and create habitats for birds, bees, butterflies and other forms of life. We believe a healthy landscape is one where life flourishes in many forms, often beyond what is immediately visible.",
      },
      {
        kind: "p",
        text: "When we see birds returning, bees moving from flower to flower and the land becoming increasingly alive, we are reminded why this work matters. Birds and bees seem to know where nature remains pure, and they choose to visit our projects in larger numbers. Their presence is a quiet affirmation that these landscapes are becoming healthy, welcoming habitats. These are signs of a landscape supporting life. We want our projects to become places where biodiversity is not simply discussed, but experienced every day.",
      },
    ],
  },
  {
    id: "roots",
    no: "03",
    title: "Our Roots",
    caption: "Rooted in tradition",
    position: "50% 30%",
    extra: "heritage",
    blocks: [
      {
        kind: "p",
        text: "We also draw inspiration from India’s traditional and Vedic knowledge systems, which recognised the significance of trees, sacred groves, medicinal plants and the relationship between people and the natural world. Through living experiences inspired by traditions such as Nakshatra Vana and Navagraha Vana, we hope to make this wisdom tangible for today’s generations. We want people to walk these spaces, understand their significance and rediscover the cultural and ecological heritage that belongs to us all.",
      },
    ],
  },
  {
    id: "community",
    no: "04",
    title: "Our Community",
    caption: "Belonging",
    position: "20% 60%",
    blocks: [
      { kind: "p", text: "But our vision extends beyond the land and its biodiversity." },
      {
        kind: "hl",
        text: "We believe that the quality of a community is just as important as the quality of its environment.",
      },
      {
        kind: "p",
        text: "In a world where people are increasingly time-poor, stressed and disconnected, we want to create something deeply meaningful: a peaceful, mindful and nature-conscious community where people respect the land and one another.",
      },
      {
        kind: "p",
        text: "At Vanatvam, we aspire to bring together individuals and families who value simplicity, integrity, sustainability and a deeper connection with life. We want our communities to encourage unhurried conversations, meaningful relationships, shared experiences and a renewed appreciation for the natural world.",
      },
      {
        kind: "p",
        text: "We are creating experiences that help people engage with nature more deeply and experience it in comfort—through thoughtfully designed cottages, treehouses, watching decks, ponds and other spaces that invite observation, reflection and connection. These are not meant to separate people from the landscape, but to help them experience its rhythms more closely and respectfully.",
      },
      {
        kind: "p",
        text: "We are not simply creating places for people to own land or escape their routines. We are working towards places where they can feel a genuine sense of belonging—where the environment nurtures biodiversity and the community nurtures the individual.",
      },
    ],
  },
  {
    id: "journey",
    no: "05",
    title: "Our Journey",
    caption: "Always learning",
    position: "60% 70%",
    blocks: [
      {
        kind: "p",
        text: "We know this is a continuing journey. Every project teaches us something new, and every season reminds us that nature works on its own timescale. We do not claim to have all the answers. We remain students of the land, committed to learning, improving and doing better with every landscape we nurture.",
      },
      {
        kind: "p",
        text: "What we hope to offer is increasingly precious in today’s world: a place where nature can flourish, people can find peace, and a community can grow with shared values and purpose.",
      },
    ],
  },
];

const PROJECTS = [
  {
    id: "brindavana",
    category: "completed",
    name: "BRINDAVANA",
    logo: "/assets/images/Project-Logos/BrindaVana.webp",
    location: "PAVAGADA · 30 ACRES",
    desc: "Our benchmark project demonstrating ecological restoration. What began as largely barren land is evolving into a thriving green ecosystem with deep water harvesting and native tree canopy.",
    img: "/assets/project-images/Brindavana/Sunny%20Tropical%20Banana%20Orchard.png",
    badge: "Completed",
    badgeBg: "var(--bg-dark-forest, #122217)",
    pills: ["Native Canopy", "Rain Catchments"],
  },
  {
    id: "madhuvana",
    category: "water",
    name: "MADHUVANA",
    logo: "/assets/images/Project-Logos/Logo-MadhuVana.svg",
    location: "MADDUR",
    desc: "The Sweet Symphony of Nature. A pristine water-forest ecosystem built around 200+ rare and endangered tree species, with sacred groves like Nakshatra Vana and peaceful cottages.",
    img: "/assets/project-images/Maduvana/hero.png",
    badge: "Water Forest",
    badgeBg: "var(--accent-gold, #C6A265)",
    pills: ["200+ Native Trees", "Sacred Groves"],
  },
  {
    id: "anantavana",
    category: "wildlife",
    name: "ANANTAVANA",
    logo: "/assets/images/Project-Logos/Anantavana.webp",
    location: "NEAR KABINI · 34 ACRES",
    desc: "Set in Kabini’s rich ecological belt, Anantavana brings together dense forests and thriving biodiversity, with farm parcels from 10,000 sq. ft.",
    img: "/assets/project-images/Ananthavana/hero_image.jpg",
    badge: "Wildlife Corridor",
    badgeBg: "#2D6A4F",
    pills: ["Bandipur Corridor", "Heritage Cottages"],
  },
  {
    id: "eeshavana",
    category: "riverfront",
    name: "EESHAVANA",
    logo: "/assets/images/Project-Logos/eeshavanaalogo.webp",
    location: "KOLLEGALA · CAUVERY RIVERFRONT",
    desc: "A riverfront community along the sacred Cauvery, designed around the relationship between people, riparian ecology, and water.",
    img: "/assets/project-images/Esahavana/EV%20Image.png",
    badge: "Cauvery Riverfront",
    badgeBg: "#1B4965",
    pills: ["Cauvery Frontage", "River Ecosystem"],
  },
];

const HERITAGE = ["Nakshatra Vana", "Navagraha Vana"];

const STATS = [
  { value: 100, suffix: "+", label: "Acres regenerated" },
  { value: 4, suffix: "", label: "Locations across Karnataka" },
  { value: 4, suffix: "", label: "Living projects" },
];

const VISION_ROWS = [
  { not: "development at the expense of nature", but: "development that makes room for it" },
  { not: "merely green spaces", but: "living ecosystems" },
  {
    not: "just a collection of landowners",
    but: "a community united by appreciation for the world we are privileged to inhabit",
  },
];

const LEAVES = [
  { left: "8%", size: 16, duration: 16, delay: 0 },
  { left: "22%", size: 11, duration: 21, delay: 4 },
  { left: "41%", size: 14, duration: 18, delay: 8 },
  { left: "63%", size: 12, duration: 23, delay: 2 },
  { left: "78%", size: 18, duration: 17, delay: 6 },
  { left: "92%", size: 11, duration: 20, delay: 10 },
];

/* ------------------------------------------------------------------ */
/*  Variants (typed outside JSX so `ease` is never widened)            */
/* ------------------------------------------------------------------ */

const cardImageVariants: Variants = {
  hover: { scale: 1.08, transition: { duration: 0.9, ease: EASE } },
};

const cardArrowVariants: Variants = {
  hover: { x: 6, transition: { type: "spring", stiffness: 420, damping: 18 } },
};

/* ------------------------------------------------------------------ */
/*  Building blocks                                                    */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  y = 28,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function GoldRule({ width = 56, center = false }: { width?: number; center?: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ width: 0 }}
      whileInView={{ width }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
      style={{
        display: "block",
        height: "2px",
        background: "linear-gradient(90deg, var(--accent-gold), rgba(198,162,101,0.2))",
        margin: center ? "0 auto" : "0",
      }}
    />
  );
}

/** Image that never looks broken: falls back to a green gradient. */
function SmartImage({
  src,
  alt = "",
  style,
}: {
  src: string;
  alt?: string;
  style?: MotionStyle;
}) {
  const [failed, setFailed] = useState(false);
  const base: MotionStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    ...style,
  };

  if (failed) {
    return (
      <motion.div
        aria-hidden="true"
        style={{
          ...base,
          background: "linear-gradient(135deg, #1E352F 0%, #122217 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Leaf size={40} strokeWidth={1.2} style={{ color: "var(--accent-gold)", opacity: 0.5 }} />
      </motion.div>
    );
  }

  return <motion.img src={src} alt={alt} onError={() => setFailed(true)} style={base} />;
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration: 2.2, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, to, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

function ImageFrame({
  src,
  alt,
  caption,
  tag,
  position = "center",
  aspect = "4 / 5",
}: {
  src: string;
  alt: string;
  caption: string;
  tag: string;
  position?: string;
  aspect?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: EASE }}
        style={{
          position: "relative",
          borderRadius: "26px",
          boxShadow: "0 30px 60px rgba(18,34,23,0.22)",
          border: "1px solid rgba(198,162,101,0.45)",
        }}
      >
        <motion.div
          initial={{ clipPath: "inset(14% 14% 14% 14% round 26px)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 26px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.3, ease: EASE }}
          style={{
            position: "relative",
            aspectRatio: aspect,
            overflow: "hidden",
            borderRadius: "26px",
            background: COLORS.forest,
          }}
        >
          <SmartImage
            src={src}
            alt={alt}
            style={{
              inset: "-10% 0",
              height: "120%",
              y: reduceMotion ? 0 : y,
              objectPosition: position,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, transparent 55%, rgba(18,34,23,0.78) 100%)",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "22px",
              bottom: "18px",
              color: "var(--accent-gold)",
              fontSize: "0.68rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            {caption}
          </span>
        </motion.div>
      </motion.div>

      {/* Floating chapter badge */}
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
        style={{
          position: "absolute",
          right: "-10px",
          bottom: "-18px",
          width: "62px",
          height: "62px",
          borderRadius: "50%",
          background: COLORS.forest,
          border: "1px solid rgba(198,162,101,0.7)",
          boxShadow: "0 14px 30px rgba(18,34,23,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "1.1rem",
          color: "var(--accent-gold)",
        }}
      >
        {tag}
      </motion.div>
    </div>
  );
}

function ChapterHeading({ no, title }: { no: string; title: string }) {
  return (
    <div style={{ marginBottom: "26px" }}>
      <Reveal>
        <span
          style={{
            display: "block",
            color: COLORS.brown,
            fontSize: "0.7rem",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          Chapter {no}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            color: COLORS.forestSoft,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            fontWeight: 600,
            margin: "0 0 14px",
          }}
        >
          {title}
        </h2>
      </Reveal>
      <GoldRule />
    </div>
  );
}

function BodyParagraph({ text, dropCap = false }: { text: string; dropCap?: boolean }) {
  const first = text.charAt(0);
  const rest = text.slice(1);
  return (
    <Reveal>
      <p
        style={{
          fontSize: "clamp(0.95rem, 1.15vw, 1.02rem)",
          lineHeight: 1.85,
          color: COLORS.body,
          margin: "0 0 20px",
        }}
      >
        {dropCap ? (
          <>
            <span
              style={{
                float: "left",
                fontFamily: "var(--font-serif)",
                fontSize: "3.4rem",
                lineHeight: 0.85,
                paddingRight: "10px",
                paddingTop: "4px",
                color: COLORS.brown,
                fontWeight: 600,
              }}
            >
              {first}
            </span>
            {rest}
          </>
        ) : (
          text
        )}
      </p>
    </Reveal>
  );
}

function Highlight({ text }: { text: string }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -22 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{
        margin: "10px 0 26px",
        padding: "4px 0 4px 22px",
        borderLeft: "3px solid var(--accent-gold)",
        fontFamily: "var(--font-serif)",
        fontStyle: "italic",
        fontSize: "clamp(1.1rem, 1.9vw, 1.35rem)",
        lineHeight: 1.5,
        color: COLORS.brown,
      }}
    >
      {text}
    </motion.blockquote>
  );
}

function HeritageChips() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", margin: "8px 0 6px" }}>
      {HERITAGE.map((name, i) => (
        <motion.span
          key={name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
          whileHover={{ y: -4, scale: 1.04 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            padding: "10px 18px",
            borderRadius: "999px",
            background: COLORS.forest,
            color: "#FFFFFF",
            border: "1px solid rgba(198,162,101,0.5)",
            fontSize: "0.85rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          <Compass
            className="size-4"
            strokeWidth={1.5}
            aria-hidden="true"
            style={{ color: "var(--accent-gold)" }}
          />
          {name}
        </motion.span>
      ))}
    </div>
  );
}

function ProjectGallery() {
  return (
    <div style={{ marginTop: "76px" }}>
      <Reveal style={{ marginBottom: "34px", textAlign: "center" }}>
        <span
          style={{
            display: "block",
            color: COLORS.brown,
            fontSize: "0.8rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "12px",
          }}
        >
          Where the belief lives
        </span>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            color: COLORS.forestSoft,
            fontWeight: 600,
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          Our Projects
        </h3>
        <p
          style={{
            maxWidth: "650px",
            margin: "14px auto 0",
            fontSize: "1rem",
            lineHeight: 1.8,
            color: COLORS.body,
          }}
        >
          Four distinctive landscapes, united by one vision of living in harmony with nature.
        </p>
        <div style={{ marginTop: "22px" }}>
          <GoldRule width={68} center />
        </div>
      </Reveal>

      <div
        className="founder-projects-row"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        {PROJECTS.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            whileHover={{ y: -7 }}
            style={{
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              background: "#FFFFFF",
              border: "1px solid rgba(198,162,101,0.35)",
              borderRadius: "20px",
              boxShadow: "0 14px 36px rgba(18,34,23,0.09)",
            }}
          >
            <Link
              href={`/${project.id}`}
              aria-label={`Explore ${project.name}`}
              style={{
                display: "block",
                position: "relative",
                height: "210px",
                overflow: "hidden",
                background: COLORS.forest,
              }}
            >
              <motion.div
                variants={cardImageVariants}
                initial="rest"
                whileHover="hover"
                style={{ position: "absolute", inset: 0 }}
              >
                <SmartImage src={project.img} alt={project.name} />
              </motion.div>
              <span
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "14px",
                  padding: "7px 11px",
                  borderRadius: "999px",
                  background: project.badgeBg,
                  color: project.id === "madhuvana" ? COLORS.forest : "#FFFFFF",
                  fontSize: "0.68rem",
                  lineHeight: 1.3,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                {project.badge}
              </span>
            </Link>

            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "20px 18px 22px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  width: "100%",
                  marginBottom: "12px",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.05rem, 1.4vw, 1.4rem)",
                    lineHeight: 1.2,
                    fontWeight: 700,
                    color: COLORS.forestSoft,
                    margin: 0,
                    overflowWrap: "anywhere",
                  }}
                >
                  {project.name}
                </h4>
                <img
                  src={project.logo}
                  alt={`${project.name} logo`}
                  loading="lazy"
                  style={{
                    width: "42px",
                    height: "42px",
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />
              </div>

              <span
                style={{
                  display: "block",
                  color: COLORS.brown,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  lineHeight: 1.6,
                  marginBottom: "13px",
                }}
              >
                {project.location}
              </span>

              <p
                style={{
                  color: COLORS.body,
                  fontSize: "0.86rem",
                  lineHeight: 1.75,
                  margin: "0 0 18px",
                }}
              >
                {project.desc}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "7px",
                  marginTop: "auto",
                  marginBottom: "20px",
                }}
              >
                {project.pills.map((pill) => (
                  <span
                    key={pill}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "6px 9px",
                      borderRadius: "999px",
                      background: COLORS.cream,
                      border: "1px solid rgba(198,162,101,0.28)",
                      color: COLORS.forestSoft,
                      fontSize: "0.7rem",
                      lineHeight: 1.4,
                      fontWeight: 600,
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <Link
                href={`/${project.id}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                  color: COLORS.brown,
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  borderBottom: "1px solid rgba(116,53,31,0.35)",
                  paddingBottom: "5px",
                }}
              >
                Explore Project
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 1050px) {
          .founder-projects-row {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 600px) {
          .founder-projects-row {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}

function PullQuoteBand({ text }: { text: string }) {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(64px, 9vh, 96px) 0",
        background: COLORS.forest,
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
        <SmartImage src={IMAGES.quoteBand} style={{ opacity: 0.22 }} />
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, rgba(18,34,23,0.92) 0%, rgba(30,53,47,0.8) 100%)`,
        }}
      />
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.14, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        style={{
          position: "absolute",
          top: "-30px",
          left: "5%",
          fontFamily: "var(--font-serif)",
          fontSize: "12rem",
          lineHeight: 1,
          color: "var(--accent-gold)",
          pointerEvents: "none",
        }}
      >
        &ldquo;
      </motion.span>
      <div className="container" style={{ position: "relative" }}>
        <Reveal style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.25rem, 2.6vw, 1.85rem)",
              lineHeight: 1.5,
              margin: "0 0 22px",
            }}
          >
            {text}
          </p>
          <GoldRule width={64} center />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FoundersStatementPage() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Hero parallax only (no page progress bar)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(heroProgress, [0, 1], [1.05, 1.18]);
  const textY = useTransform(heroProgress, [0, 1], ["0%", "26%"]);
  const textOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <Navigation />

      <main style={{ background: COLORS.cream }}>
        {/* ------------------------------ Hero ------------------------------ */}
        <section
          ref={heroRef}
          style={{
            position: "relative",
            minHeight: "92svh",
            display: "flex",
            alignItems: "center",
            background: COLORS.forest,
            color: "#FFFFFF",
            overflow: "hidden",
            padding: "140px 0 140px",
          }}
        >
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              y: reduceMotion ? 0 : imgY,
              scale: reduceMotion ? 1 : imgScale,
            }}
          >
            <SmartImage src={IMAGES.hero} style={{ opacity: 0.42 }} />
          </motion.div>

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(18,34,23,0.5) 0%, rgba(18,34,23,0.82) 70%, #122217 100%)",
            }}
          />

          {/* Drifting leaves */}
          {!reduceMotion &&
            LEAVES.map((leaf, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                initial={{ y: "105vh", opacity: 0, rotate: 0 }}
                animate={{ y: "-15vh", opacity: [0, 0.55, 0.55, 0], rotate: 180 }}
                transition={{
                  duration: leaf.duration,
                  delay: leaf.delay,
                  ease: "linear",
                  repeat: Infinity,
                }}
                style={{
                  position: "absolute",
                  left: leaf.left,
                  top: 0,
                  color: "var(--accent-gold)",
                  pointerEvents: "none",
                }}
              >
                <Leaf size={leaf.size} strokeWidth={1.4} />
              </motion.span>
            ))}

          <motion.div
            className="container"
            style={{
              position: "relative",
              y: reduceMotion ? 0 : textY,
              opacity: reduceMotion ? 1 : textOpacity,
            }}
          >
            <div style={{ maxWidth: "860px" }}>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "var(--accent-gold)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "22px",
                }}
              >
                <motion.span
                  aria-hidden="true"
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 1, delay: 0.3, ease: EASE }}
                  style={{ display: "block", height: "1px", background: "var(--accent-gold)" }}
                />
                A Founder&apos;s Statement | Vanatvam
              </motion.span>

              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  fontWeight: 600,
                  margin: "0 0 26px",
                }}
              >
                {HERO_WORDS.map((word, i) => {
                  const accent = i >= 5;
                  return (
                    <span
                      key={word + i}
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        verticalAlign: "top",
                        paddingBottom: "0.12em",
                        marginRight: "0.26em",
                      }}
                    >
                      <motion.span
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 1, delay: 0.25 + i * 0.09, ease: EASE }}
                        style={{
                          display: "inline-block",
                          color: accent ? "var(--accent-gold)" : "#FFFFFF",
                          fontStyle: accent ? "italic" : "normal",
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  );
                })}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
                style={{
                  maxWidth: "560px",
                  fontSize: "clamp(0.95rem, 1.3vw, 1.08rem)",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.8)",
                  margin: "0 0 30px",
                }}
              >
                Humans and nature were always meant to coexist. This is the belief
                that grew into Vanatvam, and the landscapes and community we are
                building from it.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.35 }}
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    border: "1px solid rgba(198,162,101,0.6)",
                    color: "var(--accent-gold)",
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "1.05rem",
                  }}
                >
                  V
                </span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>Deepak Kasthuri</div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    Founder &amp; Managing Director
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ------------------------------ Stats ----------------------------- */}
        <section style={{ position: "relative", zIndex: 3, marginTop: "-62px" }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                background: "#FFFFFF",
                borderRadius: "22px",
                border: "1px solid rgba(198,162,101,0.45)",
                boxShadow: "0 26px 60px rgba(18,34,23,0.16)",
                overflow: "hidden",
                maxWidth: "860px",
                margin: "0 auto",
              }}
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "24px 20px",
                    textAlign: "center",
                    borderLeft: i === 0 ? "none" : "1px solid rgba(198,162,101,0.25)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                      fontWeight: 600,
                      color: COLORS.brown,
                      lineHeight: 1.1,
                    }}
                  >
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: "0.7rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: COLORS.body,
                      fontWeight: 600,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --------------------------- Chapters ---------------------------- */}
        {CHAPTERS.map((chapter, chapterIndex) => {
          const reverse = chapterIndex % 2 === 1;
          return (
            <div key={chapter.id}>
              <section
                id={chapter.id}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  padding: "clamp(64px, 9vh, 100px) 0",
                  background: chapterIndex % 2 === 0 ? COLORS.cream : COLORS.creamLight,
                }}
              >
                {/* Slowly turning watermark leaf */}
                {!reduceMotion && (
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 80, ease: "linear", repeat: Infinity }}
                    style={{
                      position: "absolute",
                      top: "40px",
                      [reverse ? "left" : "right"]: "-60px",
                      color: COLORS.forestSoft,
                      opacity: 0.05,
                      pointerEvents: "none",
                    }}
                  >
                    <Leaf size={280} strokeWidth={0.8} />
                  </motion.span>
                )}

                <div className="container" style={{ position: "relative" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "clamp(36px, 6vw, 80px)",
                      flexDirection: reverse ? "row-reverse" : "row",
                    }}
                  >
                    <div style={{ flex: "1 1 420px", minWidth: 0 }}>
                      <ChapterHeading no={chapter.no} title={chapter.title} />

                      {chapter.blocks.map((block, i) =>
                        block.kind === "hl" ? (
                          <Highlight key={i} text={block.text} />
                        ) : (
                          <BodyParagraph
                            key={i}
                            text={block.text}
                            dropCap={chapterIndex === 0 && i === 0}
                          />
                        ),
                      )}

                      {chapter.extra === "heritage" && <HeritageChips />}
                    </div>

                    <div style={{ flex: "1 1 320px", minWidth: 0, maxWidth: "460px" }}>
                      <ImageFrame
                        src={IMAGES[chapter.id]}
                        alt={chapter.title}
                        caption={chapter.caption}
                        tag={chapter.no}
                        position={chapter.position}
                      />
                    </div>
                  </div>

                  {chapter.id === "work" && <ProjectGallery />}
                </div>
              </section>

              {chapter.id === "work" && (
                <PullQuoteBand text="A healthy landscape is one where life flourishes in many forms, often beyond what is immediately visible." />
              )}
            </div>
          );
        })}

        {/* ---------------------------- Vision ----------------------------- */}
        <section
          style={{
            position: "relative",
            padding: "clamp(80px, 11vh, 120px) 0",
            background: COLORS.forest,
            color: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
            <SmartImage src={IMAGES.vision} style={{ opacity: 0.16 }} />
          </div>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 20% 0%, rgba(198,162,101,0.16) 0%, transparent 55%), linear-gradient(180deg, rgba(18,34,23,0.9) 0%, rgba(18,34,23,0.96) 100%)",
              pointerEvents: "none",
            }}
          />
          <div className="container" style={{ position: "relative" }}>
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <Reveal>
                <span
                  style={{
                    display: "block",
                    color: "var(--accent-gold)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: "12px",
                  }}
                >
                  The Vanatvam Vision
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.6rem, 3.2vw, 2.3rem)",
                    lineHeight: 1.2,
                    fontWeight: 600,
                    margin: "0 0 16px",
                  }}
                >
                  That is the Vanatvam vision.
                </h2>
              </Reveal>
              <GoldRule width={64} />

              <div style={{ marginTop: "42px", display: "grid", gap: "26px" }}>
                {VISION_ROWS.map((row, i) => (
                  <motion.div
                    key={row.but}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
                    style={{
                      display: "grid",
                      gap: "6px",
                      paddingBottom: "24px",
                      borderBottom: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                        color: "rgba(255,255,255,0.45)",
                        textDecoration: "line-through",
                        textDecorationColor: "rgba(198,162,101,0.6)",
                      }}
                    >
                      Not {row.not}
                    </span>
                    <motion.span
                      initial={{ x: -18 }}
                      whileInView={{ x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: EASE }}
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "clamp(1.15rem, 2.2vw, 1.6rem)",
                        lineHeight: 1.4,
                        color: "var(--accent-gold)",
                      }}
                    >
                      but {row.but}.
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              <Reveal style={{ marginTop: "54px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.3rem, 2.6vw, 1.9rem)",
                    lineHeight: 1.45,
                    fontWeight: 500,
                    margin: "0 0 20px",
                  }}
                >
                  Our aspiration is simple: to leave every landscape richer in life
                  and every community member closer to nature.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p
                  style={{
                    fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                    lineHeight: 1.85,
                    color: "rgba(255,255,255,0.78)",
                    fontStyle: "italic",
                    margin: "0 0 36px",
                    maxWidth: "640px",
                  }}
                >
                  Because we believe that when we give nature the space to thrive,
                  we create the conditions for people to thrive alongside it.
                </p>
              </Reveal>

              {/* Signature */}
              <Reveal delay={0.15}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    paddingTop: "24px",
                    borderTop: "1px solid rgba(198,162,101,0.4)",
                    maxWidth: "380px",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      display: "block",
                      width: "30px",
                      height: "1px",
                      background: "var(--accent-gold)",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "1.25rem",
                        color: "var(--accent-gold)",
                      }}
                    >
                      Deepak Kasthuri
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.6)",
                        marginTop: "4px",
                      }}
                    >
                      Founder, Vanatvam
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

         
      </main>

      <Footer />
    </>
  );
}