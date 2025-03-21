const express = require("express");
const router = express.Router();

// ✅ Dummy categories (Replace with DB data later)
const categories = [
  { name: "Vegetarian", image: "/uploads/veg.jpg" },
  { name: "Non-Vegetarian", image: "/uploads/nonveg.jpg" },
  { name: "Desserts", image: "/uploads/dessert.jpg" },
  { name: "Drinks", image: "/uploads/drink.jpg" },
  { name: "Snacks", image: "/uploads/snack.jpg" },
];

// ✅ Get Categories
router.get("/", (req, res) => {
  res.json(categories);
});

module.exports = router;