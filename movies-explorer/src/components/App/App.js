import React, { useEffect } from 'react';
// import {
//   Route, Switch, useHistory, useLocation,
// } from 'react-router-dom';
import logo from '../../../src/logo.svg';
import '../../components/App/App.css';
import Promo from '../Promo/Promo';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';

function App() {
  return (
    <div className="App">
      < Promo />
      < AboutProject />
      < Techs />
      < AboutMe />
    </div>
  );
}

export default App;
