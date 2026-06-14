import { motion } from 'framer-motion';
import { Award, MapPin, Calendar } from 'lucide-react';
import { experiences } from '../data/experience';

export default function Experience() {
  const exp = experiences[0];

  return (
    <section id="experience" style={{
      padding: 'clamp(5rem, 10vw, 8rem) 1.5rem',
      background: 'rgba(255,255,255,0.012)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <span className="section-label" style={{ marginBottom: '0.75rem' }}>Work Experience</span>
          <h2 style={{
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 800,
            letterSpacing: '-0.04em', margin: '0 0 3.5rem', color: '#f5f5f7', lineHeight: 1.05,
          }}>
            Experience.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
          className="v2-card"
          style={{ padding: 'clamp(1.75rem, 4vw, 2.5rem)', maxWidth: '820px' }}
        >
          {/* Company + badge */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem',
          }}>
            <h3 style={{
              margin: 0,
              fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
              fontWeight: 800, letterSpacing: '-0.035em',
              color: exp.color, lineHeight: 1.1,
            }}>
              {exp.company}
            </h3>
            {exp.certified && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.3rem 0.85rem', borderRadius: '9999px',
                fontSize: '0.72rem', fontWeight: 600, flexShrink: 0,
                background: 'rgba(245,158,11,0.09)', border: '1px solid rgba(245,158,11,0.25)',
                color: '#f59e0b',
              }}>
                <Award size={12} /> Certificate Awarded
              </span>
            )}
          </div>

          {/* Role */}
          <p style={{ margin: '0 0 0.65rem', fontSize: '1.05rem', fontWeight: 600, color: '#f5f5f7', letterSpacing: '-0.01em' }}>
            {exp.role}
          </p>

          {/* Meta */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#555' }}>
              <Calendar size={13} /> {exp.period} · {exp.duration}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#555' }}>
              <MapPin size={13} /> {exp.location}
            </span>
          </div>

          <div style={{ borderTop: '1px solid #1a1a1a', marginBottom: '1.75rem' }} />

          {/* Highlights */}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {exp.highlights.map((h, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', fontSize: '0.93rem', color: '#86868b', lineHeight: 1.72 }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                  background: `${exp.color}12`, border: `1px solid ${exp.color}28`,
                  color: exp.color, fontSize: '0.65rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {i + 1}
                </span>
                {h}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
