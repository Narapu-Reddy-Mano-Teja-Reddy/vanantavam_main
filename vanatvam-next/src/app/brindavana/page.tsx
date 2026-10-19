'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import AccordionGallery from '@/components/premium/AccordionGallery';


export default function Brindavana() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ['0%', '15%'], { clamp: true });
  const heroScale = useTransform(scrollY, [0, 1000], [1, 1.15], { clamp: true });

  const galleryItems = [
    { img: '/assets/project-images/Ananthavana/hero_image_2.jpg', title: 'Flourishing Ecosystem', desc: 'Over 85% native forest cover creating a robust, self-sustaining microclimate.' },
    { img: '/assets/project-images/Ananthavana/hero_image_2.jpg', title: 'Therapeutic Trails', desc: 'Walkways designed to naturally reduce stress and foster a deep connection with nature.' },
    { img: '/assets/project-images/Brindavana/Rainy Countryside Pond Reflections.png', title: 'Organic Regeneration', desc: 'Soil enriched naturally without chemicals, reviving the land to its purest form.' },
    { img: '/assets/project-images/Esahavana/EV Arial View 1.png', title: 'Sustainable Masterplan', desc: 'Every pathway and plot follows the natural topography for zero ecological disruption.' },
  ];


  const specs = [
    { label: 'Location', value: 'Pavagada, Karnataka' },
    { label: 'Total Area', value: '30 Acres' },
    { label: 'Project Status', value: 'Completed & Evolving' },
    { label: 'Green Cover', value: '85%+ Native Forest' },
    { label: 'Key Feature', value: 'Nakshatra Vana Sacred Forest' },
  ];

  return (
    <>
      <Navigation />

      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, top: '-15%', height: '130%', y: heroY, scale: heroScale, transformOrigin: 'center center' }}>
          <img src="/assets/project-images/Ananthavana/hero_image_2.jpg" alt="BRINDAVANA" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(18, 34, 23, 0.4) 0%, rgba(18, 34, 23, 0.9) 100%)' }}></div>
        </motion.div>

        <div className="container relative" style={{ zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '60px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span style={{ display: 'inline-block', padding: '8px 24px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(15px)', color: '#FFF', borderRadius: '30px', fontSize: '0.85rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.2)' }}>
              PAVAGADA · 30 ACRES
            </span>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', color: '#FFF', lineHeight: 0.95, marginBottom: '24px', letterSpacing: '-0.03em', textShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>BRINDAVANA</h1>

            <p style={{ fontSize: '1.6rem', color: 'rgba(255,255,255,0.95)', maxWidth: '600px', fontWeight: 300, fontFamily: 'var(--font-serif)', fontStyle: 'italic', margin: '0 auto', letterSpacing: '0.02em' }}>
              Where roots run deep and nature thrives.
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
                <img src="/assets/images/Project-Logos/BrindaVana.webp" alt="BRINDAVANA Logo" style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', color: 'var(--bg-dark-forest)', marginBottom: '36px', lineHeight: 1.1, letterSpacing: '-0.02em' }} dangerouslySetInnerHTML={{ __html: 'A story of land<br/>transformation.' }}>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-dark)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                <p>Welcome to Brindavana, a 30-acre haven of sustainable, natural farmland nestled amidst the serenity of Krishnapura in the Pavagada Taluk. Here, at Brindavana byVanaTvam, we have woven together the ancient wisdom of our culture with innovative agroforestry and organic farming practices to create a flourishing ecosystem that nourishes both the land and the soul.</p>
                <p>Brindavana is a community of like-minded individuals who share a passion for sustainability, a desire for a simpler way of life, and an emotional connection to our culture. Reconnect with your roots and discover the therapeutic power of immersing yourself in nature.</p>
                <div>
                  <a href="#" className="btn-pill btn-pill-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '30px' }}><i className="fa-solid fa-download"></i> Download Brochure</a>
                </div>
              </div>

              <div style={{ marginTop: '60px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--bg-dark-forest)', marginBottom: '30px' }}>Amenities</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  {[
                    { title: 'Eco Cottages', desc: 'Sustainable living spaces blending seamlessly with the forest.', img: '/assets/illustrations/eco-cottage.jpg' },
                    { title: 'Trekking Path', desc: 'Serene trails connecting you directly to nature.', img: '/assets/illustrations/nature-walk.jpg' },
                  ].map((amenity, i) => (
                    <div key={i} style={{ background: '#FFF', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
                      <img src={amenity.img} alt={amenity.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                      <div style={{ padding: '24px', flexGrow: 1 }}>
                        <h4 style={{ fontSize: '1.3rem', color: 'var(--bg-dark-forest)', fontWeight: 600, marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>{amenity.title}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{amenity.desc}</p>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                      { title: 'Clubhouse', icon: 'fa-house-chimney-window' },
                      { title: 'Pickleball Court', icon: 'fa-table-tennis-paddle-ball' }
                    ].map((amenity, i) => (
                      <div key={i} style={{ background: '#FFF', padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)', flexGrow: 1 }}>
                        <div style={{ fontSize: '1.8rem', color: 'var(--accent-gold)' }}><i className={`fa-solid ${amenity.icon}`}></i></div>
                        <h4 style={{ fontSize: '1.1rem', color: 'var(--bg-dark-forest)', fontWeight: 600, margin: 0 }}>{amenity.title}</h4>
                      </div>
                    ))}
                  </div>
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
                Life at BRINDAVANA
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
                { time: '2', unit: 'Hours', desc: 'From Bengaluru Airport', icon: 'fa-plane' },
                { time: '10', unit: 'Mins', desc: 'From Pavagada Town', icon: 'fa-city' },
                { time: '5', unit: 'Mins', desc: 'To Medical Facilities', icon: 'fa-hospital' },
                { time: '15', unit: 'Mins', desc: 'To Educational Hubs', icon: 'fa-school' },
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
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.0vw, 3.0rem)', color: '#FFF', marginBottom: '20px' }}>Experience BRINDAVANA</h2>
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
              { id: 'madhuvana', name: 'MADHUVANA', loc: 'Maddur', img: '/assets/images/Project-Logos/Logo-MadhuVana.svg' },
              { id: 'anantavana', name: 'ANANTAVANA', loc: 'Kabini', img: '/assets/images/Project-Logos/Anantavana.webp' },
              { id: 'eeshavana', name: 'EESHAVANA', loc: 'Kollegala', img: '/assets/images/Project-Logos/eeshavanaalogo.webp' }
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
