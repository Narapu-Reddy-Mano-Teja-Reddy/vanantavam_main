'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { blogsData } from '@/data/blogs';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogsData.map((b) => b.category)));
    return ['All', ...cats];
  }, []);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogsData.filter((b) => {
      const matchesCategory =
        selectedCategory === 'All' || b.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Navigation />

      {/* Hero Header */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(140px, 18vh, 180px) 20px clamp(70px, 9vh, 90px)',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0D1910 0%, #122217 100%)',
          color: '#FFF',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.12,
            backgroundImage:
              'radial-gradient(circle at 20% 30%, #C6A265 0%, transparent 40%), radial-gradient(circle at 80% 70%, #52B788 0%, transparent 40%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '850px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              style={{
                color: 'var(--accent-gold, #C6A265)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(198, 162, 101, 0.35)',
                padding: '6px 18px',
                borderRadius: '999px',
                backdropFilter: 'blur(6px)',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-gold, #C6A265)',
                }}
              />
              VANATVAM JOURNAL
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.75rem, 5.5vw, 4.4rem)',
                color: '#FFF',
                marginTop: '10px',
                lineHeight: 1.15,
                fontWeight: 600,
                letterSpacing: '-0.02em',
              }}
            >
              Stories from the Soil
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                color: 'rgba(249, 248, 246, 0.85)',
                maxWidth: '680px',
                margin: '20px auto 0',
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Insights, updates, and deep dives into ecological restoration, Vedic forest science,
              natural farm communities, and sustainable wealth creation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and Content Section */}
      <section style={{ padding: '60px 20px 100px', background: 'var(--bg-cream, #F9F8F6)', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Controls Bar: Category Pills + Search */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '50px',
              paddingBottom: '25px',
              borderBottom: '1px solid rgba(40, 44, 39, 0.08)',
            }}
          >
            {/* Category Pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: selectedCategory === cat ? 700 : 500,
                    letterSpacing: '0.04em',
                    border: '1px solid',
                    borderColor:
                      selectedCategory === cat
                        ? 'var(--brand-earth-brown, #72351C)'
                        : 'rgba(40, 44, 39, 0.15)',
                    backgroundColor:
                      selectedCategory === cat ? 'var(--brand-earth-brown, #72351C)' : '#FFFFFF',
                    color: selectedCategory === cat ? '#FFFFFF' : '#282C27',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat) {
                      e.currentTarget.style.borderColor = 'var(--accent-gold, #C6A265)';
                      e.currentTarget.style.color = 'var(--brand-earth-brown, #72351C)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat) {
                      e.currentTarget.style.borderColor = 'rgba(40, 44, 39, 0.15)';
                      e.currentTarget.style.color = '#282C27';
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: '999px',
                  border: '1px solid #DCE1DA',
                  fontSize: '0.9rem',
                  outline: 'none',
                  backgroundColor: '#FFFFFF',
                  color: '#282C27',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-gold, #C6A265)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#DCE1DA')}
              />
            </div>
          </div>

          {/* Articles Grid (1x1 Aspect Ratio Cards) */}
          {filteredBlogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#687B63' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#122217', marginBottom: '10px' }}>
                No articles found
              </h3>
              <p>Try selecting another category or clearing your search query.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                style={{
                  marginTop: '16px',
                  padding: '10px 22px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--bg-dark-forest, #122217)',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '36px',
              }}
            >
              {filteredBlogs.map((blog, i) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
                  whileHover={{ y: -8 }}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.04)',
                    border: '1px solid rgba(40, 44, 39, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Link
                    href={`/blog/${blog.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    {/* 1x1 Aspect Ratio Thumbnail Image Container */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '1 / 1',
                        overflow: 'hidden',
                        backgroundColor: '#16261B',
                      }}
                    >
                      <Image
                        src={blog.img}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                          objectFit: 'cover',
                          transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                        }}
                        className="blog-card-img"
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: 18,
                          left: 18,
                          background: 'rgba(255, 255, 255, 0.95)',
                          color: 'var(--bg-dark-forest, #122217)',
                          padding: '5px 14px',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          backdropFilter: 'blur(6px)',
                        }}
                      >
                        {blog.category}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div
                      style={{
                        padding: '28px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.82rem',
                          color: 'var(--text-muted, #687B63)',
                          marginBottom: '12px',
                          fontWeight: 500,
                        }}
                      >
                        {blog.date} · {blog.author}
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.42rem',
                          color: 'var(--bg-dark-forest, #122217)',
                          marginBottom: '14px',
                          lineHeight: 1.35,
                          fontWeight: 600,
                        }}
                      >
                        {blog.title}
                      </h3>

                      <p
                        style={{
                          color: '#4B554D',
                          fontSize: '0.96rem',
                          lineHeight: 1.65,
                          flex: 1,
                          fontWeight: 300,
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {blog.excerpt}
                      </p>

                      <div
                        style={{
                          color: 'var(--brand-earth-brown, #72351C)',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          marginTop: '22px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Read Article <span>→</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
