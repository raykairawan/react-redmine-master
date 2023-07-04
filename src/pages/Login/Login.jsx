import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

import './Login.scss';

const Login = () => {
  return (
    <section className="login">
      <section className="container d-flex min-vh-100 align-items-center justify-content-center">
        <LoginForm />
      </section>
    </section>
  );
};

export default Login;