import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === pizza.id);
      if (exists) {
        return prev.map((item) =>
          item.id === pizza.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...pizza, qty: 1 }];
      }
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty, total }}>
      {children}
    </CartContext.Provider>
  );
};
