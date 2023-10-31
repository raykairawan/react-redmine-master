import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUserStore from '../../store/useUserStore';

import './MyAccount.scss';

const MyAccount = () => {
  const { userData, setUserData } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const fetchUserData = async () => {
    const infoUser = localStorage.getItem('infoUser');
    const response = await axios.get(process.env.REACT_APP_API_USER, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${infoUser}`,
      },
    });
    const { user } = response.data;
    const customFieldId1 = user.custom_fields.find((field) => field.id === 1);
    if (customFieldId1) {
      setPhoneNumber(customFieldId1.value);
    }
    setUserData(user);
    return user;
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await fetchUserData();
        setEditedData({ ...user });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    loadUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedUserData = {
        firstname: editedData.firstname,
        lastname: editedData.lastname,
        mail: editedData.mail,
        custom_fields: { phone: editedData.custom_fields.phone },
      };

      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/my/account.json`, updatedUserData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${localStorage.getItem('infoUser')}`,
        },
      });

      if (response.status === 204) {
        setUserData(updatedUserData);
        setIsEditing(false);
      } else {
        console.error('Failed to save user data:', response);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  return (
    <div className="my-account-container">
      <h2>My Account</h2>
      {isEditing ? (
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="firstname"
              value={editedData.firstname}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastname"
              value={editedData.lastname}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="mail"
              value={editedData.mail}
              onChange={handleChange}
            />
          </label>
          <label>
            Nomor Telepon:
            <input
              type="text"
              name="phone"
              value={editedData.custom_fields.phone}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSave}>Simpan</button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Nama:</strong>
            {' '}
            {userData && userData.firstname}
            {' '}
            {userData && userData.lastname}
          </p>
          <p>
            <strong>Email:</strong>
            {' '}
            {userData && userData.mail}
          </p>
          <p>
            <strong>Nomor Telepon:</strong>
            {' '}
            {userData && userData.custom_fields.phoneNumber}
          </p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
