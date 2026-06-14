import { motion } from 'framer-motion';
import { Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const links = [
  {
    icon: GithubIcon,
    label: 'GitHub',
    sub: 'github.com/AyushPraharaj',
    href: 'https://github.com/AyushPraharaj',
    color: '#f8fafc',
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.1)',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    sub: 'ayush-praharaj',
    href: 'https://linkedin.com/in/ayush-praharaj',
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.07)',
    border: 'rgba(14,165,233,0.2)',
  },
  {
    icon: Mail,
    label: 'Email',
    sub: 'ayushpraharaj2001@gmail.com',
    href: 'mailto:ayushpraharaj2001@gmail.com',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.07)',
    border: 'rgba(139,92,246,0.2)',
  },
];

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '6rem 1.5rem 8rem', maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ marginBottom: '3.5rem' }}>
        <span className="section-label">Get In Touch</span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, marginTop: '0.5rem', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          Let&apos;s Build Something Together
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto', lineHeight: 1.75 }}>
          Open to collaborations, internships, and interesting data or AI projects.
          Reach out — I&apos;d love to connect.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
        {links.map(({ icon: Icon, label, sub, href, color, bg, border }, i) => (
          <motion.a key={label} href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -5 }}
            className="glass-card"
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
              textDecoration: 'none', background: bg, borderColor: border, transition: 'box-shadow 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 32px ${color}22`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{ width: '46px', height: '46px', borderRadius: '12px',
              background: `${color}15`, border: `1px solid ${color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={20} color={color} />
            </div>
            <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#f8fafc' }}>{label}</span>
            <span style={{ fontSize: '0.75rem', color: '#475569', wordBreak: 'break-all' }}>{sub}</span>
          </motion.a>
        ))}
      </div>

      {/* Resume download hint */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          padding: '0.9rem 1.75rem', borderRadius: '9999px',
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
          color: '#64748b', fontSize: '0.85rem', width: 'fit-content', margin: '0 auto 3rem' }}>
        <ExternalLink size={14} />
        Available for internships & full-time Data / ML roles
      </motion.div>

      <p style={{ color: '#1e293b', fontSize: '0.78rem' }}>
        Built with React + Vite + TensorFlow.js · {new Date().getFullYear()} Ayush Praharaj
      </p>
    </section>
  );
}
