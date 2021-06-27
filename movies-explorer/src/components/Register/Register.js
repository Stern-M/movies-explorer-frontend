import React, { useState } from "react";
import "./Register.css"
import { useHistory } from 'react-router-dom';
import MainLogo from "../MainLogo/MainLogo";

function Register(props) {
	const [userPassword, setUserPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
	const [userName, setUserName] = useState('')

  function handleChangePassword(e) {
    setUserPassword(e.target.value);
  }

  function handleChangeEmail(e) {
    setUserEmail(e.target.value);
  }

	function handleChangeName(e) {
    setUserName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(userPassword, userEmail, userName)
  }
	const history = useHistory()
	
	return (
		<section className="register">
			<header className="register__header">
				< MainLogo />
			</header>
			<form className="register__form" onSubmit={handleSubmit} noValidate>
				<h1 className="register__title">Добро пожаловать!</h1>
				<label className="register__caption">имя</label>
				<input
					type="text"
					className="register__input"
					required
					value={userName}
					onChange={handleChangeName}
					></input>
				<label className="register__caption">E-mail</label>
				<input
					type="email"
					className="register__input"
					required
					value={userEmail}
					onChange={handleChangeEmail}></input>
				<label className="register__caption">пароль</label>
				<input
					type="password"
					className="register__input"
					required
					value={userPassword}
					onChange={handleChangePassword}></input>
				<button type="submit" className="register__signup-btn">Зарегистрироваться</button>
				<p className="register__signin-caption">Уже зарегистрированы?<button type="button" className="register__signin-btn" onClick={() => { history.push("/signin") }}>Войти</button></p>
			</form>
		</section>
	)
}
export default Register