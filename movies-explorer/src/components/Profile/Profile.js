import React from "react";
import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, name!</h1>
        <form className="profile__form">
          <label className="profile__label" htmlFor="name">Имя
            <input placeholder="name" className="profile__input" id="name" />
          </label>
          <label className="profile__label" htmlFor="email">Почта
            <input placeholder="email" className="profile__input" id="email" />
          </label>
          <button className="profile__edit" type="submit">Редактировать</button>
          <button className="profile__logout" type="button">Выйти из аккаунта</button>
        </form>
      </div>
    </section>
  );
}

export default Profile;