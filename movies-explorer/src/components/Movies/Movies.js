import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from '../Preloader/Preloader';
import { moviesApi } from '../../utils/MoviesApi'

function Movies(props) {
  const [loader, setLoader] = useState(false)
  const [allMovies, setAllMovies] = useState([]);
  const [findedMovies, setFindedMoves] = useState([]);
  const [moviesAmount, setMoviesAmount] = useState({startCard: 0, rowCard: 0, moreCard: 0})

  //запрос всех фильмов
  useEffect(() => {
    if (props.loggedIn) {
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
        console.log(allMovies)
      })
      .catch((err) => {
        console.log(err);
      });}
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
    showExactMoviesAmount()
    setLoader(true)
    const searchFilms = allMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(search.toLowerCase())
    })
    console.log(allMovies)
    setFindedMoves(searchFilms)
    setLoader(false)
  }

  return(
    <>
      < Header isLogged={props.loggedIn}/>
      < SearchForm findMovie={findMovie}/>
      < MoviesCardList movies={findedMovies} moviesAmount={moviesAmount} setMoviesAmount={setMoviesAmount}/>
      < Preloader loader={loader}/>
      < Footer />
    </>
  )
}
export default Movies