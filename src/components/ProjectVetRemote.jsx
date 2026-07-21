import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import "./ProjectVetRemote.css";

const highlights = [
  {
    id: "01",
    title: "Дизайн-система на CSS-переменных",
    text: "Все цвета Tailwind резолвятся через rgb(var(--color-…) / <alpha-value>) — палитра, радиусы, тени и градиенты хранятся в одном месте, а не размазаны по классам.",
    mediaLabel: "Design tokens",
    media: "/images/01-designsystem.webp",
  },
  {
    id: "02",
    title: "6 кастомных UI-мокапов",
    text: "Booking, Calendar, CalendarDay, PetCard, Survey, Templates — интерфейс продукта нарисован прямо в браузере на React и CSS, а не вставлен скриншотами.",
    mediaLabel: "Product mockups",
    media: "/images/02-vetremote-mocup.webp",
  },
  {
    id: "03",
    title: "Hero: скриншот → видео по паузе",
    text: "Дашборд показывается статичным скриншотом, а через 900 мс после появления секции плавно подменяется зацикленным demo-видео; по клику открывается полноэкранная видео-модалка.",
    mediaLabel: "Hero preview",
    media: "/images/03-video-picture.webp",
  },
  {
    id: "04",
    title: "Direction-aware Reveal-анимации",
    text: "Общий компонент Reveal управляет входом каждой секции: направление, задержка и стаггер между карточками — на Motion, с уважением к prefers-reduced-motion.",
    mediaLabel: "Scroll reveal",
    video: "/videos/04-directionaware.mp4",
  },
  {
    id: "05",
    title: "Данные отделены от компонентов",
    text: "pricing.ts, faq.ts, problems.ts, stats.ts, navigation.ts — весь контент лендинга типизирован и живёт отдельно от JSX, компоненты только рендерят.",
    mediaLabel: "Typed data layer",
    media: "/images/05-data.webp",
  },
  {
    id: "06",
    title: "Юридическая часть по-взрослому",
    text: "Cookie-banner с настройками согласия, модалка с политикой конфиденциальности и офертой, форма контактов с валидацией — то, что обычно упускают в пет-проектах.",
    mediaLabel: "Legal & consent",
    media: "/images/06-adult.webp",
  },
];

export default function ProjectVetRemote() {
  const [heroVideoError, setHeroVideoError] = useState(false);
  const rootRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/projects/vetremote") return;
    rootRef.current?.querySelectorAll("video").forEach((v) => {
      v.play().catch(() => {});
    });
  }, [location.pathname]);

  return (
    <article className="pvt" ref={rootRef}>
      {/* ── BACK ── */}
      <Link to="/" state={{ scrollTo: "projects" }} className="pvt__back">
        <span className="pvt__back-arrow"><FiArrowLeft /></span> Назад к проектам
      </Link>

      {/* ── HERO ── */}
      <header className="pvt__hero">
        <div className="pvt__hero-inner">
          <div className="pvt__hero-left">
            <div className="pvt__hero-eyebrow">
              <span className="pvt__tag">React · TypeScript · Tailwind · shadcn/ui · Motion</span>
              <span className="pvt__year">2026</span>
            </div>
            <h1 className="pvt__hero-title">
              <span className="pvt__title-line1">Vet</span>
              <span className="pvt__title-line2">Remote</span>
            </h1>
            <p className="pvt__hero-sub">
              Первая в России CRM для ветеринарных врачей — картотека, календарь, онлайн-запись
              и анкеты в одном интерфейсе, без бумажных журналов и звонков
            </p>
            <a
              href="https://vetremote.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="pvt__cta"
            >
              Открыть сайт <span className="pvt__cta-arrow"><FiArrowUpRight /></span>
            </a>
          </div>
          <div className="pvt__hero-right">
            <div className="pvt__video-wrap">
              {!heroVideoError ? (
                <video
                  src="/videos/video-remote.mp4"
                  className="pvt__video"
                  preload="auto"
                  muted
                  autoPlay
                  loop
                  playsInline
                  onError={() => setHeroVideoError(true)}
                />
              ) : (
                <div className="pvt__video-ph">
                  <span>▶ Обзор VetRemote</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── STAT BAR ── */}
      <div className="pvt__stats">
        <div className="pvt__stat">
          <span className="pvt__stat-num">7</span>
          <span className="pvt__stat-label">секций<br />лендинга</span>
        </div>
        <div className="pvt__stat-divider" />
        <div className="pvt__stat">
          <span className="pvt__stat-num">6</span>
          <span className="pvt__stat-label">кастомных<br />мокапов</span>
        </div>
        <div className="pvt__stat-divider" />
        <div className="pvt__stat">
          <span className="pvt__stat-num">100%</span>
          <span className="pvt__stat-label">строгий<br />TypeScript</span>
        </div>
        <div className="pvt__stat-divider" />
        <div className="pvt__stat">
          <span className="pvt__stat-num">2</span>
          <span className="pvt__stat-label">маршрута<br />в приложении</span>
        </div>
      </div>

      {/* ── INTRO ── */}
      <section className="pvt__intro">
        <div className="pvt__intro-grid">
          <div className="pvt__intro-text">
            <p>
              VetRemote — коммерческий лендинг для CRM ветеринарных врачей, который я спроектировал
              и собрал с нуля: от дизайн-системы на CSS-переменных до анимаций появления секций
              и адаптива под все брейкпоинты.
            </p>
            <p>
              Задача была не «сверстать макет», а самому продумать структуру продающей страницы:
              с чего начать (Hero), какую боль показать (Problem), как перечислить возможности,
              не утомив читателя (Features), и куда вести — к бесплатному пробному периоду
              (Pricing → CTA).
            </p>
          </div>
          <div className="pvt__intro-aside">
            <div className="pvt__aside-block">
              <span className="pvt__aside-label">Домен</span>
              <span className="pvt__aside-val">vetremote.ru</span>
            </div>
            <div className="pvt__aside-block">
              <span className="pvt__aside-label">Сборка</span>
              <span className="pvt__aside-val">Vite</span>
            </div>
            <div className="pvt__aside-block">
              <span className="pvt__aside-label">Стили</span>
              <span className="pvt__aside-val">Tailwind + CSS vars</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="pvt__highlights">
        <h2 className="pvt__section-title">Технические детали</h2>
        <div className="pvt__hl-grid">
          {highlights.map((item) => (
            <div key={item.id} className="pvt__hl-item">
              <div className="pvt__hl-media">
                {item.video ? (
                  <video
                    className="pvt__hl-video"
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : item.media ? (
                  <img src={item.media} alt={item.title} className="pvt__hl-img" />
                ) : (
                  <div className="pvt__hl-ph">
                    <span>{item.mediaLabel}</span>
                  </div>
                )}
              </div>
              <div className="pvt__hl-body">
                <span className="pvt__hl-num">{item.id}</span>
                <strong className="pvt__hl-title">{item.title}</strong>
                <p className="pvt__hl-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STACK ── */}
      <section className="pvt__stack">
        <h2 className="pvt__section-title">Стек</h2>
        <div className="pvt__pills">
          {["React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Motion", "React Router", "lucide-react"].map((t) => (
            <span key={t} className="pvt__pill">{t}</span>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pvt__footer">
        <a
          href="https://vetremote.ru"
          target="_blank"
          rel="noopener noreferrer"
          className="pvt__cta pvt__cta--large"
        >
          Посмотреть живой сайт <span className="pvt__cta-arrow"><FiArrowUpRight /></span>
        </a>
        <Link to="/" state={{ scrollTo: "projects" }} className="pvt__back pvt__back--footer">
          <span className="pvt__back-arrow"><FiArrowLeft /></span> Все проекты
        </Link>
      </footer>
    </article>
  );
}
