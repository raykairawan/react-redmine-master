import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ProjectBoards = ({ boardId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    const infoUser = localStorage.getItem('infoUser');
    if (!infoUser) {
      navigate('/login');
      console.error('User not authenticated. Redirect to login page.');
      return;
    }
    e.preventDefault();

    const dataToSubmit = {
      name: formData.name,
      description: formData.description,
    };

    axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/boards/${boardId}/topics/new`,
      dataToSubmit,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${infoUser}`,
        },
      },
    )
      .then((response) => {
        console.log('Board baru telah berhasil dibuat:', response.data);
      })
      .catch((error) => {
        console.error('Gagal membuat board baru:', error);
      });
  };

  return (
    <div>
      <h1>Create New Board</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">Create Board</button>
      </form>
    </div>
  );
};

ProjectBoards.propTypes = {
  boardId: PropTypes.number.isRequired,
};

export default ProjectBoards;
