import React, {useState, useEffect} from 'react';
import './Header.css';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import MainLogo from '../MainLogo/MainLogo';
import AccountBtn from '../AccountBtn/AccountBtn';

function Header () {
  const { pathname } = useLocation();
  const history = useHistory();

  // от определенной ширины задаем бургерную иконку
  const [width, setWidth] = useState(window.innerWidth);
  const updateCurrentWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateCurrentWidth);
    return () => window.removeEventListener('resize', updateCurrentWidth);
  });

  const [isBurger, setBurger] = useState(false);
  function handleBurgerOpen () {
    setBurger(!isBurger);
  }

  const isWidth = width <= 768

  if (pathname === '/') {
    return (
      <header className="header header-rose">
        < MainLogo />
        <div className="header__button-container">
          <button className="header__button-signup" onClick={() => { history.push("/signup") }}>Регистрация</button>
          <button className="header__button-signin" onClick={() => { history.push("/signin") }}>Войти</button>
        </div>
      </header>
    );
  }

  if (isWidth) {
    return (
    <header className="header header__overlay">
      < MainLogo />
      { isBurger ? (
        < BurgerMenu isOpen={true} closeHandler={handleBurgerOpen}/> ) : (
      <button onClick={handleBurgerOpen} type="click" className="header__burger-btn"></button>
      )}
    </header>
    );
  }

  return (
    <header className="header">
      < MainLogo />
      < Navigation />
      < AccountBtn />
    </header>
  )
};

export default Header;