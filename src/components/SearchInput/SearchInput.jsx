import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { SearchIcon } from '../../assets/icons';

import './SearchInput.scss';

const SearchInput = ({ placeHolderName }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    const trimmedSearchTerm = event.target.value.trim();
    setSearchTerm(trimmedSearchTerm);

    if (trimmedSearchTerm) {
      try {
        const response = await axios.get(`/search.json?query=${trimmedSearchTerm}`);
        // Process the response data as needed
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="search__input">
      <form className="search__input-form">
        <input
          className="form-control"
          placeholder={placeHolderName}
          type="text"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button>
          <SearchIcon />
        </button>
      </form>
      <p>
        Input-an:
        {' '}
        {searchTerm}
      </p>
    </div>
  );
};

SearchInput.propTypes = {
  placeHolderName: PropTypes.string,
};

SearchInput.defaultProps = {
  placeHolderName: 'Search',
};

export default SearchInput;