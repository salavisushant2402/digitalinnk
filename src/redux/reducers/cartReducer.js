import { ADD_ITEM, REMOVE_ITEM, SET_QUANTITY, CLEAR_CART, SET_CART } from '../actions/cartActions';

const initialState = {
  items: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, items: action.payload };

    case ADD_ITEM: {
      const existing = state.items.find((i) => i.productId === action.payload.productId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === action.payload.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { productId: action.payload.productId, quantity: 1 }],
      };
    }

    case REMOVE_ITEM: {
      const existing = state.items.find((i) => i.productId === action.payload.productId);
      if (!existing) return state;
      if (existing.quantity <= 1) {
        return {
          ...state,
          items: state.items.filter((i) => i.productId !== action.payload.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.payload.productId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        ),
      };
    }

    case SET_QUANTITY: {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.productId !== productId) };
      }
      const existing = state.items.find((i) => i.productId === productId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { productId, quantity }] };
    }

      case CLEAR_CART:
        return { ...state, items: [] };

      default:
        return state;
  }
};