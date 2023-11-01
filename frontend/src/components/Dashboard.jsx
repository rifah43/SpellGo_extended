import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Progress from './Progress';
import './Dashboard.css';
import GameComponent from './Game';
import QuestionList from './QuestionList';
import QuizComponent from './Quiz';
import ProfileUpdate from './Profile';
import Chat from './Chat';

function Dashboard() {
  const [role, setRole] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const userRole = localStorage.getItem('role');
    if (userRole === 'user') {
      setRole(true);
    }
  }, []);

  return (
    <div>
      {/* <h1 className="dashboard-title">Welcome to the Dashboard</h1> */}
      <Navbar />
      <div className="dashboard">
      
        <div className="dashboard-content">
          
          <Routes>
          <Route path="/profile-edit" element={<ProfileUpdate />} />
            {role && (
              <>
                <Route path="/progress" element={<Progress />} />
                <Route path="/perform-quiz" element={<QuizComponent />} />
                <Route path="/game" element={<GameComponent />} />
                <Route path="/chatbot" element={<Chat />} />
              </>
            )}
            {!role && (
              <Route path="/quiz" element={<QuestionList />} />
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
