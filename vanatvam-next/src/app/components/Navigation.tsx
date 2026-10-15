"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Magnetic from "@/components/premium/Magnetic";

export default function Navigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <header
        className={`header ${scrolled ? "header-scrolled" : ""}`}
        id="main-header"
        style={{
          background: scrolled
            ? "rgba(255, 255, 255, 0.96)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderRadius: scrolled ? "24px" : "0px",
          width: scrolled ? "92%" : "100%",
          maxWidth: scrolled ? "1400px" : "100%",
          left: scrolled ? "50%" : "0%",
          transform: scrolled ? "translateX(-50%)" : "translateX(0%)",
          margin: scrolled ? "12px 0 0" : "0px",
          boxShadow: scrolled ? "0 10px 30px rgba(18, 34, 23, 0.08)" : "none",
          border: scrolled ? "1px solid rgba(45, 106, 79, 0.08)" : "1px solid transparent",
          overflow: "hidden", // <--- THIS PREVENTS ANY CHILD ELEMENTS / LINES FROM BLEEDING OUT
          transition:
            "background 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.4s cubic-bezier(0.16, 1, 0.3, 1), width 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), margin 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 1000,
          position: "fixed",
          top: 0,
          willChange: "transform, width, background, border-radius",
        }}
      >
        <div className="header-inner" style={{ alignItems: "center", width: "100%", padding: scrolled ? "0 24px" : "0 40px" }}>
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
            <img
              src="/assets/images/Project-Logos/vanatvam.png"
              alt="Vanatvam Logo"
              className="header-logo-img"
              style={{
                height: scrolled ? "48px" : "72px",
                width: "auto",
                filter: scrolled ? "none" : "drop-shadow(0 2px 8px rgba(0,0,0,0.35))",
                objectFit: "contain",
                display: "block",
                transition: "height 0.3s ease",
              }}
            />
            <div
              className="logo-brand"
              style={{
                color: scrolled || isDrawerOpen ? "#1E352F" : "#FFFFFF",
                fontFamily: "'Cinzel', var(--font-serif), serif",
                fontSize: "1.45rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
            ></div>
          </Link>
          <nav className="nav-menu" style={{ position: "relative" }}>
            {[
              { path: "/", label: "Home" },
              { path: "/about", label: "Our Story" },
              { path: "/projects", label: "Projects" },
              { path: "/investment", label: "Investment" },
              { path: "/blog", label: "Journal" },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-link ${pathname === item.path ? "active" : ""}`}
                style={{
                  color:
                    pathname === item.path
                      ? "var(--accent-gold)"
                      : scrolled || isDrawerOpen
                        ? "#1E352F"
                        : "#FFFFFF",
                  transition: "color 0.3s ease",
                  position: "relative",
                }}
              >
                {item.label}

                {pathname === item.path && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="nav-underline"
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "var(--accent-gold)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            ))}
          </nav>
          <div className="header-right">
            <Magnetic strength={0.3}>
              <Link
                href="/contact"
                className="header-cta-btn"
                onClick={closeDrawer}
                style={{
                  background: "var(--accent-gold)",
                  color: "#122217",
                  boxShadow: "0 4px 16px rgba(198, 162, 101, 0.3)",
                }}
              >
                <span>Contact</span>
                <i
                  className="fa-solid fa-arrow-right"
                  style={{ fontSize: "0.75rem" }}
                ></i>
              </Link>
            </Magnetic>
            <div
              className={`menu-toggle-btn ${isDrawerOpen ? "open" : ""}`}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-label="Toggle navigation menu"
            >
              <span
                style={{
                  backgroundColor:
                    scrolled || isDrawerOpen ? "#1E352F" : "#FFFFFF",
                }}
              ></span>
              <span
                style={{
                  backgroundColor:
                    scrolled || isDrawerOpen ? "#1E352F" : "#FFFFFF",
                }}
              ></span>
              <span
                style={{
                  backgroundColor:
                    scrolled || isDrawerOpen ? "#1E352F" : "#FFFFFF",
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
            className="fixed inset-0 z-40 bg-white"
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
                gap: "30px",
                alignItems: "center",
                width: "100%",
              }}
            >
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "Our Story" },
                { path: "/projects", label: "Projects" },
                { path: "/investment", label: "Investment" },
                { path: "/blog", label: "Journal" },
                { path: "/contact", label: "Contact" },
              ].map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={item.path}
                    onClick={closeDrawer}
                    style={{
                      fontSize: "1.8rem",
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
                className="btn-pill btn-pill-dark"
                onClick={closeDrawer}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "16px",
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
                gap: "15px",
                alignItems: "center",
              }}
            >
              <a
                href="tel:+919999999999"
                style={{
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "1rem",
                }}
              >
                <i
                  className="fa-solid fa-phone"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                +91 99999 99999
              </a>
              <a
                href="mailto:hello@vanatvam.com"
                style={{
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "1rem",
                }}
              >
                <i
                  className="fa-solid fa-envelope"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                hello@vanatvam.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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