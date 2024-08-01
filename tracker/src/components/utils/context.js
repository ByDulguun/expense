"use client";

import { useState, createContext } from "react";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [visible, setVisible] = useState("invisible");
  return (
    <Context.Provider value={{ visible, setVisible }}>
      {children}
    </Context.Provider>
  );
};
