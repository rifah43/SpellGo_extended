import React, { useState } from 'react';
import axios from 'axios';
import './Add.css';

function LevelForm() {
  const [formData, setFormData] = useState({
    algorithm_name: '',
    level_no: 0,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/add/levels', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to add a new level.');
    }
  };

  return (
    <div>
      <h2>Add a New Level</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="algorithm_name">Algorithm Name:</label>
          <input
            type="text"
            id="algorithm_name"
            name="algorithm_name"
            value={formData.algorithm_name}
            onChange={handleChange}
          />
        </div>
        <div class="custom-form">
          <label htmlFor="level_no">Level Number:</label>
          <input
            type="number"
            id="level_no"
            name="level_no"
            value={formData.level_no}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit">Add Level</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default LevelForm;