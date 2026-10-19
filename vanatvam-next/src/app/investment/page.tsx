'use client';
import { motion } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export default function Investment() {
  return (
    <>
      <Navigation />

      {/* Premium Hero Section */}
      <section className="hero" style={{ height: '85vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="/assets/project-images/Brindavana/Sunny Tropical Banana Orchard.png" alt="Managed Farmland Investment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(18, 34, 23, 0.4) 0%, rgba(18, 34, 23, 0.9) 100%)' }} />
        </div>

        <div className="container relative" style={{ zIndex: 1, textAlign: 'center', paddingTop: '80px' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '30px', display: 'inline-block', border: '1px solid rgba(255,255,255,0.3)', padding: '8px 24px', borderRadius: '30px', backdropFilter: 'blur(5px)' }}
          >
            Long-Term Stewardship & Wealth Preservation
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3.5rem, 7vw, 6rem)', color: '#FFFFFF', lineHeight: 1.05, marginBottom: '30px', letterSpacing: '-0.02em' }}
          >
            Managed Farmland<br /><span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Investment.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.85)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.7, fontWeight: 300 }}
          >
            Combining secure legal land ownership, long-term capital appreciation, and ecological equity across Karnataka&apos;s prime natural belts.
          </motion.p>
        </div>
      </section>

      {/* Investment Pillars */}
      <section style={{ padding: 'clamp(80px, 10vh, 120px) 0', background: 'var(--bg-cream)', position: 'relative' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '100px' }}
          >
            <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>
              Why Invest in Managed Farmland
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--bg-dark-forest)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Land That Grows Value<br /><span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>and Forests Together</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {[
              { num: '01', title: 'Clear Plot Ownership', desc: '100% individual registered land title deeds with clear boundaries. You hold legal ownership of your agricultural plot whileVanaTvam manages the ecosystem.' },
              { num: '02', title: 'Zero Maintenance Hassle', desc: 'Our expert team handles soil regeneration, native tree planting, water body upkeep, 24/7 perimeter security, and organic farm maintenance.' },
              { num: '03', title: 'High Capital Appreciation', desc: 'Agricultural land located in high-growth corridors historically appreciates at steady, inflation-hedging rates, providing generational wealth.' }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }}
                style={{ background: '#FFFFFF', padding: '60px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden' }}
              >
                <span style={{ position: 'absolute', top: '20px', right: '30px', fontSize: '8rem', fontFamily: 'var(--font-serif)', color: 'rgba(198,162,101,0.06)', lineHeight: 0.8, pointerEvents: 'none' }}>{pillar.num}</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--bg-dark-forest)', marginBottom: '20px', position: 'relative', zIndex: 1 }}>{pillar.title}</h3>
                <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, position: 'relative', zIndex: 1, fontWeight: 300 }}>{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Land, Beyond ROI */}
      <section style={{ padding: 'clamp(80px, 10vh, 120px) 0', background: 'var(--bg-cream)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{ flex: '1 1 500px' }}
            >
              <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>
                OUR PURPOSE
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem, 4vw, 3.8rem)', color: 'var(--bg-dark-forest)', lineHeight: 1.1, marginBottom: '30px', letterSpacing: '-0.02em' }}>
                Beyond Land, Beyond ROI.
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)', lineHeight: 1.8, marginBottom: '25px', fontWeight: 300 }}>
               VanaTvam is not a land bank or an ROI-driven company. Our mission transcends mere property transactions and profit-centric models. Instead, we carefully curate living, breathing eco-systems that become vibrant cultural communities.
              </p>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)', lineHeight: 1.8, marginBottom: '25px', fontWeight: 300 }}>
                Our goal is to foster spaces where life thrives in harmony with nature, where every tree planted and every cottage built contributes meaningfully to ecological balance and cultural enrichment.
              </p>
              <p style={{ fontSize: '1.25rem', color: 'var(--bg-dark-forest)', lineHeight: 1.8, fontWeight: 500 }}>
               VanaTvam is about legacy, connection, and sustainable living—not just land ownership.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{ flex: '1 1 400px', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
            >
              <img src="/assets/project-images/Brindavana/Farmer Tending Lush Seedlings.png" alt="Legacy and Connection" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section style={{ background: '#122217', color: '#FFF', padding: 'clamp(80px, 10vh, 120px) 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '20px' }}>
              TheVanaTvam Advantage
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto', fontWeight: 300 }}>
              How our managed ecosystem approach completely redefines traditional land ownership.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', padding: '60px', overflowX: 'auto' }}
          >
            <div style={{ minWidth: '700px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '30px', marginBottom: '30px' }}>
                <div style={{ color: 'var(--accent-gold)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Feature</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Conventional Plot</div>
                <div style={{ color: 'var(--accent-gold)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Vanatvam Community</div>
              </div>

              {[
                { feature: 'Green Cover Ratio', conv: '10% - 20% Monoculture', van: '80%+ Native Forest Canopy' },
                { feature: 'Maintenance Burden', conv: "Owner's constant hassle", van: '100% Professionally Managed' },
                { feature: 'Ecosystem Creation', conv: 'None (chemical agriculture)', van: 'Nakshatra Vana & 200+ Species' },
                { feature: 'Community Access', conv: 'Isolated, restricted plot', van: 'Shared 100+ acre riverfronts & trails' }
              ].map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px', padding: '25px 0', borderBottom: i === 3 ? 'none' : '1px solid rgba(255,255,255,0.05)', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 500 }}>{row.feature}</div>
                  <div style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>{row.conv}</div>
                  <div style={{ fontSize: '1.1rem', color: '#52B788', fontWeight: 500 }}>{row.van}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
