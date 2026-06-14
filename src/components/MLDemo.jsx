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
    ctx.fillStyle = '#050505';
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
    setIsDrawing(true); setHasDrawing(true);
    clearTimeout(predTimerRef.current);
    const canvas = canvasRef.current;
    const pos = getPos(e, canvas);
    const ctx = canvas.getContext('2d');
    ctx.beginPath(); ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'white'; ctx.fill();
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
    ctx.strokeStyle = 'white'; ctx.lineWidth = 20;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    lastPos.current = pos;
  };

  const handleEnd = (e) => {
    e.preventDefault();
    setIsDrawing(false); lastPos.current = null;
    if (model && hasDrawing) predTimerRef.current = setTimeout(runPredict, 600);
  };

  const clearCanvas = () => {
    clearTimeout(predTimerRef.current);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#050505'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction(null); setConfidences(null); setHasDrawing(false);
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

  const cardStyle = {
    background: '#0a0a0a',
    border: '1px solid #1d1d1f',
    borderRadius: '1.25rem',
  };

  return (
    <section id="ml-demo" style={{
      padding: 'clamp(5rem, 10vw, 8rem) 1.5rem',
      background: 'rgba(255,255,255,0.012)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          style={{ marginBottom: '3rem' }}>
          <span className="section-label" style={{ marginBottom: '0.75rem' }}>Interactive AI Demo</span>
          <h2 style={{
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 800,
            letterSpacing: '-0.04em', margin: '0 0 1rem', color: '#f5f5f7', lineHeight: 1.05,
          }}>
            Draw. Predict.
          </h2>
          <p style={{ color: '#555', fontSize: '0.95rem', maxWidth: '480px', lineHeight: 1.75, margin: 0 }}>
            A CNN trained on MNIST runs entirely in your browser via TensorFlow.js — no server, no API.
          </p>
        </motion.div>

        {modelStatus === 'error' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ ...cardStyle, padding: '2rem', maxWidth: '580px', textAlign: 'center', borderColor: 'rgba(239,68,68,0.25)' }}>
            <AlertCircle size={36} color="#ef4444" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ color: '#f87171', fontWeight: 600, marginBottom: '0.5rem', marginTop: 0, fontSize: '1rem' }}>
              Model Not Found
            </h3>
            <p style={{ color: '#555', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
              Run{' '}
              <code style={{ background: 'rgba(255,255,255,0.06)', padding: '0.1rem 0.5rem', borderRadius: '5px', color: '#a5b4fc', fontSize: '0.82rem' }}>
                python scripts/generate_model.py
              </code>{' '}
              to train and export the model, then restart the dev server.
            </p>
          </motion.div>
        )}

        {modelStatus === 'loading' && (
          <div style={{ padding: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#555' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
              <Loader2 size={20} color="#6366f1" />
            </motion.div>
            Loading neural network…
          </div>
        )}

        {modelStatus === 'ready' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>

            {/* Canvas panel */}
            <div style={{ ...cardStyle, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#555' }}>Draw a digit (0–9)</span>
                <span style={{ fontSize: '0.7rem', color: '#333' }}>auto-predicts on idle</span>
              </div>
              <canvas
                id="ml-canvas"
                ref={canvasRef}
                width={280} height={280}
                style={{ borderRadius: '10px', border: '1px solid #1a1a1a', width: '100%', aspectRatio: '1/1', display: 'block' }}
                onMouseDown={handleStart} onMouseMove={handleMove} onMouseUp={handleEnd} onMouseLeave={handleEnd}
                onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}
              />
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn-primary" onClick={runPredict} disabled={!hasDrawing || isPredicting}
                  style={{ flex: 1, justifyContent: 'center', gap: '0.4rem' }}>
                  <Zap size={14} /> Predict
                </button>
                <button className="btn-outline" onClick={clearCanvas}
                  style={{ flex: 1, justifyContent: 'center', gap: '0.4rem' }}>
                  <Eraser size={14} /> Clear
                </button>
              </div>
            </div>

            {/* Output panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ ...cardStyle, padding: '1.75rem', textAlign: 'center', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontSize: '0.68rem', color: '#333', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.6rem' }}>
                  Prediction
                </p>
                <AnimatePresence mode="wait">
                  {isPredicting ? (
                    <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem 0' }}>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.75, ease: 'linear' }}>
                        <Cpu size={28} color="#6366f1" />
                      </motion.div>
                    </motion.div>
                  ) : prediction !== null ? (
                    <motion.div key={`p${prediction}`}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 18 }}>
                      <span className="gradient-text" style={{ fontSize: '7rem', fontWeight: 800, lineHeight: 1 }}>
                        {prediction}
                      </span>
                      {confidences && (
                        <p style={{ color: '#555', fontSize: '0.82rem', marginTop: '0.4rem' }}>
                          {(Math.max(...confidences) * 100).toFixed(1)}% confident
                        </p>
                      )}
                    </motion.div>
                  ) : (
                    <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }}
                      style={{ color: '#555', fontSize: '0.88rem', margin: 0 }}>
                      draw something to see a prediction
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {confidences && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ ...cardStyle, padding: '1.25rem' }}>
                  <p style={{ fontSize: '0.68rem', color: '#333', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.85rem' }}>
                    All confidences
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {confidences.map((c, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: 14, fontSize: '0.75rem', fontWeight: i === prediction ? 700 : 400, color: i === prediction ? '#a5b4fc' : '#333', textAlign: 'right' }}>
                          {i}
                        </span>
                        <div style={{ flex: 1, height: '6px', background: '#111', borderRadius: '4px', overflow: 'hidden' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(c * 100).toFixed(1)}%` }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                            style={{
                              height: '100%', borderRadius: '4px',
                              background: i === prediction ? 'linear-gradient(90deg, #6366f1, #8b5cf6)' : '#1d1d1f',
                            }}
                          />
                        </div>
                        <span style={{ width: 32, fontSize: '0.68rem', color: i === prediction ? '#a5b4fc' : '#2a2a2a', textAlign: 'right' }}>
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
      </div>
    </section>
  );
}
