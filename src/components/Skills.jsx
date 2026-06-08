import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/skills';

export default function Skills() {
  const [active, setActive] = useState('All');

  const tabs = ['All', ...skillCategories.map(c => c.label)];

  const visible = active === 'All'
    ? skillCategories
    : skillCategories.filter(c => c.label === active);

  return (
    <section id="skills" style={{ padding: '6rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3rem', textAlign: 'center' }}
      >
        <span className="section-label">What I Use</span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, marginTop: '0.5rem', letterSpacing: '-0.02em' }}>
          Tech Stack
        </h2>
      </motion.div>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}
      >
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.82rem', fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid',
              transition: 'all 0.2s',
              borderColor: active === tab ? '#6366f1' : 'rgba(255,255,255,0.1)',
              background: active === tab ? 'rgba(99,102,241,0.15)' : 'transparent',
              color: active === tab ? '#a5b4fc' : '#64748b',
            }}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Skill groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {visible.map((cat, catIdx) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIdx * 0.08 }}
            className="glass-card"
            style={{ padding: '1.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <span style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: cat.color, flexShrink: 0,
                boxShadow: `0 0 8px ${cat.color}`,
              }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: cat.color }}>
                {cat.label}
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {cat.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  whileHover={{ scale: 1.06 }}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem', fontWeight: 500,
                    background: cat.bg,
                    border: `1px solid ${cat.color}33`,
                    color: '#e2e8f0',
                    cursor: 'default',
                    display: 'inline-block',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
