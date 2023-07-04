import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import logoRedmine from '../../assets/images/logo/logoRedmine-med.png';

import './LoginForm.scss';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

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

    let apiUrl = '';
    if (username === 'admin') {
      apiUrl = 'http://127.0.0.1:3000/users.json';
    } else {
      apiUrl = 'http://127.0.0.1:3000/users/current.json';
    }

    const response = await fetch(apiUrl, requestOptions);
    const responseData = await response.json();
    console.log(responseData);

    const credentialsAreValid = true;
    if (credentialsAreValid) {
      // Redirect ke halaman home setelah login berhasil
      navigate('/', { state: { username } });
    } else {
      // Set pesan error jika login gagal
      setLoginError('Invalid credentials');
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
        <input placeholder="Username" type="username" className="form-control" required onChange={(e) => setUsername(e.target.value)} value={username} />
      </div>
      <div className="login__form-input">
        <input placeholder="Password" type="password" className="form-control" required onChange={(e) => setPassword(e.target.value)} value={password} />
      </div>
      <button type="submit">
        Masuk
      </button>
      {loginError && <p>{loginError}</p>}
    </form>
  );
};

export default LoginForm;