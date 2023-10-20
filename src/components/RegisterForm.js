import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import './App.css';

const RegisterForm = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });
      setMessage(response.data.message); // Set the message from the server response
      if (response.status === 200) {
        // Redirect to login page on successful registration
        setMessage('Successful'); 
        navigate('/');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('Failed to register. Please try again.'); // Set a generic error message
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {message && <div className="alert">{message}</div>}
      <div className="input-group">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="input-group">
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="input-group">
        <button onClick={handleRegister}>Register</button>
      </div>
      <p>Already have an account? <Link to="/">Login</Link></p> {/* Link to the login page */}
    </div>
  );
};

export default RegisterForm;
