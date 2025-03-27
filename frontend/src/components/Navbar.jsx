import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, TextField, Box } from "@mui/material";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext); // ✅ Access user state

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Brand Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Cookpad
          </Link>
        </Typography>

        {/* Search Box */}
        <Box sx={{ mr: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search recipes..."
            sx={{ backgroundColor: "white", borderRadius: 1, width: "200px" }}
          />
          <Button variant="contained" sx={{ ml: 1 }}>
            Search
          </Button>
        </Box>

        {/* Show Profile & Logout if logged in, otherwise Login/Register */}
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/profile">
              {user?.username || "Profile"} {/* ✅ Show logged-in username */}
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
