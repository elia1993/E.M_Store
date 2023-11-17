import React, { useState } from 'react';
import { ButtonContainer } from './Button';
import styled from 'styled-components';

const RegistrationForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    country: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Registration failed:', errorText);
        return;
      }

      const data = await response.json();

      if (data) {
        console.log(data.message);
        // TODO: Add any additional logic or redirection upon successful registration
      } else {
        console.error('Invalid JSON response:', response);
      }
    } catch (error) {
      console.error('Error during registration:', error);
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
    <StyledForm onSubmit={handleSubmit} style={formStyle}>
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={userData.email}
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

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          className="form-control"
          id="country"
          name="country"
          value={userData.country}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={userData.address}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>
    <div className="text-center">
      <StyledButtonContainer type="submit">Register</StyledButtonContainer>
      </div>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  width: 30%;
  margin: 50px auto 20px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ced4da;
`;

const StyledButtonContainer = styled(ButtonContainer)`
  background-color: var(--mainBlue);
  color: white;
  width: 200px;
  font-size: 14px;
`;

export default RegistrationForm;
