import React from 'react';
import { Link } from 'react-router-dom';
import {
  PlusIcon,
} from '../../assets/icons';

import './AddLinkButton.scss';

const AddLinkButton = () => {
  return (
    <div className="add-link__button">
      <Link to="/projects/add" className="justify-content-center">
        Tambah
        <PlusIcon />
      </Link>
    </div>
  );
};

export default AddLinkButton;