"use client";

import { createContext, useContext } from "react";
import type { WorldId } from "codeddesign/theme";

export type WorldContextValue = {
  world: WorldId;
  chooseWorld: (next: WorldId) => void;
};

export const WorldContext = createContext<WorldContextValue | null>(null);

export function useWorld(): WorldContextValue {
  const value = useContext(WorldContext);
  if (!value) {
    throw new Error("useWorld must be used within AppShell");
  }
  return value;
}
