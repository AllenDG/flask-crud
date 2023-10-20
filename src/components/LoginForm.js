import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const LoginForm = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      if (response.status === 200) {
        console.log(response.data.message); // Log the response message
        // Redirect to main page on successful login
        navigate('/crud');
      } else {
        // Handle other status codes if needed
        console.error('Login failed:', response.data.message);
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle other errors if needed
      setMessage('Failed to log in. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {message && <div className="alert">{message}</div>}
      <div className="input-group">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="input-group">
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="input-group">
        <button onClick={handleLogin}>Login</button>
      </div>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default LoginForm;
