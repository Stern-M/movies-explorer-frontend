import React, { useEffect } from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import '../../components/App/App.css';
import Promo from '../Promo/Promo';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Error404Page from '../Error404Page/Error404Page';
import Login from '../Login/Login';

function App() {
  return (
    <div className="App">
      {/* < Promo />
      < AboutProject />
      < Techs />
      < AboutMe />
      < Portfolio />
      < Footer />
      < SearchForm />
      < MoviesCard />
      < MoviesCardList />
      < Movies />
      < SavedMovies />
      < Profile />
      <Error404Page /> */}
      < Login />
    </div>
  );
}

export default App;
