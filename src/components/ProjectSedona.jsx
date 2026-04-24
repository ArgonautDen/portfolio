import React from "react";
import "./ProjectSedona.css";

export default function ProjectSedona() {
  return (
    <section className="project-sedona">
      <h1 className="project-sedona__title">Проект «Sedona» — Вёрстка туристического сайта</h1>

      {/* Видео-блок */}
      <div className="project-sedona__video">
        {/* Замените на тег <video> или iframe по необходимости */}
        <div className="project-sedona__video-placeholder">
          Видео с обзором проекта
        </div>
      </div>

      {/* Ссылка на сайт */}
      <div className="project-sedona__link-container">
        <a
          href="https://example.com" // замените на реальный URL проекта
          target="_blank"
          rel="noreferrer noopener"
          className="project-sedona__link"
        >
          Перейти на сайт проекта
        </a>
      </div>

      {/* Описание проекта */}
      <div className="project-sedona__description">
        <p>
          В этом проекте я сверстал двухстраничный туристический сайт «Sedona» по
          макету и стайлгайду, уделив особое внимание точности, аккуратности и
          соответствию техническому заданию. Вёрстка выполнена на чистом HTML и CSS
          без использования фреймворков, с учётом прогрессивного улучшения и
          кроссбраузерной поддержки в Chrome, Firefox и Safari.
        </p>

        <p>
          Основной задачей было не просто перенести дизайн в код, а сохранить
          визуальную логику интерфейса и пользовательский сценарий. Для этого я
          реализовал центрированную контентную область с фирменным серым фоном по
          бокам, корректно собрал шапку с интерактивными элементами, проработал
          типографику на шрифте PT Sans и точно воспроизвёл ключевые блоки главной
          страницы, включая hero-секцию с полноразмерным изображением и белой маской
          внизу.
        </p>

        <p>
          Отдельное внимание было уделено каталогу: я собрал фильтр, сортировку,
          интерактивные элементы рендж-слайдера и пагинацию, а также настроил
          поведение кнопок и ссылок в соответствии с требованиями макета. Дополнительно
          была реализована форма подписки с валидацией и отправкой данных на тестовый
          сервер.
        </p>

        <p>
          В результате получился аккуратный, стабильный и полностью соответствующий ТЗ
          проект, который демонстрирует уверенное владение HTML и CSS, внимание к
          деталям и умение доводить интерфейс до качественного финального результата.
        </p>
      </div>

      {/* Ключевые достижения */}
      <h2 className="project-sedona__subheading">Ключевые достижения</h2>

      <ul className="project-sedona__achievements">
        <li className="achievement">
          <div className="achievement__thumb">
            <img
              src="https://via.placeholder.com/80" // здесь можно подставить миниатюру
              alt="Адаптивная вёрстка"
              className="achievement__img"
            />
          </div>
          <div className="achievement__content">
            <strong>Адаптивная чистая вёрстка.</strong> Сверстал две страницы — главную и каталог — строго по макету и техническому заданию.
          </div>
        </li>

        <li className="achievement">
          <div className="achievement__thumb">
            <img
              src="https://via.placeholder.com/80" 
              alt="Интерактивные элементы шапки"
              className="achievement__img"
            />
          </div>
          <div className="achievement__content">
            <strong>Интерактивные элементы шапки.</strong> Настроил счётчик избранного и переходы по иконкам и кнопкам в соответствии с ТЗ.
          </div>
        </li>

        <li className="achievement">
          <div className="achievement__thumb">
            <img
              src="https://via.placeholder.com/80"
              alt="Форма подписки"
              className="achievement__img"
            />
          </div>
          <div className="achievement__content">
            <strong>Форма подписки с валидацией.</strong> Внедрил клиентскую проверку и отправку данных на тестовый сервер.
          </div>
        </li>

        <li className="achievement">
          <div className="achievement__thumb">
            <img
              src="https://via.placeholder.com/80"
              alt="Фильтр и сортировка каталога"
              className="achievement__img"
            />
          </div>
          <div className="achievement__content">
            <strong>Фильтр и сортировка каталога.</strong> Собрал функциональные фильтры, рендж-слайдеры и пагинацию с корректной логикой.
          </div>
        </li>

        <li className="achievement">
          <div className="achievement__thumb">
            <img
              src="https://via.placeholder.com/80"
              alt="Кроссбраузерность"
              className="achievement__img"
            />
          </div>
          <div className="achievement__content">
            <strong>Кроссбраузерная совместимость.</strong> Обеспечил стабильную работу во всех популярных браузерах без сторонних библиотек.
          </div>
        </li>
      </ul>
    </section>
  );
}
