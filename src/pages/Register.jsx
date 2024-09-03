// src/pages/Register.js
import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import{useNavigate}from "react-router-dom"

const Register = () => {
    const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/users/register', formData);
      console.log(response.data);
      alert('Registration Successful');
      navigate('/login');
    } catch (error) {
      console.error(error.response.data.message);
      alert('Error registering user');
      
    }
  };

  let HandleLoginPage=()=>{
    navigate('/login');
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        name="username"
        value={username}
        onChange={onChange}
        placeholder="Username"
        required
      />
      <input
        type="text"
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
      <button type="submit">Register</button>
      <button onClick={HandleLoginPage}>Login</button>
    </form>
  );
};

export default Register;
