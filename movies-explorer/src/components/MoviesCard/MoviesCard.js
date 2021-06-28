import React from 'react';
import { useLocation } from 'react-router';
import './MoviesCard.css';
import saveIcon from '../../images/save-icon.svg';
import delIcon from '../../images/del-icon.svg';
import savedIcon from '../../images/saved-icon.svg';


function MoviesCard({movie, addToSaved, isMovieAdded, saveDeleteMovieHandler}) {
  const { pathname } = useLocation();
  
  const {
    nameRU, duration, trailer, image,
  } = movie;

  const isAdded = (pathname === "/saved-movies" ? true : isMovieAdded(movie)) ;
  const saveIconButton = (isAdded ? savedIcon : saveIcon)
  const cardIcon = (pathname === "/movies" ? saveIconButton : delIcon)

  function handleIconClick(evt) {
    evt.preventDefault();
    saveDeleteMovieHandler(movie, movie._id, isAdded);
  };
  
  return (
    <li className="movie">
      <div className="movie__container">
        <div className="movie__description">
          <h3 className="movie__title">{nameRU}</h3>
          <span className="movie__duration">{duration} мин.</span>
        </div>
        <button type="button" className="movie__button" >
          <img src={cardIcon} alt="избранное" className="movie__save-icon" onClick={handleIconClick}/>
        </button>
        
      </div>
      <img src={image} alt={nameRU} className="movie__image" />
      
    </li>
  );
}

export default MoviesCard