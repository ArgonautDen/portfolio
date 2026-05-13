import { useState } from 'react';
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import LoadingScreen  from './components/LoadingScreen';
import Navigation     from './components/Navigation';
import Hero           from './components/Hero';
import About          from './components/About';
import Projects       from './components/Projects';
import Contact        from './components/Contact';
import ProjectSedona     from './components/ProjectSedona';
import ProjectCatEnergy  from './components/ProjectCatEnergy';
import ProjectKekstagram from './components/ProjectKekstagram';
import ProjectVoidRealm  from './components/ProjectVoidRealm';
import ProjectPortfolio  from './components/ProjectPortfolio';
import ScrollRestorer from './components/ScrollRestorer';
import './App.css';
import './scrollReveal.css';

const KeepAliveRoutes = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <div style={{ display: path === '/' ? 'contents' : 'none' }}>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </div>
      <div style={{ display: path === '/projects/sedona'     ? 'contents' : 'none' }}><ProjectSedona /></div>
      <div style={{ display: path === '/projects/catenergy'  ? 'contents' : 'none' }}><ProjectCatEnergy /></div>
      <div style={{ display: path === '/projects/kekstagram' ? 'contents' : 'none' }}><ProjectKekstagram /></div>
      <div style={{ display: path === '/projects/voidrealm'  ? 'contents' : 'none' }}><ProjectVoidRealm /></div>
      <div style={{ display: path === '/projects/portfolio'  ? 'contents' : 'none' }}><ProjectPortfolio /></div>
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <ScrollRestorer />
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <Navigation />
      <KeepAliveRoutes />
    </Router>
  );
};

export default App;