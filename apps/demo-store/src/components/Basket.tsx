import { CloseIcon } from "components/CloseIcon";
import { TrashIcon } from "components/TrashIcon";
import { CounterInput } from "components/CounterInput";
import { DrawerContext } from "contexts/Drawer";
import { useContext } from "react";
import { useBasket } from "contexts/Basket";

export function Basket() {
  const basket = useBasket();
  const { onClose } = useContext(DrawerContext);

  return (
    <div className="modal-content flex flex-col bg-white absolute top-0 right-0 bottom-0 w-full md:w-8/12 lg:w-4/12">
      <div className="p-8 pb-0">
        <div className="flex justify-between border-b border-black">
          <p className="text-3xl font-bold mb-6">SHOPPING BASKET</p>
          <button className="mt-2" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
      </div>

      <div className="flex-grow p-8 overflow-auto">
        {basket.items.map((product) => (
          <BasketItem
            key={product.itemId}
            name={product.name}
            quantity={product.qty}
            image={product.img}
            price={product.price}
            onIncrement={() => basket.update(product.itemId, product.qty + 1)}
            onDecrement={() => basket.update(product.itemId, product.qty - 1)}
            onRemove={() => basket.remove(product.itemId)}
          />
        ))}
      </div>

      <hr className="border-black border-t-2" />
      <div className="p-8 flex flex-col">
        <p className="flex justify-between">
          <span>Total cost:</span>{" "}
          <span className="font-bold">{basket.total}</span>
        </p>
        <button className="mt-2 bg-indigo-500 p-3 text-white border border-solid border-indigo-800 hover:bg-indigo-400">
          To Checkout
        </button>
        <button
          className="mt-2 bg-white p-3 text-indigo-500 border border-solid border-indigo-800 hover:bg-gray-100 hover:text-indigo-400"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

interface BasketItemOptions {
  name: string;
  image: string;
  quantity: number;
  price: string;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

function BasketItem({
  name,
  image,
  quantity,
  price,
  onIncrement,
  onDecrement,
  onRemove,
}: BasketItemOptions) {
  return (
    <div className="flex p-3 border-b border-gray-300">
      <img src={`${image}?w=140&h=125&fmt=webp`} alt={name} />
      <div className="flex justify-between flex-grow flex-col p-4">
        <div className="flex">
          <p className="flex-grow font-bold text-sm">{name}</p>
          <button onClick={onRemove}>
            <TrashIcon />
          </button>
        </div>
        <div className="flex justify-between">
          <CounterInput
            quantity={quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
          <p className="font-bold">{price}</p>
        </div>
      </div>
    </div>
  );
}
