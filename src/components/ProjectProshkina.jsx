import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import "./ProjectProshkina.css";

const highlights = [
  {
    id: "01",
    title: "Дизайн-система на Tailwind v4 @theme",
    text: "Палитры indigo, pumpkin и ink (50→950) заданы RGB-триплетами в CSS-переменных и зарегистрированы в @theme. Первая буква заголовков подсвечивается акцентом через ::first-letter, а у shimmer-кнопок случайный animation-delay, чтобы блики не мигали синхронно.",
    media: "/images/proshkina-01-hero.webp",
  },
  {
    id: "02",
    title: "Чек-лист перед записью",
    text: "Кнопка записи сначала открывает модалку с подготовкой к консультации и только потом ведёт в календарь онлайн-записи моей CRM VetRemote. Modal написан с нуля: createPortal, закрытие по Esc, блокировка скролла body с восстановлением прежнего значения, role=\"dialog\" и aria-modal.",
    media: "/images/proshkina-02-modal.webp",
  },
  {
    id: "03",
    title: "Аккордеон без замера высоты",
    text: "Раскрытие анимируется переходом grid-template-rows 0fr → 1fr — без JS-вычисления height и без скачков. Контент — типизированные массивы, иконки передаются уже отрендеренным JSX, потому что компонент нельзя передать пропсом через границу server → client.",
    media: "/images/proshkina-03-accordion.webp",
  },
  {
    id: "04",
    title: "Шрифт с «пустой» латиницей",
    text: "В MF EVOLT латинские глифы есть в таблице символов, но нарисованы пустыми, поэтому браузер не переключался на запасной шрифт и EVC, NVC и email пропадали. Ограничил шрифт через unicode-range кириллицей и общими символами — латиница корректно уходит в fallback.",
    media: "/images/proshkina-04-lecturing.webp",
  },
  {
    id: "05",
    title: "SEO и статический экспорт",
    text: "Next.js с output: \"export\" — чистая статика без Node-сервера. Metadata API: canonical, OpenGraph и Twitter-карточки на каждой странице, JSON-LD Person по schema.org, sitemap.xml и robots.txt генерируются при сборке, служебная /booking закрыта от индексации. Сайт подтверждён в Google Search Console и Яндекс.Вебмастере.",
    media: "/images/proshkina-05-qual.webp",
  },
  {
    id: "06",
    title: "Адаптив и доступность",
    text: "Своя сетка брейкпоинтов от 480 до 1440 px, отдельные кадрирования фото под мобильные. IntersectionObserver подсвечивает в меню текущую секцию, анимации отключаются при prefers-reduced-motion, декоративные иконки скрыты от скринридеров через aria-hidden.",
    media: "/images/proshkina-06-mobile.webp",
  },
];

export default function ProjectProshkina() {
  const [heroVideoError, setHeroVideoError] = useState(false);
  const rootRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/projects/proshkina") return;
    rootRef.current?.querySelectorAll("video").forEach((v) => {
      v.play().catch(() => {});
    });
  }, [location.pathname]);

  return (
    <article className="ppk" ref={rootRef}>
      {/* ── BACK ── */}
      <Link to="/" state={{ scrollTo: "projects" }} className="ppk__back">
        <span className="ppk__back-arrow"><FiArrowLeft /></span> Назад к проектам
      </Link>

      {/* ── HERO ── */}
      <header className="ppk__hero">
        <div className="ppk__hero-inner">
          <div className="ppk__hero-left">
            <div className="ppk__hero-eyebrow">
              <span className="ppk__tag">Next.js · TypeScript · Tailwind v4 · Motion</span>
              <span className="ppk__year">2026</span>
            </div>
            <h1 className="ppk__hero-title">
              <span className="ppk__title-line1">Proshkina</span>
              <span className="ppk__title-line2">Vet</span>
            </h1>
            <p className="ppk__hero-sub">
              Сайт ветеринарного врача-невролога: рассказ о специалисте, квалификация,
              лекторская деятельность и онлайн-запись на консультацию
            </p>
            <a
              href="https://proshkina-vet.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="ppk__cta"
            >
              Открыть сайт <span className="ppk__cta-arrow"><FiArrowUpRight /></span>
            </a>
          </div>
          <div className="ppk__hero-right">
            <div className="ppk__video-wrap">
              {!heroVideoError ? (
                <video
                  src="/videos/proshkina.mp4"
                  className="ppk__video"
                  preload="auto"
                  muted
                  autoPlay
                  loop
                  playsInline
                  onError={() => setHeroVideoError(true)}
                />
              ) : (
                <div className="ppk__video-ph">
                  <span>▶ Обзор сайта</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── STAT BAR ── */}
      <div className="ppk__stats">
        <div className="ppk__stat">
          <span className="ppk__stat-num">0</span>
          <span className="ppk__stat-label">Node-серверов —<br />только статика</span>
        </div>
        <div className="ppk__stat-divider" />
        <div className="ppk__stat">
          <span className="ppk__stat-num">100%</span>
          <span className="ppk__stat-label">строгий<br />TypeScript</span>
        </div>
        <div className="ppk__stat-divider" />
        <div className="ppk__stat">
          <span className="ppk__stat-num">15</span>
          <span className="ppk__stat-label">собственных<br />компонентов</span>
        </div>
        <div className="ppk__stat-divider" />
        <div className="ppk__stat">
          <span className="ppk__stat-num">2</span>
          <span className="ppk__stat-label">поисковика<br />подтверждены</span>
        </div>
      </div>

      {/* ── INTRO ── */}
      <section className="ppk__intro">
        <div className="ppk__intro-grid">
          <div className="ppk__intro-text">
            <p>
              Коммерческий проект для реального заказчика — практикующего ветеринарного
              невролога. Тексты подготовила заказчица, всё остальное — моя работа: структура
              страниц, дизайн, вёрстка, SEO, деплой и подключение домена. Сайт работает в продакшене на proshkina-vet.ru.
            </p>
            <p>
              Главная задача — чтобы владелец животного быстро понял, с чем можно прийти
              к неврологу, доверился специалисту и записался. Поэтому каждая секция ведёт
              к записи, а сама запись встроена в мою CRM VetRemote: врач получает заявку
              сразу в свой рабочий календарь.
            </p>
          </div>
          <div className="ppk__intro-aside">
            <div className="ppk__aside-block">
              <span className="ppk__aside-label">Домен</span>
              <span className="ppk__aside-val">proshkina-vet.ru</span>
            </div>
            <div className="ppk__aside-block">
              <span className="ppk__aside-label">Фреймворк</span>
              <span className="ppk__aside-val">Next.js 16</span>
            </div>
            <div className="ppk__aside-block">
              <span className="ppk__aside-label">Хостинг</span>
              <span className="ppk__aside-val">Рег.ру</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="ppk__highlights">
        <h2 className="ppk__section-title">Технические детали</h2>
        <div className="ppk__hl-grid">
          {highlights.map((item) => (
            <div key={item.id} className="ppk__hl-item">
              <div className="ppk__hl-media">
                <img src={item.media} alt={item.title} className="ppk__hl-img" loading="lazy" />
              </div>
              <div className="ppk__hl-body">
                <span className="ppk__hl-num">{item.id}</span>
                <strong className="ppk__hl-title">{item.title}</strong>
                <p className="ppk__hl-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STACK ── */}
      <section className="ppk__stack">
        <h2 className="ppk__section-title">Стек</h2>
        <div className="ppk__pills">
          {["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "Motion", "lucide-react", "Static export", "Хостинг Рег.ру"].map((t) => (
            <span key={t} className="ppk__pill">{t}</span>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ppk__footer">
        <a
          href="https://proshkina-vet.ru"
          target="_blank"
          rel="noopener noreferrer"
          className="ppk__cta ppk__cta--large"
        >
          Посмотреть живой сайт <span className="ppk__cta-arrow"><FiArrowUpRight /></span>
        </a>
        <Link to="/" state={{ scrollTo: "projects" }} className="ppk__back ppk__back--footer">
          <span className="ppk__back-arrow"><FiArrowLeft /></span> Все проекты
        </Link>
      </footer>
    </article>
  );
}
