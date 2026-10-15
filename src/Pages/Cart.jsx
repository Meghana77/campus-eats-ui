import { useContext } from "react";
import CartContext from "../Context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const increaseQuantity = (name) => {
    setCart(
      cart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (name) => {
    setCart(
      cart
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <div className="cart">
        <h1>Your Cart</h1>
        <p>Your cart is empty. Add some delicious food!</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div className="cart-item" key={item.id || item.name}>
          {item.image && <img src={item.image} alt={item.name} width="120" />}

          <h2>{item.name}</h2>
          <p>Price: ₹{item.price}</p>

          <div>
            <button onClick={() => decreaseQuantity(item.name)}>-</button>

            <span> {item.quantity} </span>

            <button onClick={() => increaseQuantity(item.name)}>+</button>
          </div>

          <p>Subtotal: ₹{item.price * item.quantity}</p>
        </div>
      ))}

      <h2>Total: ₹{totalAmount}</h2>

      <button onClick={() => alert("Order placed successfully!")}>
        Place Order
      </button>
    </div>
  );
}

export default Cart;
