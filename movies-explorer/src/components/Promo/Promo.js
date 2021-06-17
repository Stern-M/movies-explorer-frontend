import './Promo.css';
import React from 'react';

import logo from '../../images/landing-logo.svg';

const Promo = () => (
  <section className="promo">
    <img src={logo} className="promo__logo" alt="Логотип WEB" />
    <div className="promo__info">
      <h1 className="promo__title">
        Учебный проект студента факультета
        {' '}
        <span className="promo__together">Веб-разработки</span>
        .
      </h1>
      <p className="promo__description">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
    </div>
    <a href="#aboutProject" className="promo__link">Узнать больше</a>
  </section>
);

export default Promo;