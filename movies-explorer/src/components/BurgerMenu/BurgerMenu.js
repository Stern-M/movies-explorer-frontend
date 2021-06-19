import React from 'react';
import { NavLink } from 'react-router-dom';
import AccountBtn from '../AccountBtn/AccountBtn';
import './BurgerMenu.css';

function BurgerMenu(props) {
  return (
    <div className={`burger-menu ${props.isOpen ? 'burger-menu_is-open' : ''}`}>
      <button
        className="burger-menu__close-btn"
        type="button"
        onClick={props.closeHandler}
        tabIndex={0}
      />
      <div className="burger-menu__link-list">
        <NavLink exact to="/"
          className="burger-menu__link"
          activeClassName="burger-menu__link_is-active"
        >Главная</NavLink>
        <NavLink to="/movies"
          className="burger-menu__link"
          activeClassName="burger-menu__link_is-active"
        >Фильмы</NavLink>
        <NavLink to="/saved-movies"
          className="burger-menu__link"
          activeClassName="burger-menu__link_is-active"
        >Сохранённые фильмы</NavLink>
      </div>
      < AccountBtn />
    </div>
  );
}

export default BurgerMenu;