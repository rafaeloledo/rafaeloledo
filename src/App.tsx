import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Post from './pages/Post';
import Music from './pages/Music';
import MusicPost from './pages/MusicPost';
import Contributions from './pages/Contributions';
import ContributionPost from './pages/ContributionPost';
import About from './pages/About';
// import Contact from './pages/Contact';
import Uses from './pages/Uses';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/music" element={<Music />} />
          <Route path="/music/:slug" element={<MusicPost />} />
          <Route path="/contributions" element={<Contributions />} />
          <Route path="/contributions/:slug" element={<ContributionPost />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/uses" element={<Uses />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
