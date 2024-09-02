import axios from "axios";

export const api = axios.create({
  baseURL: "https://expense-2x5m.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
