import React, { useEffect } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import useFormWithValidation from "../../helpers/Validation";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    setIsValid,
  } = useFormWithValidation();

  useEffect(() => {
    setValues(currentUser);
    setIsValid(true);
  }, [currentUser, setValues, setIsValid]);


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(values)
  }

  return (
    <>
      <Header isLogged={props.loggedIn}/>
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, {props.currentUser.name}!</h1>
          <form className="profile__form"  onSubmit={handleSubmit} noValidate>
            <label className="profile__label" htmlFor="name">Имя
              <input
                className="profile__input"
                id="name"
                placeholder="name"
                value={values.name || ''}
                required
                minLength="2"
                maxLength="30"
                name="name"
                onChange={handleChange}
                autoComplete="off"
                type="text"
                />
              <span className="profile__form-error">{errors.name}</span>
            </label>
            <label className="profile__label" htmlFor="email">Почта
              <input
                placeholder="email"
                required
                name="email"
                type="email"
                value={values.email || ''}
                className="profile__input"
                id="email"
                onChange={handleChange}
                autoComplete="off"
                />
                <span className="profile__form-error">{errors.email}</span>
            </label>
            
            <button
              type="submit"
              className={(isValid && (values.name !== currentUser.name
                || values.email !== currentUser.email))
                ? 'profile__edit profile__edit-active'
                : 'profile__edit'}
              disabled={(values.name === currentUser.name
                && values.email === currentUser.email) || !isValid}
              >Редактировать</button>
            <button className="profile__logout" type="button" onClick={props.onLogOut}>Выйти из аккаунта</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;