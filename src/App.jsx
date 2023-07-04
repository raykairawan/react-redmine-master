import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import {
  Login,
  EventCategories,
  Home,
} from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
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