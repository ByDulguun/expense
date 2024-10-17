import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000", // Use http for localhost unless you have HTTPS set up
  headers: {
    "Content-Type": "application/json",
  },
});
