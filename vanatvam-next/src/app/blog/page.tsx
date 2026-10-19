'use client';
import { motion } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

export default function Blog() {
  const blogs = [
    {
      id: 'redefining-farmland-ownership',
      title: 'HowVanaTvam is Redefining Farmland Ownership with a Natural & Sustainable Approach',
      date: 'January 12, 2026',
      author: 'Vanatvam Ecological Team',
      img: '/assets/project-images/Brindavana/Rainy Countryside Pond Reflections.png',
      excerpt: 'Discover how we are moving away from traditional real estate to create living, breathing ecosystems that you can call home.',
      category: 'Ecology'
    },
    {
      id: 'wellness-benefits-nature',
      title: 'The Wellness Benefits of Living Close to Nature: A Guide for Modern Families',
      date: 'December 05, 2025',
      author: 'Dr. Vivek Sharma',
      img: '/assets/project-images/Ananthavana/hero_image.jpg',
      excerpt: 'Modern science is finally catching up to ancient wisdom: living near forests and rich biodiversity profoundly impacts mental and physical health.',
      category: 'Wellness'
    },
    {
      id: 'sustainable-farmland-future',
      title: 'Why Sustainable Farmland is the Future of Real Estate in India',
      date: 'November 22, 2025',
      author: 'Vanatvam Research',
      img: '/assets/project-images/Brindavana/Sunny Tropical Banana Orchard.png',
      excerpt: 'As urban spaces become increasingly crowded, managed agricultural land offers an incredible inflation-hedging asset that also secures our ecological future.',
      category: 'Investment'
    },
    {
      id: 'madhuvana-sacred-groves',
      title: 'Sacred Groves, Eternal Harmony: How Madhuvana Revives India’s Soul',
      date: 'October 15, 2025',
      author: 'Vanatvam Heritage Team',
      img: '/assets/project-images/Brindavana/Tropical Garden Pathway Tunnel.png',
      excerpt: 'A deep dive into the philosophy behind Project Madhuvana and how we are using ancient Nakshatra Vana principles to create sacred ecological spaces.',
      category: 'Heritage'
    }
  ];

  return (
    <>
      <Navigation />

      <section style={{ position: 'relative', padding: 'clamp(150px, 20vh, 180px) 0 clamp(80px, 10vh, 100px)', overflow: 'hidden', background: 'var(--bg-dark-forest)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em' }}>VANATVAM JOURNAL</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', color: '#FFF', marginTop: '20px', lineHeight: 1.15 }}>Stories from the Soil</h1>
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.85)', maxWidth: '650px', margin: '24px auto 0', lineHeight: 1.6 }}>Insights, updates, and deep dives into ecological restoration, nature communities, and sustainable living.</p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--bg-cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' }}>
            {blogs.map((blog, i) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                style={{ background: '#FFF', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
              >
                <Link href={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                    <img src={blog.img} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="blog-card-img" />
                    <span style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(255,255,255,0.9)', color: 'var(--bg-dark-forest)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {blog.category}
                    </span>
                  </div>
                  <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '15px' }}>{blog.date} · {blog.author}</div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--bg-dark-forest)', marginBottom: '15px', lineHeight: 1.3 }}>{blog.title}</h3>
                    <p style={{ color: 'var(--text-dark)', lineHeight: 1.6, flex: 1 }}>{blog.excerpt}</p>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.9rem', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                      Read Article <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
