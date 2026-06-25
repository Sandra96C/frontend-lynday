import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { getProfileDb } from "../services/auth.service";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    async function verifyUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const data = await getProfileDb();
        setUser(data);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}
