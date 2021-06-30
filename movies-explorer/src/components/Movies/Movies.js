import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from '../Preloader/Preloader';

function Movies({
  loggedIn,
  findMovie,
  handleShortFilter,
  shortMovies,
  shortFilter,
  findedMovies,
  moviesAmount,
  setMoviesAmount,
  firstSearch,
  addToSaved,
  isMovieAdded,
  loader,
  saveDeleteMovieHandler,
  removeFromSaved,
  loadingError}) {

  return(
    <>
      < Header isLogged={loggedIn}/>
      < SearchForm
          findMovie={findMovie}
          shortFilter={handleShortFilter}/>
      < MoviesCardList
          movies={shortFilter ? shortMovies(findedMovies) : findedMovies}
          moviesAmount={moviesAmount}
          setMoviesAmount={setMoviesAmount}
          search={firstSearch}
          addToSaved={addToSaved}
          isMovieAdded={isMovieAdded}
          saveDeleteMovieHandler={saveDeleteMovieHandler}
          removeFromSaved={removeFromSaved}
          loadingError={loadingError}/>
      < Preloader loader={loader}/>
      < Footer />
    </>
  )
}
export default Movies