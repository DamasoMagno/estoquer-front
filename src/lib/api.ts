import axios from "axios";

console.log(process.env.NODE_ENV);
const url = process.env.NODE_ENV === "production" ? "https://estoquer.vercel.app/orders/api/" : "http://localhost:3000/api";

export const api = axios.create({
  baseURL: url
});