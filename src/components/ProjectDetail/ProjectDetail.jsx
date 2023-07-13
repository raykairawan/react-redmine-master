import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useProject from '../../store/useProject';

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const projectId = id;
  const { projects, setProjects } = useProject();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/projects/${projectId}.json`);
        const projectData = response.data.project;
        setProjects(projectData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [projectId, setProjects]);

  return (
    <div>
      <h1>Detail Proyek</h1>
    </div>
  );
};

export default ProjectDetail;
