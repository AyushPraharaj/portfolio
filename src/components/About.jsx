import { motion } from 'framer-motion';
import { Brain, Database, Code2, Rocket } from 'lucide-react';

const facts = [
  { icon: Brain,    label: 'Focus',    value: 'AI / ML'         },
  { icon: Database, label: 'Data',     value: 'Python & SQL'    },
  { icon: Code2,    label: 'Learning', value: 'Deep Learning'   },
  { icon: Rocket,   label: 'Goal',     value: 'ML Engineer'     },
];

const learningItems = [
  'Neural networks & backpropagation from scratch',
  'Large Language Models & prompt engineering',
  'MLOps — model deployment with FastAPI & Docker',
  'Probabilistic modeling & Bayesian inference',
];

export default function About() {
  return (
    <section id="about" style={{ padding: '6rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3.5rem', textAlign: 'center' }}
      >
        <span className="section-label">Who I Am</span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, marginTop: '0.5rem', letterSpacing: '-0.02em' }}>
          About Me
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        {/* Left — Avatar + facts */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}
        >
          {/* Avatar */}
          <div style={{
            width: '140px', height: '140px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem', fontWeight: 800, color: '#fff',
            boxShadow: '0 0 40px rgba(99,102,241,0.4)',
            flexShrink: 0,
          }}>
            AK
          </div>

          {/* Fact chips */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%', maxWidth: '320px' }}>
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <Icon size={18} color="#6366f1" />
                <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc' }}>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Bio */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1rem', margin: 0 }}>
            I&apos;m an AI/ML and Data Science enthusiast passionate about turning raw data into actionable insights
            and building intelligent systems that solve real-world problems. I enjoy the entire ML lifecycle —
            from exploratory data analysis to model training and deployment.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1rem', margin: 0 }}>
            When I&apos;m not training models, I&apos;m diving into research papers, competing on Kaggle, or
            experimenting with new architectures. I believe the best way to learn is to build and iterate.
          </p>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc', marginBottom: '1rem', marginTop: 0 }}>
              Currently Learning
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {learningItems.map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
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
