import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

import './Login.scss';

const Login = () => {
  const handleLogin = () => {
    console.log('Login berhasil');
  };

  return (
    <section className="login">
      <section className="container d-flex min-vh-100 align-items-center justify-content-center">
        <LoginForm onLogin={handleLogin} />
      </section>
    </section>
  );
};

export default Login;