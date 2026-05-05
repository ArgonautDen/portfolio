import ShaderBackground from './ShaderBackgroundClouds';
import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import styles from './Projects.module.css';
import { Link } from "react-router-dom";

const projects = [
  {
    title: 'Карточная онлайн игра 1vs1',
    year: '2026',
    description: 'Мультиплеерная карточная игра в реальном времени. Матчмейкинг, состояния сессий, анимации.',
    tags: ['JavaScript', 'API', 'LocalStorage'],
    link: 'https://voidrealm-battles.vercel.app/',
    video: '/videos/voidrealm.mp4',
    placeholder: '#1a1500',
    slug: 'voidrealm',
  },
  {
    title: 'Interactive Portfolio Website',
    year: '2026',
    description: 'Кастомный fragment shader с процедурным FBM-шумом, облаками и mouse-parallax эффектом, Оптимизация WebGL',
    tags: ['React', 'Three.js', 'WebGL / GLSL', 'Canvas API', 'Framer Motion', 'Vite'],
    link: 'https://portfolio-denisrdv.vercel.app',
    video: '/videos/potfolio.mp4',
    placeholder: '#1a1500',
    slug: 'portfolio',
  },
  {
    title: 'JavaScript. Разработка веб-интерфейсов',
    year: '2026',
    description: 'Кекстаграм — сервис просмотра изображений. Пользователям предоставлена возможность загружать свои фотографии или просматривать фотографии, загруженные ранее другими пользователями. Интерактивное приложение с внешним API и LocalStorage. Динамичный UI без фреймворков.',
    tags: ['JavaScript', 'API', 'LocalStorage'],
    link: 'https://argonautden.github.io/2564453-kekstagram-2/',
    video: '/videos/Kekstagram.mp4',
    placeholder: '#1a1500',
    slug: 'kekstagram',
  },
  {
    title: 'Адаптивная вёрстка и автоматизация',
    year: '2025',
    description: 'Адаптивность сетки: мобильная, планшетная и десктопная версии. Методология БЭМ, препроцессор: Sass. Адаптивность графики: ретинизация, векторные изображения',
    tags: ['БЭМ', 'Адаптивность', 'Flexbox'],
    link: 'https://htmlacademy-adaptive.github.io/2564453-cat-energy-2/',
    video: '/videos/Energy.mp4',
    placeholder: '#1a0a2e',
    slug: 'catenergy',
  },
  {
    title: 'HTML и CSS. Профессиональная вёрстка сайтов',
    year: '2025',
    description: 'Лендинг с нуля — только HTML и CSS3.',
    tags: ['CSS3', 'HTML5'],
    link: 'https://argonautden.github.io/2564453-sedona-2',
    video: '/videos/Sedona.mp4',
    placeholder: '#1a1a2e',
    slug: 'sedona',
  }
];
// ^^^ Замени ссылки на реальные когда будешь готов

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const videoRefs = useRef([]);

  const handleMouseEnter = useCallback((i) => {
    setActiveIndex(i);
    const video = videoRefs.current[i];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback((i) => {
    setActiveIndex(null);
    const video = videoRefs.current[i];
    if (video) {
      video.pause();
    }
  }, []);

  return (
    <section id="projects" className={styles.projects}>
      <ShaderBackground />

      <div className={styles.header}>
        <span className={styles.label}>Кейсы/</span>
        <h2 className={styles.title}>Проекты</h2>
      </div>

      <div className={styles.listWrap}>
        <ul className={styles.list}>
            {projects.map((project, i) => (
              <motion.li
                key={i}
                className={`${styles.item} ${activeIndex === i ? styles.itemActive : ''}`}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
            
                {/* Заменяем внешний <a> на внутренний <Link> если есть slug */}
                {project.slug ? (
                  <Link to={`/projects/${project.slug}`} className={styles.itemLink}>
                    <span className={styles.num}>0{i + 1}</span>
            
                    <span className={styles.name}>
                      {project.title.split(' ').map((word, wi) => (
                        <motion.span
                          key={wi}
                          className={styles.word}
                          transition={{ duration: 0.15, delay: wi * 0.03 }}
                        >
                          {word}
                          {wi < project.title.split(' ').length - 1 ? '\u00A0' : ''}
                        </motion.span>
                      ))}
                    </span>
            
                    <span className={styles.tags}>
                      {project.tags.join(' · ')}
                    </span>
            
                    <span className={styles.meta}>
                      <span className={styles.year}>{project.year}</span>
                      <span className={styles.arrow}>↗</span>
                    </span>
                  </Link>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.itemLink}
                  >
                    <span className={styles.num}>0{i + 1}</span>
            
                    <span className={styles.name}>
                      {project.title.split(' ').map((word, wi) => (
                        <motion.span
                          key={wi}
                          className={styles.word}
                          transition={{ duration: 0.15, delay: wi * 0.03 }}
                        >
                          {word}
                          {wi < project.title.split(' ').length - 1 ? '\u00A0' : ''}
                        </motion.span>
                      ))}
                    </span>
            
                    <span className={styles.tags}>
                      {project.tags.join(' · ')}
                    </span>
            
                    <span className={styles.meta}>
                      <span className={styles.year}>{project.year}</span>
                      <span className={styles.arrow}>↗</span>
                    </span>
                  </a>
                )}
            
                {/* Раскрывающаяся панель: описание слева + видео справа */}
                <div className={styles.desc}>
                  <div className={styles.descInner}>
                    <div className={styles.descLeft}>
                      <p className={styles.descText}>{project.description}</p>
            
                      {/* Кнопку "Подробнее" заменяем на ссылку если есть slug */}
                      {project.slug ? (
                        <Link to={`/projects/${project.slug}`} className={styles.moreBtn}>
                          <span>Подробнее</span>
                          <span className={styles.moreBtnArrow}>→</span>
                        </Link>
                      ) : (
                        <button className={styles.moreBtn} disabled>
                          <span>Подробнее</span>
                          <span className={styles.moreBtnArrow}>→</span>
                        </button>
                      )}
                    </div>
            
                    {/* Видео или превью справа */}
                    <div className={styles.descRight}>
                      {project.video ? (
                        <video
                          ref={el => void (videoRefs.current[i] = el)}
                          src={project.video}
                          className={styles.inlineVideo}
                          muted
                          loop
                          playsInline
                          preload="auto"
                        />
                      ) : (
                        <div
                          className={styles.inlinePlaceholder}
                          style={{ background: project.placeholder }}
                        >
                          <span className={styles.previewLabel}>{project.title}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
            
                {/* линия заполнения и тд... */}
                <div className={styles.line}>
                  <motion.div
                    className={styles.lineFill}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;