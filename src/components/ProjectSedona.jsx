import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./ProjectSedona.css";

const achievements = [
  {
    id: "01",
    title: "Пиксель-перфект вёрстка",
    text: "Каждый блок — точное воспроизведение макета и стайлгайда. Отступы, типографика PT Sans, размеры — без отклонений.",
  },
  {
    id: "02",
    title: "Центрированный layout с фоном по краям",
    text: "Контентная область фиксированной ширины, серый фон тянется на всю ширину экрана — реализовано чистым CSS без JS.",
  },
  {
    id: "03",
    title: "Hero с полноразмерным фото и белой маской",
    text: "Фоновое изображение во всю секцию, плавный белый градиент снизу — точно по макету, без изображений-заглушек.",
  },
  {
    id: "04",
    title: "Каталог: фильтры, слайдер, пагинация",
    text: "Рабочие фильтры и рендж-слайдер, корректная пагинация, поведение кнопок строго по ТЗ.",
  },
  {
    id: "05",
    title: "Форма с валидацией и отправкой",
    text: "Форма подписки с клиентской валидацией и реальной отправкой данных на тестовый сервер.",
  },
  {
    id: "06",
    title: "Кроссбраузерность без фреймворков",
    text: "Протестировано в Chrome, Firefox и Safari. Ни одной зависимости — только HTML5 и CSS3.",
  },
];

export default function ProjectSedona() {
  const videoRef = useRef(null);

  return (
    <article className="pse">
      {/* ── BACK ── */}
      <Link to="/" state={{ scrollTo: 'projects' }} className="pce__back ...">
        <span className="pse__back-arrow">←</span> Назад к проектам
      </Link>

      {/* ── HERO + VIDEO ── */}
      <header className="pse__hero">
        <div className="pse__hero-inner">

          {/* Левая колонка: текст */}
          <div className="pse__hero-left">
            <div className="pse__hero-meta">
              <span className="pse__tag">HTML5 · CSS3 · Pixel Perfect</span>
              <span className="pse__year">2025</span>
            </div>
            <h1 className="pse__hero-title">Sedona</h1>
            <p className="pse__hero-sub">
              Двухстраничный туристический сайт — пиксель-перфект по макету,
              чистый HTML и CSS, никаких фреймворков
            </p>
            <a
              href="https://argonautden.github.io/2564453-sedona-2"
              target="_blank"
              rel="noopener noreferrer"
              className="pse__cta"
            >
              Открыть проект <span className="pse__cta-arrow">↗</span>
            </a>
          </div>

          {/* Правая колонка: видео */}
          <div className="pse__hero-right">
            <div className="pse__video-wrap">
              <video
                ref={videoRef}
                src="/videos/Sedona.mp4"
                className="pse__video"
                controls
                muted
                playsInline
                loop
                autoPlay
                preload="auto"
              />
            </div>
          </div>

        </div>
      </header>

      {/* ── STATS ── */}
      <div className="pse__stats">
        <div className="pse__stat">
          <span className="pse__stat-num">2</span>
          <span className="pse__stat-label">страницы<br/>по макету</span>
        </div>
        <div className="pse__stat-divider" />
        <div className="pse__stat">
          <span className="pse__stat-num">3</span>
          <span className="pse__stat-label">браузера<br/>поддержка</span>
        </div>
        <div className="pse__stat-divider" />
        <div className="pse__stat">
          <span className="pse__stat-num">0</span>
          <span className="pse__stat-label">сторонних<br/>зависимостей</span>
        </div>
        <div className="pse__stat-divider" />
        <div className="pse__stat">
          <span className="pse__stat-num">px</span>
          <span className="pse__stat-label">идеальное<br/>совпадение</span>
        </div>
      </div>

      {/* ── INTRO ── */}
      <section className="pse__intro">
        <div className="pse__intro-grid">
          <div className="pse__intro-text">
            <p>
              Задача — не просто перенести дизайн в код, а сохранить визуальную логику и пользовательский сценарий. Макет соблюдён до пикселя: отступы, шрифты, состояния элементов.
            </p>
            <p>
              Это проект про дисциплину: когда нет фреймворков, нет готовых компонентов — только понимание CSS и внимание к деталям. Именно здесь видно, умеет ли разработчик доводить до результата.
            </p>
          </div>
          <div className="pse__intro-aside">
            <div className="pse__aside-block">
              <span className="pse__aside-label">Шрифт</span>
              <span className="pse__aside-val">PT Sans</span>
            </div>
            <div className="pse__aside-block">
              <span className="pse__aside-label">Подход</span>
              <span className="pse__aside-val">Progressive&nbsp;Enhancement</span>
            </div>
            <div className="pse__aside-block">
              <span className="pse__aside-label">Деплой</span>
              <span className="pse__aside-val">GitHub Pages</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOWCASE ── */}
      <section className="pse__screens">
        <h2 className="pse__section-title">Ключевые моменты</h2>

        {/* РЯД 1 — Десктоп главная, полная ширина */}
        <div className="pse__showcase-row pse__showcase-row--full">
          <figure className="pse__showcase-fig">
            <div className="pse__showcase-label">
              <span className="pse__showcase-num">01</span>
              <span className="pse__showcase-desc">Desktop · Главная</span>
            </div>
            <div className="pse__img-wrap pse__img-wrap--wide">
              <img
                src="/images/sedona-hero.webp"
                alt="Десктопная версия главной страницы Sedona"
                width="1440"
                height="900"
                className="pse__showcase-img"
              />
            </div>
            <figcaption className="pse__showcase-caption">
              Hero с полноразмерным фото, белая маска снизу, центрированный layout с серым фоном по краям
            </figcaption>
          </figure>
        </div>

        {/* РЯД 2 — Десктоп каталог, полная ширина */}
        <div className="pse__showcase-row pse__showcase-row--full">
          <figure className="pse__showcase-fig">
            <div className="pse__showcase-label">
              <span className="pse__showcase-num">02</span>
              <span className="pse__showcase-desc">Desktop · Каталог</span>
            </div>
            <div className="pse__img-wrap pse__img-wrap--wide">
              <img
                src="/images/sedona-catalog.webp"
                alt="Десктопная версия каталога Sedona"
                width="1440"
                height="900"
                className="pse__showcase-img"
              />
            </div>
            <figcaption className="pse__showcase-caption">
              Фильтры, рендж-слайдер, сортировка и пагинация — всё строго по ТЗ
            </figcaption>
          </figure>
        </div>

        {/* РЯД 4 — Два мобильных, узкие и высокие */}
        <div className="pse__showcase-row pse__showcase-row--mobile-pair">
        <figure className="pse__showcase-fig">
            <div className="pse__showcase-label">
              <span className="pse__showcase-num">03</span>
              <span className="pse__showcase-desc">Desktop · Форма подписки</span>
            </div>
            <div className="pse__img-wrap pse__img-wrap--detail">
              <img
                src="/images/subscribe-sedona.webp"
                alt="Форма подписки с валидацией"
                width="890"
                height="330"
                className="pse__showcase-img"
              />
            </div>
            <figcaption className="pse__showcase-caption">
              Форма с клиентской валидацией и отправкой на тестовый сервер
            </figcaption>
          </figure>

          <figure className="pse__showcase-fig">
            <div className="pse__showcase-label">
              <span className="pse__showcase-num">04</span>
              <span className="pse__showcase-desc">Модальное окно бронирования</span>
            </div>
            <div className="pse__img-wrap pse__img-wrap--mobile">
              <img
                src="/images/sedona-modal.webp"
                alt="Бронирование"
                width="375"
                height="812"
                className="pse__showcase-img"
              />
            </div>
            <figcaption className="pse__showcase-caption">
              Модальное окно бронирования на определенные даты
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section className="pse__achievements">
        <h2 className="pse__section-title">Что было реализовано</h2>
        <ul className="pse__ach-list">
          {achievements.map((item) => (
            <li key={item.id} className="pse__ach-item">
              <span className="pse__ach-num">{item.id}</span>
              <div className="pse__ach-body">
                <strong className="pse__ach-title">{item.title}</strong>
                <p className="pse__ach-text">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── STACK ── */}
      <section className="pse__stack">
        <h2 className="pse__section-title">Стек</h2>
        <div className="pse__tags-wrap">
          {["HTML5", "CSS3", "PT Sans", "Pixel Perfect", "Progressive Enhancement", "GitHub Pages"].map((t) => (
            <span key={t} className="pse__pill">{t}</span>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pse__footer">
        <a
          href="https://argonautden.github.io/2564453-sedona-2"
          target="_blank"
          rel="noopener noreferrer"
          className="pse__cta pse__cta--large"
        >
          Посмотреть живой сайт <span className="pse__cta-arrow">↗</span>
        </a>
        <Link to="/" state={{ scrollTo: 'projects' }} className="pce__back ...">← Все проекты</Link>
      </footer>
    </article>
  );
}