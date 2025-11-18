import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  itemIds: number[];
}

const initialState: CartState = {
  itemIds: [],
};
const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      if (!state.itemIds.includes(action.payload)) {
        state.itemIds.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.itemIds = state.itemIds.filter(id => id !== action.payload);
    },
    clearCart: state => {
      state.itemIds = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
