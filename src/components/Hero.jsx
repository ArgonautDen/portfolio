import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Hero.module.css';
import ShaderBackground from './ShaderBackground';

const GlobeCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(48, 48);
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 2.6;

    const mat = new THREE.LineBasicMaterial({ color: 0xcccccc, linewidth: 2 });
    const SEG = 96;
    const globe = new THREE.Group();

    const outerPts = [];
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * Math.PI * 2;
      outerPts.push(new THREE.Vector3(Math.cos(a), Math.sin(a), 0));
    }
    globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(outerPts), mat));

    [-35, 0, 35].forEach(deg => {
      const phi = (deg * Math.PI) / 180;
      const r = Math.cos(phi);
      const y = Math.sin(phi);
      const pts = [];
      for (let i = 0; i <= SEG; i++) {
        const a = (i / SEG) * Math.PI * 2;
        pts.push(new THREE.Vector3(r * Math.cos(a), y, r * Math.sin(a)));
      }
      globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
    });

    for (let i = 0; i < 3; i++) {
      const theta = (i / 3) * Math.PI;
      const pts = [];
      for (let j = 0; j <= SEG; j++) {
        const phi = (j / SEG) * Math.PI * 2 - Math.PI;
        pts.push(new THREE.Vector3(
          Math.cos(phi) * Math.cos(theta),
          Math.sin(phi),
          Math.cos(phi) * Math.sin(theta)
        ));
      }
      globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
    }

    globe.rotation.x = 0.3;
    scene.add(globe);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      globe.rotation.y += 0.015;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} width={48} height={48} className={styles.globeCanvas} />;
};

const ContactPopup = ({ visible }) => (
  <div className={`${styles.contactPopup} ${visible ? styles.contactPopupVisible : ''}`}>
    <div className={styles.contactPopupRow}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-10 7L2 7"/>
      </svg>
      <a href="mailto:jokko0704@gmail.com" className={styles.contactPopupLink}>
        jokko0704@gmail.com
      </a>
    </div>
    <div className={styles.contactPopupDivider} />
    <div className={styles.contactPopupRow}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z"/>
        <path d="M22 2 11 13"/>
      </svg>
      <a href="https://t.me/denirdv" target="_blank" rel="noreferrer" className={styles.contactPopupLink}>
        @denirdv
      </a>
    </div>
  </div>
);

const Hero = () => {
  const [direction, setDirection] = useState('normal');
  const [contactVisible, setContactVisible] = useState(false);
  const lastWidthRef = useRef(window.innerWidth);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const lastWidth = lastWidthRef.current;
      if (currentWidth > lastWidth) setDirection('normal');
      else if (currentWidth < lastWidth) setDirection('reverse');
      lastWidthRef.current = currentWidth;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContactEnter = () => {
    clearTimeout(hideTimeoutRef.current);
    setContactVisible(true);
  };

  const handleContactLeave = () => {
    hideTimeoutRef.current = setTimeout(() => setContactVisible(false), 200);
  };

  return (
    <>
      <div className={styles.locationTab}>
        <div className={styles.locationText}>
          <span className={styles.locationLabel}>город</span>
          <span className={styles.locationCity}>Москва</span>
        </div>
        <div className={styles.locationGlobe}>
          <GlobeCanvas />
        </div>
      </div>

      <section id="hero" className={styles.hero}>
        <ShaderBackground />

        <div className={styles.marqueeOverlay}>
          <div className={`${styles.marqueeContent} ${styles[direction]}`}>
            <span>Всё ушло в дым</span>
            <span>Всё ушло в дым</span>
            <span>Всё ушло в дым</span>
            <span>Всё ушло в дым</span>
            <span>Всё ушло в дым</span>
            <span>Всё ушло в дым</span>
          </div>
        </div>

        <div className={styles.subtitleBlock}>
          <span className={styles.subtitleText}>Frontend developer</span>
          <span className={styles.subtitleName}>Родичев Денис</span>
          <svg
            className={styles.subtitleArrowSvg}
            width="20"
            height="20"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="42" y1="6" x2="10" y2="38" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" />
            <polyline points="26,38 10,38 10,22" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        <div className={styles.buttons}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Проекты
          </button>

          <div
            className={styles.contactBtnWrapper}
            onMouseEnter={handleContactEnter}
            onMouseLeave={handleContactLeave}
          >
            <button
              className={`${styles.btn} ${styles.btnOutline}`}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Контакты
            </button>
            <ContactPopup
              visible={contactVisible}
              onMouseEnter={handleContactEnter}
              onMouseLeave={handleContactLeave}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;