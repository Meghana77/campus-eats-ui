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
  const { cart, setCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          name,
          image,
          price,
          quantity: 1,
        },
      ]);
    }
  };

  if (type === "menu") {
    return (
      <div className="restaurant-card menu-card">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>₹{price}</p>
        <button onClick={handleAddToCart} type="button">
          Add to Cart
        </button>
      </div>
    );
  }

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
        <p>{cuisine}</p>
      </Link>
    </div>
  );
}

export default RestaurantCard;
