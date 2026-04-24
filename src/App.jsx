import { useState } from 'react';
import LoadingScreen    from './components/LoadingScreen';
import Navigation       from './components/Navigation';
import Hero             from './components/Hero';
import About            from './components/About';
import Projects         from './components/Projects';
import Contact          from './components/Contact';
import './App.css';
import './scrollReveal.css';


const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      

      <Navigation />
      <Hero />
      <About />
      {/* Projects монтируется сразу — видео начинают буферизоваться немедленно */}
      <Projects />
      <Contact />
    </div>
  );
};

export default App;