'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export default function FloatingController() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        document.body.classList.add('at-top');
      } else {
        document.body.classList.remove('at-top');
      }

      setScrolled(window.scrollY > 120);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          key="enquire-tab"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          style={{
            position: "fixed",
            right: 0,
            top: "38%",
            transform: "translateY(-50%)",
            zIndex: 9990,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link
            href="/contact"
            aria-label="Enquire Now"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #F39C12, #D67E0E)",
              color: "#FFFFFF",
              padding: "16px 12px",
              borderRadius: "12px 0 0 12px",
              boxShadow: "-6px 8px 24px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.2)",
              textDecoration: "none",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontFamily: "var(--font-sans, system-ui, sans-serif)",
              fontSize: "0.92rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "transform 0.25s ease, background 0.25s ease",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(-4px)";
              e.currentTarget.style.background = "linear-gradient(135deg, #E67E22, #C0392B)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0px)";
              e.currentTarget.style.background = "linear-gradient(135deg, #F39C12, #D67E0E)";
            }}
          >
            <Calendar size={16} style={{ transform: "rotate(90deg)" }} />
            <span>Enquire Now</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
