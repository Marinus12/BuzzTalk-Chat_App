// src/components/AuthenticationForm.js

import React, { useState } from 'react';
import axios from 'axios';

const AuthenticationForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/login', { username, password });
      onLogin(response.data.token); // Pass the token back to the parent component
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:4000/register', { username, password });
      onLogin(response.data.token); // Pass the token back to the parent component
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>BuzzTalk - Login/Register</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px' }}
        />
      </div>
      <button onClick={handleLogin} style={{ padding: '10px', marginRight: '10px' }}>
        Login
      </button>
      <button onClick={handleRegister} style={{ padding: '10px' }}>
        Register
      </button>
    </div>
  );
};

export default AuthenticationForm;
