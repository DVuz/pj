import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FavoriteProduct {
  product_id: number;
  product_name_vn: string;
  price: number;
  main_image: string;
  product_type_name_vn: string;
  material_vn: string;
  color_vn: string;
  addedAt: string;
}

interface FavoriteProductState {
  items: FavoriteProduct[];
}

// Load from localStorage
const loadFavorites = (): FavoriteProduct[] => {
  try {
    const saved = localStorage.getItem('favoriteProducts');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

// Save to localStorage
const saveFavorites = (items: FavoriteProduct[]) => {
  try {
    localStorage.setItem('favoriteProducts', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

const initialState: FavoriteProductState = {
  items: loadFavorites(),
};

const favoriteProductSlice = createSlice({
  name: 'favoriteProducts',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<FavoriteProduct>) => {
      const exists = state.items.find(item => item.product_id === action.payload.product_id);
      if (!exists) {
        const newItem = {
          ...action.payload,
          addedAt: new Date().toISOString(),
        };
        state.items.push(newItem);
        saveFavorites(state.items);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.product_id !== action.payload);
      saveFavorites(state.items);
    },
    toggleFavorite: (state, action: PayloadAction<FavoriteProduct>) => {
      const index = state.items.findIndex(item => item.product_id === action.payload.product_id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        const newItem = {
          ...action.payload,
          addedAt: new Date().toISOString(),
        };
        state.items.push(newItem);
      }
      saveFavorites(state.items);
    },
    clearFavorites: state => {
      state.items = [];
      saveFavorites([]);
    },
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite, clearFavorites } =
  favoriteProductSlice.actions;

// Selectors
export const selectFavoriteProducts = (state: { favoriteProducts: FavoriteProductState }) =>
  state.favoriteProducts.items;

export const selectIsFavorite =
  (productId: number) => (state: { favoriteProducts: FavoriteProductState }) =>
    state.favoriteProducts.items.some(item => item.product_id === productId);

export const selectFavoritesCount = (state: { favoriteProducts: FavoriteProductState }) =>
  state.favoriteProducts.items.length;

export default favoriteProductSlice.reducer;
