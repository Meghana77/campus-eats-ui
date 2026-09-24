import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Context/CartContext";
import "./Header.css";

function Header() {
  const { cart } = useContext(CartContext);
  return (
    <header className="header">
      <h1>Campus Eats</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/cart">Cart({cart.length})</Link>
      </nav>
    </header>
  );
}

export default Header;
