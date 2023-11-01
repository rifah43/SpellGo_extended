import React, { useState, useEffect } from 'react';
import './Quiz.css';

function QuizComponent() {
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300);
  let timerInterval;
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  const handleAnswerChange = (questionId, answerId) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    clearInterval(timerInterval);

    const selectedAnswersArray = Object.values(selectedAnswers);

    const quizData = {
      questions: questions.map((question) => question._id),
      answers: selectedAnswersArray,
      timeSpent: 300 - timeLeft,
    };

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/quiz/evaluate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Quiz Result:', result);
      } else {
        console.error('Failed to submit quiz data.');
      }
    } catch (error) {
      console.error('Error during quiz submission:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="back-link">
        <a href="/dashboard">Back to Dashboard</a>
      </div>
      <br />
      <form onSubmit={handleFormSubmit}>
        <div id="timer">Time left: {formatTime(timeLeft)}</div>
        <div className="question-container">
          {questions.map((question, index) => (
            <div className="question" key={question._id}>
              <h3>
                {index + 1}. {question.question}
              </h3>
              <br />
              <br />
              <hr />
              <ol>
                {question.answers && question.answers.length > 0 ? (
                  question.answers.map((answer) => (
                    <li key={answer._id}>
                      <label>
                        <input
                          type="radio"
                          name={`question_${question._id}`}
                          value={answer._id}
                          onChange={() => handleAnswerChange(question._id, answer._id)}
                          checked={selectedAnswers[question._id] === answer._id}
                        />
                        {answer.value}
                      </label>
                      <hr />
                    </li>
                  ))
                ) : (
                  <p>No answers found for this question.</p>
                )}
              </ol>
            </div>
          ))}
        </div>
        <input type="hidden" name="time" id="time" value={300 - timeLeft} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default QuizComponent;