"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "@/components/utils/context";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ContextProvider>
        <body className={inter.className}>{children}</body>
      </ContextProvider>
    </html>
  );
}
