"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Magnetic from "@/components/premium/Magnetic";

type NavItem = { path: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "Our Story" },
  { path: "/projects", label: "Projects" },
  { path: "/investment", label: "Investment" },
  { path: "/blog", label: "Journal" },
];

const DRAWER_ITEMS: NavItem[] = [
  ...NAV_ITEMS,
  { path: "/contact", label: "Find your project" },
];

// Explicit 4-number tuple so framer-motion accepts it as a cubic-bezier "ease"
const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ---- Typed transitions / variants (kept outside JSX so TS never widens `ease`) ----
const logoTransition: Transition = { duration: 0.4, ease: EASE_PREMIUM };

const ctaTextTransition: Transition = { duration: 0.4, ease: EASE_PREMIUM };

const shineVariants: Variants = {
  rest: { x: "-130%" },
  hover: { x: "130%", transition: { duration: 0.8, ease: EASE_PREMIUM } },
};

const glowVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3 } },
};

const ctaTextVariants: Variants = {
  rest: { letterSpacing: "0em" },
  hover: { letterSpacing: "0.03em" },
};

const arrowVariants: Variants = {
  rest: { x: 0 },
  hover: { x: 5, transition: { type: "spring", stiffness: 500, damping: 18 } },
};

export default function Navigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname = usePathname();
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          width: scrolled ? "min(94%, 1320px)" : "100%",
          y: scrolled ? 16 : 0,
          borderRadius: scrolled ? "44px" : "0px",
          boxShadow: scrolled
            ? "0 24px 60px rgba(18, 34, 23, 0.14), 0 0 0 1px rgba(198, 162, 101, 0.4)"
            : "none",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          x: "-50%",
          zIndex: 1000,
          height: scrolled ? "82px" : "116px",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          overflow: "hidden",
          willChange: "transform, width, background, border-radius, height",
        }}
      >
        {/* Animated gradient background */}
<motion.div
  initial={false}
  animate={{ opacity: scrolled ? 1 : 0 }}
  transition={{ duration: 0.4, ease: "easeInOut" }}
  aria-hidden="true"
  style={{
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(246, 243, 235, 0.94) 100%)",
   
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          className="header-inner"
         style={{
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  padding: scrolled ? "0 26px 0 20px" : "0 40px",
  boxSizing: "border-box",
}}
        >
          {/* Logo */}
          <Link
            href="/"
            className="logo-group"
            onClick={closeDrawer}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              textDecoration: "none",
              height: "100%",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={scrolled ? "scrolled-logo" : "default-logo"}
                src={
                  scrolled
                    ? "/assets/images/main.png"
                    : "/assets/images/vanatvamlogo.webp"
                }
                alt="Vanatvam Logo"
                className="header-logo-img"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                whileHover={{ scale: 1.04 }}
                style={{
                  height: scrolled ? "80px" : "96px",
                  width: "auto",
                  maxWidth: scrolled ? "150px" : "220px",
                  filter: scrolled
                    ? "none"
                    : "drop-shadow(0 2px 10px rgba(0,0,0,0.4))",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </AnimatePresence>
          </Link>

          {/* Nav Menu */}
          <nav
            className="nav-menu"
            onMouseLeave={() => setHoveredPath(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: scrolled ? "6px" : "30px",
              background: scrolled ? "rgba(235, 230, 218, 0.6)" : "transparent",
              padding: scrolled ? "6px 8px" : "0",
              borderRadius: scrolled ? "34px" : "0px",
              border: scrolled ? "1px solid rgba(198, 162, 101, 0.25)" : "none",
              transition: "all 0.4s ease",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              const isHovered = hoveredPath === item.path;
              const lit = isActive || isHovered;

              const textColor = scrolled
                ? lit
                  ? "#1E352F"
                  : "#334A42"
                : lit
                  ? "var(--accent-gold)"
                  : "#FFFFFF";

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onMouseEnter={() => setHoveredPath(item.path)}
                  onFocus={() => setHoveredPath(item.path)}
                  onBlur={() => setHoveredPath(null)}
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: scrolled ? "9px 20px" : "10px 14px",
                    fontSize: scrolled ? "0.93rem" : "1rem",
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: isHovered ? "0.02em" : "0em",
                    color: textColor,
                    textDecoration: "none",
                    transition:
                      "color 0.3s ease, letter-spacing 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Active page: white pill that glides between routes (scrolled) */}
                  {isActive && scrolled && (
                    <motion.span
                      layoutId="nav-active-pill"
                      aria-hidden="true"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "22px",
                        background: "#FFFFFF",
                        boxShadow: "0 6px 16px rgba(18, 34, 23, 0.1)",
                        zIndex: 0,
                      }}
                    />
                  )}

                  {/* Hover pill that follows the mouse from link to link */}
                  {isHovered && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      aria-hidden="true"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: scrolled ? "22px" : "999px",
                        background: scrolled
                          ? isActive
                            ? "rgba(198, 162, 101, 0.16)"
                            : "linear-gradient(135deg, rgba(198, 162, 101, 0.28) 0%, rgba(198, 162, 101, 0.14) 100%)"
                          : "rgba(255, 255, 255, 0.12)",
                        boxShadow: scrolled
                          ? "inset 0 0 0 1px rgba(198, 162, 101, 0.45)"
                          : "inset 0 0 0 1px rgba(255, 255, 255, 0.22)",
                        backdropFilter: scrolled ? "none" : "blur(6px)",
                        WebkitBackdropFilter: scrolled ? "none" : "blur(6px)",
                        zIndex: 0,
                      }}
                    />
                  )}

                  {/* Label lifts slightly on hover */}
                  <motion.span
                    animate={{ y: isHovered ? -1.5 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      display: "block",
                    }}
                  >
                    {item.label}
                  </motion.span>

                  {/* Active page: gold dot that glides between routes (top of page) */}
                  {isActive && !scrolled && (
                    <motion.span
                      layoutId="nav-active-dot"
                      aria-hidden="true"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      style={{
                        position: "absolute",
                        bottom: "-2px",
                        left: "50%",
                        width: "5px",
                        height: "5px",
                        marginLeft: "-2.5px",
                        borderRadius: "50%",
                        background: "var(--accent-gold)",
                        boxShadow: "0 0 10px var(--accent-gold)",
                        zIndex: 1,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Magnetic strength={0.3}>
              <motion.div
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileTap={{ scale: 0.96 }}
                style={{ display: "inline-flex" }}
              >
                <Link
                  href="/contact"
                  className="header-cta-btn"
                  onClick={closeDrawer}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    background:
                      "linear-gradient(135deg, #74351F 0%, #542211 100%)",
                    color: "#FFFFFF",
                    padding: scrolled ? "11px 22px" : "14px 26px",
                    borderRadius: "34px",
                    fontSize: scrolled ? "0.9rem" : "0.98rem",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    textDecoration: "none",
                    boxShadow: "0 8px 22px rgba(116, 53, 31, 0.32)",
                    border: "1px solid rgba(198, 162, 101, 0.4)",
                    whiteSpace: "nowrap",
                    transition: "padding 0.3s ease, font-size 0.3s ease",
                  }}
                >
                  {/* Gold shine sweep on hover */}
                  <motion.span
                    aria-hidden="true"
                    variants={shineVariants}
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: "60%",
                      background:
                        "linear-gradient(105deg, transparent 0%, rgba(198, 162, 101, 0.55) 50%, transparent 100%)",
                      transform: "skewX(-18deg)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Soft gold glow ring on hover */}
                  <motion.span
                    aria-hidden="true"
                    variants={glowVariants}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "34px",
                      boxShadow:
                        "inset 0 0 0 1px rgba(198, 162, 101, 0.85), 0 0 24px rgba(198, 162, 101, 0.35)",
                      pointerEvents: "none",
                    }}
                  />

                  <motion.span
                    variants={ctaTextVariants}
                    transition={ctaTextTransition}
                    style={{ position: "relative", zIndex: 1 }}
                  >
                    Find your project 
                  </motion.span>

                  <motion.i
                    className="fa-solid fa-arrow-right"
                    variants={arrowVariants}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      fontSize: "0.74rem",
                      color: "var(--accent-gold)",
                    }}
                  />
                </Link>
              </motion.div>
            </Magnetic>

            {/* Mobile Menu Toggle Button */}
            <div
              className={`menu-toggle-btn ${isDrawerOpen ? "open" : ""}`}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-label="Toggle navigation menu"
              role="button"
              style={{
                cursor: "pointer",
                display: "none",
                flexDirection: "column",
                gap: "5px",
                padding: "8px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  backgroundColor:
                    scrolled || isDrawerOpen ? "#1E352F" : "#FFFFFF",
                  transition: "background-color 0.3s ease",
                }}
              ></span>
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  backgroundColor:
                    scrolled || isDrawerOpen ? "#1E352F" : "#FFFFFF",
                  transition: "background-color 0.3s ease",
                }}
              ></span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Drawer Menu */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              padding: "120px 20px 40px",
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "26px",
                alignItems: "center",
                width: "100%",
              }}
            >
              {DRAWER_ITEMS.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    href={item.path}
                    onClick={closeDrawer}
                    style={{
                      fontSize: "1.7rem",
                      color:
                        pathname === item.path
                          ? "var(--accent-gold)"
                          : "#1E352F",
                      textDecoration: "none",
                      fontFamily: "var(--font-serif)",
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{ marginTop: "40px", width: "100%", maxWidth: "300px" }}
            >
              <Link
                href="/book-a-visit"
                onClick={closeDrawer}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  padding: "16px",
                  background: "#1E352F",
                  color: "#FFFFFF",
                  borderRadius: "30px",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Book a Visit
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                marginTop: "auto",
                paddingTop: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <a
                href="tel:+919999999999"
                style={{
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                <i
                  className="fa-solid fa-phone"
                  style={{ marginRight: "8px" }}
                ></i>
                +91 99999 99999
              </a>
              <a
                href="mailto:hello@vanatvam.com"
                style={{
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                <i
                  className="fa-solid fa-envelope"
                  style={{ marginRight: "8px" }}
                ></i>
                hello@vanatvam.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 998,
              backdropFilter: "blur(3px)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
