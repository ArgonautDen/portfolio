import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./ProjectCatEnergy.css";

const achievements = [
  {
    id: "01",
    title: "Полная адаптивность",
    text: "Три breakpoint'а — мобильный, планшетный, десктопный. Резиновая сетка, ретинизация иконок и SVG-графика на любом экране.",
  },
  {
    id: "02",
    title: "БЭМ + Sass",
    text: "Чистая архитектура: каждый блок — отдельный модуль. Препроцессор Sass, переменные, миксины, автоматизация через Gulp.",
  },
  {
    id: "03",
    title: "Без единой библиотеки",
    text: "Только HTML5 и CSS3. Никаких зависимостей, никаких костылей — только аккуратный ручной код, который работает везде.",
  },
  {
    id: "04",
    title: "Кроссбраузерность",
    text: "Протестировано в Chrome, Firefox и Safari. Одинаковый пиксель-идеальный результат во всех популярных браузерах.",
  },
  {
    id: "05",
    title: "Интерактивная карта",
    text: "Встроенная Google/Яндекс карта. Ширина карты подстраивается под вьюпорт, центр совпадает с макетом.",
  },
  {
    id: "06",
    title: "Двусторонний дизайн",
    text: "Главная + каталог с фильтрами, кнопкой «Показать все» и пагинацией. Динамичный hero с разделённым фоном: белый слева, зелёный справа.",
  },
];

export default function ProjectCatEnergy() {
  const videoRef = useRef(null);

  return (
    <article className="pce">
      {/* ── BACK ── */}
      <Link to="/" state={{ scrollTo: 'projects' }} className="pce__back ...">
        <span className="pce__back-arrow">←</span> Назад к проектам
      </Link>

      {/* ── HERO + VIDEO ── */}
      <header className="pce__hero">
        <div className="pce__hero-inner">
          <div className="pce__hero-left">
            <div className="pce__hero-meta">
              <span className="pce__tag">HTML · CSS · Sass · БЭМ · Gulp</span>
              <span className="pce__year">2025</span>
            </div>
            <h1 className="pce__hero-title">Cat&nbsp;Energy</h1>
            <p className="pce__hero-sub">
              Адаптивная вёрстка коммерческого сайта — от мобайла до десктопа, без единой библиотеки
            </p>
            <a
              href="https://htmlacademy-adaptive.github.io/2564453-cat-energy-2/"
              target="_blank"
              rel="noopener noreferrer"
              className="pce__cta"
            >
              Открыть проект <span className="pce__cta-arrow">↗</span>
            </a>
          </div>
          <div className="pce__hero-right">
            <div className="pce__video-wrap">
              <video
                ref={videoRef}
                src="/videos/Energy.mp4"
                className="pce__video"
                preload="auto"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="pce__video-overlay">
                <span className="pce__play-hint">▶ Обзор проекта</span>
              </div>
            </div>
          </div>
        </div>
      </header>

{/* ── INTRO ── */}
      <section className="pce__intro">
        <div className="pce__intro-grid">
          <div className="pce__intro-text">
            <p>
              Cat Energy — двустраничный коммерческий сайт для бренда корма для кошек. Задача: точно перенести макет в код, сохранить визуальную логику на трёх типах устройств и собрать полноценный каталог с фильтрами.
            </p>
            <p>
              Проект выполнен в рамках профессионального курса по адаптивной вёрстке. Весь код — собственный: HTML5, CSS3, Sass, Gulp. Ни единой сторонней UI-библиотеки.
            </p>
          </div>
          <div className="pce__intro-stats">
            <div className="pce__stat">
              <span className="pce__stat-num">2</span>
              <span className="pce__stat-label">страницы<br/>в макете</span>
            </div>
            <div className="pce__stat">
              <span className="pce__stat-num">3</span>
              <span className="pce__stat-label">breakpoint'а<br/>адаптивности</span>
            </div>
            <div className="pce__stat">
              <span className="pce__stat-num">0</span>
              <span className="pce__stat-label">сторонних<br/>библиотек</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCREENSHOTS ── */}
      <section className="pce__screens">
        <h2 className="pce__section-title">Ключевые моменты</h2>

        {/* РЯД 1: Десктоп главная — на всю ширину */}
        <div className="pce__showcase-row pce__showcase-row--full">
          <figure className="pce__showcase-fig">
            <div className="pce__showcase-label">
              <span className="pce__showcase-num">01</span>
              <span className="pce__showcase-desc">Десктоп · Главная страница</span>
            </div>
            <div className="pce__img-wrap pce__img-wrap--wide">
              <img
                src="/images/dscatenergy.webp"
                alt="Десктопная версия главной страницы Cat Energy"
                width="1440"
                height="900"
                className="pce__showcase-img"
              />
            </div>
            <figcaption className="pce__showcase-caption">
              Разделённый hero: белый фон слева, зелёный с котом справа — точная реализация split-bg без JS
            </figcaption>
          </figure>
        </div>

        {/* РЯД 2: Два мобильных скрина рядом (узкие и высокие) */}
        <div className="pce__showcase-row pce__showcase-row--mobile-pair">
          <figure className="pce__showcase-fig">
            <div className="pce__showcase-label">
              <span className="pce__showcase-num">02</span>
              <span className="pce__showcase-desc">Mobile · Главная</span>
            </div>
            <div className="pce__img-wrap pce__img-wrap--mobile">
              <img
                src="/images/mobilecatenergy-2.webp"
                alt="Мобильная версия главной страницы"
                width="375"
                height="812"
                className="pce__showcase-img"
              />
            </div>
            <figcaption className="pce__showcase-caption">
              Бургер-меню, одноколоночная раскладка
            </figcaption>
          </figure>

          <figure className="pce__showcase-fig">
            <div className="pce__showcase-label">
              <span className="pce__showcase-num">03</span>
              <span className="pce__showcase-desc">Mobile · Каталог</span>
            </div>
            <div className="pce__img-wrap pce__img-wrap--mobile">
              <img
                src="/images/pink-mob.webp"
                alt="Мобильная версия каталога"
                width="375"
                height="812"
                className="pce__showcase-img"
              />
            </div>
            <figcaption className="pce__showcase-caption">
              Mobile-friendly магазин
            </figcaption>
          </figure>
        </div>

        {/* РЯД 3: Планшет + Десктоп каталог — два широких рядом */}
        <div className="pce__showcase-row pce__showcase-row--desktop-pair">
          <figure className="pce__showcase-fig">
            <div className="pce__showcase-label">
              <span className="pce__showcase-num">04</span>
              <span className="pce__showcase-desc">Tablet · Главная</span>
            </div>
            <div className="pce__img-wrap pce__img-wrap--tablet">
              <img
                src="/images/tablet-catenergy - init.webp"
                alt="Планшетная версия"
                width="768"
                height="1024"
                className="pce__showcase-img"
              />
            </div>
            <figcaption className="pce__showcase-caption">
              Интерактивный ползунок "до-после"
            </figcaption>
          </figure>

          <figure className="pce__showcase-fig">
            <div className="pce__showcase-label">
              <span className="pce__showcase-num">05</span>
              <span className="pce__showcase-desc">Desktop · Каталог</span>
            </div>
            <div className="pce__img-wrap pce__img-wrap--tablet">
              <img
                src="/images/ds-catalog-catenergy.webp"
                alt="Десктопный каталог"
                width="1440"
                height="900"
                className="pce__showcase-img"
              />
            </div>
            <figcaption className="pce__showcase-caption">
              Четырехколоночный каталог, сайдбар с фильтрами
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section className="pce__achievements">
        <h2 className="pce__section-title">Что реализовал</h2>
        <ul className="pce__ach-list">
          {achievements.map((item) => (
            <li key={item.id} className="pce__ach-item">
              <span className="pce__ach-num">{item.id}</span>
              <div className="pce__ach-body">
                <strong className="pce__ach-title">{item.title}</strong>
                <p className="pce__ach-text">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── STACK ── */}
      <section className="pce__stack">
        <h2 className="pce__section-title">Стек</h2>
        <div className="pce__tags-wrap">
          {["HTML5", "CSS3", "Sass (SCSS)", "БЭМ", "Gulp", "Retina-графика", "Adaptive Layout"].map((t) => (
            <span key={t} className="pce__pill">{t}</span>
          ))}
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <footer className="pce__footer">
        <a
          href="https://htmlacademy-adaptive.github.io/2564453-cat-energy-2/"
          target="_blank"
          rel="noopener noreferrer"
          className="pce__cta pce__cta--large"
        >
          Посмотреть живой сайт <span className="pce__cta-arrow">↗</span>
        </a>
        <Link to="/" state={{ scrollTo: 'projects' }} className="pce__back ...">← Все проекты</Link>
      </footer>
    </article>
  );
}