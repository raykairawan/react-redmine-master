import React, { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import useProject from '../../store/useProject';
import useAuthStore from '../../store/useAuthStore';

import './Home.scss';

const Home = () => {
  const token = useAuthStore((state) => state.token);
  const { projects, setProjects } = useProject();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/projects.json', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const projectsData = response.data.projects;
        setProjects(projectsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, [token, setProjects]);

  return (
    <div>
      <h1>Selamat Datang di Redmine</h1>
      <div className="project-list">
        <h1>Daftar Proyek Redmine</h1>
        {projects.slice(0, 2).map((project) => (
          <div key={project.id} className="card">
            <div className="card-body">
              <h2>{project.name}</h2>
              <p>
                Deskripsi Project :
                {' '}
                {project.description}
              </p>
              <p>
                Dibuat tanggal :
                {' '}
                {moment(project.created_on).format('DD MMMM YYYY')}
              </p>
            </div>
          </div>
        ))}
        {projects.length > 2 && (
          <a href="/all-projects">Lihat Semua Proyek</a>
        )}
      </div>
    </div>
  );
};

export default Home;