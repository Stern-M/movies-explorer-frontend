import React, { useEffect } from "react";
import "./Register.css"
import { useHistory } from 'react-router-dom';
import MainLogo from "../MainLogo/MainLogo";
import useFormWithValidation from "../../helpers/Validation";

function Register(props) {
	const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation();
	const formWithValidation = useFormWithValidation();
  const { name, email, password } = values;

	useEffect(() => {
    resetForm();
  }, [resetForm]);


  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(password, email, name);
		formWithValidation.resetForm();
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
						noValidate
						className={`register__input ${errors.name && 'register__input_error'}`}
						required
						minLength="2"
						maxLength="30"
						name="name"
						type="text"
						placeholder="Имя"
						onChange={handleChange}
						value={values.name || ''}
						autoComplete="off"
						></input>
					<span className="register__error">{errors.name}</span>
				
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
				
				<label className="register__caption">пароль</label>
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
					disabled={!isValid}>Зарегистрироваться</button>
				<p className="register__signin-caption">Уже зарегистрированы?<button type="button" className="register__signin-btn" onClick={() => { history.push("/signin") }}>Войти</button></p>
			</form>
		</section>
	)
}
export default Register