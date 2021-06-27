import React from 'react';
import './AboutMe.css';
import myPhoto from '../../images/myPhoto.jpg';

function AboutMe() {
  return (
    <section className="aboutMe" id="aboutMe">
      <h1 className="aboutMe__title">Студентка</h1>
      <div className="aboutMe__biography">
        <div className="aboutMe__biography-info">
          <div className="aboutMe__biography-info-container">
            <h2 className="aboutMe__biography-title">Дарина</h2>
            <p className="aboutMe__biography-subtitle">WEB-разработчик, 30 лет</p>
            <p className="aboutMe__biography-description">
              Я родилась в Ленинграде, а живу в Петербурге. Отучилась на логиста (интермодальные перевозки и логистика) в СПбГУГА.
              Работаю по специальности, но планирую переквалифицироваться и уйти в IT. Замужем. Люблю животных, особенно коал. Есть домашние животные: 6 сахарных поссумов, 2 эублефара, 6 змей.
            </p>
          </div>
          <div className="aboutMe__links">
            <a
              href="https://vk.com/stern_m"
              className="aboutMe__link"
              target="_blank"
              rel="noreferrer"
            >
              VK
            </a>
            <a
              href="https://github.com/Stern-M"
              className="aboutMe__link"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
        <img src={myPhoto} alt="Это я" className="aboutMe__photo" />
      </div>
    </section>
  );
}

export default AboutMe;