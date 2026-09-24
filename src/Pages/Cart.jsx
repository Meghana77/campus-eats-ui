import { useContext } from "react";
import CartContext from "../Context/CartContext";

function Cart() {
  const { cart } = useContext(CartContext);
  return (
    <div>
      <h1>Cart</h1>
      {cart.map((restaurant) => {
        return (
          <div key={restaurant.id}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.cuisine}</p>
            <p>Rating: {restaurant.rating}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Cart;
