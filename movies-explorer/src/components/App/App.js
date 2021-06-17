import React, { useEffect } from 'react';
// import {
//   Route, Switch, useHistory, useLocation,
// } from 'react-router-dom';
import logo from '../../../src/logo.svg';
import '../../components/App/App.css';
import Promo from '../Promo/Promo';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';

function App() {
  return (
    <div className="App">
      < Promo />
      < AboutProject />
      < AboutMe />
    </div>
  );
}

export default App;
