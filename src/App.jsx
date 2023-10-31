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
import IssuesDetail from './components/IssuesDetail/IssuesDetail';
import AddIssues from './components/AddIssues/AddIssues';
import EditIssues from './components/EditIssues/EditIssues';
import MyAccount from './components/MyAccount/MyAccount';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ProjectMembers from './components/ProjectMember/ProjectMember';
import ProjectBoards from './components/ProjectBoards/ProjectBoards';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import {
  Login,
  Home,
  Issues,
  ProjectList,
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
          process.env.REACT_APP_API_USER,
          {},
          requestOptions,
        );
        const responseData = response.data;

        setAuth(responseData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsPreload(false);
      }
    };

    if (localStorage.getItem('userData')) {
      fetchLoginInfo();
      setAuth(JSON.parse(localStorage.getItem('userData')));
      setIsPreload(false);
    }
  }, [setAuth, setIsPreload]);

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
          <Route path="/projects/:projectId/memberships" element={<ProjectMembers />} />
          <Route path="/projects/:projectId/boards" element={<ProjectBoards />} />
          <Route path="/projects/add" element={<AddProject />} />
          <Route path="/projects/edit/:id" element={<EditProject />} />
          <Route path="/projects/categories" element={<ProjectList />} />
          <Route path="/projects/lists" element={<Projects />} />
          <Route path="/projects/:projectId/issues/:issueId" element={<IssuesDetail />} />
          <Route path="/projects/:projectId/issues/lists" element={<Issues />} />
          <Route path="/projects/:projectId/add/issues" element={<AddIssues />} />
          <Route path="/projects/:projectId/issues/:issueId/edit" element={<EditIssues />} />
          <Route path="/my/account" element={<MyAccount />} />
          <Route path="/my/password" element={<ChangePassword />} />
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