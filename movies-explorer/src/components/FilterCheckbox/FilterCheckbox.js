import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <label htmlFor="short-film" className="filter-checkbox">
      <input type="checkbox" className="filter-checkbox__input" id="short-film" onClick={props.shortFilter}/>
      <span className="filter-checkbox__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;