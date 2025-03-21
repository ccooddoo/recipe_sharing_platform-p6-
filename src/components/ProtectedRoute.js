import React, { useContext } from "react";
import { Navigate } from "react-router-dom"; // Import Navigate from react-router-dom
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext for checking user login

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Access the user from context (assuming user is stored in context)

  if (!user) {
    // If no user is logged in, redirect to the login page
    return <Navigate to="/login" replace />; // Use Navigate to redirect to login page
  }

  return children; // If user is logged in, render the children components (protected route)
};

export default ProtectedRoute;
