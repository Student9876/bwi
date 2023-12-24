import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';


function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();



  async function fetchLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (!response.ok) {
        props.handleLogin(false);
        throw new Error('Invalid credentials');
      } else {
        props.handleLogin(true);
        navigate('/dashboard');
      }
      props.getProfileDetails(response);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className='login'>
      <div className='loginContainer'>
        <h2>Login</h2>
        <form onSubmit={fetchLogin}>
          <div style={{ margin: '1rem' }}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={{ margin: '1rem' }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <button className='button' type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
