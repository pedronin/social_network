import { configureStore } from '@reduxjs/toolkit';

import filter from './slice/filter/slice';
import cart from './slice/cart/slice';
import wishlist from './slice/wishlist/slice';
import { productsApi } from './slice/products';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    wishlist,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
