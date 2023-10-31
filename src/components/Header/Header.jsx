/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HamburgerIcon } from '../../assets/icons';
import logoRedmine from '../../assets/images/logo/redmine-logo.png';

import './Header.scss';
import useAuth from '../../store/useAuth';

const Header = ({
  onHamburger, isNavbarOpen, user, onLogout,
}) => {
  const { auth, setAuth } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    onLogout();
    setLoggedIn(false);
    setAuth(null);
    // Clear cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    // Clear local storage
    localStorage.clear();

    window.location.href = '/login';
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setLoggedIn(true);
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  useEffect(() => {
    const handleUserActivity = () => {
      localStorage.setItem('lastActivity', Date.now());
    };

    document.addEventListener('click', handleUserActivity);
    document.addEventListener('keypress', handleUserActivity);

    return () => {
      document.removeEventListener('click', handleUserActivity);
      document.removeEventListener('keypress', handleUserActivity);
    };
  }, []);

  useEffect(() => {
    const checkAutoLogout = () => {
      const lastActivity = localStorage.getItem('lastActivity');
      if (lastActivity) {
        const lastActivityTime = parseInt(lastActivity, 10);
        const currentTime = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (currentTime - lastActivityTime >= twentyFourHours) {
          handleLogout();
        }
      }
    };

    const autoLogoutTimer = setTimeout(checkAutoLogout, 24 * 60 * 60 * 1000);

    return () => {
      clearTimeout(autoLogoutTimer);
    };
  }, []);

  return (
    <header className="main__header d-flex justify-content-between align-items-center">
      <button className="main__header-hamburger d-inline-block" onClick={onHamburger}>
        <HamburgerIcon />
      </button>
      <div className="main__header-main d-flex align-items-center ms-auto">
        {auth && auth.user && auth.user.firstname && (
        <span className="d-none d-md-inline-block">
          Welcome,&nbsp;&nbsp;
          {auth.user.username === 'admin' ? 'admin' : auth.user.firstname}
        </span>
        )}
        <div className="dropdown">
          <button className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={logoRedmine} alt="logo redmine" width="55px" />
          </button>
          <ul className="dropdown-menu">
            <li><Link to="/my/account">My Account</Link></li>
            <li><Link to="/my/password">Change Password</Link></li>
          </ul>
        </div>
        {auth ? (
          <button className="button__logout" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">
              <button className="button__login">Login</button>
            </Link>
            <Link to="/register">
              <button className="button__register">Register</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  onHamburger: PropTypes.func.isRequired,
  isNavbarOpen: PropTypes.bool.isRequired,
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: null,
};

export default Header;