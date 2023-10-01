import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useIssueStore from '../../store/useIssueStore';

import './AddIssues.scss';

const AddIssues = () => {
  const { projectId } = useParams();
  const issueStore = useIssueStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrackers = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_TRACKER);
        const { trackers } = response.data;
        issueStore.setField('trackers', trackers);
      } catch (error) {
        console.error('Error while fetching trackers:', error);
      }
    };

    const fetchPriorities = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_PRIORITIES);
        const priorities = response.data.issue_priorities;
        issueStore.setField('priorities', priorities);
      } catch (error) {
        console.error('Error while fetching priorities:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_USER);
        const { users } = response.data;
        issueStore.setField('users', users);
      } catch (error) {
        console.error('Error while fetching users:', error);
      }
    };

    fetchTrackers();
    fetchPriorities();
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    issueStore.setField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const infoUser = localStorage.getItem('infoUser');
      if (!infoUser) {
        navigate('/login');
        console.error('User not authenticated. Redirect to login page.');
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}/issues.json`,
        {
          issue: {
            project_id: projectId,
            tracker: issueStore.tracker,
            subject: issueStore.subject,
            description: issueStore.description,
            priority: issueStore.priority,
            started: issueStore.started,
            due_date: issueStore.dueDate,
            done: issueStore.done,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${infoUser}`,
          },
        },
      );

      if (response.status === 201) {
        navigate(`/projects/${projectId}`);
      }
    } catch (error) {
      console.error('Error while adding issue:', error);
    }
  };

  return (
    <div className="add-issues-container">
      <h2>Add New Issue</h2>
      <form className="add-issues-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tracker">Tracker:</label>
          <select name="tracker" value={issueStore.tracker} onChange={handleChange}>
            <option value="">Select Tracker</option>
            {issueStore.trackers.map((tracker) => (
              <option key={tracker.id} value={tracker.id}>
                {tracker.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input type="text" name="subject" value={issueStore.subject} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={issueStore.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Priority:</label>
          <select name="priority" value={issueStore.priority} onChange={handleChange}>
            <option value="">Select Priority</option>
            {issueStore.priorities.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Started:</label>
          <input type="date" name="started" value={issueStore.started} onChange={handleChange} />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={issueStore.dueDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>% Done:</label>
          <select name="done" value={issueStore.done} onChange={handleChange}>
            <option value={0}>0%</option>
            <option value={10}>10%</option>
            <option value={20}>20%</option>
            <option value={30}>30%</option>
            <option value={40}>40%</option>
            <option value={50}>50%</option>
            <option value={60}>60%</option>
            <option value={70}>70%</option>
            <option value={80}>80%</option>
            <option value={90}>90%</option>
            <option value={100}>100%</option>
          </select>
        </div>
        <button type="submit">Add Issue</button>
      </form>
    </div>
  );
};

export default AddIssues;