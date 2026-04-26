import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./ProjectKekstagram.css";

const achievements = [
  {
    id: "01",
    title: "Загрузка и редактирование фото",
    text: "Полный пайплайн: выбор файла → масштабирование (25–100% с шагом 25) → наложение одного из 5 CSS-эффектов → контроль интенсивности через noUiSlider.",
  },
  {
    id: "02",
    title: "Валидация хэштегов и комментариев",
    text: "Библиотека Pristine: уникальность, регулярки, лимит 5 тегов / 20 символов / 140 символов в комментарии. Отдельное сообщение для каждого типа ошибки.",
  },
  {
    id: "03",
    title: "AJAX: POST и GET",
    text: "Данные отправляются как multipart/form-data, изображения загружаются с удалённого сервера сразу после открытия страницы. Кнопка блокируется на время запроса.",
  },
  {
    id: "04",
    title: "Пагинация комментариев",
    text: "Порциями по 5 штук через кнопку «Загрузить ещё». Счётчик «показано / всего» обновляется динамически; кнопка скрывается когда все комментарии отображены.",
  },
  {
    id: "05",
    title: "Фильтрация с debounce",
    text: "Три режима: по умолчанию, 10 случайных, по убыванию комментариев. Перерисовка не чаще раза в 500 мс — без лишних перезапросов и мерцания.",
  },
  {
    id: "06",
    title: "Чистая архитектура ES-модулей",
    text: "Каждый файл — отдельный ES2015-модуль с говорящим именем. Неизменяемые экспорты, своевременное добавление и удаление document-обработчиков, textContent вместо innerHTML.",
  },
];

export default function ProjectKekstagram() {
  const videoRef = useRef(null);

  return (
    <article className="pkg">
      {/* ── BACK ── */}
      <Link to="/" className="pkg__back">
        <span className="pkg__back-arrow">←</span> Назад к проектам
      </Link>

      {/* ── HERO ── */}
      <header className="pkg__hero">
        <div className="pkg__hero-meta">
          <span className="pkg__tag">JavaScript · API · LocalStorage</span>
          <span className="pkg__year">2026</span>
        </div>
        <h1 className="pkg__hero-title">Kekstagram</h1>
        <p className="pkg__hero-sub">
          Интерактивный фотосервис на ванильном JS — загрузка, фильтры, AJAX, валидация без единого фреймворка
        </p>
        <a
          href="https://argonautden.github.io/2564453-kekstagram-2/"
          target="_blank"
          rel="noopener noreferrer"
          className="pkg__cta"
        >
          Открыть проект <span className="pkg__cta-arrow">↗</span>
        </a>
      </header>

      {/* ── VIDEO ── */}
      <section className="pkg__media">
        <div className="pkg__video-wrap">
          <video
            ref={videoRef}
            src="/videos/Kekstagram.mp4"
            className="pkg__video"
            controls
            muted
            playsInline
          />
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="pkg__intro">
        <div className="pkg__intro-grid">
          <div className="pkg__intro-text">
            <p>
              Kekstagram — полноценный фотосервис в духе Instagram, написанный на чистом JavaScript без React, Vue или любого другого UI-фреймворка. Задача: реализовать весь пользовательский сценарий — от выбора файла до просмотра ленты — опираясь только на нативные API браузера.
            </p>
            <p>
              Проект сделан в рамках профессионального курса по JavaScript. Код разбит на ES2015-модули, работает кроссбраузерно и не оставляет «мусорных» обработчиков событий.
            </p>
          </div>
          <div className="pkg__intro-stats">
            <div className="pkg__stat">
              <span className="pkg__stat-num">5</span>
              <span className="pkg__stat-label">CSS-эффектов<br/>с ползунком</span>
            </div>
            <div className="pkg__stat">
              <span className="pkg__stat-num">0</span>
              <span className="pkg__stat-label">UI-фреймворков<br/>в зависимостях</span>
            </div>
            <div className="pkg__stat">
              <span className="pkg__stat-num">500ms</span>
              <span className="pkg__stat-label">debounce<br/>фильтрации</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCREENSHOTS ── */}
      <section className="pkg__screens">
        <h2 className="pkg__section-title">Ключевые моменты</h2>
        <div className="pkg__screens-grid">
          <figure className="pkg__screen-item pkg__screen-item--wide">
            <div className="pkg__screen-placeholder">
              <span>Лента изображений + фильтры</span>
            </div>
            <figcaption className="pkg__screen-caption">
              Главная страница: миниатюры из API, панель фильтрации
            </figcaption>
          </figure>

          <figure className="pkg__screen-item">
            <div className="pkg__screen-placeholder">
              <span>Редактор фото</span>
            </div>
            <figcaption className="pkg__screen-caption">
              Загрузка, масштаб, эффекты, хэштеги
            </figcaption>
          </figure>

          <figure className="pkg__screen-item">
            <div className="pkg__screen-placeholder">
              <span>Полноэкранный просмотр</span>
            </div>
            <figcaption className="pkg__screen-caption">
              big-picture: лайки, комментарии, подгрузка по 5
            </figcaption>
          </figure>

          <figure className="pkg__screen-item">
            <div className="pkg__screen-placeholder">
              <span>Валидация формы</span>
            </div>
            <figcaption className="pkg__screen-caption">
              Pristine: inline-ошибки под каждым полем
            </figcaption>
          </figure>

          <figure className="pkg__screen-item">
            <div className="pkg__screen-placeholder">
              <span>noUiSlider — интенсивность</span>
            </div>
            <figcaption className="pkg__screen-caption">
              Ползунок эффекта: grayscale / sepia / blur / invert / brightness
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section className="pkg__achievements">
        <h2 className="pkg__section-title">Что было реализовано</h2>
        <ul className="pkg__ach-list">
          {achievements.map((item) => (
            <li key={item.id} className="pkg__ach-item">
              <span className="pkg__ach-num">{item.id}</span>
              <div className="pkg__ach-body">
                <strong className="pkg__ach-title">{item.title}</strong>
                <p className="pkg__ach-text">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── STACK ── */}
      <section className="pkg__stack">
        <h2 className="pkg__section-title">Стек</h2>
        <div className="pkg__tags-wrap">
          {[
            "Vanilla JavaScript",
            "ES2015 Modules",
            "Fetch API",
            "FormData",
            "noUiSlider",
            "Pristine.js",
            "CSS Filters",
            "Debounce",
            "DOM API",
          ].map((t) => (
            <span key={t} className="pkg__pill">{t}</span>
          ))}
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <footer className="pkg__footer">
        <a
          href="https://argonautden.github.io/2564453-kekstagram-2/"
          target="_blank"
          rel="noopener noreferrer"
          className="pkg__cta pkg__cta--large"
        >
          Посмотреть живой сайт <span className="pkg__cta-arrow">↗</span>
        </a>
        <Link to="/" className="pkg__back pkg__back--footer">← Все проекты</Link>
      </footer>
    </article>
  );
}
