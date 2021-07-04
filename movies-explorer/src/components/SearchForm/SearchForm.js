import './SearchForm.css';
import React, { useEffect, useState } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';

function SearchForm ({findMovie, shortFilter}) {
  const { pathname } = useLocation();
  const [input, setInput] = useState('');
  const filter = localStorage.getItem('filterWord');
  const filterUser = localStorage.getItem('filterUserWord');

  // при монтировании компонента проверяем было ли что-то в инпут и если было показываем
  useEffect(() => {
    if (pathname === '/movies') {
      if (filter) {
        setInput(filter);
        findMovie(filter);
      } else {
        setInput('');
      }
    }
    if (pathname === '/saved-movies') {
      if (filterUser) {
        setInput(filterUser);
        findMovie(filterUser)
      } else {
        setInput('');
      }
    }
  }, []);


  function handleChangeInput(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    findMovie(input);
    if (pathname === '/movies') {
      localStorage.setItem('filterWord', input)
    } if (pathname === '/saved-movies') {
      localStorage.setItem('filterUserWord', input)
    }
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__search">
          <div className="search-form__logo"></div>
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            required="true"
            value={input ? input : ''}
            minLength="1"
            maxLength="150"
            size="1"
            onChange={handleChangeInput}
          />
          <button type="submit" className="search-form__button"></button>
        </div>
        <FilterCheckbox shortFilter={shortFilter}/>
      </form>
    </section>
  );
}

export default SearchForm;