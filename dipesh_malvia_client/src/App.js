// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ContactsList from './pages/ContactsList';
import CreateContact from './pages/CreateContact';
import EditContact from './pages/EditContact';
// import { useDispatch } from 'react-redux';
// import { fetchCurrentUser } from './redux/userSlice';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchCurrentUser());
  // }, [dispatch]);
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<RedirectToRegister />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route path="/contacts" element={<ProtectedRoute><ContactsList /></ProtectedRoute>}/>
      <Route path="/create-contact" element={<ProtectedRoute><CreateContact /></ProtectedRoute>}/>
      <Route path="/edit-contact/:id" element={<ProtectedRoute><EditContact /></ProtectedRoute>} />
    </Routes>
  </Router>
  );
}

// A component to handle the redirection on mount
const RedirectToRegister = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the register page on mount
    navigate('/register');
  }, [navigate]);

  return null;
};

export default App;
