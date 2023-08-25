import axios from "axios";

export const api = axios.create({
  baseURL: "https://estoquer-database.vercel.app/orders"
});