import React, { useEffect, useState} from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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
import { moviesApi } from '../../utils/MoviesApi';

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [registerStatus, setRegisterStatus] = useState(false);
  const [loader, setLoader] = useState('');
  const [firstSearch, setFirstSearch] = useState(true); //поиск еще не выполнялся
  const [allMovies, setAllMovies] = useState([]); // все фильмы с сервера https://api.nomoreparties.co/beatfilm-movies
  const [findedMovies, setFindedMoves] = useState([]); // фильмы после поиска
  const [savedMovies, setSavedMovies] = useState([]); // сохраненные фильмы
  const [moviesAmount, setMoviesAmount] = useState({startCard: 0, rowCard: 0, moreCard: 0});
  const [shortFilter, setShortFilter] = useState(false); // фильтр короткометражек
  const [loadingError, setLoadingError] = React.useState('');
  const history = useHistory();
  const { pathname } = useLocation();


  useEffect(() => {
    setFindedMoves([])
  }, [pathname])

  //авторизация
  const handleLogin = (password, email) => {
    setLoader('preloader_active')
    return api.authorize(password, email)
      .then((data) => {
        localStorage.setItem('jwt', data.token)
        setLoggedIn(true)
        setCurrentUser(data)
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

  //регистрация
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
    let token = localStorage.getItem('jwt');
    if (token) {
      setLoader('preloader_active')
      api.getUserContent(token)
        .then((userData) => {
          if (userData) {
            setCurrentUser(userData)
            setLoggedIn(true)
            localStorage.setItem('currentUser', JSON.stringify(userData));
          }
        })
        .catch((err) => { console.log(err) })
        .finally(() => {
          setLoader('');
        })
    }
  }

  function handleShortFilter() {
    setShortFilter(!shortFilter)
  }

  function getAllMovies() {
    setLoader('preloader_active')
    moviesApi
    .getAllMovies()
      .then((movies) => {
        setAllMovies(movies.map((item) => {
          const imageURL = item.image ? item.image.url : '';
          return {
            ...item,
            image: `https://api.nomoreparties.co${imageURL}`,
            trailer: item.trailerLink,
          };
        }))
        localStorage.setItem('movies', JSON.stringify(movies))
      })
      .catch(() => {
        setLoadingError('Во время запроса произошла ошибка. '
          + 'Возможно, проблема с соединением или сервер недоступен. '
          + 'Подождите немного и попробуйте ещё раз');
      })
      .finally(() => setLoader(''))
  }

  function getSavedMovies() {
    setLoader('preloader_active')
    api
      .getSavedMovies()
      .then((movies) => {
        const allSavedMovies = movies.map((item) => { return { ...item, id: item.movieId }})
        setSavedMovies(allSavedMovies.filter((movie) =>  { return movie.owner.includes(currentUser._id)}))
        localStorage.setItem('savedMovies', JSON.stringify(allSavedMovies.filter((movie) =>  { return movie.owner.includes(currentUser._id)})))
      })
      .catch(() => {
        setLoadingError('Во время запроса произошла ошибка. '
          + 'Возможно, проблема с соединением или сервер недоступен. '
          + 'Подождите немного и попробуйте ещё раз');
      })
      .finally(() => setLoader(''))
  };

  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    if (loggedIn) {
      getSavedMovies();
      getAllMovies()
    }
  }, [loggedIn])

  useEffect(() => {
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, loggedIn])

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
  }, [currentUser])

  //показ определенного кол-ва карточек с фильмами
  function showExactMoviesAmount() {
    if(window.screen.width < 400){
      setMoviesAmount({startCard: 5, rowCard: 1, moreCard: 2})
    } else if(window.screen.width < 768){
      setMoviesAmount({startCard: 8, rowCard: 2, moreCard: 2})
    } else {
      setMoviesAmount({startCard: 12, rowCard: 3, moreCard: 3})
    }
  }

  //поиск фильмов либо среди сохраненных, либо среди всех фильмов (в зависимости от pathname)
  function findMovie(searcInput) {
    setFirstSearch(false)
    setLoader('preloader_active')
    showExactMoviesAmount()
    if (pathname === "/movies") {
      setFindedMoves(allMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searcInput.toLowerCase());
      }))
    } else {
      setFindedMoves(savedMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searcInput.toLowerCase())
      }))
    }
    setLoader('')
  }

  //поиск короткометражек среди отфильтрованных фильмов
  const shortMovies = (findedMovies) => findedMovies.filter((movie) =>  movie.duration < 40)

  //добавление в сохраненные
  function addToSaved(movie) {
    api
      .addToSavedMovies(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // удаление из сохраненных 
  function removeFromSaved(movie, findedMovies) {
    const movieForDel = savedMovies.find((item) => item.id === movie.id);
    const movieId = movieForDel._id;
    api
      .removeFromSavedMovies(movieId)
      .then((res) => {
        if (res) {
          if (pathname === "/movies") {
            const updatedSavedMovies = savedMovies.filter((movie) => { return movie._id !== movieId})
            setSavedMovies(updatedSavedMovies)
          } else {
            const updatedSavedMovies = savedMovies.filter((movie) => { return movie._id !== movieId})
            setSavedMovies(updatedSavedMovies)
            const updatedFilteredMovies = findedMovies.filter((movie) => {
              return !movie.nameRU.toLowerCase().includes(movieForDel.nameRU.toLowerCase())})
            setFindedMoves(updatedFilteredMovies)
          }
          }
        })
      .catch((err) => {
        console.error(err);
      });
  };


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

  //закрытие по Esc
  function onEscClose(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }

  //закрытие по овелею
  function onOverlayClose(e) {
    if (e.target.classList.contains('popup_visible')) {
      closeAllPopups();
    }
  }

  //проверка сохранен ли фильм, чтобы на роуте movies отразить закладку
  const isMovieAdded = (movie) => savedMovies.some((item) => item.id === movie.id)

  //опеределяем нужно сохранить или удалить по клику
  const saveDeleteMovieHandler = (movie, isAdded) => (isAdded ? removeFromSaved(movie, findedMovies) : addToSaved(movie) );

  //выход из аккаунта
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
            isMovieAdded={isMovieAdded}
            findMovie={findMovie}
            handleShortFilter={handleShortFilter}
            shortMovies={shortMovies}
            shortFilter={shortFilter}
            findedMovies={findedMovies}
            moviesAmount={moviesAmount}
            setMoviesAmount={setMoviesAmount}
            firstSearch={firstSearch}
            addToSaved={addToSaved}
            loader={loader}
            saveDeleteMovieHandler={saveDeleteMovieHandler}
            loadingError={loadingError}/>
          <ProtectedRoute exact
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            moviesAmount={moviesAmount}
            setMoviesAmount={setMoviesAmount}
            findedMovies={findedMovies}
            handleShortFilter={handleShortFilter}
            shortFilter={shortFilter}
            shortMovies={shortMovies}
            firstSearch={firstSearch}
            findMovie={findMovie}
            saveDeleteMovieHandler={saveDeleteMovieHandler}
            loadingError={loadingError}/>
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
