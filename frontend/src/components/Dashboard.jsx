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
import Theme from './Theme';
import LevelForm from './AddLevel';
import Leaderboard from './Leaderboard';
import Levels from './Displaylevel';
import Users from './Users';

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
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-content">
          <Routes>
            <Route path="/profile-edit" element={<ProfileUpdate />} />
            {role && (
              <>
                <Route path="/" element={<Leaderboard />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/perform-quiz" element={<QuizComponent />} />
                <Route path="/game" element={<GameComponent className="game-component"/>} />
                <Route path="/chatbot" element={<Chat />} />
                <Route path="/customThemeAdder" element={<Theme />} />
              </>
            )}
            {!role && (
              <>
                <Route path="/" element={<Users />} />
                <Route path="/levels" element={<Levels />} />
                <Route path="/quiz" element={<QuestionList />} />
                <Route path="/add-level" element={<LevelForm />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;