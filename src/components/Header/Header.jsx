import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HamburgerIcon } from '../../assets/icons';
import logoRedmine from '../../assets/images/logo/redmine-logo.png';

import './Header.scss';

const Header = ({ onHamburger, isNavbarOpen }) => {
  return (
    <header className="main__header d-flex justify-content-between align-items-center">
      <button className="main__header-hamburger d-inline-block" onClick={onHamburger}>
        <HamburgerIcon />
      </button>
      <div className="main__header-main d-flex align-items-center ms-auto">
        <span className="d-none d-md-inline-block">Admin Redmine</span>
        <div className="dropdown">
          <button className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={logoRedmine} alt="logo redmine" width="55px" />
          </button>
          <ul className="dropdown-menu">
            <li>Settings</li>
          </ul>
        </div>
        <Link to="/login">
          <button className="button__login">Login</button>
        </Link>
        <Link to="/register">
          <button className="button__register">Register</button>
        </Link>
      </div>
    </header>
  );
};

Header.propTypes = {
  onHamburger: PropTypes.func.isRequired,
  isNavbarOpen: PropTypes.bool.isRequired,
};

export default Header;