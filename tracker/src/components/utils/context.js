"use client";

import { useState, createContext } from "react";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState("red");
  return (
    <Context.Provider value={{ bgColor, setBgColor }}>
      {children}
    </Context.Provider>
  );
};
