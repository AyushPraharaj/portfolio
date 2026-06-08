import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '6rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3.5rem', textAlign: 'center' }}
      >
        <span className="section-label">What I&apos;ve Built</span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, marginTop: '0.5rem', letterSpacing: '-0.02em' }}>
          Projects
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.75rem', maxWidth: '500px', margin: '0.75rem auto 0' }}>
          A selection of ML and data science projects — with real code and real results.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass-card"
            style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'default', transition: 'box-shadow 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 32px ${project.categoryColor}22`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            {/* Category badge */}
            <span style={{
              alignSelf: 'flex-start',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.72rem', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              background: `${project.categoryColor}18`,
              border: `1px solid ${project.categoryColor}44`,
              color: project.categoryColor,
            }}>
              {project.category}
            </span>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', margin: 0, lineHeight: 1.3 }}>
              {project.title}
            </h3>

            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, margin: 0, flexGrow: 1 }}>
              {project.description}
            </p>

            {/* Tech chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem', fontWeight: 500,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94a3b8',
                }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.4rem 0.9rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 500,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94a3b8', textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#f8fafc'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#94a3b8'; }}
              >
                <Github size={14} /> Code
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  onClick={e => { e.preventDefault(); document.querySelector(project.demo)?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                    padding: '0.4rem 0.9rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 500,
                    background: `${project.categoryColor}18`,
                    border: `1px solid ${project.categoryColor}44`,
                    color: project.categoryColor, textDecoration: 'none', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = `${project.categoryColor}28`}
                  onMouseLeave={e => e.currentTarget.style.background = `${project.categoryColor}18`}
                >
                  <ArrowRight size={14} /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
