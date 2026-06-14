import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '../data/projects';

function FeaturedCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="v2-card"
      style={{ padding: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1.25rem', position: 'relative', overflow: 'hidden' }}
    >
      {/* Colored accent glow in corner */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '320px', height: '240px', pointerEvents: 'none',
        background: `radial-gradient(ellipse at top right, ${project.categoryColor}18 0%, transparent 70%)`,
      }} />

      <div style={{ position: 'relative' }}>
        {/* Top badges */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <span style={{
            padding: '0.2rem 0.7rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600,
            background: `${project.categoryColor}14`, border: `1px solid ${project.categoryColor}30`,
            color: project.categoryColor, textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            {project.category}
          </span>
          <span style={{
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            padding: '0.2rem 0.7rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600,
            background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', color: '#fbbf24',
          }}>
            <Star size={10} fill="#fbbf24" /> Featured
          </span>
        </div>

        <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f5f5f7', margin: '0 0 0.9rem', lineHeight: 1.2 }}>
          {project.title}
        </h3>
        <p style={{ color: '#86868b', fontSize: '0.95rem', lineHeight: 1.8, margin: '0 0 1.5rem', maxWidth: '700px' }}>
          {project.description}
        </p>

        {/* Tech chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {project.tech.map(t => (
            <span key={t} style={{
              padding: '0.25rem 0.7rem', borderRadius: '7px', fontSize: '0.78rem', fontWeight: 500,
              background: '#111', border: '1px solid #222', color: '#555',
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Link */}
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.5rem 1.1rem', borderRadius: '9px', fontSize: '0.85rem', fontWeight: 500,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
            color: '#86868b', textDecoration: 'none', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#f5f5f7'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#86868b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; }}
        >
          <GithubIcon size={14} /> View on GitHub <ArrowUpRight size={13} />
        </a>
      </div>
    </motion.div>
  );
}

function SmallCard({ project, i }) {
  const [tilt, setTilt]     = useState({ x: 0, y: 0 });
  const [hovered, setHover] = useState(false);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top)  / r.height - 0.5) * -10,
      y: ((e.clientX - r.left) / r.width  - 0.5) *  10,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
      style={{ perspective: '900px' }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHover(false); }}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        style={{
          background: '#0a0a0a',
          border: `1px solid ${hovered ? project.categoryColor + '38' : '#1d1d1f'}`,
          borderRadius: '1.5rem',
          padding: '1.5rem 1.75rem',
          transformStyle: 'preserve-3d',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          boxShadow: hovered ? `0 20px 60px ${project.categoryColor}18` : 'none',
          display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%',
        }}
      >
        <div>
          <span style={{
            padding: '0.2rem 0.65rem', borderRadius: '9999px',
            fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em',
            background: `${project.categoryColor}12`, border: `1px solid ${project.categoryColor}28`,
            color: project.categoryColor,
          }}>
            {project.category}
          </span>
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f5f5f7', margin: 0, lineHeight: 1.35, letterSpacing: '-0.02em', flexGrow: 1 }}>
          {project.title}
        </h3>

        <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
          {project.description.slice(0, 120).trim()}…
        </p>

        {/* Tech chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {project.tech.slice(0, 4).map(t => (
            <span key={t} style={{
              padding: '0.18rem 0.55rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 500,
              background: '#111', border: '1px solid #222', color: '#444',
            }}>
              {t}
            </span>
          ))}
        </div>

        <a href={project.github} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            fontSize: '0.8rem', fontWeight: 500, color: '#555',
            textDecoration: 'none', transition: 'color 0.2s', width: 'fit-content',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#f5f5f7'}
          onMouseLeave={e => e.currentTarget.style.color = '#555'}
        >
          <GithubIcon size={13} /> GitHub <ArrowUpRight size={12} />
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" style={{ padding: 'clamp(5rem, 10vw, 8rem) 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.55 }}
        style={{ marginBottom: '3rem' }}>
        <span className="section-label" style={{ marginBottom: '0.75rem' }}>What I&apos;ve Built</span>
        <h2 style={{
          fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 800,
          letterSpacing: '-0.04em', margin: 0, color: '#f5f5f7', lineHeight: 1.05,
        }}>
          Projects.
        </h2>
      </motion.div>

      <FeaturedCard project={featured} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {rest.map((p, i) => <SmallCard key={p.id} project={p} i={i} />)}
      </div>
    </section>
  );
}
