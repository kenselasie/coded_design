"use client";

import { createContext, useContext, type ReactNode } from "react";

type Dir = "ltr" | "rtl";

const DirectionContext = createContext<Dir>("ltr");

export function DirectionProvider({
  direction,
  children,
}: {
  direction: Dir;
  children: ReactNode;
}) {
  return (
    <DirectionContext.Provider value={direction}>
      <div dir={direction}>{children}</div>
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  return useContext(DirectionContext);
}
