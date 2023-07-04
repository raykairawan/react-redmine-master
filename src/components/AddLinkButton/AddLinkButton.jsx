import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  PlusIcon,
} from '../../assets/icons';

import './AddLinkButton.scss';

const AddLinkButton = ({ link }) => {
  return (
    <div className="add-link__button">
      <Link to={link} className="justify-content-center">
        Tambah
        <PlusIcon />
      </Link>
    </div>
  );
};

AddLinkButton.propTypes = {
  link: PropTypes.string,
};

AddLinkButton.defaultProps = {
  link: '/',
};

export default AddLinkButton;