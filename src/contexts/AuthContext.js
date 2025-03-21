import React, { createContext, useState, useEffect } from "react";

// Create the Auth Context
export const AuthContext = createContext();

// AuthProvider component to wrap around your app
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the user from localStorage if they are logged in
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser)); // Set the user state
    }
  }, []);

  // Login function to authenticate the user
  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user)); // Save user in localStorage
    setUser(user); // Set the user state
  };

  // Logout function to clear authentication
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;