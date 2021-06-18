import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__copyrights">
        <p className="footer__copyright">&copy; 2021</p>
        <ul className="footer__links">
          <li className="footer__link">
            <a
              href="https://praktikum.yandex.ru"
              className="footer__link-class"
              target="_blank"
              rel="noreferrer"
            >Яндекс.Практикум</a>
          </li>
          <li className="footer__link">
            <a
              href="https://github.com/Stern-M"
              className="footer__link-class"
              target="_blank"
              rel="noreferrer"
            >Github</a>
          </li>
          <li className="footer__link">
            <a
              href="https://vk.com/stern_m"
              className="footer__link-class"
              target="_blank"
              rel="noreferrer"
            >VK</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;