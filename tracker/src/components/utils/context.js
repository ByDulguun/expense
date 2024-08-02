"use client";

import { useState, createContext } from "react";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [newCategory, setNewCategory] = useState("");
  return (
    <Context.Provider value={{ newCategory, setNewCategory }}>
      {children}
    </Context.Provider>
  );
};
