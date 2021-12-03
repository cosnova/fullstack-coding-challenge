import { useBasket } from "contexts/Basket";
import { Product } from "contracts/Product.type";
import { useEffect, useState } from "react";
import { getProducts } from "api/products";

export function ProductsList() {
  const [products, setProducts] = useState<ReadonlyArray<Product>>();

  useEffect(() => {
    if (!products) {
      getProducts().then((products) => setProducts(products));
    }
  }, [products]);

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <nav id="store" className="w-full z-30 top-0 px-6 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <strong className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl ">
              Products
            </strong>
          </div>
        </nav>

        {products
          ? products.map((product) => (
              <ListItem key={product.id} product={product} />
            ))
          : "Loading..."}
      </div>
    </section>
  );
}
function ListItem({ product }: { product: Product }) {
  const basket = useBasket();

  return (
    <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
      <div className="relative hover:grow hover:shadow-lg p-10">
        <img src={`${product.img}?w=250&h=250&fmt=webp`} alt={product.name} />
        <button
          className="block w-full mt-2 bg-indigo-500 p-3 text-white border border-solid border-indigo-800 hover:bg-indigo-400"
          onClick={() => basket.add(product.id)}
        >
          Add to cart
        </button>
        <div className="pt-3 text-center">
          <p>{product.name}</p>
        </div>
        <p className="pt-1 font-bold text-center">{product.price}</p>
      </div>
    </div>
  );
}
