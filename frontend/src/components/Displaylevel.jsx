import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css'; 

const Levels = () => {
  const [level, setlevel] = useState([]);

  useEffect(() => {
    const fetchlevel = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/level');
        setlevel(response.data);
      } catch (error) {
        console.error('Error fetching level:', error);
      }
    };

    fetchlevel();
  }, []);

  return (
    <div className="centered-container">
      <div className="leaderboard-container">
        <h1 className="leaderboard-title">Game levels</h1>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Level Name</th>
            </tr>
          </thead>
          <tbody>
            {level.map((entry, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{entry.algorithm_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Levels;