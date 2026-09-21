import RestaurantCard from "./RestaurantCard";
import "./RestaurantContainer.css";
import { useEffect, useState } from "react";

function RestaurantContainer({searchText}){
const [restaurants, setRestaurants] = useState([]);

useEffect(()=>{
  async function fetchRestaurants(){
    try{
      const response = await fetch("https://wibest.in/data/json/restaurants.json");
      const data = await response.json();
      const restaurantsWithId = data.data.map((restaurant, index) => ({
        ...restaurant,
        id: `${restaurant.city}-${restaurant.name}-${index}`
      }));

      setRestaurants(restaurantsWithId);
    } catch(error){
      console.log(error);
    }
  }
  fetchRestaurants();
},[])

const filteredRestaurants = restaurants.filter((restaurant) => 
  restaurant.name.toLowerCase().includes(searchText.toLowerCase())
)

    return (
        <div className="restaurant-container">
            {filteredRestaurants.map(function (restaurant){
                return <RestaurantCard name={restaurant.name} rating={restaurant.rating} time={restaurant.deliveryTime} cuisine={restaurant.cuisine} key={restaurant.id} image={restaurant.image} />;
            })
            }
        </div>
    )
}

export default RestaurantContainer;