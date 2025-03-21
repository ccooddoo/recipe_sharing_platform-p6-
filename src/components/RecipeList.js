import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardMedia, CardContent, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const loggedInUser = localStorage.getItem("username"); // ✅ सध्याचा लॉगिन केलेला युजर

  useEffect(() => {
    axios.get("http://localhost:5000/api/recipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token"); // ✅ Auth Token घ्या
      await axios.delete(`http://localhost:5000/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Recipe deleted successfully!");
      setRecipes(recipes.filter(recipe => recipe._id !== id));
    } catch (error) {
      console.error("❌ Error deleting recipe:", error);
    }
  };

  return (
    <Grid container spacing={3}>
      {recipes.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} key={recipe._id}>
          <Card>
            {recipe.image && (
              <CardMedia component="img" height="200" image={`http://localhost:5000${recipe.image}`} alt={recipe.title} />
            )}
            <CardContent>
              <Typography variant="h6">{recipe.title}</Typography>
              <Typography variant="body2" color="textSecondary">{recipe.category}</Typography>
              <Typography variant="body2" color="textSecondary">Added by: {recipe.createdBy?.username}</Typography>

              {/* ✅ सर्व युजर्ससाठी View Details */}
              <Button component={Link} to={`/recipe/${recipe._id}`} size="small">View Details</Button>

              {/* ✅ फक्त मालकाला Edit/Delete ऑप्शन */}
              {loggedInUser && recipe.createdBy && loggedInUser === recipe.createdBy.username && (
                <>
                  <Button component={Link} to={`/edit-recipe/${recipe._id}`} size="small" color="primary">Edit</Button>
                  <Button onClick={() => handleDelete(recipe._id)} size="small" color="error">Delete</Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;
