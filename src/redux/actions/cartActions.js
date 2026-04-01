// Action Types
export const ADD_ITEM = 'cart/ADD_ITEM';
export const REMOVE_ITEM = 'cart/REMOVE_ITEM';
export const SET_QUANTITY = 'cart/SET_QUANTITY';
export const CLEAR_CART = 'cart/CLEAR_CART';

// Action Creators
export const addItem = (productId) => ({
  type: ADD_ITEM,
  payload: { productId },
});

export const removeItem = (productId) => ({
  type: REMOVE_ITEM,
  payload: { productId },
});

export const setQuantity = (productId, quantity) => ({
  type: SET_QUANTITY,
  payload: { productId, quantity },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
