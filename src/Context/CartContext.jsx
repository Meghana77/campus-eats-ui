import { createContext, useReducer } from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItem = action.payload;

      const existingItem = state.find((item) => item.name === newItem.name);

      if (existingItem) {
        return state.map((item) =>
          item.name === newItem.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...state,
        {
          ...newItem,
          quantity: 1,
        },
      ];
    }

    case "INCREASE_QUANTITY": {
      return state.map((item) =>
        item.name === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    }

    case "DECREASE_QUANTITY": {
      return state
        .map((item) =>
          item.name === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    }

    case "REMOVE_ITEM": {
      return state.filter((item) => item.name !== action.payload);
    }

    case "CLEAR_CART": {
      return [];
    }

    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };
export default CartContext;
