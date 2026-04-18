import { useState, useEffect, useRef } from 'react';
import LoadingScreen    from './components/LoadingScreen';
import Navigation       from './components/Navigation';
import Hero             from './components/Hero';
import About            from './components/About';
import Projects         from './components/Projects';
import Contact          from './components/Contact';
import CrystalWatermark from './components/CrystalWatermark';
import './App.css';
import './scrollReveal.css'; // глобальные стили scroll-анимаций

const App = () => {
  const [loading, setLoading] = useState(true);
  const preloadStarted = useRef(false);
  const videoPreloaders = useRef([]);

  useEffect(() => {
    if (preloadStarted.current) return;
    preloadStarted.current = true;

    const videos = [
      '/videos/Sedona.mp4',
      '/videos/Energy.mp4',
      '/videos/Kekstagram.mp4',
      '/videos/voidrealm.mov'
    ];

    videos.forEach(src => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.src = src;
      video.load();
      videoPreloaders.current.push(video); // <-- сохраняем
    });
  }, []);

  return (
    <div>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      {/* Водяной знак — фиксированный, виден поверх всех секций */}
      <CrystalWatermark />

      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
};

export default App;