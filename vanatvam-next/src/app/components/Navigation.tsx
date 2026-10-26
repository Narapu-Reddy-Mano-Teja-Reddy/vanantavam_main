"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Magnetic from "@/components/premium/Magnetic";
import {
  Home,
  Leaf,
  Sprout,
  Coins,
  BookOpen,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  path: string;
  label: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Home", icon: Home },
  { path: "/about", label: "Our Story", icon: Leaf },
  { path: "/projects", label: "Projects", icon: Sprout },
  { path: "/investment", label: "Investment", icon: Coins },
  { path: "/blog", label: "Journal", icon: BookOpen },
];

const DRAWER_ITEMS = [
  ...NAV_ITEMS.map((item) => ({ path: item.path, label: item.label })),
  { path: "/contact", label: "Find your project" },
];

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

const shineVariants: Variants = {
  rest: { x: "-130%" },
  hover: { x: "130%", transition: { duration: 0.8, ease: EASE_PREMIUM } },
};

const glowVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3 } },
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
          borderRadius: scrolled ? "40px" : "0px",
          boxShadow: scrolled
            ? "0 20px 50px rgba(18, 34, 23, 0.14), 0 0 0 1px rgba(198, 162, 101, 0.35)"
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
        {/* Scrolled Cream Background */}
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
              "linear-gradient(180deg, #FAF8F2 0%, #F5F0E4 100%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Left Botanical SVG Vector (visible when scrolled) */}
        <motion.div
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "150px",
            pointerEvents: "none",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg
            width="150"
            height="82"
            viewBox="0 0 150 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%" }}
          >
            {/* Stems */}
            <path
              d="M-15 85C20 62 48 38 32 8C25 -12 -8 -18 -15 -18"
              stroke="#162E20"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M10 50C35 42 55 25 48 2"
              stroke="#162E20"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Deep Background Foliage */}
            <path
              d="M-5 68C-18 50 2 38 18 52C12 72 -5 68 -5 68Z"
              fill="#122217"
              opacity="0.9"
            />
            <path
              d="M12 56C0 38 22 26 36 40C28 60 12 56 12 56Z"
              fill="#1C3829"
              opacity="0.95"
            />

            {/* Midground Forest Green Leaves */}
            <path
              d="M26 42C12 22 36 12 50 28C42 46 26 42 26 42Z"
              fill="#2A4D36"
            />
            <path
              d="M32 24C20 6 42 -4 54 12C48 30 32 24 32 24Z"
              fill="#1B3625"
            />

            {/* Accent Soft Olive/Lush Leaf Highlights */}
            <path
              d="M20 48C28 38 42 34 38 46C30 52 20 48 20 48Z"
              fill="#487556"
              opacity="0.85"
            />
            <path
              d="M32 30C40 20 52 18 48 28C40 34 32 30 32 30Z"
              fill="#629270"
              opacity="0.8"
            />

            {/* Leaf Vein Accents */}
            <path
              d="M12 56C20 46 28 44 36 40"
              stroke="#487556"
              strokeWidth="1"
              opacity="0.6"
            />
            <path
              d="M26 42C34 32 42 30 50 28"
              stroke="#7BA887"
              strokeWidth="1"
              opacity="0.6"
            />
          </svg>
        </motion.div>

        {/* Right Botanical SVG Vector (visible when scrolled) */}
        <motion.div
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "150px",
            pointerEvents: "none",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            transform: "scaleX(-1)",
          }}
        >
          <svg
            width="150"
            height="82"
            viewBox="0 0 150 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%" }}
          >
            {/* Stems */}
            <path
              d="M-15 85C20 62 48 38 32 8C25 -12 -8 -18 -15 -18"
              stroke="#162E20"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M10 50C35 42 55 25 48 2"
              stroke="#162E20"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Deep Background Foliage */}
            <path
              d="M-5 68C-18 50 2 38 18 52C12 72 -5 68 -5 68Z"
              fill="#122217"
              opacity="0.9"
            />
            <path
              d="M12 56C0 38 22 26 36 40C28 60 12 56 12 56Z"
              fill="#1C3829"
              opacity="0.95"
            />

            {/* Midground Forest Green Leaves */}
            <path
              d="M26 42C12 22 36 12 50 28C42 46 26 42 26 42Z"
              fill="#2A4D36"
            />
            <path
              d="M32 24C20 6 42 -4 54 12C48 30 32 24 32 24Z"
              fill="#1B3625"
            />

            {/* Accent Soft Olive/Lush Leaf Highlights */}
            <path
              d="M20 48C28 38 42 34 38 46C30 52 20 48 20 48Z"
              fill="#487556"
              opacity="0.85"
            />
            <path
              d="M32 30C40 20 52 18 48 28C40 34 32 30 32 30Z"
              fill="#629270"
              opacity="0.8"
            />

            {/* Leaf Vein Accents */}
            <path
              d="M12 56C20 46 28 44 36 40"
              stroke="#487556"
              strokeWidth="1"
              opacity="0.6"
            />
            <path
              d="M26 42C34 32 42 30 50 28"
              stroke="#7BA887"
              strokeWidth="1"
              opacity="0.6"
            />
          </svg>
        </motion.div>

        <div
          className="header-inner"
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: scrolled ? "0 28px 0 24px" : "0 40px",
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
                  height: scrolled ? "72px" : "96px",
                  width: "auto",
                  maxWidth: scrolled ? "150px" : "220px",
                  filter: scrolled
                    ? "drop-shadow(0 2px 6px rgba(18,34,23,0.1))"
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
              gap: scrolled ? "4px" : "30px",
              background: scrolled ? "rgba(240, 237, 226, 0.85)" : "transparent",
              padding: scrolled ? "5px 6px" : "0",
              borderRadius: scrolled ? "36px" : "0px",
              border: scrolled ? "1px solid rgba(198, 162, 101, 0.3)" : "none",
              boxShadow: scrolled ? "inset 0 1px 3px rgba(0,0,0,0.04)" : "none",
              transition: "all 0.4s ease",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              const isHovered = hoveredPath === item.path;
              const lit = isActive || isHovered;

              const textColor = scrolled
                ? isActive
                  ? "#FFFFFF"
                  : lit
                  ? "#183023"
                  : "#2C4032"
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
                    gap: "8px",
                    padding: scrolled ? "8px 18px" : "10px 14px",
                    fontSize: scrolled ? "0.9rem" : "1rem",
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: isHovered ? "0.02em" : "0em",
                    color: textColor,
                    textDecoration: "none",
                    transition:
                      "color 0.3s ease, letter-spacing 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Active page: Dark green pill (scrolled) */}
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
                        borderRadius: "26px",
                        background: "#183023",
                        boxShadow: "0 4px 14px rgba(24, 48, 35, 0.25)",
                        zIndex: 0,
                      }}
                    />
                  )}

                  {/* Hover pill */}
                  {isHovered && !isActive && (
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
                        borderRadius: scrolled ? "26px" : "999px",
                        background: scrolled
                          ? "rgba(198, 162, 101, 0.2)"
                          : "rgba(255, 255, 255, 0.12)",
                        boxShadow: scrolled
                          ? "inset 0 0 0 1px rgba(198, 162, 101, 0.35)"
                          : "inset 0 0 0 1px rgba(255, 255, 255, 0.22)",
                        backdropFilter: scrolled ? "none" : "blur(6px)",
                        WebkitBackdropFilter: scrolled ? "none" : "blur(6px)",
                        zIndex: 0,
                      }}
                    />
                  )}

                  {/* Icon & Label */}
                  <motion.span
                    animate={{ y: isHovered ? -1 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {scrolled && (
                      <Icon
                        size={16}
                        strokeWidth={2}
                        style={{
                          color: isActive
                            ? "#FFFFFF"
                            : lit
                            ? "#987443"
                            : "#3A5241",
                          transition: "color 0.3s ease",
                        }}
                      />
                    )}
                    <span>{item.label}</span>
                  </motion.span>

                  {/* Active Indicator Bar beneath the pill (when scrolled & active) */}
                  {isActive && scrolled && (
                    <motion.span
                      layoutId="nav-active-bar"
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        bottom: "-10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "32px",
                        height: "3px",
                        borderRadius: "2px",
                        background: "#183023",
                        boxShadow: "0 2px 6px rgba(24, 48, 35, 0.3)",
                        zIndex: 1,
                      }}
                    />
                  )}

                  {/* Active page: gold dot (top of page) */}
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
                    background: scrolled
                      ? "#183023"
                      : "linear-gradient(135deg, #74351F 0%, #542211 100%)",
                    color: "#FFFFFF",
                    padding: scrolled ? "12px 24px" : "14px 26px",
                    borderRadius: "34px",
                    fontSize: scrolled ? "0.85rem" : "0.98rem",
                    fontWeight: 700,
                    letterSpacing: scrolled ? "0.06em" : "0em",
                    textTransform: scrolled ? "uppercase" : "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    textDecoration: "none",
                    boxShadow: scrolled
                      ? "0 8px 22px rgba(24, 48, 35, 0.28)"
                      : "0 8px 22px rgba(116, 53, 31, 0.32)",
                    border: scrolled
                      ? "1px solid rgba(198, 162, 101, 0.4)"
                      : "1px solid rgba(198, 162, 101, 0.4)",
                    whiteSpace: "nowrap",
                    transition: "all 0.3s ease",
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

                  <span style={{ position: "relative", zIndex: 1 }}>
                    {scrolled ? "Find Your Project" : "Find your project"}
                  </span>

                  <motion.span
                    variants={arrowVariants}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      color: scrolled ? "#FFFFFF" : "var(--accent-gold)",
                    }}
                  >
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </motion.span>
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
                    scrolled || isDrawerOpen ? "#183023" : "#FFFFFF",
                  transition: "background-color 0.3s ease",
                }}
              ></span>
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  backgroundColor:
                    scrolled || isDrawerOpen ? "#183023" : "#FFFFFF",
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
                          : "#183023",
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
                  background: "#183023",
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