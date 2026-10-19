'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import RevealText from '@/components/premium/RevealText';
import Magnetic from '@/components/premium/Magnetic';
import TiltCard from '@/components/premium/TiltCard';

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 'brindavana',
      category: 'completed',
      name: 'BRINDAVANA',
      logo: '/assets/images/Project-Logos/BrindaVana.webp',
      location: 'PAVAGADA · 30 ACRES',
      desc: 'Our benchmark project demonstrating ecological restoration. What began as largely barren land is evolving into a thriving green ecosystem with deep water harvesting and native tree canopy.',
      img: '/assets/project-images/Brindavana/Sunny Tropical Banana Orchard.png',
      badge: 'Completed',
      badgeBg: 'var(--bg-dark-forest)',
      pills: ['Native Canopy', 'Rain Catchments']
    },
    {
      id: 'madhuvana',
      category: 'water',
      name: 'MADHUVANA',
      logo: '/assets/images/Project-Logos/Logo-MadhuVana.svg',
      location: 'MADDUR',
      desc: 'The Sweet Symphony of Nature. A pristine water-forest ecosystem built around 200+ rare & endangered tree species. Features sacred groves like Nakshatra Vana and cozy cottages designed for peaceful living.',
      img: '/assets/project-images/Maduvana/hero.png',
      badge: 'Water Forest',
      badgeBg: 'var(--accent-gold)',
      pills: ['200+ Native Trees', 'Sacred Groves']
    },
    {
      id: 'anantavana',
      category: 'wildlife',
      name: 'ANANTAVANA',
      logo: '/assets/images/Project-Logos/Anantavana.webp',
      location: 'NEAR KABINI · 34 ACRES',
      desc: 'Where the Forest Leads. Set in Kabini’s rich ecological belt. With dense forests and thriving biodiversity, Anantavana invites you to step into nature. Farm parcels from 10,000 sq. ft.',
      img: '/assets/project-images/Ananthavana/hero_image.jpg',
      badge: 'Wildlife Corridor',
      badgeBg: '#2D6A4F',
      pills: ['Bandipur Corridor', 'Heritage Cottages']
    },
    {
      id: 'eeshavana',
      category: 'riverfront',
      name: 'EESHAVANA',
      logo: '/assets/images/Project-Logos/eeshavanaalogo.webp',
      location: 'KOLLEGALA · CAUVERY RIVERFRONT',
      desc: 'Our premier riverfront community set along the banks of the sacred Cauvery river. Designed around the deep relationship between people, riparian ecology, and water.',
      img: '/assets/project-images/Esahavana/EV Image.png',
      badge: 'Cauvery Riverfront',
      badgeBg: '#1B4965',
      pills: ['Cauvery Frontage', 'River Ecosystem']
    },
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const filters = [
    { key: 'all', label: 'All Communities' },
    { key: 'completed', label: 'Completed' },
    { key: 'water', label: 'Water Forest' },
    { key: 'wildlife', label: 'Wildlife Corridor' },
    { key: 'riverfront', label: 'Riverfront' },
    { key: 'forest', label: 'Mountain & Forest' },
    { key: 'nature', label: 'Nature Community' },
  ];

  return (
    <>
      <Navigation />

      <section className="hero" style={{ height: '70vh', minHeight: '500px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="/assets/project-images/Brindavana/Tropical Garden Pathway Tunnel.png" alt="Projects Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(18, 34, 23, 0.4) 0%, rgba(18, 34, 23, 0.9) 100%)' }}></div>
        </div>

        <div className="container relative" style={{ zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <span style={{ display: 'inline-block', padding: '6px 16px', border: '1px solid var(--accent-gold)', borderRadius: '30px', color: 'var(--accent-gold)', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: '20px' }}>OUR LIVING SANCTUARIES</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', color: '#FFF', lineHeight: 0.95, marginBottom: '24px', letterSpacing: '-0.02em' }}>
              <RevealText>Four Expressions of</RevealText><br/>
              <RevealText delay={0.1} style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Nature.</RevealText>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', maxWidth: '600px', lineHeight: 1.6 }}>
              Explore our curated portfolio of ecological communities, each designed to respect and enhance its unique natural context across Karnataka.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: 'var(--bg-cream)' }}>
        <div className="container">
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '40px' }}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map(proj => (
                <motion.div 
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                  whileHover={{ y: -15, boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}
                  style={{ background: '#FFF', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', border: '1px solid rgba(0,0,0,0.03)' }}
                >
                  <TiltCard max={4} style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
                    <motion.img 
                      whileHover={{ scale: 1.05 }} 
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      src={proj.img} alt={proj.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', top: 20, left: 20, background: proj.badgeBg, color: '#FFF', padding: '6px 14px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                      {proj.badge}
                    </div>
                  </TiltCard>
                  <div style={{ padding: '48px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '15px', display: 'block', textTransform: 'uppercase' }}>{proj.location}</span>
                    
                    {proj.logo ? (
                      <div style={{ marginBottom: '15px', height: '60px', display: 'flex', alignItems: 'center' }}>
                        <img src={proj.logo} alt={proj.name} style={{ maxHeight: '100%', maxWidth: '200px', objectFit: 'contain' }} />
                      </div>
                    ) : (
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--bg-dark-forest)', marginBottom: '15px' }}>{proj.name}</h3>
                    )}

                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '25px', flex: 1 }}>{proj.desc}</p>
                    
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
                      {proj.pills.map((pill, i) => (
                        <span key={i} style={{ background: 'var(--bg-cream)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-dark)', border: '1px solid var(--border-light)' }}>
                          <i className="fa-solid fa-leaf" style={{ color: 'var(--accent-gold)', marginRight: '6px' }}></i>{pill}
                        </span>
                      ))}
                    </div>

                    <Magnetic strength={0.15} style={{ display: 'block', width: '100%' }}>
                      <Link href={`/${proj.id}`} className="btn-pill btn-pill-dark" style={{ justifyContent: 'center', width: '100%' }}>
                        Explore Project
                      </Link>
                    </Magnetic>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: 'clamp(80px, 10vh, 120px) 0', background: '#F9F8F6' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            >
              <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>
                EXPERIENCE THE LAND
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 3.2rem)', color: 'var(--bg-dark-forest)', lineHeight: 1.1, marginBottom: '30px', letterSpacing: '-0.02em' }}>
                Immerse in Nature's Rhythm.
              </h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-dark)', lineHeight: 1.8, marginBottom: '20px', fontWeight: 300 }}>
                AtVanaTvam, land is just the beginning. Every farm plot is crafted as an enriching experience—an opportunity to reconnect with the earth and immerse in the natural rhythms of nature.
              </p>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-dark)', lineHeight: 1.8, marginBottom: '20px', fontWeight: 300 }}>
                When you own a farm plot inVanaTvam projects, you can enjoy stays in serene eco cottages, walk through verdant trails brimming with biodiversity, plant saplings to honour nature’s legacy, and experience vibrant cultural festivals that celebrate community, heritage, and sustainability.
              </p>
              <p style={{ fontSize: '1.25rem', color: 'var(--bg-dark-forest)', lineHeight: 1.8, fontWeight: 500 }}>
               VanaTvam's farms aren’t just a place you buy, it's a life you experience.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{ borderRadius: '30px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}
            >
              <img src="/assets/project-images/Brindavana/Rainy Countryside Pond Reflections.png" alt="Nature's Rhythm" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(80px, 10vh, 120px) 0', background: 'var(--bg-dark-forest)', color: '#FFF' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 60px' }}
          >
            <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>
              Built Spaces
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '30px' }}>
              Shared Cottages: Convenience Meets Comfort
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8 }}>
              For plot owners not yet ready to build their homes,VanaTvam offers beautifully designed Shared Cottages, with complimentary stays for a fixed number of days each year. It’s the perfect way to enjoy the land you own—without the pressure of immediate construction. Whether you seek solitude, connection, or celebration, our shared cottages offer a living experience that is rooted in nature, refined in design, and rich in meaning.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
              style={{ padding: '50px 40px', background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--accent-gold)', marginBottom: '20px' }}>Madhuvana Cottages</h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', fontWeight: 300, marginBottom: '20px' }}>
                4 cottages of about 400+sft each are built using exposed wire-cut bricks and feature a central courtyard, open green views on both sides, and two bathrooms—one with a skylight and semi-open design for a rare, nature-connected bathing experience.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                Modern conveniences like a compact workstation and kitchenette ensure a comfortable, soulful retreat.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ padding: '50px 40px', background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--accent-gold)', marginBottom: '20px' }}>AnantaVana Cottages</h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', fontWeight: 300, marginBottom: '20px' }}>
                Our distinctive roundhouse cottages offer panoramic forest views, overlook a serene pond, and blend harmoniously with the landscaped surroundings.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--accent-gold)', fontWeight: 500, marginTop: '40px' }}>
                With ~20% of each project dedicated to community spaces, there’s always room to gather, celebrate, or simply unwind—together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
