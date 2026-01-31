"use client";

import { StoreProvider as EasyPeasyProvider } from "easy-peasy";
import { store } from "./index";

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return <EasyPeasyProvider store={store}>{children}</EasyPeasyProvider>;
}
