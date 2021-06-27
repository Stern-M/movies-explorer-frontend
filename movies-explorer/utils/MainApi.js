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

  register(password, email, name) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email, name} )
    })
    .then(this._onError)
  }
  
  authorize(password, email) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then(this._onError)
  }
  
  //запрос данных по юзеру с сервера
  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._onError)
  }

  //запрос карточек с сервера
  getAllCards(token) {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: 
    {    "content-type": "application/json",
        "Authorization": `Bearer ${token}`}
    })
    .then(this._onError)
  }

  setUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar:avatar})
    })
      .then(this._onError)
  }

  //изменение данных юзера на сервере
  setUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._onError)
  }

  //добаввление новой карточки на сервер
  addCard(data){
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._onError)
  }

  //удаление карточки с сервера
  removeCard(id){
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._onError)
  }

  //поставить или снять лайк с карточки (по заданию 11 работы)
  changeLikeCardStatus(id, isLiked, token) {
    if (!isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: 
        {"content-type": "application/json",
        "Authorization": `Bearer ${token}`}
      })
      .then(this._onError)
    } else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "PUT",
        headers: 
        {"content-type": "application/json",
        "Authorization": `Bearer ${token}`}
      })
      .then(this._onError)
    }
  }

}

export const api = new MainApi({
  url: "http://localhost:3005",
  headers: {
    "content-type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
  }
});