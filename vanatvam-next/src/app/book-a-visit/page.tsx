'use client';
import { motion } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import RevealText from '@/components/premium/RevealText';

export default function BookAVisit() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <>
      <Navigation />
      <section className="hero hero-about" style={{ height: '60vh', minHeight: '500px' }}>
        <div className="hero-bg-wrapper">
          <img src="/assets/project-images/Brindavana/Sunny Tropical Banana Orchard.png" alt="Book a Visit toVanaTvam" className="hero-bg-img" />
        </div>
        <div className="hero-overlay" style={{ background: 'linear-gradient(180deg, rgba(18, 34, 23, 0.4) 0%, rgba(18, 34, 23, 0.9) 100%)' }}></div>
        <div className="container relative z-10">
          <motion.div className="hero-content" initial="hidden" animate="visible" variants={staggerContainer} style={{ alignItems: 'center', textAlign: 'center' }}>
            <motion.span variants={fadeIn} className="hero-subtitle">EXPERIENCE THE LAND</motion.span>
            <motion.h1 className="hero-title" variants={fadeIn} style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
              <RevealText>Book a Site Visit</RevealText>
            </motion.h1>
            <motion.p className="hero-desc" variants={fadeIn} style={{ margin: '0 auto', maxWidth: '700px' }}>
              Step into our living ecosystems. Schedule a private guided tour of our sustainable managed farmlands in Karnataka.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '90px 0', background: 'var(--bg-cream)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ background: '#FFFFFF', padding: 'clamp(30px, 5vw, 60px)', borderRadius: 'var(--radius-md)', boxShadow: '0 15px 40px rgba(0,0,0,0.06)', border: '1px solid var(--border-light)', maxWidth: '800px', margin: '0 auto' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="subtitle-tag">RESERVATION FORM</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '15px', color: 'var(--bg-dark-forest)' }}>Confirm Your Visit</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>Select your preferred community and our team will coordinate the perfect date for your guided ecological tour.</p>
            </div>

            <form>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '25px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Full Name</label>
                  <input type="text" className="form-control" placeholder="Enter your full name" required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Phone Number</label>
                  <input type="tel" className="form-control" placeholder="+91 98765 43210" required />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '25px' }}>
                <label>Email Address</label>
                <input type="email" className="form-control" placeholder="yourname@domain.com" required />
              </div>
              <div className="form-group" style={{ marginBottom: '25px' }}>
                <label>Preferred Community</label>
                <select className="form-control" defaultValue="">
                  <option value="" disabled>Select a location...</option>
                  <option value="brindavana">Brindavana (Pavagada · 30 Acres · Completed)</option>
                  <option value="madhuvana">Madhuvana (Maddur · 18 Acres · Water Forest)</option>
                  <option value="anantavana">Anantavana (Kabini · 35 Acres · Wildlife Corridor)</option>
                  <option value="eeshavana">Eeshavana (Kollegala · Cauvery Riverfront)</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: '35px' }}>
                <label>Preferred Date / Additional Notes</label>
                <textarea className="form-control" rows={4} placeholder="When would you like to visit? Any specific requirements?"></textarea>
              </div>
              <button type="submit" className="btn-pill btn-pill-dark" style={{ width: '100%', justifyContent: 'center', fontSize: '1.1rem', padding: '16px' }}>Submit Visit Request</button>
            </form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
