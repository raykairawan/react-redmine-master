import React, { useEffect } from 'react';
import axios from 'axios';
import useProject from '../../store/useProject';

const Home = () => {
  const { projects, setProjects } = useProject();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000//projects.json');
        const projectsData = response.data.projects;
        setProjects(projectsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, [setProjects]);

  return (
    <div>
      <h1>Selamat Datang di Redmine</h1>
      <h1>Daftar Proyek Redmine</h1>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <p>{project.created_on}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;