import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Grid, InputLabel, MenuItem, FormControl, Select, Box } from "@mui/material";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !ingredients || !instructions) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem("token"); // Assuming you store token in localStorage after login
      const response = await axios.post("http://localhost:5000/api/recipes", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error adding recipe:", error);
      setMessage("Failed to add recipe. Try again later.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Add New Recipe</Typography>
      <Box sx={{ padding: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                  <MenuItem value="Desserts">Desserts</MenuItem>
                  <MenuItem value="Drinks">Drinks</MenuItem>
                  <MenuItem value="Snacks">Snacks</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Ingredients (comma separated)"
                variant="outlined"
                fullWidth
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Instructions"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">Add Recipe</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      {message && <Typography color="error">{message}</Typography>}
    </Container>
  );
};

export default AddRecipe;
