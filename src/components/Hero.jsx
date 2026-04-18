import { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import ShaderBackground from './ShaderBackground';

const Hero = () => {
  const [direction, setDirection] = useState('normal');
  const lastWidthRef = useRef(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const lastWidth = lastWidthRef.current;
      
      if (currentWidth > lastWidth) {
        setDirection('normal');
      } else if (currentWidth < lastWidth) {
        setDirection('reverse');
      }
      
      lastWidthRef.current = currentWidth;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <ShaderBackground />
      {/* Бегущая строка */}
      <div className={styles.marqueeOverlay}>
        <div className={`${styles.marqueeContent} ${styles[direction]}`}>
          <span>Rodichev Denis</span>
          <span>Rodichev Denis</span>
          <span>Rodichev Denis</span>
          <span>Rodichev Denis</span>
          <span>Rodichev Denis</span>
          <span>Rodichev Denis</span>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.leftColumn}>
          {/* Текст вместо фото */}
          <div className={styles.subtitleBlock}>
            Frontend developer
          </div>
        </div>

        <div className={styles.rightColumn}></div>
      </div>

      <div className={styles.buttons}>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        }}>
          Смотреть проекты
        </button>
        <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        }}>
          Связаться
        </button>
      </div>
    </section>
  );
};

export default Hero;