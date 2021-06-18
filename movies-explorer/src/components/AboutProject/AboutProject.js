import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="aboutProject" id="aboutProject">
      <h2 className="aboutProject__title">О проекте</h2>
      <div className="aboutProject__container">
        <div className="aboutProject__div">
          <h3 className="aboutProject__div-title">Дипломный проект включал 5 этапов</h3>
          <p className="aboutProject__div-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="aboutProject__div">
          <h3 className="aboutProject__div-title">На выполнение диплома ушло 5 недель</h3>
          <p className="aboutProject__div-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="aboutProject__schedule">
        <div className="aboutProject__back-weeks">1 неделя</div>
        <div className="aboutProject__front-weeks">4 недели</div>
        <div className="aboutProject__back-title">Back-end</div>
        <div className="aboutProject__front-title">Front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;