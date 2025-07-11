const Profile = () => {
  const email = "usuario@ejemplo.com";

  const handleLogout = () => {
    alert("Sesión cerrada (por ahora esto es simulado)");
  };

  return (
    <div className="container mt-5">
      <h2>Perfil</h2>
      <p>Email: <strong>{email}</strong></p>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
