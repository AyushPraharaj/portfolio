import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About',      href: '#about'      },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Live Demo',  href: '#demo'       },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '0 2rem', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,15,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Logo */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="gradient-text"
        style={{ fontSize: '1.4rem', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        AP
      </button>

      {/* Desktop */}
      <ul style={{ display: 'flex', gap: '1.75rem', listStyle: 'none', margin: 0, padding: 0 }}
          className="hidden md:flex">
        {links.map(link => (
          <li key={link.href}>
            <button onClick={() => scrollTo(link.href)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b',
                fontSize: '0.85rem', fontWeight: 500, transition: 'color 0.2s', padding: '0.2rem 0' }}
              onMouseEnter={e => e.currentTarget.style.color = '#f8fafc'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      <button className="btn-primary md:flex hidden" onClick={() => scrollTo('#contact')}
        style={{ padding: '0.5rem 1.2rem', fontSize: '0.82rem' }}>
        Contact
      </button>

      {/* Mobile hamburger */}
      <button className="md:hidden" onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f8fafc', padding: '0.25rem' }}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute', top: '64px', left: 0, right: 0,
            background: 'rgba(10,10,15,0.97)', backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '1rem 2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem',
          }}>
          {links.map(link => (
            <button key={link.href} onClick={() => scrollTo(link.href)}
              style={{ background: 'none', border: 'none', cursor: 'pointer',
                color: '#64748b', fontSize: '1rem', fontWeight: 500, textAlign: 'left', padding: '0.2rem 0' }}
              onMouseEnter={e => e.currentTarget.style.color = '#f8fafc'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
              {link.label}
            </button>
          ))}
          <button className="btn-primary" onClick={() => scrollTo('#contact')}
            style={{ marginTop: '0.5rem' }}>
            Contact
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
