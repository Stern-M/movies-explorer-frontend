import './SearchForm.css';
import React from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm () {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__search">
          <div className="search-form__logo"></div>
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            minLength="1"
            maxLength="100"
            size="1"
          />
          <button type="button" className="search-form__button"></button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;