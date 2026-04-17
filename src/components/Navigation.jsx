import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import styles from './Navigation.module.css';

const Navigation = () => {
  const [showCircle, setShowCircle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Отслеживаем скролл
  useEffect(() => {
    const handleScroll = () => {
      // На мобильных кружок виден всегда
      if (isMobile) {
        setShowCircle(true);
      } else {
        // На десктопе появляется после 63px
        const shouldShow = window.scrollY > 63;
        setShowCircle(shouldShow);
        
        // Если кружок должен исчезнуть, закрываем меню
        if (!shouldShow && isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    };

    handleScroll(); // Проверяем при монтировании
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, isMenuOpen]); // Добавили isMenuOpen в зависимости

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Закрываем меню при клике на оверлей
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Обычный хедер - только на десктопе */}
      <header className={`${styles.header} ${isMobile ? styles.hidden : ''}`}>
        <div className={styles.headerContent}>
          <nav className={styles.desktopNav}>
            <button onClick={() => scrollToSection('hero')}>Главная</button>
            <button onClick={() => scrollToSection('about')}>Обо мне</button>
            <button onClick={() => scrollToSection('projects')}>Проекты</button>
            <button onClick={() => scrollToSection('contact')}>Контакты</button>
          </nav>
        </div>
      </header>

      {/* Кружок-бургер - показываем по условию */}
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

      {/* Оверлей - затемненный фон */}
      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu} />}

      {/* Выпадающее меню от кружка */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <button onClick={() => scrollToSection('hero')}>Главная</button>
            <button onClick={() => scrollToSection('about')}>Обо мне</button>
            <button onClick={() => scrollToSection('projects')}>Проекты</button>
            <button onClick={() => scrollToSection('contact')}>Контакты</button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigation;