import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './ProjectMember.scss';
import { useParams } from 'react-router-dom';

const ProjectMembers = () => {
  const { id } = useParams();
  const projectId = id;
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', role: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [nameFilter, setNameFilter] = useState(false);
  const [roleFilter, setRoleFilter] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}/memberships.json`)
      .then((response) => {
        setMembers(response.data.members);
      })
      .catch((error) => {
        console.error('Error fetching project members:', error);
      });
  }, [projectId]);

  const addMember = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}/memberships.json`, newMember)
      .then((response) => {
        setNewMember({ name: '', role: '' });
      })
      .catch((error) => {
        console.error('Error adding project member:', error);
      });
  };

  const removeMember = (memberId) => {
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}/memberships/${memberId}.json`)
      .then((response) => {
      })
      .catch((error) => {
        console.error('Error removing project member:', error);
      });
  };

  const filteredMembers = members.filter((member) => {
    if (!searchTerm) return true;

    const nameMatch = !nameFilter || member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = !roleFilter || member.role.toLowerCase().includes(searchTerm.toLowerCase());

    return nameMatch || roleMatch;
  });

  return (
    <div className="project-members-container">
      <h1>Project Members</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={nameFilter}
          onChange={() => setNameFilter(!nameFilter)}
        />
        Name
      </label>
      <label>
        <input
          type="checkbox"
          checked={roleFilter}
          onChange={() => setRoleFilter(!roleFilter)}
        />
        Role
      </label>
      <ul>
        {filteredMembers.map((member) => (
          <li key={member.id}>
            {member.name}
            {' '}
            -
            {' '}
            {member.role}
            <button onClick={() => removeMember(member.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Add New Member</h2>
      <input
        type="text"
        placeholder="Name"
        value={newMember.name}
        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Role"
        value={newMember.role}
        onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
      />
      <button onClick={addMember}>Add Member</button>
    </div>
  );
};

export default ProjectMembers;
