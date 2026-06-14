import { useState, useEffect } from 'react';

export default function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(800px circle at ${pos.x}px ${pos.y}px,
          rgba(99,102,241,0.065) 0%, transparent 70%)`,
      }}
    />
  );
}
