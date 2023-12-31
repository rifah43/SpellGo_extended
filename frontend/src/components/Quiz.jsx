import React, { useState, useEffect } from 'react';
import { Form, Radio, Modal, Spin, Empty, Result } from 'antd';
import axios from 'axios';
import './Quiz.css';
import { SmileOutlined } from '@ant-design/icons';

const { Group } = Radio;

function QuizComponent() {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300);
  let timerInterval;
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showAddResultModal, setShowAddResultModal] = useState(false);
  const [marks, setMarks] = useState(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('http://localhost:5000/quiz/quiz', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setIsLoading(false);
        startTimer();
      })
      .catch((error) => console.error(error));

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
  }

  const handleCloseAddResultModal = () => {
    form.resetFields();
    setShowAddResultModal(false);
  };

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
  }

  function updateTimer() {
    setTimeLeft((prevTime) => {
      if (prevTime <= 0) {
        clearInterval(timerInterval);
        return 0;
      }
      return prevTime - 1;
    });
  }

  const handleFormSubmit = async () => {
    clearInterval(timerInterval);

    const selectedAnswersArray = Object.values(selectedAnswers);

    const quizData = {
      questions: questions.map((question) => question._id),
      answers: selectedAnswersArray,
      timeSpent: 300 - timeLeft,
    };

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:5000/quiz/evaluate', quizData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const result = response.data;
        console.log('Quiz Result:', result);
        setMarks(result.score);
        setTotalCorrectAnswers(result.correct);
        setShowAddResultModal(true);
      } else {
        console.error('Failed to submit quiz data.');
      }
    } catch (error) {
      console.error('Error during quiz submission:', error);
    }
  };

  const handleAnswerChange = (questionId, answerId) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };

  if (isLoading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {questions.length === 0 ? <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ backgroundColor: 'white', padding: '1%', borderRadius: '1em' }}>
          <Empty />
        </div>
      </div>
        :
        <Form form={form} onFinish={handleFormSubmit}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div id="timer">Time left: {formatTime(timeLeft)}</div>
          </div>
          <div style={{ height: '70vh', width: '100%', overflowY: 'auto', padding: '1%' }}>
            {questions.map((question, index) => (
              <div className="question" key={question._id}>
                <h3>
                  {index + 1}. {question.question}
                </h3>
                <Group
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  value={selectedAnswers[question._id]}
                >
                  {question.answers && question.answers.length > 0 ? (
                    question.answers.map((answer) => (
                      <div key={answer._id}>
                        <Radio value={answer._id}>{answer.value}</Radio>
                      </div>
                    ))
                  ) : (
                    <p>No answers found for this question.</p>
                  )}
                </Group>
              </div>
            ))}
          </div>
          <input type="hidden" name="time" id="time" value={300 - timeLeft} />
          <button type='submit'>Submit</button>
        </Form>
      }
      <Modal title="Score" open={showAddResultModal} onOk={handleCloseAddResultModal} onCancel={handleCloseAddResultModal}>
        <Result
          icon={<SmileOutlined />}
          title={`Thanks for performing the quiz! \n Total marks: ${marks} \n Total correct answers: ${totalCorrectAnswers}`}
        />
      </Modal>
    </div>
  );
}

export default QuizComponent;
