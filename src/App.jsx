import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Header from './components/Header/Header';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import {
  Login,
  EventCategories,
  Home,
} from './pages';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    setLoggedIn(true);
    setUser(user);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  const handleHamburgerClick = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route element={(
          <Header
            onHamburger={handleHamburgerClick}
            isNavbarOpen={isNavbarOpen}
            loggedIn={loggedIn}
            user={user}
            onLogout={handleLogout}
          />
)}
        />
        <Route path="/" element={<Home />} />
        <Route path="/event/categories" element={<EventCategories />} />
        <Route path="/event/lists" element={<h1>This is event list</h1>} />
        <Route path="/community/categories" element={<h1>This is community categories</h1>} />
        <Route path="/community/lists" element={<h1>This is community list</h1>} />
        <Route path="/banner" element={<h1>This is banner</h1>} />
        <Route path="/users" element={<h1>This is users</h1>} />
        <Route path="/roles" element={<h1>This is roles</h1>} />
        <Route path="/permission" element={<h1>This is permission</h1>} />
        <Route path="/app-version" element={<h1>This is app version</h1>} />
      </Route>
    </Routes>
  );
};

export default App;