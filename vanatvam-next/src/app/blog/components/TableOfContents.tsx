'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface HeadingItem {
  id: string;
  text: string;
  level: 'h3' | 'h4';
}

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '24px 22px',
        border: '1px solid rgba(40, 44, 39, 0.08)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
        marginBottom: '28px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          paddingBottom: '14px',
          marginBottom: '16px',
          borderBottom: '1px solid rgba(40, 44, 39, 0.06)',
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
        <h3
          style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--bg-dark-forest, #122217)',
            margin: 0,
            fontFamily: 'var(--font-sans)',
          }}
        >
          Table of Contents
        </h3>
      </div>

      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(heading.id);
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                  setActiveId(heading.id);
                }
              }}
              style={{
                fontSize: heading.level === 'h3' ? '0.88rem' : '0.82rem',
                lineHeight: 1.45,
                color: isActive ? 'var(--brand-earth-brown, #72351C)' : '#556056',
                fontWeight: isActive ? 600 : 400,
                paddingLeft: heading.level === 'h3' ? '12px' : '22px',
                borderLeft: `2px solid ${
                  isActive ? 'var(--brand-earth-brown, #72351C)' : 'transparent'
                }`,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--brand-earth-brown, #72351C)';
                  e.currentTarget.style.borderLeftColor = 'var(--accent-gold, #C6A265)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#556056';
                  e.currentTarget.style.borderLeftColor = 'transparent';
                }
              }}
            >
              {heading.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
