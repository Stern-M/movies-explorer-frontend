import React from 'react';
import { NavLink } from 'react-router-dom';
import './AccountBtn.css';

function AccountBtn() {
  return (
    <NavLink to="/profile" className="account-button">
      Аккаунт
      <div className="account-button__logo" />
    </NavLink>
  );
}

export default AccountBtn;