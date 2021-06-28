import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({
  findedMovies,
  firstSearch,
  moviesAmount,
  setMoviesAmount,
  shortFilter,
  shortMovies,
  loggedIn,
  findMovie,
  handleShortFilter,
  saveDeleteMovieHandler}) {

  return (
    <>
      < Header isLogged={loggedIn}/>
      < SearchForm
          findMovie={findMovie}
          shortFilter={handleShortFilter} />
      < MoviesCardList
          movies={shortFilter ? shortMovies(findedMovies) : findedMovies}
          moviesAmount={moviesAmount}
          setMoviesAmount={setMoviesAmount}
          search={firstSearch}
          saveDeleteMovieHandler={saveDeleteMovieHandler}/>
      < Footer />
    </>
  )
}
export default SavedMovies