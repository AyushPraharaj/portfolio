import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const LINE = {
  hidden: { opacity: 0, y: 56 },
  visible: (d) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: d, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const FADE = {
  hidden: { opacity: 0 },
  visible: (d) => ({ opacity: 1, transition: { duration: 0.7, delay: d } }),
};

export default function Hero() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(6rem, 10vw, 9rem) 1.5rem 5rem',
      textAlign: 'center',
    }}>
      {/* Subtle radial glow behind text */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(99,102,241,0.09) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>

        {/* Badge */}
        <motion.div custom={0.1} variants={FADE} initial="hidden" animate="visible"
          style={{ marginBottom: '2.5rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 1rem', borderRadius: '9999px',
            background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
            color: '#a5b4fc', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.02em',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6ee7b7', display: 'inline-block', boxShadow: '0 0 6px #6ee7b7' }} />
            Available for ML &amp; Data roles
          </span>
        </motion.div>

        {/* Main heading — 3 animated lines */}
        <div style={{
          fontSize: 'clamp(3.2rem, 8.5vw, 7rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          marginBottom: '2.5rem',
          overflow: 'hidden',
        }}>
          <motion.div custom={0.25} variants={LINE} initial="hidden" animate="visible">
            <span style={{ color: '#f5f5f7' }}>Building </span>
            <span className="gradient-text">AI</span>
          </motion.div>
          <motion.div custom={0.45} variants={LINE} initial="hidden" animate="visible">
            <span style={{ color: '#f5f5f7' }}>that thinks</span>
          </motion.div>
          <motion.div custom={0.65} variants={LINE} initial="hidden" animate="visible">
            <span style={{ color: '#f5f5f7' }}>in </span>
            <span className="gradient-text">data.</span>
          </motion.div>
        </div>

        {/* Name + role */}
        <motion.div custom={0.95} variants={FADE} initial="hidden" animate="visible"
          style={{ marginBottom: '2.75rem' }}>
          <p style={{ color: '#f5f5f7', fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)', fontWeight: 600, margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>
            Ayush Praharaj
          </p>
          <p style={{ color: '#86868b', fontSize: 'clamp(0.875rem, 1.8vw, 1rem)', margin: 0, letterSpacing: '-0.01em' }}>
            Data Analyst · ML Practitioner · Multi-Agent AI
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div custom={1.15} variants={FADE} initial="hidden" animate="visible"
          style={{ display: 'flex', gap: '0.9rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.75rem' }}>
          <button className="btn-primary" onClick={() => scrollTo('#projects')}>
            View Projects
          </button>
          <button className="btn-outline" onClick={() => scrollTo('#contact')}>
            Let&apos;s Connect
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div custom={1.35} variants={FADE} initial="hidden" animate="visible"
          style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center' }}>
          {[
            { icon: GithubIcon,   href: 'https://github.com/AyushPraharaj',       label: 'GitHub' },
            { icon: LinkedinIcon, href: 'https://linkedin.com/in/ayush-praharaj', label: 'LinkedIn' },
            { icon: Mail,         href: 'mailto:ayushpraharaj2001@gmail.com',       label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer" title={label}
              style={{
                width: 40, height: 40, borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#555', textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.14)'; e.currentTarget.style.color = '#a5b4fc'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}
        onClick={() => scrollTo('#about')}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#2d2d2d', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.3rem',
        }}
      >
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}
