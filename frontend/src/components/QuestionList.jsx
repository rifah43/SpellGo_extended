import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Question.css';
import AddQuestion from './AddQuestion';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/quiz/questions', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        } else {
          console.error('Failed to fetch questions:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/quiz/questions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to delete question');
      }
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };

  const handleShowAddQuestionModal = () => {
    setShowAddQuestionModal(true);
  };

  const handleCloseAddQuestionModal = () => {
    setShowAddQuestionModal(false);
  };

  return (
    <div>
      <h2>Questions</h2>
      <button><Link to="/dashboard">Dashboard</Link></button>
      <button onClick={handleShowAddQuestionModal}>Add Question</button>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Question</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((ques, index) => (
            <tr key={ques._id}>
              <td>{index + 1}</td>
              <td>{ques.question}</td>
              <td>
                <button onClick={() => handleDelete(ques._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddQuestionModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseAddQuestionModal}>&times;</span>
            <AddQuestion onClose={handleCloseAddQuestionModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionList;