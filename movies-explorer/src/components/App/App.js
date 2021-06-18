import React, { useEffect } from 'react';
// import {
//   Route, Switch, useHistory, useLocation,
// } from 'react-router-dom';
import '../../components/App/App.css';
import Promo from '../Promo/Promo';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App">
      {/* < Promo />
      < AboutProject />
      < Techs /> */}
      < AboutMe />
      {/* < Portfolio />
      < Footer /> */}
    </div>
  );
}

export default App;
