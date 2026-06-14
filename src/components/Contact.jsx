import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const SOCIALS = [
  { icon: GithubIcon,   label: 'GitHub',   href: 'https://github.com/AyushPraharaj',       color: '#f5f5f7' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://linkedin.com/in/ayush-praharaj', color: '#0ea5e9' },
  { icon: Mail,         label: 'Email',    href: 'mailto:ayushpraharaj2001@gmail.com',       color: '#8b5cf6' },
];

export default function Contact() {
  return (
    <section id="contact" style={{
      padding: 'clamp(6rem, 12vw, 10rem) 1.5rem clamp(5rem, 10vw, 8rem)',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: '1.5rem' }}>
          <span className="section-label" style={{ marginBottom: '1rem' }}>Get In Touch</span>
          <h2 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 800,
            letterSpacing: '-0.04em', margin: 0, color: '#f5f5f7', lineHeight: 1.05,
          }}>
            Let&apos;s connect.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
          style={{ color: '#555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 3rem' }}>
          Open to collaborations, internships, and interesting data or ML projects.
          Reach out — I&apos;d love to hear from you.
        </motion.p>

        {/* Big email link */}
        <motion.a
          href="mailto:ayushpraharaj2001@gmail.com"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.18 }}
          whileHover={{ scale: 1.03 }}
          style={{
            display: 'inline-block',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            fontWeight: 600, letterSpacing: '-0.025em',
            color: '#86868b', textDecoration: 'none',
            padding: '1rem 2rem', borderRadius: '14px',
            background: '#080808', border: '1px solid #1a1a1a',
            transition: 'color 0.25s, border-color 0.25s',
            marginBottom: '3rem',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#f5f5f7'; e.currentTarget.style.borderColor = '#333'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#86868b'; e.currentTarget.style.borderColor = '#1a1a1a'; }}
        >
          ayushpraharaj2001@gmail.com
        </motion.a>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.26 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '5rem' }}>
          {SOCIALS.map(({ icon: Icon, label, href, color }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              title={label}
              whileHover={{ y: -4, scale: 1.08 }}
              style={{
                width: 52, height: 52, borderRadius: '14px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: '#0a0a0a', border: '1px solid #1d1d1f',
                color: '#444', textDecoration: 'none', gap: 4,
                transition: 'color 0.2s, border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = color;
                e.currentTarget.style.borderColor = color + '40';
                e.currentTarget.style.background = color + '0e';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#444';
                e.currentTarget.style.borderColor = '#1d1d1f';
                e.currentTarget.style.background = '#0a0a0a';
              }}
            >
              <Icon size={20} color="currentColor" />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <p style={{ color: '#222', fontSize: '0.78rem', letterSpacing: '0.02em' }}>
          Built with React · Vite · TensorFlow.js &nbsp;·&nbsp; {new Date().getFullYear()} Ayush Praharaj
        </p>
      </div>
    </section>
  );
}
