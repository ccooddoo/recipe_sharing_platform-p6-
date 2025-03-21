import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    category: "",
    ingredients: "",
    instructions: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/recipes/${id}`, recipe, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    alert("Recipe updated!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={recipe.title} onChange={handleChange} required />
      <input type="text" name="category" value={recipe.category} onChange={handleChange} required />
      <textarea name="ingredients" value={recipe.ingredients} onChange={handleChange} required />
      <textarea name="instructions" value={recipe.instructions} onChange={handleChange} required />
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default EditRecipe;
