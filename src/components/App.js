import { useState } from "react";


import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Cart from "./components/Cart";

const App = () => {
  // Estado para manejo de autenticación
  const [showRegister, setShowRegister] = useState(true);
  // Estado para carrito de pizzas
  const [pizzaCart, setPizzaCart] = useState([]);
  // Estado para saber si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleToggleForm = (e) => {
    e.preventDefault();
    setShowRegister(!showRegister);
  };

  
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  
  const addToCart = (pizza) => {
    setPizzaCart((prev) => {
      const existing = prev.find((p) => p.id === pizza.id);
      if (existing) {
        return prev.map((p) =>
          p.id === pizza.id ? { ...p, qty: p.qty + 1 } : p
        );
      } else {
        return [...prev, { ...pizza, qty: 1 }];
      }
    });
  };

  const increaseQty = (id) => {
    setPizzaCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  const decreaseQty = (id) => {
    setPizzaCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: p.qty - 1 } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

 
  if (!isAuthenticated) {
    return (
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Pizzería Mamma Mía</h1>
        <div className="text-center mb-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleToggleForm}
          >
            {showRegister
              ? "¿Ya tienes cuenta? Inicia sesión"
              : "¿No tienes cuenta? Regístrate"}
          </button>
        </div>
        {showRegister ? (
          <Register onSuccess={handleAuthSuccess} />
        ) : (
          <Login onSuccess={handleAuthSuccess} />
        )}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center mb-4">Pizzería Mamma Mía</h1>
      <div className="container">
        <Home addToCart={addToCart} />
        <Cart
          pizzaCart={pizzaCart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
        />
      </div>
    </div>
  );
};

export default App;
