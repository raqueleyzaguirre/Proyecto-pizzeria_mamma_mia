import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1>404</h1>
      <p>¡Oops! Esta página no existe.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Ir al inicio 🍕
      </Link>
    </div>
  );
};

export default NotFound;
