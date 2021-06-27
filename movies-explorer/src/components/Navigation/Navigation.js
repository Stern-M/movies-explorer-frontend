import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__list-item">
          <Link className="navigation__movies" to="/movies">
            Фильмы
          </Link>
        </li>
        <li className="navigation__list-item"> 
          <Link className="navigation__saved-movies" to="/saved-movies">
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;