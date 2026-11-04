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
  { path: "/about", label: "Our Philosophy", icon: Leaf },
  { path: "/projects", label: "Projects", icon: Sprout },
  { path: "/investment", label: "Investment", icon: Coins },
  { path: "/blog", label: "Journal", icon: BookOpen },
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
      <header
        style={{
          position: "fixed",
          top: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          width: "min(94%, 1320px)",
          padding: "0 10px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: "16px",
          }}
        >
          {/* Left: Logo */}
          <Link
            href="/"
            className="logo-group"
            onClick={closeDrawer}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              height: "100px",
            }}
          >
            <motion.img
              src="/assets/images/vanatvamlogo.webp"
              alt="Vanatvam Logo"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE_PREMIUM }}
              whileHover={{ scale: 1.04 }}
              style={{
                height: "115px",
                width: "auto",
                maxWidth: "260px",
                filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.4))",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Link>

          {/* Right: Floating Cream Capsule Nav Menu */}
          <motion.nav
            className="nav-menu"
            onMouseLeave={() => setHoveredPath(null)}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(235, 231, 220, 0.96)",
              padding: "5px 8px",
              borderRadius: "50px",
              border: "1px solid rgba(198, 162, 101, 0.35)",
              boxShadow: "0 10px 30px rgba(18, 34, 23, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              height: "54px",
              marginLeft: "auto",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              const isHovered = hoveredPath === item.path;
              const lit = isActive || isHovered;

              const textColor = isActive
                ? "#FFFFFF"
                : lit
                ? "#183023"
                : "#233B2C";

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
                    padding: "8px 20px",
                    fontSize: "0.95rem",
                    fontWeight: isActive ? 700 : 500,
                    color: textColor,
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                >
                  {/* Active page pill */}
                  {isActive && (
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
                        background: "#122217",
                        boxShadow: "0 4px 14px rgba(18, 34, 23, 0.25)",
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
                        borderRadius: "26px",
                        background: "rgba(198, 162, 101, 0.2)",
                        boxShadow: "inset 0 0 0 1px rgba(198, 162, 101, 0.35)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
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
                    <Icon
                      size={16}
                      strokeWidth={2}
                      style={{
                        color: isActive
                          ? "#FFFFFF"
                          : lit
                          ? "#987443"
                          : "#233B2C",
                        transition: "color 0.3s ease",
                      }}
                    />
                    <span>{item.label}</span>
                  </motion.span>
                </Link>
              );
            })}
          </motion.nav>

          {/* Right: Direct Action CTA Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            
            

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
      </header>

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
