import { createContext, useMemo, useContext, useState } from "react";
import { Basket } from "contracts/Basket.type";
import {
  initialize,
  addProduct,
  updateProduct,
  deleteProduct,
} from "api/basket";

export interface BasketContextValue extends Basket {
  add: (productId: string) => Promise<void>;
  update: (productId: string, quantity: number) => Promise<void>;
  remove: (productId: string) => Promise<void>;
}

const BasketContext = createContext<BasketContextValue>({
  id: null,
  items: [],
  total: "",
  async add() {},
  async update() {},
  async remove() {},
});

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [basket, setBasket] = useState<Basket>({
    id: null,
    items: [],
    total: "",
  });

  const context = useMemo((): BasketContextValue => {
    const getBasket = async (): Promise<Basket> => {
      if (basket.id) {
        return basket;
      }
      return await initialize();
    };

    const add = async (productId: string) => {
      const basket = await getBasket();

      if (!basket.id || !productId) {
        return;
      }

      const updatedBasket = await addProduct(basket.id!, productId, 1);
      setBasket(updatedBasket);
    };

    const update = async (itemId: string, quantity: number) => {
      const basket = await getBasket();

      if (!basket.id || !itemId) {
        return;
      }
      const updatedBasket = await updateProduct(basket.id, itemId, quantity);
      setBasket(updatedBasket);
    };

    const remove = async (itemId: string) => {
      const basket = await getBasket();

      if (!basket.id || !itemId) {
        return;
      }
      const updatedBasket = await deleteProduct(basket.id, itemId);
      setBasket(updatedBasket);
    };

    return {
      ...basket,
      add,
      update,
      remove,
    };
  }, [basket]);

  return (
    <BasketContext.Provider value={context}>{children}</BasketContext.Provider>
  );
}

export const useBasket = () => useContext(BasketContext);
