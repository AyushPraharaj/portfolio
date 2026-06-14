import { motion } from 'framer-motion';

const ROW1 = [
  { name: 'Python',          color: '#6366f1' },
  { name: 'SQL',             color: '#6366f1' },
  { name: 'PySpark',         color: '#6366f1' },
  { name: 'Alteryx',         color: '#6366f1' },
  { name: 'scikit-learn',    color: '#8b5cf6' },
  { name: 'XGBoost',         color: '#8b5cf6' },
  { name: 'PyTorch',         color: '#8b5cf6' },
  { name: 'LangGraph',       color: '#8b5cf6' },
  { name: 'HuggingFace',     color: '#8b5cf6' },
  { name: 'SHAP',            color: '#8b5cf6' },
  { name: 'ANN / MLP',       color: '#8b5cf6' },
  { name: 'CNNs',            color: '#8b5cf6' },
  { name: 'NLP',             color: '#8b5cf6' },
  { name: 'Ensemble Models', color: '#8b5cf6' },
];

const ROW2 = [
  { name: 'Pandas',                color: '#06b6d4' },
  { name: 'NumPy',                 color: '#06b6d4' },
  { name: 'Power BI',              color: '#06b6d4' },
  { name: 'Matplotlib',            color: '#06b6d4' },
  { name: 'Seaborn',               color: '#06b6d4' },
  { name: 'Feature Engineering',   color: '#06b6d4' },
  { name: 'Statistical Analysis',  color: '#06b6d4' },
  { name: 'A/B Testing',           color: '#06b6d4' },
  { name: 'Excel',                 color: '#06b6d4' },
  { name: 'FastAPI',               color: '#10b981' },
  { name: 'Azure',                 color: '#10b981' },
  { name: 'AWS S3',                color: '#10b981' },
  { name: 'Git',                   color: '#10b981' },
  { name: 'Docker',                color: '#10b981' },
  { name: 'Jupyter',               color: '#10b981' },
  { name: 'AWS CloudFront',        color: '#10b981' },
];

function Chip({ name, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      padding: '0.45rem 1rem', borderRadius: '9999px', flexShrink: 0,
      background: '#0a0a0a', border: '1px solid #1d1d1f',
      fontSize: '0.84rem', fontWeight: 500, color: '#86868b',
      userSelect: 'none',
    }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
      {name}
    </span>
  );
}

function MarqueeRow({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-outer">
      <div className={reverse ? 'marquee-track-rev' : 'marquee-track'} style={{ paddingBottom: '0.75rem' }}>
        {doubled.map((item, i) => (
          <Chip key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: 'clamp(5rem, 10vw, 8rem) 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          style={{ marginBottom: '3rem' }}>
          <span className="section-label" style={{ marginBottom: '0.75rem' }}>What I Use</span>
          <h2 style={{
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 800,
            letterSpacing: '-0.04em', margin: 0, color: '#f5f5f7', lineHeight: 1.05,
          }}>
            Tech Stack.
          </h2>
        </motion.div>
      </div>

      {/* Marquee rows — edge-to-edge */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflow: 'hidden' }}
      >
        {/* Fade masks on edges */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '8rem', zIndex: 1,
            background: 'linear-gradient(90deg, #000 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '8rem', zIndex: 1,
            background: 'linear-gradient(270deg, #000 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          <MarqueeRow items={ROW1} reverse={false} />
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '8rem', zIndex: 1,
            background: 'linear-gradient(90deg, #000 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '8rem', zIndex: 1,
            background: 'linear-gradient(270deg, #000 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          <MarqueeRow items={ROW2} reverse={true} />
        </div>
      </motion.div>
    </section>
  );
}
