import { Basket } from "contracts/Basket.type";
import ky from "ky";

const api = ky.create({
  prefixUrl: "http://localhost:3005",
});

export const initialize = async (): Promise<Basket> => ({
  id: "8b60507b-6260-4dcf-b023-5a41ea11cee3",
  items: [],
  total: "0,00 €",
});
// api.post("basket/new").json();

export const addProduct = (
  basketId: string,
  productId: string,
  quantity: number = 1
): Promise<Basket> => {
  return api
    .post("basket", {
      searchParams: { id: basketId },
      json: {
        productId,
        quantity,
      },
    })
    .json();
};

export const updateProduct = (
  basketId: string,
  itemId: string,
  quantity: number
): Promise<Basket> => {
  return api
    .patch("basket", {
      searchParams: { id: basketId },
      json: {
        itemId,
        quantity,
      },
    })
    .json();
};

export const deleteProduct = (
  basketId: string,
  itemId: string
): Promise<Basket> => {
  return api
    .delete("basket", {
      searchParams: { id: basketId },
      json: {
        itemId,
      },
    })
    .json();
};
