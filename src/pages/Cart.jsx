import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const API = "http://localhost:5000";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, total } = useCart();
  const { token } = useUser();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setMessage(null);
    if (cart.length === 0) {
      setMessage({ type: "error", text: "El carrito está vacío." });
      return;
    }
    if (!token) {
      setMessage({ type: "error", text: "Debes iniciar sesión para pagar." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/checkouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error en checkout");
      setMessage({ type: "success", text: "Compra realizada con éxito. ¡Gracias!" });
      setLoading(false);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Error al pagar" });
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-3">🛒 Carrito</h3>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul className="list-group">
          {cart.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                {item.name} x {item.qty} = ${ (item.qty * item.price).toLocaleString("es-CL") }
              </span>
              <div>
                <button className="btn btn-outline-danger btn-sm mx-1" onClick={() => decreaseQty(item.id)}>-</button>
                <button className="btn btn-outline-primary btn-sm mx-1" onClick={() => increaseQty(item.id)}>+</button>
              </div>
            </li>
          ))}
          <li className="list-group-item text-end fw-bold">
            Total: ${total.toLocaleString("es-CL")}
          </li>
        </ul>
      )}

      {message && (
        <div className={`alert mt-3 ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
          {message.text}
        </div>
      )}

      <div className="text-end mt-4">
        <button className="btn btn-primary" onClick={handleCheckout} disabled={!token || loading}>
          {loading ? "Procesando..." : "Pagar"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
