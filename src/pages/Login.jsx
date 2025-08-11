import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if (!email || !password) {
      setMsg({ type: "error", text: "Todos los campos son obligatorios." });
      return;
    }
    if (password.length < 6) {
      setMsg({ type: "error", text: "La contraseña debe tener al menos 6 caracteres." });
      return;
    }
    const res = await login(email, password);
    if (res.ok) {
      setMsg({ type: "success", text: "Login exitoso." });
      navigate("/profile");
    } else {
      setMsg({ type: "error", text: res.message || "Error en login" });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 520 }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" />
        </div>
        <button className="btn btn-success">Ingresar</button>
      </form>

      {msg && (
        <div className={`alert mt-3 ${msg.type === "success" ? "alert-success" : "alert-danger"}`}>
          {msg.text}
        </div>
      )}
    </div>
  );
};

export default Login;
