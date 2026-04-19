import ShaderBackground from './ShaderBackgroundClouds';
import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './Projects.module.css';

const projects = [
  {
    title: 'CSS Master',
    year: '2024',
    description: 'Анимированный лендинг с нуля — только HTML и CSS3. Кастомные анимации, адаптивная верстка.',
    tags: ['CSS3', 'HTML5', 'Анимации'],
    link: 'https://github.com/твойлогин/css-project',
    video: '/videos/Sedona.mp4',
    placeholder: '#1a1a2e',
  },
  {
    title: 'БЭМ-портал',
    year: '2024',
    description: 'Корпоративный портал по БЭМ-методологии. Flexbox-сетка, строгая структура классов.',
    tags: ['БЭМ', 'Адаптивность', 'Flexbox'],
    link: 'https://github.com/твойлогин/bem-project',
    video: '/videos/Energy.mp4',
    placeholder: '#1a0a2e',
  },
  {
    title: 'JS-вселенная',
    year: '2024',
    description: 'Интерактивное приложение с внешним API и LocalStorage. Динамичный UI без фреймворков.',
    tags: ['JavaScript', 'API', 'LocalStorage'],
    link: 'https://github.com/твойлогин/js-project',
    video: '/videos/Kekstagram.mp4',
    placeholder: '#1a1500',
  },
  {
    title: 'Карточная онлайн игра 1vs1',
    year: '2026',
    description: 'Мультиплеерная карточная игра в реальном времени. Матчмейкинг, состояния сессий, анимации.',
    tags: ['JavaScript', 'API', 'LocalStorage'],
    link: 'https://voidrealm-battles.vercel.app/',
    video: '/videos/voidrealm.mov',
    placeholder: '#1a1500',
  },
];
// ^^^ Замени ссылки на реальные когда будешь готов

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);
  // Храним refs на все video-элементы чтобы управлять play/pause
  const videoRefs = useRef([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback((i) => {
    setActiveIndex(i);
    // Запускаем видео сразу — оно уже загружено в DOM
    const video = videoRefs.current[i];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {}); // catch на случай autoplay policy
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

      {/* Заголовок секции */}
      <div className={styles.header}>
        <span className={styles.label}>Избранное</span>
        <h2 className={styles.title}>Проекты</h2>
      </div>

      {/* Список + плавающее превью */}
      <div
        ref={containerRef}
        className={styles.listWrap}
        onMouseMove={handleMouseMove}
      >
        {/* Плавающий контейнер — один на все проекты, без пересоздания video */}
        <motion.div
          className={styles.preview}
          style={{ x: springX, y: springY }}
          animate={{
            opacity: activeIndex !== null ? 1 : 0,
            scale: activeIndex !== null ? 1 : 0.88,
          }}
          transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.25 } }}
        >
          {projects.map((project, i) => (
            project.video ? (
              <video
                key={i}
                src={project.video}
                className={styles.previewMedia}
                style={{ display: activeIndex === i ? 'block' : 'none' }}
                ref={el => void (videoRefs.current[i] = el)}
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
              <div
                key={i}
                className={styles.previewPlaceholder}
                style={{
                  background: project.placeholder,
                  display: activeIndex === i ? 'flex' : 'none',
                }}
              >
                <span className={styles.previewLabel}>{project.title}</span>
              </div>
            )
          ))}
        </motion.div>

        {/* Строки проектов */}
        <ul className={styles.list}>
          {projects.map((project, i) => (
            <motion.li
              key={i}
              className={styles.item}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.itemLink}
              >
                <span className={styles.num}>0{i + 1}</span>

                <span className={styles.name}>
                  {project.title.split('').map((char, ci) => (
                    <motion.span
                      key={ci}
                      className={styles.char}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.15, delay: ci * 0.02 }}
                    >
                      {char === ' ' ? '\u00A0' : char}
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
              {project.description && (
                <div className={styles.desc}>
                  <p className={styles.descText}>{project.description}</p>
                </div>
              )}
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