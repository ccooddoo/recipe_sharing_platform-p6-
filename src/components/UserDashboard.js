import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    if (storedUsername && storedEmail) {
      setUsername(storedUsername);
      setEmail(storedEmail);
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/login"); // Redirect to login page on logout
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        {username}!
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Email: {email}
      </Typography>

      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="body1">Your Recipes:</Typography>
        {/* Recipes Section */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* You can fetch and list the user’s recipes here */}
        </Box>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/add-recipe")}>
          Add Recipe
        </Button>
        <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default UserDashboard;
