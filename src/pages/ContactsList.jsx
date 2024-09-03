// src/pages/ContactsList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import {useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { fetchCurrentUser } from '../redux/userSlice';
const ContactsList = () => {
    const navigate = useNavigate();
    const Dispatch=useDispatch()
  const [contacts, setContacts] = useState([]);
  const { userInfo} = useSelector((state) => state.user);  

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axiosInstance.get('/contacts'); // JWT will be included in headers
        setContacts(response.data);
        Dispatch(fetchCurrentUser());
      } catch (error) {
        console.error('Error fetching contacts:', error);
        
      }
    };

    fetchContacts();
  }, []);

  let HandleAddUser=()=>{
    navigate('/create-contact'); // Navigate to contacts page after login
  }
  let HandleEdit=(id)=>{
    navigate(`/edit-contact/${id}`);
  }
  let HandleDelete=(_id)=>{
    
    const DeleteContacts = async () => {
        try {
          const response = await axiosInstance.delete(`/contacts/${_id}`); // JWT will be included in headers
          
        } catch (error) {
          console.error('Error fetching contacts:', error);
          
        }
      };
  
      DeleteContacts();
    
  }
  let HandleLogout=()=>{
    Dispatch(logout())
    navigate('/login'); 
  }


  return (
    <div>
          <div>
          <p>Username: {userInfo ? userInfo.username : null}</p>
          <p>Email: {userInfo ? userInfo.email : null}</p>
          <p>id: {userInfo ? userInfo.id : null}</p>
          <h1><button onClick={HandleLogout}>Logout</button></h1>
        </div>
      <h2>Contacts List</h2>
        <button onClick={HandleAddUser}>Add User</button>
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>user_id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Controles</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact,index) => (
              <tr key={contact._id}>
                <td>{contact._id}</td>
                <td>{contact.user_id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{new Date(contact.createdAt).toLocaleString()}</td>
                <td>{new Date(contact.updatedAt).toLocaleString()}</td>
                <td><button onClick={()=>HandleEdit(contact._id)}>Edit</button>
                <button onClick={()=>HandleDelete(contact._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No contacts found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsList;
