import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './MainLogo.css';

function MainLogo () {
  return (
    <NavLink exact to="/" className="main__logo-container">
      <img className="main__logo" src={logo} alt="logo" />
    </NavLink>
  )
};

export default MainLogo;