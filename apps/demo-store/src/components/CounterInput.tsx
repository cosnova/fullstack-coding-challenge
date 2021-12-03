interface CounterInputProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function CounterInput({
  quantity,
  onIncrement,
  onDecrement,
}: CounterInputProps) {
  return (
    <div className="flex">
      <button
        type="button"
        className="px-2 border border-solid border-gray-500"
        onClick={onIncrement}
      >
        +
      </button>
      <span className="px-2 border-t border-b border-solid border-gray-500">
        {quantity}
      </span>
      <button
        type="button"
        className="px-2 border border-solid border-gray-500"
        onClick={onDecrement}
      >
        -
      </button>
    </div>
  );
}
