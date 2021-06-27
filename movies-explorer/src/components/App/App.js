import React, { useEffect, useState} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import '../../components/App/App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Error404Page from '../Error404Page/Error404Page';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { api } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi'

function App() {
  const [currentUser, setCurrentUser] = React.useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = React.useState(false);
  const [registerStatus, setRegisterStatus] = React.useState(false);
  const [userData, setUserData] = useState({
    _id: '',
    email: ''
  });
  const history = useHistory();

  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn])

  function handleRegister(password, email, name) {
    return api.register(password, email, name)
      .then(() => {
        history.push('/signin')
        setRegisterStatus(false)
        setInfoPopupOpen(true)
      })
      .catch((res) => {
        if (!res || res === 400) {
          console.log('некорректно заполнено одно из полей')
          setRegisterStatus(true)
          setInfoPopupOpen(true)
          return res;
        } if (!res || res === 409) {
          console.log('Пользователь с переданным email уже существует')
          setRegisterStatus(true)
          setInfoPopupOpen(true)
        } else {
          console.log('Что-то пошло не так')
          setRegisterStatus(true)
          setInfoPopupOpen(true)
        }
      })
  }

  const handleLogin = (password, email) => {
    return api.authorize(password, email)
      .then((data) => {
        localStorage.setItem('jwt', data.token)
        setLoggedIn(true)
        setCurrentUser(data)
        setUserData({ email: email })
        tokenCheck()
        history.push('/')
      })
      .catch((data) => {
        if (data === 400) {
          console.log('не передано одно из полей')
          setRegisterStatus(true)
          setInfoPopupOpen(true)
          return data;
        } if (data === 401) {
          console.log('пользователь с email не найден')
          setRegisterStatus(true)
          setInfoPopupOpen(true)
          return data;
        } else {
          console.log('Что-то пошло не так')
          setRegisterStatus(true)
          setInfoPopupOpen(true)
        }
      })
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      let token = localStorage.getItem('jwt');
      api.getContent(token)
        .then((data) => {
          if (data) {
            setLoggedIn(true)
            setUserData({ _id: data._id, email: data.email })
          }
        })
        .catch((err) => { console.log(err) })
    }
  }

  const [movies, setMovies] = useState([]);

  //запрос карточек (совершается после loggedIn = true)
  useEffect(() => {
    if (loggedIn)
    {moviesApi.getAllMovies(localStorage.getItem('jwt'))
      .then((moviesList) => {
        setMovies(moviesList);
      })
      .catch((err) => {
        console.log(err);
      });}
  }, [loggedIn]);

  //запрос данных юзера (совершается после loggedIn = true)
  useEffect(() => {
    if (loggedIn) 
    {moviesApi.getContent(localStorage.getItem('jwt'))
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });}
  }, [loggedIn]);

  function closeAllPopups() {
    setInfoPopupOpen(false)
  }

  //обновление данных юзера
  function handleUpdateUser(data) {
    console.log(data)
    //здесь должен быть прелоадер
    api.setUserData(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => { submitRender('.popup__profile', false) })
  }

  function onEscClose(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }

  function onOverlayClose(e) {
    if (e.target.classList.contains('popup_visible')) {
      closeAllPopups();
    }
  }

  //функция для вывода прелоадера в момент загрузки или изменения
  //ПЕРЕПИСАТЬ!!!
  function submitRender(popupSelector, isLoading) {
    const buttonElement = document.querySelector(popupSelector).querySelector('.popup__button');
    if (isLoading) {
      buttonElement.textContent = "Сохранение...";
    } else {
      if (popupSelector === '.popup__adding') {
        buttonElement.textContent = "Создать";
      } else { buttonElement.textContent = "Сохранить"; }
    }
  }

  function signOut() {
    localStorage.clear();
    setLoggedIn(false);
    history.push('/');
    setUserData('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App" onKeyDown={onEscClose} tabIndex={0} onClick={onOverlayClose}>
        <Switch>
          <Route exact path="/" >
            < Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute exact
            path="/movies"
            component={Movies}
            loggedIn={loggedIn} />
          <ProtectedRoute exact
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn} />
          <ProtectedRoute exact
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onLogOut={signOut}
            onUpdateUser={handleUpdateUser} />
          <Route path="/signin">
            < Login onLogin={handleLogin}/>
          </Route>
          <Route path="/signup">
            < Register onRegister={handleRegister}/>
          </Route>
          <Route path="*">
            < Error404Page />
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          status={registerStatus} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
