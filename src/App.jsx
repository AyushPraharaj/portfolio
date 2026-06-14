import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import MLDemo from './components/MLDemo';
import Contact from './components/Contact';

const divider = { borderTop: '1px solid rgba(255,255,255,0.04)' };

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div style={divider}><About /></div>
        <div style={divider}><Experience /></div>
        <div style={divider}><Skills /></div>
        <div style={divider}><Projects /></div>
        <div style={{ ...divider, background: 'rgba(99,102,241,0.015)' }}><MLDemo /></div>
        <div style={divider}><Contact /></div>
      </main>
    </>
  );
}
