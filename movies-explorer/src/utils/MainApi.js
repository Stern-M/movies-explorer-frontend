class MainApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;  
  }

  _onError(res) {
    if(res.ok){
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.statusText}`))
  }

  //регистрация
  register(password, email, name) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({password, email, name} )
    })
    .then(this._onError)
  }
  
  //авторизация
  authorize(password, email) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then(this._onError)
  }
  
  //запрос данных по юзеру с сервера
  getUserContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      Accept: 'application/json',
      }
    })
    .then(this._onError)
  }

  //запрос сохраненных фильмов
  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(this._onError)
  }

  //изменение данных юзера на сервере
  setUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(this._onError)
  }

  //добаввление фильма в сохраненные
  addToSavedMovies(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        country: data.country || 'unknown',
        director: data.director || 'unknown',
        duration: data.duration || 'No data',
        year: data.year || 'unknown',
        description: data.description || 'No description',
        image: data.image,
        trailer: data.trailerLink || 'No trailer',
        thumbnail: data.image || 'No image',
        movieId: data.id || 'No data',
        nameRU: data.nameRU,
        nameEN: data.nameEN || 'No name',
      }),
    })
      .then(this._onError)
  }

  //удаление карточки с сервера
  removeFromSavedMovies(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then(this._onError)
  }

}

export const api = new MainApi({
  url: "https://api.best-movies-ever.nomoredomains.icu",
  headers: {
    "content-type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
  }
});