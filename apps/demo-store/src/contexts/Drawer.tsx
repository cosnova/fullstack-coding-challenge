import { createContext } from "react";

interface DrawerContextValue {
  isOpen: boolean;
  onClose: () => void;
}

export const DrawerContext = createContext<DrawerContextValue>({
  isOpen: false,
  onClose() {},
});
