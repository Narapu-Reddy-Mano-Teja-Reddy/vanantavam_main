"use client";
import { motion } from "framer-motion";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import RevealText from "@/components/premium/RevealText";

export default function About() {
  return (
    <>
      <Navigation />

      {/* Premium Hero Section */}
      <section
        className="hero"
        style={{
          height: "85vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <motion.div 
          initial={{ scale: 1.15, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        >
          <img
            src="/assets/project-images/Brindavana/Sunny Tropical Banana Orchard.png"
            alt="Vanatvam Vision"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(18, 34, 23, 0.4) 0%, rgba(18, 34, 23, 0.88) 100%)",
            }}
          />
        </motion.div>

        <div
          className="container relative"
          style={{ zIndex: 1, textAlign: "center", paddingTop: "80px" }}
        >
          <motion.span
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            style={{
              color: "#FFFFFF",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "30px",
              display: "inline-block",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "8px 24px",
              borderRadius: "30px",
              backdropFilter: "blur(5px)",
            }}
          >
            About Vanatvam Private Limited
          </motion.span>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(3.5rem, 7vw, 6rem)",
              color: "#FFFFFF",
              lineHeight: 1.05,
              marginBottom: "30px",
              letterSpacing: "-0.02em",
            }}
          >
            <RevealText>A Vision Rooted</RevealText>
            <br />
            <RevealText
              delay={0.15}
              style={{ fontStyle: "italic", color: "var(--accent-gold)" }}
            >
              in Nature.
            </RevealText>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.25, 1, 0.5, 1] }}
            style={{
              fontSize: "1.25rem",
              color: "rgba(255,255,255,0.85)",
              maxWidth: "650px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Vanatvam is more than land development. It is a living ecosystem of
            nature, community, and purpose — designed for a healthier, calmer,
            and more meaningful life.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section
        style={{
          padding: "clamp(90px, 12vh, 140px) 0",
          background: "var(--bg-cream)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "80px",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1 1 400px", position: "relative" }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  width: "100%",
                  height: "600px",
                  borderRadius: "30px",
                  overflow: "hidden",
                  boxShadow: "0 35px 70px rgba(0,0,0,0.12)",
                }}
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  src="/assets/project-images/Ananthavana/hero_image_2.jpg"
                  alt="Forest walkway - Vanatvam"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>

              {/* Decorative overlapping quote block */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: 40 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  position: "absolute",
                  bottom: "-40px",
                  right: "-40px",
                  background: "var(--bg-dark-forest)",
                  padding: "40px",
                  borderRadius: "24px",
                  maxWidth: "320px",
                  color: "#FFF",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(2.2rem, 4.0vw, 4.0rem)",
                    color: "var(--accent-gold)",
                    fontFamily: "var(--font-serif)",
                    lineHeight: 0.5,
                    display: "block",
                    marginBottom: "20px",
                  }}
                >
                  &ldquo;
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.25rem",
                    fontStyle: "italic",
                    marginBottom: "15px",
                    lineHeight: 1.5,
                    color: "#FFFFFF",
                  }}
                >
                  If you want to save the wildlife, start by saving the trees.
                </p>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 300,
                  }}
                >
                  — Deepak Kasthuri, MD
                </span>
              </motion.div>
            </div>

            <div style={{ flex: "1 1 500px" }}>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "20px",
                }}
              >
                Our Story & Founding Philosophy
              </motion.span>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.8rem, 4vw, 3.8rem)",
                    color: "var(--bg-dark-forest)",
                    lineHeight: 1.1,
                    marginBottom: "30px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  <RevealText>From a Vision to a</RevealText>
                  <br />
                  <RevealText delay={0.1}>Living Legacy.</RevealText>
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 }}
                style={{
                  fontSize: "1.2rem",
                  color: "var(--text-dark)",
                  lineHeight: 1.8,
                  marginBottom: "25px",
                  fontWeight: 300,
                }}
              >
                <strong
                  style={{ color: "var(--bg-dark-forest)", fontWeight: 500 }}
                >
                  VanaTvam
                </strong>
                , in collaboration with Indus Herbs, is an organization of
                passionate individuals who believe that farming and leisure must
                be in harmony with nature. Our mission is to create Sustainable
                Natural Farm Communities that connect us to our ancient cultural
                traditions and revive them for future generations.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35 }}
                style={{
                  fontSize: "1.2rem",
                  color: "var(--text-dark)",
                  lineHeight: 1.8,
                  marginBottom: "25px",
                  fontWeight: 300,
                }}
              >
                At VanaTvam, we believe in the power of Natural Sustainability
                to create a better world. &ldquo;Natural Sustainable land
                practices&rdquo; refers to the use and management of land
                resources in a way that maintains productivity and benefits both
                current and future generations. This preserves soil fertility,
                conserves water resources, and protects biodiversity while
                meeting our needs.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.45 }}
                style={{
                  fontSize: "1.2rem",
                  color: "var(--text-dark)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                We are not just a &ldquo;Farmland Developer&rdquo;. We
                understand many would love to connect with nature and enjoy
                living on their own farms, but face obstacles like lack of time
                or farming knowledge. We are on a mission to change that—by
                making owning a farm simple, meaningful, and fulfilling.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Ecosystems Section */}
      <section
        style={{
          padding: "clamp(90px, 12vh, 140px) 0",
          background: "var(--bg-dark-forest)",
          color: "#FFF",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "80px",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
              style={{
                flex: "1 1 400px",
                borderRadius: "30px",
                overflow: "hidden",
                boxShadow: "0 35px 70px rgba(0,0,0,0.35)",
              }}
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                src="/assets/project-images/Esahavana/EV Image.png"
                alt="Sacred Ecosystems"
                style={{ width: "100%", height: "500px", objectFit: "cover" }}
              />
            </motion.div>

            <div style={{ flex: "1 1 500px" }}>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "20px",
                }}
              >
                OUR INSPIRATION
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  color: "#FFF",
                  lineHeight: 1.1,
                  marginBottom: "30px",
                  letterSpacing: "-0.02em",
                }}
              >
                Re-creating Sacred
                <br />
                <span
                  style={{ fontStyle: "italic", color: "var(--accent-gold)" }}
                >
                  Ecosystems.
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 }}
                style={{
                  fontSize: "1.2rem",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.8,
                  marginBottom: "25px",
                  fontWeight: 300,
                }}
              >
                Our vision for VanaTvam is deeply rooted in the profound wisdom
                of the Brihat Samhita, an ancient Indian text illuminating
                sustainable living and sacred ecological balance. We embarked on
                this journey driven by a desire to recreate these sacred,
                thriving ecosystems that honour both the land and those who
                inhabit it.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35 }}
                style={{
                  fontSize: "1.2rem",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                VanaTvam is our heartfelt commitment to nurturing a space where
                nature flourishes alongside human aspiration—cultivating a
                community bound by respect, sustainability, and cultural
                richness.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section
        style={{
          background: "#1B2B1F",
          color: "#FFF",
          padding: "clamp(90px, 12vh, 140px) 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
            {/* Top Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <span
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "20px",
                }}
              >
                Biodiversity by Design
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "40px",
                }}
              >
                We don't landscape.
                <br />
                <span
                  style={{ color: "var(--accent-gold)", fontStyle: "italic" }}
                >
                  We create ecosystems.
                </span>
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                  gap: "40px",
                  fontSize: "1.15rem",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                <div>
                  <p style={{ marginBottom: "20px" }}>
                    A landscape can be designed.{" "}
                    <strong>An ecosystem must be nurtured.</strong>
                  </p>
                  <p style={{ marginBottom: "20px" }}>
                    At Vanatvam, we don't simply plant trees, create gardens or
                    beautify land. We thoughtfully bring together{" "}
                    <strong>
                      trees, water, soil, native plants, birds, butterflies and
                      natural habitats
                    </strong>{" "}
                    to create places where life can flourish.
                  </p>
                  <p>
                    Our approach is rooted in{" "}
                    <strong>
                      India's ancient understanding of living with nature
                    </strong>{" "}
                    — from the wisdom documented in <em>Brihat Samhita</em> to
                    traditions such as{" "}
                    <strong>
                      Vinayaka Vana, Rashi Vana and Navagraha Vana
                    </strong>
                    .
                  </p>
                </div>
                <div>
                  <div
                    style={{
                      padding: "30px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "20px",
                      borderLeft: "4px solid var(--accent-gold)",
                      marginBottom: "30px",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontStyle: "italic",
                        color: "var(--accent-gold)",
                        fontSize: "1.2rem",
                        lineHeight: 1.6,
                      }}
                    >
                      Every tree has a purpose.
                      <br />
                      Every grove creates habitat.
                      <br />
                      Every water body supports life.
                      <br />
                      Every living element becomes part of a larger whole.
                    </p>
                  </div>
                  <p style={{ marginBottom: "20px" }}>
                    This is not landscaping. This is the patient work of
                    creating a living, breathing ecosystem — one that grows
                    richer with every passing year.
                  </p>
                  <p
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 500,
                      color: "#FFF",
                    }}
                  >
                    Our belief: When nature thrives, people thrive too.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid with staggered entrances */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
              }}
            >
              {[
                { value: "250+", label: "Tree Varieties" },
                { value: "150+", label: "Rare & Endangered Species" },
                { value: "20,000+", label: "Trees" },
                { value: "60+", label: "Bird Species" },
                { value: "150+", label: "Butterfly Species" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                  whileHover={{ 
                    y: -10, 
                    borderColor: "rgba(198,162,101,0.5)", 
                    background: "rgba(255,255,255,0.07)",
                    transition: { duration: 0.3 } 
                  }}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    padding: "40px 20px",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    textAlign: "center",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontFamily: "var(--font-serif)",
                      color: "var(--accent-gold)",
                      marginBottom: "10px",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 2x2 Concept Grid with staggered entrances */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "30px",
              }}
            >
              {[
                {
                  title: "Nakshatra Vana",
                  text: "Forests inspired by India's ancient connection between trees, nature, and the stars. A tranquil space for reflection.",
                },
                {
                  title: "Navagraha Vana",
                  text: "Thematic plantations rooted in India's traditional ecological knowledge, bringing balance to the environment.",
                },
                {
                  title: "Soil & Water",
                  text: "Engineered swales, rain catchments, and organic soil enrichment that continuously recharge groundwater levels.",
                },
                {
                  title: "Self-Sustaining",
                  text: "The ultimate objective is simple yet profound: Create an ecosystem that can naturally sustain and regenerate itself.",
                },
              ].map((concept, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 1, 0.5, 1] }}
                  whileHover={{ 
                    y: -12, 
                    boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                    borderColor: "rgba(198,162,101,0.4)",
                    transition: { duration: 0.3 } 
                  }}
                  style={{
                    background: "#FFF",
                    color: "var(--text-dark)",
                    padding: "40px",
                    borderRadius: "24px",
                    textAlign: "center",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    border: "1px solid transparent",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "var(--bg-cream)",
                      margin: "0 auto 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-gold)",
                      border: "1px solid rgba(198,162,101,0.2)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.2rem",
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      color: "var(--bg-dark-forest)",
                      marginBottom: "15px",
                    }}
                  >
                    {concept.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      lineHeight: 1.6,
                      fontSize: "0.95rem",
                    }}
                  >
                    {concept.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section
        style={{ padding: "clamp(90px, 12vh, 140px) 0", background: "#F9F8F6" }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: "80px",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            >
              <span
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "20px",
                }}
              >
                Institutional Recognition
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.5rem, 4vw, 3.2rem)",
                  color: "var(--bg-dark-forest)",
                  lineHeight: 1.1,
                  marginBottom: "30px",
                  letterSpacing: "-0.02em",
                }}
              >
                <RevealText>FKCCI Award in Tourism & Hospitality</RevealText>
              </h2>
              <p
                style={{
                  fontSize: "1.15rem",
                  color: "var(--text-dark)",
                  lineHeight: 1.8,
                  marginBottom: "20px",
                  fontWeight: 300,
                }}
              >
                Vanatvam&apos;s work has received institutional recognition
                through an{" "}
                <strong
                  style={{ color: "var(--bg-dark-forest)", fontWeight: 500 }}
                >
                  FKCCI Award in Tourism and Hospitality
                </strong>{" "}
                from the Federation of Karnataka Chambers of Commerce and
                Industry.
              </p>
              <p
                style={{
                  fontSize: "1.15rem",
                  color: "var(--text-dark)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                This award reflects a growing realization: nature-led land
                development and commercial viability can coexist seamlessly,
                delivering both ecological regeneration and long-term asset
                security.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(0,0,0,0.08)", transition: { duration: 0.3 } }}
              style={{
                background: "#FFFFFF",
                padding: "60px",
                borderRadius: "30px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.03)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2rem",
                  color: "var(--bg-dark-forest)",
                  marginBottom: "40px",
                  borderBottom: "1px solid rgba(0,0,0,0.05)",
                  paddingBottom: "20px",
                }}
              >
                Corporate Identification
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: 600,
                    }}
                  >
                    Company Name
                  </span>
                  <strong
                    style={{
                      fontSize: "1.25rem",
                      color: "var(--bg-dark-forest)",
                      fontWeight: 500,
                    }}
                  >
                    Vanatvam Private Limited
                  </strong>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: 600,
                    }}
                  >
                    CIN
                  </span>
                  <strong
                    style={{
                      fontSize: "1.25rem",
                      color: "var(--bg-dark-forest)",
                      fontWeight: 500,
                    }}
                  >
                    U01100KA2022PTC159587
                  </strong>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: 600,
                    }}
                  >
                    Registered Location
                  </span>
                  <strong
                    style={{
                      fontSize: "1.25rem",
                      color: "var(--bg-dark-forest)",
                      fontWeight: 500,
                    }}
                  >
                    Bengaluru, Karnataka
                  </strong>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}