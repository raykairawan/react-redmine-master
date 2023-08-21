import React, { useEffect, useState } from 'react';
import {
  Routes, Route, useNavigate, Navigate,
} from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout/Layout';
import Header from './components/Header/Header';
import ProjectDetail
  from './components/ProjectDetail/ProjectDetail';
import AddProject from './components/AddProject/AddProject';
import EditProject from './components/EditProject/EditProject';
import AddIssues from './components/AddIssues/AddIssues';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import {
  Login,
  ProjectList,
  Home,
  Projects,
} from './pages';
import useAuth from './store/useAuth';

const App = () => {
  const {
    auth,
    isPreload,
    setIsPreload,
    setAuth,
  } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/login');
  };

  const handleHamburgerClick = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  useEffect(() => {
    const fetchLoginInfo = async () => {
      const base64Credentials = localStorage.getItem('infoUser');

      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await axios.get(
          'http://127.0.0.1:3000/users/current.json',
          {},
          requestOptions,
        );
        const responseData = await response.json();

        setAuth(responseData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsPreload(false);
      }
    };

    if (localStorage.getItem('userData')) {
      setAuth(JSON.parse(localStorage.getItem('userData')));
      setIsPreload(false);
    }
  }, [setAuth, setIsPreload]);

  if (isPreload) {
    return null;
  }

  console.log(auth);

  return (
    <Routes>
      <Route path="/login" element={<Login loggedIn={handleLogin} />} />
      {auth ? (
        <Route element={<Layout />}>
          <Route
            element={<Header onHamburger={handleHamburgerClick} isNavbarOpen={isNavbarOpen} loggedIn={loggedIn} onLogout={handleLogout} />}
          />
          <Route path="/" element={<Home />} exact />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/projects/add" element={<AddProject />} />
          <Route path="/projects/edit/:id" element={<EditProject />} />
          <Route path="/projects/categories" element={<ProjectList />} />
          <Route path="/projects/lists" element={<Projects />} />
          <Route path="/projects/:projectId/add/issues" element={<AddIssues />} />
          <Route path="/community/categories" element={<h1>This is community categories</h1>} />
          <Route path="/community/lists" element={<h1>This is community list</h1>} />
          <Route path="/banner" element={<h1>This is banner</h1>} />
          <Route path="/users" element={<h1>This is users</h1>} />
          <Route path="/roles" element={<h1>This is roles</h1>} />
          <Route path="/permission" element={<h1>This is permission</h1>} />
          <Route path="/app-version" element={<h1>This is app version</h1>} />
        </Route>
      ) : (
        <Route path="/" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default App;