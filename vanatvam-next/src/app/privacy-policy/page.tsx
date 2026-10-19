'use client';
import { motion } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Navigation />
      
      <section style={{ padding: 'clamp(120px, 15vh, 160px) 0 clamp(60px, 8vh, 90px)', background: 'var(--bg-cream)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em' }}>LEGAL</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--bg-dark-forest)', marginTop: '20px', marginBottom: '40px', lineHeight: 1.15 }}>Privacy Policy</h1>
            
            <div className="legal-content" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-dark)' }}>
              <p style={{ marginBottom: '20px' }}>Last Updated: October 2026</p>
              
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '15px' }}>1. Introduction</h3>
              <p style={{ marginBottom: '20px' }}>
               VanaTvam Private Limited ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
              </p>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '15px' }}>2. The Data We Collect About You</h3>
              <p style={{ marginBottom: '20px' }}>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}><strong>Identity Data</strong> includes first name, last name, username or similar identifier, title, and date of birth.</li>
                <li style={{ marginBottom: '10px' }}><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li style={{ marginBottom: '10px' }}><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
                <li style={{ marginBottom: '10px' }}><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
              </ul>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '15px' }}>3. How We Use Your Personal Data</h3>
              <p style={{ marginBottom: '20px' }}>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}>Where we need to perform the contract we are about to enter into or have entered into with you (e.g. regarding a farmland purchase inquiry).</li>
                <li style={{ marginBottom: '10px' }}>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li style={{ marginBottom: '10px' }}>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '15px' }}>4. Data Security</h3>
              <p style={{ marginBottom: '20px' }}>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '15px' }}>5. Contact Us</h3>
              <p style={{ marginBottom: '20px' }}>
                If you have any questions about this privacy policy, please contact us at:<br /><br />
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
