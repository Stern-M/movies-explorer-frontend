import React from 'react';
import { useLocation } from 'react-router';
import './MoviesCard.css';
import saveIcon from '../../images/save-icon.svg';
import delIcon from '../../images/del-icon.svg';
import savedIcon from '../../images/saved-icon.svg';


function MoviesCard({movie, isMovieAdded, saveDeleteMovieHandler}) {
  const { pathname } = useLocation();
  
  const {
    nameRU, duration, trailer, image,
  } = movie;

  function setDuration() {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return `${hours > 0 ? `${hours}ч ` : ''}${minutes}м`
  }

  const isAdded = (pathname === "/saved-movies" ? true : isMovieAdded(movie)) ;
  const saveIconButton = (isAdded ? savedIcon : saveIcon)
  const cardIcon = (pathname === "/movies" ? saveIconButton : delIcon)

  function handleIconClick(evt) {
    evt.preventDefault();
    saveDeleteMovieHandler(movie, isAdded);
  };
  
  return (
    <li className="movie">
      <div className="movie__container">
        <div className="movie__description movie__meta-container">
          <h3 className="movie__title">{nameRU}</h3>
          <span className="movie__duration">{setDuration()}</span>
        </div>
        <button type="button" className="movie__button" >
          <img src={cardIcon} alt="избранное" className="movie__save-icon" onClick={handleIconClick} />
        </button>
      </div>
      <a href={trailer} className="card__trailer-link" rel="noreferrer" target="_blank">
        <img src={image} alt={nameRU} className="movie__image" />
      </a>
    </li>
  );
}

export default MoviesCard