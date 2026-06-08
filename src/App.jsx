import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import Home from './pages/Home';
import About from './pages/About';
import Directory from './pages/Directory';
import ThenAndNow from './pages/ThenAndNow';
import MemoryLane from './pages/MemoryLane';
import RaiderRollCall from './pages/RaiderRollCall';
import InMemoriam from './pages/InMemoriam';
import ReunionWeekend from './pages/ReunionWeekend';
import HallOfRaiders from './pages/HallOfRaiders';
import Submit from './pages/Submit';
import Superlatives from './pages/Superlatives';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/then-and-now" element={<ThenAndNow />} />
          <Route path="/memory-lane" element={<MemoryLane />} />
          <Route path="/roll-call" element={<RaiderRollCall />} />
          <Route path="/in-memoriam" element={<InMemoriam />} />
          <Route path="/weekend" element={<ReunionWeekend />} />
          <Route path="/hall-of-raiders" element={<HallOfRaiders />} />
          <Route path="/superlatives" element={<Superlatives />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>
      </main>
      <Footer />
      <MusicPlayer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
