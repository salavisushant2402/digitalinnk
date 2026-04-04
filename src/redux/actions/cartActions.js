import {
  fetchCart,
  apiAddToCart,
  apiUpdateCart,
  apiRemoveFromCart,
  apiClearCart,
} from '../../api';

export const ADD_ITEM     = 'cart/ADD_ITEM';
export const REMOVE_ITEM  = 'cart/REMOVE_ITEM';
export const SET_QUANTITY = 'cart/SET_QUANTITY';
export const CLEAR_CART   = 'cart/CLEAR_CART';
export const SET_CART     = 'cart/SET_CART';
export const SET_BILL     = 'cart/SET_BILL';

export const setCart = (items) => ({ type: SET_CART, payload: items });

const refreshCart = async (dispatch) => {
  const data = await fetchCart();
  dispatch(setCart(data.items.map((i) => ({ productId: i.productId, quantity: i.quantity }))));
  dispatch({ type: SET_BILL, payload: data.bill });
};

export const addItem = (productId) => async (dispatch) => {
  dispatch({ type: ADD_ITEM, payload: { productId } });
  await apiAddToCart(productId, 1);
  await refreshCart(dispatch);
};

export const removeItem = (productId) => async (dispatch, getState) => {
  const { cart } = getState();
  const item = cart.items.find((i) => i.productId === productId);
  const currentQty = item ? item.quantity : 0;

  dispatch({ type: REMOVE_ITEM, payload: { productId } });

  if (currentQty <= 1) {
    await apiRemoveFromCart(productId);
  } else {
    await apiUpdateCart(productId, currentQty - 1);
  }
  await refreshCart(dispatch);
};

export const setQuantity = (productId, quantity) => async (dispatch) => {
  dispatch({ type: SET_QUANTITY, payload: { productId, quantity } });

  if (quantity <= 0) {
    await apiRemoveFromCart(productId);
  } else {
    await apiUpdateCart(productId, quantity);
  }
  await refreshCart(dispatch);
};

export const clearCart = () => async (dispatch) => {
  dispatch({ type: CLEAR_CART });
  await apiClearCart();
};