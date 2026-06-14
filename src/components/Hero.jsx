import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Hero() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      padding: '6rem 1.5rem 4rem', textAlign: 'center',
    }}>
      {/* Gradient orbs */}
      <div className="blob" style={{
        position: 'absolute', top: '5%', left: '5%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="blob-2" style={{
        position: 'absolute', top: '20%', right: '5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="blob-3" style={{
        position: 'absolute', bottom: '5%', left: '30%',
        width: '450px', height: '450px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ marginBottom: '1.75rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            padding: '0.4rem 1.1rem', borderRadius: '9999px',
            background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.28)',
            color: '#a5b4fc', fontSize: '0.8rem', fontWeight: 500,
          }}>
            <Sparkles size={12} />
            Data Analyst · ML Practitioner · Multi-Agent AI
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 800,
            lineHeight: 1.08, letterSpacing: '-0.035em', margin: '0 0 1.25rem', color: '#f8fafc',
          }}>
          Ayush<br />
          <span className="gradient-text">Praharaj</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.15rem)', color: '#94a3b8',
            lineHeight: 1.75, margin: '0 auto 2.5rem', maxWidth: '560px',
          }}>
          Building predictive models, data pipelines &amp; multi-agent AI systems.
          Bridging the gap between raw data and real-world decisions.
        </motion.p>

        {/* CTA buttons */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
          style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <button className="btn-primary" onClick={() => scrollTo('#projects')}>
            View Projects
          </button>
          <button className="btn-outline" onClick={() => scrollTo('#contact')}>
            Let&apos;s Connect
          </button>
        </motion.div>

        {/* Social quick-links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.65 }}
          style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          {[
            { icon: GithubIcon,   href: 'https://github.com/AyushPraharaj',      title: 'GitHub'   },
            { icon: LinkedinIcon, href: 'https://linkedin.com/in/ayush-praharaj', title: 'LinkedIn' },
            { icon: Mail,         href: 'mailto:ayushpraharaj2001@gmail.com',      title: 'Email'    },
          ].map(({ icon: Icon, href, title }) => (
            <a key={title} href={href} target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer" title={title}
              style={{
                width: '40px', height: '40px', borderRadius: '10px', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                color: '#64748b', textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; e.currentTarget.style.color = '#a5b4fc'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              <Icon size={17} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
        onClick={() => scrollTo('#about')}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#334155', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={15} />
        </motion.div>
      </motion.button>
    </section>
  );
}
