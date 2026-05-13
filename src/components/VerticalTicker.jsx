import { useEffect, useRef } from 'react';
import styles from './VerticalTicker.module.css';

const TICKER_TEXT = '◎ FRONTEND DEVELOPER ◈ REACT · CSS · JS ◉ TREE · GIT ◈ ВСЕ УШЛО В ДЫМ ◈  ';
const COPIES = 6;
const SPEED  = 0.4;

const VerticalTicker = () => {
  const wrapRef  = useRef(null);
  const innerRef = useRef(null);
  const posRef   = useRef(0);
  const rafRef   = useRef(null);

  useEffect(() => {
    const wrap  = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    requestAnimationFrame(() => requestAnimationFrame(() => {
      const oneWidth = inner.scrollWidth / COPIES;

      const loop = () => {
        posRef.current -= SPEED;
        if (posRef.current <= -oneWidth) {
          posRef.current += oneWidth;
        }
        wrap.style.setProperty('--pos', `${posRef.current}px`);
        rafRef.current = requestAnimationFrame(loop);
      };

      rafRef.current = requestAnimationFrame(loop);
    }));

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.inner} ref={innerRef}>
        {Array.from({ length: COPIES }, (_, i) => (
          <span key={i} className={styles.text}>{TICKER_TEXT}</span>
        ))}
      </div>
    </div>
  );
};

export default VerticalTicker;