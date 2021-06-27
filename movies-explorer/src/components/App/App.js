import React, { useEffect, useState} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import '../../components/App/App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Error404Page from '../Error404Page/Error404Page';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Preloader from '../Preloader/Preloader';
import { api } from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [registerStatus, setRegisterStatus] = useState(false);
  const [loader, setLoader] = useState('')
  const history = useHistory();

  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    if (loggedIn) {
      history.push("/movies");
    }
  }, [loggedIn])

  const handleLogin = (password, email) => {
    setLoader('preloader_active')
    return api.authorize(password, email)
      .then((data) => {
        localStorage.setItem('jwt', data.token)
        setLoggedIn(true)
        setCurrentUser(data)
        tokenCheck()
        history.push('/movies')
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
      .finally(() => {
        setLoader('');
      })
  }

  function handleRegister(password, email, name) {
    setLoader('preloader_active')
    return api.register(password, email, name)
      .then(() => {
        handleLogin(password, email)
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
      .finally(() => {
        setLoader('');
      })
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      setLoader('preloader_active')
      let token = localStorage.getItem('jwt');
      api.getUserContent(token)
        .then((userData) => {
          if (userData) {
            setLoggedIn(true)
            setCurrentUser(userData)
            localStorage.setItem('currentUser', JSON.stringify(userData));
          }
        })
        .catch((err) => { console.log(err) })
        .finally(() => {
          setLoader('');
        })
    }
  }

  //запрос данных юзера (совершается после loggedIn = true)
  // useEffect(() => {
  //   if (loggedIn) 
  //   {api.getContent(localStorage.getItem('jwt'))
  //     .then((userInfo) => {
  //       setCurrentUser(userInfo);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });}
  // }, [loggedIn]);

  function closeAllPopups() {
    setInfoPopupOpen(false)
  }

  //обновление данных юзера
  function handleUpdateUser(name, email) {
    setLoader('preloader_active')
    api.setUserData(name, email)
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoader('');
      })
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

  function isMovieAdded(movie) {
    if (localStorage.getItem('savedMoves')) {
      localStorage.getItem('savedMoves').some((item) => item.id === movie.id)
    }
  }

  //функция для вывода прелоадера в момент загрузки или изменения
  //ПЕРЕПИСАТЬ!!!
  // function submitRender(popupSelector, isLoading) {
  //   const buttonElement = document.querySelector(popupSelector).querySelector('.popup__button');
  //   if (isLoading) {
  //     buttonElement.textContent = "Сохранение...";
  //   } else {
  //     if (popupSelector === '.popup__adding') {
  //       buttonElement.textContent = "Создать";
  //     } else { buttonElement.textContent = "Сохранить"; }
  //   }
  // }

  function signOut() {
    localStorage.clear();
    setLoggedIn(false);
    history.push('/');
    setCurrentUser('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App" onKeyDown={onEscClose} tabIndex={0} onClick={onOverlayClose}>
        <Switch>
          <Route exact path="/">
            < Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute exact
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            isMovieAdded={isMovieAdded}/>
          <ProtectedRoute exact
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}/>
          <ProtectedRoute exact
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onLogOut={signOut}
            onUpdateUser={handleUpdateUser} 
            currentUser={currentUser}/>
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
        < Preloader loader={loader}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
