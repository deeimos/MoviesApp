import { createContext } from "react";
import { RootStore, rootStore } from "@/shared/store";

export const StoreContext = createContext<RootStore>(rootStore);
StoreContext.displayName = "StoreContext";