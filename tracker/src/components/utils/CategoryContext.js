"use client";

import { createContext, useEffect, useState } from "react";

export const CategoryContext = createContext(null);

export const CategoryProvider = ({ children }) => {
  const [newIconCategory, setNewIconCategory] = useState("");
  const [iconcategories, setIconCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [getCategoriesData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/iconcategories",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        newIconCategory,
        setNewIconCategory,
        iconcategories,
        setCategories,
        categories,
        setIconCategories,
        getCategoriesData,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
