import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../../components/App/App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Error404Page from '../Error404Page/Error404Page';
import Login from '../Login/Login';
import Register from '../Register/Register'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          < Header />
          < Main />
        </Route>
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
  );
}

export default App;
