import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import Lottie from "lottie-react";
import catAnimation from "../assets/animations/cat.json";
import "./ProjectVetCRM.css";

const screenshots = [
  {
    id: "01",
    desc: "Дашборд",
    img: "/images/vetcrm-dashboard.webp",
    alt: "Дашборд VetRemote CRM",
    caption: "Сводка дня: ближайшие приёмы, напоминания и быстрый доступ к картотеке",
  },
  {
    id: "02",
    desc: "Пациенты",
    img: "/images/vetcrm-patients.webp",
    alt: "Картотека пациентов",
    caption: "Картотека: карточки питомцев с владельцами и историей приёмов",
  },
  {
    id: "03",
    desc: "Календарь",
    img: "/images/vetcrm-calendar.webp",
    alt: "Календарь приёмов",
    caption: "Расписание с учётом рабочих часов врача и буфера между визитами",
  },
  {
    id: "04",
    desc: "Приём",
    img: "/images/vetcrm-appointment.webp",
    alt: "Форма приёма",
    caption: "Анамнез, рекомендации, вес — настраиваемые поля под тип приёма",
  },
  {
    id: "05",
    desc: "Карточка пациента",
    img: "/images/vetcrm-patient-card.webp",
    alt: "Карточка пациента",
    caption: "Полная история: приёмы, вес в динамике, клинические метрики",
  },
  {
    id: "06",
    desc: "Анкеты",
    img: "/images/vetcrm-intakes.webp",
    alt: "Конструктор анкет",
    caption: "Конструктор опросников и одноразовые ссылки для владельцев без регистрации",
  },
  {
    id: "07",
    desc: "Напоминания",
    img: "/images/vetcrm-reminders.webp",
    alt: "Напоминания",
    caption: "Задачи по каждому пациенту с датой выполнения и статусом",
  },
];

const achievements = [
  {
    id: "01",
    title: "Прогрессивная защита входа",
    text: "5 неудачных попыток — растущий таймаут (+5 минут за попытку), 20 — перманентная блокировка аккаунта. Смена пароля инвалидирует все активные сессии через одноразовый session_token, зашитый в идентификатор пользователя Flask-Login.",
  },
  {
    id: "02",
    title: "Мультитенантность на уровне данных",
    text: "Каждая запись — пациент, приём, напоминание, анкета — жёстко привязана к doctor_id. Один врач физически не может получить доступ к данным другого: это гарантия на уровне модели, а не только интерфейса.",
  },
  {
    id: "03",
    title: "17 моделей и продуманные каскады",
    text: "SQLAlchemy-схема с явными cascade='all, delete-orphan' на связях: удаляя пациента, система корректно подчищает его приёмы, напоминания, вес и анкеты — без осиротевших записей в базе.",
  },
  {
    id: "04",
    title: "Гибкая под-схема поверх реляционной БД",
    text: "Настраиваемые поля анкет и шаблоны приёмов хранятся как JSON в текстовых колонках — гибрид реляционного и document-style подхода там, где жёсткая схема была бы лишней.",
  },
  {
    id: "05",
    title: "Zero-downtime миграции без Alembic",
    text: "Новые колонки добавляются через собственные inline ALTER TABLE ... IF NOT EXISTS при старте приложения — деплой не требует ручных миграций и не роняет прод.",
  },
  {
    id: "06",
    title: "Одноразовые токен-ссылки для анкет",
    text: "Врач генерирует ссылку на форму — владелец питомца заполняет её без регистрации, ссылка гаснет после одного использования или по истечении срока.",
  },
];

function CatScreenshot({ item }) {
  const frameRef = useRef(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setIsNear(entry.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="pvc__showcase-fig">
      <div className="pvc__showcase-label">
        <span className="pvc__showcase-num">{item.id}</span>
        <span className="pvc__showcase-desc">{item.desc}</span>
      </div>

      <div className="pvc__frame" ref={frameRef}>
        <div className="pvc__img-wrap">
          <img src={item.img} alt={item.alt} className="pvc__showcase-img" loading="lazy" />
        </div>
        <div className={`pvc__cat ${isNear ? "pvc__cat--landed" : ""}`} aria-hidden="true">
          <Lottie animationData={catAnimation} loop autoplay />
        </div>
      </div>

      <figcaption className="pvc__showcase-caption">{item.caption}</figcaption>
    </figure>
  );
}

export default function ProjectVetCRM() {
  const footerRef = useRef(null);
  const [showBigCat, setShowBigCat] = useState(false);
  const bigCatTimeoutRef = useRef(null);
  const [heroVideoError, setHeroVideoError] = useState(false);
  const rootRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(bigCatTimeoutRef.current);
        if (entry.isIntersecting) {
          setShowBigCat(true);
          bigCatTimeoutRef.current = setTimeout(() => setShowBigCat(false), 7000);
        } else {
          setShowBigCat(false);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(bigCatTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== "/projects/vetcrm") return;
    rootRef.current?.querySelectorAll("video").forEach((v) => {
      v.play().catch(() => {});
    });
  }, [location.pathname]);

  return (
    <article className="pvc" ref={rootRef}>
      {/* ── BACK ── */}
      <Link to="/" state={{ scrollTo: "projects" }} className="pvc__back">
        <span className="pvc__back-arrow"><FiArrowLeft /></span> Назад к проектам
      </Link>

      {/* ── HERO ── */}
      <header className="pvc__hero">
        <div className="pvc__hero-inner">
          <div className="pvc__hero-left">
            <div className="pvc__hero-eyebrow">
              <span className="pvc__tag">Flask · PostgreSQL · SQLAlchemy · Jinja2 · Railway</span>
              <span className="pvc__year">2026</span>
            </div>
            <h1 className="pvc__hero-title">
              <span className="pvc__title-line1">VetRemote</span>
              <span className="pvc__title-line2">CRM</span>
            </h1>
            <p className="pvc__hero-sub">
              Рабочая CRM для ветеринарных врачей: картотека пациентов, календарь приёмов,
              конструктор анкет и авто-напоминания — в проде, с реальными докторами и их данными
            </p>
            <a
              href="https://www.vet-remote.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="pvc__cta"
            >
              Открыть сайт <span className="pvc__cta-arrow"><FiArrowUpRight /></span>
            </a>
          </div>
          <div className="pvc__hero-right">
            <div className="pvc__video-wrap">
              {!heroVideoError ? (
                <video
                  src="/videos/vetremote-comercial.mp4"
                  className="pvc__video"
                  preload="auto"
                  muted
                  autoPlay
                  loop
                  playsInline
                  onError={() => setHeroVideoError(true)}
                />
              ) : (
                <div className="pvc__video-ph">
                  <span>▶ Обзор VetRemote CRM</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── STAT BAR ── */}
      <div className="pvc__stats">
        <div className="pvc__stat">
          <span className="pvc__stat-num">17</span>
          <span className="pvc__stat-label">моделей<br />в БД</span>
        </div>
        <div className="pvc__stat-divider" />
        <div className="pvc__stat">
          <span className="pvc__stat-num">20</span>
          <span className="pvc__stat-label">попыток →<br />блокировка</span>
        </div>
        <div className="pvc__stat-divider" />
        <div className="pvc__stat">
          <span className="pvc__stat-num">0</span>
          <span className="pvc__stat-label">простоя при<br />миграциях</span>
        </div>
        <div className="pvc__stat-divider" />
        <div className="pvc__stat">
          <span className="pvc__stat-num">7</span>
          <span className="pvc__stat-label">экранов в<br />интерфейсе</span>
        </div>
      </div>

      {/* ── INTRO ── */}
      <section className="pvc__intro">
        <div className="pvc__intro-grid">
          <div className="pvc__intro-text">
            <p>
              VetRemote CRM — рабочий инструмент ветеринарного врача: картотека пациентов,
              календарь приёмов, конструктор анкет и авто-напоминания. Я спроектировал и сверстал
              весь интерфейс с нуля, а также схему базы данных, систему авторизации и общую
              архитектуру приложения.
            </p>
            <p>
              Это не витрина, а система, которой пользуются настоящие врачи каждый день — со
              своими данными, своим расписанием и своими пациентами. Задача была не просто
              «сделать красиво», а построить надёжную многопользовательскую основу, которая
              не даст данным одного врача случайно попасть к другому.
            </p>
          </div>
          <div className="pvc__intro-aside">
            <div className="pvc__aside-block">
              <span className="pvc__aside-label">Домен</span>
              <span className="pvc__aside-val">vet-remote.ru</span>
            </div>
            <div className="pvc__aside-block">
              <span className="pvc__aside-label">Бэкенд</span>
              <span className="pvc__aside-val">Flask + PostgreSQL</span>
            </div>
            <div className="pvc__aside-block">
              <span className="pvc__aside-label">Деплой</span>
              <span className="pvc__aside-val">Railway / Gunicorn</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCREENSHOTS ── */}
      <section className="pvc__screens">
        <h2 className="pvc__section-title">Интерфейс</h2>
        <div className="pvc__showcase-grid">
          {screenshots.map((item) => (
            <CatScreenshot key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section className="pvc__achievements">
        <h2 className="pvc__section-title">Что реализовал</h2>
        <ul className="pvc__ach-list">
          {achievements.map((item) => (
            <li key={item.id} className="pvc__ach-item">
              <span className="pvc__ach-num">{item.id}</span>
              <div className="pvc__ach-body">
                <strong className="pvc__ach-title">{item.title}</strong>
                <p className="pvc__ach-text">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── STACK ── */}
      <section className="pvc__stack">
        <h2 className="pvc__section-title">Стек</h2>
        <div className="pvc__tags-wrap">
          {["Python", "Flask", "SQLAlchemy", "PostgreSQL", "Flask-Login", "Jinja2", "Railway", "Gunicorn", "Lottie"].map((t) => (
            <span key={t} className="pvc__pill">{t}</span>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pvc__footer" ref={footerRef}>
        <a
          href="https://www.vet-remote.ru/"
          target="_blank"
          rel="noopener noreferrer"
          className="pvc__cta pvc__cta--large"
        >
          Посмотреть живой сайт <span className="pvc__cta-arrow"><FiArrowUpRight /></span>
        </a>
        <Link to="/" state={{ scrollTo: "projects" }} className="pvc__back pvc__back--footer">
          <span className="pvc__back-arrow"><FiArrowLeft /></span> Все проекты
        </Link>
      </footer>

      {/* ── БОЛЬШОЙ КОТ В КОНЦЕ СТРАНИЦЫ ── */}
      <div className={`pvc__big-cat ${showBigCat ? "pvc__big-cat--visible" : ""}`} aria-hidden="true">
        <Lottie animationData={catAnimation} loop autoplay />
      </div>
    </article>
  );
}
