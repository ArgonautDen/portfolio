import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import styles from './Navigation.module.css';

const Navigation = () => {
  const [showCircle, setShowCircle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) {
        setShowCircle(true);
      } else {
        const shouldShow = window.scrollY > 63;
        setShowCircle(shouldShow);
        if (!shouldShow && isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, isMenuOpen]);

  const goToSection = (sectionId) => {
    setIsMenuOpen(false);

    if (isHome) {
      // Уже на главной — просто скроллим
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Со страницы проекта — переходим на главную и передаём секцию
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${isMobile ? styles.hidden : ''}`}>
        <div className={styles.headerContent}>
          <nav className={styles.desktopNav}>
            <button onClick={() => goToSection('hero')}>Главная</button>
            <button onClick={() => goToSection('about')}>Обо мне</button>
            <button onClick={() => goToSection('projects')}>Проекты</button>
            <button onClick={() => goToSection('contact')}>Контакты</button>
          </nav>
        </div>
      </header>

      {showCircle && (
        <div className={styles.circleWrapper}>
          <div
            className={styles.circleButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
          </div>
        </div>
      )}

      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu} />}

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <button onClick={() => goToSection('hero')}>Главная</button>
            <button onClick={() => goToSection('about')}>Обо мне</button>
            <button onClick={() => goToSection('projects')}>Проекты</button>
            <button onClick={() => goToSection('contact')}>Контакты</button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigation;