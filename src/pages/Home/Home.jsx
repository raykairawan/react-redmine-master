import React, { useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

import useProject from '../../store/useProject';
import useAuthStore from '../../store/useAuthStore';

import './Home.scss';

const formatDate = (isoDate) => {
  return DateTime.fromISO(isoDate).setLocale('id').toFormat('dd MMMM yyyy');
};

const Home = () => {
  const token = useAuthStore((state) => state.token);
  const { projects, setProjects } = useProject();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_ALLPROJECTS, {
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

  const renderProjectCard = (project) => (
    <div key={project.id} className="card">
      <div className="card-body">
        <h2>
          <Link to={`/projects/${project.id}`}>{project.name}</Link>
        </h2>
        <p>
          Deskripsi Project:
          {' '}
          {project.description}
        </p>
        <p>
          Dibuat tanggal:
          {' '}
          {formatDate(project.created_on)}
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <h1>Selamat Datang di Redmine</h1>
      <div className="project-list">
        <h1>Daftar Proyek Redmine</h1>
        {projects.slice(0, 2).map(renderProjectCard)}
        {projects.length > 2 && (
          <Link to="/projects/lists">Lihat Semua Proyek</Link>
        )}
      </div>
    </div>
  );
};

export default Home;