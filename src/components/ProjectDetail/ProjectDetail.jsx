import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Tab, TabList, TabPanel, Tabs,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import useProject from '../../store/useProject';
import useIssues from '../../store/useIssues';
import logger from '../../log/logger';
import './ProjectDetail.scss';

const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = id;
  const [isProjectDeleted, setIsProjectDeleted] = useState(false);
  const [isIssueDeleted, setIsIssueDeleted] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { projects, setProjects } = useProject();
  const {
    queueIssues, doingIssues, verifiedIssues, doneIssues, selectedStatus, isLoading,
    setIsLoading, setQueueIssues, setDoingIssues, setVerifiedIssues, setDoneIssues, setSelectedStatus,
  } = useIssues();
  const navigate = useNavigate();

  axios.interceptors.request.use((config) => {
    const infoUser = localStorage.getItem('infoUser');
    if (infoUser) {
      // eslint-disable-next-line no-param-reassign
      config = {
        ...config,
        headers: {
          ...config.headers,
          'Content-Type': 'application/json',
          Authorization: `Basic ${infoUser}`,
        },
      };
    }
    return config;
  });

  const statusMapping = {
    New: 'Queue',
    'In Progress': 'Doing',
    Feedback: 'Verified',
    Resolved: 'Done',
    Closed: 'Done',
  };

  const showDeleteAlert = () => {
    setShowDeleteConfirmation(true);
  };

  const hideDeleteAlert = () => {
    setShowDeleteConfirmation(false);
  };

  const renderIssueList = (issues, category) => {
    const handleMoveTo = async (issueId, newStatus) => {
      try {
        logger.info('Move button clicked for issueId:', issueId);
        logger.debug('New status selected:', newStatus);

        setIsLoading(true);
        const infoUser = localStorage.getItem('infoUser');
        if (!infoUser) {
          navigate('/login');
          console.error('User not authenticated. Redirect to login page.');
          return;
        }

        const response = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/issues/${issueId}.json`,
          { issue: { status_id: newStatus } },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${infoUser}`,
            },
          },
        );

        if (response.status === 200 || response.status === 204) {
          const updatedIssueIndex = issues.findIndex((issue) => issue.id === issueId);
          if (updatedIssueIndex !== -1) {
            const updatedIssues = [...issues];
            updatedIssues[updatedIssueIndex].status.name = statusMapping[newStatus] || newStatus;
            switch (category) {
              case 'Queue':
                setQueueIssues(updatedIssues);
                break;
              case 'Doing':
                setDoingIssues(updatedIssues);
                break;
              case 'Verified':
                setVerifiedIssues(updatedIssues);
                break;
              case 'Done':
                setDoneIssues(updatedIssues);
                break;
              default:
                break;
            }
          }
          setIsLoading(false);
          window.location.reload();
        }
      } catch (error) {
        logger.error('Error while moving issue:', error);
        setIsLoading(false);
      }
    };

    const handleEditIssue = (issueId) => {
      navigate(`/projects/${projectId}/issues/${issueId}/edit`);
    };

    const handleDeleteIssue = async (issueId) => {
      // eslint-disable-next-line no-alert
      const confirmDelete = window.confirm('Are you sure you want to delete this issue?');

      if (!confirmDelete) {
        return;
      }

      try {
        const infoUser = localStorage.getItem('infoUser');
        if (!infoUser) {
          navigate('/login');
          console.error('User not authenticated. Redirect to login page.');
          return;
        }

        const response = await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/issues/${issueId}.json`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${infoUser}`,
            },
          },
        );

        if (response.status === 204) {
          console.log(`Issue ${issueId} has been deleted.`);
          setIsIssueDeleted(true);
        }
      } catch (error) {
        console.error(`Error while deleting issue ${issueId}:`, error);
      }
    };

    if (isIssueDeleted) {
      window.location.reload();
    }

    return (
      <TabPanel>
        {issues.length ? (
          <ul>
            {issues.map((issue) => (
              <li key={issue}>
                <Link to={`/projects/${projectId}/issues/${issue.id}`}>{issue.subject}</Link>
                <div>
                  <button onClick={() => handleMoveTo(issue.id, selectedStatus)}>Move to</button>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="1">Queue</option>
                    <option value="2">Doing</option>
                    <option value="4">Verified</option>
                    <option value="3">Done</option>
                  </select>
                </div>
                <div>
                  <button onClick={() => handleEditIssue(issue.id)}>Edit</button>
                  <button onClick={() => handleDeleteIssue(issue.id)}>Delete</button>
                  {showDeleteConfirmation === issue.id && (
                  <div className="delete-confirmation">
                    <p>Are you sure you want to delete this issue?</p>
                    <button className="confirm-button" onClick={() => handleDeleteIssue(issue.id)}>
                      Confirm Delete
                    </button>
                    <button className="cancel-button" onClick={() => setShowDeleteConfirmation(null)}>
                      Cancel
                    </button>
                  </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            No issues in
            {' '}
            {category}
          </p>
        )}
      </TabPanel>
    );
  };

  const createNewBoard = async () => {
    navigate(`/projects/${projectId}/boards`);
  };

  const handleMemberProject = () => {
    navigate(`/projects/${projectId}/memberships`);
  };

  useEffect(() => {
    logger.info('ProjectDetail component mounted');
    logger.debug('projectId changed:', projectId);

    const fetchProject = async () => {
      try {
        const infoUser = localStorage.getItem('infoUser');
        if (!infoUser) {
          navigate('/login');
          console.error('User not authenticated. Redirect to login page.');
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}.json`,
        );
        const projectData = response.data.project;
        logger.debug('Project API response:', response.data);
        setProjects(projectData);

        const issuesResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}/issues.json`,
        );
        const issuesData = issuesResponse.data.issues;
        logger.debug('Issues API response:', issuesResponse.data);

        logger.debug('Project data fetched:', projectData);
        logger.debug('Issues data fetched:', issuesData);

        const categorizedIssues = Array.isArray(issuesData)
          ? issuesData.map((issue) => ({
            ...issue,
            status: { ...issue.status, name: statusMapping[issue.status.name] || issue.status.name },
          }))
          : [];

        // Update the state with the categorized issues
        setQueueIssues(categorizedIssues.filter((issue) => issue.status.name === 'Queue'));
        setDoingIssues(categorizedIssues.filter((issue) => issue.status.name === 'Doing'));
        setVerifiedIssues(categorizedIssues.filter((issue) => issue.status.name === 'Verified'));
        setDoneIssues(categorizedIssues.filter((issue) => issue.status.name === 'Done'));
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [projectId, setProjects, setQueueIssues, setDoingIssues, setVerifiedIssues, setDoneIssues]);

  const handleEditProject = () => {
    navigate(`/projects/edit/${projectId}`);
  };

  const handleDeleteProject = async () => {
    showDeleteAlert();
    try {
      const infoUser = localStorage.getItem('infoUser');
      if (!infoUser) {
        navigate('/login');
        console.error('User not authenticated. Redirect to login page.');
        return;
      }

      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}.json`,
      );

      if (response.status === 204) {
        setIsProjectDeleted(true);
      }
    } catch (error) {
      console.error('Error while deleting project:', error);
    }
  };

  if (isProjectDeleted) {
    return (
      <div>
        <p>Proyek telah dihapus.</p>
        <button onClick={() => navigate('/projects/lists')}>Kembali ke Daftar Proyek</button>
      </div>
    );
  }

  const isAdmin = JSON.parse(localStorage.getItem('userData')).user.login === 'admin';

  return (
    <div className="project-detail-container">
      {showDeleteConfirmation && (
      <div className="delete-confirmation">
        <p>Are you sure you want to delete this project?</p>
        <button className="confirm-button" onClick={handleDeleteProject}>
          Confirm Delete
        </button>
        <button className="cancel-button" onClick={hideDeleteAlert}>
          Cancel
        </button>
      </div>
      )}
      <div className="project-header">
        <h2>{projects.name}</h2>
        <div className="action-buttons">
          {isAdmin && (
          <>
            <button className="icon-button" onClick={handleEditProject}>
              <FontAwesomeIcon icon={faEdit} />
              Edit
            </button>
            <button className="icon-button" onClick={handleDeleteProject}>
              <FontAwesomeIcon icon={faTrashAlt} />
              Delete
            </button>
            <button className="icon-button" onClick={handleMemberProject}>
              <FontAwesomeIcon icon={faUser} />
              Member
            </button>
          </>
          )}
        </div>
      </div>
      <p>{projects.description}</p>
      <Link to={`/projects/${projectId}/add/issues`} className="add-issue-button">
        Add New Issue
      </Link>
      <Tabs>
        <TabList className="tab-list">
          <Tab>Queue</Tab>
          <Tab>Doing</Tab>
          <Tab>Verified</Tab>
          <Tab>Done</Tab>
        </TabList>
        {renderIssueList(queueIssues, 'Queue')}
        {renderIssueList(doingIssues, 'Doing')}
        {renderIssueList(verifiedIssues, 'Verified')}
        {renderIssueList(doneIssues, 'Done')}
      </Tabs>
      {isAdmin && (
      <button onClick={createNewBoard}>Buat Board Baru</button>
      )}
      <h3>Boards:</h3>
    </div>
  );
};

export default ProjectDetail;
