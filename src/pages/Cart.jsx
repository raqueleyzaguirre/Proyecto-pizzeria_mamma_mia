import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, total } = useCart();
  const { token } = useUser();

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

      <div className="text-end mt-4">
        <button className="btn btn-primary" disabled={!token}>
          Pagar
        </button>
      </div>
    </div>
  );
};

export default Cart;
