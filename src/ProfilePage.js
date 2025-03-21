import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data is stored in localStorage (after login)
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser({ username: storedUser });
    } else {
      navigate("/login"); // Redirect to login if no user is found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login"); // Redirect to login page on logout
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        Profile Page
      </Typography>
      {user && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Welcome, {user.username}!
          </Typography>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="body1">
              This is your profile page. You can view and manage your recipes here.
            </Typography>
          </Box>

          {/* Button to logout */}
          <Box sx={{ textAlign: "center" }}>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ProfilePage;
