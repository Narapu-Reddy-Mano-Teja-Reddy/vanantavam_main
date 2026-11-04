"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Magnetic from "@/components/premium/Magnetic";

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
    url: "https://www.linkedin.com/in/your_username/", // replace with your real page
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-dark-forest)",
        color: "#FFF",
        padding: "70px 0 32px",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div className="container">
        {/* TOP: Logo + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            src="/assets/images/Project-Logos/vanatvam.webp"
            alt="Vanatvam Logo"
            style={{
              height: "80px",
              width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
              display: "block",
              marginBottom: "16px",
            }}
          />
          <div
            style={{
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Natural Farms · Nature Communities
          </div>
        </motion.div>

        {/* MIDDLE: Social media links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "28px",
            margin: "40px 0 48px",
          }}
        >
          {SOCIALS.map((s) => (
            <Magnetic key={s.icon} strength={0.3}>
              <a
                href={s.url}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "1.4rem",
                  display: "inline-block",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <i className={`fa-brands ${s.icon}`}></i>
              </a>
            </Magnetic>
          ))}
        </div>

        {/* BOTTOM: Privacy policy line */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px 24px",
            paddingTop: "28px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
          }}
        >
          <Link href="/privacy-policy" className="footer-link-small">
            Privacy Policy
          </Link>
          <Link href="/terms" className="footer-link-small">
            Terms & Conditions
          </Link>
          <span>
            &copy; {new Date().getFullYear()} VanaTvam Private Limited. CIN:
            U01100KA2022PTC159587
          </span>
        </div>
      </div>
    </footer>
  );
}