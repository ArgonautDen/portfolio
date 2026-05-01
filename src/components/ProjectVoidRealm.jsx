import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectVoidRealm.css";

const isVideo = (src) => /\.(mp4|webm|mov|ogg)$/i.test(src);

const highlights = [
  {
    id: "01",
    title: "Вся игровая логика — на фронтенде",
    text: "Сервер только обсчитывал урон. Все состояния: фазы хода, смена бойца, анимации попаданий, систему очков энергии, HP-бары с плавным спадом — я проектировал и реализовывал сам с нуля.",
    media: "/images/1-void.webp",
    mediaLabel: "Игровые состояния",
  },
  {
    id: "02",
    title: "Две фазы за один ход + одновременность",
    text: "Движение (ближняя / дальняя дистанция) и атака выбираются скрытно. Оба игрока отправляют действие — результат вычисляется одновременно. Никаких «кто первый нажал».",
    media: "/videos/2-void.mp4",
    mediaLabel: "Фаза хода",
  },
  {
    id: "03",
    title: "Анимации и звук — с нуля",
    text: "Музыка и SFX созданы с помощью нейросетей и библиотек свободных звуков (с указанием авторов). Анимации ударов, проджектайлы, переходы между сценами — придуманы и закодированы самостоятельно.",
    media: "/videos/3-void.mp4",
    mediaLabel: "Звук и анимации",
  },
  {
    id: "04",
    title: "Режим зрителя",
    text: "Можно зайти в чужое лобби и наблюдать за боем в реальном времени. SpectatorView — отдельный маршрут с полным отображением арены без возможности действовать.",
    media: "/images/4-void.webp",
    mediaLabel: "Spectator mode",
  },
  {
    id: "05",
    title: "Battle Restore Guard",
    text: "Если игрок перезагрузил страницу во время боя — приложение автоматически проверяет сервер и возвращает его в игру. Никаких потерянных матчей из-за случайного F5.",
    media: "/videos/5-void.mp4",
    mediaLabel: "Восстановление сессии",
  },
  {
    id: "06",
    title: "Интерфейс без макета",
    text: "Часть экранов не была в Figma-макете вообще. Арена, панель способностей, карточки бойцов на арене, лог действий, эффекты статусов — я придумал и сверстал самостоятельно.",
    media: "/videos/6-void.mp4",
    mediaLabel: "UI без ТЗ",
  },
];

const screenshots = [
  { src: "/videos/voidrealm.mov",label: "Главное меню", caption: "Список лобби, правила игры, flip-карточка", wide: true },
  { src: "/images/battle-page.webp",label: "Арена", caption: "Бой 1 на 1: фазы, бойцы, HP / энергия" },
  { src: "/images/squad-picker.webp",label: "Выбор отряда", caption: "Squad Picker — 3 бойца перед боем" },
  { src: "/images/view-page.webp",label: "Режим зрителя", caption: "Spectator View — наблюдение без участия" },
  { src: "/videos/game-over.mp4",label: "Экран победы", caption: "Game Over — анимация результата" },
];

export default function ProjectVoidRealm() {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  return (
    <article className="pvr">
      {/* ── BACK ── */}
      <Link to="/" state={{ scrollTo: "projects" }} className="pce__back ...">
        <span className="pvr__back-arrow">←</span> Назад к проектам
      </Link>

      {/* ── HERO + VIDEO ── */}
      <header className="pvr__hero">
        <div className="pvr__hero-inner">
          <div className="pvr__hero-left">
            <div className="pvr__hero-eyebrow">
              <span className="pvr__tag">React · WebSocket · Framer Motion</span>
              <span className="pvr__year">2026</span>
            </div>
            <h1 className="pvr__hero-title">
              <span className="pvr__title-void">Void</span>
              <span className="pvr__title-realm">Realm</span>
              <span className="pvr__title-sub">Battles</span>
            </h1>
            <p className="pvr__hero-desc">
              Браузерная карточная игра 1 на 1 в реальном времени —
              написана без ТЗ, без готового UI-кита,
              с нуля от игровой механики до звука
            </p>
            <div className="pvr__hero-actions">
              <a
                href="https://voidrealm-battles.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="pvr__cta pvr__cta--primary"
              >
                Играть сейчас <span className="pvr__cta-arrow">↗</span>
              </a>
              <span className="pvr__hero-note">нужен второй игрок или режим зрителя</span>
            </div>
          </div>
          <div className="pvr__hero-right">
            <div className="pvr__video-wrap">
              {!videoError ? (
                <video
                  ref={videoRef}
                  src="/videos/voidrealm.mov"
                  className="pvr__video"
                  controls
                  muted
                  playsInline
                  autoPlay
                  loop
                  onError={() => setVideoError(true)}
                />
              ) : (
                <div className="pvr__video-placeholder">
                  <span className="pvr__video-placeholder-text">▶ Видео с обзором игры</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── STAT BAR ── */}
      <div className="pvr__stats">
        <div className="pvr__stat">
          <span className="pvr__stat-num">8</span>
          <span className="pvr__stat-label">уникальных<br />бойцов</span>
        </div>
        <div className="pvr__stat-divider" />
        <div className="pvr__stat">
          <span className="pvr__stat-num">2</span>
          <span className="pvr__stat-label">фазы<br />за ход</span>
        </div>
        <div className="pvr__stat-divider" />
        <div className="pvr__stat">
          <span className="pvr__stat-num">3</span>
          <span className="pvr__stat-label">типа<br />урона</span>
        </div>
        <div className="pvr__stat-divider" />
        <div className="pvr__stat">
          <span className="pvr__stat-num">∞</span>
          <span className="pvr__stat-label">придумано<br />без макета</span>
        </div>
      </div>

      {/* ── ORIGIN STORY ── */}
      <section className="pvr__origin">
        <div className="pvr__origin-inner">
          <div className="pvr__origin-quote">
            <span className="pvr__quote-mark">"</span>
            <p className="pvr__quote-text">
              Нам надо карточную игру. Вот два серверных файла и макет в Фигме нескольких экранов.
            </p>
            <span className="pvr__quote-from">— всё техническое задание</span>
          </div>
          <div className="pvr__origin-text">
            <p>
              Это был вызов в чистом виде: минимальный бэкенд, половина экранов не задана, никаких требований к стеку. Я взял React, придумал архитектуру состояний, нарисовал в голове то, каким должен быть интерфейс — и построил игру.
            </p>
            <p>
              Звуки написаны с помощью нейросетей и библиотек свободного аудио. Анимации — через Framer Motion и CSS. Каждый игровой экран, который не был в макете, я придумал сам. И мне нравится, как вышло.
            </p>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="pvr__highlights">
        <h2 className="pvr__section-title">Что было сделано</h2>
        <div className="pvr__hl-grid">
          {highlights.map((item) => (
            <div key={item.id} className="pvr__hl-item">
              <div className="pvr__hl-media">
                {item.media ? (
                  isVideo(item.media) ? (
                    <video
                      src={item.media}
                      className="pvr__hl-img"
                      autoPlay
                      loop
                      muted
                      playsInline
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <img src={item.media} alt={item.title} className="pvr__hl-img" />
                  )
                ) : (
                  <div className="pvr__hl-placeholder">
                    <span>{item.mediaLabel}</span>
                  </div>
                )}
              </div>
              <div className="pvr__hl-body">
                <span className="pvr__hl-num">{item.id}</span>
                <strong className="pvr__hl-title">{item.title}</strong>
                <p className="pvr__hl-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCREENSHOTS ── */}
      <section className="pvr__screens">
        <h2 className="pvr__section-title">Скриншоты</h2>
        <div className="pvr__screens-grid">
          {screenshots.map((s, i) => (
            <figure
              key={i}
              className={`pvr__screen-item${s.wide ? " pvr__screen-item--wide" : ""}`}
            >
              {s.src ? (
                isVideo(s.src) ? (
                  <video
                    src={s.src}
                    className="pvr__screen-img"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                ) : (
                  <img src={s.src} alt={s.label} className="pvr__screen-img" />
                )
              ) : (
                <div className="pvr__screen-placeholder">
                  <span>{s.label}</span>
                </div>
              )}
              <figcaption className="pvr__screen-caption">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── HOW TO PLAY ── */}
      <section className="pvr__howto">
        <h2 className="pvr__section-title">Как играть</h2>
        <div className="pvr__howto-steps">
          {[
            ["01", "Создай лобби", "Нажми «+ Создать» в меню. Жди соперника."],
            ["02", "Выбери отряд", "3 разных бойца из ростера — твоя команда на весь бой."],
            ["03", "Ход: движение", "Подойти / отойти / ждать. Дистанция меняет доступные атаки."],
            ["04", "Ход: атака", "5 способностей + 3 спецдействия. Оба игрока делают выбор скрытно — результат одновременно."],
            ["05", "Победа", "Уничтожь весь отряд противника. Три бойца против трёх."],
          ].map(([num, title, text]) => (
            <div key={num} className="pvr__step">
              <span className="pvr__step-num">{num}</span>
              <div className="pvr__step-body">
                <strong className="pvr__step-title">{title}</strong>
                <p className="pvr__step-text">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STACK ── */}
      <section className="pvr__stack">
        <h2 className="pvr__section-title">Стек</h2>
        <div className="pvr__pills">
          {[
            "React 18",
            "React Router v6",
            "Framer Motion",
            "CSS Modules",
            "Vite",
            "WebSocket / Polling",
            "Web Audio API",
            "Canvas API",
            "sessionStorage",
            "Vercel",
          ].map((t) => (
            <span key={t} className="pvr__pill">{t}</span>
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <footer className="pvr__footer">
        <a
          href="https://voidrealm-battles.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="pvr__cta pvr__cta--primary pvr__cta--large"
        >
          Открыть игру <span className="pvr__cta-arrow">↗</span>
        </a>
        <Link to="/" state={{ scrollTo: "projects" }} className="pce__back ...">← Все проекты</Link>
      </footer>
    </article>
  );
}