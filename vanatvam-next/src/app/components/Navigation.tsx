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

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };

    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDrawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <motion.header
        className="site-header"
        initial={false}
        animate={{
          width: isMobile ? "92%" : scrolled ? "min(94%, 1320px)" : "100%",
          y: isMobile ? (scrolled ? 8 : 12) : scrolled ? 16 : 0,
          borderRadius: isMobile ? "22px" : scrolled ? "44px" : "0px",
          height: isMobile ? "68px" : scrolled ? "82px" : "116px",
          boxShadow:
            isMobile || scrolled
              ? "0 18px 45px rgba(18, 34, 23, 0.12), 0 0 0 1px rgba(198, 162, 101, 0.35)"
              : "none",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          x: "-50%",
          zIndex: 1000,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          overflow: "hidden",
          willChange: "transform, width, height",
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          initial={false}
          animate={{ opacity: isMobile || scrolled ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
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
            padding: isMobile ? "0 16px" : scrolled ? "0 26px 0 20px" : "0 40px",
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
              gap: "12px",
              textDecoration: "none",
              height: "100%",
              padding: 0,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={isMobile || scrolled ? "scrolled-logo" : "default-logo"}
                src={
                  isMobile || scrolled
                    ? "/assets/images/main.png"
                    : "/assets/images/vanatvamlogo.webp"
                }
                alt="Vanatvam Logo"
                className="header-logo-img"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.22, ease: EASE_PREMIUM }}
                style={{
                  height: isMobile ? "46px" : scrolled ? "80px" : "96px",
                  width: "auto",
                  maxWidth: isMobile ? "130px" : scrolled ? "150px" : "220px",
                  filter:
                    isMobile || scrolled
                      ? "none"
                      : "drop-shadow(0 2px 10px rgba(0,0,0,0.4))",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </AnimatePresence>
          </Link>

          {/* Desktop Nav Menu */}
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
                  {/* Active page pill (scrolled) */}
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

                  {/* Hover pill */}
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

          {/* Right Section: Desktop CTA + Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className="header-cta-desktop">
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
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className={`menu-toggle-btn ${isDrawerOpen ? "open" : ""}`}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-label={isDrawerOpen ? "Close navigation menu" : "Open navigation menu"}
              type="button"
            >
              <span
                style={{
                  backgroundColor:
                    isMobile || scrolled || isDrawerOpen ? "#1E352F" : "#FFFFFF",
                }}
              />
              <span
                style={{
                  backgroundColor:
                    isMobile || scrolled || isDrawerOpen ? "#1E352F" : "#FFFFFF",
                }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Luxury Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: EASE_PREMIUM }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100dvh",
              padding: "100px 24px 36px",
              background: "linear-gradient(180deg, #FFFFFF 0%, #F9F7F2 100%)",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxSizing: "border-box",
              overflowY: "auto",
            }}
          >
            {/* Top Navigation Links */}
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                width: "100%",
                maxWidth: "360px",
                margin: "0 auto",
                paddingTop: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--accent-gold, #C6A265)",
                  marginBottom: "4px",
                  textAlign: "center",
                }}
              >
                NAVIGATION
              </div>

              {DRAWER_ITEMS.map((item, i) => {
                const isActive = pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link
                      href={item.path}
                      onClick={closeDrawer}
                      style={{
                        fontSize: "1.45rem",
                        color: isActive ? "var(--brand-earth-brown, #72351C)" : "#1E352F",
                        textDecoration: "none",
                        fontFamily: "var(--font-serif)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 18px",
                        borderRadius: "14px",
                        backgroundColor: isActive ? "rgba(198, 162, 101, 0.12)" : "transparent",
                        fontWeight: isActive ? 600 : 500,
                      }}
                    >
                      <span>{item.label}</span>
                      <span
                        style={{
                          fontSize: "1rem",
                          color: isActive ? "var(--brand-earth-brown, #72351C)" : "var(--accent-gold, #C6A265)",
                        }}
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom Actions & Contacts */}
            <div
              style={{
                width: "100%",
                maxWidth: "360px",
                margin: "30px auto 0",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/book-a-visit"
                  onClick={closeDrawer}
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15px 20px",
                    background: "linear-gradient(135deg, #74351F 0%, #542211 100%)",
                    color: "#FFFFFF",
                    borderRadius: "999px",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    boxShadow: "0 10px 25px rgba(116, 53, 31, 0.28)",
                  }}
                >
                  Book a Site Visit →
                </Link>
              </motion.div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "24px",
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(40, 44, 39, 0.08)",
                  fontSize: "0.85rem",
                }}
              >
                <a
                  href="tel:+919999999999"
                  style={{
                    color: "var(--text-dark, #282C27)",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  📞 Call Us
                </a>
                <span style={{ color: "rgba(0,0,0,0.2)" }}>•</span>
                <a
                  href="mailto:info@vanatvam.com"
                  style={{
                    color: "var(--text-dark, #282C27)",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  ✉️ Email
                </a>
                <span style={{ color: "rgba(0,0,0,0.2)" }}>•</span>
                <Link
                  href="/investment"
                  onClick={closeDrawer}
                  style={{
                    color: "var(--brand-earth-brown, #72351C)",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Investment
                </Link>
              </div>
            </div>
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
              background: "rgba(14, 26, 18, 0.6)",
              zIndex: 998,
              backdropFilter: "blur(6px)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
