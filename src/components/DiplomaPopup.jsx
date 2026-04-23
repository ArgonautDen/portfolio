import styles from './DiplomaPopup.module.css';
import { useState } from 'react';

const diplomas = [
  { src: '/images/prof.webp', label: 'HTML / CSS' },
  { src: '/images/java.webp', label: 'JavaScript' },
  { src: '/images/adaptive.webp', label: 'Adaptive' },
];

const WORD = 'курсы.';

const DiplomaPopup = () => {
  const [zoomedIndex, setZoomedIndex] = useState(null);

  const prev = (e) => {
    e.stopPropagation();
    setZoomedIndex(i => (i - 1 + diplomas.length) % diplomas.length);
  };

  const next = (e) => {
    e.stopPropagation();
    setZoomedIndex(i => (i + 1) % diplomas.length);
  };

  return (
    <>
      <span className={styles.trigger}>
        {WORD.split('').map((ch, i) => (
          <span key={i} className={styles.letter} style={{ '--i': i }}>
            {ch}
          </span>
        ))}

        <div className={styles.popup}>
          <span className={styles.popupLabel}>Дипломы/Сертификаты</span>
          <div className={styles.grid}>
            {diplomas.map((d, i) => (
              <div key={i} className={styles.thumb} onClick={() => setZoomedIndex(i)}>
                <img src={d.src} alt={d.label} />
                <span className={styles.caption}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </span>

      {zoomedIndex !== null && (
        <div
          className={styles.overlay}
          onClick={(e) => { e.stopPropagation(); setZoomedIndex(null); }}
        >
          <button className={styles.closeBtn} onClick={(e) => { e.stopPropagation(); setZoomedIndex(null); }}>&#10005;</button>
          <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={prev}>&#8592;</button>

          <div className={styles.overlayContent} onClick={e => e.stopPropagation()}>
            <img src={diplomas[zoomedIndex].src} alt={diplomas[zoomedIndex].label} />
            <span className={styles.overlayCaption}>
              {diplomas[zoomedIndex].label}
              <span className={styles.overlayCounter}>{zoomedIndex + 1} / {diplomas.length}</span>
            </span>
          </div>

          <button className={`${styles.navBtn} ${styles.navNext}`} onClick={next}>&#8594;</button>
        </div>
      )}
    </>
  );
};

export default DiplomaPopup;