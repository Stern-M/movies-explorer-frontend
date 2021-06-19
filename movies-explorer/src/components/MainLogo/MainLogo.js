import React from 'react';
import logo from '../../images/logo.svg';
import './MainLogo.css';

function MainLogo () {
  return (
    <div className="main__logo-container">
      <img className="main__logo" src={logo} alt="logo" />
    </div>
  )
};

export default MainLogo;