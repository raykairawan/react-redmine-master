import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import useSearchStore from '../../store/useSearchStore';
import { SearchIcon } from '../../assets/icons';

import './SearchInput.scss';

const SearchInput = ({ placeHolderName }) => {
  const {
    searchQuery, setSearchQuery, searchResults, setSearchResults,
  } = useSearchStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/projects/autocomplete.js?jump=issues&q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="search__input">
      <form className="search__input-form" onSubmit={handleSearch}>
        <input
          className="form-control"
          placeholder={placeHolderName}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button>
          <SearchIcon />
        </button>
      </form>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
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