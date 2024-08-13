"use client";

import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/", { email, password });
      toast.success("Logged in successfully.");

      setIsLoggedIn(true);
      localStorage.setItem("token", response.data.token); // Assuming the token is in the response
      router.push("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out successfully.");
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    if (!isChecking) {
      if (isLoggedIn) {
        router.push("/");
      } else {
        router.push("/records");
      }
    }
  }, [isLoggedIn, isChecking]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
