import React, { useEffect, useState } from 'react';

const Progress = () => {
  const [completedLevels, setCompletedLevels] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('http://localhost:5000/progress/reports', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        return response.json();
      })
      .then((data) => {
        setCompletedLevels(data.reports);
      })
      .catch((error) => console.error(error));

    fetch('http://localhost:5000/level/info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        return response.json();
      })
      .then((data) => {
        setLevels(data.levelInfo);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(completedLevels, levels);

  const sum = 300; // Set your hardcoded points here
  const loadingPercentage = (completedLevels.length / levels.length) * 100; // Set the loading percentage you want to display

  // const calculateLoadingPercentage = (totalLevels, completedLevels) => {
  //   if (totalLevels.length === 0) return 0;
  //   return (completedLevels.length / totalLevels.length) * 100;
  // };

  return (
    <div style={pageStyle}>
      <br />
      <br />
      <br />
      Points: {sum}
      <div style={containerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Level</th>
              <th style={tableHeaderStyle}>Completed</th>
              <th style={tableHeaderStyle}>Best Time</th>
              <th style={tableHeaderStyle}>Best Score</th>
            </tr>
          </thead>
          <tbody>
            {levels.map((level, index) => {
              const completedLevel = completedLevels.find(
                (item) => item.level_id === level._id
              );

              const bestTime = completedLevel ? completedLevel.best_time : null;
              const bestScore = completedLevel ? completedLevel.best_score : null;

              return (
                <tr key={level._id}>
                  <td style={tableCellStyle}>{level.algorithm_name}</td>
                  <td style={tableCellStyle}>
                    <input
                      type="checkbox"
                      id={`level-${level._id}`}
                      checked={completedLevel !== undefined}
                      disabled={completedLevel !== undefined}
                      style={completedLevel !== undefined ? blackCheckboxStyle : checkboxStyle}
                    />
                  </td>
                  <td style={tableCellStyle}>{bestTime}</td>
                  <td style={tableCellStyle}>{bestScore}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={loadingBarContainerStyle}>
        <div style={loadingBarStyle}>
          <div style={{ ...loadingBarFillStyle, width: `${loadingPercentage}%` }}></div>
        </div>
        <h1 style={titleStyle}>Progress</h1>
      </div>
    </div>
  );
};

const pageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const tableStyle = {
  backgroundColor: 'white',
  width: '100%',
  borderCollapse: 'collapse',
};

const tableHeaderStyle = {
  backgroundColor: 'brown',
  padding: '10px',
  textAlign: 'center',
  borderBottom: '1px solid brown',
  color: 'white',
};

const tableCellStyle = {
  padding: '10px',
  textAlign: 'center',
  borderBottom: '3px solid brown',
};

const checkboxStyle = {
  marginRight: '5px',
  verticalAlign: 'middle',
  backgroundColor: 'black',
};

const blackCheckboxStyle = {
  marginRight: '5px',
  verticalAlign: 'middle',
  backgroundColor: 'black',
  borderRadius: '5px', // Optional: Add rounded corners for a better look
};

const loadingBarContainerStyle = {
  width: '65%',
  height: '20px',
  margin: '100px auto',
  position: 'fixed',
  bottom: 0,
};

const progressAnimation = {
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to right, #ff8a00, #f45000, #ff8a00)',
  backgroundSize: '200% 100%',
  animation: 'progress 2s linear infinite',
};

const loadingBarStyle = {
  ...progressAnimation,
};

const loadingBarFillStyle = {
  height: '100%',
  backgroundColor: 'brown',
  animation: 'progressFill 1s linear infinite',
};

export default Progress;
