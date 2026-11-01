'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export default function Investment() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          minHeight: '88vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 20px 80px',
          overflow: 'hidden',
          backgroundColor: '#0E1A12',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/assets/images/Investment.webp"
            alt="Alternative Investment Opportunities with Vanatvam"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(14, 26, 18, 0.72) 0%, rgba(14, 26, 18, 0.88) 60%, #0E1A12 100%)',
            }}
          />
        </div>

        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            maxWidth: '920px',
            margin: '0 auto',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 22px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(198, 162, 101, 0.4)',
              backdropFilter: 'blur(10px)',
              color: '#F9F8F6',
              fontSize: '0.82rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '28px',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-gold, #C6A265)',
                display: 'inline-block',
              }}
            />
            Alternative Investment Opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.75rem, 5.5vw, 4.8rem)',
              color: '#FFFFFF',
              lineHeight: 1.1,
              marginBottom: '26px',
              letterSpacing: '-0.02em',
              fontWeight: 600,
            }}
          >
            Invest with Purpose.{' '}
            <span
              style={{
                display: 'block',
                color: 'var(--accent-gold, #C6A265)',
                fontStyle: 'italic',
                fontWeight: 400,
              }}
            >
              Grow with Nature.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              color: 'rgba(249, 248, 246, 0.88)',
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: '720px',
              margin: '0 auto 36px',
            }}
          >
            Explore curated investment opportunities in nature-first development with Vanatvam.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="#connect-form"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'var(--brand-earth-brown, #72351C)',
                color: '#FFFFFF',
                padding: '16px 36px',
                borderRadius: '999px',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 12px 28px rgba(114, 53, 28, 0.35)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = '#8B4224';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'var(--brand-earth-brown, #72351C)';
              }}
            >
              REQUEST A DISCUSSION
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>→</span>
            </a>
            <a
              href="#market-perspective"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 32px',
                borderRadius: '999px',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#F9F8F6',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold, #C6A265)';
                e.currentTarget.style.color = 'var(--accent-gold, #C6A265)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.color = '#F9F8F6';
              }}
            >
              Market Insights
            </a>
          </motion.div>
        </div>
      </section>

      {/* Quote Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #16261B 0%, #122217 100%)',
          color: '#FFFFFF',
          padding: '60px 20px',
          borderTop: '1px solid rgba(198, 162, 101, 0.25)',
          borderBottom: '1px solid rgba(198, 162, 101, 0.25)',
          position: 'relative',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '3.5rem',
                lineHeight: 1,
                color: 'var(--accent-gold, #C6A265)',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              &ldquo;
            </span>
            <blockquote
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.4rem, 2.5vw, 2.1rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: 1.45,
                color: '#F9F8F6',
                margin: '0 auto 16px',
                maxWidth: '850px',
              }}
            >
              In uncertain times, diversification is your most prudent move.
            </blockquote>
            <p
              style={{
                fontSize: '0.92rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold, #C6A265)',
                fontWeight: 600,
              }}
            >
              — Jean Lombard, Financial Adviser
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Diversify During Uncertain Times */}
      <section
        id="market-perspective"
        style={{
          padding: 'clamp(70px, 9vh, 110px) 20px',
          backgroundColor: 'var(--bg-cream, #F9F8F6)',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '60px',
              alignItems: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span
                style={{
                  color: 'var(--brand-earth-brown, #72351C)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '14px',
                }}
              >
                Portfolio Strategy
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  color: 'var(--bg-dark-forest, #122217)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '24px',
                }}
              >
                Diversify During Uncertain Times
              </h2>
              <p
                style={{
                  fontSize: '1.18rem',
                  color: '#344037',
                  lineHeight: 1.85,
                  marginBottom: '20px',
                  fontWeight: 400,
                }}
              >
                Diversify your investment portfolio during uncertain times. Spreading capital across
                different asset classes is one of the oldest ways to protect it when markets turn.
              </p>
              <div
                style={{
                  padding: '24px 28px',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  borderLeft: '4px solid var(--accent-gold, #C6A265)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                }}
              >
                <p
                  style={{
                    fontSize: '1rem',
                    color: '#4B554D',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Physical assets such as land have long been valued for their tangible nature and
                  long-term potential. As with all investments, values and liquidity can vary. Land has
                  historically held up well through uncertain periods.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(18, 34, 23, 0.15)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                aspectRatio: '16/10',
                backgroundColor: '#1B2B1F',
              }}
            >
              <Image
                src="/assets/images/Investment1.webp"
                alt="Market Volatility and Diversification Analytics"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(14, 26, 18, 0.65) 0%, transparent 60%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  color: '#FFFFFF',
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-gold, #C6A265)',
                    fontWeight: 600,
                  }}
                >
                  Macro Analysis
                </span>
                <p
                  style={{
                    fontSize: '0.98rem',
                    fontWeight: 400,
                    margin: '6px 0 0',
                    color: '#F9F8F6',
                  }}
                >
                  Equity market divergence and the historic resilience of real, tangible land assets.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Market Volatility at Home and Abroad */}
      <section
        style={{
          padding: 'clamp(70px, 9vh, 110px) 20px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--border-light, rgba(40, 44, 39, 0.08))',
          borderBottom: '1px solid var(--border-light, rgba(40, 44, 39, 0.08))',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ maxWidth: '820px', marginBottom: '50px' }}
          >
            <span
              style={{
                color: 'var(--accent-gold, #C6A265)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              Global & Domestic Trends
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                color: 'var(--bg-dark-forest, #122217)',
                lineHeight: 1.18,
                letterSpacing: '-0.02em',
                marginBottom: '20px',
              }}
            >
              Market Volatility at Home and Abroad
            </h2>
            <p
              style={{
                fontSize: '1.12rem',
                color: '#4B554D',
                lineHeight: 1.8,
                fontWeight: 400,
              }}
            >
              Indian equity markets, led by the Sensex and Nifty, move with global cues, foreign
              investment flows and domestic interest rates. When bond yields rise, equity valuations
              often come under pressure, and investors look for steadier ground.
            </p>
          </motion.div>

          {/* Context highlight cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
              marginBottom: '50px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'var(--bg-cream, #F9F8F6)',
                borderRadius: '20px',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  background: '#122217',
                }}
              >
                <Image
                  src="/assets/images/Global Ripple Effects.webp"
                  alt="Global Ripple Effects"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <div style={{ padding: '32px' }}>
                <div
                  style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--brand-earth-brown, #72351C)',
                    fontWeight: 700,
                    marginBottom: '12px',
                  }}
                >
                  Global Ripple Effects
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    color: '#122217',
                    marginBottom: '14px',
                    fontWeight: 600,
                  }}
                >
                  Cross-Market Interconnectedness
                </h3>
                <p
                  style={{
                    fontSize: '1rem',
                    color: '#556056',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  Global markets add a further layer of uncertainty. Shifts in US interest rates, trade
                  policy and geopolitical events have been sending ripples through every major market
                  at once, which is why diversification across asset classes matters.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                background: 'var(--bg-cream, #F9F8F6)',
                borderRadius: '20px',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  background: '#122217',
                }}
              >
                <Image
                  src="/assets/images/Global Asset Allocation Infographic.webp"
                  alt="15–16% Benchmark Declines"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <div style={{ padding: '32px' }}>
                <div
                  style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#B33928',
                    fontWeight: 700,
                    marginBottom: '12px',
                  }}
                >
                  Early 2026 Downturn
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    color: '#122217',
                    marginBottom: '14px',
                    fontWeight: 600,
                  }}
                >
                  15–16% Benchmark Declines
                </h3>
                <p
                  style={{
                    fontSize: '1rem',
                    color: '#556056',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  The numbers since January 2026 show how sharp and divergent that volatility has been.
                  After the US and Israeli strikes on Iran began in late February, both Indian and global
                  markets fell hard: the Nifty 50 dropped from a January 5 record of 26,373 to a March 30
                  closing low of 22,331, and the Sensex fell from its December 2025 peak of 86,159 to a
                  March 30 low near 71,948 — declines of roughly 15–16% (NSE/BSE data via Business
                  Standard).
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                background: 'var(--bg-cream, #F9F8F6)',
                borderRadius: '20px',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  background: '#122217',
                }}
              >
                <Image
                  src="/assets/images/Golden Hour Architectural Showcase.webp"
                  alt="Divergent Paths Across Borders"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <div style={{ padding: '32px' }}>
                <div
                  style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#2D6A4F',
                    fontWeight: 700,
                    marginBottom: '12px',
                  }}
                >
                  Market Divergence
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    color: '#122217',
                    marginBottom: '14px',
                    fontWeight: 600,
                  }}
                >
                  Divergent Paths Across Borders
                </h3>
                <p
                  style={{
                    fontSize: '1rem',
                    color: '#556056',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  The Nasdaq Composite confirmed its own correction on March 26, down about 11% from its
                  October 2025 record, as Iran war fears, a Meta Platforms selloff and doubts over AI
                  spending weighed on US tech stocks. By October 1, the S&P 500 and Nasdaq recovered to new
                  highs, up roughly 12% and over 15% YTD. Indian markets, by contrast, remained down ~14%
                  to 16% from their peaks, pressured by rising US 10-year yields, a weaker rupee and foreign
                  investor selling.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Full Narrative Card with Nature-Led Development */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'linear-gradient(135deg, #122217 0%, #1A2E20 100%)',
              color: '#FFFFFF',
              borderRadius: '24px',
              padding: 'clamp(40px, 6vw, 60px)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(18, 34, 23, 0.2)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(198, 162, 101, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <span
              style={{
                color: 'var(--accent-gold, #C6A265)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              The Vanatvam Model
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)',
                color: '#FFFFFF',
                lineHeight: 1.25,
                marginBottom: '24px',
                maxWidth: '850px',
              }}
            >
              Curated Opportunities in Land for Nature-First Projects
            </h3>
            <p
              style={{
                fontSize: '1.18rem',
                color: 'rgba(249, 248, 246, 0.92)',
                lineHeight: 1.85,
                fontWeight: 300,
                maxWidth: '960px',
                marginBottom: '20px',
              }}
            >
              Vanatvam offers the curated opportunities to invest in land for nature-first projects,
              where planning starts with the land, its ecology and its community, and returns follow
              long-term stewardship.
            </p>
            <p
              style={{
                fontSize: '1.18rem',
                color: 'rgba(249, 248, 246, 0.92)',
                lineHeight: 1.85,
                fontWeight: 300,
                maxWidth: '960px',
                marginBottom: '32px',
              }}
            >
              Vanatvam will develop the land parcels into Nature led projects and distribute the
              profits amongst its investors. Please reach out for further details by filling the details
              below if you are interested to know more.
            </p>
            <a
              href="#connect-form"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'var(--accent-gold, #C6A265)',
                color: '#122217',
                padding: '14px 32px',
                borderRadius: '999px',
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#D8B478';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-gold, #C6A265)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              EXPLORE OPPORTUNITIES
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Dedicated Investment Structure Section */}
      <section
        style={{
          padding: "clamp(80px, 10vh, 120px) 20px",
          background: "linear-gradient(180deg, #F4F1EA 0%, #EBE6DC 100%)",
          borderBottom: "1px solid rgba(18, 34, 23, 0.08)",
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", maxWidth: "840px", margin: "0 auto 60px" }}
          >
            <span
              style={{
                color: "var(--brand-earth-brown, #72351C)",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "14px",
              }}
            >
              Investment Framework
            </span>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                color: "var(--bg-dark-forest, #122217)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              Key Investment Terms &amp; Structure
            </h2>

            <p
              style={{
                fontSize: "1.12rem",
                color: "#4B554D",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              A structured, transparent capital deployment model backed by high-potential physical land assets, professional ecological master planning, and shared long-term capital growth.
            </p>
          </motion.div>

          {/* 3 Metric Cards Grid (Matching Reference Image Style) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginBottom: "60px",
            }}
          >
            {/* Card 1: Warm Beige Cream */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: "0 14px 30px rgba(0, 0, 0, 0.08)" }}
              style={{
                background: "#F5EEDF",
                borderRadius: "20px",
                padding: "36px 30px 30px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "170px",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-sans, system-ui, sans-serif)",
                  fontSize: "clamp(2.1rem, 3.8vw, 2.7rem)",
                  fontWeight: 700,
                  color: "#2C3E35",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: "24px",
                }}
              >
                ~ ₹10 Lakh
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "#526056",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>Minimum Investment Threshold</span>
                  <Info size={15} style={{ opacity: 0.65, color: "#2C3E35" }} />
                </div>
              </div>
            </motion.div>

            {/* Card 2: Crisp Off-White */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 14px 30px rgba(0, 0, 0, 0.08)" }}
              style={{
                background: "#F8F9FA",
                borderRadius: "20px",
                padding: "36px 30px 30px",
                border: "1px solid #E9ECEF",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "170px",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-sans, system-ui, sans-serif)",
                  fontSize: "clamp(2.1rem, 3.8vw, 2.7rem)",
                  fontWeight: 700,
                  color: "#2C3E35",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: "24px",
                }}
              >
                ~ 15–18%
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "#526056",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>Indicative Return Range (p.a.)</span>
                  <Info size={15} style={{ opacity: 0.65, color: "#2C3E35" }} />
                </div>
              </div>
            </motion.div>

            {/* Card 3: Mint / Sage Green */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                background: "#73CBB2",
                borderRadius: "20px",
                padding: "36px 30px 30px",
                boxShadow: "0 6px 20px rgba(115, 203, 178, 0.35)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "170px",
                transition: "all 0.3s ease",
              }}
              whileHover={{ y: -4, boxShadow: "0 14px 32px rgba(115, 203, 178, 0.5)" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-sans, system-ui, sans-serif)",
                  fontSize: "clamp(2.1rem, 3.8vw, 2.7rem)",
                  fontWeight: 700,
                  color: "#1B332B",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: "24px",
                }}
              >
                ~ 2–3 Years
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "#1B332B",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>Proposed Investment Tenure</span>
                  <Info size={15} style={{ opacity: 0.75, color: "#1B332B" }} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Detailed Structural Explanation Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              background: "#122217",
              color: "#FFFFFF",
              borderRadius: "28px",
              padding: "clamp(36px, 5vw, 56px)",
              boxShadow: "0 22px 60px rgba(18, 34, 23, 0.25)",
              border: "1px solid rgba(198, 162, 101, 0.35)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "40px",
                alignItems: "center",
              }}
            >
              <div>
                <span
                  style={{
                    color: "var(--accent-gold, #C6A265)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  HOW IT WORKS
                </span>

                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                    color: "#FFFFFF",
                    lineHeight: 1.25,
                    marginBottom: "20px",
                  }}
                >
                  Detailed Investment Explanation
                </h3>

                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "rgba(255, 255, 255, 0.85)",
                    lineHeight: 1.8,
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  Vanatvam acquires strategic, ecologically rich land parcels near key corridors in Karnataka. By combining architect-led master planning, organic soil revitalization, and community infrastructure, the underlying land value appreciates significantly. Investors participate directly in this value creation and receive profit distributions upon project completion.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
                  paddingLeft: "clamp(20px, 4vw, 40px)",
                }}
              >
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(198, 162, 101, 0.2)",
                      border: "1px solid rgba(198, 162, 101, 0.5)",
                      color: "var(--accent-gold, #C6A265)",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      flexShrink: 0,
                    }}
                  >
                    1
                  </div>
                  <div>
                    <h4 style={{ color: "#FFF", margin: "0 0 4px", fontSize: "1.05rem", fontWeight: 600 }}>
                      Asset-Backed Security
                    </h4>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.92rem", margin: 0, lineHeight: 1.6 }}>
                      Your capital is directly backed by physical agricultural and eco-restoration land parcels with clear, unencumbered titles.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(198, 162, 101, 0.2)",
                      border: "1px solid rgba(198, 162, 101, 0.5)",
                      color: "var(--accent-gold, #C6A265)",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      flexShrink: 0,
                    }}
                  >
                    2
                  </div>
                  <div>
                    <h4 style={{ color: "#FFF", margin: "0 0 4px", fontSize: "1.05rem", fontWeight: 600 }}>
                      Turnkey Management
                    </h4>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.92rem", margin: 0, lineHeight: 1.6 }}>
                      Vanatvam handles all on-ground operations including legal approvals, soil enrichment, water body creation, and ongoing estate upkeep.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(198, 162, 101, 0.2)",
                      border: "1px solid rgba(198, 162, 101, 0.5)",
                      color: "var(--accent-gold, #C6A265)",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      flexShrink: 0,
                    }}
                  >
                    3
                  </div>
                  <div>
                    <h4 style={{ color: "#FFF", margin: "0 0 4px", fontSize: "1.05rem", fontWeight: 600 }}>
                      Profit Distribution
                    </h4>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.92rem", margin: 0, lineHeight: 1.6 }}>
                      At the end of the 2–3 year tenure, developed land proceeds and project returns are distributed among investors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Let's Connect / Form Section */}
      <section
        id="connect-form"
        style={{
          padding: 'clamp(80px, 10vh, 130px) 20px',
          backgroundColor: 'var(--bg-cream, #F9F8F6)',
          position: 'relative',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '60px',
              alignItems: 'center',
            }}
          >
            {/* Left intro */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span
                style={{
                  color: 'var(--brand-earth-brown, #72351C)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '14px',
                }}
              >
                LET’S CONNECT
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.4rem, 4.2vw, 3.4rem)',
                  color: 'var(--bg-dark-forest, #122217)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '22px',
                }}
              >
                Explore an Investment Opportunity
              </h2>
              <p
                style={{
                  fontSize: '1.18rem',
                  color: '#4B554D',
                  lineHeight: 1.8,
                  marginBottom: '32px',
                  fontWeight: 300,
                }}
              >
                Share your details to request an initial discussion with our team. We look forward to
                walking you through our upcoming land parcels, stewardship timelines, and value creation models.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                  borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                  paddingTop: '28px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(198, 162, 101, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--brand-earth-brown, #72351C)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      flexShrink: 0,
                    }}
                  >
                    1
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.02rem', fontWeight: 600, color: '#122217', margin: '0 0 4px' }}>
                      Confidential Advisory
                    </h4>
                    <p style={{ fontSize: '0.92rem', color: '#687B63', margin: 0, lineHeight: 1.5 }}>
                      Direct consultation with our executive team on project economics and land curation.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(198, 162, 101, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--brand-earth-brown, #72351C)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      flexShrink: 0,
                    }}
                  >
                    2
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.02rem', fontWeight: 600, color: '#122217', margin: '0 0 4px' }}>
                      Nature-First Profit Distribution
                    </h4>
                    <p style={{ fontSize: '0.92rem', color: '#687B63', margin: 0, lineHeight: 1.5 }}>
                      Transparent models designed for shared long-term capital growth and ecological equity.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right form container */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: 'clamp(36px, 5vw, 48px)',
                boxShadow: '0 20px 50px rgba(18, 34, 23, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                position: 'relative',
              }}
            >
              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(82, 183, 136, 0.15)',
                      color: '#2D6A4F',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      margin: '0 auto 20px',
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.8rem',
                      color: 'var(--bg-dark-forest, #122217)',
                      marginBottom: '12px',
                    }}
                  >
                    Thank You
                  </h3>
                  <p
                    style={{
                      fontSize: '1.05rem',
                      color: '#4B554D',
                      lineHeight: 1.7,
                      marginBottom: '24px',
                    }}
                  >
                    We have received your details. A Vanatvam investment advisor will reach out to schedule your initial discussion.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ fullName: '', phone: '', email: '' });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--brand-earth-brown, #72351C)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textDecoration: 'underline',
                    }}
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '24px' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.85rem',
                        color: 'var(--bg-dark-forest, #122217)',
                        marginBottom: '8px',
                      }}
                    >
                      Request an Initial Discussion
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: '#687B63', margin: 0 }}>
                      Share your details to connect directly with our investment team.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    {/* Full Name */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label
                        htmlFor="fullName"
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: '#26352B',
                          letterSpacing: '0.02em',
                        }}
                      >
                        Full name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        style={{
                          width: '100%',
                          minHeight: '52px',
                          padding: '12px 18px',
                          border: '1px solid #DCE1DA',
                          borderRadius: '12px',
                          background: '#FDFCFB',
                          color: '#26352B',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.25s ease',
                          fontFamily: 'inherit',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent-gold, #C6A265)';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(198, 162, 101, 0.18)';
                          e.currentTarget.style.background = '#FFFFFF';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#DCE1DA';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.background = '#FDFCFB';
                        }}
                      />
                    </div>

                    {/* Phone Number */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label
                        htmlFor="phone"
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: '#26352B',
                          letterSpacing: '0.02em',
                        }}
                      >
                        Phone number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          minHeight: '52px',
                          padding: '12px 18px',
                          border: '1px solid #DCE1DA',
                          borderRadius: '12px',
                          background: '#FDFCFB',
                          color: '#26352B',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.25s ease',
                          fontFamily: 'inherit',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent-gold, #C6A265)';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(198, 162, 101, 0.18)';
                          e.currentTarget.style.background = '#FFFFFF';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#DCE1DA';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.background = '#FDFCFB';
                        }}
                      />
                    </div>

                    {/* Email Address */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label
                        htmlFor="email"
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: '#26352B',
                          letterSpacing: '0.02em',
                        }}
                      >
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="yourname@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          minHeight: '52px',
                          padding: '12px 18px',
                          border: '1px solid #DCE1DA',
                          borderRadius: '12px',
                          background: '#FDFCFB',
                          color: '#26352B',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.25s ease',
                          fontFamily: 'inherit',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent-gold, #C6A265)';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(198, 162, 101, 0.18)';
                          e.currentTarget.style.background = '#FFFFFF';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#DCE1DA';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.background = '#FDFCFB';
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        minHeight: '56px',
                        marginTop: '10px',
                        padding: '16px 24px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        border: 'none',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #72351C 0%, #8B4224 100%)',
                        color: '#FFFFFF',
                        fontFamily: 'inherit',
                        fontSize: '0.98rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 12px 26px rgba(114, 53, 28, 0.25)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 16px 32px rgba(114, 53, 28, 0.35)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 12px 26px rgba(114, 53, 28, 0.25)';
                      }}
                    >
                      REQUEST AN INVESTMENT DISCUSSION →
                    </button>

                    <p
                      style={{
                        margin: '6px 0 0',
                        textAlign: 'center',
                        color: '#7B857D',
                        fontSize: '0.78rem',
                        lineHeight: 1.5,
                      }}
                    >
                      Your information is held in strict confidence and used solely to coordinate your consultation.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Disclaimers & Sources Section */}
      <section
        style={{
          backgroundColor: '#0E1A12',
          color: '#95A599',
          padding: '50px 20px 70px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.85rem',
          lineHeight: 1.7,
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {/* Regulatory Disclaimer */}
          <div
            style={{
              padding: '20px 24px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              marginBottom: '26px',
            }}
          >
            <p
              style={{
                color: '#DCE1DA',
                fontSize: '0.88rem',
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              <strong style={{ color: 'var(--accent-gold, #C6A265)' }}>Disclaimer: </strong>
              Land investments carry risk, and returns are not guaranteed. This page is for
              information only and is not investment advice. Please consult a qualified financial
              advisor before you decide.
            </p>
          </div>

          {/* Sources */}
          <div>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.65)',
                fontSize: '0.82rem',
                margin: 0,
                lineHeight: 1.8,
              }}
            >
              <strong style={{ color: '#F9F8F6' }}>Sources: </strong>
              Jean Lombard, &ldquo;The Best Investment Move in Uncertain Times&rdquo; (cover.co.za);
              FarmTogether, &ldquo;Farmland: A Historically Stable Asset During Uncertain Times&rdquo;;
              Robert Shiller interview, reported by HousingWire (2013); Nifty/Sensex 2026 performance,
              Business Standard / NSE / BSE data; Nasdaq correction, Reuters via StreetInsider (26 Mar
              2026); S&P 500 and Nasdaq YTD levels, Tapeboard Market Pulse (1 Oct 2026) and ChartRow (22
              Oct 2026); India 10-year yield, Trading Economics.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
