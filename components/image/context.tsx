"use client";

import { createContext, useContext, useMemo, useReducer } from "react";
import { ObjectContextAttr } from "./objectTypes";
import { objectReducer } from "./objectReducer";

const ObjectContext = createContext({} as ObjectContextAttr);

export function ObjectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispacth] = useReducer(objectReducer, {
    objects: [],
    selectedIndex: 0,
  });

  const api = useMemo(
    () => ({
      objects: state.objects,
      selectedIndex: state.selectedIndex,
      setSelectedIndex: (i: number) =>
        dispacth({ type: "SET_SELECTED", index: i }),
      get: (i: number) => state.objects[i],
      reset: () => dispacth({ type: "RESET" }),
      push: (file: File) => dispacth({ type: "PUSH", file: file }),
      pop: (i: number) => dispacth({ type: "POP", index: i }),
      reorder: (from: number, to: number) =>
        dispacth({ type: "REORDER", from: from, to: to }),
      setRatio: (i: number, r: number) =>
        dispacth({ type: "SET_RATIO", index: i, ratio: r }),
      getRatio: (i: number) => state.objects[i]?.meta?.ratio ?? 0,
    }),
    [state],
  );

  return (
    <ObjectContext.Provider value={api}>{children}</ObjectContext.Provider>
  );
}

export function useObjectRatio(index: number) {
  const { objects } = useObjectContext();
  return objects[index]?.meta?.ratio;
}

// Custom hook for consuming the context
export const useObjectContext = () => useContext(ObjectContext);
