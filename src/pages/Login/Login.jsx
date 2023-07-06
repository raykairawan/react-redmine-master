import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

import './Login.scss';

const Login = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Logika untuk melakukan login
    setLoggedIn(true);
  };

  return (
    <section className="login">
      <section className="container d-flex min-vh-100 align-items-center justify-content-center">
        <LoginForm onLogin={handleLogin} isLoggedIn={isLoggedIn} />
      </section>
    </section>
  );
};

export default Login;