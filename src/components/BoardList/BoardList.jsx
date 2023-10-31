import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [topics, setTopics] = useState([]);

  // Handle board selection
  const handleBoardSelect = (board) => {
    setSelectedBoard(board);
  };

  // Render the list of boards
  const renderBoardList = () => {
    return (
      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            <button onClick={() => handleBoardSelect(board)}>{board.name}</button>
          </li>
        ))}
      </ul>
    );
  };

  // Render the list of topics for the selected board
  const renderTopicList = () => {
    return (
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>{topic.title}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Board List</h2>
      {renderBoardList()}

      {selectedBoard && (
        <div>
          <h2>
            Topics for
            {' '}
            {selectedBoard.name}
          </h2>
          {renderTopicList()}
        </div>
      )}
    </div>
  );
};

export default BoardList;
