import { Product } from "contracts/Product.type";

const products: ReadonlyArray<Product> = [
  {
    id: "444240",
    img: "https://i8.amplience.net/i/Cosnova/444240",
    name: "Volumizing Lip Balm",
    price: "4,99 €",
  },
  {
    id: "591583",
    img: "https://i8.amplience.net/i/Cosnova/591583",
    name: "Prisma Chrome Lipstick",
    price: "4,99 €",
  },
  {
    id: "591445",
    img: "https://i8.amplience.net/i/Cosnova/591445",
    name: "Sheer Beautifying Lip Balm",
    price: "3,49 €",
  },
  {
    id: "1024289",
    img: "https://i8.amplience.net/i/Cosnova/1024289",
    name: "Mattlover Lipstick Pen",
    price: "4,99 €",
  },
  {
    id: "838701",
    img: "https://i8.amplience.net/i/Cosnova/838701",
    name: "Full Satin Lipstick",
    price: "3,99 €",
  },
  {
    id: "1024301",
    img: "https://i8.amplience.net/i/Cosnova/1024301",
    name: "Power Plumping Gel Lipstick",
    price: "3,99 €",
  },
  {
    id: "1232316",
    img: "https://i8.amplience.net/i/Cosnova/1232316",
    name: "Clean ID Silk Intense Lipstick",
    price: "4,49 €",
  },
  {
    id: "1232427",
    img: "https://i8.amplience.net/i/Cosnova/1232427",
    name: "Ultimate Stay Waterfresh Lip Tint",
    price: "3,99 €",
  },
];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProducts() {
  await sleep(400);
  return products;
}
