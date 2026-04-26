import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingScreen    from './components/LoadingScreen';
import Navigation       from './components/Navigation';
import Hero             from './components/Hero';
import About            from './components/About';
import Projects         from './components/Projects';
import Contact          from './components/Contact';
import ProjectSedona from './components/ProjectSedona';
import ProjectCatEnergy from './components/ProjectCatEnergy';
import ProjectKekstagram from './components/ProjectKekstagram';
import ProjectVoidRealm from './components/ProjectVoidRealm';
import ProjectPortfolio from './components/ProjectPortfolio';
import './App.css';
import './scrollReveal.css';


const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      <Navigation />

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Projects />
            <Contact />
          </>
        } />
        <Route path="/projects/sedona" element={<ProjectSedona />} />
        <Route path="/projects/catenergy" element={<ProjectCatEnergy />} />
        <Route path="/projects/kekstagram" element={<ProjectKekstagram />} />
        <Route path="/projects/voidrealm" element={<ProjectVoidRealm />} />
        <Route path="/projects/portfolio" element={<ProjectPortfolio />} />
        
        {/* Можно добавить и другие проекты */}
      </Routes>
    </Router>
  );
};

export default App;