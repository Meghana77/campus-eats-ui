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
  const quantity = cart.find((item) => item.name === name)?.quantity || 0;

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { name, image, price, quantity: 1 }]);
    }
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      setCart(cart.filter((item) => item.name !== name));
    } else {
      setCart(
        cart.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      );
    }
  };

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
            <button onClick={handleDecrease} type="button">
              −
            </button>

            <span>{quantity}</span>

            <button onClick={handleAddToCart} type="button">
              +
            </button>
          </div>
        )}
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
