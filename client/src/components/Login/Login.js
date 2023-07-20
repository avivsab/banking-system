import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:2000/users/login', {
        username,
        password,
      });

      onLogin(username);
      history.push('/account');
    } catch (error) {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">התחברות</h2>
        <form onSubmit={handleLogin}>
          <div className="login-form-group">
            <label>שם משתמש:</label>
            <input type="text" className="login-input" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="login-form-group">
            <label>סיסמא</label>
            <input type="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="login-button">כניסה</button>
        </form>
        {errorMessage && <p className="login-error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
