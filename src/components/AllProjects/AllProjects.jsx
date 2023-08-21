import React, { useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

import useProject from '../../store/useProject';
import useAuthStore from '../../store/useAuthStore';

import './AllProjects.scss';

const AllProjects = () => {
  const token = useAuthStore((state) => state.token);
  const { projects, setProjects } = useProject();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_PROJECTS, {
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
      <div className="project-list">
        <h1>Semua Proyek Redmine</h1>
        {projects.length > 0 && projects.map((project) => (
          <div key={project.id} className="card">
            <div className="card-body">
              <h2><Link to={`/projects/${project.id}`}>{project.name}</Link></h2>
              <p>
                Deskripsi Project :
                {' '}
                {project.description}
              </p>
              <p>
                Dibuat tanggal :
                {' '}
                {
                  DateTime.fromISO(project.created_on)
                    .setLocale('id').toFormat('dd MMMM yyyy')
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;