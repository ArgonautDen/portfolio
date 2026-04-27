import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectPortfolio.css";

const highlights = [
  {
    id: "01",
    title: "Fragment Shader с процедурными облаками",
    text: "GLSL на Three.js: FBM-шум в 6 октав, domain-warping через двойной fbm(), fake light scattering — всё в одном фрагментном шейдере. 30 fps cap + IntersectionObserver: рендер только когда секция видна.",
    mediaLabel: "Shader clouds",
    media: null,
    video: "/videos/smoke.mp4", // ← "/videos/hl-shader.mp4"
  },
  {
    id: "02",
    title: "Mouse-parallax на уровне GPU",
    text: "Позиция мыши передаётся в uniform uMouse и uMouseActive. Облака «притягиваются» к курсору, направление fake-света следует за мышью. Плавное появление / исчезновение через lerp на JS-стороне.",
    mediaLabel: "Mouse parallax",
    media: null,
    video: null,
  },
  {
    id: "03",
    title: "Wave Background на Canvas 2D",
    text: "50 кривых Catmull-Rom, анимированных синусами с разными фазами и скоростями. Gradient stroke с затуханием к краям. На мобильных отключается полностью — нулевые накладные расходы.",
    mediaLabel: "Canvas waves",
    media: null,
    video: null,
  },
  {
    id: "04",
    title: "3D TiltCard с glare-эффектом",
    text: "Карточки контактов реагируют на движение мыши через perspective(700px) rotateX/Y. Кастомный RAF-луп с lerp(0.1) — никакого дёргания. Glare — CSS-переменные --glare-x / --glare-y, обновляемые из JS.",
    mediaLabel: "Tilt card",
    media: null,
    video: "/videos/icon-anim.mp4",
  },
  {
    id: "05",
    title: "LoadingScreen с дугой",
    text: "Семь приветствий на разных языках — от «Привет» до «Amour». Шторка уезжает вверх с кубической кривой Безье, отдельный arc-элемент закрывает скруглённый нижний край. Всё на CSS transitions без библиотек.",
    mediaLabel: "Loading screen",
    media: null,
    video: "/videos/amour.mp4",
  },
  {
    id: "06",
    title: "ShaderBackgroundClouds без мерцания",
    text: "Хитрость: canvas растёт вместе с секцией, но никогда не уменьшается — overflow:hidden на родителе обрезает лишнее. Никакого пересоздания рендерера при hover. ResizeObserver с debounce 80ms и округлением до 64px.",
    mediaLabel: "No-flicker resize",
    media: null,
    video: null,
  },
  {
    id: "07",
    title: "BubbleSkills с физикой барьеров",
    text: "Пузыри со скиллами летают и отталкиваются от фотографии и текстового блока — координаты барьеров высчитываются через getBoundingClientRect() относительно canvas-контейнера.",
    mediaLabel: "Bubble physics",
    media: null,
    video: "/videos/buble.mp4",
  },
  {
    id: "08",
    title: "Scroll Reveal & Floating Video Preview",
    text: "Кастомный хук useScrollReveal на IntersectionObserver: data-reveal='up/left/right' + data-reveal-delay. Превью проектов — floating видео с Framer Motion spring-анимацией, появляется рядом с курсором.",
    mediaLabel: "Scroll reveal + video",
    media: null,
    video: null,
  },
];

export default function ProjectPortfolio() {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  return (
    <article className="ppt">
      {/* ── BACK ── */}
      <Link to="/" state={{ scrollTo: "projects" }} className="ppt__back">
        <span className="ppt__back-arrow">←</span> Назад к проектам
      </Link>

      {/* ── HERO + VIDEO ── */}
      <header className="ppt__hero">
        <div className="ppt__hero-inner">
          <div className="ppt__hero-left">
            <div className="ppt__hero-eyebrow">
              <span className="ppt__tag">React · Three.js · WebGL / GLSL · Canvas API · Framer Motion · Vite</span>
              <span className="ppt__year">2026</span>
            </div>
            <h1 className="ppt__hero-title">
              <span className="ppt__title-line1">Interactive</span>
              <span className="ppt__title-line2">Portfolio</span>
            </h1>
            <p className="ppt__hero-sub">
              Сайт-визитка с кастомными WebGL-шейдерами, физикой на Canvas и 3D-эффектами —
              написанный как отдельный творческий проект
            </p>
            <a
              href="https://portfolio-denisrdv.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="ppt__cta"
            >
              Открыть сайт <span className="ppt__cta-arrow">↗</span>
            </a>
          </div>
          <div className="ppt__hero-right">
            <div className="ppt__video-wrap">
              {!videoError ? (
                <video
                  ref={videoRef}
                  src="/videos/potfolio.mp4"
                  className="ppt__video"
                  controls
                  muted
                  autoPlay
                  playsInline
                  onError={() => setVideoError(true)}
                />
              ) : (
                <div className="ppt__video-ph">
                  <span>▶ Обзор портфолио</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── STAT BAR ── */}
      <div className="ppt__stats">
        <div className="ppt__stat">
          <span className="ppt__stat-num">3</span>
          <span className="ppt__stat-label">кастомных<br />шейдера</span>
        </div>
        <div className="ppt__stat-divider" />
        <div className="ppt__stat">
          <span className="ppt__stat-num">50</span>
          <span className="ppt__stat-label">кривых<br />Catmull-Rom</span>
        </div>
        <div className="ppt__stat-divider" />
        <div className="ppt__stat">
          <span className="ppt__stat-num">6</span>
          <span className="ppt__stat-label">октав<br />FBM-шума</span>
        </div>
        <div className="ppt__stat-divider" />
        <div className="ppt__stat">
          <span className="ppt__stat-num">0</span>
          <span className="ppt__stat-label">готовых<br />эффект-либ</span>
        </div>
      </div>

      {/* ── INTRO ── */}
      <section className="ppt__intro">
        <div className="ppt__intro-grid">
          <div className="ppt__intro-text">
            <p>
              Портфолио — это не просто список проектов. Это возможность показать то, что нельзя объяснить в резюме: как ты думаешь о деталях, как относишься к производительности и визуальному языку.
            </p>
            <p>
              Каждый эффект здесь написан с нуля: шейдеры на GLSL, анимации на Canvas, физика пузырей, 3D-карточки. Никаких готовых пакетов для визуальных эффектов — только низкоуровневые API браузера.
            </p>
          </div>
          <div className="ppt__intro-aside">
            <div className="ppt__aside-block">
              <span className="ppt__aside-label">Деплой</span>
              <span className="ppt__aside-val">Vercel</span>
            </div>
            <div className="ppt__aside-block">
              <span className="ppt__aside-label">Сборка</span>
              <span className="ppt__aside-val">Vite</span>
            </div>
            <div className="ppt__aside-block">
              <span className="ppt__aside-label">Рендер фонов</span>
              <span className="ppt__aside-val">30 fps cap</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="ppt__highlights">
        <h2 className="ppt__section-title">Технические детали</h2>
        <div className="ppt__hl-grid">
          {highlights.map((item) => (
            <div key={item.id} className="ppt__hl-item">
              <div className="ppt__hl-media">
                {item.video ? (
                  <video
                    className="ppt__hl-video"
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : item.media ? (
                  <img src={item.media} alt={item.title} className="ppt__hl-img" />
                ) : (
                  <div className="ppt__hl-ph">
                    <span>{item.mediaLabel}</span>
                  </div>
                )}
              </div>
              <div className="ppt__hl-body">
                <span className="ppt__hl-num">{item.id}</span>
                <strong className="ppt__hl-title">{item.title}</strong>
                <p className="ppt__hl-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STACK ── */}
      <section className="ppt__stack">
        <h2 className="ppt__section-title">Стек</h2>
        <div className="ppt__pills">
          {[
            "React 18",
            "Vite",
            "Three.js",
            "WebGL / GLSL",
            "Canvas 2D API",
            "Framer Motion",
            "CSS Modules",
            "IntersectionObserver",
            "ResizeObserver",
            "RAF + lerp",
            "Vercel",
          ].map((t) => (
            <span key={t} className="ppt__pill">{t}</span>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ppt__footer">
        <a
          href="https://portfolio-denisrdv.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="ppt__cta ppt__cta--large"
        >
          Открыть сайт <span className="ppt__cta-arrow">↗</span>
        </a>
        <Link to="/" state={{ scrollTo: "projects" }} className="ppt__back ppt__back--footer">
          ← Все проекты
        </Link>
      </footer>
    </article>
  );
}