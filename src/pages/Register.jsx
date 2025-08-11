import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Register = () => {
  const { register } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (!email || !password || !confirmPassword) {
      setMsg({ type: "error", text: "Todos los campos son obligatorios." });
      return;
    }
    if (password.length < 6) {
      setMsg({ type: "error", text: "La contraseña debe tener al menos 6 caracteres." });
      return;
    }
    if (password !== confirmPassword) {
      setMsg({ type: "error", text: "Las contraseñas no coinciden." });
      return;
    }

    const res = await register(email, password);
    if (res.ok) {
      setMsg({ type: "success", text: "Registro exitoso." });
      navigate("/profile");
    } else {
      setMsg({ type: "error", text: res.message || "Error en registro" });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 520 }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar contraseña</label>
          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" type="password" />
        </div>

        <button className="btn btn-primary">Registrarse</button>
      </form>

      {msg && (
        <div className={`alert mt-3 ${msg.type === "success" ? "alert-success" : "alert-danger"}`}>
          {msg.text}
        </div>
      )}
    </div>
  );
};

export default Register;
