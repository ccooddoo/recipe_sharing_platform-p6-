import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ Import useParams
import axios from "axios";
import { Grid, Container, CircularProgress, Alert, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";

const CategoryRecipes = () => {
  const { category } = useParams(); // ✅ Get category from URL
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5000/api/recipes?category=${encodeURIComponent(category)}`) // ✅ Fixed syntax
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching recipes:", error);
        setError("Failed to fetch recipes.");
        setLoading(false);
      });
  }, [category]);

  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ff6600" }}>
        {category} Recipes
      </Typography>

      {loading ? (
        <CircularProgress sx={{ mt: 3 }} />
      ) : error ? (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      ) : recipes.length === 0 ? (
        <Typography sx={{ mt: 2 }}>No recipes found in this category.</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
          {recipes.map((recipe) => (
            <Grid item key={recipe._id} xs={12} sm={6} md={6} lg={6}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CategoryRecipes;
