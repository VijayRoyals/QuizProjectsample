// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
  const token = localStorage.getItem('accessToken'); // Adjust the key based on your storage

  // You can add more complex validation for the token here if needed
  if (!token) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" replace />;
  }

  // Rend<er the child routes if authenticated
//   return <MainLayout/>;
  return <Outlet/>;
};

export default ProtectedRoute;
