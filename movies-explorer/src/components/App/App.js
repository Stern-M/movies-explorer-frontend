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
    return mainApi.register(password, email)
      .then(() => {
        history.push('/sign-in')
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
    return mainApi.authorize(password, email)
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
      mainApi.getContent(token)
        .then((data) => {
          if (data) {
            setLoggedIn(true)
            setUserData({ _id: data._id, email: data.email })
          }
        })
        .catch((err) => { console.log(err) })
    }
  }

  const [cards, setCards] = useState([]);

  //запрос карточек (совершается после loggedIn = true)
  useEffect(() => {
    if (loggedIn)
    {MoviesApi.getAllCards(localStorage.getItem('jwt'))
      .then((cardsList) => {
        setCards(cardsList);
      })
      .catch((err) => {
        console.log(err);
      });}
  }, [loggedIn]);

  //запрос данных юзера (совершается после loggedIn = true)
  useEffect(() => {
    if (loggedIn) 
    {mestoAuth.getContent(localStorage.getItem('jwt'))
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
    submitRender('.popup__profile', true)
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

  //функция для вывода "сохранение..." в момент загрузки или изменения
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
      <div className="App">
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            < Header />
            < Main />
          </ProtectedRoute>
          <Route path="/movies">
            < Header />
            < Movies />
          </Route>
          <Route path="/saved-movies">
            < Header />
            < SavedMovies />
          </Route>
          <Route path="/profile">
            < Header />
            < Profile />
          </Route>
          <Route path="/signin">
            < Login />
          </Route>
          <Route path="/signup">
            < Register />
          </Route>
          <Route path="*">
            < Error404Page />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
