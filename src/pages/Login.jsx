// src/pages/Login.js
import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import {useNavigate } from 'react-router-dom';
// import { fetchCurrentUser } from '../redux/userSlice';
// import { useDispatch } from 'react-redux';
const Login = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/users/login', formData);
      console.log(response.data); // Accessing data correctly
      alert('Login Successful');
      // Save the token in localStorage
      localStorage.setItem('token', response.data.accessToken);
      navigate('/contacts'); // Navigate to contacts page after login
      // dispatch(fetchCurrentUser());

    } catch (error) {
      // Check if the error response exists and access its data safely
      if (error.response && error.response.data) {
        console.error(error.response.data.message);
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error('Error:', error.message);
        alert('An error occurred during login');
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
