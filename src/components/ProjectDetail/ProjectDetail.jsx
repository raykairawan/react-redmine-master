import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Tab, TabList, TabPanel, Tabs,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useProject from '../../store/useProject';
import useIssues from '../../store/useIssues';
import './ProjectDetail.scss';

const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = id;
  const { projects, setProjects } = useProject();
  const {
    queueIssues, doingIssues, verifiedIssues, doneIssues,
    setQueueIssues, setDoingIssues, setVerifiedIssues, setDoneIssues,
  } = useIssues();

  const renderIssueList = (issues, category) => {
    return (
      <TabPanel>
        {issues.length ? (
          <ul>
            {issues.map((issue) => (
              <li key={issue.id}>{issue.subject}</li>
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

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/projects/${projectId}.json`);
        const projectData = response.data.project;
        setProjects(projectData);

        const issuesResponse = await axios.get(`http://127.0.0.1:3000/projects/${projectId}/issues.json`);
        const issuesData = issuesResponse.data.issues;

        const statusMapping = {
          Baru: 'Queue',
          'Dalam proses': 'Doing',
          'Umpan balik': 'Verified',
          Resolved: 'Done',
          'To Do': 'Queue',
          Closed: 'Done',
        };

        const categorizedIssues = Array.isArray(issuesData)
          ? issuesData.map((issue) => ({
            ...issue,
            status: { ...issue.status, name: statusMapping[issue.status.name] || issue.status.name },
          }))
          : [];

        console.log('Categorized Issues:', categorizedIssues);

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

  return (
    <div className="project-detail-container">
      <h2>{projects.name}</h2>
      <p>{projects.description}</p>
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
    </div>
  );
};

export default ProjectDetail;
