import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './NeuroText.module.css';

const TEXT = 'В практике использую нейросети — для меня это такой же рабочий инструмент, как Figma или Git. Они помогают быстрее прототипировать, разбираться в незнакомых технологиях и проверять свои решения.';
const WORDS = ['нейросети', 'Claude', 'GPT', 'нейронка', 'LLM', 'промпт', 'ChatGPT', 'Cursor', 'агенты', 'токены', 'Copilot', 'контекст', 'Gemini', 'MCP'];
const GLYPHS = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯabcdefghijklmnopqrstuvwxyz0123456789<>/{}[]#_*+=';
const DURATION = 1400;
// ширина «зоны перебора» перед буквой, которая уже встала на место
const SCRAMBLE = 0.12;
// помехи в состоянии шума: как часто и сколько букв сбоит за тик
const GLITCH_INTERVAL = 90;
const GLITCH_CHARS = 3;

// Шум из целых слов примерно той же длины, что и абзац, — строки при морфинге почти не скачут
const buildNoise = (len) => {
  let s = '';
  for (let i = 0; ; i++) {
    const next = (s ? s + ' · ' : '') + WORDS[i % WORDS.length];
    if (next.length > len) return s;
    s = next;
  }
};

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

// шум с парой «сбитых» букв — на следующем тике они возвращаются на место
const glitch = (noise) => {
  const chars = noise.split('');
  const count = 1 + Math.floor(Math.random() * GLITCH_CHARS);
  for (let k = 0; k < count; k++) {
    const i = Math.floor(Math.random() * chars.length);
    if (chars[i] !== ' ' && chars[i] !== '·') chars[i] = randomGlyph();
  }
  return chars.join('');
};

const NeuroText = () => {
  const noise = useMemo(() => buildNoise(TEXT.length), []);
  // у каждой буквы свой момент «проявления»: слева направо с небольшим разбросом
  const thresholds = useMemo(
    () => Array.from({ length: noise.length }, (_, i) => (i / noise.length) * (1 - SCRAMBLE) + SCRAMBLE + Math.random() * 0.06),
    [noise],
  );

  const [display, setDisplay] = useState(noise);
  // idle — шум с помехами, moving — идёт морфинг, resolved — виден текст
  const [phase, setPhase] = useState('idle');
  const wrapRef = useRef(null);
  const progressRef = useRef(0);
  const rafRef = useRef(null);

  const render = (p) => {
    let out = '';
    for (let i = 0; i < noise.length; i++) {
      const t = thresholds[i];
      const target = TEXT[i] ?? '';
      if (p >= t) out += target;
      else if (p >= t - SCRAMBLE) out += target && target !== ' ' ? randomGlyph() : target;
      else out += noise[i];
    }
    return p >= 1 ? TEXT : out;
  };

  const animateTo = (goal) => {
    cancelAnimationFrame(rafRef.current);
    setPhase('moving');
    let last = performance.now();
    const step = (now) => {
      const delta = (now - last) / DURATION;
      last = now;
      const p = progressRef.current;
      const next = goal > p ? Math.min(goal, p + delta) : Math.max(goal, p - delta);
      progressRef.current = next;
      setDisplay(render(next));
      if (next === goal) setPhase(goal === 1 ? 'resolved' : 'idle');
      if (next !== goal) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progressRef.current = 1;
      setDisplay(TEXT);
      setPhase('resolved');
      return;
    }
    // на тач-устройствах наведения нет — проявляем один раз при появлении на экране
    if (!window.matchMedia('(hover: hover)').matches) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          animateTo(1);
          observer.disconnect();
        }
      }, { threshold: 0.6 });
      observer.observe(wrapRef.current);
      return () => observer.disconnect();
    }
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== 'idle') return;
    // помехи крутятся, только пока абзац виден на экране
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(wrapRef.current);
    const id = setInterval(() => {
      if (visible) setDisplay(glitch(noise));
    }, GLITCH_INTERVAL);
    return () => {
      clearInterval(id);
      observer.disconnect();
    };
  }, [phase, noise]);

  const hoverable = () => window.matchMedia('(hover: hover)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <span
      ref={wrapRef}
      className={`${styles.wrap} ${styles[phase]}`}
      onMouseEnter={() => hoverable() && animateTo(1)}
      onMouseLeave={() => hoverable() && animateTo(0)}
    >
      <span className={styles.srOnly}>{TEXT}</span>
      {/* невидимая копия держит высоту блока — от неё зависят пузырьки навыков */}
      <span className={styles.sizer} aria-hidden="true">{TEXT}</span>
      <span className={styles.live} aria-hidden="true">{display}</span>
    </span>
  );
};

export default NeuroText;
