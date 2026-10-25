import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogsData, getBlogById } from '@/data/blogs';
import TableOfContents from '../components/TableOfContents';

export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    id: blog.id,
  }));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = getBlogById(id);

  if (!blog) {
    notFound();
  }

  // Related posts (excluding current)
  const relatedPosts = blogsData
    .filter((b) => b.id !== blog.id)
    .slice(0, 3);

  // Extract headings for Table of Contents
  const headings = blog.contentBlocks
    .filter((b) => (b.type === 'h3' || b.type === 'h4') && b.text)
    .map((b, i) => {
      const cleanText = (b.text || '').replace(/<[^>]*>/g, '');
      return {
        id: `heading-${i}-${slugify(cleanText).slice(0, 25)}`,
        text: cleanText,
        level: b.type as 'h3' | 'h4',
      };
    });

  let headingCounter = 0;

  // Approximate reading time
  const totalWords = blog.contentBlocks.reduce((acc, b) => {
    return acc + (b.text ? b.text.split(' ').length : 0);
  }, 0);
  const readTimeMinutes = Math.max(2, Math.ceil(totalWords / 200));

  return (
    <>
      <Navigation />

      <article style={{ background: 'var(--bg-cream, #F9F8F6)', paddingBottom: '100px' }}>
        {/* Atmospheric Full-Image Hero Section */}
        <header
          style={{
            position: 'relative',
            minHeight: 'clamp(460px, 58vh, 600px)',
            display: 'flex',
            alignItems: 'flex-end',
            paddingTop: 'clamp(150px, 18vh, 190px)',
            paddingBottom: 'clamp(55px, 8vh, 75px)',
            backgroundColor: '#0D1A10',
            overflow: 'hidden',
          }}
        >
          {/* Background Image with Cinematic Depth Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
            }}
          >
            <Image
              src={blog.img}
              alt={blog.title}
              fill
              priority
              style={{
                objectFit: 'cover',
                objectPosition: 'center 35%',
                transform: 'scale(1.02)',
              }}
            />
            {/* Multi-stop cinematic gradient to ensure crisp readability */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(13, 26, 16, 0.55) 0%, rgba(13, 26, 16, 0.72) 45%, rgba(13, 26, 16, 0.94) 85%, #0E1A12 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse at 20% 50%, rgba(198, 162, 101, 0.12) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          <div
            className="container"
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 28px',
              width: '100%',
            }}
          >
            {/* Breadcrumbs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.86rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '20px',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>
                Home
              </Link>
              <span style={{ opacity: 0.5 }}>/</span>
              <Link href="/blog" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>
                Journal
              </Link>
              <span style={{ opacity: 0.5 }}>/</span>
              <span style={{ color: 'var(--accent-gold, #C6A265)', fontWeight: 500 }}>{blog.category}</span>
            </div>

            {/* Meta Pill: Category + Read Time */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '22px',
                flexWrap: 'wrap',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '6px 16px 6px 6px',
                borderRadius: '999px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  background: 'var(--accent-gold, #C6A265)',
                  color: '#122217',
                  padding: '5px 14px',
                  borderRadius: '999px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {blog.category}
              </span>
              <span
                style={{
                  color: 'rgba(255, 255, 255, 0.88)',
                  fontSize: '0.84rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 500,
                }}
              >
                <span>⏱</span> {readTimeMinutes} min read
              </span>
            </div>

            {/* Expansive, Elegant Title */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)',
                color: '#FFFFFF',
                lineHeight: 1.2,
                maxWidth: '1120px',
                marginBottom: '24px',
                letterSpacing: '-0.02em',
                fontWeight: 600,
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
              }}
            >
              {blog.title}
            </h1>

            {/* Author, Date & Editorial Info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '0.95rem',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(198, 162, 101, 0.25)',
                    border: '1px solid rgba(198, 162, 101, 0.5)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-gold, #C6A265)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                  }}
                >
                  VT
                </span>
                <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{blog.author}</span>
              </div>
              <span
                style={{
                  width: '4px',
                  height: '4px',
                  background: 'var(--accent-gold, #C6A265)',
                  borderRadius: '50%',
                }}
              />
              <span>{blog.date}</span>
              <span
                style={{
                  width: '4px',
                  height: '4px',
                  background: 'rgba(255, 255, 255, 0.4)',
                  borderRadius: '50%',
                }}
              />
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Vanatvam Journal</span>
            </div>
          </div>
        </header>

        {/* 2-Column Layout: Main Content (Left) + Sidebar (Right) */}
        <div
          className="container"
          style={{
            maxWidth: '1280px',
            margin: '40px auto 0',
            padding: '0 24px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) 360px',
              gap: '40px',
              alignItems: 'start',
            }}
            className="blog-detail-grid"
          >
            {/* Left Column: Article Core */}
            <main
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: 'clamp(28px, 4.5vw, 52px)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                border: '1px solid rgba(40, 44, 39, 0.06)',
                overflow: 'hidden',
              }}
            >
              {/* Featured 1x1 Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  maxHeight: '480px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  marginBottom: '36px',
                  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.06)',
                  backgroundColor: '#16261B',
                }}
              >
                <Image
                  src={blog.img}
                  alt={blog.title}
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Dynamic Content Blocks */}
              <div
                className="blog-content"
                style={{
                  fontSize: '1.14rem',
                  color: '#282C27',
                  lineHeight: 1.85,
                  fontWeight: 300,
                }}
              >
                {blog.contentBlocks.map((block, idx) => {
                  if (block.type === 'h3') {
                    const headingId = headings[headingCounter]?.id || `heading-${idx}`;
                    headingCounter++;
                    return (
                      <h3
                        id={headingId}
                        key={idx}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
                          color: 'var(--bg-dark-forest, #122217)',
                          marginTop: '40px',
                          marginBottom: '16px',
                          lineHeight: 1.3,
                          fontWeight: 600,
                          scrollMarginTop: '100px',
                        }}
                        dangerouslySetInnerHTML={{ __html: block.text || '' }}
                      />
                    );
                  }
                  if (block.type === 'h4') {
                    const headingId = headings[headingCounter]?.id || `heading-${idx}`;
                    headingCounter++;
                    return (
                      <h4
                        id={headingId}
                        key={idx}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.24rem',
                          color: 'var(--brand-earth-brown, #72351C)',
                          marginTop: '28px',
                          marginBottom: '12px',
                          lineHeight: 1.35,
                          fontWeight: 600,
                          scrollMarginTop: '100px',
                        }}
                        dangerouslySetInnerHTML={{ __html: block.text || '' }}
                      />
                    );
                  }
                  if (block.type === 'quote') {
                    return (
                      <blockquote
                        key={idx}
                        style={{
                          borderLeft: '4px solid var(--accent-gold, #C6A265)',
                          backgroundColor: 'var(--bg-cream, #F9F8F6)',
                          padding: '22px 28px',
                          borderRadius: '0 14px 14px 0',
                          margin: '32px 0',
                          fontSize: '1.2rem',
                          fontFamily: 'var(--font-serif)',
                          fontStyle: 'italic',
                          color: 'var(--bg-dark-forest, #122217)',
                          lineHeight: 1.6,
                        }}
                        dangerouslySetInnerHTML={{ __html: block.text || '' }}
                      />
                    );
                  }
                  if (block.type === 'img' && block.src) {
                    return (
                      <div
                        key={idx}
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '380px',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          margin: '36px 0',
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                        }}
                      >
                        <Image
                          src={block.src}
                          alt={block.alt || 'Vanatvam blog visual'}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    );
                  }
                  return (
                    <p
                      key={idx}
                      style={{ marginBottom: '20px' }}
                      dangerouslySetInnerHTML={{ __html: block.text || '' }}
                    />
                  );
                })}
              </div>

              {/* Author Box */}
              <div
                style={{
                  marginTop: '48px',
                  paddingTop: '32px',
                  borderTop: '1px solid rgba(40, 44, 39, 0.08)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '18px',
                    background: 'var(--bg-cream, #F9F8F6)',
                    padding: '24px 28px',
                    borderRadius: '16px',
                    border: '1px solid rgba(40, 44, 39, 0.05)',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-dark-forest, #122217)',
                      color: 'var(--accent-gold, #C6A265)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      flexShrink: 0,
                    }}
                  >
                    V
                  </div>
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.74rem',
                        color: 'var(--text-muted, #687B63)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        fontWeight: 700,
                        marginBottom: '4px',
                      }}
                    >
                      WRITTEN BY
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.35rem',
                        color: 'var(--bg-dark-forest, #122217)',
                        margin: '0 0 6px',
                      }}
                    >
                      {blog.author}
                    </h3>
                    <p style={{ fontSize: '0.94rem', color: '#556056', lineHeight: 1.6, margin: 0 }}>
                      Part of the Vanatvam research and ecological team dedicated to agro-ecological
                      restoration, biodiversity by design, and Vedic forest science.
                    </p>
                  </div>
                </div>

                {/* Back Link */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '32px',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}
                >
                  <Link
                    href="/blog"
                    style={{
                      color: 'var(--bg-dark-forest, #122217)',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    ← Back to All Articles
                  </Link>
                  <Link
                    href="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'var(--brand-earth-brown, #72351C)',
                      color: '#FFFFFF',
                      padding: '10px 22px',
                      borderRadius: '999px',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Discuss Farmland Ownership →
                  </Link>
                </div>
              </div>
            </main>

            {/* Right Column: Sticky Sidebar with Table of Contents & Widgets */}
            <aside
              style={{
                position: 'sticky',
                top: '100px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {/* Table of Contents Widget */}
              {headings.length > 0 && <TableOfContents headings={headings} />}

              {/* Consultation / CTA Card */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #122217 0%, #1A2E20 100%)',
                  borderRadius: '20px',
                  padding: '28px 24px',
                  color: '#FFFFFF',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(18, 34, 23, 0.12)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(198, 162, 101, 0.2) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
                <span
                  style={{
                    color: 'var(--accent-gold, #C6A265)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  DISCOVER VANATVAM
                </span>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.38rem',
                    lineHeight: 1.3,
                    color: '#FFFFFF',
                    marginBottom: '10px',
                  }}
                >
                  Experience Managed Farmland Firsthand
                </h4>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.82)',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}
                >
                  Schedule a private visit to our nature-first communities across Karnataka. Walk the
                  soil, sacred groves, and experience living in rhythm with nature.
                </p>
                <Link
                  href="/book-a-visit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    backgroundColor: 'var(--accent-gold, #C6A265)',
                    color: '#122217',
                    padding: '12px 20px',
                    borderRadius: '999px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Book a Site Visit →
                </Link>
              </div>

              {/* Curated Projects Widget */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '24px 22px',
                  border: '1px solid rgba(40, 44, 39, 0.08)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
                }}
              >
                <h4
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--bg-dark-forest, #122217)',
                    marginBottom: '16px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid rgba(40, 44, 39, 0.06)',
                  }}
                >
                  Featured Projects
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { name: 'Brindavana', tag: 'Pavagada · 30 Acres', href: '/brindavana' },
                    { name: 'Madhuvana', tag: 'Maddur · 18 Acres · Cauvery', href: '/madhuvana' },
                    { name: 'Anantavana', tag: 'Kabini · 35 Acres · Biodiversity', href: '/anantavana' },
                    { name: 'Eeshavana', tag: 'Cauvery Riverfront Estate', href: '/eeshavana' },
                  ].map((proj) => (
                    <Link
                      key={proj.name}
                      href={proj.href}
                      className="sidebar-proj-link"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textDecoration: 'none',
                        padding: '10px 12px',
                        borderRadius: '12px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.02rem',
                            fontWeight: 600,
                            color: 'var(--bg-dark-forest, #122217)',
                          }}
                        >
                          {proj.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#687B63' }}>{proj.tag}</div>
                      </div>
                      <span style={{ color: 'var(--accent-gold, #C6A265)', fontSize: '0.9rem' }}>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Related Articles Carousel / Grid */}
          <div style={{ marginTop: '80px', paddingTop: '50px', borderTop: '1px solid rgba(40, 44, 39, 0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span
                  style={{
                    color: 'var(--accent-gold, #C6A265)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  KEEP EXPLORING
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.8rem, 3vw, 2.3rem)',
                    color: 'var(--bg-dark-forest, #122217)',
                    margin: 0,
                  }}
                >
                  Recommended Stories
                </h2>
              </div>
              <Link
                href="/blog"
                style={{
                  color: 'var(--brand-earth-brown, #72351C)',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                }}
              >
                View all articles →
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '28px',
              }}
            >
              {relatedPosts.map((r) => (
                <div
                  key={r.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                    border: '1px solid rgba(40, 44, 39, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <Link
                    href={`/blog/${r.id}`}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '1 / 1',
                        backgroundColor: '#16261B',
                      }}
                    >
                      <Image
                        src={r.img}
                        alt={r.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: 14,
                          left: 14,
                          background: 'rgba(255, 255, 255, 0.95)',
                          color: '#122217',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                        }}
                      >
                        {r.category}
                      </span>
                    </div>
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--text-muted, #687B63)',
                          marginBottom: '6px',
                        }}
                      >
                        {r.date}
                      </span>
                      <h4
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.14rem',
                          color: 'var(--bg-dark-forest, #122217)',
                          lineHeight: 1.35,
                          marginBottom: '10px',
                        }}
                      >
                        {r.title}
                      </h4>
                      <div
                        style={{
                          marginTop: 'auto',
                          fontSize: '0.84rem',
                          color: 'var(--brand-earth-brown, #72351C)',
                          fontWeight: 700,
                        }}
                      >
                        Read Article →
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
