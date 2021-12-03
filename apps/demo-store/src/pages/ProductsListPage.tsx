import "./ProductsListPage.css";
import { Nav } from "components/Nav";
import { Hero } from "components/Hero";
import { ProductsList } from "components/ProductsList";
import { Footer } from "components/Footer";
import { Basket } from "components/Basket";
import { Drawer } from "components/Drawer";
import { useBasket } from "contexts/Basket";
import { useEffect, useState } from "react";

export function ProductsListPage() {
  const basket = useBasket();
  const [items, setItems] = useState(basket.items);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (basket.items !== items) {
      setItems(basket.items);
      setDrawerOpen(basket.items.length > 0 ? true : false);
    }
  }, [basket.items, items]);

  return (
    <>
      <Nav onOpenBasket={() => setDrawerOpen(true)} />
      <Hero />
      <ProductsList />
      <Footer />
      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <Basket />
      </Drawer>
    </>
  );
}
