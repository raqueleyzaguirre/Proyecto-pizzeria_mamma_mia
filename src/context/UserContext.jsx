import React, { createContext, useContext, useEffect, useState } from "react";

const API = "http://localhost:5000";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [loading, setLoading] = useState(false);

  const saveAuth = (tokenValue, emailValue) => {
    setToken(tokenValue);
    setEmail(emailValue);
    if (tokenValue) localStorage.setItem("token", tokenValue);
    else localStorage.removeItem("token");
    if (emailValue) localStorage.setItem("email", emailValue);
    else localStorage.removeItem("email");
  };

  const login = async (emailArg, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailArg, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error en login");
      saveAuth(data.token, data.email);
      setLoading(false);
      return { ok: true };
    } catch (err) {
      setLoading(false);
      return { ok: false, message: err.message || "Error" };
    }
  };

  const register = async (emailArg, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailArg, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error en register");
      saveAuth(data.token, data.email);
      setLoading(false);
      return { ok: true };
    } catch (err) {
      setLoading(false);
      return { ok: false, message: err.message || "Error" };
    }
  };

  const logout = () => {
    saveAuth(null, "");
  };

  const getProfile = async () => {
    if (!token) return { ok: false, message: "No token" };
    try {
      const res = await fetch(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al obtener perfil");
      setEmail(data.email || "");
      localStorage.setItem("email", data.email || "");
      return { ok: true, data };
    } catch (err) {
      return { ok: false, message: err.message || "Error" };
    }
  };

  useEffect(() => {
    if (token) {
    
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{ token, email, loading, login, register, logout, getProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};
