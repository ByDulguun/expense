"use client";

import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [newCategory, setNewCategory] = useState("");
  const [accounts, setAccounts] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/accounts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setAccounts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Context.Provider
      value={{ newCategory, setNewCategory, accounts, getData }}
    >
      {children}
    </Context.Provider>
  );
};
