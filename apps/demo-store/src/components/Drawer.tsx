import { DrawerContext } from "contexts/Drawer";

interface DrawerOptions {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, children }: DrawerOptions) {
  if (!isOpen) {
    return null;
  }

  const ctx = {
    isOpen,
    onClose,
  };

  // opacity-0 pointer-events-none
  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-40">
      <div
        className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
        onClick={onClose}
      ></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md ml-auto rounded shadow-lg overflow-y-auto">
        <DrawerContext.Provider value={ctx}>{children}</DrawerContext.Provider>
      </div>
    </div>
  );
}
