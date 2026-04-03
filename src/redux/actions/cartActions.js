import {
  apiAddToCart,
  apiUpdateCart,
  apiRemoveFromCart,
  apiClearCart,
} from '../../api';

// Action Types
export const ADD_ITEM    = 'cart/ADD_ITEM';
export const REMOVE_ITEM = 'cart/REMOVE_ITEM';
export const SET_QUANTITY = 'cart/SET_QUANTITY';
export const CLEAR_CART  = 'cart/CLEAR_CART';
export const SET_CART    = 'cart/SET_CART';

export const setCart = (items) => ({
    type: SET_CART,
    payload: items,
});


export const addItem = (productId) => async (dispatch) => {
    dispatch({ type: ADD_ITEM, payload: { productId } });
    try {
      await apiAddToCart(productId, 1);
    } catch (err) {
      console.error('addItem sync failed:', err);
    }
};

export const removeItem = (productId) => async (dispatch, getState) => {
    const { cart } = getState();
    const item = cart.items.find((i) => i.productId === productId);
    const currentQty = item ? item.quantity : 0;

    dispatch({ type: REMOVE_ITEM, payload: { productId } });

    try {
      if (currentQty <= 1) {
        await apiRemoveFromCart(productId);
      } else {
        await apiUpdateCart(productId, currentQty - 1);
      }
    } catch (err) {
      console.error('removeItem sync failed:', err);
    }
};

export const setQuantity = (productId, quantity) => async (dispatch) => {
    dispatch({ type: SET_QUANTITY, payload: { productId, quantity } });
    try {
      if (quantity <= 0) {
        await apiRemoveFromCart(productId);
      } else {
        await apiUpdateCart(productId, quantity);
      }
    } catch (err) {
      console.error('setQuantity sync failed:', err);
    }
};

export const clearCart = () => async (dispatch) => {
    dispatch({ type: CLEAR_CART });
    try {
      await apiClearCart();
    } catch (err) {
      console.error('clearCart sync failed:', err);
    }
};