import React from 'react';
import './AboutMe.css';
import myPhoto from '../../images/myPhoto';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className="aboutMe" id="aboutMe-anchor">
      <h1 className="aboutMe__title">Студентка</h1>
      <div className="aboutMe__bio-wrapper">
        <div className="aboutMe__bio-information">
          <div className="aboutMe__bio-information-container">
            <h2 className="aboutMe__bio-title">Дарина</h2>
            <p className="aboutMe__bio-subtitle">WEB-разработчик, 30 лет</p>
            <p className="aboutMe__bio-text">
              Я родилась в Ленинграде, а живу в Петербурге. Отучилась на логиста (интермодальные перевозки и логистика) в СПбГУГА.
              Работеаю по спецциальности, но планирую переквалифицироваться и уйти в IT. Замужем. Люблю животных, особенно коал. Есть домашние животные: 6 сахарных поссумов, 2 эублефара, 6 змей.
            </p>
          </div>
          <div className="aboutMe__links-container">
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
      <Portfolio />
    </section>
  );
}

export default AboutMe;