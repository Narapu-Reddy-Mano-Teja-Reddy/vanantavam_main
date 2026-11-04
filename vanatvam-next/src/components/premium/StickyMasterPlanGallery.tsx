"use client";

import { motion, useReducedMotion } from "framer-motion";

export type MasterPlanItem = {
  id: string;
  name: string;
  img: string;
  code?: string;
};

export type StickyMasterPlanGalleryProps = {
  eyebrow?: string;
  title?: string;
  items: MasterPlanItem[];
};

export default function StickyMasterPlanGallery({
  eyebrow = "MASTER PLAN HIGHLIGHTS",
  title = "Sanctuary Amenities",
  items,
}: StickyMasterPlanGalleryProps) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        position: "relative",
        paddingBottom: "40px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <span
          style={{
            color: "var(--accent-gold, #C6A265)",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "6px",
          }}
        >
          {eyebrow}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.9rem, 3vw, 2.4rem)",
            color: "var(--bg-dark-forest, #122217)",
            margin: 0,
            fontWeight: 600,
          }}
        >
          {title}
        </h3>
      </div>

      {items.map((card, i) => (
        <motion.div
          key={card.id}
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.08 * i,
          }}
          whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.3 } }}
          style={{
            position: "sticky",
            top: `${140 + i * 22}px`,
            zIndex: i + 1,
            height: "380px",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 16px 45px rgba(18, 34, 23, 0.22)",
            border: "1px solid rgba(255,255,255,0.18)",
            background: "#122217",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img
              src={card.img}
              alt={card.name}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(14,26,18,0.88) 0%, rgba(14,26,18,0.2) 60%, rgba(0,0,0,0) 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "32px",
              }}
            >
              {card.code && (
                <span
                  style={{
                    color: "var(--accent-gold, #C6A265)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.16em",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  {card.code}
                </span>
              )}

              <h3
                style={{
                  color: "#FFFFFF",
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  margin: 0,
                  textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                }}
              >
                {card.name}
              </h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
