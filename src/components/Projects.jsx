import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '../data/projects';

function ProjectCard({ project, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      whileHover={{ y: -4 }}
      style={{
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '1.25rem',
        padding: '1.75rem',
        display: 'flex', flexDirection: 'column', gap: '1rem',
        transition: 'box-shadow 0.3s, border-color 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 0 40px ${project.categoryColor}18`;
        e.currentTarget.style.borderColor = `${project.categoryColor}33`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{
          padding: '0.22rem 0.75rem', borderRadius: '9999px',
          fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em',
          background: `${project.categoryColor}15`, border: `1px solid ${project.categoryColor}35`,
          color: project.categoryColor, whiteSpace: 'nowrap',
        }}>
          {project.category}
        </span>
        {project.featured && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem', color: '#fbbf24', fontWeight: 600 }}>
            <Star size={11} fill="#fbbf24" /> Featured
          </span>
        )}
      </div>

      <h3 style={{ fontSize: project.featured ? '1.25rem' : '1.05rem', fontWeight: 700, color: '#f8fafc', margin: 0, lineHeight: 1.3 }}>
        {project.title}
      </h3>

      <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.72, margin: 0, flexGrow: 1 }}>
        {project.description}
      </p>

      {/* Tech chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {project.tech.map(t => (
          <span key={t} style={{
            padding: '0.2rem 0.6rem', borderRadius: '6px',
            fontSize: '0.72rem', fontWeight: 500,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
            color: '#64748b',
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.25rem' }}>
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            padding: '0.4rem 0.9rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
            color: '#94a3b8', textDecoration: 'none', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#f8fafc'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
        >
          <GithubIcon size={13} color="currentColor" /> Code
        </a>
        {project.demo && (
          <a href={project.demo}
            onClick={e => { e.preventDefault(); document.querySelector(project.demo)?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.4rem 0.9rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500,
              background: `${project.categoryColor}15`, border: `1px solid ${project.categoryColor}35`,
              color: project.categoryColor, textDecoration: 'none', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = `${project.categoryColor}25`}
            onMouseLeave={e => e.currentTarget.style.background = `${project.categoryColor}15`}
          >
            <ArrowRight size={13} /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" style={{ padding: '6rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <span className="section-label">What I&apos;ve Built</span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, marginTop: '0.5rem', letterSpacing: '-0.02em' }}>
          Projects
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '0.6rem', maxWidth: '480px', margin: '0.6rem auto 0' }}>
          Real projects — from medical AI to data engineering, with real metrics.
        </p>
      </motion.div>

      {/* Bento layout: featured full-width, rest in 3-col grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Featured row */}
        <ProjectCard project={featured} i={0} />

        {/* Rest 3-col */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {rest.map((p, i) => <ProjectCard key={p.id} project={p} i={i + 1} />)}
        </div>
      </div>
    </section>
  );
}
