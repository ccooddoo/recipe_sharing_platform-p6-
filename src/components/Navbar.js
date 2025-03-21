import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, TextField, Box } from "@mui/material";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // ✅ Use navigate instead of window.location.href

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; // ✅ Prevent empty search
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* App Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Cookpad
          </Link>
        </Typography>

        {/* Search Box (Always Visible) */}
        <Box component="form" onSubmit={handleSearch} sx={{ mr: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: 1, width: "200px" }}
          />
          <Button type="submit" variant="contained" sx={{ ml: 1 }}>
            Search
          </Button>
        </Box>

        {/* Profile & Logout if logged in, otherwise show Login & Register */}
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/profile">
              Profile
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
