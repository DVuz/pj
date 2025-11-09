import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/api/authApi';
import authReducer from '../slices/authSlice';

import { categoryApi } from '../services/api/categoryApi';
import { subcategoryApi } from '../services/api/subcategoryApi';
import { productTypeApi } from '../services/api/productTypeApi';
import { productApi } from '../services/api/productApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    authInfo: authReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [subcategoryApi.reducerPath]: subcategoryApi.reducer,
    [productTypeApi.reducerPath]: productTypeApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, categoryApi.middleware, subcategoryApi.middleware, productTypeApi.middleware, productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
