import { useState } from 'react';
import s from './Searchbar.module.scss';
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';

import React from 'react';

function Searchbar({ onSubmit }) {
  const [inputText, setInputText] = useState('');

  const onSearchInput = ({ target }) => {
    setInputText(target.value.toLowerCase());
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (!inputText.trim()) {
      return alert('Input some text');
    }
    onSubmit(inputText);
    setInputText('');
  };

  return (
    <header className={s.SearchBar}>
      <form onSubmit={onSubmitForm} className={s.SearchForm}>
        <button type="submit" className={s.SearchForm_button}>
          <span className={s.SearchForm_button_label}>
            <BiSearchAlt />
          </span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          value={inputText}
          placeholder="Search images and photos"
          onChange={onSearchInput}
        />
      </form>
    </header>
  );
}
export default Searchbar;

Searchbar.propTypes = {
  inputText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
