'use client';
import { motion } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export default function TermsAndConditions() {
  return (
    <>
      <Navigation />
      
      <section style={{ padding: 'clamp(120px, 15vh, 160px) 0 clamp(60px, 8vh, 90px)', background: 'var(--bg-cream)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em' }}>LEGAL</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--bg-dark-forest)', marginTop: '20px', marginBottom: '40px', lineHeight: 1.15 }}>Terms & Conditions</h1>
            
            <div className="legal-content" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-dark)' }}>
              <p style={{ marginBottom: '20px' }}>Last Updated: October 2026</p>
              
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '15px' }}>1. Agreement to Terms</h3>
              <p style={{ marginBottom: '20px' }}>
                These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") andVanaTvam Private Limited ("Company", "we", "us", or "our"), concerning your access to and use of the https://www.vanatvam.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
              </p>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '15px' }}>2. Intellectual Property Rights</h3>
              <p style={{ marginBottom: '20px' }}>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws.
              </p>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '15px' }}>3. User Representations</h3>
              <p style={{ marginBottom: '20px' }}>
                By using the Site, you represent and warrant that:
              </p>
              <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}>All registration information you submit will be true, accurate, current, and complete.</li>
                <li style={{ marginBottom: '10px' }}>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                <li style={{ marginBottom: '10px' }}>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
                <li style={{ marginBottom: '10px' }}>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
              </ul>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '15px' }}>4. Disclaimer Regarding Real Estate / Farmland</h3>
              <p style={{ marginBottom: '20px' }}>
                Information provided on this website regarding managed farmland projects, pricing, area sizes, and project status is for informational purposes only and does not constitute a legal offer. Actual details may vary and are subject to change without prior notice. Final terms of any farmland purchase or lease will be governed exclusively by the physical legal agreements signed between the buyer andVanaTvam Private Limited.
              </p>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '15px' }}>5. Contact Us</h3>
              <p style={{ marginBottom: '20px' }}>
                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:<br /><br />
                <strong>Vanatvam Private Limited</strong><br />
                #5, Anjanadri Plaza, 2nd Floor, Girinagar 1st Phase,<br />
                Bengaluru – 560085<br />
                Email: hello@vanatvam.com<br />
                CIN: U01100KA2022PTC159587
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
