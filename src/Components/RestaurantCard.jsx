import { useContext } from "react";
import CartContext from "../Context/CartContext";
import "./RestaurantCard.css";

function RestaurantCard({ image, name, rating, time, cuisine, id }) {
  const { cart, setCart } = useContext(CartContext);
  const restaurant = {
    image,
    name,
    rating,
    time,
    cuisine,
    id
  };

  return (
    <div className="restaurant-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{rating}</p>
      <p>{time}</p>
      <p>{cuisine}</p>
      <button onClick={() => setCart([...cart, restaurant])}>
        Add to Cart
      </button>
    </div>
  );
}

export default RestaurantCard;
