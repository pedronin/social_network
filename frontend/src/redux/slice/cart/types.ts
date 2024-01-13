import { TypeProductItem } from "../products";

export interface CartSliceState {
  cartItems: TypeProductItem[];
  deleteList: string[];
}

export type TypeCartItem = Omit<TypeProductItem, "category" | "rating">