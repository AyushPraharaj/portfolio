import CursorSpotlight from './components/CursorSpotlight';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import MLDemo from './components/MLDemo';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <CursorSpotlight />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <MLDemo />
        <Contact />
      </main>
    </>
  );
}
