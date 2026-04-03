const BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://digitalinnk-backend.onrender.com';

const json = { 'Content-Type': 'application/json' };

export const fetchProducts = async () => {
    const res = await fetch(`${BASE_URL}/products`);
    return res.json();
};

export const fetchCart = async () => {
    const res = await fetch(`${BASE_URL}/cart`);
    return res.json();
};

export const apiAddToCart = async (productId, quantity = 1) => {
    const res = await fetch(`${BASE_URL}/cart/add`, {
      method: 'POST',
      headers: json,
      body: JSON.stringify({ productId, quantity }),
    });
    return res.json();
};

export const apiUpdateCart = async (productId, quantity) => {
    const res = await fetch(`${BASE_URL}/cart/update`, {
      method: 'PATCH',
      headers: json,
      body: JSON.stringify({ productId, quantity }),
    });
    return res.json();
};

export const apiRemoveFromCart = async (productId) => {
    const res = await fetch(`${BASE_URL}/cart/remove/${productId}`, {
      method: 'DELETE',
    });
    return res.json();
};

export const apiClearCart = async () => {
    const res = await fetch(`${BASE_URL}/cart/clear`, { method: 'DELETE' });
    return res.json();
};