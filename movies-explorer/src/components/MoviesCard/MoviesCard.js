import React from 'react';
// import { useLocation } from 'react-router';
import './MoviesCard.css';
import saveIcon from '../../images/save-icon.svg';
import delIcon from '../../images/del-icon.svg';
import savedIcon from '../../images/saved-icon.svg';
import testImage from '../../images/movie-image.svg'


function MoviesCard() {
  // const { pathname } = useLocation();
  const pathname = '/movies';
  const isAdded = true;
  const saveIconButton = (isAdded ? savedIcon : saveIcon)
  const cardIcon = (pathname === "/movies" ? saveIconButton : delIcon)
  
  return (
    <li className="movie">
      <div className="movie__container">
        <div className="movie__description">
          <h3 className="movie__title">33 слова о дизайне</h3>
          <span className="movie__duration">1ч 47м</span>
        </div>
        <button type="button" className="movie__button" >
          <img src={cardIcon} alt="избранное" className="movie__save-icon"/>
        </button>
        
      </div>
      <img src={testImage} alt="Тестовое изображение" className="movie__image" />
      
    </li>
  );
}

export default MoviesCard