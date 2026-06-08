import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import MLDemo from './components/MLDemo';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <About />
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <Skills />
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <Projects />
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(99,102,241,0.02)' }}>
          <MLDemo />
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <Contact />
        </div>
      </main>
    </>
  );
}
