import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!recipe) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      {recipe.image && <img src={`http://localhost:5000${recipe.image}`} alt={recipe.title} />}
    </div>
  );
};

export default RecipeDetails;
