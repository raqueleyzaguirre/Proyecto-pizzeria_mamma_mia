import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { total } = useCart();
  const { token, logout } = useUser();

  return (
    <nav className="navbar navbar-light bg-light px-4 justify-content-between">
      <div>
        <Link to="/" className="btn btn-outline-primary mx-1">Home</Link>
        {token ? (
          <>
            <Link to="/profile" className="btn btn-outline-success mx-1">Profile</Link>
            <button onClick={logout} className="btn btn-outline-danger mx-1">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-primary mx-1">Login</Link>
            <Link to="/register" className="btn btn-outline-secondary mx-1">Register</Link>
          </>
        )}
      </div>
      <div>
        <Link to="/cart" className="btn btn-outline-dark">
          🛒 Total: ${total.toLocaleString("es-CL")}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;