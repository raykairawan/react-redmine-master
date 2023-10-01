import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const IssuesDetail = () => {
  const { issueId } = useParams();
  const [issueData, setIssueData] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/issues/${issueId}.json`,
        );
        const { issue } = response.data;
        setIssueData(issue);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIssue();
  }, [issueId]);

  if (!issueData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Issue Detail</h1>
      <h2>{issueData.subject}</h2>
      <p>
        Description:
        {' '}
        {issueData.description}
      </p>
      {/* Render other issue details as needed */}
    </div>
  );
};

export default IssuesDetail;
