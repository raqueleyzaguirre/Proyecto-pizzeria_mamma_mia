import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!email || !password || !confirmPassword) {
      setMessage("Todos los campos son obligatorios.");
      setIsSuccess(false);
      return;
    }

    if (password.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres.");
      setIsSuccess(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      setIsSuccess(false);
      return;
    }

    // Si todo está correcto
    setMessage("¡Registro exitoso!");
    setIsSuccess(true);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
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

        <div className="mb-3">
          <label className="form-label">Confirmar contraseña:</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>

      {message && (
        <div className={`alert mt-4 ${isSuccess ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Register;
