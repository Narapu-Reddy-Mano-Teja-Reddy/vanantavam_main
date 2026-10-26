'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import RevealText from '@/components/premium/RevealText';
import Magnetic from '@/components/premium/Magnetic';
import TiltCard from '@/components/premium/TiltCard';
import ProjectTunnel from '@/components/premium/ProjectTunnel';

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
      brochure: null,
       
      badgeBg: 'var(--bg-dark-forest)',
      pills: ['Native Canopy', 'Rain Catchments']
    },

     {
      id: 'madhuvana',
      category: 'water',
      name: 'MADHUVANA',
      logo: '/assets/images/Project-Logos/Logo-MadhuVana.svg',
      location: 'MADDUR - 17 Acres',
      desc: 'The Sweet Symphony of Nature. A pristine water-forest ecosystem built around 200+ rare & endangered tree species. Features sacred groves like Nakshatra Vana and cozy cottages designed for peaceful living.',
      img: '/assets/project-images/Maduvana/hero.png',
      brochure: '/assets/project-images/MadhuVana%20Brochure.pdf',
       
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
      brochure: '/assets/project-images/AnantaVana%20Brochure.pdf',
       
      badgeBg: '#2D6A4F',
      pills: ['Kabini', 'Heritage Cottages']
    },
    
    {
      id: 'eeshavana',
      category: 'riverfront',
      name: 'EESHAVANA',
      logo: '/assets/images/Project-Logos/eeshavanaalogo.webp',
      location: 'KOLLEGALA - 10 Acres',
      desc: 'Our premier riverfront community set along the banks of the sacred Cauvery river. Designed around the deep relationship between people, riparian ecology, and water.',
      img: '/assets/project-images/Esahavana/EV Image.png',
      brochure: '/assets/project-images/Eeshavana%20Brochure.pdf',
      
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
        <div className="container project-list-container">
          <motion.div
            className="project-cards-grid"
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: '24px',
            }}
          >
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
                  <TiltCard max={4} style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                    <motion.img 
                      whileHover={{ scale: 1.05 }} 
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      src={proj.img} alt={proj.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                     
                  </TiltCard>
                  <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
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

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <Magnetic strength={0.15} style={{ display: 'block', width: '100%' }}>
                        <Link href={`/${proj.id}`} className="btn-pill btn-pill-dark" style={{ justifyContent: 'center', width: '100%' }}>
                          Explore Project
                        </Link>
                      </Magnetic>
                      {proj.brochure ? (
                        <a
                          href={proj.brochure}
                          download
                          className="btn-pill btn-pill-project-brochure"
                          style={{ justifyContent: 'center', width: '100%' }}
                        >
                          Download Brochure
                        </a>
                      ) : (
                        <Link
                          href="/contact"
                          className="btn-pill btn-pill-project-brochure"
                          style={{ justifyContent: 'center', width: '100%' }}
                        >
                          Request Brochure
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
        <style jsx>{`
          .project-list-container {
            padding-right: 0px !important;
            padding-left: 0px !important;
          }

          @media (max-width: 1100px) {
            .project-cards-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 600px) {
            .project-cards-grid {
              grid-template-columns: minmax(0, 1fr) !important;
            }

            .project-list-container {
              padding-right: 0px !important;
              padding-left: 0px !important;
            }
          }
        `}</style>
      </section>

      <ProjectTunnel items={projects} />


      <Footer />
    </>
  );
}
