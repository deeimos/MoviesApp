import { StoreContext } from "@/shared/lib/store-context";
import { rootStore } from "@/shared/store/index";
import type { ReactNode } from "react";

interface IStoreProvider {
  children: ReactNode;
}

export const StoreProvider = ({ children }: IStoreProvider) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
};
