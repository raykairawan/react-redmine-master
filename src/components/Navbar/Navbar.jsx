import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import logoRedmine from '../../assets/images/logo/redmine-logo.png';
import {
  LeftArrowIcon,
  RightArrowIcon,
  DashboardIcon,
  ListEventIcon,
  PermissionIcon,
  ProjectIcon,
  SearchAddIcon,
  AppVersionIcon,
} from '../../assets/icons';

import './Navbar.scss';

const Navbar = ({ onNavbarIsOpen, isNavbarOpen }) => {
  const isAdmin = JSON.parse(localStorage.getItem('userData')).user.login === 'admin';
  return (
    <nav className={isNavbarOpen ? 'nav active-nav' : 'nav'}>
      <div className="nav__container align-items-center">
        <header className="d-flex nav__header">
          <div className="d-flex align-items-center">
            <img src={logoRedmine} alt="logo redmine" />
          </div>
          <div className="d-flex flex-column nav__header-description">
            <h2>Redmine</h2>
            <span>Dashboard</span>
          </div>
        </header>
        <div className="nav__hamburger-container d-flex justify-content-between align-items-center">
          <h2>Main Menu</h2>
          <div>
            <button className="d-inline-block d-lg-none" onClick={onNavbarIsOpen}>
              <LeftArrowIcon />
            </button>
            <button className="d-none">
              <RightArrowIcon />
            </button>
          </div>
        </div>
        <div className="nav__main-menu">
          <ul className="nav__list">
            <li
              className="nav__list-item"
            >
              <NavLink to="/">
                <DashboardIcon />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="nav__list-item">
              <div className="accordion accordion-flush" id="accordionEvent">
                <div className="accordion-item">
                  <div className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <ProjectIcon />
                      <span>Proyek</span>
                    </button>
                  </div>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionEvent"
                  >
                    <div className="accordion-body">
                      <ul>
                        {isAdmin && (
                        <li>
                          <NavLink to="/projects/categories">
                            <SearchAddIcon />
                            <span>Cari & Tambah Proyek</span>
                          </NavLink>
                        </li>
                        )}
                        <li>
                          <NavLink to="/projects/lists">
                            <ListEventIcon />
                            <span>Semua Proyek</span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav__list-item">
              <NavLink to="/projects/:projectId/issues/lists">
                <PermissionIcon />
                <span>Issues</span>
              </NavLink>
            </li>
            <li className="nav__list-item">
              <NavLink to="/app-version">
                <AppVersionIcon />
                <span>App Version</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onNavbarIsOpen: PropTypes.func.isRequired,
  isNavbarOpen: PropTypes.bool.isRequired,
};

export default Navbar;