"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "@/components/utils/context";
import { AuthProvider } from "@/components/utils/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const getData = async () => {
    // Your data fetching logic here
  };
  return (
    <html lang="en">
      <body>
        <ContextProvider value={{ token }}>
          <AuthProvider>{children}</AuthProvider>
        </ContextProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
