import { motion } from 'framer-motion';
import { education } from '../data/experience';

const EXPLORING = ['LLM Fine-tuning', 'RAG Systems', 'MLOps / CI-CD', 'LangGraph Agents'];

const FACTS = [
  { label: 'Focus',    value: 'Data & ML'    },
  { label: 'Goal',     value: 'ML Engineer'  },
  { label: 'Location', value: 'India'        },
  { label: 'Status',   value: 'Open to Work' },
];

export default function About() {
  return (
    <section id="about" style={{ padding: 'clamp(5rem, 10vw, 8rem) 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.55 }}>
        <span className="section-label" style={{ marginBottom: '0.75rem' }}>Who I Am</span>
        <h2 style={{
          fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 800,
          letterSpacing: '-0.04em', margin: '0 0 3.5rem', color: '#f5f5f7', lineHeight: 1.05,
        }}>
          About.
        </h2>
      </motion.div>

      <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '4rem', alignItems: 'start' }}>

        {/* Left — bio */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

          <p style={{ color: '#86868b', lineHeight: 1.85, fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)', margin: 0 }}>
            I&apos;m a{' '}
            <strong style={{ color: '#f5f5f7', fontWeight: 600 }}>Data Analyst and ML Practitioner</strong>
            {' '}building predictive models, multi-agent AI systems, and scalable data pipelines.
            My work spans clinical AI, food-tech recommendation engines, and enterprise analytics — end-to-end.
          </p>

          <p style={{ color: '#86868b', lineHeight: 1.85, fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)', margin: 0 }}>
            During my internship at{' '}
            <strong style={{ color: '#f5f5f7', fontWeight: 600 }}>BARC Mumbai</strong>
            , I built ML models achieving R²&nbsp;0.98 on scientific prediction tasks.
            My primary research — a{' '}
            <strong style={{ color: '#f5f5f7', fontWeight: 600 }}>5-agent LangGraph DSS</strong>
            {' '}for Parkinson&apos;s disease detection — achieves AUC&nbsp;0.809 with zero false positives on healthy controls.
          </p>

          {/* Currently Exploring */}
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6366f1', margin: '0 0 0.85rem' }}>
              Currently Exploring
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {EXPLORING.map(item => (
                <span key={item} style={{
                  padding: '0.35rem 0.85rem', borderRadius: '8px',
                  fontSize: '0.82rem', fontWeight: 500,
                  background: 'rgba(99,102,241,0.09)', border: '1px solid rgba(99,102,241,0.2)',
                  color: '#a5b4fc',
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — education + facts */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.18 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#444', margin: '0 0 0.1rem' }}>
            Education
          </p>

          {education.map(edu => (
            <div key={edu.degree} className="v2-card" style={{ padding: '1.1rem 1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: '#f5f5f7', letterSpacing: '-0.01em' }}>{edu.degree}</p>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#555' }}>{edu.school}</p>
                </div>
                <span style={{
                  padding: '0.2rem 0.65rem', borderRadius: '6px', flexShrink: 0,
                  fontSize: '0.75rem', fontWeight: 600,
                  background: `${edu.color}15`, border: `1px solid ${edu.color}30`, color: edu.color,
                }}>
                  {edu.cgpa}
                </span>
              </div>
              <p style={{ margin: '0.45rem 0 0', fontSize: '0.72rem', color: '#3a3a3a' }}>{edu.period}</p>
            </div>
          ))}

          {/* Quick facts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginTop: '0.25rem' }}>
            {FACTS.map(({ label, value }) => (
              <div key={label} style={{
                padding: '0.75rem 0.9rem',
                background: '#070707', border: '1px solid #181818', borderRadius: '10px',
              }}>
                <p style={{ margin: 0, fontSize: '0.65rem', color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
                <p style={{ margin: '0.18rem 0 0', fontSize: '0.85rem', fontWeight: 600, color: '#f5f5f7' }}>{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`@media(max-width:760px){.about-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
