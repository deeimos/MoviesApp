import { useContext } from "react";
import { StoreContext } from "@/shared/lib/store-context";

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Store error");
  return store;
};