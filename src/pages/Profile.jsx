import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { email, getProfile, logout } = useUser();
  const [loading, setLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await getProfile();
      if (res.ok) setProfileInfo(res.data);
      setLoading(false);
    };
    load();
  }, [getProfile]);

  return (
    <div className="container mt-5">
      <h2>Perfil</h2>
      {loading ? (
        <p>Cargando perfil...</p>
      ) : (
        <>
          <p>
            <strong>Email:</strong> {profileInfo?.email || email}
          </p>
          <button className="btn btn-danger" onClick={logout}>
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
