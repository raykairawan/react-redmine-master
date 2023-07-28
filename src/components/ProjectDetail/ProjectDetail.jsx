import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Tab, TabList, TabPanel, Tabs,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useProject from '../../store/useProject';
import useIssues from '../../store/useIssues';
import useAuthStore from '../../store/useAuthStore';
import './ProjectDetail.scss';

const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = id;
  const { projects, setProjects } = useProject();
  const {
    queueIssues, doingIssues, verifiedIssues, doneIssues, selectedStatus,
    setQueueIssues, setDoingIssues, setVerifiedIssues, setDoneIssues, setSelectedStatus,
  } = useIssues();

  const renderIssueList = (issues, category) => {
    const handleMoveTo = async (issueId, targetStatusId) => {
      try {
        await axios.put(`http://127.0.0.1:3000/issues/${issueId}.json`, { issue: { status_id: targetStatusId } });
        const issueToMove = issues.find((issue) => issue.id === issueId);

        if (!issueToMove) {
          console.error(`Issue with id ${issueId} not found.`);
          return;
        }

        const updatedIssueList = issues.map((issue) => (issue.id === issueId ? { ...issue, status_id: targetStatusId } : issue));

        switch (category) {
          case 'Queue':
            setQueueIssues(updatedIssueList);
            break;
          case 'Doing':
            setDoingIssues(updatedIssueList);
            break;
          case 'Verified':
            setVerifiedIssues(updatedIssueList);
            break;
          case 'Done':
            setDoneIssues(updatedIssueList);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error while moving issue:', error);
      }
    };

    return (
      <TabPanel>
        {issues.length ? (
          <ul>
            {issues.map((issue) => (
              <li key={issue.id}>
                {issue.subject}
                <div>
                  <button onClick={() => handleMoveTo(issue.id, selectedStatus)}>Move to</button>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="Queue">Queue</option>
                    <option value="Doing">Doing</option>
                    <option value="Verified">Verified</option>
                    <option value="Done">Done</option>
                  </select>
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
