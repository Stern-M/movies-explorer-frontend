import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({movies, moviesAmount, setMoviesAmount, search, addToSaved, isMovieAdded}) {
  if (search) {
    return (
      <section className="movies">
        <p className="movies__not-found">Начнем поиск?</p>
      </section>
    )
  }

  if (movies.length === 0) {
    return (
      <section className="movies">
        <p className="movies__not-found">Ничего не найдено</p>
      </section>
    )
  }

  return (
    <section className="movies">
      <ul className="movies__list">
        {movies.slice(0, moviesAmount.startCard).map(card => {
          return <MoviesCard movie={card} addToSaved={addToSaved} isMovieAdded={isMovieAdded}/>
        })}
      </ul>
      <button
        className={`movies__button ${moviesAmount.startCard < movies.length? "": "movies__button_hidden"}`}
        type="button"
        onClick={()=>{
          setMoviesAmount({...moviesAmount, startCard: moviesAmount.startCard + moviesAmount.moreCard})
      }}>Ещё</button>
    </section>
  );
}

export default MoviesCardList;



// function MoviesCardList() {
//   return (
//     <section className="movies">
//       <p className="movies__not-found">Ничего не найдено</p>
//       <ul className="movies__list">
//         <MoviesCard isAdded={true}/>
//         <MoviesCard isAdded={false}/>
//         <MoviesCard isAdded={true}/>
//         <MoviesCard isAdded={false}/>
//       </ul>
//       <button className="movies__button" type="button">Ещё</button>
//     </section>
//   );
// }

// export default MoviesCardList;