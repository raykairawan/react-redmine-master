import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import usePasswordStore from '../../store/usePasswordStore';

import './ChangePassword.scss';

const ChangePassword = () => {
  const {
    oldPassword, newPassword, confirmPassword, passwordError, successMessage,
    setOldPassword, setNewPassword, setConfirmPassword, setPasswordError, setSuccessMessage,
  } = usePasswordStore();
  const navigate = useNavigate();

  const validatePassword = () => {
    setPasswordError('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required.');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return false;
    }

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    const isValidPassword = validatePassword();
    if (!isValidPassword) {
      return;
    }

    try {
      const infoUser = localStorage.getItem('infoUser');
      if (!infoUser) {
        navigate('/login');
        console.error('User not authenticated. Redirect to login page.');
        return;
      }

      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/my/password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${infoUser}`,
            'X-CSRF-Token': csrfToken,
          },
        },
      );

      if (response.status === 200) {
        setSuccessMessage('Password changed successfully.');
      }
    } catch (error) {
      setPasswordError('Password change failed. Please check your old password.');
    }
  };

  return (
    <div className="change-password-container">
      {passwordError && <p className="error-message">{passwordError}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        name="password"
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        name="new_password"
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        name="new_password_confirmation"
      />
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default ChangePassword;
