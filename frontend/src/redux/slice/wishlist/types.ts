import { TypeProductItem } from '../products';

export interface WishlistSlice {
  wishItems: TypeProductItem[];
  deleteList: string[];
}
