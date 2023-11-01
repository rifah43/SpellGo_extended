// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Progress = () => {
//   const [completedLevels, setCompletedLevels] = useState([]);
//   const [levels, setLevels] = useState([]);
//   const [sum, setSum] = useState(0);
//   const [loadingPercentage, setLoadingPercentage] = useState(0);

//   useEffect(() => {
//     fetchProgress();
//   }, []);

//   const fetchProgress = async () => {
//     try {
//       const response = await axios.get('/dashboard/progress');
//       const { completedLevels, levels, sum } = response.data;

//       setCompletedLevels(completedLevels);
//       setLevels(levels);
//       setSum(sum);
//       setLoadingPercentage(calculateLoadingPercentage(levels, completedLevels));
//     } catch (error) {
//       console.error('Error fetching progress:', error.response);
//     }
//   };

//   const calculateLoadingPercentage = (totalLevels, completedLevels) => {
//     if (totalLevels.length === 0) return 0;
//     return (completedLevels.length / totalLevels.length) * 100;
//   };

//   return (
//     <div style={pageStyle}>
//       <br />
//       <br />
//       <br />
//       Points: {sum}
//       <div style={containerStyle}>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={tableHeaderStyle}>Level</th>
//               <th style={tableHeaderStyle}>Completed</th>
//               <th style={tableHeaderStyle}>Best Time</th>
//               <th style={tableHeaderStyle}>Best Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {levels.map((level, index) => {
//               const completedLevel = completedLevels.find(
//                 (item) => item.level_id === level.id
//               );

//               const bestTime = completedLevel ? completedLevel.best_time : null;
//               const bestScore = completedLevel ? completedLevel.best_score : null;

//               return (
//                 <tr key={level.id}>
//                   <td style={tableCellStyle}>{level.algorithm_name}</td>
//                   <td style={tableCellStyle}>
//                     <input
//                       type="checkbox"
//                       id={`level-${level.id}`}
//                       checked={completedLevel !== undefined}
//                       disabled={completedLevel !== undefined}
//                       style={checkboxStyle}
//                     />
//                   </td>
//                   <td style={tableCellStyle}>{bestTime}</td>
//                   <td style={tableCellStyle}>{bestScore}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//       <div style={loadingBarContainerStyle}>
//         <div style={loadingBarStyle}>
//           <div
//             style={{ ...loadingBarFillStyle, width: `${loadingPercentage}%` }}
//           ></div>
//         </div>
//         <h1 style={titleStyle}>Progress</h1>
//       </div>
//     </div>
//   );
// };

// const pageStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
// };

// const titleStyle = {
//   fontSize: '24px',
//   fontWeight: 'bold',
//   textAlign: 'center',
// };

// const containerStyle = {
//   display: 'flex',
//   justifyContent: 'center',
// };

// const tableStyle = {
//   width: '100%',
//   borderCollapse: 'collapse',
// };

// const tableHeaderStyle = {
//   backgroundColor: 'brown',
//   padding: '10px',
//   textAlign: 'center',
//   borderBottom: '1px solid brown',
//   color: 'white',
// };

// const tableCellStyle = {
//   padding: '10px',
//   textAlign: 'center',
//   borderBottom: '3px solid brown',
// };

// const checkboxStyle = {
//   marginRight: '5px',
//   verticalAlign: 'middle',
//   backgroundColor: 'brown',
// };

// const loadingBarContainerStyle = {
//   width: '65%',
//   height: '20px',
//   margin: '100px auto',
//   position: 'fixed',
//   bottom: 0,
// };

// const loadingBarStyle = {
//   height: '100%',
//   backgroundImage:
//     'linear-gradient(to right, #bfbfbf 0%, #bfbfbf 50%, #ffffff 50%, #ffffff 100%)',
//   backgroundSize: '200% 100%',
//   animation: 'progress .5s linear infinite',
// };

// const loadingBarFillStyle = {
//   height: '100%',
//   backgroundColor: 'brown',
//   animation: 'progressFill 1s linear infinite',
// };

// export default Progress;


import React, { useEffect, useState } from 'react';

const Progress = () => {
  const [completedLevels, setCompletedLevels] = useState([
    {
      level_id: 1,
      best_time: '2:34',
      best_score: 95,
    },
    {
      level_id: 2,
      best_time: '1:45',
      best_score: 80,
    },
  ]);

  const [levels, setLevels] = useState([
    {
      id: 1,
      algorithm_name: 'Bubble Sort',
    },
    {
      id: 2,
      algorithm_name: 'Merge Sort',
    },
    {
      id: 3,
      algorithm_name: 'Djikstra\'s Algorithm',
    },
    {
      id: 4,
      algorithm_name: 'Huffman\'s Algorithm',
    },
    {
      id: 5,
      algorithm_name: 'Binary Search',
    },
    {
      id: 6,
      algorithm_name: 'Knuth-Morris-Pratt String Matching',
    },
  ]);

  const sum = 300; // Set your hardcoded points here
  const loadingPercentage = (2 / 6) * 100; // Set the loading percentage you want to display

  const calculateLoadingPercentage = (totalLevels, completedLevels) => {
    if (totalLevels.length === 0) return 0;
    return (completedLevels.length / totalLevels.length) * 100;
  };

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
                (item) => item.level_id === level.id
              );

              const bestTime = completedLevel ? completedLevel.best_time : null;
              const bestScore = completedLevel ? completedLevel.best_score : null;

              return (
                <tr key={level.id}>
                  <td style={tableCellStyle}>{level.algorithm_name}</td>
                  <td style={tableCellStyle}>
                    <input
                      type="checkbox"
                      id={`level-${level.id}`}
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
