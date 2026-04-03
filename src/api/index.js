const BASE_URL = window.location.hostname === "localhost" ? "http://localhost:3001" : "https://digitalinnk-backend.onrender.com";

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};