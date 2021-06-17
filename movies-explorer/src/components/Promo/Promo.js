import './Promo.css';
import React from 'react';

import logo from '../../images/landing-logo.svg';

const Promo = () => (
  <section className="promo">
    <img src={logo} className="promo__logo" alt="Логотип WEB" />
    <div className="promo__info">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <p className="promo__subtitle">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
    </div>
    <a href="#aboutProject" className="promo__link">Узнать больше</a>
  </section>
);

export default Promo;