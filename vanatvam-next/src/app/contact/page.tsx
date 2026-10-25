'use client';
import { motion } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Magnetic from '@/components/premium/Magnetic';
import RevealText from '@/components/premium/RevealText';

export default function Contact() {
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
      <section className="hero hero-about" style={{ height: '55vh', minHeight: '420px' }}>
        <div className="hero-bg-wrapper">
          <img src="/assets/project-images/Esahavana/EV River View 1.jpg" alt="ContactVanaTvam" className="hero-bg-img" />
        </div>
        <div className="hero-overlay" style={{ background: 'linear-gradient(180deg, rgba(18, 34, 23, 0.5) 0%, rgba(18, 34, 23, 0.85) 100%)' }}></div>
        <div className="container relative z-10">
          <motion.div className="hero-content" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeIn} className="hero-subtitle">GET IN TOUCH</motion.span>
            <motion.h1 className="hero-title" variants={fadeIn}>
              <RevealText>Contact Us</RevealText>
            </motion.h1>
            <motion.p className="hero-desc" variants={fadeIn}>Plan a private guided site visit or discuss managed farmland investment opportunities with our team.</motion.p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '90px 0', background: 'var(--bg-cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px', alignItems: 'start' }}>

            {/* Left: Office info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{ background: '#FFFFFF', padding: '45px', borderRadius: 'var(--radius-md)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid var(--border-light)' }}
            >
              <span className="subtitle-tag">HEAD OFFICE</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '25px', color: 'var(--bg-dark-forest)' }}>Vanatvam Private Limited</h2>

              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Address</div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', lineHeight: 1.6, margin: 0 }}>
                  #5, Anjanadri Plaza, 2nd Floor, Girinagar 1st Phase (Behind Radhakrishna Hospital), Bengaluru – 560085
                </p>
              </div>

              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Corporate Identity Number</div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', fontWeight: 600, margin: 0 }}>CIN: U01100KA2022PTC159587</p>
              </div>

              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Email</div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', margin: 0 }}>
                  <i className="fa-regular fa-envelope" style={{ color: 'var(--accent-gold)', marginRight: '8px' }}></i> info@vanatvam.com
                </p>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Phone</div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', margin: 0 }}>
                  <i className="fa-solid fa-phone" style={{ color: 'var(--accent-gold)', marginRight: '8px' }}></i> +91 (080) 4709-5111 
                </p>
              </div>

              <Magnetic strength={0.2} style={{ display: 'block', width: '100%' }}>
                <a
                  href="https://wa.me/918047095111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-pill-dark"
                  style={{ width: '100%', justifyContent: 'center', background: '#25D366', borderColor: '#25D366' }}
                >
                  <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
                </a>
              </Magnetic>
            </motion.div>

            {/* Right: Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
              style={{ background: '#FFFFFF', padding: '50px', borderRadius: 'var(--radius-md)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid var(--border-light)' }}
            >
              <span className="subtitle-tag">BOOK A SITE VISIT &amp; INQUIRY</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '10px', color: 'var(--bg-dark-forest)' }}>Send Us a Message</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '30px' }}>Our team will respond within 24 hours to coordinate your visit.</p>

              <form>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="form-control" placeholder="Enter your full name" required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" className="form-control" placeholder="+91 98765 43210" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-control" placeholder="yourname@domain.com" required />
                </div>
                <div className="form-group">
                  <label>Interested Project</label>
                  <select className="form-control">
                    <option value="brindavana">Brindavana (Pavagada · 30 Acres)</option>
                    <option value="madhuvana">Madhuvana (Maddur · 18 Acres)</option>
                    <option value="anantavana">Anantavana (Kabini · 35 Acres)</option>
                    <option value="eeshavana">Eeshavana (Cauvery Riverfront)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message / Questions</label>
                  <textarea className="form-control" rows={4} placeholder="Tell us about your requirements or preferred visit dates..."></textarea>
                </div>
                <button type="submit" className="btn-pill btn-pill-dark" style={{ width: '100%', justifyContent: 'center' }}>Submit Inquiry Request</button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
