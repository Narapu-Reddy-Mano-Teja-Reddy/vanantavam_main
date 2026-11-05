"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Magnetic from "@/components/premium/Magnetic";

/* 👉 Footer artwork (green hills / sunrise / hut / leaves) */
const FOOTER_BG = "/assets/images/footer_bg.jpeg";

type NavChild = { label: string; href: string };
type NavItem = {
  icon: string;
  label: string;
  href: string;
  children?: NavChild[];
};

/* Pages shown in the Projects dropdown */
const PROJECT_LINKS: NavChild[] = [
  { label: "Brindavana", href: "/brindavana" },
  { label: "Madhuvana", href: "/madhuvana" },
  { label: "Anantavana", href: "/anantavana" },
  { label: "Eeshavana", href: "/eeshavana" },
];

const NAV: NavItem[] = [
  { icon: "fa-house", label: "Home", href: "/" },
  { icon: "fa-seedling", label: "Our Philosophy", href: "/about" },
  {
    icon: "fa-layer-group",
    label: "Projects",
    href: "/projects",
    children: PROJECT_LINKS,
  },
  { icon: "fa-chart-line", label: "Investment", href: "/investment" },
  { icon: "fa-book-open", label: "Journal", href: "/journal" },
];

const SOCIALS = [
  {
    icon: "fa-instagram",
    label: "Instagram",
    url: "https://www.instagram.com/vanatvamindia/",
  },
  {
    icon: "fa-facebook-f",
    label: "Facebook",
    url: "https://www.facebook.com/vanatvamfarms",
  },
  {
    icon: "fa-youtube",
    label: "YouTube",
    url: "https://www.youtube.com/@VanaTvam",
  },
  {
    icon: "fa-linkedin-in",
    label: "LinkedIn",
    url: "linkedin.com/company/vanatvam-farms/",
  },
];

export default function Footer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // close on outside click / Escape
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Touch screens (no hover): first tap opens the menu instead of navigating
  const handleTriggerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      setMenuOpen((v) => !v);
    }
  };

  return (
    <footer className="vt-footer">
      <div className="vt-footer__inner">
        {/* ROW 1: logo | nav + contact | socials */}
        <div className="vt-footer__top">
          <Link
            href="/"
            className="vt-footer__brand"
            aria-label="VanaTvam home"
          >
            <img
              src="/assets/images/Project-Logos/vanatvam.webp"
              alt="VanaTvam Logo"
              className="vt-footer__logo"
            />
            <span className="vt-footer__tagline">
              Sustainable Natural Communities
            </span>
          </Link>

          <span className="vt-footer__divider vt-hide-md" aria-hidden="true" />

          <div className="vt-footer__nav-group">
            <nav className="vt-footer__nav" aria-label="Footer">
              {NAV.map((item, i) => (
                <div className="vt-footer__navitem" key={item.label}>
                  {i > 0 && (
                    <span className="vt-footer__divider" aria-hidden="true" />
                  )}

                  {item.children ? (
                    <div
                      className="vt-footer__dropwrap"
                      ref={menuRef}
                      onMouseEnter={() => setMenuOpen(true)}
                      onMouseLeave={() => setMenuOpen(false)}
                    >
                      <Link
                        href={item.href}
                        className="vt-footer__link"
                        aria-haspopup="true"
                        aria-expanded={menuOpen}
                        onClick={handleTriggerClick}
                        onFocus={() => setMenuOpen(true)}
                      >
                        <i
                          className={`fa-solid ${item.icon}`}
                          aria-hidden="true"
                        ></i>
                        {item.label}
                        <span
                          className={`vt-footer__caret ${menuOpen ? "is-open" : ""}`}
                          aria-hidden="true"
                        />
                      </Link>

                      <div
                        className={`vt-footer__menu ${menuOpen ? "is-open" : ""}`}
                        role="menu"
                      >
                        <ul>
                          {item.children.map((c) => (
                            <li key={c.href} role="none">
                              <Link
                                href={c.href}
                                role="menuitem"
                                onClick={() => setMenuOpen(false)}
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link href={item.href} className="vt-footer__link">
                      <i
                        className={`fa-solid ${item.icon}`}
                        aria-hidden="true"
                      ></i>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CONTACT: ADDRESS + PHONE + EMAIL */}
            <div className="vt-footer__contact">
              <a
                href="https://share.google/ec2cCHbHzzQrqMV6I"
                target="_blank"
                rel="noopener noreferrer"
                className="vt-footer__contact-item vt-footer__contact-item--address"
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "flex-start",
                    gap: "2px",
                  }}
                >
                  <i
                    className="fa-solid fa-location-dot"
                    aria-hidden="true"
                  ></i>
                  #5, Anjanadri Plaza, 2nd Floor, Girinagar 1st Phase, (Behind
                  Radhakrishna Hospital), Bengaluru – 560085
                </span>
              </a>

              <div className="vt-footer__contact-row">
                <a href="tel:+918047095111" className="vt-footer__contact-item">
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                  <span>+91 (080) 4709-5111</span>
                </a>

                <span
                  className="vt-footer__divider vt-footer__divider--sm"
                  aria-hidden="true"
                />

                <a
                  href="mailto:info@vanatvam.com"
                  className="vt-footer__contact-item"
                >
                  <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                  <span>info@vanatvam.com</span>
                </a>
              </div>
            </div>
          </div>

          <span className="vt-footer__divider vt-hide-md" aria-hidden="true" />

          <div className="vt-footer__socials">
            {SOCIALS.map((s) => (
              <Magnetic key={s.icon} strength={0.3}>
                <a
                  href={s.url}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vt-footer__social"
                >
                  <i className={`fa-brands ${s.icon}`} aria-hidden="true"></i>
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* ROW 2: legal + copyright */}
        <div className="vt-footer__bottom">
          <div className="vt-footer__legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span
              className="vt-footer__divider vt-footer__divider--sm"
              aria-hidden="true"
            />
            <Link href="/terms">Terms &amp; Conditions</Link>
          </div>
          <p className="vt-footer__copy">
            &copy; {new Date().getFullYear()} VanaTvam Private Limited. CIN:
            U01100KA2022PTC159587
          </p>
        </div>
      </div>

      <style>{`
        .vt-footer {
          --gold: var(--accent-gold, #f2b705);
          position: relative;
          z-index: 5;
          color: #fff;
          background-color: var(--bg-dark-forest, #0d2414);
          background-image: url(${FOOTER_BG});
          background-size: cover;
          background-position: center bottom;
          background-repeat: no-repeat;
          min-height: 345px;
          display: flex;
          align-items: stretch;
        }
        /* 30% dark layer (brightness taggistundi) + soft fade for readability */
        .vt-footer::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
            linear-gradient(
              to bottom,
              rgba(8, 28, 14, 0.55) 0%,
              rgba(8, 28, 14, 0) 55%,
              rgba(8, 28, 14, 0.55) 100%
            );
          pointer-events: none;
        }
        .vt-footer__inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* ---------- top row ---------- */
        .vt-footer__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 100px;
        }
        .vt-footer__brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }
        .vt-footer__logo {
          height: 64px;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          display: block;
        }
        .vt-footer__tagline {
          font-size: 0.68rem;
          color: var(--gold);
          letter-spacing: 0.02em;
        }

        .vt-footer__divider {
          width: 1px;
          height: 40px;
          background: linear-gradient(
            to bottom,
            transparent,
            var(--gold) 20%,
            var(--gold) 80%,
            transparent
          );
          opacity: 0.85;
          flex-shrink: 0;
        }
        .vt-footer__divider--sm {
          height: 16px;
          background: rgba(255, 255, 255, 0.45);
        }

        /* nav + contact stacked */
        .vt-footer__nav-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
        }
        .vt-footer__nav {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
        }
        .vt-footer__navitem {
          display: flex;
          align-items: center;
        }
        .vt-footer__navitem .vt-footer__divider {
          height: 26px;
          margin: 0 26px;
        }

        /* ---------- nav links: WHITE icons + effects ---------- */
        .vt-footer__link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #fff;
          font-weight: 500;
          font-size: 1rem;
          white-space: nowrap;
          transition: color 0.25s, transform 0.25s;
        }
        .vt-footer__link i {
          color: #fff;
          font-size: 1.1rem;
          transition: transform 0.3s ease, color 0.25s, filter 0.25s;
        }
        .vt-footer__link:hover,
        .vt-footer__link:focus-visible {
          color: var(--gold);
          transform: translateY(-2px);
        }
        .vt-footer__link:hover i,
        .vt-footer__link:focus-visible i {
          color: var(--gold);
          transform: scale(1.25) rotate(-8deg);
          filter: drop-shadow(0 0 6px rgba(242, 183, 5, 0.85));
        }

        /* ---------- contact (address / phone / mail) ---------- */
        .vt-footer__contact {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .vt-footer__contact-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px 20px;
        }
        .vt-footer__contact-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #fff;
          font-size: 0.92rem;
          transition: color 0.25s, transform 0.25s;
        }
        .vt-footer__contact-item--address {
          max-width: 560px;
          text-align: center;
          line-height: 1.45;
        }
        .vt-footer__contact-item i {
          color: #fff;
          font-size: 1rem;
          transition: transform 0.3s ease, color 0.25s, filter 0.25s;
        }
        .vt-footer__contact-item:hover,
        .vt-footer__contact-item:focus-visible {
          color: var(--gold);
          transform: translateY(-2px);
        }
        .vt-footer__contact-item:hover i,
        .vt-footer__contact-item:focus-visible i {
          color: var(--gold);
          transform: scale(1.25) rotate(-8deg);
          filter: drop-shadow(0 0 6px rgba(242, 183, 5, 0.85));
        }

        /* ---------- socials: WHITE icons + effects ---------- */
        .vt-footer__socials {
          display: flex;
          gap: 14px;
          flex-shrink: 0;
        }
        .vt-footer__social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border: 1.5px solid #fff;
          border-radius: 10px;
          color: #fff;
          font-size: 1rem;
          transition: background 0.25s, color 0.25s, border-color 0.25s,
            transform 0.25s, box-shadow 0.25s;
        }
        .vt-footer__social i {
          transition: transform 0.3s ease;
        }
        .vt-footer__social:hover,
        .vt-footer__social:focus-visible {
          background: var(--gold);
          border-color: var(--gold);
          color: #0d2414;
          transform: translateY(-4px) scale(1.08);
          box-shadow: 0 8px 20px rgba(242, 183, 5, 0.45);
        }
        .vt-footer__social:hover i,
        .vt-footer__social:focus-visible i {
          transform: rotate(360deg);
        }

        /* ---------- bottom row ---------- */
        .vt-footer__bottom {
          position: relative;
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 22px 0 26px;
          font-size: 0.92rem;
          margin-top: 80px;
        }
        .vt-footer__bottom::before {
          content: "";
          position: absolute;
          top: 0;
          left: -24px;
          right: -24px;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            var(--gold) 25%,
            var(--gold) 75%,
            transparent
          );
          opacity: 0.7;
        }
        .vt-footer__legal {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .vt-footer__legal a {
          color: #fff;
          transition: color 0.25s;
        }
        .vt-footer__legal a:hover {
          color: var(--gold);
        }
        .vt-footer__copy {
          margin: 0;
          flex: 1;
          text-align: center;
          color: #fff;
        }

        /* ---------- Projects dropdown (opens upward) ---------- */
        .vt-footer__dropwrap {
          position: relative;
        }
        .vt-footer__caret {
          width: 7px;
          height: 7px;
          margin-left: 2px;
          border-right: 1.5px solid #fff;
          border-bottom: 1.5px solid #fff;
          transform: translateY(2px) rotate(-135deg);
          transition: transform 0.25s, border-color 0.25s;
        }
        .vt-footer__link:hover .vt-footer__caret {
          border-color: var(--gold);
        }
        .vt-footer__caret.is-open {
          transform: translateY(-1px) rotate(45deg);
        }
        .vt-footer__menu {
          position: absolute;
          left: 50%;
          bottom: 100%;
          padding-bottom: 16px;
          transform: translate(-50%, 8px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.22s, transform 0.22s, visibility 0.22s;
          z-index: 20;
        }
        .vt-footer__menu.is-open {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, 0);
        }
        .vt-footer__menu ul {
          position: relative;
          list-style: none;
          margin: 0;
          padding: 8px;
          min-width: 220px;
          background: rgba(10, 32, 17, 0.98);
          border: 1px solid var(--gold);
          border-radius: 14px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
        }
        .vt-footer__menu ul::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -7px;
          width: 12px;
          height: 12px;
          background: rgba(10, 32, 17, 0.98);
          border-right: 1px solid var(--gold);
          border-bottom: 1px solid var(--gold);
          transform: translateX(-50%) rotate(45deg);
        }
        .vt-footer__menu li a {
          display: block;
          padding: 10px 14px;
          border-radius: 8px;
          color: #fff;
          font-size: 0.95rem;
          white-space: nowrap;
          transition: background 0.2s, color 0.2s, padding-left 0.2s;
        }
        .vt-footer__menu li a:hover,
        .vt-footer__menu li a:focus-visible {
          background: rgba(242, 183, 5, 0.14);
          color: var(--gold);
          padding-left: 20px;
        }

        /* ---------- responsive ---------- */
        @media (max-width: 1100px) {
          .vt-hide-md {
            display: none;
          }
          .vt-footer__top {
            flex-direction: column;
            margin-top: 56px;
            gap: 28px;
          }
          .vt-footer__navitem .vt-footer__divider {
            margin: 0 16px;
          }
        }
        @media (max-width: 640px) {
          .vt-footer__menu ul {
            min-width: min(260px, 80vw);
          }
          .vt-footer__menu li a {
            padding: 14px 16px;
          }
          .vt-footer__nav {
            gap: 14px 0;
          }
          .vt-footer__navitem .vt-footer__divider {
            display: none;
          }
          .vt-footer__link {
            margin: 0 14px;
          }
          .vt-footer__contact-row {
            flex-direction: column;
            gap: 12px;
          }
          .vt-footer__contact-row .vt-footer__divider--sm {
            display: none;
          }
          .vt-footer__bottom {
            flex-direction: column;
            gap: 10px;
            margin-top: 40px;
          }
          .vt-footer__copy {
            font-size: 0.8rem;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .vt-footer__social,
          .vt-footer__social i,
          .vt-footer__link,
          .vt-footer__link i,
          .vt-footer__contact-item,
          .vt-footer__contact-item i,
          .vt-footer__menu,
          .vt-footer__caret {
            transition: none;
          }
        }
      `}</style>
    </footer>
  );
}
