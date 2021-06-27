import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="movies">
      <p className="movies__not-found">Ничего не найдено</p>
      <ul className="movies__list">
        <MoviesCard isAdded={true}/>
        <MoviesCard isAdded={false}/>
        <MoviesCard isAdded={true}/>
        <MoviesCard isAdded={false}/>
      </ul>
      <button className="movies__button" type="button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;