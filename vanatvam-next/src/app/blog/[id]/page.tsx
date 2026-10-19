'use client';
import { motion } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BlogPost() {
  const params = useParams();
  const id = params.id as string;

  const blogs: Record<string, any> = {
    'redefining-farmland-ownership': {
      title: 'HowVanaTvam is Redefining Farmland Ownership with a Natural & Sustainable Approach',
      date: 'January 12, 2026',
      author: 'Vanatvam Ecological Team',
      img: '/assets/project-images/Brindavana/Rainy Countryside Pond Reflections.png',
      category: 'Ecology',
      content: (
        <>
          <p>For decades, purchasing agricultural land was seen purely as a financial investment—a piece of earth to hold onto until its value increased. However, this traditional model often leads to neglected plots, monoculture farming, or complete ecological degradation. AtVanaTvam, we are fundamentally redefining what it means to own farmland.</p>
          
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '20px' }}>From Ownership to Custodianship</h3>
          <p>When you purchase a plot in aVanaTvam community, you aren't just buying land; you are becoming a custodian of a living ecosystem. We shift the paradigm from resource extraction to ecological restoration. This means implementing deep water trenching, soil regeneration protocols, and strict guidelines against chemical fertilizers.</p>
          
          <img src="/assets/project-images/Brindavana/Farmer Tending Lush Seedlings.png" alt="Seedling" style={{ width: '100%', borderRadius: '16px', margin: '40px 0', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }} />
          
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '20px' }}>The Power of Managed Sustainability</h3>
          <p>The primary hurdle for urban individuals wanting to own farmland is maintenance. How do you manage a farm when you live in a city? Our managed farmland model completely removes this friction. Our team of ecologists, agriculturists, and local farmers handle the day-to-day operations—from planting native canopy trees to harvesting organic produce.</p>
        </>
      )
    },
    'wellness-benefits-nature': {
      title: 'The Wellness Benefits of Living Close to Nature: A Guide for Modern Families',
      date: 'December 05, 2025',
      author: 'Dr. Vivek Sharma',
      img: '/assets/project-images/Ananthavana/hero_image.jpg',
      category: 'Wellness',
      content: (
        <>
          <p>In our hyper-connected, concrete-heavy modern lives, the human nervous system is in a constant state of low-grade stress. The antidote, it turns out, is not a new wellness app, but something our ancestors knew intimately: deep, uninterrupted time in nature.</p>
          
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '20px' }}>The Science of Phytoncides</h3>
          <p>When you walk through communities like Anantavana or Brindavana, you are breathing in phytoncides—antimicrobial essential oils emitted by trees to protect themselves from insects and rot. Studies show that inhaling these organic compounds significantly decreases cortisol levels, lowers blood pressure, and boosts the activity of white blood cells.</p>
          
          <blockquote style={{ borderLeft: '3px solid var(--accent-gold)', paddingLeft: '24px', margin: '40px 0', fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--bg-dark-forest)', lineHeight: 1.6 }}>
            "We are not apart from nature; we are a part of it. When we return to the forest, our bodies biochemically recognize that we have come home."
          </blockquote>
          
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '20px' }}>Rewilding Childhood</h3>
          <p>For children growing up today, structured outdoor time is rare. Natural farm communities provide a safe, unbounded environment for children to engage in 'free play'. This type of unstructured interaction with soil, plants, and water is crucial for cognitive development and building robust immune systems.</p>
        </>
      )
    },
    'sustainable-farmland-future': {
      title: 'Why Sustainable Farmland is the Future of Real Estate in India',
      date: 'November 22, 2025',
      author: 'Vanatvam Research',
      img: '/assets/project-images/Brindavana/Sunny Tropical Banana Orchard.png',
      category: 'Investment',
      content: (
        <>
          <p>The real estate landscape in India is undergoing a massive shift. As urban centers become saturated and pollution levels rise, High Net Worth Individuals (HNIs) and urban professionals are looking beyond city limits—not just for weekend homes, but for secure, inflation-hedging assets.</p>
          
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '20px' }}>The Mathematics of Managed Farmland</h3>
          <p>Unlike commercial real estate which is subject to market volatility and high maintenance overheads, agricultural land in strategic corridors (like the Kabini or Nandi Hills belts) has historically appreciated steadily. When combined with a managed model, the asset generates passive agricultural yield while the land value compounds.</p>
          
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '20px' }}>Ecological Equity</h3>
          <p>What setsVanaTvam apart is the concept of 'Ecological Equity'. A barren piece of land has a certain value. But a piece of land that has been scientifically reforested, with active water tables, rich topsoil, and mature fruit-bearing trees, commands a significant premium. We build wealth by building the ecosystem.</p>
        </>
      )
    },
    'madhuvana-sacred-groves': {
      title: 'Sacred Groves, Eternal Harmony: How Madhuvana Revives India’s Soul',
      date: 'October 15, 2025',
      author: 'Vanatvam Heritage Team',
      img: '/assets/project-images/Brindavana/Tropical Garden Pathway Tunnel.png',
      category: 'Heritage',
      content: (
        <>
          <p>In traditional Indian ecology, a 'Vana' (forest) is not just a collection of trees; it is a sacred space. Ancient texts like the Brihat Samhita meticulously detail the relationships between specific plant species, cosmic energies, and human well-being. Project Madhuvana is a modern homage to this ancient science.</p>
          
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '20px' }}>The Architecture of a Sacred Grove</h3>
          <p>At the heart of Madhuvana lies the integration of specialized groves like the Nakshatra Vana and Navagraha Vana. By planting 27 specific species of trees corresponding to the 27 constellations, we create a highly resilient micro-forest. Because these species have vastly different root depths and leaf structures, they thrive together without competing for the same soil nutrients.</p>
          
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--bg-dark-forest)', marginTop: '40px', marginBottom: '20px' }}>Beyond Aesthetics</h3>
          <p>This is not landscaping; this is ecological engineering. The diverse flora attracts specific endemic bird species and critical pollinators. The dense canopy lowers the ambient temperature by several degrees, creating a self-sustaining micro-climate that honors India's deep ecological heritage.</p>
        </>
      )
    }
  };

  const blog = blogs[id];

  if (!blog) {
    return (
      <>
        <Navigation />
        <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-cream)' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.0vw, 3.0rem)', color: 'var(--bg-dark-forest)' }}>Article Not Found</h1>
            <Link href="/blog" className="btn-pill btn-pill-dark" style={{ marginTop: '20px' }}>Back to Journal</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />

      <article style={{ background: 'var(--bg-cream)', paddingBottom: '120px' }}>
        <header style={{ minHeight: '60vh', position: 'relative', display: 'flex', alignItems: 'flex-end', paddingTop: '180px', paddingBottom: '60px' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img src={blog.img} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(18,34,23,0.7) 0%, rgba(18,34,23,0.95) 100%)' }}></div>
          </div>
          
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span style={{ display: 'inline-block', background: 'var(--accent-gold)', color: '#122217', padding: '6px 16px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '25px' }}>
                {blog.category}
              </span>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#FFF', lineHeight: 1.3, maxWidth: '900px', marginBottom: '25px', wordWrap: 'break-word' }}>
                {blog.title}
              </h1>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span>{blog.date}</span>
                <span style={{ width: '5px', height: '5px', background: 'var(--accent-gold)', borderRadius: '50%' }}></span>
                <span>By {blog.author}</span>
              </div>
            </motion.div>
          </div>
        </header>

        <div className="container" style={{ marginTop: '80px', maxWidth: '900px' }}>
          <div style={{ background: '#FFF', padding: 'clamp(30px, 5vw, 60px) clamp(20px, 5vw, 80px)', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3 }}
              style={{ fontSize: '1.25rem', color: 'var(--text-dark)', lineHeight: 1.9, fontWeight: 300 }}
              className="blog-content"
            >
              {blog.content}
            </motion.div>

            <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--bg-cream)', padding: '30px', borderRadius: '20px' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Written By</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--bg-dark-forest)', margin: '0' }}>{blog.author}</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                  A core part of theVanaTvam team dedicated to ecological restoration, sustainable design, and preserving indigenous knowledge.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
                <Link href="/blog" style={{ color: 'var(--bg-dark-forest)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}>
                  <i className="fa-solid fa-arrow-left" style={{ marginRight: '12px' }}></i> Back to Journal
                </Link>
                <Link href="/projects" className="btn-pill btn-pill-gold">
                  Explore Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
