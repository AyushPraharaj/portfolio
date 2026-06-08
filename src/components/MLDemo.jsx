import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eraser, Zap, Cpu, AlertCircle, Loader2 } from 'lucide-react';

export default function MLDemo() {
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [modelStatus, setModelStatus] = useState('loading');
  const [isDrawing, setIsDrawing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [confidences, setConfidences] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);
  const lastPos = useRef(null);
  const predTimerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const tf = await import('@tensorflow/tfjs');
        const m = await tf.loadLayersModel('/model/model.json');
        if (!cancelled) { setModel(m); setModelStatus('ready'); }
      } catch {
        if (!cancelled) setModelStatus('error');
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0f0f1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [modelStatus]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    const src = e.touches ? e.touches[0] : e;
    return { x: (src.clientX - rect.left) * sx, y: (src.clientY - rect.top) * sy };
  };

  const handleStart = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    setHasDrawing(true);
    clearTimeout(predTimerRef.current);
    const canvas = canvasRef.current;
    const pos = getPos(e, canvas);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    lastPos.current = pos;
  };

  const handleMove = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    clearTimeout(predTimerRef.current);
    const canvas = canvasRef.current;
    const pos = getPos(e, canvas);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    lastPos.current = pos;
  };

  const handleEnd = (e) => {
    e.preventDefault();
    setIsDrawing(false);
    lastPos.current = null;
    if (model && hasDrawing) predTimerRef.current = setTimeout(runPredict, 600);
  };

  const clearCanvas = () => {
    clearTimeout(predTimerRef.current);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0f0f1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction(null);
    setConfidences(null);
    setHasDrawing(false);
  };

  const runPredict = async () => {
    if (!model || !hasDrawing) return;
    setIsPredicting(true);
    try {
      const tf = await import('@tensorflow/tfjs');
      const canvas = canvasRef.current;
      const tensor = tf.browser.fromPixels(canvas, 1).resizeBilinear([28, 28]).div(255.0).expandDims(0);
      const result = model.predict(tensor);
      const data = Array.from(await result.data());
      tensor.dispose(); result.dispose();
      setPrediction(data.indexOf(Math.max(...data)));
      setConfidences(data);
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <section id="demo" style={{ padding: '6rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3rem', textAlign: 'center' }}
      >
        <span className="section-label">Interactive AI Demo</span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, marginTop: '0.5rem', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          Draw a Digit — Watch AI Predict It
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
          A CNN trained on MNIST runs entirely in your browser via TensorFlow.js.
          No server, no API — pure on-device inference.
        </p>
      </motion.div>

      {modelStatus === 'error' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card"
          style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center', borderColor: 'rgba(239,68,68,0.3)' }}>
          <AlertCircle size={36} color="#ef4444" style={{ marginBottom: '0.75rem' }} />
          <h3 style={{ color: '#f87171', fontWeight: 600, marginBottom: '0.5rem', marginTop: 0, fontSize: '1rem' }}>
            Model Not Found
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
            Run{' '}
            <code style={{ background: 'rgba(255,255,255,0.08)', padding: '0.1rem 0.5rem', borderRadius: '4px', color: '#a5b4fc' }}>
              python scripts/generate_model.py
            </code>{' '}
            to train and export the model, then restart the dev server.
          </p>
        </motion.div>
      )}

      {modelStatus === 'loading' && (
        <div style={{ textAlign: 'center', padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: '#64748b' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
            <Loader2 size={22} color="#6366f1" />
          </motion.div>
          Loading neural network…
        </div>
      )}

      {modelStatus === 'ready' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}
        >
          {/* Canvas panel */}
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}>Draw a digit (0–9)</span>
              <span style={{ fontSize: '0.72rem', color: '#475569' }}>auto-predicts on idle</span>
            </div>
            <canvas
              id="ml-canvas"
              ref={canvasRef}
              width={280}
              height={280}
              style={{ borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', width: '100%', aspectRatio: '1/1', display: 'block' }}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
            />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-primary" onClick={runPredict} disabled={!hasDrawing || isPredicting}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', opacity: hasDrawing ? 1 : 0.45 }}>
                <Zap size={14} /> Predict
              </button>
              <button className="btn-outline" onClick={clearCanvas}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                <Eraser size={14} /> Clear
              </button>
            </div>
          </div>

          {/* Output panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
                Prediction
              </p>
              <AnimatePresence mode="wait">
                {isPredicting ? (
                  <motion.div key="pred-loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem 0' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}>
                      <Cpu size={30} color="#6366f1" />
                    </motion.div>
                  </motion.div>
                ) : prediction !== null ? (
                  <motion.div key={`pred-${prediction}`}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  >
                    <span className="gradient-text" style={{ fontSize: '6rem', fontWeight: 800, lineHeight: 1 }}>
                      {prediction}
                    </span>
                    {confidences && (
                      <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.4rem' }}>
                        {(Math.max(...confidences) * 100).toFixed(1)}% confident
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} exit={{ opacity: 0 }}
                    style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0 }}>
                    draw something to see a prediction
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {confidences && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ padding: '1.25rem' }}
              >
                <p style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
                  All confidences
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {confidences.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '14px', fontSize: '0.78rem', fontWeight: i === prediction ? 700 : 400, color: i === prediction ? '#a5b4fc' : '#475569', textAlign: 'right' }}>
                        {i}
                      </span>
                      <div style={{ flex: 1, height: '7px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(c * 100).toFixed(1)}%` }}
                          transition={{ duration: 0.45, ease: 'easeOut' }}
                          style={{
                            height: '100%',
                            background: i === prediction ? 'linear-gradient(90deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.1)',
                            borderRadius: '4px',
                          }}
                        />
                      </div>
                      <span style={{ width: '36px', fontSize: '0.7rem', color: i === prediction ? '#a5b4fc' : '#334155', textAlign: 'right' }}>
                        {(c * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </section>
  );
}
