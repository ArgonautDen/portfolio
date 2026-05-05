import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingScreen  from './components/LoadingScreen';
import Navigation     from './components/Navigation';
import Hero           from './components/Hero';
import About          from './components/About';
import Projects       from './components/Projects';
import Contact        from './components/Contact';
import ScrollRestorer from './components/ScrollRestorer';
import './App.css';
import './scrollReveal.css';

// Страницы проектов — грузятся только при переходе на них
const ProjectSedona     = lazy(() => import('./components/ProjectSedona'));
const ProjectCatEnergy  = lazy(() => import('./components/ProjectCatEnergy'));
const ProjectKekstagram = lazy(() => import('./components/ProjectKekstagram'));
const ProjectVoidRealm  = lazy(() => import('./components/ProjectVoidRealm'));
const ProjectPortfolio  = lazy(() => import('./components/ProjectPortfolio'));

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <ScrollRestorer />

      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      <Navigation />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Projects />
              <Contact />
            </>
          } />
          <Route path="/projects/sedona"     element={<ProjectSedona />} />
          <Route path="/projects/catenergy"  element={<ProjectCatEnergy />} />
          <Route path="/projects/kekstagram" element={<ProjectKekstagram />} />
          <Route path="/projects/voidrealm"  element={<ProjectVoidRealm />} />
          <Route path="/projects/portfolio"  element={<ProjectPortfolio />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;