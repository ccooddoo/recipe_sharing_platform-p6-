import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { category } = useParams(); // ✅ Get category name from URL
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes?category=${encodeURIComponent(category)}`);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, [category]); // ✅ Fetch when category changes

  return (
    <div>
      <h2>{category} Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found for this category.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <h3>{recipe.title}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
              <p>{recipe.instructions}</p>
              {recipe.image && <img src={`http://localhost:5000${recipe.image}`} alt={recipe.title} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryPage;
