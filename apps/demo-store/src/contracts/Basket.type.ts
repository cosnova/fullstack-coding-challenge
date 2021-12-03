import { BasketProduct } from "contracts/BasketProduct.type";

export interface Basket {
  id: string | null;
  items: ReadonlyArray<BasketProduct>;
  total: string;
}
