'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import AccordionGallery from '@/components/premium/AccordionGallery';


export default function Anantavana() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ['0%', '15%'], { clamp: true });
  const heroScale = useTransform(scrollY, [0, 1000], [1, 1.15], { clamp: true });
  const specs = [
    { label: 'Location', value: 'Near Kabini, Karnataka' },
    { label: 'Total Area', value: '34 Acres' },
    { label: 'Ecosystem Type', value: 'Wildlife Corridor Buffer' },
    { label: 'Green Cover', value: '82%+ Native Canopy' },
  ];


  const galleryItems = [
    { img: '/assets/project-images/Ananthavana/hero_image.jpg', title: 'Wildlife Corridor', desc: 'Acting as a gentle buffer for the Bandipur and Nagarhole sanctuaries.' },
    { img: '/assets/project-images/Ananthavana/AV Tree House.png', title: 'Tree House Retreats', desc: 'Experience the magic of living amidst the canopy.' },
    { img: '/assets/project-images/Ananthavana/hero_image_2.jpg', title: 'Native Biodiversity', desc: 'Over 80% of the land is planted with rare & endangered tree species.' },
    { img: '/assets/project-images/Ananthavana/b242b80b-0580-4b54-8c15-02001d35bacf.png', title: 'Low-Impact Design', desc: 'Extremely low density footprints ensuring nature remains the dominant force.' },
  ];


  return (
    <>
      <Navigation />

      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, top: '-15%', height: '130%', y: heroY, scale: heroScale, transformOrigin: 'center center' }}>
          <img src="/assets/project-images/Ananthavana/hero_image.jpg" alt="ANANTAVANA" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(18, 34, 23, 0.4) 0%, rgba(18, 34, 23, 0.9) 100%)' }}></div>
        </motion.div>

        <div className="container relative" style={{ zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '60px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', color: '#FFF', borderRadius: '30px', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '30px' }}>
              NEAR KABINI · 34 ACRES
            </span>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.75rem, 5.0vw, 5.0rem)', color: '#FFF', lineHeight: 1, marginBottom: '20px' }}>ANANTAVANA</h1>

            <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', fontWeight: 300, fontFamily: 'var(--font-serif)', fontStyle: 'italic', margin: '0 auto' }}>
              Where the Forest Leads
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
                <img src="/assets/images/Project-Logos/Anantavana.webp" alt="ANANTAVANA Logo" style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 2.8vw, 2.8rem)', color: 'var(--bg-dark-forest)', marginBottom: '30px', lineHeight: 1.2 }} dangerouslySetInnerHTML={{ __html: 'Harmony between<br/>Land and Life.' }}>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-dark)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                <p>Kabini – The land of spectacular landscapes and wildlife.</p>
                <p>AnantaVana is a sustainable natural re-forestation project in Kabini for nature lovers. Spread across 34 acres, Anantavana unfolds in phases, with farm parcels from 10,000 sq. ft. Set in Kabini’s rich ecological belt, this is not land created—it is land that already lives.</p>
                <p>With dense forests, thriving biodiversity, and a quiet natural rhythm, Anantavana invites you to step into nature, not impose upon it. Over 20% of the land is reserved for common spaces featuring tree-lined roads, natural ponds, pergolas, heritage cottages, mud houses, herbal gardens, and tree houses amidst nature.</p>
                <div>
                  <a href="#" className="btn-pill btn-pill-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '30px' }}><i className="fa-solid fa-download"></i> Download Brochure</a>
                </div>
              </div>

              <div style={{ marginTop: '60px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--bg-dark-forest)', marginBottom: '30px' }}>Amenities & Experiences</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
                  {[
                    { title: 'Tree House Retreats', desc: 'Perched amidst the canopy, offering a secluded getaway connected to nature.', img: '/assets/project-images/Ananthavana/AV Tree House.png' },
                    { title: 'Natural Ponds', desc: 'Restored ecological water bodies acting as a haven for local flora and fauna.', img: '/assets/project-images/Ananthavana/hero_image_2.jpg' },
                    { title: 'Eco Cottages & Mud Houses', desc: 'Sustainable living spaces blending seamlessly into the Kabini wilderness.', img: '/assets/project-images/Ananthavana/b242b80b-0580-4b54-8c15-02001d35bacf.png' },
                    { title: 'Herbal Gardens & Fire Camps', desc: 'Spaces designed for community gathering and experiencing ancient botanical wisdom.', img: '/assets/project-images/Ananthavana/9f5cea54-01f1-417d-862a-f818a7f97cfb.png' }
                  ].map((amenity, i) => (
                    <div key={i} style={{ display: 'flex', gap: '24px', alignItems: 'center', background: '#FFF', padding: '20px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
                      <div style={{ width: '120px', height: '120px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={amenity.img} alt={amenity.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--bg-dark-forest)', marginBottom: '8px' }}>{amenity.title}</h4>
                        <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{amenity.desc}</p>
                      </div>
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

            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Tour Section */}
      <section style={{ padding: 'clamp(50px, 6vh, 70px) 0', background: '#122217' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>Project Video</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', color: '#FFF' }}>
              Experience AnantaVana
            </h2>
          </div>

          <div style={{ background: '#000', padding: '0', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', overflow: 'hidden', position: 'relative', paddingTop: '56.25%' }}>
            <iframe 
              src="https://www.youtube.com/embed/ZMd2mZhfvsI?si=UftSlEEPsjw9E41T&autoplay=1&mute=1" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
          </div>
        </div>
      </section>
      {/* Large Master Plan Section */}
      <section style={{ padding: 'clamp(50px, 6vh, 70px) 0', background: '#F4F1EA' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>Interactive Master Plan</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', color: 'var(--bg-dark-forest)' }}>
              A Layout Dictated by Nature
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0' }}>
              Every aspect of the Anantavana master plan respects the natural topography, retaining existing trees and natural water flows.
            </p>
          </div>

          <div style={{ background: '#FFF', padding: '20px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <img src="/assets/project-images/Esahavana/EV Arial View 1.png" alt="Anantavana Master Plan" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
          </div>
        </div>
      </section>

      {galleryItems.length > 0 && (
        <section style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: '#FFF' }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: '20px', textAlign: 'center' }}>GALLERY</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.0vw, 3.0rem)', color: 'var(--bg-dark-forest)', marginBottom: '60px', textAlign: 'center' }}>
                Life at ANANTAVANA
              </h2>
            </motion.div>

            <AccordionGallery items={galleryItems} height="500px" />
          </div>
        </section>
      )}

      <section style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: 'var(--bg-cream)' }}>
        <div className="container">
           <div style={{ textAlign: 'center', marginBottom: '60px' }}>
             <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>Nearby Destinations</span>
             <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--bg-dark-forest)' }}>Surrounded by Wilderness. Connected to Comfort.</h2>
           </div>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
              {[
                { time: '85', unit: 'Kilometers', desc: 'To Bandipur National Park', icon: 'fa-leaf' },
                { time: '27', unit: 'Kilometers', desc: 'To Kakankote Forest', icon: 'fa-tree' },
                { time: '7', unit: 'Kilometers', desc: 'To Boating in Gandatoor', icon: 'fa-ship' },
                { time: '130', unit: 'Kilometers', desc: 'To Scenic Coorg', icon: 'fa-mountain' },
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

      <section style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: 'var(--bg-dark-forest)', textAlign: 'center', position: 'relative' }}>
        <div className="container relative" style={{ zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.0vw, 3.0rem)', color: '#FFF', marginBottom: '20px' }}>Experience ANANTAVANA</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 }}>
              Step into the wild. Secure your legacy in the heart of nature. Schedule a site visit to walk the land and understand the ecological principles driving this community.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
              <Link href="/contact" className="btn-pill btn-pill-gold">Schedule a Site Visit</Link>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', display: 'flex', justifyContent: 'center', gap: '40px', color: '#FFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
                <i className="fa-solid fa-phone" style={{ color: 'var(--accent-gold)' }}></i>
                <span>080 47095111</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
                <i className="fa-solid fa-globe" style={{ color: 'var(--accent-gold)' }}></i>
                <span>www.vanatvam.com</span>
              </div>
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
