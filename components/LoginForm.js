import React, { useState, useContext } from 'react';
import { ButtonContainer } from './Button';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProductContext } from '../context';

const LoginForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const { setUser } = useContext(ProductContext);

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Login Data:', userData);

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Login failed: ' + response.statusText);
      }

      const data = await response.json();

      if (data.success) {
        // Assuming the API response includes a user object
        setUser(data.user);
        console.log('Login successful:', data.message);
        // Redirect to the home page after successful login
        history.push('/');
      } else {
        console.error('Invalid credentials:', data.message);
        // Handle login failure, display an error message, etc.
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle network errors or other issues
    }
  };

  const formStyle = {
    width: '30%',
    margin: '50px auto 20px',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ced4da',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    boxSizing: 'border-box',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div className="text-center">
        <ButtonContainer type="submit" style={{ backgroundColor: 'var(--mainBlue)', color: 'white', width: '200px', fontSize: '14px' }}>
          Login
        </ButtonContainer>
      </div>
    </form>
  );
};

const LoginPage = () => {
  return (
    <div>
      <LoginForm />

      <NewToStoreContainer className="mt-3">
        <Hr />
        <span>New to E.M Store?</span>
        <Hr />
      </NewToStoreContainer>

      <div className="text-center">
        <Link to="/register" className="btn btn-outline-primary mt-2" style={{ width: '200px', fontSize: '12px', borderRadius: '8px' }}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

const NewToStoreContainer = styled.div`
  text-align: center;
  position: relative;
`;

const Hr = styled.hr`
  display: inline-block;
  width: 10%;
  margin: 0 10px;
`;
