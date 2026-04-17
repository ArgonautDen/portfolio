import ShaderBackground from './ShaderBackgroundClouds';
import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './Projects.module.css';

const projects = [
  {
    title: 'CSS Master',
    year: '2024',
    tags: ['CSS3', 'HTML5', 'Анимации'],
    link: 'https://github.com/твойлогин/css-project',
    // замени на реальное видео: video: '/videos/css-project.mp4'
    video: '/videos/Sedona.mp4',
    placeholder: '#1a1a2e',
  },
  {
    title: 'БЭМ-портал',
    year: '2024',
    tags: ['БЭМ', 'Адаптивность', 'Flexbox'],
    link: 'https://github.com/твойлогин/bem-project',
    video: '/videos/Energy.mp4',
    placeholder: '#1a0a2e',
  },
  {
    title: 'JS-вселенная',
    year: '2024',
    tags: ['JavaScript', 'API', 'LocalStorage'],
    link: 'https://github.com/твойлогин/js-project',
    video: '/videos/Kekstagram.mp4',
    placeholder: '#1a1500',
  },
  {
    title: 'Карточная онлайн игра 1vs1',
    year: '2026',
    tags: ['JavaScript', 'API', 'LocalStorage'],
    link: 'https://voidrealm-battles.vercel.app/',
    video: '/videos/voidrealm.mov',
    placeholder: '#1a1500',
  },
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

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
        {/* Плавающая картинка */}
        <motion.div
          className={styles.preview}
          style={{ x: springX, y: springY }}
          animate={{
            opacity: activeIndex !== null ? 1 : 0,
            scale: activeIndex !== null ? 1 : 0.88,
          }}
          transition={{ opacity: { duration: 0.25 }, scale: { duration: 0.3 } }}
        >
          {activeIndex !== null && (
            projects[activeIndex].video ? (
              <video
                key={activeIndex}
                src={projects[activeIndex].video}
                className={styles.previewMedia}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <div
                className={styles.previewPlaceholder}
                style={{ background: projects[activeIndex].placeholder }}
              >
                <span className={styles.previewLabel}>
                  {projects[activeIndex].title}
                </span>
              </div>
            )
          )}
        </motion.div>

        {/* Строки проектов */}
        <ul className={styles.list}>
          {projects.map((project, i) => (
            <motion.li
              key={i}
              className={styles.item}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
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
                {/* Номер */}
                <span className={styles.num}>0{i + 1}</span>

                {/* Название */}
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

                {/* Теги */}
                <span className={styles.tags}>
                  {project.tags.join(' · ')}
                </span>

                {/* Год + стрелка */}
                <span className={styles.meta}>
                  <span className={styles.year}>{project.year}</span>
                  <span className={styles.arrow}>↗</span>
                </span>
              </a>

              {/* Разделитель */}
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
