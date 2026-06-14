import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Demo',       href: '#ml-demo' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden]     = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      if (y > lastY.current + 6 && y > 120) setHidden(true);
      else if (y < lastY.current - 6) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), menuOpen ? 260 : 0);
  };

  const linkStyle = {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#86868b', fontSize: '0.875rem', fontWeight: 500,
    transition: 'color 0.2s', padding: 0, letterSpacing: '-0.01em',
  };

  return (
    <>
      <motion.nav
        animate={{ y: hidden && !menuOpen ? -80 : 0, opacity: hidden && !menuOpen ? 0 : 1 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 1.5rem', height: '60px',
          display: 'flex', alignItems: 'center',
          background: scrolled ? 'rgba(0,0,0,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'background 0.35s, border-color 0.35s',
        }}
      >
        <div style={{
          maxWidth: '1200px', margin: '0 auto', width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <span style={{
              fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>AP</span>
          </button>

          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <button key={label} onClick={() => scrollTo(href)} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = '#f5f5f7'}
                onMouseLeave={e => e.currentTarget.style.color = '#86868b'}>
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#contact')}
              style={{
                padding: '0.42rem 1rem', borderRadius: '8px', letterSpacing: '-0.01em',
                fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer',
                background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.28)',
                color: '#a5b4fc', transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.22)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.12)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.28)'; }}
            >Contact</button>
          </div>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(v => !v)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#86868b', padding: 4 }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'fixed', top: '60px', left: 0, right: 0, zIndex: 99,
            background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            padding: '1.5rem',
            display: 'flex', flexDirection: 'column', gap: '1.25rem',
          }}
        >
          {[...NAV_LINKS, { label: 'Contact', href: '#contact' }].map(({ label, href }) => (
            <button key={label} onClick={() => scrollTo(href)}
              style={{ ...linkStyle, textAlign: 'left', fontSize: '1rem', color: '#f5f5f7' }}>
              {label}
            </button>
          ))}
        </motion.div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
