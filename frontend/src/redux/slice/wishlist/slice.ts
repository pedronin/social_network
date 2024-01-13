import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WishlistSlice } from "./types";
import { TypeProductItem } from '../products';


const initialState: WishlistSlice = {
    wishItems: JSON.parse(localStorage.getItem('wishItems') || '[]'),
    deleteList: [],
  };
  
  const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
      addItemWishlist(state, action: PayloadAction<TypeProductItem>) {
        const find = state.wishItems.find((obj) => obj.id === action.payload.id);
        if (find) {
          state.wishItems = state.wishItems.filter((obj) => obj.id !== action.payload.id);
        } else {
          state.wishItems.push(action.payload);
        }
      },
      removeItem(state, action: PayloadAction<TypeProductItem>) {
        console.log(action.payload.id);
        state.wishItems = state.wishItems.filter((obj) => obj.id !== action.payload.id);
      },
      // выбор и удаление выбранных товаров из списка
      clearItems(state) {
        state.wishItems = state.wishItems.filter((obj) => {
          if (state.deleteList.includes(obj.id)) {
            return false;
          } else return true;
        });
        state.deleteList = [];
      },
      setDeleteList(state, action: PayloadAction<string>) {
        if (state.deleteList.includes(action.payload)) {
          state.deleteList = state.deleteList.filter((el) => el !== action.payload);
        } else {
          state.deleteList.push(action.payload);
        }
      },
      setMarkDeleteAll(state) {
        if (state.deleteList.length === state.wishItems.length) {
          state.deleteList = [];
        } else {
          state.deleteList = state.wishItems.map((obj) => obj.id);
        }
      }
    },
  });
  
  export const { addItemWishlist, removeItem, clearItems, setDeleteList, setMarkDeleteAll } =
    wishlistSlice.actions;
  export default wishlistSlice.reducer;
  