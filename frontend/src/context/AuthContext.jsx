import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("sheCanToken"));
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("sheCanAdmin");
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  const login = ({ token: nextToken, admin: nextAdmin }) => {
    localStorage.setItem("sheCanToken", nextToken);
    localStorage.setItem("sheCanAdmin", JSON.stringify(nextAdmin));
    setToken(nextToken);
    setAdmin(nextAdmin);
  };

  const logout = () => {
    localStorage.removeItem("sheCanToken");
    localStorage.removeItem("sheCanAdmin");
    setToken(null);
    setAdmin(null);
  };

  const value = useMemo(
    () => ({
      admin,
      isAuthenticated: Boolean(token),
      login,
      logout,
      token
    }),
    [admin, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
};
