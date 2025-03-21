import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

// Import category pages
import VegetarianRecipes from "./pages/VegetarianRecipes";
import DessertRecipes from "./pages/DessertRecipes";
import NonVegRecipes from "./pages/NonVegRecipes";
import DrinksRecipes from "./pages/DrinksRecipes";
import SnacksRecipes from "./pages/SnacksRecipes";

// Import components
import AddRecipe from "./components/AddRecipe";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails"; // ✅ Import RecipeDetails
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import ProfilePage from "./components/ProfilePage"; // ✅ Import ProfilePage

import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

import "./App.css";

// 404 Page
const NotFound = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h2>404 - Page Not Found</h2>
    <p>Oops! The page you are looking for doesn't exist.</p>
  </div>
);

const App = () => (
  <div className="app-container">
    <Navbar />
    <main>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/vegetarian" element={<VegetarianRecipes />} />
        <Route path="/desserts" element={<DessertRecipes />} />
        <Route path="/non-veg" element={<NonVegRecipes />} />
        <Route path="/drinks" element={<DrinksRecipes />} />
        <Route path="/snacks" element={<SnacksRecipes />} />

        {/* Recipe List for any category */}
        <Route path="/recipes/:category" element={<RecipeList />} /> 

        {/* ✅ Individual Recipe Details Page */}
        <Route path="/recipe/:id" element={<RecipeDetails />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/add-recipe"
          element={
            <ProtectedRoute>
              <AddRecipe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Profile Route */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Search Results Route */}
        <Route path="/search" element={<SearchResults />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
