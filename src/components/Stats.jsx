import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function CountUp({ to, decimals = 0, prefix = '', suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        obs.disconnect();
        const t0 = performance.now();
        const dur = 1800;
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - (1 - p) ** 3;
          setVal(parseFloat((to * eased).toFixed(decimals)));
          if (p < 1) requestAnimationFrame(tick);
          else setVal(to);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, decimals]);

  return (
    <span ref={ref}>
      {prefix}{val.toFixed(decimals)}{suffix}
    </span>
  );
}

const STATS = [
  { label: 'Projects Built',  value: 4,     decimals: 0, suffix: '+' },
  { label: 'Best AUC Score',  value: 0.809, decimals: 3 },
  { label: 'Research R²',     value: 0.98,  decimals: 2 },
  { label: 'MCA CGPA',        value: 7.9,   decimals: 1, suffix: '/10' },
];

export default function Stats() {
  return (
    <div style={{
      borderTop:    '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '4rem 1.5rem',
    }}>
      <div style={{
        maxWidth: '960px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '2rem',
        textAlign: 'center',
      }}>
        {STATS.map(({ label, value, decimals, prefix = '', suffix = '' }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.09 }}
          >
            <div style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              marginBottom: '0.55rem',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              <CountUp to={value} decimals={decimals} prefix={prefix} suffix={suffix} />
            </div>
            <div style={{
              color: '#86868b',
              fontSize: '0.82rem',
              fontWeight: 500,
              letterSpacing: '0.03em',
            }}>
              {label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
