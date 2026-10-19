
'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import AccordionGallery from '@/components/premium/AccordionGallery';


export default function Eeshavana() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ['0%', '15%'], { clamp: true });
  const heroScale = useTransform(scrollY, [0, 1000], [1, 1.15], { clamp: true });
  const specs = [
    { label: 'Location', value: 'Kollegala, Karnataka' },
    { label: 'Feature', value: 'Direct Cauvery Riverfront' },
    { label: 'Plot Size', value: 'From 8,000 sq.ft' },
    { label: 'Pricing', value: 'Contact for Pricing' },
    { label: 'Green Cover', value: '80%+ Riparian Forest' },
  ];


  const galleryItems = [
    { img: '/assets/project-images/Esahavana/EV Image.png', title: 'Cauvery Riverfront', desc: 'Direct, pristine access to the sacred waters of the flowing Cauvery river.' },
    { img: '/assets/project-images/Brindavana/Rainy Countryside Pond Reflections.png', title: 'Riparian Forest', desc: 'A protected buffer zone supporting unique aquatic and riverbank ecosystems.' },
    { img: '/assets/project-images/Brindavana/Sunny Tropical Banana Orchard.png', title: 'Tranquil Retreat', desc: 'Exclusive community spots designed for meditation and riverside wellness.' },
    { img: '/assets/project-images/Esahavana/EV Arial View 1.png', title: 'Exclusive Enclaves', desc: 'Premium plots starting from 8,000 sq.ft offering unmatched river views.' },
  ];


  return (
    <>
      <Navigation />

      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, top: '-15%', height: '130%', y: heroY, scale: heroScale, transformOrigin: 'center center' }}>
          <img src="/assets/project-images/Esahavana/EV Image.png" alt="EESHAVANA" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(18, 34, 23, 0.4) 0%, rgba(18, 34, 23, 0.9) 100%)' }}></div>
        </motion.div>

        <div className="container relative" style={{ zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '60px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', color: '#FFF', borderRadius: '30px', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '30px' }}>
              KOLLEGALA · 6.5 ACRES
            </span>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.75rem, 5.0vw, 5.0rem)', color: '#FFF', lineHeight: 1, marginBottom: '20px' }}>EESHAVANA</h1>

            <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', fontWeight: 300, fontFamily: 'var(--font-serif)', fontStyle: 'italic', margin: '0 auto' }}>
              Premium Riverfront Community
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: 'var(--bg-cream)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', alignItems: 'flex-start' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ flex: '1.2 1 400px' }}>
              <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: '20px' }}>PROJECT OVERVIEW</span>

              <div style={{ marginBottom: '40px' }}>
                <img src="/assets/images/Project-Logos/eeshavanaalogo.webp" alt="EESHAVANA Logo" style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 2.8vw, 2.8rem)', color: 'var(--bg-dark-forest)', marginBottom: '30px', lineHeight: 1.2 }} dangerouslySetInnerHTML={{ __html: 'Live by the river,<br/>not just near it.' }}>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-dark)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                <p>Eeshavana is a 6.5-acre gated premium riverfront community where village calm meets riverside living — plots from 8000 sq.ft.</p>
                <p>Eeshavana is a thoughtfully planned premium riverfront community envisioned along the serene banks of the Kaveri. Every plot, pathway, and pause point has been laid out to keep you close to the river and far from the noise — connected to the essentials of life, without losing the wild calm of the land it sits on.</p>
                <div>
                  <a href="#" className="btn-pill btn-pill-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '30px' }}><i className="fa-solid fa-download"></i> Download Brochure</a>
                </div>
              </div>

              <div style={{ marginTop: '60px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--bg-dark-forest)', marginBottom: '30px' }}>Amenities</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                  {[
                    { title: 'Trekking Path', icon: 'fa-person-hiking' },
                    { title: 'Clubhouse', icon: 'fa-house-chimney-window' },
                    { title: 'Pickleball Court', icon: 'fa-table-tennis-paddle-ball' },
                    { title: 'Eco Cottages', icon: 'fa-house-leaf' }
                  ].map((amenity, i) => (
                    <div key={i} style={{ background: '#FFF', padding: '30px 20px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
                      <div style={{ fontSize: '2rem', color: 'var(--accent-gold)', marginBottom: '15px' }}><i className={`fa-solid ${amenity.icon}`}></i></div>
                      <h4 style={{ fontSize: '1rem', color: 'var(--bg-dark-forest)', fontWeight: 600 }}>{amenity.title}</h4>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '60px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--bg-dark-forest)', marginBottom: '30px' }}>TheVanaTvam Advantage</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { title: 'Close Comfort', desc: 'Modern amenities seamlessly integrated with natural landscapes.' },
                    { title: 'Ready and Waiting', desc: 'Fully established infrastructure so you can build your dream farm home immediately.' },
                    { title: 'Growth Corridor', desc: 'Located in high-appreciation zones while maintaining ecological sanctity.' }
                  ].map((adv, i) => (
                    <div key={i} style={{ display: 'flex', gap: '20px', background: '#FFF', padding: '24px', borderRadius: '16px', boxShadow: '0 10px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-cream)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold' }}>0{i + 1}</div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', color: 'var(--bg-dark-forest)', marginBottom: '8px' }}>{adv.title}</h4>
                        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>{adv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ flex: '1 1 300px', position: 'sticky', top: '120px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
                <div style={{ gridColumn: '1 / -1', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Project Specifications</span>
                </div>
                {specs.map((s, i) => (
                  <div key={s.label} style={{
                    gridColumn: i === specs.length - 1 && specs.length % 2 !== 0 ? '1 / -1' : 'auto',
                    background: i === 0 ? 'var(--bg-dark-forest)' : '#FFFFFF',
                    padding: '24px',
                    borderRadius: '20px',
                    border: i === 0 ? 'none' : '1px solid var(--border-light)',
                    boxShadow: i === 0 ? '0 20px 40px rgba(18,34,23,0.15)' : '0 10px 30px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: i === 0 ? 'var(--accent-gold)' : 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontWeight: 600 }}>{s.label}</span>
                    <strong style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: i === 0 ? '#FFF' : 'var(--bg-dark-forest)', lineHeight: 1.3 }}>{s.value}</strong>
                  </div>
                ))}
              </div>

              <div style={{ position: 'relative', marginBottom: '60px' }}>
                <img src="/assets/project-images/Esahavana/EV Arial View 1.png" alt="Master Plan" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }} />
                <div style={{ position: 'absolute', bottom: '-24px', left: '-24px', background: 'var(--bg-dark-forest)', color: '#FFF', padding: '40px', borderRadius: '24px', maxWidth: '300px', boxShadow: '0 20px 40px rgba(24, 44, 30, 0.4)', zIndex: 2 }}>
                  <i className="fa-solid fa-leaf" style={{ fontSize: '2rem', color: 'var(--accent-gold)', marginBottom: '20px' }}></i>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '10px' }}>Sustainable Design</h4>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6, margin: 0 }}>Every aspect of the master plan is dictated by the natural topography and water flow.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {galleryItems.length > 0 && (
        <section style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: '#FFF' }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: '20px', textAlign: 'center' }}>GALLERY</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.0vw, 3.0rem)', color: 'var(--bg-dark-forest)', marginBottom: '60px', textAlign: 'center' }}>
                Life at EESHAVANA
              </h2>
            </motion.div>

            <AccordionGallery items={galleryItems} height="500px" />
          </div>
        </section>
      )}

      <section style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: 'var(--bg-cream)' }}>
        <div className="container">
           <div style={{ textAlign: 'center', marginBottom: '60px' }}>
             <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>Location Highlights</span>
             <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--bg-dark-forest)' }}>Perfect Blend of Convenience & Connectivity</h2>
           </div>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
              {[
                { time: '2', unit: 'Hours', desc: 'From Bengaluru via Expressway', icon: 'fa-car' },
                { time: '15', unit: 'Mins', desc: 'From Kollegala Town', icon: 'fa-city' },
                { time: '10', unit: 'Mins', desc: 'To Nearest Hospital', icon: 'fa-hospital' },
                { time: '0', unit: 'Mins', desc: 'Direct River Access', icon: 'fa-water' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ background: '#FFF', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 10px 20px rgba(0,0,0,0.03)' }}>
                  <div style={{ fontSize: '2rem', color: 'var(--accent-gold)', marginBottom: '16px' }}><i className={`fa-solid ${item.icon}`}></i></div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--bg-dark-forest)', lineHeight: 1, marginBottom: '8px' }}>{item.time}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>{item.unit}</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>{item.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: 'var(--bg-dark-forest)', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.0vw, 3.0rem)', color: '#FFF', marginBottom: '20px' }}>Experience EESHAVANA</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 }}>
              Schedule a site visit to walk the land and understand the ecological principles driving this community.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <Link href="/contact" className="btn-pill btn-pill-gold">Schedule a Site Visit</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: '#FFFFFF', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)', color: 'var(--bg-dark-forest)' }}>Discover Other Projects</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
            {[
              { id: 'brindavana', name: 'BRINDAVANA', loc: 'Pavagada', img: '/assets/images/Project-Logos/BrindaVana.webp' },
              { id: 'madhuvana', name: 'MADHUVANA', loc: 'Maddur', img: '/assets/images/Project-Logos/Logo-MadhuVana.svg' },
              { id: 'anantavana', name: 'ANANTAVANA', loc: 'Kabini', img: '/assets/images/Project-Logos/Anantavana.webp' }
            ].map((p, i) => (
              <Link key={p.id} href={`/${p.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ background: 'var(--bg-cream)', borderRadius: '24px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', border: '1px solid rgba(0,0,0,0.02)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px', fontWeight: 600 }}>{p.loc}</span>
                  <img src={p.img} alt={p.name} style={{ maxHeight: '60px', maxWidth: '180px', objectFit: 'contain' }} />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
