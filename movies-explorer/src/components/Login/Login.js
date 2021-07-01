import React, { useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import "../Register/Register.css";
import MainLogo from '../MainLogo/MainLogo';
import useFormWithValidation from "../../helpers/Validation";

function Login(props) {
  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation();
	const formWithValidation = useFormWithValidation();
  const { email, password } = values;

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(password, email);
    formWithValidation.resetForm();
  }

  const history = useHistory()

  return (
    <section className="register">
      <header className="register__header">
        < MainLogo />
      </header>
      <form className="register__form" onSubmit={handleSubmit} noValidate>
        <h1 className="register__title">Рады видеть!</h1>
        <label className="register__caption">E-mail</label>
        <input
          className={`register__input ${errors.name && 'register__input_error'}`}
          required
          name="email"
          type="email"
          placeholder="Почта"
          onChange={handleChange}
          value={values.email || ''}
          autoComplete="off"></input>
        <span className="register__error">{errors.email}</span>
        <label className="register__caption">Пароль</label>
        <input
          className={`register__input ${errors.name && 'register__input_error'}`}
          required
          name="password"
          type="password"
          minLength="8"
          placeholder="Пароль"
          onChange={handleChange}
          value={values.password || ''}
          autoComplete="off"></input>
        <span className="register__error">{errors.password}</span>
        <button
          type="submit"
          className={isValid ? 'register__signup-btn register__signup-btn-active' : 'register__signup-btn'}
          disabled={!isValid}>Войти</button>
        <p className="register__signin-caption">Ещё не зарегистрированы?<button type="button" className="register__signin-btn" onClick={() => { history.push("/signup") }}>Регистрация</button></p>
      </form>
    </section>
  )
}
export default Login