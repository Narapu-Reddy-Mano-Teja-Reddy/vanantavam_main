"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Magnetic from "@/components/premium/Magnetic";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-dark-forest)",
        color: "#FFF",
        padding: "100px 0 40px",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div className="container">
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "60px",
            marginBottom: "80px",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div style={{ maxWidth: "400px", marginBottom: "20px" }}>
            <img
              src="/assets/images/Project-Logos/vanatvam.png"
              alt="Vanatvam Logo"
              style={{
                height: "80px",
                width: "auto",
                maxWidth: "100%",
                objectFit: "contain",
                display: "block",
                marginBottom: "15px",
              }}
            />
            <div
              style={{
                fontSize: "0.85rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                marginBottom: "20px",
              }}
            >
              Natural Farms · Nature Communities
            </div>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
              }}
            >
             VanaTvam Private Limited is developing sustainable managed
              farmlands, native forests, and ecological communities across
              Karnataka.
            </p>
          </div>

          <div>
            <h4
              style={{
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#FFF",
                marginBottom: "24px",
                fontWeight: 600,
              }}
            >
              Navigation
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Link href="/" className="footer-link">
                Home
              </Link>
              <Link href="/about" className="footer-link">
                Our Story
              </Link>
              <Link href="/projects" className="footer-link">
                Projects Overview
              </Link>
              <Link href="/investment" className="footer-link">
                Investment Guide
              </Link>
              <Link href="/blog" className="footer-link">
                Journal
              </Link>
              <Link href="/contact" className="footer-link">
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <h4
              style={{
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#FFF",
                marginBottom: "24px",
                fontWeight: 600,
              }}
            >
              Our Communities
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Link href="/brindavana" className="footer-link">
                Brindavana (Pavagada)
              </Link>
              <Link href="/madhuvana" className="footer-link">
                Madhuvana (Maddur)
              </Link>
              <Link href="/anantavana" className="footer-link">
                Anantavana (Kabini)
              </Link>
              <Link href="/eeshavana" className="footer-link">
                Eeshavana (Cauvery)
              </Link>
            </div>
          </div>

          <div>
            <h4
              style={{
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#FFF",
                marginBottom: "24px",
                fontWeight: 600,
              }}
            >
              Connect
            </h4>
            <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
              {[
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
                  url: "https://www.linkedin.com/in/your_username/",
                },
              ].map((s) => (
                <Magnetic key={s.icon} strength={0.3}>
                  <a
                    href={s.url}
                    aria-label={s.label}
                    style={{
                      color: "var(--accent-gold)",
                      fontSize: "1.4rem",
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
            <p
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
              }}
            >
              Managed Farmland Bangalore
              <br />
              Sustainable Farmland Karnataka
              <br />
              Eco Friendly Farm Communities
            </p>
          </div>
        </motion.div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "40px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <div>
            Rooted in nature. Built for generations. CIN: U01100KA2022PTC159587
          </div>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Link href="/privacy-policy" className="footer-link-small">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-link-small">
              Terms & Conditions
            </Link>
            <span>
              &copy; {new Date().getFullYear()}VanaTvam Private Limited.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
