"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Leaf,
  Sprout,
  Coins,
  BookOpen,
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

// Minimum scroll distance (px) before the header reacts, avoids flicker
const SCROLL_THRESHOLD = 8;
// Header is always visible when the page is within this distance of the top
const TOP_ZONE = 80;

export default function Navigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const lastScrollY = useRef<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      setScrolled(currentY > 30);

      if (currentY < TOP_ZONE) {
        // Always show near the top
        setHidden(false);
      } else if (delta > SCROLL_THRESHOLD) {
        // Scrolling down -> hide
        setHidden(true);
      } else if (delta < -SCROLL_THRESHOLD) {
        // Scrolling up -> show
        setHidden(false);
      }

      // Only update the reference once movement passes the threshold,
      // otherwise slow scrolling would never register
      if (Math.abs(delta) > SCROLL_THRESHOLD || currentY < TOP_ZONE) {
        lastScrollY.current = currentY;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Close the drawer whenever the route changes
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  const closeDrawer = () => setIsDrawerOpen(false);

  const barColor = scrolled || isDrawerOpen ? "#183023" : "#FFFFFF";

  return (
    <>
      <motion.header
        animate={{ y: hidden && !isDrawerOpen ? -140 : 0 }}
        transition={{ duration: 0.35, ease: EASE_PREMIUM }}
        style={{
          position: "fixed",
          top: "16px",
          left: "50%",
          x: "-50%",
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

          {/* Right: Floating cream capsule nav */}
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
              boxShadow:
                "0 10px 30px rgba(18, 34, 23, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)",
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

                  {/* Icon & label */}
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

          {/* Mobile menu toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              className={`menu-toggle-btn ${isDrawerOpen ? "open" : ""}`}
              onClick={() => setIsDrawerOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={isDrawerOpen}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsDrawerOpen((open) => !open);
                }
              }}
              style={{
                cursor: "pointer",
                display: "none", // shown via CSS media query on mobile
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
                  backgroundColor: barColor,
                  transition: "background-color 0.3s ease",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  backgroundColor: barColor,
                  transition: "background-color 0.3s ease",
                }}
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            key="backdrop"
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

      {/* Drawer menu */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            key="drawer"
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
              boxSizing: "border-box",
              overflowY: "auto",
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
              {NAV_ITEMS.map((item, i) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.path}
                      onClick={closeDrawer}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "1.4rem",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#987443" : "#183023",
                        textDecoration: "none",
                      }}
                    >
                      <Icon size={22} strokeWidth={2} />
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
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
    </>
  );
}