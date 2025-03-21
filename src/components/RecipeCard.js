import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";

const RecipeCard = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigation

  return (
    <Card
      sx={{
        maxWidth: 350, // ✅ Bigger size
        boxShadow: 3,
        borderRadius: 4,
        m: 2,
        overflow: "hidden",
        textAlign: "center",
        cursor: "pointer", // ✅ Indicate it's clickable
      }}
      onClick={() => navigate(`/recipe/${recipe._id}`)} // ✅ Navigate to full recipe page
    >
      {/* ✅ Large Image on Top */}
      {recipe.image && (
        <CardMedia
          component="img"
          sx={{
            width: "100%", // Full width
            height: 200, // ✅ Larger height
            objectFit: "cover",
          }}
          image={`http://localhost:5000${recipe.image}`}
          alt={recipe.title}
        />
      )}

      {/* ✅ Recipe Details */}
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#E65100", mb: 1 }}>
          {recipe.title}
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#388E3C", mb: 1 }}>
          {recipe.category}
        </Typography>

        <Typography variant="body2" sx={{ color: "#616161", fontSize: "0.9rem", mb: 1 }}>
          {recipe.ingredients.join(", ")}
        </Typography>

        {/* ✅ Expandable Instructions */}
        <Box sx={{ color: "#616161", fontSize: "0.9rem", mt: 1 }}>
          <Typography variant="body2">
            {expanded ? recipe.instructions : `${recipe.instructions.slice(0, 60)}...`}
          </Typography>
          {!expanded && recipe.instructions.length > 60 && (
            <Button
              size="small"
              sx={{ color: "#D84315", fontWeight: "bold", textTransform: "none", mt: 1 }}
              onClick={(e) => {
                e.stopPropagation(); // ✅ Prevent navigating when clicking "Read More"
                setExpanded(true);
              }}
            >
              Read More
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;