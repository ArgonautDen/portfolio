import { useRef, useCallback } from 'react';
import aboutImage from '/images/about.webp';
import styles from './About.module.css';
import useScrollReveal from '../hooks/useScrollReveal';
import BubbleSkills from './BubbleSkills';
import VerticalTicker from './VerticalTicker';
import WaveBackground from './WaveBackground';


const About = () => {
  const sectionRef     = useRef(null);
  const imageRef       = useRef(null);
  const textRef        = useRef(null);
  const bubblesWrapRef = useRef(null);

  useScrollReveal(sectionRef);

  /**
   * Возвращает барьеры в координатах canvas (bubblesWrap):
   * - rect  — AABB прямоугольник фото
   * - lineY — Y нижнего края текстового блока (горизонтальная линия-барьер)
   */
  const getBarriers = useCallback(() => {
    if (!bubblesWrapRef.current) return null;

    const wrapRect = bubblesWrapRef.current.getBoundingClientRect();
    const result   = { rect: null, lineY: null };

    if (imageRef.current) {
      const r = imageRef.current.getBoundingClientRect();
      result.rect = {
        x:      r.left   - wrapRect.left,
        y:      r.top    - wrapRect.top,
        width:  r.width,
        height: r.height,
      };
    }

    if (textRef.current) {
      const r = textRef.current.getBoundingClientRect();
      // Нижний край текста относительно canvas
      result.lineY = r.bottom - wrapRect.top;
    }

    return result;
  }, []);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <WaveBackground />
      {/* ── Вертикальный ticker ── */}
      <VerticalTicker />

      <div className="container">

        <h2 className={styles.title} data-reveal="up">
          Обо мне
        </h2>

        <div className={styles.content}>

          {/* ── Левая колонка: фото + круглое видео поверх ── */}
          <div
            className={styles.imageWrapper}
            data-reveal="left"
            data-reveal-delay="100"
            ref={imageRef}
          >
            <div className={styles.imagePlaceholder}>
              <img src={aboutImage} alt="Денис Родичев" />
            </div>

            <div className={styles.videoCircle}>
              <video
                className={styles.photoVideo}
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/ocean.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* ── Правая колонка: текст + пузыри ── */}
          <div
            className={styles.textWrapper}
            data-reveal="right"
            data-reveal-delay="200"
          >
            {/* Г5 — разделители без рамки */}
            <div className={styles.textCard}>
              <div className={styles.textCardHeader}>
                <span className={styles.textCardLabel}>Обо мне</span>
                <span className={styles.textCardIndex}>01 / 25</span>
              </div>
              <p className={styles.textBody} ref={textRef}>
                Привет! Я Денис, начинающий фронтенд‑разработчик.
                <br /><br />
                Сначала увлёкся 3D в Blender, но понял, что это слишком творческое занятие, а хочется что-то на стыке конркетики, входящих данных и творчества - в итоге нашел все это во фронтенде.
                Около полугода самостоятельно осваивал вёрстку и JavaScript по туториалам и видео, понял, что завлекло и нравится. Потом решил по-серьезнее - пройти годовые курсы. 
                Далее практики, всевозможные стажировочные задачи, сайты, лендинги для друзей и работа над онлайн игрой.
              </p>
              <div className={styles.textCardFooter}>
                React · CSS · JS · Git · Figma · Blender
              </div>
            </div>

            <div className={styles.bubblesBack} ref={bubblesWrapRef}>
              <BubbleSkills getBarriers={getBarriers} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;