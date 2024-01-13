import { RootState } from "../../store";

export const selectWishItems = (state: RootState) => state.wishlist.wishItems;
export const selectDeleteList = (state: RootState) => state.wishlist.deleteList;