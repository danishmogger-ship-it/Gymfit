import { createContext, useContext, useState } from "react";
import { api } from "../api";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("gymfit_user")); } catch { return null; }
  });
  async function login(email, password) {
    const data = await api("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    localStorage.setItem("gymfit_token", data.token);
    localStorage.setItem("gymfit_user", JSON.stringify(data.user));
    setUser(data.user);
  }
  async function register(name, email, password) {
    const data = await api("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
    localStorage.setItem("gymfit_token", data.token);
    localStorage.setItem("gymfit_user", JSON.stringify(data.user));
    setUser(data.user);
  }
  function logout() {
    localStorage.removeItem("gymfit_token");
    localStorage.removeItem("gymfit_user");
    setUser(null);
  }
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
