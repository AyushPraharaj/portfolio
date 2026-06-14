import { motion } from 'framer-motion';
import { Award, MapPin, Calendar } from 'lucide-react';
import { experiences } from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '6rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <span className="section-label">Work Experience</span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, marginTop: '0.5rem', letterSpacing: '-0.02em' }}>
          Experience
        </h2>
      </motion.div>

      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute', left: '20px', top: 0, bottom: 0,
          width: '1px', background: 'linear-gradient(to bottom, rgba(99,102,241,0.5), rgba(6,182,212,0.1))',
        }} />

        {experiences.map((exp, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{ paddingLeft: '56px', paddingBottom: '2rem', position: 'relative' }}>
            {/* Timeline dot */}
            <div style={{
              position: 'absolute', left: '11px', top: '20px',
              width: '18px', height: '18px', borderRadius: '50%',
              background: exp.color, border: '3px solid #0a0a0f',
              boxShadow: `0 0 12px ${exp.color}99`,
            }} />

            <div className="glass-card" style={{ padding: '1.75rem' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                    {exp.role}
                  </h3>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.95rem', fontWeight: 600, color: exp.color }}>
                    {exp.company}
                  </p>
                </div>
                {exp.certified && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 600,
                    background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)',
                    color: '#fbbf24', flexShrink: 0,
                  }}>
                    <Award size={11} /> Certified
                  </span>
                )}
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                {[
                  { icon: Calendar, text: `${exp.period} · ${exp.duration}` },
                  { icon: MapPin,   text: exp.location },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#64748b' }}>
                    <Icon size={13} /> {text}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {exp.highlights.map((h, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.65 }}>
                    <span style={{ color: exp.color, marginTop: '3px', flexShrink: 0, fontWeight: 700 }}>▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
