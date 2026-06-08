import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, BarChart2 } from 'lucide-react';

const links = [
  {
    icon: Github,
    label: 'GitHub',
    sub: 'github.com/ayush',
    href: 'https://github.com/ayush',
    color: '#f8fafc',
    bg: 'rgba(255,255,255,0.05)',
    border: 'rgba(255,255,255,0.1)',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    sub: 'Connect with me',
    href: 'https://linkedin.com/in/ayush',
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
    border: 'rgba(14,165,233,0.25)',
  },
  {
    icon: BarChart2,
    label: 'Kaggle',
    sub: 'View my notebooks',
    href: 'https://kaggle.com/ayush',
    color: '#20beff',
    bg: 'rgba(32,190,255,0.08)',
    border: 'rgba(32,190,255,0.25)',
  },
  {
    icon: Mail,
    label: 'Email',
    sub: 'ayush@example.com',
    href: 'mailto:ayush@example.com',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.25)',
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: '6rem 1.5rem 8rem',
        maxWidth: '1100px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3.5rem' }}
      >
        <span className="section-label">Get In Touch</span>
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, marginTop: '0.5rem',
            letterSpacing: '-0.02em', marginBottom: '0.75rem',
          }}
        >
          Let&apos;s Build Together
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
          I&apos;m open to collaborations, internships, and interesting AI/ML projects.
          Reach out — I&apos;d love to connect.
        </p>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {links.map(({ icon: Icon, label, sub, href, color, bg, border }, i) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card"
            style={{
              padding: '1.5rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
              textDecoration: 'none',
              background: bg,
              borderColor: border,
              transition: 'box-shadow 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 32px ${color}22`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{
              width: '46px', height: '46px', borderRadius: '12px',
              background: `${color}18`, border: `1px solid ${color}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={20} color={color} />
            </div>
            <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#f8fafc' }}>{label}</span>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{sub}</span>
          </motion.a>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{ marginTop: '4rem', color: '#334155', fontSize: '0.8rem' }}
      >
        Built with React + Vite + TensorFlow.js · {new Date().getFullYear()} Ayush Kumawat
      </motion.p>
    </section>
  );
}
