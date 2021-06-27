import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { api } from "../../utils/MainApi";

function SavedMovies(props) {
  const [savedMovies, setSavedMovies] = useState('');
  const [moviesAmount, setMoviesAmount] = useState({startCard: 0, rowCard: 0, moreCard: 0});

  function showExactMoviesAmount(){
    if(window.screen.width < 400){
      setMoviesAmount({startCard: 5, rowCard: 1, moreCard: 2})
    } else if(window.screen.width < 768){
      setMoviesAmount({startCard: 8, rowCard: 2, moreCard: 2})
    } else {
      setMoviesAmount({startCard: 12, rowCard: 3, moreCard: 3})
    }
  }

  function getSavedMovies() {
    api
      .getSavedMovies()
      .then((data) => {
        const savedArray = data.map((item) => ({ ...item, id: item.movieId }));
        localStorage.setItem('savedMovies', JSON.stringify(savedArray));
        setSavedMovies(savedArray);
      })
      .catch(() => {
        // setLoadingError('Во время запроса произошла ошибка. '
        //   + 'Возможно, проблема с соединением или сервер недоступен. '
        //   + 'Подождите немного и попробуйте ещё раз');
      });
  };

  useEffect(() => {
    getSavedMovies()
  }, [])

  return (
    <>
      < Header isLogged={props.loggedIn}/>
      <SearchForm />
      <MoviesCardList
        movies={savedMovies}
        moviesAmount={moviesAmount}
        setMoviesAmount={setMoviesAmount}/>
      <Footer />
    </>
  )
}
export default SavedMovies