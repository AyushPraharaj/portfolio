import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Briefcase, Target } from 'lucide-react';
import { education } from '../data/experience';

const facts = [
  { icon: Briefcase,      label: 'Focus',    value: 'Data & ML'          },
  { icon: Target,         label: 'Goal',     value: 'ML Engineer'        },
  { icon: GraduationCap, label: 'Degree',   value: 'MCA @ BIT Mesra'    },
  { icon: MapPin,         label: 'CGPA',     value: '7.9 / 10'           },
];

const learning = [
  'LLM fine-tuning & Retrieval-Augmented Generation (RAG)',
  'Advanced LangGraph multi-agent orchestration patterns',
  'MLOps — model serving with FastAPI, Docker & CI/CD',
  'Statistical learning theory & probabilistic modelling',
];

export default function About() {
  return (
    <section id="about" style={{ padding: '6rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <span className="section-label">Who I Am</span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, marginTop: '0.5rem', letterSpacing: '-0.02em' }}>
          About Me
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        {/* Left — avatar + facts */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{
            width: '140px', height: '140px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.8rem', fontWeight: 800, color: '#fff',
            boxShadow: '0 0 50px rgba(99,102,241,0.45)',
            flexShrink: 0,
          }}>
            AP
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%', maxWidth: '320px' }}>
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass-card"
                style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <Icon size={17} color="#6366f1" />
                <span style={{ fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f8fafc', lineHeight: 1.2 }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Education cards */}
          <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {education.map(edu => (
              <div key={edu.degree} className="glass-card" style={{ padding: '0.9rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '4px', borderRadius: '2px', background: edu.color, alignSelf: 'stretch', flexShrink: 0 }} />
                <div>
                  <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc', lineHeight: 1.3 }}>{edu.degree}</p>
                  <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', color: '#64748b' }}>{edu.school}</p>
                  <p style={{ margin: '0.1rem 0 0', fontSize: '0.72rem', color: edu.color }}>CGPA {edu.cgpa} · {edu.period}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — bio */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, fontSize: '1rem', margin: 0 }}>
            I&apos;m a <strong style={{ color: '#e2e8f0' }}>Data Analyst and ML Practitioner</strong> with hands-on experience building predictive models, data pipelines, and multi-agent AI systems. My work spans clinical AI, food-tech recommendation engines, and enterprise analytics — end-to-end, from raw data to deployed product.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, fontSize: '1rem', margin: 0 }}>
            Pursuing MCA at BIT Mesra, I completed an internship at <strong style={{ color: '#e2e8f0' }}>BARC Mumbai</strong> building ML models for scientific prediction tasks (R² 0.98). My major project is a <strong style={{ color: '#e2e8f0' }}>5-agent LangGraph DSS for Parkinson's disease</strong> detection — AUC 0.809, zero false positives on healthy controls.
          </p>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#f8fafc', marginBottom: '1rem', marginTop: 0 }}>
              Currently Exploring
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {learning.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55 }}>
                  <span style={{ color: '#6366f1', marginTop: '2px', flexShrink: 0 }}>▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
