import { useEffect } from 'react';

/**
 * useScrollReveal
 *
 * Принимает React ref (useRef) и вешает IntersectionObserver
 * на все [data-reveal] элементы внутри него.
 *
 * Атрибуты:
 *   data-reveal="up|down|left|right"   — направление въезда
 *   data-reveal-delay="200"            — задержка в мс (опционально)
 *
 * Стили для переходов подключи один раз глобально из scrollReveal.css.
 *
 * @param {React.RefObject} containerRef
 */
const useScrollReveal = (containerRef) => {
  useEffect(() => {
    // Читаем .current внутри useEffect — к этому моменту DOM уже смонтирован
    const root = containerRef?.current ?? document;

    const elements = root.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el    = entry.target;
          const delay = parseInt(el.dataset.revealDelay ?? '0', 10);

          const apply = () => el.classList.add('is-visible');

          if (delay > 0) {
            setTimeout(apply, delay);
          } else {
            apply();
          }

          // Анимируем один раз — отписываемся
          observer.unobserve(el);
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  // containerRef — стабильный объект, зависимость корректна
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useScrollReveal;
