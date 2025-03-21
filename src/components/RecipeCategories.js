import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import heroImage from "../assets/hero.jpg"; 
import vegImage from "../assets/veg.jpg";
import nonVegImage from "../assets/nonveg.jpg";
import dessertsImage from "../assets/dessert.jpg";
import drinksImage from "../assets/drink.jpg";
import snacksImage from "../assets/snack.jpg";

const categories = [
  { title: "Vegetarian", image: vegImage },
  { title: "Non-Vegetarian", image: nonVegImage },
  { title: "Desserts", image: dessertsImage },
  { title: "Drinks", image: drinksImage },
  { title: "Snacks", image: snacksImage },
];

const RecipeCategories = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of images visible at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="hero-section">
      {/* ✅ Category Slider */}
      <Slider {...settings} className="category-slider">
        {categories.map((category) => (
          <div key={category.title} className="category-slide">
            <Link to={`/recipes?category=${encodeURIComponent(category.title)}`} className="category-box">
              <img src={category.image} alt={category.title} className="category-image" />
              <h3 className="category-title">{category.title}</h3>
            </Link>
          </div>
        ))}
      </Slider>

      {/* ✅ Hero Image */}
      <img src={heroImage} alt="Featured Food" className="hero-image" />
    </div>
  );
};

export default RecipeCategories;
