import React, { useState } from 'react';
// import './Profile.css';
import './LoginForm.css';

function ProfileUpdate() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleProfileUpdate = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          newPassword: newPassword,
        }),
      });

      if (response.ok) {
        setMessage('Profile updated successfully.');
      } else {
        setMessage('Profile update failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Profile Update</h2>
      <input
        type="text"
        placeholder="Change First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Change Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <input
        type="email"
        placeholder="Change Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Previous Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleProfileUpdate}>Update Profile</button>
      <p>{message}</p>
    </div>
  );
}

export default ProfileUpdate;