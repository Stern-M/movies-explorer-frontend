import React from 'react';
import { useHistory } from 'react-router-dom';
import "../Register/Register.css";
import MainLogo from '../MainLogo/MainLogo';

function Login() {
  const history = useHistory()
  return (
    <section className="register">
      <header className="register__header">
        < MainLogo />
      </header>
      <form className="register__form">
        <h1 className="register__title">Рады видеть!</h1>
        <label className="register__caption">E-mail</label>
        <input type="email" className="register__input" required></input>
        <label className="register__caption">Пароль</label>
        <input type="password" className="register__input" required></input>
        <button type="submit" className="register__signup-btn">Войти</button>
        <p className="register__signin-caption">Ещё не зарегистрированы?<button type="button" className="register__signin-btn" onClick={() => { history.push("/signup") }}>Регистрация</button></p>
      </form>
    </section>
  )
}
export default Login