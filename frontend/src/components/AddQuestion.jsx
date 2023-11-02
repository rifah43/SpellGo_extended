import React, { useState } from 'react';

function AddQuestion({ onClose }) {
  const [question, setQuestion] = useState('');
  const [algorithm, setAlgorithm] = useState('');
  const [options, setOptions] = useState([
    { isCorrect: true, value: '' },
    { isCorrect: false, value: '' },
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = {
        question: question,
        options: options,
        algorithm: algorithm,
      };
      const token = localStorage.getItem('token');

      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch('http://localhost:5000/quiz/questions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('New question:', data);
        if (data.success) {
          onClose();
          window.location.reload();
        } else {
          window.location.reload();
        }
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddOption = () => {
    if (options.length >= 5) {
      alert('Maximum five options can be added!');
      return;
    }
    setOptions([
      ...options,
      { isCorrect: false, value: '' },
    ]);
  };

  const handleRemoveOption = (index) => {
    if (options.length <= 2) {
      alert('Minimum two options should be present!');
      return;
    }
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSelectOption = (index) => {
    setOptions(
      options.map((option, i) => ({
        ...option,
        isCorrect: i === index,
      }))
    );
  };

  return (
    <div className="container-fluid w-100">
      <div className="header">
        <h1 className="title" id="exampleLabel">
          Add Question
        </h1>
        <button className="btn btn-link" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="question">Question:</label>
              <textarea
                className="form-control"
                id="question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="algorithm">Algorithm Name:</label>
              <input
                className="form-control"
                type='text'
                id="algorithm"
                value={algorithm}
                onChange={(event) => setAlgorithm(event.target.value)}
                required
              ></input>
            </div>
            <div className="form-group">
              <label>Options:</label>
              {options.map((option, index) => (
                <div key={index} className="input-group my-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input
                        type="radio"
                        name="correct_answer"
                        value={index}
                        onChange={() => handleSelectOption(index)}
                        checked={option.isCorrect}
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Option ${index + 1}`}
                    value={option.value}
                    onChange={(event) => {
                      const newOptions = [...options];
                      newOptions[index].value = event.target.value;
                      setOptions(newOptions);
                    }}
                    required
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-success my-2"
                type="button"
                onClick={handleAddOption}
              >
                Add Option
              </button>
              <button className="btn btn-primary float-right" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;