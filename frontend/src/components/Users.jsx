import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css'; 

const Users = () => {
  const [User, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/list');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching User:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="centered-container">
      <div className="leaderboard-container">
        <h1 className="leaderboard-title">User</h1>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>User Name</th>
            </tr>
          </thead>
          <tbody>
            {User.map((entry, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{entry.firstname} {entry.lastname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;