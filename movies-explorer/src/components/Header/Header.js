import React, { useState, useEffect } from 'react';
import './Header.css';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

import {
  HOME_LINK, projectName,
  SING_IN_LINK,
  SING_UP_LINK,
} from '../../../utils/config';
import logo from '../../images/logo.svg';
import Navigation from './Navigation/Navigation';

function Header () {
  const { pathname } = useLocation();
  const [isMenu, setIsMenu] = useState(false);

  const isMenuHandle = () => {
    setIsMenu(!isMenu);
  };

  useEffect(() => {
    setIsMenu(false);
  }, [pathname]);

  if (pathname === '/') {
    return (
      <header className="header header_theme_blue">
        <img className="header__logo" src={logo} alt="логотип"></img>
        <nav className="header__menu">
          <NavLink
            className="header__link header__link-signup"
            to={SING_UP_LINK}
          >
            Регистрация
          </NavLink>
          <NavLink
            className="header__link header__link-signin"
            to={SING_IN_LINK}
          >
            Войти
          </NavLink>
        </nav>
      </header>
    );
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип"></img>
      <div className={` ${isMenu ? 'header__menu-container' : ''}`} />
      <Navigation
        isMenu={isMenu}
      />
      <button
        type="button"
        className={`header__button-menu ${isMenu ? 'header__button-menu-close' : ''}`}
        onClick={isMenuHandle}
        aria-label={!isMenu ? 'Открыть меню' : 'Закрыть меню'}
      />
    </header>

  );
};

export default Header;