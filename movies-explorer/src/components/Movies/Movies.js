import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from '../Preloader/Preloader';
import { moviesApi } from '../../utils/MoviesApi'
import { api } from "../../utils/MainApi";

function Movies(props) {
  const [firstSearch, setFirstSearch] = useState(true);
  const [loader, setLoader] = useState('')
  const [allMovies, setAllMovies] = useState([]);
  const [findedMovies, setFindedMoves] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesAmount, setMoviesAmount] = useState({startCard: 0, rowCard: 0, moreCard: 0});
  const [shortFilter, setShortFilter] = useState(false);

  function handleShortFilter() {
    setShortFilter(!shortFilter)
  }

  //запрос всех фильмов
  useEffect(() => {
    if (props.loggedIn) {
      setLoader('preloader_active')
      moviesApi.getAllMovies()
      .then((movies) => {
        setAllMovies(movies.map((item) => {
          const imageURL = item.image ? item.image.url : '';
          return {
            ...item,
            image: `https://api.nomoreparties.co${imageURL}`,
            trailer: item.trailerLink,
          };
        }))
        localStorage.setItem('movies', JSON.stringify(movies))
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoader(''));}
  }, [props.loggedIn]);

  //показ определенного кол-ва карточек с фильмами
  function showExactMoviesAmount(){
    if(window.screen.width < 400){
      setMoviesAmount({startCard: 5, rowCard: 1, moreCard: 2})
    } else if(window.screen.width < 768){
      setMoviesAmount({startCard: 8, rowCard: 2, moreCard: 2})
    } else {
      setMoviesAmount({startCard: 12, rowCard: 3, moreCard: 3})
    }
  }

  //поиск фильмов среди всех фильмов
  function findMovie(search) {
    setFirstSearch(false)
    setLoader('preloader_active')
    showExactMoviesAmount()
    const searchFilms = allMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(search.toLowerCase())
    })
    setFindedMoves(searchFilms)
    setLoader('')
  }

  //поиск короткометражек среди отфильтрованных фильмов
  const shortMovies = (findedMovies) => findedMovies.filter((movie) =>  movie.duration < 40)

  //добавление в сохраненные
  function addToSaved(movie) {
    api
      .addToSavedMovies(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  return(
    <>
      < Header isLogged={props.loggedIn}/>
      < SearchForm
          findMovie={findMovie}
          shortFilter={handleShortFilter}/>
      < MoviesCardList
          movies={shortFilter ? shortMovies(findedMovies) : findedMovies}
          moviesAmount={moviesAmount}
          setMoviesAmount={setMoviesAmount}
          search={firstSearch}
          addToSaved={addToSaved}
          isMovieAdded={props.isMovieAdded}/>
      < Preloader loader={loader}/>
      < Footer />
    </>
  )
}
export default Movies