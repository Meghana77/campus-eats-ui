import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Context/CartContext";
import "./RestaurantCard.css";

function RestaurantCard({
  image,
  name,
  rating,
  time,
  cuisine,
  id,
  type = "restaurant",
  price,
}) {
  const { cart, dispatch } = useContext(CartContext);

  const quantity = cart.find((item) => item.name === name)?.quantity || 0;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        name,
        image,
        price,
      },
    });
  };

  const handleIncrease = () => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: name,
    });
  };

  const handleDecrease = () => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: name,
    });
  };

  // Display a menu item
  if (type === "menu") {
    return (
      <div className="restaurant-card menu-card">
        <img src={image} alt={name} />

        <h3>{name}</h3>

        <p>₹{price}</p>

        {quantity === 0 ? (
          <button onClick={handleAddToCart} type="button">
            Add to Cart
          </button>
        ) : (
          <div className="quantity-control">
            <button
              onClick={handleDecrease}
              type="button"
              aria-label={`Decrease ${name} quantity`}
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              onClick={handleIncrease}
              type="button"
              aria-label={`Increase ${name} quantity`}
            >
              +
            </button>
          </div>
        )}
      </div>
    );
  }

  // Display a restaurant
  return (
    <div className="restaurant-card restaurant-item">
      <Link
        to={`/restaurant/${id}`}
        className="restaurant-link"
        aria-label={`View ${name} menu`}
      >
        <img src={image} alt={name} />

        <h3>{name}</h3>

        <p>⭐ {rating}</p>

        <p>{time}</p>

        <p>{Array.isArray(cuisine) ? cuisine.join(", ") : cuisine}</p>
      </Link>
    </div>
  );
}

export default RestaurantCard;
