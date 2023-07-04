import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';

import './Layout.scss';

const Layout = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const isNavbarOpenHandler = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="container-fluid admin__layout">
      <div className="d-flex">
        <Navbar onNavbarIsOpen={isNavbarOpenHandler} isNavbarOpen={isNavbarOpen} />
        <div className="admin__layout-body d-flex flex-column">
          <Header
            onHamburger={isNavbarOpenHandler}
            isNavbarOpen={isNavbarOpen}
          />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;