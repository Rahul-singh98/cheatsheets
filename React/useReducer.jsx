import React, { useReducer } from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";

// Define action types
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const CLEAR_CART = "CLEAR_CART";

// Initial state
const initialState = {
  items: [],
  total: 0,
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price,
        };
      }
    case REMOVE_ITEM:
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToRemove.quantity > 1) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: state.total - itemToRemove.price,
        };
      } else {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
          total: state.total - itemToRemove.price,
        };
      }
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
};

const ShoppingCartApp = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: ADD_ITEM, payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: REMOVE_ITEM, payload: itemId });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // Sample items
  const sampleItems = [
    { id: 1, name: "T-Shirt", price: 15.99 },
    { id: 2, name: "Jeans", price: 39.99 },
    { id: 3, name: "Sneakers", price: 59.99 },
  ];

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <ShoppingCart className="mr-2" /> Shopping Cart
      </h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Available Items</h2>
        {sampleItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span>
              {item.name} - ${item.price.toFixed(2)}
            </span>
            <button
              onClick={() => addItem(item)}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              <Plus size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Cart Items</h2>
        {state.items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          state.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {item.name} (x{item.quantity}) - $
                {(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                <Minus size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Total: ${state.total.toFixed(2)}</p>
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
        >
          <Trash2 className="mr-2" /> Clear Cart
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartApp;
