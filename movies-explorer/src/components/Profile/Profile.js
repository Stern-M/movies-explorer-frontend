import React, { useState } from "react";
import "./Profile.css";
import Header from "../Header/Header";

function Profile(props) {
  const [userName, setUserName] = useState(props.currentUser.name)
  const [userEmail, setUserEmail] = useState(props.currentUser.email)

  function handleChangeName(e) {
    setUserName(e.target.value);
  }

  function handleChangeEmail(e) {
    setUserEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(userName, userEmail)
    console.log(userName, userEmail)
  }

  return (
    <>
      <Header isLogged={props.loggedIn}/>
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, {props.currentUser.name}!</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <label className="profile__label" htmlFor="name">Имя
              <input
                placeholder="name"
                value={userName}
                className="profile__input"
                id="name"
                onChange={handleChangeName}/>
            </label>
            <label className="profile__label" htmlFor="email">Почта
              <input
                placeholder="email"
                value={userEmail}
                className="profile__input"
                id="email"
                onChange={handleChangeEmail}/>
            </label>
            <button
              className="profile__edit"
              type="submit"
              >Редактировать</button>
            <button className="profile__logout" type="button" onClick={props.onLogOut}>Выйти из аккаунта</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;