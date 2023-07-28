import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { SearchIcon } from '../../assets/icons';

import './SearchInput.scss';

const SearchInput = ({ placeHolderName }) => {
  const handleSearch = async (event) => {
    event.preventDefault();
    const searchTerm = event.target.value.trim();
    if (searchTerm) {
      try {
        const response = await axios.get(`/search.json?query=${searchTerm}`);
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
          onChange={handleSearch}
        />
        <button>
          <SearchIcon />
        </button>
      </form>
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