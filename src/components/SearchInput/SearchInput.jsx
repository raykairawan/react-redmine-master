import React from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '../../assets/icons';

import './SearchInput.scss';

const SearchInput = ({ placeHolderName }) => {
  return (
    <div className="search__input">
      <form className="search__input-form">
        <input className="form-control" placeholder={placeHolderName} type="text" />
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