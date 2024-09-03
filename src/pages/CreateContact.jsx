import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import {useNavigate } from 'react-router-dom';

const CreateContact = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/contacts', formData);
      console.log('Contact created:', response.data);
      alert('Contact created successfully!');
      // Optionally, reset the form
      setFormData({
        name: '',
        email: '',
        phone: '',
      });
      navigate('/contacts'); // Navigate to contacts page after login
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error:', error.response.data.message);
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error('Error:', error.message);
        alert('An error occurred while creating the contact.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Contact</button>
    </form>
  );
};

export default CreateContact;
