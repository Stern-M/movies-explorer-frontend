import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__list-item">
          <NavLink className="navigation__movies" activeClassName="navigation__movies_active" to="/movies">
            Фильмы
          </NavLink>
        </li>
        <li className="navigation__list-item"> 
          <NavLink className="navigation__movies" activeClassName="navigation__movies_active" to="/saved-movies">
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;