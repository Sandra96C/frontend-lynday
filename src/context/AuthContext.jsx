import { useState } from "react";
import { useEffect } from "react";
import { Children } from "react";
import { createContext } from "react";
import { getProfileDb } from "../services/auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
        console.log(error);
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
};
