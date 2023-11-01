import React, { useState } from 'react';
import './ForgotPassword.css'; // Import the CSS file

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Password reset instructions sent to your email.');
      } else {
        setMessage('Password reset request failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container"> {/* Apply the CSS class here */}
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword} className="button-19">Reset Password</button>
      <p id='msg'>{message}</p>
    </div>
  );
}

export default ForgotPassword;
