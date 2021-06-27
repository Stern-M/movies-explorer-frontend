import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  if (props.movies.length === 0) {
    return (
      <section className="movies">
        <p className="movies__not-found">Ничего не найдено</p>
      </section>
    )
  }

  return (
    <section className="movies">
      <ul className="movies__list">
        {props.movies.slice(0, props.moviesAmount.startCard).map(card => {
          return <MoviesCard {...card} />
        })}
      </ul>
      <button
        className={`movies__button ${props.moviesAmount.startCard < props.movies.length? "": "movies__button_hidden"}`}
        type="button"
        onClick={()=>{
          props.setMoviesAmount({...props.moviesAmount, startCard: props.moviesAmount.startCard + props.moviesAmount.moreCard})
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