import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null); // true/false/null

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!email || !password) {
      setMessage("Todos los campos son obligatorios.");
      setIsSuccess(false);
      return;
    }

    if (password.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres.");
      setIsSuccess(false);
      return;
    }

    // Si todo está correcto
    setMessage("¡Inicio de sesión exitoso!");
    setIsSuccess(true);

    // Limpiar campos (opcional)
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Ingresar</button>
      </form>

      {message && (
        <div className={`alert mt-4 ${isSuccess ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;
