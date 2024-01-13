import { RootState } from "../../store";

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectDeleteList = (state: RootState) => state.cart.deleteList;
