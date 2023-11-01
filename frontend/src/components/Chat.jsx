import React, { useState } from 'react';

const Chat = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch('http://localhost:5000/user/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }), 
      });

      if (resp.status === 200) {
        const responseData = await resp.text();
        setResponse(responseData);
      } else {
        console.error('Error:', resp.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='message-container'>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your prompt:
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Chat;