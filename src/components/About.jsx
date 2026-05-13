import { useRef, useCallback } from 'react';
import aboutImage from '/images/about.webp';
import styles from './About.module.css';
import useScrollReveal from '../hooks/useScrollReveal';
import BubbleSkills from './BubbleSkills';
import VerticalTicker from './VerticalTicker';
import ShaderCircle from './ShaderCircle';
import DiplomaPopup from './DiplomaPopup';

const About = () => {
  const sectionRef     = useRef(null);
  const imageRef       = useRef(null);
  const textRef        = useRef(null);
  const bubblesWrapRef = useRef(null);

  useScrollReveal(sectionRef);

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
      {/* ── Вертикальный ticker ── */}
      <VerticalTicker />

      <div className="container">

        <h2 className={styles.title} data-reveal="up">
          
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
              <ShaderCircle />
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
                <span className={styles.textCardIndex}>#1C1D2073</span>
              </div>
              <p className={styles.textBody} ref={textRef}>
                Привет! Я Денис, начинающий фронтенд‑разработчик.
                Сначала я увлёкся 3D в Blender, но довольно быстро понял, что мне не хватает опоры на конкретику и логику. Хотелось заниматься чем-то на стыке входящих данных, структуры и творчества — в итоге я нашёл это во фронтенде.

Около полугода самостоятельно изучал вёрстку и JavaScript по туториалам, видео и практическим материалам. В какой-то момент понял, что меня действительно затянуло и что это именно то направление, в котором хочется развиваться всерьёз. 
<br/><br/>После этого решил подойти к обучению глубже и пройти годовые <DiplomaPopup /><br />

Дальше была практика: стажировочные задачи, сайты и лендинги для друзей, а также работа над онлайн-игрой. Именно через реальные задачи я начал лучше понимать, как соединяются дизайн, логика и пользовательский опыт.</p>
              <div className={styles.textCardFooter}>
                React · CSS · JS · Git · Figma · Three
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