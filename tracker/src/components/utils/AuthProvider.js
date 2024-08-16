"use client";

import { api } from "@/lib/axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

const authPaths = ["/", "/signup"];

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/", { email, password });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      toast.success("Аккоунт нэвтэрсэн");
      router.replace("/records");
    } catch (err) {
      console.log(err);
      toast.error("Майл эсвэл код буруу байна");
    }
  };

  const register = async (username, email, password) => {
    try {
      await api.post("/auth/signup", { username, email, password });
      router.push("/");
      toast.success("Аккоунт нээгдсэн ,Hэвтрнэ үү ");
    } catch (err) {
      console.log(err);
      toast.error("Аккоунт бүртгэлгүй байна, Бүртгүүлнэ үү! ");
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      router.replace("/");
      toast.error("Аккоунт гарсан");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsReady(false);
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
      } finally {
        setIsReady(true);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (authPaths.includes(pathname)) return;
    if (!isReady) return;
    if (!user) router.replace("/");
  }, [pathname, user, isReady]);

  if (!isReady) return null;

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
