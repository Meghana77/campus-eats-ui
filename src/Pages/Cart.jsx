import { useContext, useState } from "react";
import CartContext from "../Context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const [customerName, setCustomerName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  const increaseQuantity = (name) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (name) => {
    setCart((currentCart) =>
      currentCart
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

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (customerName.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: customerName.trim(),
          items: cart.map((item) => ({
            name: item.name,
            image: item.image,
            price: Number(item.price),
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to place your order.");
      }

      setPlacedOrder(data.order);
      setCart([]);
      setCustomerName("");
    } catch (error) {
      setError(
        error.message || "Could not connect to the server. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  //after order is placed
  if (placedOrder) {
    return (
      <div className="cart order-success">
        <h1>Order placed successfully!</h1>
        <p>Thank you, {placedOrder.customerName}.</p>
        <p>
          Order ID: <strong>{placedOrder._id}</strong>
        </p>
        <p>Status: {placedOrder.status}</p>
        <p>Total amount: ₹{Number(placedOrder.totalAmount).toFixed(2)}</p>
        <p>You can save your order ID for future reference.</p>
      </div>
    );
  }

  //If cart is empty
  if (cart.length === 0) {
    return (
      <div className="cart">
        <h1>Your Cart</h1>
        <p>Your cart is empty. Add some delicious food!</p>
        {error && <p role="alert">{error}</p>}
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div className="cart-item" key={item.name}>
          {item.image && <img src={item.image} alt={item.name} width="120" />}

          <h2>{item.name}</h2>
          <p>Price: ₹{item.price}</p>

          <div>
            <button
              type="button"
              onClick={() => decreaseQuantity(item.name)}
              aria-label={`Decrease ${item.name} quantity`}
            >
              -
            </button>

            <span> {item.quantity} </span>

            <button
              type="button"
              onClick={() => increaseQuantity(item.name)}
              aria-label={`Increase ${item.name} quantity`}
            >
              +
            </button>
          </div>

          <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}

      <h2>Total: ₹{totalAmount.toFixed(2)}</h2>

      <form className="checkout-card" onSubmit={handlePlaceOrder}>
        <div className="checkout-heading">
          <h2>Complete Your Order</h2>
          <p>Just one more step to enjoy your meal!</p>
        </div>

        <div className="form-group">
          <label htmlFor="customerName">Your name</label>

          <input
            id="customerName"
            name="customerName"
            type="text"
            placeholder="Enter your full name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            minLength={2}
            required
            disabled={submitting}
          />

          <small>We'll use this name for your order.</small>
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="checkout-total">
          <span>Total to pay</span>
          <strong>₹{totalAmount.toFixed(2)}</strong>
        </div>

        <button
          className="place-order-btn"
          type="submit"
          disabled={submitting || !customerName.trim() || cart.length === 0}
        >
          {submitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Cart;
