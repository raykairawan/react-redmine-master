import React from 'react';
import axios from 'axios';
import useProjectStore from '../../store/useProjectStore';
import useAuthStore from '../../store/useAuthStore';

import './AddProject.scss';

const AddProject = () => {
  const projectData = useProjectStore();
  const { token } = useAuthStore();

  const createProject = () => {
    const apiUrl = process.env.REACT_APP_API_ALLPROJECTS;

    const requestData = {
      project: {
        name: projectData.name,
        identifier: projectData.identifier,
        description: projectData.description,
        is_public: projectData.is_public,
      },
    };

    axios.post(apiUrl, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log('Project created successfully!', response.data);
        projectData.resetProjectData();
      })
      .catch((error) => {
        console.error('Error creating project:', error);
      });
  };

  return (
    <div className="add-project-container">
      <h2>Add Project</h2>
      <input
        type="text"
        value={projectData.name}
        onChange={(e) => projectData.setProjectName(e.target.value)}
        placeholder="Project Name"
      />
      <input
        type="text"
        value={projectData.identifier}
        onChange={(e) => projectData.setProjectIdentifier(e.target.value)}
        placeholder="Project Identifier"
      />
      <textarea
        value={projectData.description}
        onChange={(e) => projectData.setProjectDescription(e.target.value)}
        placeholder="Project Description"
      />
      <label>
        Public Project:
        <input
          type="checkbox"
          checked={projectData.is_public}
          onChange={(e) => projectData.setProjectIsPublic(e.target.checked)}
        />
      </label>
      <button onClick={createProject}>Create Project</button>
    </div>
  );
};

export default AddProject;
