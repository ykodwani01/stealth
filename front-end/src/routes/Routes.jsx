import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
// import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              
                <Home />
              
            }
          />
        </Routes>
      </Router>
    );
  };
  
  export default AppRoutes;