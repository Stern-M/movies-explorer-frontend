import React from 'react';
import './BurgerMenuBtn.css';

function BurgerMenuBtn(props) {
  return (
    <button className="burger-button" onClick={props.handleClick} type="button" />
  );
}

export default BurgerMenuBtn;