"use client";
import { motion } from "framer-motion";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import RevealText from "@/components/premium/RevealText";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/premium/Magnetic";

const STORY_SECTIONS = [
  "The Covid years changed how we saw life. Pollution, shrinking green spaces and isolation made clean air and time in nature feel more precious than ever. We began asking: had we moved too far away from nature?",
  "Though modern life has distanced us from the land, time among trees and open spaces still brings calm and a sense of belonging. We imagined creating places where people could reconnect with nature and one another.",
  "That vision led us to establish Vanatvam in March 2022: to nurture biodiverse landscapes and communities where people can breathe, reconnect and belong.",
  "That is the journey we are on today. Every tree we plant and every landscape we nurture brings us a little closer to that vision.",
];

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
            AboutVanaTvam Private Limited
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
            VanaTvam is more than land development. It is a living ecosystem of
            nature, community, and purpose — designed for a healthier, calmer,
            and more meaningful life.
          </motion.p>
        </div>
      </section>




      {/* Personal Journey Section */}
      <section
        style={{
          padding: "clamp(80px, 10vh, 120px) 0",
          background: "var(--bg-cream)",
          color: "var(--text-dark)",
          overflow: "hidden",
        }}
      >
        <div
          className="container about-story-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(360px, 1.05fr)",
            alignItems: "center",
            gap: "clamp(36px, 6vw, 80px)",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              style={{ marginBottom: "32px" }}
            >
              <span
                style={{
                  display: "block",
                  color: "var(--accent-gold)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Our Story
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.8rem, 4vw, 3.8rem)",
                  color: "var(--bg-dark-forest)",
                  lineHeight: 1.12,
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                The Story of Vanatvam —{" "}
                <span style={{ color: "var(--accent-gold)", fontStyle: "italic" }}>
                  A Personal Journey Back to Nature
                </span>
              </h2>
            </motion.div>

            <div style={{ display: "grid", gap: "24px" }}>
              {STORY_SECTIONS.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.7,
                    delay: Math.min(index * 0.04, 0.2),
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  style={{
                    fontSize: "1.2rem",
                    color: "var(--text-dark)",
                    lineHeight: 1.8,
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {paragraph}
                </motion.p>

              ))}
           <Magnetic strength={0.25}>
                                <Link
                                  href="/founders-statement"
                                  className="btn-pill btn-pill-gold"
                                  style={{
                                    padding: "14px 32px",
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                  }}
                                >
                                  Read Our Full Story <ArrowRight className="size-4" />
                                </Link>
                              </Magnetic>
            </div>

          </div>

          <motion.div
            className="about-story-image"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            style={{
              minWidth: 0,
              position: "sticky",
              top: "120px",
              height: "min(76vh, 760px)",
              minHeight: "520px",
              overflow: "visible",
            }}
          >
            <div className="about-story-photo">
              <motion.img
                whileHover={{ scale: 1.025 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                src="/assets/images/ourstory.png"
                alt="A family walking through a green landscape at sunrise"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <motion.div
              className="about-story-callout"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              style={{
                position: "absolute",
                zIndex: 1,
                left: "-24px",
                bottom: "-34px",
                width: "min(78%, 360px)",
                padding: "clamp(20px, 2.5vw, 28px)",
                borderRadius: "22px",
                border: "1px solid rgba(198,162,101,0.5)",
                background: "linear-gradient(145deg, #1E352F 0%, #122217 100%)",
                boxShadow: "0 24px 60px rgba(18,34,23,0.32)",
                color: "#FFF",
              }}
            >
               
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.25rem, 2vw, 1.3rem)",
                  fontStyle: "italic",
                  lineHeight: 1.35,
                  color: "#FFF",
                  margin: "0 0 14px",
                }}
              >
                Come, Be Part of Our Journey
              </h3>
              <p
                style={{
                  maxWidth: "400px",
                  margin: "0 0 22px",
                  fontSize: "0.98rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.82)",
                }}
              >
                Join a community building a greener, more connected future through a deeper relationship with nature.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "11px 18px",
                  borderRadius: "999px",
                  background: "var(--accent-gold)",
                  color: "var(--bg-dark-forest)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Speak to our team
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <style jsx>{`
          @media (max-width: 850px) {
            .about-story-layout {
              grid-template-columns: minmax(0, 1fr) !important;
            }

            .about-story-image {
              position: relative !important;
              top: auto !important;
              height: 480px;
              min-height: 0;
              max-width: 600px;
              margin: 0 auto;
            }

            .about-story-photo {
              height: 100%;
            }

            .about-story-callout {
              left: 0 !important;
              bottom: -48px !important;
              width: calc(100% - 24px) !important;
            }
          }

          .about-story-photo {
            position: absolute;
            inset: 0;
            overflow: hidden;
            border-radius: 26px;
            border: 1px solid rgba(198, 162, 101, 0.55);
            box-shadow: 0 32px 80px rgba(18, 34, 23, 0.24);
            background: var(--bg-dark-forest);
          }
        `}</style>
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
              }}
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                src="/assets/project-images/Esahavana/EV_Image1.png"
                alt="Sacred Ecosystems"
                style={{ width: "100%", height: "500px" }}
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
                Our vision forVanaTvam is deeply rooted in the profound wisdom
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

      {/* Founder Leadership Section */}
            <section
              style={{
                padding: "clamp(90px, 12vh, 130px) 0",
                background: "#122217",
                color: "#FFFFFF",
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
                  {/* Founder Visual Frame */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ flex: "1 1 420px", position: "relative" }}
                  >
                    <div
                      style={{
                        borderRadius: "28px",

                        boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <img
                        src="/assets/images/founder.png"
                        alt="Founder leadership and land care"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>

                    {/* Floating Quote Badge */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-25px",
                        right: "-15px",
                        background: "rgba(18,34,23,0.92)",
                        backdropFilter: "blur(16px)",
                        padding: "28px 32px",
                        borderRadius: "20px",
                        border: "1px solid rgba(198,162,101,0.4)",
                        maxWidth: "320px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "2rem",
                          color: "var(--accent-gold)",
                          lineHeight: 0.5,
                          display: "block",
                          marginBottom: "14px",
                        }}
                      >
                        &ldquo;
                      </span>
                      <p
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.18rem",
                          fontStyle: "italic",
                          margin: 0,
                          lineHeight: 1.5,
                          color: "#FFFFFF",
                        }}
                      >
                        When nature is nurtured, life flourishes in its purest form.
                      </p>
                      <div
                        style={{
                          marginTop: "12px",
                          fontSize: "0.8rem",
                          color: "var(--accent-gold)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        — Deepak Kasthuri
                      </div>
                    </div>
                  </motion.div>

                  {/* Founder Bio Column */}
                  <div style={{ flex: "1 1 500px" }}>
                    <span
                      style={{
                        color: "var(--accent-gold)",
                        fontSize: "0.82rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        display: "block",
                        marginBottom: "18px",
                      }}
                    >
                      FOUNDER &amp; MANAGING DIRECTOR
                    </span>

                    <h2
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(2.6rem, 5vw, 4rem)",
                        color: "#FFFFFF",
                        lineHeight: 1.12,
                        letterSpacing: "-0.02em",
                        fontWeight: 600,
                        marginBottom: "20px",
                      }}
                    >
                      Deepak Kasthuri
                    </h2>

                    <p
                      style={{
                        fontSize: "1.2rem",
                        color: "var(--accent-gold)",
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        marginBottom: "24px",
                      }}
                    >
                       Deepak Kasturi founded Vanatvam after nearly three decades in IT, working at Wipro, Infosys and Capgemini. He led international programmes for Fortune 500 clients and won recognition for large-scale delivery. That career taught him how to plan, execute, and hold a standard.
                    </p>

                    <p
                      style={{
                        fontSize: "1.12rem",
                        color: "rgba(255,255,255,0.85)",
                        lineHeight: 1.8,
                        marginBottom: "18px",
                        fontWeight: 400,
                      }}
                    >
                      Deepak Kasturi founded Vanatvam after nearly three decades in IT, working at Wipro, Infosys and Capgemini. He led international programmes for Fortune 500 clients and won recognition for large-scale delivery. That career taught him how to plan, execute, and hold a standard.
                    </p>

                    <p
                      style={{
                        fontSize: "1.05rem",
                        color: "rgba(255,255,255,0.7)",
                        lineHeight: 1.8,
                        marginBottom: "32px",
                      }}
                    >
                      Vaishnavi Achar carried that same discipline into Brindavana. She managed the project on the ground, in the arid terrain of Pavagada, while Deepak stayed in his corporate role. Years of planting, learning, and adjusting taught her what it actually takes to grow something in difficult land — patience measured in seasons, not quarters.
                    </p>
                    <p
                                    style={{
                                      fontSize: "1.05rem",
                                      color: "rgba(255,255,255,0.7)",
                                      lineHeight: 1.8,
                                      marginBottom: "32px",
                                    }}
                                  >
                                    When Deepak eventually left his corporate career, he brought both halves together: the rigor of running global programmes and the patience of growing something from soil. That combination is Vanatvam’s foundation — natural farm communities that restore biodiversity, reconnect people with land, and bring like-minded people together.
                                  </p>
                    <p
                                    style={{
                                      fontSize: "1.05rem",
                                      color: "rgba(255,255,255,0.7)",
                                      lineHeight: 1.8,
                                      marginBottom: "32px",
                                    }}
                                  >

      Vaishnavi and Deepak want Vanatvam’s name to mean something: integrity, responsible development, a real commitment to the land and the people on it. For them, this isn’t a business venture. It’s a chance to put their values into something their children’s generation can still walk through.
                                  </p>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "24px",
                        borderTop: "1px solid rgba(255,255,255,0.12)",
                        paddingTop: "28px",
                        marginBottom: "36px",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            color: "rgba(255,255,255,0.5)",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            display: "block",
                            marginBottom: "4px",
                          }}
                        >
                          Registered Entity
                        </span>
                        <strong
                          style={{
                            fontSize: "1.05rem",
                            color: "#FFFFFF",
                            fontWeight: 600,
                          }}
                        >
                          VanaTvam Private Limited
                        </strong>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            color: "rgba(255,255,255,0.5)",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            display: "block",
                            marginBottom: "4px",
                          }}
                        >
                          Headquarters
                        </span>
                        <strong
                          style={{
                            fontSize: "1.05rem",
                            color: "#FFFFFF",
                            fontWeight: 600,
                          }}
                        >
                          Bengaluru, Karnataka
                        </strong>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </section>


      {/* Recognition Section */}
      {/* <section
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
                <RevealText>
                  FKCCI Award in Tourism & Hospitality - 2026
                </RevealText>
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
                VanaTvam&apos;s work has received institutional recognition
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
            </motion.div> */}

            {/* Right Side — Recognition Image */}
            {/* <motion.div
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              style={{
                position: "relative",
                width: "100%",
                height: "560px",
                
              }}
            >
              <motion.img
                src="/Event images/award.png"
                alt="Vanatvam's nature-led landscape and green surroundings"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  width: "100%",
                  height: "100%",
                 
                }}
              />


            </motion.div>
          </div>
        </div>
      </section> */}

      

      <Footer />
    </>
  );
}
