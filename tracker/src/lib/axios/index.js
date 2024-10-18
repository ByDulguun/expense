import axios from "axios";

export const api = axios.create({
  baseURL: "https://expense-2x5m.onrender.com", // Use http for localhost unless you have HTTPS set up
  headers: {
    "Content-Type": "application/json",
  },
});
