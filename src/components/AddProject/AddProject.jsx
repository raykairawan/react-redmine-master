import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useProjectStore from '../../store/useProjectStore';
import logger from '../../log/logger';

import './AddProject.scss';

const addAuthorizationHeader = () => {
  const infoUser = localStorage.getItem('infoUser');
  if (infoUser) {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${infoUser}`,
      },
    };
  }
  return {};
};

const AddProject = () => {
  const {
    projectName,
    projectDescription,
    projectIdentifier,
    isPublic,
    projectModule,
    setProjectName,
    setProjectDescription,
    setProjectIdentifier,
    setIsPublic,
    setProjectModule,
    resetForm,
  } = useProjectStore();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      project: {
        name: projectName,
        description: projectDescription,
        identifier: projectIdentifier,
        is_public: isPublic,
        project_module: projectModule,
      },
    };

    axios.post(process.env.REACT_APP_API_PROJECTS, newProject, addAuthorizationHeader())
      .then((response) => {
        if (response.data && response.data.project) {
          navigate('/projects/lists');
        }
      })
      .catch((error) => {
        logger.error('Error while add projects', error);
      });

    resetForm();
  };

  const moduleOptions = [
    'boards',
    'calendar',
    'documents',
    'files',
    'gantt',
    'issue_tracking',
    'news',
    'repository',
    'time_tracking',
    'wiki',
  ];

  return (
    <div className="add-project-page">
      <h2>Tambah Proyek Baru</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Nama Proyek:
          <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        </label>
        <label>
          Deskripsi Proyek:
          <textarea value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
        </label>
        <label>
          Identifier Proyek:
          <input type="text" value={projectIdentifier} onChange={(e) => setProjectIdentifier(e.target.value)} />
        </label>
        <label>
          Proyek Publik:
          <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
        </label>
        <label>
          Modul Proyek:
          <select value={projectModule} onChange={(e) => setProjectModule(e.target.value)}>
            <option value="">Pilih Modul</option>
            {moduleOptions.map((module) => (
              <option key={module} value={module}>
                {module}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Tambah Proyek</button>
      </form>
    </div>
  );
};

export default AddProject;
