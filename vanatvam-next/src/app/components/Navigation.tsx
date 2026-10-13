'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Magnetic from '@/components/premium/Magnetic';

export default function Navigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`} id="main-header" style={{
        backgroundColor: scrolled || isDrawerOpen ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        boxShadow: scrolled || isDrawerOpen ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div className="header-inner" style={{ alignItems: 'center' }}>
          <Link href="/" className="logo-group" onClick={closeDrawer} style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', height: '100%' }}>
            <img 
              src="/assets/images/vanatvamlogo.webp" 
              alt="Vanatvam Logo" 
              className="header-logo-img" 
              style={{ 
                height: scrolled ? '46px' : '56px', 
                width: 'auto', 
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))',
                objectFit: 'contain',
                display: 'block'
              }} 
            />
            <div className="logo-brand" style={{ 
              color: scrolled || isDrawerOpen ? '#1E352F' : '#FFFFFF',
              fontFamily: "'Cinzel', var(--font-serif), serif",
              fontSize: '1.45rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease'
            }}>
              VANATVAM
            </div>
          </Link>
          <nav className="nav-menu">
            {[
              { path: '/', label: 'Home' },
              { path: '/about', label: 'Our Story' },
              { path: '/projects', label: 'Projects' },
              { path: '/investment', label: 'Investment' },
              { path: '/blog', label: 'Journal' }
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-link ${pathname === item.path ? 'active' : ''}`}
                style={{ color: scrolled || isDrawerOpen ? '#1E352F' : '#FFFFFF' }}
              >
                {item.label}
                {pathname === item.path && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="nav-underline"
                    style={{ background: scrolled || isDrawerOpen ? 'var(--brand-amber-gold)' : '#FFFFFF' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            ))}
          </nav>
          <div className="header-right">
            <Magnetic strength={0.3}>
              <Link 
                href="/contact" 
                className="header-cta-btn"
                onClick={closeDrawer}
                style={{
                  background: 'var(--brand-amber-gold)',
                  color: '#122217',
                  boxShadow: '0 4px 16px rgba(255, 194, 41, 0.3)'
                }}
              >
                <span>Contact</span>
                <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
              </Link>
            </Magnetic>
            <div 
              className={`menu-toggle-btn ${isDrawerOpen ? 'open' : ''}`} 
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-label="Toggle navigation menu"
            >
              <span style={{ backgroundColor: scrolled || isDrawerOpen ? '#1E352F' : '#FFFFFF' }}></span>
              <span style={{ backgroundColor: scrolled || isDrawerOpen ? '#1E352F' : '#FFFFFF' }}></span>
              <span style={{ backgroundColor: scrolled || isDrawerOpen ? '#1E352F' : '#FFFFFF' }}></span>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer Menu */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 bg-white"
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', padding: '120px 20px 40px', backgroundColor: 'rgba(255, 255, 255, 0.98)', zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center', width: '100%' }}>
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'Our Story' },
                { path: '/projects', label: 'Projects' },
                { path: '/investment', label: 'Investment' },
                { path: '/blog', label: 'Journal' },
                { path: '/contact', label: 'Contact' }
              ].map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={item.path}
                    onClick={closeDrawer}
                    style={{
                      fontSize: '1.8rem',
                      color: pathname === item.path ? 'var(--accent-gold)' : '#1E352F',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-serif)',
                      display: 'block',
                      textAlign: 'center'
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{ marginTop: '40px', width: '100%', maxWidth: '300px' }}
            >
              <Link href="/book-a-visit" className="btn-pill btn-pill-dark" onClick={closeDrawer} style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>Book a Visit</Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: 'auto', paddingTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}
            >
              <a href="tel:+919999999999" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '1rem' }}><i className="fa-solid fa-phone" style={{ marginRight: '8px' }}></i> +91 99999 99999</a>
              <a href="mailto:hello@vanatvam.com" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '1rem' }}><i className="fa-solid fa-envelope" style={{ marginRight: '8px' }}></i> hello@vanatvam.com</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 998, backdropFilter: 'blur(3px)' }}
          />
        )}
      </AnimatePresence>


    </>
  );
}
