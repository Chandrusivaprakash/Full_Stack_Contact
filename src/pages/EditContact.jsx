import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const EditContact = () => {
  const { id } = useParams(); // Get the contact ID from the URL
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the contact data
    const fetchContact = async () => {
      try {
        const response = await axiosInstance.get(`/contacts/${id}`);
        setContact(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/contacts/${id}`, contact);
      alert('Contact updated successfully');
      navigate('/contacts'); // Redirect to contacts list
    } catch (error) {
      alert(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={contact.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Update Contact</button>
    </form>
  );
};

export default EditContact;
