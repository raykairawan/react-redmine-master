/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

import useIssue from '../../store/useIssues';

import './AllIssues.scss';

const AllIssues = () => {
  const infoUser = localStorage.getItem('infoUser');
  const { issues, setIssues } = useIssue();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_ISSUES, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${infoUser}`,
          },
        });
        const issuesData = response.data.issues;
        setIssues(issuesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIssues();
  }, [infoUser, setIssues]);

  return (
    <div>
      <div className="issue-list">
        <h1>Semua Isu Redmine</h1>
        {issues.length > 0 && issues.map((issue, project) => (
          <div key={issue.id} className="card">
            <div className="card-body">
              <h2><Link to={`/projects/${project.id}/issues/${issue.id}`}>{issue.subject}</Link></h2>
              <p>
                Deskripsi Isu :
                {' '}
                {issue.description}
              </p>
              <p>
                Dibuat tanggal :
                {' '}
                {
                  DateTime.fromISO(issue.created_on)
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

export default AllIssues;
