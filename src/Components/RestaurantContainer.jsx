import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import "./RestaurantContainer.css";

function RestaurantContainer({ searchText }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch("http://localhost:5000/api/restaurants");
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        const data = await response.json();
        const restaurantsWithId = data.map((restaurant, index) => ({
          ...restaurant,
          id: `${restaurant.city}-${restaurant.name}-${index}`,
        }));

        setRestaurants(restaurantsWithId);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to load restaurants");
        setLoading(false);
      }
    }
    fetchRestaurants();
  }, []);

  if (loading) {
    return <h2>Loading restaurants...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className="restaurant-container">
      {filteredRestaurants.map(function (restaurant) {
        return (
          <RestaurantCard
            name={restaurant.name}
            rating={restaurant.rating}
            time={restaurant.deliveryTime}
            cuisine={restaurant.cuisine}
            key={restaurant.id}
            image={restaurant.image}
            id={restaurant.id}
          />
        );
      })}
    </div>
  );
}

export default RestaurantContainer;
