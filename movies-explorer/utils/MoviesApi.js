class MoviesApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _onError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.statusText}`));
  }

  // запрос фильмов с сервера
  getAllMovies() {
    return fetch(`${this._url}`, {
      method: "GET",
    })
    .then(this._onError);
  }
}

export const mainApi = new MoviesApi({
  baseUrl: " https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});
