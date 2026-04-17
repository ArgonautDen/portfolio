import styles from './CrystalWatermark.module.css';

// ── Те же данные кристаллов что в оригинальном Contact.jsx ───────────────────
const WAVE_CRYSTALS = [
  { cx: 10,  ht:  5, hb:  3, w: 0.8, delay: 1.56 },
  { cx: 16,  ht:  8, hb:  4, w: 1.0, delay: 1.50 },
  { cx: 22,  ht:  5, hb:  3, w: 0.8, delay: 1.44 },
  { cx: 32,  ht: 14, hb:  8, w: 1.4, delay: 1.38 },
  { cx: 39,  ht:  7, hb:  4, w: 1.0, delay: 1.33 },
  { cx: 45,  ht: 24, hb: 12, w: 1.8, delay: 1.28 },
  { cx: 52,  ht:  6, hb:  4, w: 0.9, delay: 1.23 },
  { cx: 58,  ht: 10, hb:  6, w: 1.2, delay: 1.18 },
  { cx: 70,  ht: 18, hb: 10, w: 1.6, delay: 1.12 },
  { cx: 77,  ht:  8, hb:  5, w: 1.0, delay: 1.07 },
  { cx: 83,  ht: 30, hb: 16, w: 2.2, delay: 1.02 },
  { cx: 90,  ht:  7, hb:  4, w: 1.0, delay: 0.97 },
  { cx: 96,  ht: 14, hb:  8, w: 1.4, delay: 0.92 },
  { cx: 103, ht:  5, hb:  3, w: 0.8, delay: 0.87 },
  { cx: 114, ht:  9, hb:  5, w: 1.1, delay: 0.82 },
  { cx: 121, ht: 42, hb: 20, w: 2.8, delay: 0.77 },
  { cx: 129, ht:  8, hb:  5, w: 1.0, delay: 0.72 },
  { cx: 135, ht: 20, hb: 11, w: 1.7, delay: 0.67 },
  { cx: 142, ht:  6, hb:  4, w: 0.9, delay: 0.62 },
  { cx: 148, ht: 12, hb:  7, w: 1.3, delay: 0.57 },
  { cx: 160, ht: 11, hb:  6, w: 1.2, delay: 0.52 },
  { cx: 167, ht: 82, hb: 40, w: 5.0, delay: 0.47 },
  { cx: 176, ht:  8, hb:  5, w: 1.0, delay: 0.43 },
  { cx: 183, ht: 32, hb: 16, w: 2.4, delay: 0.39 },
  { cx: 191, ht:  7, hb:  4, w: 1.0, delay: 0.35 },
  { cx: 197, ht: 16, hb:  9, w: 1.5, delay: 0.31 },
  { cx: 208, ht:  9, hb:  5, w: 1.1, delay: 0.27 },
  { cx: 215, ht: 22, hb: 12, w: 1.8, delay: 0.23 },
  { cx: 222, ht:  6, hb:  4, w: 0.9, delay: 0.19 },
  { cx: 232, ht:  7, hb:  4, w: 1.0, delay: 0.14 },
  { cx: 239, ht: 24, hb: 12, w: 1.8, delay: 0.10 },
  { cx: 247, ht:  8, hb:  5, w: 1.0, delay: 0.07 },
  { cx: 257, ht: 58, hb: 28, w: 3.5, delay: 0.04 },
  { cx: 268, ht: 18, hb: 10, w: 1.6, delay: 0.00 },
];

// Та же функция генерации пути что в оригинале
const crystalPath = (cx, cy, ht, hb, w) =>
  `M ${cx - w} ${cy} C ${cx} ${cy} ${cx} ${cy - ht * 0.12} ${cx} ${cy - ht} ` +
  `C ${cx} ${cy - ht * 0.12} ${cx + w} ${cy} ${cx + w} ${cy} ` +
  `C ${cx} ${cy} ${cx} ${cy + hb * 0.12} ${cx} ${cy + hb} ` +
  `C ${cx} ${cy + hb * 0.12} ${cx - w} ${cy} ${cx - w} ${cy} Z`;

// Без useEffect/RAF — анимация полностью через CSS как в оригинале (crystalPulse)
const CrystalWatermark = () => (
  <div className={styles.watermark} aria-hidden="true">
    <svg
      className={styles.svg}
      viewBox="0 -12 280 24"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* базовая линия — точь-в-точь как .waveLine */}
      <line
        x1="0" y1="0" x2="280" y2="0"
        className={styles.waveLine}
      />

      {/* кристаллы — те же классы и delays что в оригинале */}
      {WAVE_CRYSTALS.map(({ cx, ht, hb, w, delay }, i) => (
        <path
          key={i}
          className={styles.waveCrystal}
          d={crystalPath(cx, 0, ht, hb, w)}
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {/* центральная точка-герой */}
      <circle
        className={styles.waveDot}
        cx="167" cy="0" r="2.2"
        style={{ animationDelay: '0.47s' }}
      />
    </svg>
  </div>
);

export default CrystalWatermark;