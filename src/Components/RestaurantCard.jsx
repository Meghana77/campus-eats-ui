import { useContext } from "react";
import CartContext from "../Context/CartContext";
import "./RestaurantCard.css";
import { Link } from "react-router-dom";

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

  const cardContent = (
    <div className="restaurant-card">
      <img src={image} alt={name} />

      <h3>{name}</h3>

      {type === "restaurant" ? (
        <>
          <p>⭐ {rating}</p>
          <p>{time}</p>
          <p>{cuisine}</p>
        </>
      ) : (
        <>
          <p>₹{price}</p>

          <button onClick={handleAddToCart} type="button">
            Add to Cart
          </button>
        </>
      )}
    </div>
  );

  return type === "restaurant" ? (
    <Link to={`/restaurant/${id}`} className="restaurant-link">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}

export default RestaurantCard;
