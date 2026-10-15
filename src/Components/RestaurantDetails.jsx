import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import "./RestaurantDetails.css";

const RestaurantDetails = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`http://localhost:5000/api/restaurants/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant");
        }
        return response.json();
      })
      .then((data) => {
        setRestaurant(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="status-message">Loading restaurant...</p>;
  }

  if (error) {
    return <p className="status-message">{error}</p>;
  }

  if (!restaurant) {
    return <p className="status-message">Restaurant not found.</p>;
  }

  return (
    <div className="restaurant-details">
      <div className="restaurant-info">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-details-image"
        />

        <div>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.cuisine}</p>
          <p>⭐ {restaurant.rating}</p>
          <p>{restaurant.address}</p>
        </div>
      </div>

      <h2>Our Menu</h2>

      {restaurant.menu?.length > 0 ? (
        <div className="menu-container">
          {restaurant.menu.map((item) => (
            <RestaurantCard
              key={item._id || item.name}
              name={item.name}
              image={item.image}
              price={item.price}
              type="menu"
            />
          ))}
        </div>
      ) : (
        <p>Menu items are not available.</p>
      )}
    </div>
  );
};

export default RestaurantDetails;
