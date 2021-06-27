import './SearchForm.css';
import React, { useState } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm (props) {
  const [input, setInput] = useState('');

  function handleChangeInput(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.findMovie(input)
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
            minLength="1"
            maxLength="150"
            size="1"
            onChange={handleChangeInput}
          />
          <button type="submit" className="search-form__button"></button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;