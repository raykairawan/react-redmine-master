import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import logger from '../../log/logger';
import useProjectStore from '../../store/useProjectStore';

import './EditProject.scss';

const EditProject = () => {
  const { id } = useParams();
  const projectId = id;
  const navigate = useNavigate();
  const {
    projectName, setProjectName,
    projectDescription, setProjectDescription,
    projectIdentifier, setProjectIdentifier,
    isPublic, setIsPublic,
    projectModule, setProjectModule,
  } = useProjectStore();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const infoUser = localStorage.getItem('infoUser');
        if (!infoUser) {
          navigate('/login');
          logger.error('User not authenticated. Redirect to login page.');
          return;
        }

        const response = await axios.get(`http://127.0.0.1:3000/projects/${projectId}.json`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${infoUser}`,
          },
        });

        if (response.status === 200) {
          const projectData = response.data.project;
          setProjectName(projectData.name);
          setProjectDescription(projectData.description);
          setProjectIdentifier(projectData.identifier);
          setIsPublic(projectData.is_public);
          setProjectModule(projectData.module);
        }
      } catch (error) {
        logger.error('Error while fetching project:', error);
      }
    };

    fetchProject();
  }, [projectId, navigate, setProjectName, setProjectDescription, setProjectIdentifier, setIsPublic, setProjectModule]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const infoUser = localStorage.getItem('infoUser');
      if (!infoUser) {
        navigate('/login');
        logger.error('User not authenticated. Redirect to login page.');
        return;
      }

      const updatedProjectData = {
        name: projectName,
        description: projectDescription,
        identifier: projectIdentifier,
        is_public: isPublic,
        module: projectModule,
      };

      const response = await axios.put(
        `http://127.0.0.1:3000/projects/${projectId}.json`,
        { project: updatedProjectData },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${infoUser}`,
          },
        },
      );

      if (response.status === 200 || response.status === 204) {
        setProjectName(updatedProjectData.name); // Perbarui state setelah perubahan berhasil
        navigate(`/projects/${projectId}`);
      }
    } catch (error) {
      console.error('Error while updating project:', error);
    }
  };

  return (
    <div className="edit-project-page">
      <h2>Edit Proyek</h2>
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
          {/* ... */}
        </label>
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
};

export default EditProject;
