import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import axios from 'axios';
import logoRedmine from '../../assets/images/logo/logoRedmine-med.png';
import './LoginForm.scss';
import useAuth from '../../store/useAuth';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const stringToEncode = `${username}:${password}`;
    const encoder = new TextEncoder();
    const dataArray = encoder.encode(stringToEncode);
    const base64Credentials = Buffer.from(dataArray).toString('base64');

    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const apiUrl = process.env.REACT_APP_API_USER;
      const response = await axios.get(apiUrl, requestOptions);
      const responseData = response.data;
      console.log(responseData);

      if (response.status === 200) {
        localStorage.setItem('infoUser', base64Credentials);
        localStorage.setItem('permissionUser', username);
        localStorage.setItem('userData', JSON.stringify(responseData));
        onLogin();
        setAuth(responseData);
        navigate('/');
      } else if (response.status === 401) {
        setLoginError('Username atau password salah');
      } else {
        setLoginError('Terjadi kesalahan saat login');
      }
    } catch (error) {
      console.error(error);
      setLoginError('Terjadi kesalahan saat login');
    }
  };

  return (
    <form className="login__form was-validated" onSubmit={handleLogin}>
      <header className="text-center">
        <img className="d-block mx-auto" src={logoRedmine} alt="logo Redmine" />
        <h1>
          Selamat Datang di Redmine
        </h1>
        <p>
          Selamat Datang di Dashboard Aplikasi Redmine.
          {' '}
          <br />
          Silahkan login terlebih dahulu!
        </p>
      </header>
      <div className="login__form-input">
        <input
          placeholder="Username"
          type="text"
          className="form-control"
          required
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div className="login__form-input">
        <input
          placeholder="Password"
          type="password"
          className="form-control"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <button type="submit">
        Masuk
      </button>
      {loginError && <p>{loginError}</p>}
    </form>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;