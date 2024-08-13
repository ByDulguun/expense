"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "@/components/utils/context";
import { AuthProvider } from "@/components/utils/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <AuthProvider>{children}</AuthProvider>
        </ContextProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
