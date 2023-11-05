import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Modal } from 'antd';
import './Question.css';
import AddQuestion from './AddQuestion';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
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

  useEffect(() => {
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
        fetchQuestions();
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

  const columns = [
    {
      title: 'No.',
      dataIndex: 'index',
      key: 'index',
      width: '10%',
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      width: '75%',
    },
    {
      title: 'Delete',
      key: 'delete',
      width: '15%',
      render: (text, record) => (
        <div style={{ textAlign: 'center' }}>
          <Button onClick={() => handleDelete(record._id)}>Delete</Button>
        </div>
      ),
    },
  ];

  const data = questions.map((ques, index) => ({
    key: ques._id,
    index: index + 1,
    question: ques.question,
    _id: ques._id,
  }));

  return (
    <div>
      <h2>Questions</h2>
      <button onClick={handleShowAddQuestionModal}>Add Question</button>

      <Table columns={columns} dataSource={data} scroll={{ y: 400 }} />

      <Modal title="Add Questions" open={showAddQuestionModal} onOk={handleCloseAddQuestionModal} onCancel={handleCloseAddQuestionModal} footer={null}>
        <AddQuestion onClose={handleCloseAddQuestionModal} onFetch={fetchQuestions}/>
      </Modal>
    </div>
  );
};

export default QuestionList;
